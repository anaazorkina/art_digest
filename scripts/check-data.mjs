/* ============================================================================
   Ежемесячная проверка данных дайджеста.

   Запускается GitHub Actions первого числа каждого месяца (и вручную).
   Ничего не меняет — только читает данные и печатает markdown-отчёт в stdout,
   из которого workflow создаёт Issue.

   Запуск локально:  node scripts/check-data.mjs
   Без проверки ссылок (быстро):  node scripts/check-data.mjs --no-net
   ============================================================================ */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_LINKS = !process.argv.includes('--no-net');

/* ---------------------------------------------------------------- загрузка */

// Файлы данных — обычные скрипты вида `window.X = [...]`.
// Выполняем их в песочнице с подставным window и забираем результат.
function loadData() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);

  for (const file of ['config/institutions.js', 'data/exhibitions.js', 'data/permanent.js']) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) throw new Error(`Не найден файл данных: ${file}`);
    vm.runInContext(fs.readFileSync(full, 'utf8'), sandbox, { filename: file });
  }

  const w = sandbox.window;
  return {
    cities: w.CITIES || [],
    settings: w.SETTINGS || {},
    meta: w.DIGEST_META || {},
    exhibitions: w.EXHIBITIONS || [],
    permanent: w.PERMANENT || []
  };
}

/* ----------------------------------------------------------------- утилиты */

const today = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};

const parseDate = (s) => (s ? new Date(`${s}T00:00:00Z`) : null);
const daysBetween = (a, b) => Math.round((b - a) / 86400000);
const iso = (d) => d.toISOString().slice(0, 10);

function plural(n, one, few, many) {
  const n10 = n % 10, n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
  return many;
}

const cityName = (cities, id) => (cities.find((c) => c.id === id) || {}).name || id;

/* ------------------------------------------------------- проверка ссылок -- */

async function checkUrl(url) {
  const attempt = async (method) => {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
      headers: {
        // Без внятного user-agent часть музейных сайтов отвечает отказом.
        'user-agent': 'Mozilla/5.0 (compatible; art-digest-linkcheck/1.0)',
        'accept-language': 'ru,en;q=0.8'
      }
    });
    return res.status;
  };

  try {
    let status = await attempt('HEAD');
    // Многие сайты не умеют HEAD — переспрашиваем через GET.
    if (status === 405 || status === 501) status = await attempt('GET');
    return { url, status, dead: status === 404 || status === 410 };
  } catch (err) {
    // Таймаут, обрыв, DNS — это не «ссылка битая», это «проверить не смогли».
    return { url, status: null, dead: false, error: err.name || 'error' };
  }
}

