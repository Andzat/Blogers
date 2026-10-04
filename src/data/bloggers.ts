import { Blogger } from '../types/blogger';

export const BLOGGERS_DATA: Blogger[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    handle: '@alex.quantum',
    gender: 'male',
    category: 'tech',
    categoryLabel: 'AI & Технології',
    avatar: '/images/alex_avatar.jpg',
    verified: true,
    status: 'online',
    statusText: 'У мережі (Сан-Франциско)',
    shortBio: 'AI-стартапер і техно-євангеліст. Розповідаю про нейромережі, квантові обчислення та майбутнє автономних агентів.',
    fullBio: 'Засновник венчурного фонду Quantum AI Labs та автор подкасту про технологічну сингулярність. Тестую закриті мовні моделі, створюю автономних агентів для бізнесу та ділюся інсайдами Кремнієвої долини до їх появи у TechCrunch.',
    location: 'San Francisco, CA',
    subscribers: '142.8K',
    engagement: '8.4%',
    telegramLink: 'https://t.me/telegram',
    telegramChannelName: '@alex_quantum_ai',
    tags: ['#ArtificialIntelligence', '#DeepTech', '#AutonomousAgents', '#Startups'],
    personalityTraits: ['Аналітичний розум', 'Техно-оптиміст', 'Продуктовий візіонер'],
    feedPosts: [
      {
        id: 'post-alex-1',
        image: '/images/alex_post.jpg',
        caption: 'Щойно зі сцени Global Tech Summit. Продемонстрував роботу рою автономних AI-агентів. Майбутнє настало значно швидше, ніж ми очікували. Незабаром детальний розбір у Telegram!',
        likes: 4210,
        comments: 318,
        timeAgo: '2 години тому'
      },
      {
        id: 'post-alex-2',
        image: '/images/alex_avatar.jpg',
        caption: 'Ранковий кодинг в офісі перед пітчем інвесторам. Які нейромережі ви використовуєте у щоденній роботі? Діліться у коментарях!',
        likes: 3890,
        comments: 245,
        timeAgo: 'Вчора'
      }
    ],
    defaultChatWelcome: 'Привіт! Я Алекс. Розробляю AI-агентів та аналізую майбутнє технологій. Про що хочеш дізнатися — про найновіші LLM, стартапи чи як ми створюємо цифрових людей?',
    quickPrompts: [
      {
        id: 'prompt-1',
        question: '🤖 Чи замінять AI-агенти розробників?',
        response: 'AI не замінить розробників, але розробник з AI-агентами замінить 10 класичних програмістів. Зараз ідеальний час вивчати оркестрацію моделей та prompt engineering!'
      },
      {
        id: 'prompt-2',
        question: '📈 Які AI-тренди злетять цього року?',
        response: 'Мультимодальні персональні асистенти, локальні SLM на пристроях та автономні бізнес-агенти, здатні закривати повні ланцюжки завдань без ручного нагляду.'
      },
      {
        id: 'prompt-3',
        question: '💡 Який стек рекомендуєш новачкам?',
        response: 'TypeScript + Python, FastAPI, векторні бази даних (Pinecone/Qdrant) та розуміння LangChain. Це золотий стандарт сучасної AI-інженерії.'
      }
    ]
  },
  {
    id: 'mark-sterling',
    name: 'Mark Sterling',
    handle: '@mark.wild',
    gender: 'male',
    category: 'travel',
    categoryLabel: 'Екстрим & Подорожі',
    avatar: '/images/mark_avatar.jpg',
    verified: true,
    status: 'online',
    statusText: 'На зв\'язку (Норвегія, Фьорди)',
    shortBio: 'Дослідник дикої природи та екстремальний документаліст. Показую планету там, де закінчується асфальт.',
    fullBio: 'Професійний альпініст, фотограф National Geographic Contributor та соло-мандрівник. Перетнув Патагонію пішки, ночував на льодовиках Гренландії та веду щоденник експедицій у 4K з дрона.',
    location: 'Stavanger, Norway',
    subscribers: '218.4K',
    engagement: '11.2%',
    telegramLink: 'https://t.me/telegram',
    telegramChannelName: '@mark_wild_expeditions',
    tags: ['#ExtremeTravel', '#NorwayFjords', '#SoloCamping', '#Adventure'],
    personalityTraits: ['Безстрашний', 'Романтик доріг', 'Професійний оператор'],
    feedPosts: [
      {
        id: 'post-mark-1',
        image: '/images/mark_post.jpg',
        caption: 'Світанок над Прейкестоленом при -4°C. Гаряча кава з термоса і цілковита тиша над прірвою. У такі миті усвідомлюєш, заради чого варто жити.',
        likes: 7430,
        comments: 512,
        timeAgo: '4 години тому'
      },
      {
        id: 'post-mark-2',
        image: '/images/mark_avatar.jpg',
        caption: 'Фінальний чек спорядження перед 50-кілометровим автономним переходом хребтом. Головне правило гір: завжди поважай погоду.',
        likes: 5620,
        comments: 340,
        timeAgo: '3 дні тому'
      }
    ],
    defaultChatWelcome: 'Салют! Я Марк. Пишу безпосередньо з базового табору в горах. Якщо плануєш дикий похід, обираєш спорядження чи шукаєш нетуристичні маршрути — запитуй!',
    quickPrompts: [
      {
        id: 'prompt-1',
        question: '🏕️ Твоя головна порада для гірських походів?',
        response: 'Принцип багатошаровості в одязі та ніколи не заощаджувати на мембранній куртці й трекінговому взутті. Гори вибачають втому, але не вибачають переохолодження!'
      },
      {
        id: 'prompt-2',
        question: '📸 На яку камеру ти знімаєш експедиції?',
        response: 'Основна тушка — Sony A7R V з об\'єктивом 24-70mm f/2.8 GM II, плюс ультракомпактний дрон DJI Mini 4 Pro. Головне — тримати запасні акумулятори у теплій внутрішній кишені.'
      },
      {
        id: 'prompt-3',
        question: '🗺️ Куди вирушити новачкові у перший трек?',
        response: 'Лікійська стежка в Туреччині навесні або восени, або Норвегія (маршрути навколо Одди) влітку. Неймовірні краєвиди та зручна інфраструктура для першого досвіду.'
      }
    ]
  },
  {
    id: 'elena-vogue',
    name: 'Elena Vogue',
    handle: '@elena.couture',
    gender: 'female',
    category: 'fashion',
    categoryLabel: 'High Fashion & Стиль',
    avatar: '/images/elena_avatar.jpg',
    verified: true,
    status: 'online',
    statusText: 'У мережі (Мілан, Fashion Week)',
    shortBio: 'Цифрова топмодель та стиліст Haute Couture. Інсайди з подіумів Мілана й Парижа, тренди та колаборації.',
    fullBio: 'Обличчя цифрових показів Metaverse Fashion Week та муза незалежних європейських дизайнерів. Оглядаю кутюрні колекції, ділюся секретами фотопозування та капсульного гардероба преміум-сегмента.',
    location: 'Milan, Italy',
    subscribers: '315.6K',
    engagement: '9.7%',
    telegramLink: 'https://t.me/telegram',
    telegramChannelName: '@elena_vogue_milan',
    tags: ['#HauteCouture', '#MilanFashion', '#VogueStyle', '#DigitalSupermodel'],
    personalityTraits: ['Бездоганний смак', 'Граційність', 'Кутюрний інсайдер'],
    feedPosts: [
      {
        id: 'post-elena-1',
        image: '/images/elena_post.jpg',
        caption: 'Закривала кутюрний показ біля Ейфелевої вежі. Сукня з оптичного шовку та металізованої нитки. Як вам цей футуристичний образ?',
        likes: 12400,
        comments: 890,
        timeAgo: '1 годину тому'
      },
      {
        id: 'post-elena-2',
        image: '/images/elena_avatar.jpg',
        caption: 'Вечірній Мілан після серії примірок. Світло заходу сонця на соборі Duomo — найкраще натхнення для нової капсули.',
        likes: 9800,
        comments: 672,
        timeAgo: '2 дні тому'
      }
    ],
    defaultChatWelcome: 'Ciao, любий! Я Олена. Занурюю у світ високої моди, естетики та закритих показів. Поговоримо про тренди сезону чи допомогти підібрати вечірній образ?',
    quickPrompts: [
      {
        id: 'prompt-1',
        question: '👗 Головний тренд високої моди цього сезону?',
        response: 'Металізовані текучі тканини (liquid chrome), деконструкція класичних смокінгів та розумний текстиль, який плавно змінює відтінок залежно від кута світла.'
      },
      {
        id: 'prompt-2',
        question: '✨ Як зібрати базовий гардероб з дорогим виглядом?',
        response: 'Якісні натуральні тканини (вовна, шовк, щільна бавовна), ідеальна посадка по фігурі та стримана нейтральна палітра: графіт, молочний, глибокий шоколад.'
      },
      {
        id: 'prompt-3',
        question: '👠 Як цифрова мода трансформує реальні подіуми?',
        response: 'Бренди моделюють 3D-двійників колекцій ще до пошиття. Це заощаджує тонни тканини й дозволяє тестувати найсміливіші авангардні силуети!'
      }
    ]
  },
  {
    id: 'kira-novak',
    name: 'Kira Novak',
    handle: '@kira.biohack',
    gender: 'female',
    category: 'fitness',
    categoryLabel: 'Біохакінг & Фітнес',
    avatar: '/images/kira_avatar.jpg',
    verified: true,
    status: 'online',
    statusText: 'На тренуванні (Токіо, Сібуя)',
    shortBio: 'Біохакерка, тренерка функціонального довголіття та майндфулнес. Керую біометрією, сном та енергією тіла.',
    fullBio: 'Сертифікована спеціалістка з longevity-протоколів та нейром\'язової координації. Тестую портативні сенсори метаболізму, дихальні практики та персональні нутрицевтики для абсолютної ясності розуму.',
    location: 'Tokyo, Japan',
    subscribers: '189.2K',
    engagement: '12.8%',
    telegramLink: 'https://t.me/telegram',
    telegramChannelName: '@kira_biohack_life',
    tags: ['#Biohacking', '#Longevity', '#Mindfulness', '#FunctionalFitness'],
    personalityTraits: ['Дисципліна', 'Енергія', 'Науковий підхід до здоров\'я'],
    feedPosts: [
      {
        id: 'post-kira-1',
        image: '/images/kira_post.jpg',
        caption: 'Ранкова 20-хвилинна мобілізація над світанковим Токіо. Лише 3 дихальні цикли 4-7-8 та динамічна розтяжка активують парасимпатичну систему краще за каву.',
        likes: 6890,
        comments: 430,
        timeAgo: '3 години тому'
      },
      {
        id: 'post-kira-2',
        image: '/images/kira_avatar.jpg',
        caption: 'Тестую новий протокол інтервального відновлення пульсу після силової сесії. Пам\'ятайте: зростання м\'язів відбувається не на тренуванні, а під час глибокого сну.',
        likes: 5410,
        comments: 295,
        timeAgo: 'Вчора'
      }
    ],
    defaultChatWelcome: 'Привіт! Я Кіра. Допомагаю налаштувати тіло й мозок на пікову продуктивність без вигорання. Хочеш розібрати режим сну, протокол тренувань чи корисні добавки?',
    quickPrompts: [
      {
        id: 'prompt-1',
        question: '⚡ Як подолати денну сонливість без кави?',
        response: '1) 10 хвилин яскравого денного світла одразу після пробудження. 2) 500 мл води з дрібкою електролітів. 3) 2 хвилини діафрагмального дихання. Кортизоловий ритм швидко відновиться!'
      },
      {
        id: 'prompt-2',
        question: '🧘 Скільки тренуватися для бадьорості, а не втоми?',
        response: '3 силові сесії по 45 хвилин на тиждень у помірному темпі + щоденні 8000–10000 кроків у зоні 1-2 пульсу. Перетренованість лише провокує хронічне запалення.'
      },
      {
        id: 'prompt-3',
        question: '🌙 Топ-3 звички для глибокого відновлювального сну?',
        response: 'Жодної їжі за 3 години до сну, відмова від синіх екранів за годину (або жовті лінзи) і температура в спальні 18–19°C. Ваш глибокий сон зросте на 35% уже за дві ночі.'
      }
    ]
  }
];
