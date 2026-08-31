/* ============================================================================
   CURATED DIGEST — данные о выставках.

   Каждая запись — одна выставка (одна сущность после дедупликации).
   Официальный сайт площадки = primary source для названия, дат, адреса, билетов.
   Медиа используются только для оценки значимости и хайпа.

   SIGNALS (0..3) — сырьё для relevance score, пользователю не показываются:
     institution — вес площадки для этого конкретного проекта
     artist      — значимость художника / темы
     scale       — масштаб и амбиция проекта
     curator     — репутация куратора или музея-партнёра
     rarity      — редкость возможности это увидеть
     media       — количество и качество независимых упоминаний
     novelty     — новизна (только что открылась / новое пространство)

   ДАТЫ
     endApprox / startApprox — дата известна приблизительно («ноябрь», «осень»):
     обратный отсчёт до закрытия для таких записей не показывается.
     Записи без дат показываются с пометкой «даты уточняются».
   ============================================================================ */

window.DIGEST_META = {
  digestUpdated: '2026-08-31',   // полный кураторский пересбор — раз в месяц
  hypeChecked:   '2026-08-31',   // блок «Сейчас хайпует» — раз в неделю
  datesChecked:  '2026-08-31'    // сверка дат — чаще всего остального
};

window.EXHIBITIONS = [

  /* ============================ МОСКВА ============================ */

  {
    id: 'msk-pushkin-vajrayana',
    title: 'Алмазная колесница. Буддийское искусство России',
    venueId: 'pushkin',
    venue: 'ГМИИ им. А.С. Пушкина, Главное здание',
    city: 'moscow',
    category: 'classic',
    start: '2026-08-04',
    end: null,
    address: 'ул. Волхонка, 12',
    url: 'https://pushkinmuseum.art/events/',
    ticketUrl: 'https://pushkinmuseum.art/events/',
    price: null,
    summary: 'Более 700 экспонатов из собраний ГМИИ, Музея Востока и музеев Бурятии, Тывы и Калмыкии: тибетская, монгольская, китайская, непальская школы — и рядом с ними бурятская, тувинская, калмыцкая. Кураторы — Елизавета Ванеян и Нонна Альфонсо.',
    why: 'Столько буддийского искусства из российских республик в одном зале не собирали никогда, и многие статуи вообще не выставлялись раньше.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 2 },
    hype: { reason: 'Крупные издания назвали выставку хитом сезона, в залах людно даже в будни.', mentions30d: 3 },
    discovery: false,
    source: {
      primary: 'https://pushkinmuseum.art/events/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Открытие 04.08.2026 подтверждено. Дата закрытия в открытых источниках не объявлена — уточнить в музее.'
    },
    media: [
      { title: 'В Пушкинский музей заехала «Алмазная колесница» — Российская газета', url: 'https://rg.ru/2026/08/06/v-pushkinskij-muzej-zaehala-almaznaia-kolesnica.html' },
      { title: 'Выставка «Алмазная колесница» — Коммерсантъ', url: 'https://www.kommersant.ru/doc/8906539' }
    ]
  },

  {
    id: 'msk-tretyakov-borisov-musatov',
    title: 'Виктор Борисов-Мусатов. Гармония образа',
    venueId: 'tretyakov',
    venue: 'Третьяковская галерея, Корпус на Кадашёвской набережной',
    city: 'moscow',
    category: 'classic',
    start: '2026-07-09',
    end: '2026-11-08',
    address: 'Кадашёвская набережная, 12',
    url: 'https://www.tretyakovgallery.ru/exhibitions/',
    ticketUrl: 'https://www.tretyakovgallery.ru/exhibitions/',
    price: null,
    summary: 'Большая выставка одного из главных художников русского символизма в новом корпусе Третьяковки.',
    why: 'Редкая возможность увидеть вместе большое количество его работ — Борисова-Мусатова обычно показывают отдельными вещами в постоянной экспозиции.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://www.tretyakovgallery.ru/exhibitions/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium'
    },
    media: []
  },

  {
    id: 'msk-garage-1980s',
    title: 'Искусство на частоте 1980-х',
    venueId: 'garage',
    venue: 'Музей «Гараж», открытое хранение',
    city: 'moscow',
    category: 'contemporary',
    start: '2026-06-11',
    end: '2026-09-23',
    address: 'ул. Крымский Вал, 9с32, Парк Горького',
    url: 'https://garagemca.org/open-storage',
    ticketUrl: 'https://garagemca.org/exhibitions',
    price: null,
    summary: 'Первая часть большого проекта открытого хранения коллекции: искусство 1980-х в связке с массовой культурой — телевидением, прокатным кино, эстетикой рок-групп. Куратор архивной коллекции — Саша Обухова.',
    why: 'Вещи, которые обычно лежат в запасниках, выложены на открытый показ. В октябре ячейки сменятся на 1990-е — восьмидесятые можно увидеть только сейчас.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 3, rarity: 2, media: 3, novelty: 1 },
    hype: { reason: 'Арт-среда обсуждает сам формат: музей впервые открывает хранение коллекции.', mentions30d: 3 },
    discovery: false,
    source: {
      primary: 'https://garagemca.org/open-storage',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high'
    },
    media: [
      { title: 'Планы музея «Гараж» — The Art Newspaper Russia', url: 'https://www.theartnewspaper.ru/posts/20260423-bjvy/' },
      { title: 'Гараж объявляет программу на 2026 год', url: 'https://garagemca.org/news/2026-03-10-garage-museum-of-contemporary-art-announces-its-2026-program' }
    ]
  },

  {
    id: 'msk-pushkin-cuba-poster',
    title: 'Кино и революция. Кубинский плакат 1950–1970-х годов',
    venueId: 'pushkin',
    venue: 'ГМИИ им. А.С. Пушкина, Галерея искусства стран Европы и Америки',
    city: 'moscow',
    category: 'contemporary',
    start: '2026-07-21',
    end: '2026-11-22',
    address: 'ул. Волхонка, 14',
    url: 'https://pushkinmuseum.art/events/',
    ticketUrl: 'https://pushkinmuseum.art/events/',
    price: null,
    summary: 'Первая в России выставка кубинского плаката: более 140 листов и киноафиш — Феликс Бельтран, Альфредо Ростгаард, Рафаэль Моранте, Ньико. Многие работы атрибутированы в ходе подготовки проекта.',
    why: 'Кубинский киноплакат ЮНЕСКО включила в программу «Память мира». Все видели эту графику в перепечатках и почти никто — в оригинале.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://pushkinmuseum.art/events/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high'
    },
    media: [
      { title: 'Пушкинский музей представит выставку кубинского плаката — Интерфакс', url: 'https://www.interfax.ru/culture/1098304' }
    ]
  },

  {
    id: 'msk-cosmoscow',
    title: 'Cosmoscow 2026',
    venueId: null,
    venue: '«Тимирязев Центр»',
    city: 'moscow',
    category: 'contemporary',
    start: '2026-09-04',
    end: '2026-09-06',
    address: 'Верхняя аллея, 6с1',
    url: 'https://cosmoscow.com/',
    ticketUrl: 'https://cosmoscow.com/',
    price: null,
    summary: '14-й выпуск главной ярмарки современного искусства в стране: 108 галерей, 113 стендов, 17 тысяч квадратных метров на двух этажах и во дворе. Превью для коллекционеров — 3 сентября. Оформление выпуска сделано под влиянием работ Игоря Самолета, «Художника года».',
    why: 'За три дня можно увидеть срез всего, что делают российские галереи прямо сейчас. Ни одна выставка такого не даёт — и повторится это только через год.',
    signals: { institution: 2, artist: 3, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 2 },
    hype: { reason: 'Ярмарка открывает осенний сезон — про неё пишут все, кто вообще пишет об искусстве.', mentions30d: 3 },
    discovery: true,
    source: {
      primary: 'https://cosmoscow.com/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high',
      note: 'Адрес площадки в разных источниках указан по-разному (Верхняя аллея, 6с1 или 8) — сверить перед поездкой.'
    },
    media: [
      { title: 'Cosmoscow 2026 пройдёт в Москве в сентябре — Antenna Daily', url: 'https://antennadaily.ru/2026/07/29/cosmoscow-2026/' },
      { title: 'Международная ярмарка Cosmoscow 2026 — Sobaka.ru', url: 'https://www.sobaka.ru/nvr/entertainment/art/213567' }
    ]
  },

  {
    id: 'msk-zotov-bread',
    title: 'Хлеб',
    venueId: 'zotov',
    venue: 'Центр «Зотов»',
    city: 'moscow',
    category: 'history',
    start: '2026-09-03',
    end: '2027-01-17',
    address: 'ул. Ходынская, 2с1',
    url: 'https://centrezotov.ru/',
    ticketUrl: 'https://centrezotov.ru/',
    price: null,
    summary: 'История хлеба в России первой половины XX века — от кольцевого конвейера инженера Марсакова до хлеба как предмета коллективной памяти.',
    why: 'Выставка про хлеб в здании Хлебозавода №5, ради которого этот центр вообще существует. Редкий случай полного совпадения темы и места.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 3, rarity: 2, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://centrezotov.ru/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'msk-garage-1990s',
    title: 'Открытое хранение: российское искусство 1990-х',
    venueId: 'garage',
    venue: 'Музей «Гараж», открытое хранение',
    city: 'moscow',
    category: 'contemporary',
    start: '2026-10-16',
    end: '2027-03-31',
    endApprox: true,
    address: 'ул. Крымский Вал, 9с32, Парк Горького',
    url: 'https://garagemca.org/open-storage',
    ticketUrl: null,
    price: null,
    summary: 'Вторая часть открытого хранения — девяностые: время, по которому у «Гаража» самая плотная архивная коллекция в стране.',
    why: 'Девяностые сейчас пересматривают все, но у «Гаража» есть то, чего нет больше нигде, — сам архив.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 2, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://garagemca.org/open-storage', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: [
      { title: 'Планы музея «Гараж» — The Art Newspaper Russia', url: 'https://www.theartnewspaper.ru/posts/20260423-bjvy/' }
    ]
  },

  {
    id: 'msk-decorative-vrubel',
    title: 'Врубель. Рождение нового искусства',
    venueId: 'vmdpni',
    venue: 'Всероссийский музей декоративного искусства',
    city: 'moscow',
    category: 'classic',
    start: '2026-09-18',
    end: null,
    address: 'ул. Делегатская, 3',
    url: 'https://damuseum.ru/',
    ticketUrl: null,
    price: null,
    summary: 'К 170-летию Врубеля: впервые его керамика показана как самостоятельное художественное явление, а не приложение к живописи. Генеральный партнёр — Русский музей.',
    why: 'Серии по «Садко» и «Снегурочке» и камин «Вольга и Микула», собранный из 130 расписанных глазурями изразцов. Врубеля все знают по «Демону» — а это другая половина его работы.',
    signals: { institution: 2, artist: 3, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://damuseum.ru/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Открытие 18.09.2026 подтверждено, дата закрытия не объявлена.'
    },
    media: []
  },

  {
    id: 'msk-ges2-mou-sen',
    title: 'Моу Сэнь. Божественная комедия',
    venueId: 'ges2',
    venue: 'Дом культуры «ГЭС-2»',
    city: 'moscow',
    category: 'contemporary',
    start: '2026-09-10',
    end: '2027-02-21',
    address: 'Болотная набережная, 15',
    url: 'https://ges-2.org/',
    ticketUrl: null,
    price: 'Вход свободный',
    summary: 'Большая инсталляция китайского режиссёра и художника, сделанная для пространства «ГЭС-2».',
    why: 'Международных проектов такого масштаба сейчас мало, а «ГЭС-2» — единственная площадка в городе, где инсталляция может занять зал целиком.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 2, rarity: 3, media: 1, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://ges-2.org/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: [
      { title: 'ГЭС-2 представил программу на 2026 год — RTVI', url: 'https://rtvi.com/lifestyle/dom-kultury-ges-2-predstavil-vystavochnuyu-programmu-na-2026-god/' }
    ]
  },

  {
    id: 'msk-tretyakov-five-colors',
    title: 'Пять цветов осени',
    venueId: 'tretyakov',
    venue: 'Третьяковская галерея, Корпус на Кадашёвской набережной',
    city: 'moscow',
    category: null,
    start: '2026-09-13',
    end: '2026-09-20',
    address: 'Кадашёвская набережная, 12',
    url: 'https://www.tretyakovgallery.ru/exhibitions/',
    ticketUrl: 'https://www.tretyakovgallery.ru/exhibitions/',
    price: null,
    summary: 'Камерный проект Третьяковской галереи в новом корпусе на Кадашёвской набережной. Показ идёт всего восемь дней.',
    why: 'Восемь дней — это не выставка, а событие: либо попадаете в эти даты, либо не увидите вовсе.',
    signals: { institution: 3, artist: 2, scale: 1, curator: 2, rarity: 3, media: 1, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.tretyakovgallery.ru/exhibitions/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'msk-tretyakov-flowers',
    title: 'Цветы. Символ красоты',
    venueId: 'tretyakov',
    venue: 'Третьяковская галерея, Корпус на Кадашёвской набережной',
    city: 'moscow',
    category: 'classic',
    start: '2026-05-20',
    end: '2026-10-18',
    address: 'Кадашёвская набережная, 12',
    url: 'https://www.tretyakovgallery.ru/exhibitions/o/tsvety-simvol-krasoty/',
    ticketUrl: 'https://www.tretyakovgallery.ru/exhibitions/o/tsvety-simvol-krasoty/',
    price: '900 ₽, льготный 450–540 ₽',
    summary: 'Около 150 работ в семи разделах: как менялось изображение цветов от передвижников до авангарда. Левитан, Софья Кувшинникова, Коровин, Гончарова. К 170-летию галереи — фотографии семьи Павла Третьякова на фоне цветущей природы.',
    why: 'Завершают экспозицию цветочные полиптихи Ирины Старженецкой. «Коммерсантъ», впрочем, называет проект летним блокбастером без кураторских откровений — идти стоит за живописью, а не за концепцией.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 2, rarity: 2, media: 3, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://www.tretyakovgallery.ru/exhibitions/o/tsvety-simvol-krasoty/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high'
    },
    media: [
      { title: 'Выставка «Цветы» — Коммерсантъ', url: 'https://www.kommersant.ru/doc/8690662' }
    ]
  },

  {
    id: 'msk-vmdpni-black-dress',
    title: 'Маленькое чёрное платье. Из коллекции Эвелины Хромченко',
    venueId: 'vmdpni',
    venue: 'Всероссийский музей декоративного искусства',
    city: 'moscow',
    category: 'architecture',
    start: null,
    end: null,
    address: 'ул. Делегатская, 3',
    url: 'https://damuseum.ru/',
    ticketUrl: null,
    price: null,
    summary: 'Работы более 70 российских дизайнеров вокруг одного предмета — музей называет это главным событием своей осени.',
    why: 'Мода в музейной подаче: не витрины с манекенами, а разговор о том, как один силуэт держится сто лет.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 2, rarity: 2, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://damuseum.ru/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Заявлено в программе музея на осень 2026, даты не объявлены.'
    },
    media: []
  },

  /* ======================== САНКТ-ПЕТЕРБУРГ ======================== */

  {
    id: 'spb-rusmuseum-velikaya',
    title: 'Великая. Образ женщины в русском искусстве',
    venueId: 'rusmuseum',
    venue: 'Государственный Русский музей, Михайловский дворец',
    city: 'spb',
    category: 'classic',
    start: '2026-06-06',
    end: '2027-01-11',
    address: 'Инженерная улица, 4',
    url: 'https://rusmuseum.ru/exhibitions/current/',
    ticketUrl: 'https://rusmuseum.ru/exhibitions/current/',
    price: 'от 500 ₽',
    summary: 'Более 300 произведений XVIII — начала XX века в одиннадцати парадных залах Михайловского дворца: Репин, Брюллов, Серов, Крамской, Ге, Кустодиев. Рядом с живописью — придворные платья, украшения, веера.',
    why: 'Впервые публично показывают акварели великой княгини Ольги Александровны Романовой. Плюс одиннадцать парадных залов подряд — такой объём Русский музей отдаёт под временный проект редко.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://rusmuseum.ru/exhibitions/current/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Даты 06.06.2026–11.01.2027 по данным музея и «Фонтанки». Часть агрегаторов указывает окончание 31.10.2026 — сверить на сайте музея.'
    },
    media: [
      { title: 'Выставка «Великая» в Русском музее — Фонтанка', url: 'https://www.fontanka.ru/2026/06/08/76467434/' },
      { title: '«Великая. Образ женщины в русском искусстве» — Культура.РФ', url: 'https://www.culture.ru/events/6944240/vystavka-velikaya-obraz-zhenshiny-v-russkom-iskusstve-i-ekspoziciya-mikhailovskogo-dvorca' }
    ]
  },

  {
    id: 'spb-rusmuseum-shishkin',
    title: 'Иван Шишкин. Русский лес',
    venueId: 'rusmuseum',
    venue: 'Государственный Русский музей, корпус Бенуа',
    city: 'spb',
    category: 'classic',
    start: '2026-04-25',
    end: '2026-11-09',
    address: 'набережная канала Грибоедова, 2',
    url: 'https://rusmuseum.ru/exhibitions/current/',
    ticketUrl: 'https://rusmuseum.ru/exhibitions/current/',
    price: null,
    summary: 'Около 120 работ — от монументальных лесных ландшафтов до камерных этюдов. Собраны из Русского музея, Третьяковской галереи, ГМИИ Республики Татарстан и Национального художественного музея Беларуси.',
    why: 'Впервые живопись Шишкина показана в таком полном составе. И да, «Утро в сосновом лесу» здесь же.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://rusmuseum.ru/news/v-korpuse-benua-russkogo-muzeya-otkrylas-vystavka-ivana-shishkina/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high'
    },
    media: [
      { title: 'Русский музей открыл выставку Шишкина — Фонтанка', url: 'https://www.fontanka.ru/2026/04/27/76389982/' }
    ]
  },

  {
    id: 'spb-hermitage-catherine',
    title: 'Екатерина I',
    venueId: 'hermitage',
    venue: 'Государственный Эрмитаж, Николаевский зал Зимнего дворца',
    city: 'spb',
    category: 'history',
    start: '2026-05-19',
    end: '2026-09-27',
    address: 'Дворцовая площадь, 2',
    url: 'https://www.hermitagemuseum.org/',
    ticketUrl: 'https://www.hermitagemuseum.org/',
    price: 'от 700 ₽',
    summary: 'Более 450 экспонатов к 300-летию правления первой русской императрицы. Совместно с Музеями Московского Кремля, Российской национальной библиотекой, Институтом истории РАН и Центральным военно-морским музеем.',
    why: 'Открывает эрмитажную серию выставок о российских императорах. Один из главных экспонатов — шестиметровый позолоченный экипаж, построенный в Париже по заказу Петра.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 0 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.hermitagemuseum.org/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: [
      { title: 'Выставка «Екатерина I» — Фонтанка', url: 'https://www.fontanka.ru/2026/05/19/76429269/' },
      { title: 'В Эрмитаже представили масштабную выставку — РИА Новости', url: 'https://ria.ru/20260518/ermitazh-2093173215.html' }
    ]
  },

  {
    id: 'spb-manege-spatial-shift',
    title: 'Роммуло Вьейра Консейсан. Пространственный сдвиг',
    venueId: 'manege',
    venue: 'ЦВЗ «Манеж» — площадь перед зданием и атриум «Гранд Отеля Европа»',
    city: 'spb',
    category: 'contemporary',
    start: '2026-07-29',
    end: '2026-09-27',
    address: 'Исаакиевская площадь, 1 / Михайловская ул., 1–7',
    url: 'https://manege.spb.ru/categories/events/',
    ticketUrl: null,
    price: 'Паблик-арт на площади — бесплатно',
    summary: 'Инсталляция-лабиринт из цветных элементов на площади перед Манежем и скульптура «Под фундаментом» того же художника в атриуме «Гранд Отеля Европа».',
    why: 'Бразильский художник в центре Петербурга, и часть проекта можно увидеть бесплатно в любое время суток.',
    signals: { institution: 3, artist: 2, scale: 2, curator: 2, rarity: 3, media: 2, novelty: 2 },
    hype: { reason: 'Паблик-арт в центре города разошёлся по городским медиа и лентам горожан.', mentions30d: 3 },
    discovery: false,
    source: {
      primary: 'https://manege.spb.ru/categories/events/',
      retrieved: '2026-08-30',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Даты 29.07–27.09.2026 относятся к части в «Гранд Отеле Европа»; сроки паблик-арта на площади уточнить в Манеже.'
    },
    media: [{ title: 'Манеж — события', url: 'https://manege.spb.ru/categories/events/' }]
  },

  {
    id: 'spb-erarta-koryashkin',
    title: 'Александр Коряшкин. Пролог',
    venueId: 'erarta',
    venue: 'Музей современного искусства Эрарта',
    city: 'spb',
    category: 'contemporary',
    start: '2026-06-05',
    end: '2026-09-06',
    address: '29-я линия В.О., 2',
    url: 'https://www.erarta.com/ru/calendar/exhibitions/detail/',
    ticketUrl: 'https://www.erarta.com/',
    price: null,
    summary: 'Первая крупная персональная выставка художника: анатомическая точность рисунка и сюрреалистичные сюжеты. Значительная часть работ сделана в пандемию, в замкнутом домашнем пространстве.',
    why: 'Первая большая персоналка — тот момент, когда художника ещё можно увидеть целиком, а не по одной работе в групповых проектах.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 1, rarity: 2, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.erarta.com/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: [
      { title: 'Выставка Александра Коряшкина «Пролог» — Antenna Daily', url: 'https://antennadaily.ru/2026/06/08/vystavka-aleksandra-koryashkina-prolog/' }
    ]
  },

  {
    id: 'spb-erarta-woodcox',
    title: 'Роб Вудкокс. Безграничные возможности тела',
    venueId: 'erarta',
    venue: 'Музей современного искусства Эрарта',
    city: 'spb',
    category: 'photo',
    start: '2026-07-10',
    end: '2026-11-08',
    address: '29-я линия В.О., 2',
    url: 'https://www.erarta.com/ru/calendar/exhibitions/detail/25082501/',
    ticketUrl: 'https://www.erarta.com/',
    price: 'Входной билет в музей 1250 ₽',
    summary: 'Американский фотограф строит из человеческих тел скульптурные конструкции. Знаковые серии последних лет — о природе, памяти, танце и человеческом взаимодействии.',
    why: 'Тот редкий фотопроект, где эффект держится не на постобработке, а на том, что люди действительно так стояли.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 1, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.erarta.com/ru/calendar/exhibitions/detail/25082501/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: [
      { title: 'Выставка «Безграничные возможности тела» — Lenta.ru', url: 'https://lenta.ru/news/2026/08/04/rob-woodcox/' }
    ]
  },

  {
    id: 'spb-erarta-jimenez',
    title: 'Нестор Хименес. Спектр синего шума',
    venueId: 'erarta',
    venue: 'Музей современного искусства Эрарта',
    city: 'spb',
    category: 'contemporary',
    start: '2026-06-20',
    end: '2026-09-27',
    address: '29-я линия В.О., 2',
    url: 'https://www.erarta.com/ru/calendar/exhibitions/detail/',
    ticketUrl: 'https://www.erarta.com/',
    price: null,
    summary: 'Персональный проект художника в главном музее современного искусства города.',
    why: 'Эрарта держит несколько персональных выставок параллельно — по одному билету можно обойти четыре сразу.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 1, rarity: 2, media: 1, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.erarta.com/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'spb-erarta-saidov',
    title: 'Александр Саидов. Запретный сад',
    venueId: 'erarta',
    venue: 'Музей современного искусства Эрарта',
    city: 'spb',
    category: 'contemporary',
    start: '2026-06-27',
    end: '2026-09-20',
    address: '29-я линия В.О., 2',
    url: 'https://www.erarta.com/ru/calendar/exhibitions/detail/',
    ticketUrl: 'https://www.erarta.com/',
    price: null,
    summary: 'Персональная выставка живописца в Эрарте.',
    why: 'Закрывается 20 сентября — раньше, чем соседние проекты музея.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 1, rarity: 2, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://www.erarta.com/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'spb-ethno-gold',
    title: 'Другое золото. Золотошвейное искусство народов Евразии',
    venueId: 'ethno',
    venue: 'Российский этнографический музей',
    city: 'spb',
    category: 'history',
    start: '2026-03-01',
    startApprox: true,
    end: '2026-09-30',
    endApprox: true,
    address: 'Инженерная ул., 4/1',
    url: 'https://ethnomuseum.ru/',
    ticketUrl: null,
    price: null,
    summary: 'Золотное шитьё народов Евразии — техника, в которой парадный костюм и церковное облачение сходятся в одном ремесле.',
    why: 'Этнографический музей редко попадает в художественные подборки, а вещи у него уровня музейных шедевров. Закрывается в сентябре.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 2, rarity: 2, media: 1, novelty: 0 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://ethnomuseum.ru/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Известен только период: март — сентябрь 2026.'
    },
    media: []
  },

  {
    id: 'spb-ethno-altai',
    title: 'Страна золотых гор. К 270-летию вхождения алтайского народа в состав России',
    venueId: 'ethno',
    venue: 'Российский этнографический музей',
    city: 'spb',
    category: 'history',
    start: '2026-04-01',
    startApprox: true,
    end: '2027-03-31',
    endApprox: true,
    address: 'Инженерная ул., 4/1',
    url: 'https://ethnomuseum.ru/',
    ticketUrl: null,
    price: null,
    summary: 'Юбилейный проект об Алтае: костюм, культовые предметы, быт кочевников из профильного собрания музея.',
    why: 'Алтайские коллекции музея почти не показывают, а собрание здесь одно из старейших в стране.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 2, rarity: 2, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://ethnomuseum.ru/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Известен только период: апрель 2026 — март 2027.'
    },
    media: []
  },

  {
    id: 'spb-manege-animation',
    title: 'История анимации',
    venueId: 'manege',
    venue: 'ЦВЗ «Манеж»',
    city: 'spb',
    category: 'history',
    start: '2026-11-01',
    startApprox: true,
    end: null,
    address: 'Исаакиевская площадь, 1',
    url: 'https://manege.spb.ru/categories/events/',
    ticketUrl: null,
    price: null,
    summary: 'Следующее крупное открытие «Манежа»: личные вещи русских мультипликаторов, подлинные эскизы, раскадровки, документы и фотографии.',
    why: 'Манеж умеет делать большие сценографические выставки, а материал — из тех, что обычно лежит в архивах студий.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 2, rarity: 3, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://manege.spb.ru/categories/events/',
      retrieved: '2026-08-30',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Известен только месяц открытия — ноябрь 2026.'
    },
    media: [{ title: 'Манеж в Петербурге: выставки 2026 года — Горбилет', url: 'https://gorbilet.com/blog/news/manezh-v-peterburge-vystavki-2026-goda' }]
  },

  {
    id: 'spb-oranienbaum-romanov-music',
    title: 'Не царское дело. Музыкальные традиции дома Романовых XVII–XVIII веков',
    venueId: 'peterhof',
    venue: 'Ораниенбаум, Японский павильон Большого Меншиковского дворца',
    city: 'spb',
    category: 'history',
    start: '2026-08-30',
    end: '2026-11-30',
    address: 'Ломоносов, парк Ораниенбаум',
    url: 'https://peterhofmuseum.ru/',
    ticketUrl: 'https://peterhofmuseum.ru/',
    price: 'Бесплатно, билет оформить на сайте или в кассе Большого Меншиковского дворца',
    summary: 'Более 100 предметов, часть — впервые: как музыкальные увлечения Романовых от Михаила Фёдоровича до Павла I формировали русскую музыкальную культуру. Совместный проект «Петергофа» и Музея музыки.',
    why: 'Открылась только что, вход свободный, и отдельный раздел — про сам Ораниенбаум как музыкально-театральный центр с первым оперным залом и школой для детей.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 3 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://peterhofmuseum.ru/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'high',
      note: 'Пресс-показ прошёл 29.08.2026. В зимних анонсах проект фигурировал под рабочим названием «Не царское дело: музыкальные предпочтения семьи Романовых».'
    },
    media: [
      { title: 'Выставка «НЕ ЦАРСКОЕ ДЕЛО» — Туристический бизнес Санкт-Петербурга', url: 'https://www.pitert.ru/news/vystavka-tsarskoe-delo-fe' }
    ]
  },

  /* ======================== НИЖНИЙ НОВГОРОД ======================== */

  {
    id: 'nn-arsenal-slyusarev',
    title: 'Александр Слюсарев. Геометрия света',
    venueId: 'arsenal',
    venue: 'Арсенал, Волго-Вятский филиал ГМИИ им. А.С. Пушкина',
    city: 'nnov',
    category: 'photo',
    start: '2026-06-15',
    startApprox: true,
    end: '2026-09-20',
    address: 'Нижегородский кремль, корпус 6',
    url: 'https://arsenal-museum.art/',
    ticketUrl: 'https://arsenal-museum.art/',
    price: 'от 300 ₽, по средам вход свободный',
    summary: 'Ретроспектива из собрания Мультимедиа Арт Музея: более 100 работ 1960-х — начала 2000-х. Слюсарев — ключевая фигура неофициальной русской фотографии, автор термина «метафизическая фотография».',
    why: 'Его работы хранятся в Тейт Модерн, а выставки бывают раз в несколько лет и почти всегда в Москве. Здесь — в Нижнем, и до 20 сентября.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://arsenal-museum.art/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Закрытие 20.09.2026 по данным афиш; точная дата открытия — середина июня.'
    },
    media: [
      { title: 'Открылась выставка фотографа Александра Слюсарева — Правительство Нижегородской области', url: 'https://nobl.ru/novosti-nizhegorodskoj-oblasti-za-vse-vremya/v-nizhnem-novgorode-otkrylas-vystavka-fotografa-aleksandra-slyusareva-geometriya-sveta' },
      { title: 'Более 100 работ Слюсарева в Арсенале — Время Н', url: 'https://www.vremyan.ru/news/603741' }
    ]
  },

  {
    id: 'nn-terminal-a-arrow',
    title: 'Катя Антошкина. Не стой под стрелой',
    venueId: 'terminal-a',
    venue: 'ЦСИ «Терминал А»',
    city: 'nnov',
    category: 'contemporary',
    start: '2026-07-10',
    end: '2026-09-06',
    address: null,
    url: 'http://terminal-nn.site/',
    ticketUrl: null,
    price: '200 ₽, по средам вход свободный',
    summary: 'Персоналка по итогам арт-резиденции Нижегородской области: каким может быть современный оберег. Художница работает с фактурами городской среды — строительной плёнкой, минеральной ватой и хлебом.',
    why: 'Палитра самого «Терминала А» — жёлтый, серый, холодный сиреневый — вошла в работы напрямую. Закрывается 6 сентября.',
    signals: { institution: 1, artist: 2, scale: 2, curator: 2, rarity: 2, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'http://terminal-nn.site/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: [
      { title: 'Персональная выставка Кати Антошкиной — Правительство Нижегородской области', url: 'https://nobl.ru/novosti-nizhegorodskoj-oblasti-za-vse-vremya/v-tsentre-sovremennogo-iskusstva-terminal-a-otkroetsya-personalnaya-vystavka-kati-antoshkinoy-ne-sto' }
    ]
  },

  {
    id: 'nn-terminal-a-fragments',
    title: 'Дахан и Лариса Мэнт. Фрагменты / Fragments',
    venueId: 'terminal-a',
    venue: 'ЦСИ «Терминал А»',
    city: 'nnov',
    category: 'contemporary',
    start: null,
    end: null,
    address: null,
    url: 'http://terminal-nn.site/',
    ticketUrl: null,
    price: '200 ₽, по средам вход свободный',
    summary: 'Проект вырос из переписки и обмена медиафайлами между Нижним Новгородом и Дюссельдорфом — диалог художниц шёл с ноября 2025 по январь 2026. На выставке зин, видео и интерактивная часть.',
    why: 'Международный обмен на независимой площадке, устроенный без институций и бюджетов. Терминал А основан в 2021 году художницами и живёт в корпусах судостроительного завода XIX века.',
    signals: { institution: 1, artist: 2, scale: 2, curator: 2, rarity: 3, media: 2, novelty: 3 },
    hype: null,
    discovery: false,
    source: {
      primary: 'http://terminal-nn.site/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'На 28.08.2026 значилась в афише, дата закрытия не объявлена.'
    },
    media: []
  },

  {
    id: 'nn-rukavishnikov-kitchen',
    title: 'Возле господской кухни',
    venueId: 'ngiamz',
    venue: 'Усадьба Рукавишниковых',
    city: 'nnov',
    category: 'history',
    start: null,
    end: '2026-12-31',
    endApprox: true,
    address: 'Верхне-Волжская набережная, 7',
    url: 'https://ngiamz.ru/afisha',
    ticketUrl: null,
    price: null,
    summary: 'Посуда, хозяйственная утварь и бытовые предметы купеческого дома — изнутри, со стороны прислуги. Среди экспонатов цветная литография 1856 года «В безвыходном положении» с горничной и медным подносом.',
    why: 'Половина удовольствия здесь — сама усадьба, один из лучших сохранившихся особняков города с подлинным резным убранством второго этажа.',
    signals: { institution: 2, artist: 1, scale: 1, curator: 1, rarity: 1, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://ngiamz.ru/afisha',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Работает до конца 2026 года.'
    },
    media: []
  },

  /* ============================ КАЗАНЬ ============================ */

  {
    id: 'kzn-sandetsky-two-islands',
    title: 'Два острова. Древнерусское искусство XVI–XIX веков',
    venueId: 'izo',
    venue: 'ГМИИ РТ, усадьба Сандецкого',
    city: 'kazan',
    category: 'classic',
    start: '2026-05-22',
    end: null,
    address: 'ул. Карла Маркса, 64',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: 'https://izo-museum.ru/events/',
    price: 'Единый билет ГМИИ РТ',
    summary: 'Древнерусская иконопись и церковное искусство XVI–XIX веков из собрания музея — в залах особняка начала XX века.',
    why: 'Древнерусское искусство в Казани показывают редко, и именно здесь оно читается особенно любопытно — рядом с татарской культурой.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 2, rarity: 3, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://izo-museum.ru/events/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Открытие 22.05.2026 подтверждено, дата закрытия — нет.'
    },
    media: []
  },

  {
    id: 'kzn-womens-portrait',
    title: 'XI Международная фотовыставка «Женский портрет»',
    venueId: 'izo',
    venue: 'ГМИИ Республики Татарстан',
    city: 'kazan',
    category: 'photo',
    start: '2026-09-11',
    end: '2026-09-27',
    address: 'ул. Карла Маркса, 64',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: 'https://izo-museum.ru/events/',
    price: 'Единый билет ГМИИ РТ',
    summary: 'Одиннадцатый выпуск международного фотосмотра, который музей проводит уже много лет.',
    why: 'Идёт всего две с половиной недели — для фотографии в Казани это главный сезонный повод.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 2, rarity: 2, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://izo-museum.ru/events/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'kzn-gala-dali',
    title: 'Светлана Брайловская. Казань — родина Гала, музы Сальвадора Дали',
    venueId: 'izo-modern',
    venue: 'Галерея современного искусства ГМИИ РТ',
    city: 'kazan',
    category: 'contemporary',
    start: null,
    end: null,
    address: 'ул. Карла Маркса, 57',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: 'https://izo-museum.ru/events/',
    price: 'Единый билет ГМИИ РТ',
    summary: 'Елена Дьяконова — Гала, муза и жена Сальвадора Дали — родилась в Казани 26 августа 1894 года. Выставка разворачивает этот факт в полноценный сюжет.',
    why: 'Локальная история, которая внезапно оказывается частью мировой. Такое сложно сделать плохо.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 2, rarity: 2, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://izo-museum.ru/events/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'low' },
    media: []
  },

  {
    id: 'kzn-kremlin-lens',
    title: 'Кремлёвские грани: полвека в объективе',
    venueId: 'kremlin',
    venue: 'Музей Спасской башни, Казанский Кремль',
    city: 'kazan',
    category: 'photo',
    start: '2026-08-07',
    end: '2026-09-25',
    address: 'Казанский Кремль',
    url: 'https://kazan-kremlin.ru/',
    ticketUrl: 'https://kazan-kremlin.ru/',
    price: null,
    summary: 'Пятьдесят лет Казанского Кремля глазами фотографов — от позднесоветских съёмок до современных.',
    why: 'Смотреть на место, стоя внутри него же, — самый выигрышный формат для такой съёмки.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 2, rarity: 2, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://kazan-kremlin.ru/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'kzn-kremlin-secret-weapons',
    title: 'Потайное оружие XVIII–XX веков',
    venueId: 'kremlin',
    venue: 'Музей Пушечного двора, Казанский Кремль',
    city: 'kazan',
    category: 'history',
    start: '2025-10-28',
    end: '2026-10-18',
    address: 'Казанский Кремль',
    url: 'https://kazan-kremlin.ru/',
    ticketUrl: 'https://kazan-kremlin.ru/',
    price: null,
    summary: 'Замаскированное и потайное оружие двух столетий: трости, перстни, портсигары и другие предметы двойного назначения.',
    why: 'Узкая коллекционная тема, сделанная как показ вещей, а не как краеведческий стенд.',
    signals: { institution: 2, artist: 1, scale: 2, curator: 1, rarity: 2, media: 1, novelty: 0 },
    hype: null,
    discovery: false,
    source: { primary: 'https://kazan-kremlin.ru/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'kzn-hazine-kuznetsov',
    title: 'Михаил Кузнецов-Казанский. Счастье — творить',
    venueId: 'hazine',
    venue: 'Национальная художественная галерея «Хазинэ»',
    city: 'kazan',
    category: 'classic',
    start: '2026-08-07',
    end: '2026-09-06',
    address: 'Казанский Кремль, проезд Шейнкмана, 12',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: 'https://izo-museum.ru/events/',
    price: 'Единый билет ГМИИ РТ',
    summary: 'Персональная выставка казанского художника в главной галерее республики.',
    why: 'Закрывается через неделю — из тех вещей, которые откладываешь и не успеваешь.',
    signals: { institution: 2, artist: 1, scale: 2, curator: 1, rarity: 1, media: 1, novelty: 0 },
    hype: null,
    discovery: false,
    source: { primary: 'https://izo-museum.ru/events/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'kzn-izo-burkina-faso',
    title: 'Страна честных людей. Традиционная скульптура Буркина-Фасо',
    venueId: 'izo-modern',
    venue: 'Галерея современного искусства ГМИИ РТ',
    city: 'kazan',
    category: 'history',
    start: null,
    end: null,
    address: 'ул. Карла Маркса, 57',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: null,
    price: 'Единый билет ГМИИ РТ',
    summary: 'Шестьдесят бронзовых скульптур 34 современных африканских мастеров, сделанных в технике «потерянного воска» — ремесле, которое династии литейщиков Буркина-Фасо ведут с XV века. Больше половины работ — женские образы.',
    why: 'Африканское искусство за пределами Москвы и Петербурга почти не встречается. В Россию коллекция приехала через Новосибирск, дальше маршрута нет.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 2, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://izo-museum.ru/events/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Открытие было приурочено к KazanForum 2026, точные даты не объявлены.'
    },
    media: [
      { title: 'В ГСИ привезли скульптуры из Буркина-Фасо — Реальное время', url: 'https://realnoevremya.ru/articles/395199-v-gsi-privezli-skulptury-iz-burkina-faso' }
    ]
  },

  {
    id: 'kzn-lyalya-kuznetsova',
    title: 'Ляля Кузнецова. Я с вами, мои друзья!',
    venueId: 'izo-modern',
    venue: 'Галерея современного искусства ГМИИ РТ',
    city: 'kazan',
    category: 'photo',
    start: null,
    end: null,
    address: 'ул. Карла Маркса, 57',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: 'https://izo-museum.ru/events/',
    price: 'Единый билет ГМИИ РТ',
    summary: 'Ретроспектива к 80-летию фотографа: около 90 снимков из коллекции ГМИИ РТ.',
    why: 'Кузнецова — обладательница медали Превосходства Leica и одно из немногих российских имён, известных в мировой документальной фотографии. Работает она в Казани.',
    signals: { institution: 2, artist: 3, scale: 2, curator: 2, rarity: 3, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://izo-museum.ru/events/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'low',
      note: 'Значится в афише галереи, даты не объявлены.'
    },
    media: []
  },

  {
    id: 'kzn-sandetsky-vintage',
    title: 'Надежда Ягофарова. Винтаж в интерьере',
    venueId: 'izo',
    venue: 'ГМИИ РТ, усадьба Сандецкого',
    city: 'kazan',
    category: 'architecture',
    start: null,
    end: null,
    address: 'ул. Карла Маркса, 64',
    url: 'https://izo-museum.ru/events/',
    ticketUrl: null,
    price: 'Единый билет ГМИИ РТ',
    summary: 'Предметный дизайн и интерьер в залах особняка Сандецкого.',
    why: 'Выставка про интерьер в настоящем историческом интерьере — редкое совпадение содержания и стен.',
    signals: { institution: 2, artist: 1, scale: 1, curator: 1, rarity: 1, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://izo-museum.ru/events/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'low' },
    media: []
  },

  /* =========================== ЧЕЛЯБИНСК =========================== */

  {
    id: 'chel-french-classics',
    title: 'Классика французского искусства. Живопись, гравюра и скульптура XVII–XX веков',
    venueId: 'chelmusart',
    venue: 'Челябинский музей изобразительных искусств, зал имени архитектора Е.В. Александрова',
    city: 'chel',
    category: 'classic',
    start: '2026-06-15',
    end: null,
    address: 'площадь Революции, 1',
    url: 'https://chelmusart.ru/exhibitions',
    ticketUrl: 'https://chelmusart.ru/exhibitions',
    price: null,
    summary: '49 произведений из собрания ГМИИ им. А.С. Пушкина: Симон Вуэ, Пуссен, Грёз, Виже-Лебрен, Юбер Робер, Роза Бонёр, Ренуар, Писсарро. Многие вещи происходят из коллекций, приобретённых Екатериной II, и из собраний Юсуповых, Голицыных, Шуваловых, Барятинских.',
    why: 'Привоз из Пушкинского случился после 18-летнего перерыва. Самый ранний экспонат — картина Симона Вуэ 1618 года.',
    signals: { institution: 2, artist: 3, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 1 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://chelmusart.ru/exhibitions',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Открытие 15.06.2026 и состав подтверждены, дата закрытия не объявлена.'
    },
    media: [
      { title: 'В Челябинске покажут французский шарм сокровищ Пушкинского музея — АиФ', url: 'https://chel.aif.ru/culture/v-chelyabinske-pokazhut-francuzskiy-sharm-sokrovishch-pushkinskogo-muzeya' }
    ]
  },

  {
    id: 'chel-blue-color',
    title: 'Небесная лазурь. Символика синего цвета в искусстве',
    venueId: 'chelmuseum',
    venue: 'Государственный исторический музей Южного Урала',
    city: 'chel',
    category: 'history',
    start: '2026-09-23',
    end: '2027-01-24',
    address: 'ул. Труда, 100',
    url: 'https://chelmuseum.ru/exhibitions/',
    ticketUrl: 'https://chelmuseum.ru/exhibitions/',
    price: 'от 100 до 500 ₽',
    summary: 'Более ста экспонатов из собрания Музеев Московского Кремля: иконы, парадные одеяния, книги, предметы роскоши и церковного обихода, принадлежавшие царям и митрополитам. Завершает экспозицию парадный синий кафтан юного императора Петра II.',
    why: 'Сто предметов из Музеев Московского Кремля в Челябинске — то, ради чего стоит отменить другие планы. Город готовится стать Культурной столицей России 2027 года, и это первый проект такого уровня.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 2 },
    hype: null,
    discovery: false,
    source: { primary: 'https://chelmuseum.ru/exhibitions/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: [
      { title: 'Музей Южного Урала открывает выставку из Кремля', url: 'https://mgorsk.ru/text/gorod/2026/07/30/76561660/' },
      { title: 'В Челябинск привезут синие экспонаты из Музеев Московского Кремля — ЕАН', url: 'https://eanews.ru/chelyabinsk/20260730161602/v-chelyabinsk-privezut-sinie-eksponaty-iz-sobraniya-muzeev-moskovskogo-kremlya' }
    ]
  },

  {
    id: 'chel-astakhov',
    title: 'Олег Астахов. Городские зарисовки',
    venueId: 'chelmuseum',
    venue: 'Государственный исторический музей Южного Урала',
    city: 'chel',
    category: 'photo',
    start: null,
    end: null,
    address: 'ул. Труда, 100',
    url: 'https://chelmuseum.ru/exhibitions/',
    ticketUrl: null,
    price: 'от 100 до 500 ₽',
    summary: 'Челябинск последних пяти лет глазами местного фотохудожника.',
    why: 'Городская съёмка своими, а не приезжими глазами — обычно самая точная.',
    signals: { institution: 2, artist: 1, scale: 1, curator: 1, rarity: 1, media: 1, novelty: 1 },
    hype: null,
    discovery: false,
    source: { primary: 'https://chelmuseum.ru/exhibitions/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'low' },
    media: []
  },

  {
    id: 'chel-rgo',
    title: 'Русское географическое общество и его роль в изучении природного наследия Южного Урала',
    venueId: 'chelmuseum',
    venue: 'Государственный исторический музей Южного Урала, 4-й этаж восточной башни',
    city: 'chel',
    category: 'history',
    start: '2026-01-16',
    end: null,
    address: 'ул. Труда, 100',
    url: 'https://chelmuseum.ru/exhibitions/',
    ticketUrl: null,
    price: 'от 100 до 500 ₽',
    summary: 'К 180-летию РГО: экспедиции, просветительская работа челябинского отделения и приборы географов — гигрограф, кипрегель, солемер, теодолит.',
    why: 'Небольшой модульный стенд, но приборы стоит увидеть. И это хороший повод дойти до музея, где в соседнем зале лежит чебаркульский метеорит.',
    signals: { institution: 2, artist: 1, scale: 1, curator: 1, rarity: 2, media: 1, novelty: 0 },
    hype: null,
    discovery: false,
    source: {
      primary: 'https://chelmuseum.ru/exhibitions/',
      retrieved: '2026-08-31',
      lastChecked: '2026-08-31',
      confidence: 'medium',
      note: 'Открылась 16.01.2026, дата закрытия не объявлена.'
    },
    media: []
  },

  /* ================= ЗАВЕРШИВШИЕСЯ (в выдачу не попадают) ================= */

  {
    id: 'msk-ges2-khadzary',
    title: 'Хадзары. Осетинские дворы',
    venueId: 'ges2', venue: 'Дом культуры «ГЭС-2»', city: 'moscow', category: 'architecture',
    start: '2026-04-23', end: '2026-08-30', address: 'Болотная набережная, 15',
    url: 'https://ges-2.org/', ticketUrl: null, price: 'Вход свободный',
    summary: 'Итог программы «ГЭС-2: Города» во Владикавказе. Завершилась 30 августа.',
    why: 'Хранится как завершённая.',
    signals: { institution: 3, artist: 2, scale: 2, curator: 2, rarity: 2, media: 2, novelty: 1 },
    hype: null, discovery: false,
    source: { primary: 'https://ges-2.org/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'spb-manege-russian-imperative',
    title: 'Русский императив',
    venueId: 'manege', venue: 'ЦВЗ «Манеж»', city: 'spb', category: 'history',
    start: '2026-05-08', end: '2026-07-12', address: 'Исаакиевская площадь, 1',
    url: 'https://manege.spb.ru/', ticketUrl: null, price: null,
    summary: 'Крупный выставочный проект «Манежа». Завершился.',
    why: 'Хранится как завершённый.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 2, rarity: 2, media: 3, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://manege.spb.ru/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'spb-erarta-safardiar',
    title: 'Юнус Сафардиар. Точка отсчёта',
    venueId: 'erarta', venue: 'Музей современного искусства Эрарта', city: 'spb', category: 'contemporary',
    start: '2026-05-29', end: '2026-08-16', address: '29-я линия В.О., 2',
    url: 'https://www.erarta.com/', ticketUrl: null, price: null,
    summary: 'Персональная выставка в Эрарте. Завершилась 16 августа.',
    why: 'Хранится как завершённая.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 1, rarity: 2, media: 1, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://www.erarta.com/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'nn-arsenal-impressionists',
    title: 'Импрессионисты из собрания Пушкинского музея',
    venueId: 'arsenal', venue: 'Арсенал, Волго-Вятский филиал ГМИИ', city: 'nnov', category: 'classic',
    start: null, end: '2026-07-26', address: 'Нижегородский кремль, корпус 6',
    url: 'https://arsenal-museum.art/', ticketUrl: null, price: null,
    summary: 'Импрессионисты из Галереи искусства стран Европы и Америки. Завершилась.',
    why: 'Хранится как завершённая.',
    signals: { institution: 3, artist: 3, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://arsenal-museum.art/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'kzn-hermitage-yusupov',
    title: 'Юсуповы. Роскошь сквозь века',
    venueId: 'hermitage-kazan', venue: 'Центр «Эрмитаж-Казань»', city: 'kazan', category: 'classic',
    start: '2025-10-17', end: '2026-07-05', address: 'Казанский Кремль',
    url: 'https://kazan-kremlin.ru/en/museums/czentr-ermitazh-kazan', ticketUrl: null, price: '450 ₽ / 350 ₽ льготный',
    summary: 'Более 400 предметов из собрания Эрмитажа. Завершилась.',
    why: 'Хранится как завершённая.',
    signals: { institution: 3, artist: 2, scale: 3, curator: 3, rarity: 3, media: 3, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://kazan-kremlin.ru/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'kzn-smena-tashkent',
    title: 'Казань — Ташкент',
    venueId: 'smena', venue: 'ЦСК «Смена»', city: 'kazan', category: 'contemporary',
    start: '2026-03-22', end: '2026-06-14', address: 'ул. Бурхана Шахиди, 7',
    url: 'https://s-m-e-n-a.org/exhibitions/', ticketUrl: null, price: 'Бесплатно',
    summary: 'Проект «Смены» о связях двух городов. Завершился.',
    why: 'Хранится как завершённый.',
    signals: { institution: 2, artist: 2, scale: 2, curator: 3, rarity: 2, media: 2, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://s-m-e-n-a.org/exhibitions/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'msk-zotov-vertov',
    title: 'Дзига Вертов. Киноглаз',
    venueId: 'zotov', venue: 'Центр «Зотов»', city: 'moscow', category: 'contemporary',
    start: '2026-02-26', end: '2026-07-26', address: 'ул. Ходынская, 2с1',
    url: 'https://centrezotov.ru/', ticketUrl: null, price: null,
    summary: 'Выставка-фильм о патриархе советского документального кино. Завершилась.',
    why: 'Хранится как завершённая.',
    signals: { institution: 2, artist: 3, scale: 3, curator: 3, rarity: 2, media: 3, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://centrezotov.ru/', retrieved: '2026-08-30', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'nn-manege-sobor-svyatyh',
    title: 'Собор Святых. Три века деревянной храмовой скульптуры Нижегородского края',
    venueId: 'ngiamz', venue: 'Манеж Нижегородского кремля', city: 'nnov', category: 'history',
    start: '2026-04-12', end: '2026-07-31', endApprox: true, address: 'Нижегородский кремль, корпус 1а',
    url: 'https://ngiamz.ru/afisha', ticketUrl: null, price: null,
    summary: 'Более 70 предметов сакральной пластики XVII — начала XX века из музеев Нижнего, Арзамаса, Балахны, Ветлуги и Городца. По афише работала до конца июля.',
    why: 'Хранится как завершённая — если музей продлил показ, вернуть запись в выдачу можно, поправив дату.',
    signals: { institution: 2, artist: 2, scale: 3, curator: 2, rarity: 3, media: 2, novelty: 0 },
    hype: null, discovery: false,
    source: {
      primary: 'https://ngiamz.ru/afisha', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium',
      note: 'Открылась 12.04.2026. Последний подтверждённый срок работы — конец июля 2026.'
    },
    media: [
      { title: 'В Манеже кремля открылась выставка «Собор Святых» — Нижегородская правда', url: 'https://pravda-nn.ru/news/v-manezhe-nizhegorodskogo-kremlya-otkrylas-vystavka-sobor-svyatyh/' }
    ]
  },

  {
    id: 'chel-prokudin-gorsky',
    title: 'По пути Прокудина-Горского',
    venueId: 'chelmuseum', venue: 'Государственный исторический музей Южного Урала', city: 'chel', category: 'photo',
    start: null, end: '2026-07-19', address: 'ул. Труда, 100',
    url: 'https://prokudin-gorskij.chelmuseum.ru/', ticketUrl: null, price: 'от 100 ₽',
    summary: 'Снимки Челябинской области 1909–1910 годов рядом с современными видами тех же мест. Завершилась 19 июля.',
    why: 'Хранится как завершённая. У проекта остался отдельный сайт с маршрутами экспедиции и технологией трёхцветной съёмки.',
    signals: { institution: 2, artist: 3, scale: 2, curator: 2, rarity: 2, media: 1, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://prokudin-gorskij.chelmuseum.ru/', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'medium' },
    media: []
  },

  {
    id: 'chel-russian-impressionism-2023',
    title: 'Импрессионизм в России. Живопись из собрания Русского музея',
    venueId: 'chelmusart', venue: 'Челябинский музей изобразительных искусств', city: 'chel', category: 'classic',
    start: '2023-11-16', end: '2024-02-25', address: 'площадь Революции, 1',
    url: 'https://chelmusart.ru/node/19297', ticketUrl: null, price: null,
    summary: 'Около 50 картин 28 художников из Русского музея — Коровин, Репин, Кустодиев, Левитан. Завершилась в феврале 2024 года.',
    why: 'Хранится как завершённая: агрегаторы до сих пор выдают её как актуальную, и на эту ошибку легко наступить снова.',
    signals: { institution: 2, artist: 3, scale: 3, curator: 3, rarity: 3, media: 2, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://chelmusart.ru/node/19297', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  },

  {
    id: 'msk-garage-nazarenko',
    title: 'Татьяна Назаренко. Переход',
    venueId: 'garage', venue: 'Музей «Гараж», атриум', city: 'moscow', category: 'contemporary',
    start: '2026-03-17', end: '2026-07-07', address: 'ул. Крымский Вал, 9с32',
    url: 'https://garagemca.org/exhibitions', ticketUrl: null, price: null,
    summary: 'Проект в атриуме музея. Завершился.',
    why: 'Хранится как завершённый.',
    signals: { institution: 3, artist: 3, scale: 2, curator: 2, rarity: 2, media: 2, novelty: 0 },
    hype: null, discovery: false,
    source: { primary: 'https://garagemca.org/exhibitions', retrieved: '2026-08-31', lastChecked: '2026-08-31', confidence: 'high' },
    media: []
  }
];