async function checkAll(urls) {
  const results = [];
  const queue = [...urls];
  const CONCURRENCY = 6;

  const worker = async () => {
    while (queue.length) {
      const url = queue.shift();
      results.push(await checkUrl(url));
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

/* ------------------------------------------------------------------ отчёт */

function section(title, lines) {
  if (!lines.length) return '';
  return `\n### ${title}\n\n${lines.join('\n')}\n`;
}

async function main() {
  const { cities, settings, meta, exhibitions, permanent } = loadData();
  const now = today();

  const digestAge = meta.digestUpdated ? daysBetween(parseDate(meta.digestUpdated), now) : null;
  const hypeAge = meta.hypeChecked ? daysBetween(parseDate(meta.hypeChecked), now) : null;

  const ended = [];
  const closingSoon = [];
  const noDates = [];
  const lowConfidence = [];
  const liveByCity = {};

  for (const ex of exhibitions) {
    const end = parseDate(ex.end);
    const start = parseDate(ex.start);
    const isEnded = end && daysBetween(now, end) < 0;

    if (isEnded) {
      ended.push(ex);
      continue;
    }

    liveByCity[ex.city] = (liveByCity[ex.city] || 0) + 1;

    if (end && !ex.endApprox) {
      const left = daysBetween(now, end);
      if (left <= 30 && (!start || daysBetween(now, start) <= 0)) closingSoon.push({ ex, left });
    }

    if (!ex.start && !ex.end) noDates.push(ex);
    if (ex.source && ex.source.confidence === 'low') lowConfidence.push(ex);
  }

  closingSoon.sort((a, b) => a.left - b.left);

  // --- ссылки ---
  let linkReport = [];
  if (CHECK_LINKS) {
    const urls = [...new Set(
      [...exhibitions, ...permanent]
        .flatMap((e) => [e.url, e.ticketUrl, e.source && e.source.primary])
        .filter((u) => typeof u === 'string' && u.startsWith('http'))
    )];

    const results = await checkAll(urls);
    const dead = results.filter((r) => r.dead);
    const unreachable = results.filter((r) => r.status === null);

    linkReport = [
      ...dead.map((r) => `- [ ] 🔴 **${r.status}** ${r.url}`),
      ...unreachable.map((r) => `- [ ] ⚪️ не ответил (${r.error}) — возможно, просто блокирует роботов: ${r.url}`)
    ];
  }

  /* ---------------------------------------------------------- сборка md -- */

  const out = [];

  out.push(`Автоматическая проверка от **${iso(now)}**. Скрипт ничего не менял — только посмотрел.\n`);

  // сводка
  out.push('| Показатель | Значение |');
  out.push('| --- | --- |');
  out.push(`| Дайджест обновлён | ${meta.digestUpdated || '—'}${digestAge !== null ? ` (${digestAge} ${plural(digestAge, 'день', 'дня', 'дней')} назад)` : ''} |`);
  out.push(`| Хайп проверен | ${meta.hypeChecked || '—'}${hypeAge !== null ? ` (${hypeAge} ${plural(hypeAge, 'день', 'дня', 'дней')} назад)` : ''} |`);
  out.push(`| Всего записей | ${exhibitions.length} выставок, ${permanent.length} постоянных экспозиций |`);
  out.push(`| Актуальных сейчас | ${Object.values(liveByCity).reduce((a, b) => a + b, 0)} |`);

  for (const c of cities) {
    const n = liveByCity[c.id] || 0;
    const flag = n === 0 ? ' ⚠️ **пусто**' : n <= 2 ? ' ⚠️ мало' : '';
    out.push(`| — ${c.name} | ${n}${flag} |`);
  }

  out.push('');

  if (digestAge !== null && digestAge > (settings.staleAfterDays || 45)) {
    out.push(`> ⚠️ **Дайджесту ${digestAge} ${plural(digestAge, 'день', 'дня', 'дней')}.** Сайт уже показывает предупреждение в подвале. Пора пересобирать.\n`);
  }

  out.push(section(
    `Завершились — убрать или пометить (${ended.length})`,
    ended.map((ex) => `- [ ] **${ex.title}** — ${ex.venue}, ${cityName(cities, ex.city)} (закрылась ${ex.end})`)
  ));

  out.push(section(
    `Закроются в ближайший месяц — проверить, не продлили ли (${closingSoon.length})`,
    closingSoon.map(({ ex, left }) =>
      `- [ ] **${ex.title}** — ${cityName(cities, ex.city)}, ${left === 0 ? 'сегодня последний день' : `осталось ${left} ${plural(left, 'день', 'дня', 'дней')}`} → ${ex.url}`)
  ));

  out.push(section(
    `Без дат — уточнить на сайте площадки (${noDates.length})`,
    noDates.map((ex) => `- [ ] **${ex.title}** — ${ex.venue}, ${cityName(cities, ex.city)} → ${ex.url}`)
  ));

  out.push(section(
    `Низкая достоверность (confidence: low) — ${lowConfidence.length}`,
    lowConfidence.map((ex) => `- [ ] **${ex.title}** — ${cityName(cities, ex.city)}${ex.source && ex.source.note ? ` · ${ex.source.note}` : ''}`)
  ));

  if (CHECK_LINKS) {
    out.push(section(`Проблемные ссылки (${linkReport.length})`, linkReport));
    if (!linkReport.length) out.push('\n### Ссылки\n\nВсе ссылки отвечают. 🟢\n');
  }

  // --- готовый промпт ---
  out.push(`
---

### Что делать дальше

Откройте проект в Claude Code и скопируйте туда этот промпт:

\`\`\`
Обнови data/exhibitions.js. Пройди по whitelist из config/institutions.js для всех
пяти городов, проверь текущие и ближайшие временные выставки. Отдельно поищи
значимые проекты вне whitelist (discovery: true) и свежий buzz за последние 30 дней
для поля hype. Только художественные и культурные выставки: живопись, графика,
скульптура, фотография, архитектура, дизайн, современное искусство, медиа-арт,
историко-художественные проекты. Без мастер-классов, лекций, концертов, экскурсий
и постоянных экспозиций без отдельного инфоповода. Для каждой записи primary source —
официальный сайт площадки. Удали завершившиеся, проверь те, что помечены в issue.
Обнови DIGEST_META.

Отдельно посмотри города, где в отчёте стоит "пусто" или "мало".
\`\`\`

После правок загрузите изменённые файлы обратно в репозиторий — сайт обновится сам.
`);

  console.log(out.filter(Boolean).join('\n'));
}

main().catch((err) => {
  // Падать нельзя: иначе не будет ни отчёта, ни напоминания.
  console.log(`## Проверка не смогла отработать\n\n\`\`\`\n${err.stack || err}\n\`\`\`\n`);
});
