/* ============================================================================
   КОНФИГУРАЦИЯ ИСТОЧНИКОВ  —  редактируется руками, код менять не нужно.

   Как пользоваться:
   • Добавить любимый музей  -> допишите объект в массив `trusted` нужного города.
   • Убрать музей            -> удалите объект или поставьте  enabled: false.
   • Добавить город          -> добавьте новый блок по образцу.

   Поля института:
     id       — уникальный код (используется в data/*.js -> venueId)
     name     — как показывать пользователю
     site     — официальный сайт (primary source для названия, дат, адреса, билетов)
     weight   — значимость институции 0..3, входит в relevance score
                3 — институция первого ряда (Эрмитаж, Третьяковка, ГЭС-2)
                2 — сильный музей / центр
                1 — заметная площадка
     enabled  — временно выключить, не удаляя
     notice   — необязательная пометка («зал закрыт на ремонт»)
   ============================================================================ */

window.CITIES = [
  {
    id: 'moscow',
    name: 'Москва',
    // Сколько выставок максимум показываем на главном экране этого города.
    // Москве позволено больше, Челябинску — меньше. Свалки быть не должно.
    quota: 14,
    trusted: [
      /* --- ядро --- */
      { id: 'pushkin',    name: 'ГМИИ им. А.С. Пушкина',                 site: 'https://pushkinmuseum.art', weight: 3 },
      { id: 'tretyakov',  name: 'Третьяковская галерея',                 site: 'https://www.tretyakovgallery.ru', weight: 3 },
      { id: 'mmoma',      name: 'ММОМА',                                 site: 'https://mmoma.ru', weight: 2 },
      { id: 'mamm',       name: 'Мультимедиа Арт Музей (МАММ)',          site: 'https://mamm.art', weight: 3 },
      { id: 'orient',     name: 'Государственный музей Востока',         site: 'https://orientmuseum.ru', weight: 2 },
      { id: 'muar',       name: 'Музей архитектуры им. А.В. Щусева',     site: 'https://muar.ru', weight: 2 },
      { id: 'zotov',      name: 'Центр «Зотов»',                         site: 'https://centrezotov.ru', weight: 2 },
      { id: 'garage',     name: 'Музей «Гараж»',                         site: 'https://garagemca.org', weight: 3 },
      { id: 'ges2',       name: 'Дом культуры «ГЭС-2»',                  site: 'https://ges-2.org', weight: 3 },
      { id: 'rusimp',     name: 'Музей русского импрессионизма',         site: 'https://rusimp.org', weight: 2 },
      { id: 'jewish',     name: 'Еврейский музей и центр толерантности', site: 'https://www.jewish-museum.ru', weight: 2 },
      { id: 'winzavod',   name: 'ЦСИ «Винзавод»',                        site: 'https://winzavod.ru', weight: 2 },
      { id: 'mosmuseum',  name: 'Музей Москвы',                          site: 'https://mosmuseum.ru', weight: 2 },
      /* --- расширение --- */
      { id: 'vmdpni',     name: 'Всероссийский музей декоративного искусства', site: 'https://damuseum.ru', weight: 2 },
      { id: 'museum-az',  name: 'Музей AZ (Анатолия Зверева)',           site: 'https://museum-az.com', weight: 2 },
      { id: 'tropinin',   name: 'Музей В.А. Тропинина',                  site: 'https://museum-tropinina.ru', weight: 1 },
      { id: 'triumph',    name: 'Галерея «Триумф»',                      site: 'https://triumph.gallery', weight: 1 },
      { id: 'ekaterina',  name: 'Фонд культуры «Екатерина»',             site: 'https://www.ekaterina-foundation.ru', weight: 1 },
      { id: 'gum-redline', name: 'ГУМ-Red-Line',                         site: 'https://gum.ru', weight: 1 },
      /* --- фотография --- */
      { id: 'lumiere',    name: 'Центр фотографии имени братьев Люмьер', site: 'https://www.lumiere.ru', weight: 2 },
      { id: 'gcf',        name: 'Галерея классической фотографии',       site: 'https://classicgallery.ru', weight: 2 },
      { id: 'fotocenter', name: 'Фотоцентр на Гоголевском',             site: 'https://foto-expo.ru', weight: 1 },
      /* --- большие музеи, которых не хватало --- */
      { id: 'kremlin-museums', name: 'Музеи Московского Кремля',         site: 'https://www.kreml.ru', weight: 3 },
      { id: 'gim',        name: 'Государственный исторический музей',    site: 'https://shm.ru', weight: 3 },
      { id: 'rublev',     name: 'Музей древнерусской культуры им. Андрея Рублёва', site: 'https://rublev-museum.ru', weight: 2 },
      { id: 'tsaritsyno', name: 'Музей-заповедник «Царицыно»',           site: 'https://tsaritsyno-museum.ru', weight: 2 },
      { id: 'glazunov',   name: 'Галерея Ильи Глазунова',                site: 'https://glazunov-gallery.ru', weight: 1 }
    ]
  },

  {
    id: 'spb',
    name: 'Санкт-Петербург',
    quota: 12,
    trusted: [
      /* --- ядро --- */
      { id: 'hermitage',  name: 'Государственный Эрмитаж',               site: 'https://www.hermitagemuseum.org', weight: 3 },
      { id: 'rusmuseum',  name: 'Государственный Русский музей',         site: 'https://rusmuseum.ru', weight: 3 },
      { id: 'erarta',     name: 'Музей современного искусства Эрарта',   site: 'https://www.erarta.com', weight: 2 },
      { id: 'manege',     name: 'ЦВЗ «Манеж»',                           site: 'https://manege.spb.ru', weight: 3 },
      { id: 'rosphoto',   name: 'РОСФОТО',                               site: 'https://rosphoto.org', weight: 2 },
      { id: 'mispxx',     name: 'Музей искусства Санкт-Петербурга XX–XXI вв.', site: 'https://mispxx-xxi.ru', weight: 2 },
      /* --- расширение --- */
      { id: 'ethno',      name: 'Российский этнографический музей',      site: 'https://ethnomuseum.ru', weight: 2 },
      { id: 'peterhof',   name: 'Музей-заповедник «Петергоф» (включая Ораниенбаум)', site: 'https://peterhofmuseum.ru', weight: 2 },
      { id: 'spbhistory', name: 'Музей истории Санкт-Петербурга (Петропавловская крепость)', site: 'https://www.spbmuseum.ru', weight: 2 },
      { id: 'faberge',    name: 'Музей Фаберже',                         site: 'https://fabergemuseum.ru', weight: 2 },
      { id: 'kunstkamera', name: 'Кунсткамера',                          site: 'https://www.kunstkamera.ru', weight: 2 },
      { id: 'academy',    name: 'Музей Академии художеств',              site: 'https://artsacademymuseum.org', weight: 2 },
      { id: 'kgallery',   name: 'KGallery',                              site: 'https://kgallery.ru', weight: 1 },
      { id: 'sevkabel',   name: 'Севкабель Порт',                        site: 'https://sevcableport.ru', weight: 1 },
      /* --- архитектура и дизайн --- */
      { id: 'keramarh',   name: 'Керамарх — музей архитектурной художественной керамики', site: 'https://keramarh.ru', weight: 2 },
      { id: 'stieglitz',  name: 'Музей Академии им. А.Л. Штиглица',      site: 'https://www.ghpa.ru', weight: 2 },
      { id: 'glassmuseum', name: 'Музей художественного стекла (Елагиноостровский дворец)', site: 'https://elaginpark.org', weight: 2 },
      { id: 'isaac',      name: 'ГМП «Исаакиевский собор»',              site: 'https://cathedral.ru', weight: 2 },
      { id: 'avangard',   name: 'Музей петербургского авангарда (Дом Матюшина)', site: 'https://www.spbmuseum.ru', weight: 1 }
    ]
  },

  {
    id: 'nnov',
    name: 'Нижний Новгород',
    quota: 10,
    trusted: [
      /* --- ядро --- */
      { id: 'arsenal',    name: 'Арсенал (Волго-Вятский филиал ГМИИ)',   site: 'https://arsenal-museum.art', weight: 3 },
      { id: 'ngkhm',      name: 'Нижегородский художественный музей',    site: 'https://artmuseumnn.ru', weight: 2 },
      { id: 'packhouses', name: 'Пакгаузы на Стрелке',                   site: 'https://packhouses.strelkapark.ru', weight: 2,
        notice: 'Выставочный Пакгауз закрыт для посещения по техническим причинам — статус уточняйте в музее (artmuseumnn.ru, проверено 30.08.2026).' },
      { id: 'ngiamz',     name: 'Нижегородский музей-заповедник',        site: 'https://ngiamz.ru', weight: 2 },
      /* --- расширение --- */
      { id: 'terminal-a', name: 'ЦСИ «Терминал А»',                      site: 'https://nn-afisha.ru/category/vystavki', weight: 1 },
      { id: 'cex',        name: 'Мультимедиа-пространство ЦЕХ*',         site: 'https://nn-afisha.ru/category/vystavki', weight: 1 },
      { id: 'kvartaly',   name: '«Заповедные кварталы»',                 site: 'https://kvartalynn.ru', weight: 1 },
      { id: 'record',     name: 'Культурный центр «Рекорд»',             site: 'https://zerkalo-nn.ru', weight: 1 }
    ]
  },

  {
    id: 'kazan',
    name: 'Казань',
    quota: 10,
    trusted: [
      /* --- ядро --- */
      { id: 'izo',        name: 'ГМИИ Республики Татарстан',             site: 'https://izo-museum.ru', weight: 2 },
      { id: 'izo-modern', name: 'Галерея современного искусства ГМИИ РТ', site: 'https://izo-museum.ru', weight: 2 },
      { id: 'hazine',     name: 'Национальная художественная галерея «Хазинэ»', site: 'https://izo-museum.ru', weight: 2 },
      { id: 'kremlin',    name: 'Музей-заповедник «Казанский Кремль»',   site: 'https://kazan-kremlin.ru', weight: 2 },
      { id: 'hermitage-kazan', name: 'Центр «Эрмитаж-Казань»',           site: 'https://kazan-kremlin.ru', weight: 3 },
      { id: 'smena',      name: 'ЦСК «Смена»',                           site: 'https://s-m-e-n-a.org', weight: 2 },
      /* --- расширение --- */
      { id: 'natmuseum-rt', name: 'Национальный музей Республики Татарстан', site: 'https://tatmuseum.ru', weight: 2 },
      { id: 'bizon',      name: 'Галерея современного искусства BIZON',  site: 'https://bizon.gallery', weight: 1 },
      { id: 'sovbyt',     name: 'Музей социалистического быта',          site: 'https://sovbyt.ru', weight: 1 }
    ]
  },

  {
    id: 'chel',
    name: 'Челябинск',
    quota: 10,
    trusted: [
      /* --- ядро --- */
      { id: 'chelmusart', name: 'Челябинский музей изобразительных искусств', site: 'https://chelmusart.ru', weight: 2,
        notice: 'Картинная галерея на ул. Труда, 92а закрыта на ремонт. Выставки идут на площадке на площади Революции, 1 (проверено 31.08.2026).' },
      // Бывший Челябинский областной краеведческий музей — в 2015 переименован.
      // Это один и тот же музей на ул. Труда, 100, отдельного краеведческого в городе нет.
      { id: 'chelmuseum', name: 'Исторический музей Южного Урала',       site: 'https://chelmuseum.ru', weight: 2 },
      /* --- расширение --- */
      { id: 'okno',       name: 'Галерея современного искусства «ОкNo»', site: 'https://okno-gallery.ru', weight: 1 },
      { id: 'shzal',      name: 'Выставочный зал Союза художников',      site: 'https://chelmusart.ru', weight: 1 },
      { id: 'uzhd',       name: 'Музей истории Южно-Уральской железной дороги', site: 'https://chelmuseum.ru', weight: 1 },
      { id: 'slava',      name: 'Музей трудовой и боевой славы',         site: 'https://chelmuseum.ru', weight: 1 },
      { id: 'arkaim',     name: 'Историко-культурный заповедник «Аркаим»', site: 'https://arkaim-center.ru', weight: 2,
        notice: 'Аркаим — не в самом Челябинске: около 400 км на юг, это отдельная поездка на целый день.' }
    ]
  }
];

