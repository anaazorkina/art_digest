/* ============================================================================
   Персональный арт-редактор.
   Логика отбора здесь, данные — в data/exhibitions.js и data/permanent.js,
   институции и настройки — в config/institutions.js.
   ============================================================================ */

(function () {
  'use strict';

  var CITIES = window.CITIES;
  var S = window.SETTINGS;
  var META = window.DIGEST_META;
  var TG = window.TELEGRAM;

  /* ---------------------------------------------------------------- утилиты */

  var MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function parseDate(s) {
    if (!s) return null;
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }

  function plural(n, one, few, many) {
    var n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
    return many;
  }

  function fmtDate(d, withYear) {
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + (withYear ? ' ' + d.getFullYear() : '');
  }

  function fmtRange(ex) {
    var s = ex._start, e = ex._end, y = today().getFullYear();
    var other = function (d) { return d && d.getFullYear() !== y; };
    if (s && e) {
      return (ex.startApprox ? 'ок. ' : '') + fmtDate(s, other(s) && s.getFullYear() !== e.getFullYear()) +
             ' — ' + (ex.endApprox ? 'ок. ' : '') + fmtDate(e, other(s) || other(e));
    }
    if (s) return 'с ' + (ex.startApprox ? 'ок. ' : '') + fmtDate(s, other(s));
    if (e) return 'до ' + (ex.endApprox ? 'ок. ' : '') + fmtDate(e, other(e));
    return 'даты уточняются';
  }

  function daysLeftText(n) {
    if (n === null || n < 0) return null;
    if (n === 0) return 'сегодня последний день';
    if (n === 1) return 'остался 1 день';
    if (n <= 30) return 'осталось ' + n + ' ' + plural(n, 'день', 'дня', 'дней');
    var m = Math.round(n / 30);
    return m === 1 ? 'до закрытия около месяца'
                   : 'до закрытия ' + m + ' ' + plural(m, 'месяц', 'месяца', 'месяцев');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ------------------------------------------------------- справочники ---- */

  var CATEGORIES = [
    { id: 'all',          name: 'Все' },
    { id: 'classic',      name: 'Классика' },
    { id: 'contemporary', name: 'Современное' },
    { id: 'photo',        name: 'Фотография' },
    { id: 'architecture', name: 'Архитектура и дизайн' },
    { id: 'history',      name: 'История и культура' }
  ];

  var PERIODS = [
    { id: 'any',     name: 'Неважно' },
    { id: 'now',     name: 'Можно сходить сейчас' },
    { id: 'soon',    name: 'Открывается скоро' },
    { id: 'closing', name: 'Скоро закрывается' }
  ];

  var INSTITUTION_INDEX = {};
  CITIES.forEach(function (c) {
    (c.trusted || []).forEach(function (inst) {
      if (inst.enabled === false) return;
      INSTITUTION_INDEX[inst.id] = inst;
    });
  });

  /* --------------------------------------------------------- обогащение --- */

  var MAX_SIGNALS = 3 * (2.2 + 2.0 + 1.8 + 1.2 + 1.6 + 1.5 + 0.8); // 33.3
  var MAX_TOTAL = MAX_SIGNALS + 4 /* хайп */ + 2 /* близость закрытия */;

  function enrich(ex) {
    var now = today();
    ex._start = parseDate(ex.start);
    ex._end = parseDate(ex.end);
    ex._inst = ex.venueId ? INSTITUTION_INDEX[ex.venueId] : null;
    ex._trusted = !!ex._inst;

    if (ex._end && daysBetween(now, ex._end) < 0)          ex._status = 'ended';
    else if (ex._start && daysBetween(now, ex._start) > 0)  ex._status = 'upcoming';
    else                                                    ex._status = 'current';

    // Обратный отсчёт — только когда дата закрытия точная.
    ex._daysLeft = (ex._end && ex._status === 'current' && !ex.endApprox) ? daysBetween(now, ex._end) : null;
    ex._closingSoon = ex._daysLeft !== null && ex._daysLeft <= S.closingSoonDays;

    // ---- relevance score -------------------------------------------------
    var g = ex.signals || {};
    // Вес институции из whitelist подмешивается к сигналу значимости площадки.
    var institution = Math.max(g.institution || 0, ex._inst ? ex._inst.weight : 0);

    var total =
      2.2 * institution +
      2.0 * (g.artist  || 0) +
      1.8 * (g.scale   || 0) +
      1.2 * (g.curator || 0) +
      1.6 * (g.rarity  || 0) +
      1.5 * (g.media   || 0) +
      0.8 * (g.novelty || 0);

    if (ex.hype) total += Math.min(3, ex.hype.mentions30d || 1) / 3 * 4;
    if (ex._closingSoon) total += 2;

    var interest = (ex.category && S.interests[ex.category]) || 1;
    ex._score = Math.max(0, Math.min(100, Math.round(100 * total * interest / MAX_TOTAL)));

    // ---- editorial label -------------------------------------------------
    if (ex._score >= S.mustSeeScore)       ex._label = 'must';
    else if (ex.hype)                      ex._label = 'hype';
    else if (ex._closingSoon)              ex._label = 'close';
    else if (ex.discovery && !ex._trusted) ex._label = 'find';
    else                                   ex._label = 'worth';

    return ex;
  }

  var LABEL_TEXT = {
    must:  'Must see',
    hype:  'Хайп',
    close: 'Скоро закроется',
    find:  'Неочевидная находка',
    worth: 'Стоит внимания'
  };

  var ALL = (window.EXHIBITIONS || []).map(enrich);

  var PERM = (window.PERMANENT || []).map(function (p) {
    p._inst = p.venueId ? INSTITUTION_INDEX[p.venueId] : null;
    p._weight = p._inst ? p._inst.weight : 1;
    return p;
  });

  /* ------------------------------------------------------------ состояние - */

  function remember(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function recall(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var saved = recall('ad.city');
  var state = {
    city: CITIES.some(function (c) { return c.id === saved; }) ? saved : CITIES[0].id,
    category: 'all',
    period: 'any'
  };

  function matchesFilters(ex) {
    if (state.category !== 'all' && ex.category !== state.category) return false;
    if (state.period === 'now' && ex._status !== 'current') return false;
    if (state.period === 'soon' && ex._status !== 'upcoming') return false;
    if (state.period === 'closing' && !ex._closingSoon) return false;
    return true;
  }

  function poolFor(cityId, applyFilters) {
    return ALL
      .filter(function (ex) {
        return ex.city === cityId &&
               ex._status !== 'ended' &&
               ex._score >= S.minScore &&
               (!applyFilters || matchesFilters(ex));
      })
      .sort(function (a, b) { return b._score - a._score; });
  }

  function permFor(cityId) {
    // Временные фильтры к постоянным экспозициям неприменимы: они открыты всегда.
    if (state.period !== 'any') return [];
    return PERM
      .filter(function (p) {
        return p.city === cityId && (state.category === 'all' || p.category === state.category);
      })
      .sort(function (a, b) { return b._weight - a._weight; })
      .slice(0, S.permanentMax);
  }

  function buildSections(cityId) {
    var city = CITIES.filter(function (c) { return c.id === cityId; })[0];
    var pool = poolFor(cityId, true);
    var capped = pool.slice(0, city.quota);

    var notMiss = capped.filter(function (ex) { return ex._score >= S.topBlock.minScore; })
                        .slice(0, S.topBlock.max);
    var inTop = {};
    notMiss.forEach(function (ex) { inTop[ex.id] = true; });

    return {
      city: city,
      pool: pool,
      notMiss: notMiss,
      also: capped.filter(function (ex) { return !inTop[ex.id]; }),
      hype: pool.filter(function (ex) { return !!ex.hype; }).slice(0, S.hypeBlock.max)
    };
  }

  /* ------------------------------------------------------------- рендер --- */

  function coverHTML(item) {
    return '<div class="cover">' +
      (item.image ? '<img src="' + esc(item.image) + '" alt="">' : '') +
      '<div class="venue-mark">' + esc(item._inst ? item._inst.name : item.venue) + '</div>' +
    '</div>';
  }

  function footHTML(item, srcLabel) {
    var foot = ['<a class="src" href="' + esc(item.url) + '" target="_blank" rel="noopener">' + srcLabel + '</a>'];
    if (item.ticketUrl) {
      foot.push('<a class="ticket" href="' + esc(item.ticketUrl) + '" target="_blank" rel="noopener">Билеты</a>');
    }
    if (item.price) foot.push('<span class="price">' + esc(item.price) + '</span>');
    return '<div class="foot">' + foot.join('') + '</div>';
  }

  function cardHTML(ex, ctx) {
    var label = ctx === 'hype' ? 'hype' : ex._label;
    var badges = ['<span class="badge ' + label + '">' + LABEL_TEXT[label] + '</span>'];

    if (label !== 'close' && ex._closingSoon) {
      badges.push('<span class="badge close">Скоро закроется</span>');
    }
    if (ex._status === 'upcoming') {
      badges.push('<span class="badge soon">' +
        (ex.startApprox ? 'Откроется позже' : 'Откроется ' + fmtDate(ex._start, false)) + '</span>');
    }

    var left = daysLeftText(ex._daysLeft);
    var meta = [fmtRange(ex)];
    if (ex.address) meta.push(esc(ex.address));

    var src = ex.source || {};
    var mediaLinks = (ex.media || []).map(function (m) {
      return '<div class="row"><a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.title) + '</a></div>';
    }).join('');

    var whyBlock = ctx === 'hype' && ex.hype
      ? '<div class="why hype-why"><b>Почему хайпует</b>' + esc(ex.hype.reason) + '</div>'
      : '<div class="why"><b>Почему стоит идти</b>' + esc(ex.why) + '</div>';

    return '' +
      '<article class="card c-' + esc(ex.category || 'none') + '">' +
        coverHTML(ex) +
        '<div class="body">' +
          '<div class="labels">' + badges.join('') + '</div>' +
          '<h3>' + esc(ex.title) + '</h3>' +
          '<div class="venue">' + esc(ex.venue) + '</div>' +
          '<div class="meta-line">' + meta.join(' <span class="dot">·</span> ') +
            (left ? ' <span class="dot">·</span> <span class="left' + (ex._daysLeft <= 3 ? ' urgent' : '') + '">' + left + '</span>' : '') +
          '</div>' +
          '<p class="summary">' + esc(ex.summary) + '</p>' +
          whyBlock +
          footHTML(ex, 'Сайт площадки') +
          '<details class="prov"><summary>Откуда данные</summary><div class="prov-body">' +
            '<div class="row"><span>Источник:</span> <a href="' + esc(src.primary || ex.url) + '" target="_blank" rel="noopener">' +
              esc((src.primary || ex.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')) + '</a></div>' +
            '<div class="row"><span>Получено:</span> ' + esc(src.retrieved || '—') + '</div>' +
            '<div class="row"><span>Проверено:</span> ' + esc(src.lastChecked || '—') + '</div>' +
            '<div class="row"><span>Confidence:</span> <span class="conf ' + esc(src.confidence) + '">' + esc(src.confidence || '—') + '</span></div>' +
            (mediaLinks ? '<div class="row"><span>Упоминания:</span></div>' + mediaLinks : '') +
          '</div></details>' +
        '</div>' +
      '</article>';
  }

  function permCardHTML(p) {
    return '' +
      '<article class="card permanent c-' + esc(p.category || 'none') + '">' +
        coverHTML(p) +
        '<div class="body">' +
          '<div class="labels"><span class="badge perm">Открыто всегда</span></div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<div class="venue">' + esc(p.venue) + '</div>' +
          (p.address ? '<div class="meta-line">' + esc(p.address) + '</div>' : '') +
          '<p class="summary">' + esc(p.summary) + '</p>' +
          (p.star ? '<div class="star"><i>★</i><span>' + esc(p.star) + '</span></div>' : '') +
          '<div class="why"><b>Почему стоит идти</b>' + esc(p.why) + '</div>' +
          footHTML(p, 'Сайт музея') +
        '</div>' +
      '</article>';
  }

  function sectionHTML(o) {
    if (!o.items.length) return '';
    return '<section class="section' + (o.mod ? ' ' + o.mod : '') + '">' +
      '<div class="section-head"><h2>' + o.title + '</h2><span class="n">' + o.items.length + '</span></div>' +
      (o.sub ? '<p class="section-sub">' + o.sub + '</p>' : '') +
      '<div class="grid' + (o.wide ? ' wide' : '') + '">' +
        o.items.map(o.render || function (ex) { return cardHTML(ex, o.ctx); }).join('') +
      '</div></section>';
  }

  function renderCities() {
    var box = document.getElementById('cities');
    box.innerHTML = CITIES.map(function (c) {
      var n = poolFor(c.id, false).slice(0, c.quota).length;
      return '<button class="city-btn' + (c.id === state.city ? ' active' : '') + '" data-city="' + c.id + '">' +
             esc(c.name) + '<span class="count">' + n + '</span></button>';
    }).join('');

    box.querySelectorAll('.city-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        state.city = b.dataset.city;
        state.category = 'all';
        state.period = 'any';
        remember('ad.city', state.city);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderFilters() {
    var box = document.getElementById('filters');
    var available = {};
    poolFor(state.city, false).forEach(function (ex) { if (ex.category) available[ex.category] = true; });
    PERM.forEach(function (p) { if (p.city === state.city && p.category) available[p.category] = true; });

    function chips(list, key, disabledFn) {
      return list.map(function (o) {
        var dis = disabledFn ? disabledFn(o) : false;
        return '<button class="chip' + (state[key] === o.id ? ' active' : '') + '"' +
               (dis ? ' disabled' : '') + ' data-key="' + key + '" data-val="' + o.id + '">' + esc(o.name) + '</button>';
      }).join('');
    }

    box.innerHTML =
      '<div class="filter-group"><span class="label">Тема</span>' +
        chips(CATEGORIES, 'category', function (o) { return o.id !== 'all' && !available[o.id]; }) +
      '</div>' +
      '<div class="filter-group"><span class="label">Когда</span>' + chips(PERIODS, 'period') + '</div>';

    box.querySelectorAll('.chip').forEach(function (b) {
      b.addEventListener('click', function () {
        state[b.dataset.key] = b.dataset.val;
        render();
      });
    });
  }

  function renderFeed() {
    var d = buildSections(state.city);
    var perm = permFor(state.city);

    var out =
      sectionHTML({ title: 'Не пропустить', sub: 'Самое сильное в городе прямо сейчас.', items: d.notMiss, wide: true }) +
      sectionHTML({ title: 'Ещё стоит посмотреть', sub: 'Хорошие выставки, не попавшие в первую пятёрку.', items: d.also }) +
      sectionHTML({ title: 'Сейчас хайпует', sub: 'Не то, что рекламирует музей, а то, о чём говорят вокруг.', items: d.hype, ctx: 'hype', mod: 'hype' });

    if (!out) {
      var totalNoFilters = poolFor(state.city, false).length;
      out = '<div class="section"><div class="empty">' +
        (totalNoFilters
          ? '<strong>Под этот фильтр ничего нет</strong>В городе «' + esc(d.city.name) + '» сейчас ' + totalNoFilters + ' ' +
            plural(totalNoFilters, 'подходящая выставка', 'подходящие выставки', 'подходящих выставок') +
            ', но не с такими параметрами.<div class="hint">Сбросьте фильтры.</div>'
          : '<strong>Пока нечего рекомендовать</strong>Ни одна выставка в городе «' + esc(d.city.name) + '» не прошла отбор.' +
            '<div class="hint">Лучше показать пусто, чем набить экран проходными событиями.</div>') +
        '</div></div>';
    }

    out += sectionHTML({
      title: 'Постоянные экспозиции',
      sub: 'Идти можно в любой день — и это часто сильнее, чем временная выставка по соседству.',
      items: perm, mod: 'perm', render: permCardHTML
    });

    document.getElementById('feed').innerHTML = out;
  }

  function renderPulse() {
    var city = CITIES.filter(function (c) { return c.id === state.city; })[0];
    var pool = poolFor(state.city, false).slice(0, city.quota);
    var closing = pool.filter(function (ex) { return ex._closingSoon; }).length;
    var perm = PERM.filter(function (p) { return p.city === state.city; }).length;
    var d = today();

    var parts = ['Сегодня ' + fmtDate(d, false)];
    parts.push('<b>' + pool.length + '</b> ' + plural(pool.length, 'выставка', 'выставки', 'выставок') +
               ' в городе «' + esc(city.name) + '»');
    if (closing) {
      parts.push('<b>' + closing + '</b> ' + plural(closing, 'закрывается', 'закрываются', 'закрываются') + ' на днях');
    } else if (perm) {
      parts.push('и <b>' + perm + '</b> ' + plural(perm, 'постоянная экспозиция', 'постоянные экспозиции', 'постоянных экспозиций'));
    }

    document.getElementById('pulse').innerHTML =
      '<span class="dot"></span><span>' + parts.join(' · ') + '</span>';
  }

  function renderNotices() {
    var city = CITIES.filter(function (c) { return c.id === state.city; })[0];
    document.getElementById('notices').innerHTML = (city.trusted || [])
      .filter(function (i) { return i.notice; })
      .map(function (i) { return '<div class="notice"><b>' + esc(i.name) + '.</b> ' + esc(i.notice) + '</div>'; })
      .join('');
  }

  function renderTelegram() {
    if (!TG || !TG.url) return;
    document.getElementById('tg').innerHTML =
      '<a class="tg" href="' + esc(TG.url) + '" target="_blank" rel="noopener">' +
        '<span class="tg-icon">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L18 6.6c.4-.4-.1-.6-.6-.2L7.1 13.1l-4.9-1.5c-1.1-.3-1.1-1 .2-1.5l19.2-7.4c.9-.3 1.7.2 1.4 1.6z"/></svg>' +
        '</span>' +
        '<span class="tg-text">' +
          '<span class="tg-title">' + esc(TG.title) + '</span>' +
          '<span class="tg-sub">' + esc(TG.subtitle) + '</span>' +
        '</span>' +
        '<span class="tg-cta">' + esc(TG.cta || 'Подписаться') + '</span>' +
      '</a>';
  }

  function renderFooter() {
    var live = ALL.filter(function (e) { return e._status !== 'ended'; }).length;
    document.getElementById('foot-meta').innerHTML =
      '<div class="row"><span class="k">Кураторский дайджест</span><span class="v">обновлён ' + esc(META.digestUpdated) + ' · раз в месяц</span></div>' +
      '<div class="row"><span class="k">Блок «Сейчас хайпует»</span><span class="v">проверен ' + esc(META.hypeChecked) + ' · раз в неделю</span></div>' +
      '<div class="row"><span class="k">Сверка дат</span><span class="v">' + esc(META.datesChecked) + '</span></div>' +
      '<div class="row"><span class="k">В базе</span><span class="v">' + ALL.length + ' выставок (' + live + ' актуальных) и ' + PERM.length + ' постоянных экспозиций</span></div>';
  }

  function render() {
    renderPulse();
    renderCities();
    renderFilters();
    renderFeed();
    renderNotices();
  }

  render();
  renderTelegram();
  renderFooter();
})();
