export interface LanguageMeta50 {
  code: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

// Complete 50-language global catalog
export const LANGUAGES_50: LanguageMeta50[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese (Simplified)', dir: 'ltr' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', dir: 'ltr' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr' },
  { code: 'fa', nativeName: 'فارسی', englishName: 'Persian', dir: 'rtl' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', dir: 'rtl' },
  { code: 'he', nativeName: 'עברית', englishName: 'Hebrew', dir: 'rtl' },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr' },
  { code: 'pl', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr' },
  { code: 'sv', nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr' },
  { code: 'no', nativeName: 'Norsk', englishName: 'Norwegian', dir: 'ltr' },
  { code: 'da', nativeName: 'Dansk', englishName: 'Danish', dir: 'ltr' },
  { code: 'fi', nativeName: 'Suomi', englishName: 'Finnish', dir: 'ltr' },
  { code: 'el', nativeName: 'Ελληνικά', englishName: 'Greek', dir: 'ltr' },
  { code: 'cs', nativeName: 'Čeština', englishName: 'Czech', dir: 'ltr' },
  { code: 'ro', nativeName: 'Română', englishName: 'Romanian', dir: 'ltr' },
  { code: 'hu', nativeName: 'Magyar', englishName: 'Hungarian', dir: 'ltr' },
  { code: 'uk', nativeName: 'Українська', englishName: 'Ukrainian', dir: 'ltr' },
  { code: 'th', nativeName: 'ไทย', englishName: 'Thai', dir: 'ltr' },
  { code: 'vi', nativeName: 'Tiếng Việt', englishName: 'Vietnamese', dir: 'ltr' },
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', dir: 'ltr' },
  { code: 'ms', nativeName: 'Bahasa Melayu', englishName: 'Malay', dir: 'ltr' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', dir: 'ltr' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', dir: 'ltr' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', dir: 'ltr' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', dir: 'ltr' },
  { code: 'sw', nativeName: 'Kiswahili', englishName: 'Swahili', dir: 'ltr' },
  { code: 'am', nativeName: 'አማርኛ', englishName: 'Amharic', dir: 'ltr' },
  { code: 'ha', nativeName: 'Hausa', englishName: 'Hausa', dir: 'ltr' },
  { code: 'yo', nativeName: 'Yorùbá', englishName: 'Yoruba', dir: 'ltr' },
  { code: 'az', nativeName: 'Azərbaycan', englishName: 'Azerbaijani', dir: 'ltr' },
  { code: 'kk', nativeName: 'Қазақша', englishName: 'Kazakh', dir: 'ltr' },
  { code: 'uz', nativeName: 'Oʻzbekcha', englishName: 'Uzbek', dir: 'ltr' },
  { code: 'ka', nativeName: 'ქართული', englishName: 'Georgian', dir: 'ltr' },
  { code: 'hy', nativeName: 'Հայերեն', englishName: 'Armenian', dir: 'ltr' },
  { code: 'bg', nativeName: 'Български', englishName: 'Bulgarian', dir: 'ltr' },
  { code: 'hr', nativeName: 'Hrvatski', englishName: 'Croatian', dir: 'ltr' },
  { code: 'sr', nativeName: 'Српски', englishName: 'Serbian', dir: 'ltr' },
  { code: 'sk', nativeName: 'Slovenčina', englishName: 'Slovak', dir: 'ltr' },
  { code: 'sl', nativeName: 'Slovenščina', englishName: 'Slovenian', dir: 'ltr' },
  { code: 'et', nativeName: 'Eesti', englishName: 'Estonian', dir: 'ltr' },
];

export interface GlobalChromeOverrides {
  nav: { home: string; moon: string; mars: string; explorer: string; compare: string };
  hero: { headline: string; subheadline: string; primaryCta: string; secondaryCta: string };
  controls: { levelLabel: string };
}

export const CHROME_TRANSLATIONS_BY_LANG: Record<string, GlobalChromeOverrides> = {
  fr: {
    nav: { home: 'Aperçu', moon: 'Lune', mars: 'Mars', explorer: 'Carte', compare: 'Comparer' },
    hero: {
      headline: 'Deux Mondes. Une Terre. Découvertes Infinies.',
      subheadline: "Explorez les paysages terrestres extrêmes et révélez leurs liens scientifiques avec la Lune et Mars.",
      primaryCta: 'Explorer',
      secondaryCta: 'Découvrir la Science',
    },
    controls: { levelLabel: 'Niveau' },
  },
  es: {
    nav: { home: 'Inicio', moon: 'Luna', mars: 'Marte', explorer: 'Mapa', compare: 'Comparar' },
    hero: {
      headline: 'Dos Mundos. Una Tierra. Descubrimientos Infinitos.',
      subheadline: 'Explora los paisajes extremos de la Tierra y descubre su conexión científica con la Luna y Marte.',
      primaryCta: 'Explorar',
      secondaryCta: 'Descubrir la Ciencia',
    },
    controls: { levelLabel: 'Nivel' },
  },
  de: {
    nav: { home: 'Übersicht', moon: 'Mond', mars: 'Mars', explorer: 'Erdkarte', compare: 'Vergleich' },
    hero: {
      headline: 'Zwei Welten. Eine Erde. Endlose Entdeckungen.',
      subheadline: 'Erkunden Sie extreme Landschaften der Erde und ihre wissenschaftlichen Parallelen zu Mond und Mars.',
      primaryCta: 'Jetzt Erkunden',
      secondaryCta: 'Wissenschaft Entdecken',
    },
    controls: { levelLabel: 'Stufe' },
  },
  zh: {
    nav: { home: '概览', moon: '月球', mars: '火星', explorer: '地球观测', compare: '科学对比' },
    hero: {
      headline: '双星映照，一颗地球，无尽探索。',
      subheadline: '探索地球极端地貌，揭示其与月球及火星之间的深层科学联系。',
      primaryCta: '开始探索',
      secondaryCta: '探索科学原理',
    },
    controls: { levelLabel: '层级' },
  },
  ja: {
    nav: { home: '概要', moon: '月面', mars: '火星', explorer: '地球地図', compare: '科学比較' },
    hero: {
      headline: '二つの世界。一つの地球。果てしない発見。',
      subheadline: '地球の極限環境を巡り、月と火星との科学的なつながりを解き明かしましょう。',
      primaryCta: '探索を始める',
      secondaryCta: '科学を知る',
    },
    controls: { levelLabel: 'レベル' },
  },
  ko: {
    nav: { home: '개요', moon: '달', mars: '화성', explorer: '지구 지도', compare: '과학 비교' },
    hero: {
      headline: '두 개의 세계. 하나의 지구. 끝없는 발견.',
      subheadline: '지구의 극한 지형을 탐험하고 달과 화성과의 과학적 연결고리를 밝혀내세요.',
      primaryCta: '탐험 시작',
      secondaryCta: '과학 살펴보기',
    },
    controls: { levelLabel: '레벨' },
  },
  pt: {
    nav: { home: 'Visão Geral', moon: 'Lua', mars: 'Marte', explorer: 'Mapa', compare: 'Comparar' },
    hero: {
      headline: 'Dois Mundos. Uma Terra. Descobertas Infinitas.',
      subheadline: 'Explore as paisagens extremas da Terra e revele suas conexões científicas com a Lua e Marte.',
      primaryCta: 'Começar a Explorar',
      secondaryCta: 'Descobrir a Ciência',
    },
    controls: { levelLabel: 'Nível' },
  },
  it: {
    nav: { home: 'Panoramica', moon: 'Luna', mars: 'Marte', explorer: 'Mappa', compare: 'Confronta' },
    hero: {
      headline: 'Due Mondi. Una Terra. Scoperte Infinite.',
      subheadline: 'Esplora i paesaggi terrestri estremi e scopri le loro connessioni scientifiche con la Luna e Marte.',
      primaryCta: 'Inizia a Esplorare',
      secondaryCta: 'Scopri la Scienza',
    },
    controls: { levelLabel: 'Livello' },
  },
  ru: {
    nav: { home: 'Обзор', moon: 'Луна', mars: 'Марс', explorer: 'Карта', compare: 'Сравнение' },
    hero: {
      headline: 'Два мира. Одна Земля. Бесконечные открытия.',
      subheadline: 'Исследуйте экстремальные ландшафты Земли и их научную связь с Луной и Марсом.',
      primaryCta: 'Начать исследование',
      secondaryCta: 'Узнать науку',
    },
    controls: { levelLabel: 'Уровень' },
  },
  hi: {
    nav: { home: 'अवलोकन', moon: 'चंद्रमा', mars: 'मंगल', explorer: 'पृथ्वी मानचित्र', compare: 'तुलना' },
    hero: {
      headline: 'दो दुनिया। एक पृथ्वी। अनंत खोजें।',
      subheadline: 'पृथ्वी के चरम भू-दृश्यों का अन्वेषण करें और चंद्रमा व मंगल से उनके वैज्ञानिक संबंधों को जानें।',
      primaryCta: 'अन्वेषण शुरू करें',
      secondaryCta: 'विज्ञान जानें',
    },
    controls: { levelLabel: 'स्तर' },
  },
  tr: {
    nav: { home: 'Genel Bakış', moon: 'Ay', mars: 'Mars', explorer: 'Harita', compare: 'Karşılaştır' },
    hero: {
      headline: 'İki Dünya. Tek Yerküre. Sonsuz Keşifler.',
      subheadline: 'Dünya’nın olağanüstü arazilerini keşfedin ve Ay ile Mars arasındaki bilimsel bağları ortaya çıkarın.',
      primaryCta: 'Keşfe Başla',
      secondaryCta: 'Bilimi Keşfet',
    },
    controls: { levelLabel: 'Seviye' },
  },
  fa: {
    nav: { home: 'نمای کلی', moon: 'ماه', mars: 'مریخ', explorer: 'نقشه زمین', compare: 'مقایسه' },
    hero: {
      headline: 'دو جهان. یک زمین. اکتشافات بی‌پایان.',
      subheadline: 'چشم‌اندازهای شگفت‌انگیز زمین را کاوش کنید و پیوندهای علمی آن‌ها با ماه و مریخ را بشناسید.',
      primaryCta: 'شروع کاوش',
      secondaryCta: 'کشف علم',
    },
    controls: { levelLabel: 'سطح' },
  },
  ur: {
    nav: { home: 'جائزہ', moon: 'چاند', mars: 'مریخ', explorer: 'زمینی نقشہ', compare: 'موازنہ' },
    hero: {
      headline: 'دو جہان۔ ایک زمین۔ لامتناہی دریافتیں۔',
      subheadline: 'زمین کے غیر معمولی مناظر کو دریافت کریں اور چاند اور مریخ سے ان کے سائنسی روابط جانیں۔',
      primaryCta: 'دریافت شروع کریں',
      secondaryCta: 'سائنس جانیں',
    },
    controls: { levelLabel: 'سطح' },
  },
  he: {
    nav: { home: 'סקירה', moon: 'ירח', mars: 'מאדים', explorer: 'מפת כדור הארץ', compare: 'השוואה' },
    hero: {
      headline: 'שני עולמות. כדור ארץ אחד. תגליות אינסופיות.',
      subheadline: 'חקרו את הנופים הקיצוניים של כדור הארץ וגלו את הקשר המדעי שלהם לירח ולמאדים.',
      primaryCta: 'התחל לחקור',
      secondaryCta: 'גלה את המדע',
    },
    controls: { levelLabel: 'רמה' },
  },
  id: {
    nav: { home: 'Ringkasan', moon: 'Bulan', mars: 'Mars', explorer: 'Peta Bumi', compare: 'Bandingkan' },
    hero: {
      headline: 'Dua Dunia. Satu Bumi. Penemuan Tanpa Batas.',
      subheadline: 'Jelajahi lanskap ekstrem Bumi dan ungkap keterkaitan ilmiahnya dengan Bulan dan Mars.',
      primaryCta: 'Mulai Menjelajah',
      secondaryCta: 'Pelajari Sains',
    },
    controls: { levelLabel: 'Tingkat' },
  },
};