/* --------------------------------------------------------------------------
   Настройки отбора. Тоже можно крутить руками.
   -------------------------------------------------------------------------- */
window.SETTINGS = {
  // Ниже этого score выставка не попадает в выдачу вообще.
  // Поднимите, если кажется, что подборка размывается.
  minScore: 28,

  // Порог ярлыка MUST SEE.
  mustSeeScore: 72,

  // Блок «Не пропустить»: максимум карточек и минимальный score для попадания.
  topBlock: { max: 5, minScore: 55 },

  // Сколько дней до закрытия считается «скоро закроется» (ярлык на карточке).
  closingSoonDays: 14,

  // Блок «Сейчас хайпует».
  hypeBlock: { min: 2, max: 5 },

  // Сколько постоянных экспозиций показывать на город.
  // Сейчас показываются все: в Москве 21, в Петербурге 14, в остальных меньше.
  // Принцип «лучше 7 стоящих, чем 70 случайных» — про временные выставки,
  // где нужен отбор. Постоянные экспозиции работают как справочник: их конечное
  // число, они никуда не денутся, и прятать половину незачем.
  // Поставьте 12, если секция кажется длинной.
  permanentMax: 24,

  // Через сколько дней без обновления дайджеста показывать предупреждение
  // в подвале сайта. Этот же порог использует ежемесячная проверка в GitHub Actions.
  staleAfterDays: 45,

  // Профиль интересов: множители по категориям. 1.0 — нейтрально.
  // Например, если вам ближе фотография — поставьте 1.15.
  interests: {
    classic: 1.0,
    contemporary: 1.0,
    photo: 1.0,
    architecture: 1.0,
    history: 1.0
  }
};

/* --------------------------------------------------------------------------
   Телеграм-канал в подвале.
   -------------------------------------------------------------------------- */
window.TELEGRAM = {
  url: 'https://t.me/bimbodata',
  title: 'бимбочка из бигдаты',
  subtitle: 'Сердечки и лайки ставим здесь 💛',
  cta: 'Подписаться'
};
