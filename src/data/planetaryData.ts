import {
  ComparisonAxisScore,
  ComparisonResult,
  ComparisonWeights,
  EarthAnalogSite,
  PlanetaryRegion,
  PlanetaryRegionId,
} from '../types/terratwin';
import heroEarthImg from '../assets/images/hero_planetary_earth_1794653803188.jpg';
import moonMareImg from '../assets/images/moon_mare_surface_1794653805640.jpg';
import marsJezeroImg from '../assets/images/mars_jezero_ridge_1794653804976.jpg';
import analogAtacamaImg from '../assets/images/analog_atacama_desert_1794653805939.jpg';
import analogAntarcticaImg from '../assets/images/analog_antarctica_valleys_1794653805708.jpg';
import analogHaughtonImg from '../assets/images/analog_haughton_crater_1794653806549.jpg';
import analogDeathValleyImg from '../assets/images/analog_death_valley_1794653807754.jpg';
import analogIcelandImg from '../assets/images/analog_iceland_basalt_1794653807647.jpg';
import analogHawaiiImg from '../assets/images/analog_hawaii_maunakea_1794653808859.jpg';
import analogArcticImg from '../assets/images/analog_canadian_arctic_1794653809488.jpg';

export const HERO_ASSETS = {
  earthOrbit: heroEarthImg,
  moonSurface: moonMareImg,
  marsSurface: marsJezeroImg,
};

export const PLANETARY_REGIONS: Record<PlanetaryRegionId, PlanetaryRegion> = {
  'moon-mare': {
    id: 'moon-mare',
    planet: 'moon',
    name: {
      en: 'Mare Tranquillitatis (Basaltic Maria)',
      ar: 'بحر السكون (السهول البازلتية القمرية)',
    },
    coordinatesLabel: '0.674° N, 23.473° E',
    missionContext: {
      en: 'Apollo 11 & Lunar Reconnaissance Orbiter LROC / Diviner Baseline',
      ar: 'مرجعية أبولو 11 ومستكشف القمر المداري LRO',
    },
    metrics: {
      meanTempC: -23,
      tempMinC: -173,
      tempMaxC: 127,
      elevationM: -1900,
      meanSlopeDeg: 2.4,
      roughnessIndexDeg: 4.8,
      waterIcePct: 0.01,
      atmosphericPressureKpa: 0,
      albedo: 0.07,
    },
    metricNotes: {
      waterIceNote: {
        en: 'Trace solar-wind-implanted OH/H2O (~100 ppm); liquid water absent.',
        ar: 'آثار ضئيلة من الهيدروكسيل والماء المزروع بالرياح الشمسية (~100 جزء بالمليون)؛ انعدام الماء السائل.',
      },
      elevationDatum: {
        en: 'Referenced to 1,737.4 km lunar reference sphere (LOLA).',
        ar: 'مقاس بالنسبة إلى كرة المرجع القمرية بنصف قطر 1,737.4 كم (LOLA).',
      },
      nullFieldNote: {
        en: 'Surface atmospheric hydrology and biological carbon are null due to hard vacuum.',
        ar: 'الهيدرولوجيا السطحية والكربون الحيوي غير متاحين (قيمة فارغة) بسبب الفراغ شبه التام.',
      },
    },
    minerals: [
      { name: { en: 'Plagioclase Feldspar', ar: 'بلاجيوكليز فلسبار' }, formula: '(Ca,Na)(Al,Si)4O8', percentage: 34 },
      { name: { en: 'Clinopyroxene', ar: 'كلينوبيروكسين' }, formula: '(Ca,Mg,Fe)2Si2O6', percentage: 38 },
      { name: { en: 'Ilmenite', ar: 'إيلمنيت' }, formula: 'FeTiO3', percentage: 12 },
      { name: { en: 'Olivine & Glass', ar: 'أوليفين وزجاج بركاني' }, formula: '(Mg,Fe)2SiO4', percentage: 16 },
    ],
    geologicalFeatures: [
      { en: 'Flood basalt lava plains (3.1–3.8 Ga)', ar: 'سهول حمم بازلتية فيضية (3.1–3.8 مليار سنة)' },
      { en: 'Impact-gardened agglutinitic regolith', ar: 'تربة قمرية متفتتة بفعل النيازك الدقيقة' },
      { en: 'Wrinkle ridges and sinuous lava rilles', ar: 'تلال التواء وأخاديد حمم متعرجة' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -168 },
      { hourOrSol: '04:00', tempC: -173 },
      { hourOrSol: '08:00', tempC: -42 },
      { hourOrSol: '12:00', tempC: 121 },
      { hourOrSol: '16:00', tempC: 108 },
      { hourOrSol: '20:00', tempC: -129 },
    ],
    terrainProfile: [
      { distanceKm: 0, elevationM: -1820, landmark: { en: 'Basalt Plain', ar: 'سهل بازلتي' } },
      { distanceKm: 5, elevationM: -1910 },
      { distanceKm: 10, elevationM: -1740, landmark: { en: 'Wrinkle Ridge', ar: 'حافة التواء' } },
      { distanceKm: 15, elevationM: -1950 },
      { distanceKm: 20, elevationM: -2180, landmark: { en: 'Sinuous Rille', ar: 'أخدود حمم' } },
      { distanceKm: 25, elevationM: -1900 },
      { distanceKm: 30, elevationM: -1860 },
    ],
    adaptiveOverview: {
      explorer: {
        en: 'Dark volcanic plains formed billions of years ago when giant lava seas cooled on the Moon. Today, endless dust and crisp craters record every meteor impact.',
        ar: 'سهول بركانية داكنة تشكلت قبل مليارات السنين عندما بردت بحار الحمم العملاقة على القمر. اليوم، يسجل الغبار والفوهات الحادة تاريخ التصادمات النيزكية.',
      },
      student: {
        en: 'Lunar maria are low-lying basalt basins rich in iron and titanium. Because the Moon lacks air and wind, craters stay sharp and temperatures swing 300°C between noon and night.',
        ar: 'البحار القمرية هي أحواض بازلتية منخفضة غنية بالحديد والتيتانيوم. ولأن القمر يفتقر إلى الغلاف الجوي والرياح، تبقى الفوهات حادة وتتأرجح الحرارة بمقدار 300 درجة مئوية بين النهار والليل.',
      },
      scientist: {
        en: 'High-Ti mare basalt provinces exhibit low geometric albedo (0.07), mature agglutinate-rich regolith (Is/FeO > 60), and 4.8° RMS slope roughness at 1 m baseline from LOLA/Diviner datasets.',
        ar: 'تظهر أقاليم البازلت عالية التيتانيوم بياضًا هندسيًا منخفضًا (0.07)، وتربة ناضجة غنية بالتكتلات الزجاجية، وخشونة ميل جذر متوسط مربع تبلغ 4.8° عند خط أساس 1 متر وفق بيانات LOLA وDiviner.',
      },
      pioneer: {
        en: 'High-ilmenite (FeTiO3) mare basalts offer primary oxygen extraction feedstock via hydrogen reduction, while 2.4° regional slopes enable long-range rover traverse with severe thermal cycling.',
        ar: 'توفر صخور الإيلمنيت الغنية بالحديد والتيتانيوم مصدرًا أساسيًا لاستخلاص الأكسجين عبر الاختزال الهيدروجيني، بينما تتيح المنحدرات الإقليمية (2.4°) حركة المركبات لمسافات طويلة مع تحدي التباين الحراري الحاد.',
      },
    },
    recommendedAnalogs: ['hawaii', 'iceland', 'haughton'],
    sources: [
      {
        id: 'lro-diviner',
        title: 'Lunar Reconnaissance Orbiter Diviner & LOLA Topographic Atlas',
        institution: 'NASA Planetary Data System (PDS)',
        year: 2023,
        identifier: 'PDS-LRO-LOLA-V1',
      },
      {
        id: 'apollo-11-petrology',
        title: 'Petrology and Mineralogy of Mare Tranquillitatis Basalts',
        institution: 'Lunar and Planetary Institute',
        year: 2020,
        identifier: 'LPI-10084-BASALT',
      },
    ],
  },
  'moon-south-pole': {
    id: 'moon-south-pole',
    planet: 'moon',
    name: {
      en: 'Shackleton Rim & South Polar Highlands',
      ar: 'حافة شاكلتون والمرتفعات القطبية الجنوبية',
    },
    coordinatesLabel: '89.540° S, 129.780° E',
    missionContext: {
      en: 'Artemis Exploration Zone · LRO LAMP & Mini-RF Polar Cold Traps',
      ar: 'منطقة استكشاف أرتميس · بيانات LRO LAMP وMini-RF للمصائد الباردة',
    },
    metrics: {
      meanTempC: -148,
      tempMinC: -238,
      tempMaxC: -68,
      elevationM: 1240,
      meanSlopeDeg: 9.8,
      roughnessIndexDeg: 11.4,
      waterIcePct: 5.6,
      atmosphericPressureKpa: 0,
      albedo: 0.16,
    },
    metricNotes: {
      waterIceNote: {
        en: 'LCROSS impact plume measured 5.6 ± 2.9 wt% water ice inside permanently shadowed craters.',
        ar: 'قاس اصطدام LCROSS نحو 5.6 ± 2.9% بالوزن من جليد الماء داخل الفوهات دائمة الظل.',
      },
      elevationDatum: {
        en: 'Referenced to 1,737.4 km lunar reference sphere (LOLA).',
        ar: 'مقاس بالنسبة إلى كرة المرجع القمرية 1,737.4 كم (LOLA).',
      },
      nullFieldNote: null,
    },
    minerals: [
      { name: { en: 'Anorthositic Plagioclase', ar: 'بلاجيوكليز أنورثوسيتي' }, formula: 'CaAl2Si2O8', percentage: 72 },
      { name: { en: 'Orthopyroxene', ar: 'أورثوبيروكسين' }, formula: '(Mg,Fe)SiO3', percentage: 15 },
      { name: { en: 'Cryogenic Water Ice (PSR)', ar: 'جليد ماء مبرد (PSR)' }, formula: 'H2O(s)', percentage: 6 },
      { name: { en: 'Olivine & Breccia', ar: 'أوليفين وبريشيا تصادمية' }, formula: '(Mg,Fe)2SiO4', percentage: 7 },
    ],
    geologicalFeatures: [
      { en: 'Permanently shadowed regions (PSRs) at < 40 K', ar: 'مناطق دائمة الظل بدرجة حرارة أقل من 40 كلفن' },
      { en: 'High-relief anorthositic impact massif', ar: 'كتل صخرية أنورثوسيتية شديدة التضاريس' },
      { en: 'Near-continuous solar illumination ridges', ar: 'حواف مضاءة شمسيًا بشكل شبه مستمر' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -228 },
      { hourOrSol: '04:00', tempC: -235 },
      { hourOrSol: '08:00', tempC: -130 },
      { hourOrSol: '12:00', tempC: -72 },
      { hourOrSol: '16:00', tempC: -95 },
      { hourOrSol: '20:00', tempC: -195 },
    ],
    terrainProfile: [
      { distanceKm: 0, elevationM: 1180 },
      { distanceKm: 5, elevationM: 1460, landmark: { en: 'Shackleton Rim', ar: 'حافة شاكلتون' } },
      { distanceKm: 10, elevationM: -620 },
      { distanceKm: 15, elevationM: -2740, landmark: { en: 'PSR Ice Floor', ar: 'قاع الجليد المظلم' } },
      { distanceKm: 20, elevationM: -940 },
      { distanceKm: 25, elevationM: 1290, landmark: { en: 'Connecting Ridge', ar: 'الحافة المتصلة' } },
      { distanceKm: 30, elevationM: 880 },
    ],
    adaptiveOverview: {
      explorer: {
        en: 'At the lunar South Pole, sunlight skims crater rims nearly all year while deep crater floors stay frozen in eternal darkness, trapping ancient water ice.',
        ar: 'عند القطب الجنوبي للقمر، تلامس أشعة الشمس حواف الفوهات طوال العام تقريبًا بينما تبقى الأعماق في ظلام أبدي يحفظ جليد الماء.',
      },
      student: {
        en: 'Because the Moon tilts only 1.5°, polar craters never see direct sunlight. These cold traps act like natural freezers holding up to 5.6% water ice mixed into bright highland rock.',
        ar: 'بسبب ميل محور القمر البالغ 1.5 درجة فقط، لا تصل الشمس أبدًا إلى قيعان الفوهات القطبية، فتتحول إلى مصائد باردة تحفظ حتى 5.6% من جليد الماء.',
      },
      scientist: {
        en: 'Anorthositic highlands bordering Shackleton Crater exhibit steep 9.8° mean slopes, high 1-m RMS roughness (11.4°), and cryogenic volatility traps harboring H2O, CO2, and NH3 ices.',
        ar: 'تظهر المرتفعات الأنورثوسيتية المحيطة بفوهة شاكلتون منحدرات متوسطة 9.8° وخشونة 11.4° ومصائد متطايرات مبردة تحتوي على جليد الماء وثاني أكسيد الكربون.',
      },
      pioneer: {
        en: 'Proximity of quasi-continuous solar power peaks to PSR ice reserves makes Shackleton Rim the premier ISRU propellant hub, requiring steep-slope mobility and cryogenic drilling.',
        ar: 'إن تجاور قمم الطاقة الشمسية شبه المستمرة مع احتياطيات الجليد يجعل حافة شاكلتون المحور الأول لإنتاج الوقود الفضائي، ما يتطلب مركبات قادرة على تسلق المنحدرات الحادة والحفر المبرد.',
      },
    },
    recommendedAnalogs: ['antarctica', 'haughton', 'canadian-arctic'],
    sources: [
      {
        id: 'lcross-colaprete',
        title: 'Detection of Water in the LCROSS Ejecta Plume',
        institution: 'Science / NASA Ames',
        year: 2010,
        identifier: 'DOI:10.1126/science.1196986',
      },
    ],
  },
  'mars-jezero': {
    id: 'mars-jezero',
    planet: 'mars',
    name: {
      en: 'Jezero Crater & Ancient River Delta',
      ar: 'فوهة جيزيرو ودلتا النهر القديمة',
    },
    coordinatesLabel: '18.380° N, 77.580° E',
    missionContext: {
      en: 'Mars 2020 Perseverance Rover · MRO CRISM & HiRISE Baseline',
      ar: 'مركبة المثابرة 2020 · قياسات CRISM وHiRISE المدارية',
    },
    metrics: {
      meanTempC: -63,
      tempMinC: -92,
      tempMaxC: 8,
      elevationM: -2500,
      meanSlopeDeg: 3.9,
      roughnessIndexDeg: 7.2,
      waterIcePct: 2.1,
      atmosphericPressureKpa: 0.65,
      albedo: 0.19,
    },
    metricNotes: {
      waterIceNote: {
        en: 'Chemically bound hydrated clays & sulfates (~1.5–2.5 wt% H2O); stable surface liquid water is null.',
        ar: 'ماء مرتبط كيميائيًا في المعادن الطينية والكبريتات (~1.5–2.5% بالوزن)؛ لا يوجد ماء سائل مستقر على السطح.',
      },
      elevationDatum: {
        en: 'Referenced to MOLA Mars Areoid equipotential datum.',
        ar: 'مقاس بالنسبة إلى مستوى مرجع المريخ المداري MOLA Areoid.',
      },
      nullFieldNote: {
        en: 'Permanent surface liquid water and active hydrological discharge are null in the present Amazonian climate.',
        ar: 'المياه السطحية السائلة الدائمة والتدفق الهيدرولوجي النشط غير موجودين حاليًا (قيمة فارغة).',
      },
    },
    minerals: [
      { name: { en: 'Basaltic Plagioclase & Pyroxene', ar: 'بلاجيوكليز وبيروكسين بازلتي' }, formula: '(Ca,Na)(Al,Si)4O8', percentage: 41 },
      { name: { en: 'Fe/Mg Smectite Clays', ar: 'معادن طينية سمكتيت حديدية' }, formula: 'Na0.3(Fe,Mg)2Si4O10(OH)2', percentage: 24 },
      { name: { en: 'Iron(III) Oxides & Hematite', ar: 'أكاسيد الحديد والهيماتيت' }, formula: 'Fe2O3', percentage: 19 },
      { name: { en: 'Mg/Ca Carbonates & Sulfates', ar: 'كربونات وكبريتات المغنيسيوم' }, formula: 'MgCO3 / CaSO4', percentage: 16 },
    ],
    geologicalFeatures: [
      { en: 'Noachian lacustrine delta foreset beds', ar: 'طبقات دلتا بحيرية رسوبية من العصر النواخي' },
      { en: 'Olivine-carbonate marginal benches', ar: 'مصاطب حافة الفوهة الغنية بالأوليفين والكربونات' },
      { en: 'Aeolian basaltic ripple fields', ar: 'كثبان وتموجات رملية بازلتية ريحية' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -79 },
      { hourOrSol: '04:00', tempC: -90 },
      { hourOrSol: '08:00', tempC: -56 },
      { hourOrSol: '12:00', tempC: -4 },
      { hourOrSol: '16:00', tempC: 6 },
      { hourOrSol: '20:00', tempC: -52 },
    ],
    terrainProfile: [
      { distanceKm: 0, elevationM: -1880, landmark: { en: 'Crater Rim', ar: 'حافة الفوهة' } },
      { distanceKm: 5, elevationM: -2240, landmark: { en: 'Neretva Valley', ar: 'وادي نيريتفا' } },
      { distanceKm: 10, elevationM: -2360, landmark: { en: 'Delta Escarpment', ar: 'جرف الدلتا' } },
      { distanceKm: 15, elevationM: -2520, landmark: { en: 'Basalt Floor', ar: 'القاع البازلتي' } },
      { distanceKm: 20, elevationM: -2560 },
      { distanceKm: 25, elevationM: -2490 },
      { distanceKm: 30, elevationM: -2540 },
    ],
    adaptiveOverview: {
      explorer: {
        en: 'Over 3.5 billion years ago, a river carved channels into Jezero Crater and formed a fan-shaped delta—preserving mudstones where ancient microbes could have thrived.',
        ar: 'قبل أكثر من 3.5 مليار سنة، حفر نهر قديم قنوات داخل فوهة جيزيرو مكونًا دلتا رسوبية قد تحفظ آثار حياة ميكروبية قديمة.',
      },
      student: {
        en: 'Jezero combines volcanic basalt rocks with water-altered clay minerals and carbonates. Its thin CO2 atmosphere (less than 1% of Earth’s) produces freezing nights and dusty afternoon gusts.',
        ar: 'تجمع فوهة جيزيرو بين البازلت البركاني والمعادن الطينية المتشكلة بالماء. ويؤدي غلافها الجوي الرقيق من ثاني أكسيد الكربون إلى ليالٍ قارسة البرودة وعواصف ترابية.',
      },
      scientist: {
        en: 'MRO CRISM spectra identify Fe/Mg smectites, hydrated silica, and marginal Mg-carbonates overlying olivine-rich cumulates at -2,500 m MOLA elevation with 7.2° boulder-field roughness.',
        ar: 'تكشف أطياف CRISM عن سمكتيت الحديد والمغنيسيوم والسيليكا المائية وكربونات المغنيسيوم على ارتفاع -2,500 م MOLA وخشونة سطح 7.2°.',
      },
      pioneer: {
        en: 'Phyllosilicate hydration (2.1 wt% bound water) provides low-energy thermal extraction potential for propellant synthesis, while loose aeolian bedforms require traction slip mitigation.',
        ar: 'يوفر الماء المرتبط في السيليكات الطبقية (2.1% بالوزن) موردًا واعدًا للاستخلاص الحراري للوقود، بينما تتطلب الرمال الريحية أنظمة تحكم متقدمة لمنع انزلاق العجلات.',
      },
    },
    recommendedAnalogs: ['atacama', 'iceland', 'death-valley', 'antarctica'],
    sources: [
      {
        id: 'm2020-farley',
        title: 'Aqueously Altered Igneous Rocks & Delta Stratigraphy in Jezero Crater',
        institution: 'NASA Mars 2020 Science Team / Science',
        year: 2022,
        identifier: 'DOI:10.1126/science.abo2196',
      },
      {
        id: 'mro-crism',
        title: 'MRO CRISM Mineralogical Mapping of Western Jezero',
        institution: 'JHU Applied Physics Laboratory',
        year: 2021,
        identifier: 'PDS-MRO-CRISM-JEZERO',
      },
    ],
  },
  'mars-gale': {
    id: 'mars-gale',
    planet: 'mars',
    name: {
      en: 'Gale Crater & Aeolis Mons (Mount Sharp)',
      ar: 'فوهة غيل وجبل أيوليس مونس (شارب)',
    },
    coordinatesLabel: '5.400° S, 137.800° E',
    missionContext: {
      en: 'MSL Curiosity Rover · SAM & CheMin In-Situ Telemetry',
      ar: 'مركبة كيوريوسيتي · قياسات SAM وCheMin الميدانية',
    },
    metrics: {
      meanTempC: -55,
      tempMinC: -88,
      tempMaxC: 18,
      elevationM: -4500,
      meanSlopeDeg: 4.5,
      roughnessIndexDeg: 6.4,
      waterIcePct: 1.8,
      atmosphericPressureKpa: 0.78,
      albedo: 0.21,
    },
    metricNotes: {
      waterIceNote: {
        en: 'SAM pyrolysis measured 1.5–3.0 wt% H2O evolved from amorphous soil and clay/sulfate strata.',
        ar: 'قاس جهاز SAM إطلاق 1.5–3.0% بالوزن من الماء من التربة غير المتبلورة وطبقات الطين والكبريتات.',
      },
      elevationDatum: {
        en: 'Referenced to MOLA Mars Areoid equipotential datum.',
        ar: 'مقاس بالنسبة إلى مستوى مرجع المريخ المداري MOLA Areoid.',
      },
      nullFieldNote: null,
    },
    minerals: [
      { name: { en: 'Ca & Mg Sulfates (Gypsum/Starkeyite)', ar: 'كبريتات الكالسيوم والمغنيسيوم' }, formula: 'CaSO4·2H2O', percentage: 29 },
      { name: { en: 'Basaltic Silicates & Amorphous Phase', ar: 'سيليكات بازلتية وطور غير متبلور' }, formula: 'SiO2 / Al2O3', percentage: 37 },
      { name: { en: 'Hematite & Akaganeite', ar: 'هيماتيت وأكاغانيت' }, formula: 'Fe2O3', percentage: 18 },
      { name: { en: 'Perchlorate Salts (ClO4-)', ar: 'أملاح البيركلورات' }, formula: 'Mg(ClO4)2', percentage: 1 },
    ],
    geologicalFeatures: [
      { en: '5 km layered sedimentary central peak', ar: 'قمة رسوبية طبقية بارتفاع 5 كم في مركز الفوهة' },
      { en: 'Sulfate-bearing transition beds (drying climate)', ar: 'طبقات تحول غنية بالكبريتات (مؤشر جفاف المناخ)' },
      { en: 'Polygonal desiccation mudcracks', ar: 'تشققات طينية مضلعة ناتجة عن الجفاف' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -74 },
      { hourOrSol: '04:00', tempC: -86 },
      { hourOrSol: '08:00', tempC: -44 },
      { hourOrSol: '12:00', tempC: 11 },
      { hourOrSol: '16:00', tempC: 17 },
      { hourOrSol: '20:00', tempC: -46 },
    ],
    terrainProfile: [
      { distanceKm: 0, elevationM: -4510, landmark: { en: 'Aeolis Palus', ar: 'سهل أيوليس' } },
      { distanceKm: 8, elevationM: -4460, landmark: { en: 'Sulfate Unit', ar: 'وحدة الكبريتات' } },
      { distanceKm: 16, elevationM: -3620 },
      { distanceKm: 24, elevationM: -1900 },
      { distanceKm: 32, elevationM: 480, landmark: { en: 'Mount Sharp', ar: 'جبل شارب' } },
      { distanceKm: 40, elevationM: -2400 },
      { distanceKm: 48, elevationM: -4350 },
    ],
    adaptiveOverview: {
      explorer: {
        en: 'Mount Sharp rises 5 kilometers from Gale Crater’s floor—each rock layer records Mars drying out from ancient freshwater lakes to salty desert dunes.',
        ar: 'يرتفع جبل شارب 5 كيلومترات من قاع فوهة غيل، حيث تسجل كل طبقة صخرية تحول المريخ من بحيرات عذبة قديمة إلى صحارى ملحية جافة.',
      },
      student: {
        en: 'Curiosity’s CheMin instrument proved Gale Crater holds clay lakes transitioning into salty sulfates and perchlorates—the exact chemical fingerprint seen in Earth’s Atacama Desert.',
        ar: 'أثبتت قياسات كيوريوسيتي أن فوهة غيل تحوي انتقالًا من البحيرات الطينية إلى أملاح الكبريتات والبيركلورات—وهي البصمة الكيميائية ذاتها الموجودة في صحراء أتاكاما.',
      },
      scientist: {
        en: 'Equatorial floor elevation (-4,500 m MOLA) yields elevated surface pressure (~780 Pa), daytime highs reaching +18°C, and 0.4–0.6 wt% perchlorates with sulfate-cemented mudstones.',
        ar: 'ينتج الارتفاع المنخفض (-4,500 م MOLA) ضغطًا سطحيًا أعلى نسبيًا (~780 باسكال) وحرارة نهارية تصل إلى +18°م، مع وجود 0.4–0.6% بيركلورات.',
      },
      pioneer: {
        en: 'Presence of Ca/Mg sulfates and perchlorates demands dust filtration and perchlorate remediation systems for crewed habitats, while gypsum beds offer recoverable water.',
        ar: 'يتطلب وجود أملاح البيركلورات والكبريتات أنظمة تنقية غبار ومعالجة كيميائية لموائل رواد الفضاء، مع إمكانية استخلاص الماء من طبقات الجبس.',
      },
    },
    recommendedAnalogs: ['atacama', 'death-valley', 'canadian-arctic'],
    sources: [
      {
        id: 'msl-grotzinger',
        title: 'Deposition, Exhumation, and Paleoclimate of an Ancient Lake Deposit, Gale Crater',
        institution: 'NASA MSL Science Team / Science',
        year: 2015,
        identifier: 'DOI:10.1126/science.aac7575',
      },
    ],
  },
};

export const EARTH_ANALOG_SITES: EarthAnalogSite[] = [
  {
    id: 'atacama',
    name: { en: 'Atacama Desert (Yungay Core)', ar: 'صحراء أتاكاما (قلب يونغاي)' },
    region: { en: 'Antofagasta Region', ar: 'إقليم أنتوفاغاستا' },
    country: { en: 'Chile', ar: 'تشيلي' },
    coordinates: { lat: -24.095, lng: -69.92, label: '24.095° S, 69.920° W' },
    category: 'hyper-arid',
    primaryTwin: 'mars',
    image: analogAtacamaImg,
    researchFocus: {
      en: 'Hyper-arid perchlorate soils, desiccation polygons & astrobiology detection limits',
      ar: 'التربة شديدة الجفاف الغنية بالبيركلورات والمضلعات الملحية وحدود الكشف عن الحياة',
    },
    geologyTags: [
      { en: 'Hyper-Arid Desert', ar: 'صحراء شديدة الجفاف' },
      { en: 'Perchlorates & Sulfates', ar: 'بيركلورات وكبريتات' },
      { en: 'Mars Astrobiology', ar: 'علم الأحياء الفلكي للمريخ' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'Parts of the Atacama go decades without measurable rain. Its cracked salt crusts and oxidized iron soils look—and behave chemically—strikingly like ancient lakebeds on Mars.',
        ar: 'تمر عقود دون أمطار تُذكر في قلب أتاكاما. تشبه قشورها الملحية المتشققة وتربتها المؤكسدة بالحديد قيعان البحيرات المريخية القديمة بشكل مذهل.',
      },
      student: {
        en: 'Blocked from moisture by the Andes mountains and cold ocean currents, Yungay accumulates nitrates, sulfates, and perchlorates—the same reactive salts found by NASA rovers on Mars.',
        ar: 'تمنع جبال الأنديز والتيارات البحرية الباردة وصول الرطوبة، فتتراكم أملاح النترات والكبريتات والبيركلورات—وهي الأملاح نفسها التي رصدتها مركبات المريخ.',
      },
      scientist: {
        en: 'Mean annual precipitation < 2 mm/yr preserves hygroscopic halite, anhydrite, and natural perchlorate (ClO4-) deposits with ultra-low microbial biomass (< 10^3 cells/g) and high UV flux.',
        ar: 'يحافظ الهطول السنوي الأقل من 2 ملم على رواسب الهاليت والأنهيدريت والبيركلورات الطبيعية مع كتلة حيوية ميكروبية شديدة الانخفاض وإشعاع فوق بنفسجي مرتفع.',
      },
      pioneer: {
        en: 'Primary Earth testbed for autonomous life-detection drills (ARADS) and Raman/LIBS spectrometer calibration under Mars-analog sulfate-perchlorate matrix interference.',
        ar: 'حقل الاختبار الأرضي الأول لمثاقب الكشف عن الحياة المستقلة ومعايرة مطياف رامان وLIBS في وجود تداخلات البيركلورات والكبريتات.',
      },
    },
    metrics: {
      meanTempC: 16.4,
      tempMinC: -2.0,
      tempMaxC: 35.0,
      elevationM: 980,
      meanSlopeDeg: 2.1,
      roughnessIndexDeg: 5.8,
      waterIcePct: 0.4,
      atmosphericPressureKpa: 90.2,
      albedo: 0.24,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'verified',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Gypsum & Anhydrite Sulfates', ar: 'كبريتات الجبس والأنهيدريت' }, formula: 'CaSO4', percentage: 34 },
      { name: { en: 'Halite & Nitrate Evaporites', ar: 'متبخرات الهاليت والنترات' }, formula: 'NaCl / NaNO3', percentage: 26 },
      { name: { en: 'Iron Oxides & Silicates', ar: 'أكاسيد الحديد والسيليكات' }, formula: 'Fe2O3 / SiO2', percentage: 38 },
      { name: { en: 'Natural Perchlorates', ar: 'بيركلورات طبيعية' }, formula: 'ClO4-', percentage: 2 },
    ],
    geologicalFeatures: [
      { en: 'Polygonal evaporite salt crusts', ar: 'قشور ملحية متبخرة مضلعة' },
      { en: 'Alluvial fans & desert pavement', ar: 'مراوح طميية ورصف صحراوي' },
      { en: 'Endolithic microbial halite habitats', ar: 'مواطن ميكروبية دقيقة داخل بلورات الملح' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: 5 },
      { hourOrSol: '04:00', tempC: 1 },
      { hourOrSol: '08:00', tempC: 12 },
      { hourOrSol: '12:00', tempC: 29 },
      { hourOrSol: '16:00', tempC: 33 },
      { hourOrSol: '20:00', tempC: 14 },
    ],
    pioneerIsruNotes: {
      en: 'Validates moisture-extraction ovens and corrosion-resistant seals exposed to hygroscopic perchlorate-sulfate brines.',
      ar: 'يُستخدم لاختبار أفران استخلاص الرطوبة وموانع التسرب المقاومة للتآكل في البيئات الغنية بأملاح البيركلورات.',
    },
    sources: [
      {
        id: 'atacama-navarro',
        title: 'Mars-Like Soils in the Atacama Desert, Chile, and the Dry Limit of Microbial Life',
        institution: 'NASA Ames / Science',
        year: 2003,
        identifier: 'DOI:10.1126/science.1089143',
      },
    ],
  },
  {
    id: 'antarctica',
    name: { en: 'Antarctica Dry Valleys (McMurdo)', ar: 'الوديان الجافة في القارة القطبية الجنوبية' },
    region: { en: 'Victoria Land', ar: 'أرض فيكتوريا' },
    country: { en: 'Antarctica', ar: 'أنتاركتيكا' },
    coordinates: { lat: -77.833, lng: 160.65, label: '77.833° S, 160.650° E' },
    category: 'polar-cryogenic',
    primaryTwin: 'mars',
    image: analogAntarcticaImg,
    researchFocus: {
      en: 'Sublimation permafrost polygons, cold hyper-arid soils & cryogenic preservation',
      ar: 'مضلعات التربة الصقيعية بالتسامي والتربة القطبية الجافة والحفظ المبرد',
    },
    geologyTags: [
      { en: 'Cold Hyper-Arid', ar: 'صحراء قطبية جافة' },
      { en: 'Permafrost Polygons', ar: 'مضلعات صقيعية' },
      { en: 'Sublimation Ice', ar: 'جليد التسامي' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'Katabatic winds keep these Antarctic valleys completely free of snow, leaving ancient frozen ground cracked into giant polygons that mirror Mars’s northern plains.',
        ar: 'تحافظ الرياح الهابطة على خلو هذه الوديان من الثلوج، تاركة أرضًا متجمدة متشققة إلى مضلعات عملاقة تطابق السهول الشمالية للمريخ.',
      },
      student: {
        en: 'Beacon Valley preserves buried glacier ice beneath dry rocky till for millions of years via sublimation rather than melting—teaching scientists how subsurface ice survives on Mars.',
        ar: 'يحفظ وادي بيكون جليدًا قديمًا مدفونًا تحت الركام الصخري الجاف لملايين السنين عبر التسامي دون ذوبان، ما يشرح بقاء الجليد تحت سطح المريخ.',
      },
      scientist: {
        en: 'Mean annual temperature (-20.4°C) and sublimation-dominated hydrology form thermal-contraction permafrost polygons overlying dolerite bedrock with nitrate-sulfate soil horizons.',
        ar: 'يولد متوسط الحرارة (-20.4°م) والهيدرولوجيا القائمة على التسامي مضلعات انكماش حراري صقيعي فوق صخور الدوليريت مع آفاق تربة غنية بالنترات والكبريتات.',
      },
      pioneer: {
        en: 'Benchmark site for Phoenix-class permafrost excavators and ice-core drilling hardware operating at sub-zero dry-till shear strengths.',
        ar: 'موقع مرجعي لاختبار حفارات التربة الصقيعية ومعدات الحفر الجليدي في التربة الجافة المتجمدة دون الصفر.',
      },
    },
    metrics: {
      meanTempC: -20.4,
      tempMinC: -44.0,
      tempMaxC: 2.0,
      elevationM: 1250,
      meanSlopeDeg: 4.8,
      roughnessIndexDeg: 8.1,
      waterIcePct: 4.2,
      atmosphericPressureKpa: 84.5,
      albedo: 0.22,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'verified',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Dolerite Plagioclase & Pyroxene', ar: 'بلاجيوكليز وبيروكسين الدوليريت' }, formula: '(Ca,Mg,Fe)SiO3', percentage: 61 },
      { name: { en: 'Subsurface Water Ice', ar: 'جليد ماء تحت سطحي' }, formula: 'H2O(s)', percentage: 4 },
      { name: { en: 'Beacon Sandstone Quartz', ar: 'كوارتز الحجر الرملي' }, formula: 'SiO2', percentage: 27 },
      { name: { en: 'Cryogenic Sulfates & Nitrates', ar: 'كبريتات ونترات مبردة' }, formula: 'SO4 / NO3', percentage: 8 },
    ],
    geologicalFeatures: [
      { en: 'Thermal-contraction patterned ground', ar: 'أرضية مضلعة ناتجة عن الانكماش الحراري' },
      { en: 'Buried Miocene sublimation ice', ar: 'جليد مدفون محفوظ بالتسامي' },
      { en: 'Ventifact wind-sculpted cobbles', ar: 'حصى منحوتة بالرياح القطبية' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -28 },
      { hourOrSol: '04:00', tempC: -32 },
      { hourOrSol: '08:00', tempC: -22 },
      { hourOrSol: '12:00', tempC: -13 },
      { hourOrSol: '16:00', tempC: -15 },
      { hourOrSol: '20:00', tempC: -24 },
    ],
    pioneerIsruNotes: {
      en: 'Tests sublimation-barrier drill sealing and rotary percussion bits in ice-cemented dolerite regolith.',
      ar: 'يختبر موانع تسرب الحفر ورؤوس الحفر الدوارة في الحطام الصخري المتماسك بالجليد.',
    },
    sources: [
      {
        id: 'mcmurdo-marchant',
        title: 'Sublimation-Controlled Landscape Evolution in Beacon Valley, Antarctica',
        institution: 'NSF McMurdo LTER / Geological Society of America',
        year: 2013,
        identifier: 'DOI:10.1130/B30789.1',
      },
    ],
  },
  {
    id: 'haughton',
    name: { en: 'Haughton Crater', ar: 'فوهة هوتون التصادمية' },
    region: { en: 'Devon Island, Nunavut', ar: 'جزيرة ديفون، نونافوت' },
    country: { en: 'Canada', ar: 'كندا' },
    coordinates: { lat: 75.383, lng: -89.667, label: '75.383° N, 89.667° W' },
    category: 'impact-crater',
    primaryTwin: 'both',
    image: analogHaughtonImg,
    researchFocus: {
      en: 'Polar impact breccia morphology, gullies & human-rover field operations',
      ar: 'تشكل البريشيا التصادمية القطبية والأخاديد وتجارب تشغيل المركبات ورواد الفضاء',
    },
    geologyTags: [
      { en: 'Impact Structure (23 km)', ar: 'بنية تصادمية (23 كم)' },
      { en: 'Shocked Breccia', ar: 'بريشيا مصدومة' },
      { en: 'Moon & Mars Ops', ar: 'عمليات القمر والمريخ' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'Carved 23 million years ago by an asteroid strike in the High Arctic, Haughton Crater’s barren rocky rim and meltwater gullies serve as an outdoor laboratory for lunar and Martian explorers.',
        ar: 'حُفرت قبل 23 مليون سنة باصطدام كويكب في القطب الشمالي؛ وتُعد حافتها القاحلة وأخاديدها مختبرًا مفتوحًا لرواد القمر والمريخ.',
      },
      student: {
        en: 'Because polar cold slows erosion, Haughton preserves impact melt sheets, shatter cones, and paleolake beds—helping astronauts practice recognizing shocked rocks in the field.',
        ar: 'يبطئ البرد القطبي التعرية، ما يحفظ طبقات الانصهار التصادمي ومخاريط الصدمة، ويساعد الرواد على التدرب ميدانيًا.',
      },
      scientist: {
        en: 'A 23-km complex impact crater in Ordovician dolomite/gypsum strata containing polymict impact melt breccia, ground-ice gullies, and hydrothermal sulfate alteration.',
        ar: 'فوهة تصادمية معقدة بقطر 23 كم في صخور الدولوميت والجبس، تحوي بريشيا انصهار مختلطة وأخاديد جليدية وتغيرات كبريتية حرارية مائية.',
      },
      pioneer: {
        en: 'NASA Haughton-Mars Project host site validating spacesuit EVA mobility, delayed voice communications, and traverse planning over 7–12° fractured crater slopes.',
        ar: 'موقع مشروع هوتون-المريخ لاختبار بدلات السير الفضائي وتأخير الاتصالات وتخطيط مسارات المركبات على منحدرات الفوهات.',
      },
    },
    metrics: {
      meanTempC: -15.6,
      tempMinC: -42.0,
      tempMaxC: 9.0,
      elevationM: 240,
      meanSlopeDeg: 7.4,
      roughnessIndexDeg: 10.2,
      waterIcePct: 3.1,
      atmosphericPressureKpa: 100.8,
      albedo: 0.27,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'verified',
      waterIce: 'orbital-estimate',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Dolomite & Carbonate Breccia', ar: 'دولوميت وبريشيا كربونية' }, formula: 'CaMg(CO3)2', percentage: 64 },
      { name: { en: 'Sulfate Evaporites (Gypsum)', ar: 'متبخرات الكبريتات (جبس)' }, formula: 'CaSO4·2H2O', percentage: 18 },
      { name: { en: 'Shocked Quartz & Silicates', ar: 'كوارتز مصدوم وسيليكات' }, formula: 'SiO2', percentage: 15 },
      { name: { en: 'Permafrost Pore Ice', ar: 'جليد مسام الصقيع' }, formula: 'H2O(s)', percentage: 3 },
    ],
    geologicalFeatures: [
      { en: 'Polymict impact breccia sheets', ar: 'طبقات بريشيا تصادمية مختلطة' },
      { en: 'Shatter cones & shocked quartz', ar: 'مخاريط الصدمة والكوارتز المصدوم' },
      { en: 'Snowmelt debris-flow gullies', ar: 'أخاديد تدفق الحطام الجليدي' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -21 },
      { hourOrSol: '04:00', tempC: -23 },
      { hourOrSol: '08:00', tempC: -17 },
      { hourOrSol: '12:00', tempC: -10 },
      { hourOrSol: '16:00', tempC: -11 },
      { hourOrSol: '20:00', tempC: -18 },
    ],
    pioneerIsruNotes: {
      en: 'Ideal for testing autonomous hazard avoidance across angular crater ejecta blocks and breccia talus.',
      ar: 'مثالي لاختبار تجنب العوائق الذاتي للمركبات عبر كتل مقذوفات الفوهات الحادة.',
    },
    sources: [
      {
        id: 'haughton-lee',
        title: 'Haughton Impact Structure as a Mars and Moon Field Analog',
        institution: 'SETI Institute / NASA HMP',
        year: 2019,
        identifier: 'HMP-DEVON-2019',
      },
    ],
  },
  {
    id: 'death-valley',
    name: { en: 'Death Valley (Badwater & Ubehebe)', ar: 'وادي الموت (بادووتر وفوهة أوبيهيب)' },
    region: { en: 'Mojave Desert, California', ar: 'صحراء موهافي، كاليفورنيا' },
    country: { en: 'United States', ar: 'الولايات المتحدة' },
    coordinates: { lat: 36.25, lng: -116.826, label: '36.250° N, 116.826° W' },
    category: 'evaporite-playa',
    primaryTwin: 'mars',
    image: analogDeathValleyImg,
    researchFocus: {
      en: 'Evaporite salt pans, alluvial fans & hydrovolcanic maar craters',
      ar: 'السبخات الملحية المتبخرة والمراوح الطميية والفوهات البركانية المائية',
    },
    geologyTags: [
      { en: 'Evaporite Playa', ar: 'سبخة متبخرات' },
      { en: 'Maar Volcanic Crater', ar: 'فوهة بركانية مائية' },
      { en: 'Alluvial Fans', ar: 'مراوح طميية' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'Below sea level, vast hexagonal salt flats meet dark volcanic explosion craters—mirroring both Mars’s dried salt basins and explosive steam-volcano craters.',
        ar: 'تحت مستوى سطح البحر، تلتقي السهول الملحية السداسية بفوهات الانفجارات البركانية الداكنة—محاكيةً أحواض الملح المريخية.',
      },
      student: {
        en: 'Badwater Basin shows how evaporating lakes concentrate sulfates and chlorides in polygonal ridges, while nearby Ubehebe Crater demonstrates what happens when rising magma meets groundwater.',
        ar: 'يوضح حوض بادووتر كيف يترك تبخر البحيرات أملاح الكبريتات والكلوريد، بينما تبرز فوهة أوبيهيب تفاعل الصهارة مع المياه الجوفية.',
      },
      scientist: {
        en: 'Endorheic evaporite basin (-86 m) hosting halite-gypsum-borate crust polygons alongside basaltic phreatomagmatic maar tephra and steep alluvial fan deposits.',
        ar: 'حوض تبخر داخلي (-86 م) يضم مضلعات الهاليت والجبس إلى جانب طفوح بازلتية انفجارية ومراوح رسوبية حادة.',
      },
      pioneer: {
        en: 'High-contrast albedo testbed (-86 m to +600 m) used to validate planetary LiDAR hazard sensors, Curiosity wheel-wear loads, and radar sounding through saline crusts.',
        ar: 'ميدان اختبار عالي التباين لمعايرة مستشعرات الليدار الفضائية واختبار تآكل عجلات المركبات ورادار الاختراق الأرضي.',
      },
    },
    metrics: {
      meanTempC: 25.2,
      tempMinC: 3.0,
      tempMaxC: 51.0,
      elevationM: -86,
      meanSlopeDeg: 1.8,
      roughnessIndexDeg: 4.9,
      waterIcePct: 0.7,
      atmosphericPressureKpa: 102.4,
      albedo: 0.31,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'orbital-estimate',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Halite & Chloride Evaporites', ar: 'هاليت ومتبخرات كلوريد' }, formula: 'NaCl', percentage: 42 },
      { name: { en: 'Gypsum & Ca-Sulfates', ar: 'جبس وكبريتات الكالسيوم' }, formula: 'CaSO4·2H2O', percentage: 23 },
      { name: { en: 'Basaltic Tephra & Silicates', ar: 'رماد بازلتي وسيليكات' }, formula: 'SiO2 / FeO', percentage: 31 },
      { name: { en: 'Borates & Carbonates', ar: 'بورات وكربونات' }, formula: 'CO3 / B4O7', percentage: 4 },
    ],
    geologicalFeatures: [
      { en: 'Hexagonal halite pressure ridges', ar: 'حواف ضغط ملحية سداسية' },
      { en: 'Phreatomagmatic maar tuff ring', ar: 'حلقة طف بركاني انفجاري مائي' },
      { en: 'Coalescing desert alluvial fans', ar: 'مراوح طميية صحراوية متصلة' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: 19 },
      { hourOrSol: '04:00', tempC: 15 },
      { hourOrSol: '08:00', tempC: 24 },
      { hourOrSol: '12:00', tempC: 39 },
      { hourOrSol: '16:00', tempC: 44 },
      { hourOrSol: '20:00', tempC: 27 },
    ],
    pioneerIsruNotes: {
      en: 'Demonstrates airborne salt-crust dust mitigation and sharp evaporite ridge wheel-wear testing.',
      ar: 'يبرز اختبارات مقاومة تآكل العجلات على حواف الملح الحادة ومعالجة الغبار الملحي.',
    },
    sources: [
      {
        id: 'dv-usgs',
        title: 'Evaporite Stratigraphy and Mars Analogs of Badwater & Ubehebe',
        institution: 'USGS Astrogeology Science Center',
        year: 2021,
        identifier: 'USGS-OFR-2021-DV',
      },
    ],
  },
  {
    id: 'iceland',
    name: { en: 'Iceland (Askja & Vatnajökull Highlands)', ar: 'أيسلندا (مرتفعات أسكيا وفاتنايوكول)' },
    region: { en: 'Central Volcanic Rift', ar: 'الأخدود البركاني الأوسط' },
    country: { en: 'Iceland', ar: 'أيسلندا' },
    coordinates: { lat: 65.03, lng: -16.75, label: '65.030° N, 16.750° W' },
    category: 'volcanic-basalt',
    primaryTwin: 'both',
    image: analogIcelandImg,
    researchFocus: {
      en: 'Basaltic tephra dunes, palagonite glaciovolcanism & braided outwash plains',
      ar: 'كثبان الرماد البازلتي والبركانية الجليدية وسهول الجريان المتشعبة',
    },
    geologyTags: [
      { en: 'Glaciovolcanic Basalt', ar: 'بازلت بركاني جليدي' },
      { en: 'Tephra & Palagonite', ar: 'رماد بركاني وبالاغونيت' },
      { en: 'Moon & Mars Basalt', ar: 'بازلت القمر والمريخ' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'Black basalt sand dunes meet glacier meltwater rivers in Iceland’s uninhabited highlands—creating Earth’s closest twin to ancient volcanic Mars and dark lunar plains.',
        ar: 'تلتقي كثبان الرمل البازلتية السوداء بأنهار ذوبان الجليد في مرتفعات أيسلندا، لتصنع أقرب شبيه لبركانية المريخ وسهول القمر الداكنة.',
      },
      student: {
        en: 'When basalt lava erupts beneath glaciers, it shatters into glassy palagonite—a rusty-brown mineral found widely across Mars. Apollo astronauts even trained on these dark basalt flows.',
        ar: 'عندما تثور حمم البازلت تحت الجليد، تتفتت إلى معدن البالاغونيت الشائع على المريخ؛ وقد تدرب رواد أبولو في هذه الحقول.',
      },
      scientist: {
        en: 'Tholeiitic basaltic sand sheets (Dyngjusandur), hyaloclastite palagonite ridges, and proglacial braided outwash systems replicate Noachian Mars volcaniclastic-fluvial transitions.',
        ar: 'تحاكي صفائح الرمل البازلتي الثوليتي وحواف البالاغونيت وأنظمة الجريان الجليدي التحولات البركانية النهرية في العصر النواخي على المريخ.',
      },
      pioneer: {
        en: 'Validated SAND-E rover autonomous science operations over low-albedo basalt sand (0.09) with fine abrasive tephra dust.',
        ar: 'ميدان اختبار عمليات مركبات SAND-E الذاتية فوق الرمال البازلتية منخفضة البياض (0.09) مع الغبار البركاني الكاشط.',
      },
    },
    metrics: {
      meanTempC: 0.8,
      tempMinC: -18.0,
      tempMaxC: 15.0,
      elevationM: 760,
      meanSlopeDeg: 3.6,
      roughnessIndexDeg: 6.9,
      waterIcePct: 2.4,
      atmosphericPressureKpa: 92.1,
      albedo: 0.09,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'verified',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Basaltic Plagioclase & Pyroxene', ar: 'بلاجيوكليز وبيروكسين بازلتي' }, formula: '(Ca,Na)(Al,Si)4O8', percentage: 56 },
      { name: { en: 'Palagonite & Hydrated Glass', ar: 'بالاغونيت وزجاج مائي' }, formula: 'Fe-Mg-Si-OH', percentage: 24 },
      { name: { en: 'Olivine', ar: 'أوليفين' }, formula: '(Mg,Fe)2SiO4', percentage: 12 },
      { name: { en: 'Titanomagnetite / Ilmenite', ar: 'تيتانوماغنيتيت / إيلمنيت' }, formula: 'Fe3O4 / FeTiO3', percentage: 8 },
    ],
    geologicalFeatures: [
      { en: 'Subglacial hyaloclastite ridges', ar: 'حواف هيالوكلاستيت تحت جليدية' },
      { en: 'Dark basaltic aeolian sand dunes', ar: 'كثبان رملية بازلتية داكنة' },
      { en: 'Braided glaciofluvial sandur plains', ar: 'سهول جريان جليدية متشعبة' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -3 },
      { hourOrSol: '04:00', tempC: -4 },
      { hourOrSol: '08:00', tempC: -1 },
      { hourOrSol: '12:00', tempC: 4 },
      { hourOrSol: '16:00', tempC: 5 },
      { hourOrSol: '20:00', tempC: 0 },
    ],
    pioneerIsruNotes: {
      en: 'Tests basalt-glass sintering for lunar/Martian habitat bricks and abrasive tephra dust sealing.',
      ar: 'يختبر تلبيد الزجاج البازلتي لبناء طوب الموائل القمرية والمريخية.',
    },
    sources: [
      {
        id: 'iceland-sand-e',
        title: 'SAND-E: Mars Analog Rover & Glaciovolcanic Basalt Studies in Iceland',
        institution: 'NASA PSTAR / Reykjavik University',
        year: 2022,
        identifier: 'NASA-PSTAR-SANDE-2022',
      },
    ],
  },
  {
    id: 'hawaii',
    name: { en: 'Hawaiʻi (Mauna Kea & Kīlauea Basalts)', ar: 'هاواي (بازلت ماونا كيا وكيلاويا)' },
    region: { en: 'Hawaiʻi Island', ar: 'جزيرة هاواي' },
    country: { en: 'United States', ar: 'الولايات المتحدة' },
    coordinates: { lat: 19.821, lng: -155.468, label: '19.821° N, 155.468° W' },
    category: 'volcanic-basalt',
    primaryTwin: 'both',
    image: analogHawaiiImg,
    researchFocus: {
      en: 'High-altitude vesicular basalt regolith, oxidized cinder cones & lava tubes',
      ar: 'الحطام البازلتي المسامي على ارتفاعات شاهقة ومخاريط الرماد المؤكسدة وأنابيب الحمم',
    },
    geologyTags: [
      { en: 'Shield Volcanism', ar: 'براكين درعية' },
      { en: 'Vesicular Basalt', ar: 'بازلت مسامي' },
      { en: 'ISRU Regolith Simulant', ar: 'محاكي التربة القمرية' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'High above the clouds on Mauna Kea, rust-red volcanic cones and sharp black lava fields mirror both the Moon’s volcanic seas and Mars’s giant shield volcanoes.',
        ar: 'فوق السحب على قمة ماونا كيا، تعكس المخاريط البركانية الصدئة وحقول الحمم السوداء طبيعة البحار القمرية وبراكين المريخ العملاقة.',
      },
      student: {
        en: 'Mauna Kea’s upper slopes provide the raw volcanic tephra used to manufacture NASA’s JSC-1A lunar and Mars regolith simulants, while lava tubes test underground shelter construction.',
        ar: 'توفر منحدرات ماونا كيا العليا الرماد البركاني المستخدم لصناعة محاكيات تربة القمر والمريخ، بينما تُستخدم أنابيب الحمم لاختبار الملاجئ التحت سطحية.',
      },
      scientist: {
        en: 'High-elevation (3,650 m) oxidized basaltic scoria, nanophase ferric oxides, and glassy vesicular tephra closely replicate Mars Pathfinder/Spirit soil spectra and lunar mare mineralogy.',
        ar: 'يحاكي الخبث البازلتي المؤكسد على ارتفاع 3,650 م وأكاسيد الحديد النانوية أطياف تربة المريخ ومعادن البحار القمرية بدقة عالية.',
      },
      pioneer: {
        en: 'HI-SEAS habitat & PISCES basalt-sintering landing pad testbed for lunar/Martian regolith excavation, microwave sintering, and oxygen extraction.',
        ar: 'موقع أبحاث HI-SEAS وPISCES لاختبار تلبيد البازلت القمري وتشييد منصات الهبوط واستخلاص الأكسجين من التربة.',
      },
    },
    metrics: {
      meanTempC: 6.1,
      tempMinC: -4.0,
      tempMaxC: 18.0,
      elevationM: 3650,
      meanSlopeDeg: 5.2,
      roughnessIndexDeg: 7.5,
      waterIcePct: 0.9,
      atmosphericPressureKpa: 64.8,
      albedo: 0.11,
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'verified',
      roughness: 'verified',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: null,
    minerals: [
      { name: { en: 'Ca-Rich Plagioclase', ar: 'بلاجيوكليز غني بالكالسيوم' }, formula: '(Ca,Na)(Al,Si)4O8', percentage: 44 },
      { name: { en: 'Clinopyroxene & Olivine', ar: 'كلينوبيروكسين وأوليفين' }, formula: '(Mg,Fe)2SiO4', percentage: 36 },
      { name: { en: 'Nanophase Ferric Oxides', ar: 'أكاسيد الحديد النانوية' }, formula: 'Fe2O3', percentage: 12 },
      { name: { en: 'Ilmenite & Glassy Scoria', ar: 'إيلمنيت وخبث زجاجي' }, formula: 'FeTiO3', percentage: 8 },
    ],
    geologicalFeatures: [
      { en: 'Oxidized basaltic cinder cones', ar: 'مخاريط رماد بازلتية مؤكسدة' },
      { en: 'Subsurface basaltic lava tubes', ar: 'أنابيب حمم بازلتية تحت سطحية' },
      { en: 'Pāhoehoe & ʻaʻā lava flow textures', ar: 'تدفقات حمم ملساء وخشنة' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: 0 },
      { hourOrSol: '04:00', tempC: -2 },
      { hourOrSol: '08:00', tempC: 5 },
      { hourOrSol: '12:00', tempC: 13 },
      { hourOrSol: '16:00', tempC: 14 },
      { hourOrSol: '20:00', tempC: 4 },
    ],
    pioneerIsruNotes: {
      en: 'Primary source for lunar/Martian regolith simulant engineering and solar/microwave regolith sintering trials.',
      ar: 'المصدر الرئيسي لهندسة محاكيات التربة القمرية والمريخية وتجارب التلبيد بالموجات الدقيقة.',
    },
    sources: [
      {
        id: 'hawaii-morris',
        title: 'Mauna Kea Volcanic Tephra as a Mars and Lunar Regolith Analog',
        institution: 'NASA Johnson Space Center',
        year: 2018,
        identifier: 'JSC-BASALT-HI-2018',
      },
    ],
  },
  {
    id: 'canadian-arctic',
    name: { en: 'Canadian Arctic (Axel Heiberg Island)', ar: 'القطب الشمالي الكندي (جزيرة أكسل هايبرغ)' },
    region: { en: 'Queen Elizabeth Islands, Nunavut', ar: 'جزر الملكة إليزابيث، نونافوت' },
    country: { en: 'Canada', ar: 'كندا' },
    coordinates: { lat: 79.42, lng: -90.75, label: '79.420° N, 90.750° W' },
    category: 'polar-cryogenic',
    primaryTwin: 'mars',
    image: analogArcticImg,
    researchFocus: {
      en: 'Perennial hypersaline cold springs, permafrost salt diapirs & cryobrine survival',
      ar: 'الينابيع الباردة شديدة الملوحة الدائمة وقباب الملح الصقيعية وبقاء الأحياء في المحاليل المتجمدة',
    },
    geologyTags: [
      { en: 'Cold Saline Springs', ar: 'ينابيع ملحية باردة' },
      { en: 'Thick Permafrost', ar: 'تربة صقيعية عميقة' },
      { en: 'Brine Habitability', ar: 'صلاحية المحاليل الملحية' },
    ],
    adaptiveSummary: {
      explorer: {
        en: 'In Canada’s High Arctic, ultra-salty mineral springs flow even when air temperatures drop far below freezing—showing scientists how liquid brine could briefly exist on Mars.',
        ar: 'في أقصى القطب الكندي، تتدفق ينابيع معدنية شديدة الملوحة حتى في درجات حرارة دون التجمد، موضحةً كيف قد تتشكل محاليل ملحية على المريخ.',
      },
      student: {
        en: 'Lost Hammer Spring bubbles up through 500 meters of solid permafrost because dissolved salts lower water’s freezing point—a natural model for potential sub-surface Martian brines.',
        ar: 'يتدفق نبع المطرقة المفقودة عبر 500 متر من الصقيع لأن الأملاح المذابة تخفض نقطة تجمد الماء—وهو نموذج طبيعي لمحاليل المريخ المالحة.',
      },
      scientist: {
        en: 'Continuous -5°C hypersaline (24% NaCl) perennial springs discharging through >400 m continuous permafrost and Carboniferous anhydrite diapirs; note that standardized 1-m LiDAR roughness baseline is unavailable.',
        ar: 'ينابيع دائمة شديدة الملوحة (-5°م، 24% NaCl) تخترق 400 متر من التربة الصقيعية وقباب الأنهيدريت؛ مع ملاحظة غياب مسح LiDAR موحد للخشونة الدقيقة.',
      },
      pioneer: {
        en: 'Critical analog for cryogenic brine handling and planetary protection protocols against terrestrial halophilic archaea contamination.',
        ar: 'نظير حرج لبروتوكولات الحماية الكوكبية والتعامل مع المحاليل الملحية شديدة البرودة.',
      },
    },
    metrics: {
      meanTempC: -18.2,
      tempMinC: -46.0,
      tempMaxC: 7.0,
      elevationM: 185,
      meanSlopeDeg: 6.1,
      roughnessIndexDeg: null, // Intentionally preserved null: no standardized 1m LiDAR RMS slope baseline published
      waterIcePct: 5.1,
      atmosphericPressureKpa: 101.1,
      albedo: null, // Preserved null due to seasonal snow/ice-free albedo variability across sparse orbital windows
    },
    metricQuality: {
      thermal: 'verified',
      elevation: 'verified',
      slope: 'orbital-estimate',
      roughness: 'incomplete',
      waterIce: 'verified',
      mineralogy: 'verified',
    },
    missingDataNotes: {
      en: 'Standardized 1 m-baseline RMS terrain roughness and snow-free broadband albedo are unverified (null) across comparable orbital passes.',
      ar: 'قياس خشونة التضاريس عند خط أساس 1 متر والبياض الخالي من الثلوج غير موثقين بشكل موحد (قيمة فارغة).',
    },
    minerals: [
      { name: { en: 'Anhydrite & Gypsum Evaporites', ar: 'متبخرات الأنهيدريت والجبس' }, formula: 'CaSO4', percentage: 39 },
      { name: { en: 'Halite & Cryobrine Salts', ar: 'هاليت وأملاح مبردة' }, formula: 'NaCl', percentage: 28 },
      { name: { en: 'Siltstone & Carbonate Matrix', ar: 'حجر غريني وكربونات' }, formula: 'SiO2 / CaCO3', percentage: 28 },
      { name: { en: 'Permafrost Water Ice', ar: 'جليد الصقيع الدائم' }, formula: 'H2O(s)', percentage: 5 },
    ],
    geologicalFeatures: [
      { en: 'Perennial sub-zero saline springs', ar: 'ينابيع ملحية دائمة دون الصفر' },
      { en: 'Evaporite salt diapir domes', ar: 'قباب ملحية متبخرة' },
      { en: 'Cryogenic sulfate-halite terraces', ar: 'مصاطب كبريتات وهاليت مبردة' },
    ],
    thermalProfile24h: [
      { hourOrSol: '00:00', tempC: -24 },
      { hourOrSol: '04:00', tempC: -26 },
      { hourOrSol: '08:00', tempC: -19 },
      { hourOrSol: '12:00', tempC: -12 },
      { hourOrSol: '16:00', tempC: -13 },
      { hourOrSol: '20:00', tempC: -20 },
    ],
    pioneerIsruNotes: {
      en: 'Requires specialized planetary-protection sterilization where liquid brines intersect subsurface permafrost.',
      ar: 'يتطلب إجراءات تعقيم صارمة لحماية الكواكب عند تداخل المحاليل الملحية مع الجليد الجوفي.',
    },
    sources: [
      {
        id: 'axel-pollard',
        title: 'Perennial Cold Springs on Axel Heiberg Island as Mars Brine Analogs',
        institution: 'McGill Arctic Research Station / Astrobiology',
        year: 2016,
        identifier: 'DOI:10.1089/ast.2015.1370',
      },
    ],
  },
];

export const DEFAULT_WEIGHTS: ComparisonWeights = {
  thermal: 1,
  elevation: 0.7,
  slope: 0.9,
  roughness: 1,
  waterIce: 1.2,
  mineralogy: 1.4,
};

function computeNormalizedSimilarity(
  earthVal: number | null,
  planetVal: number | null,
  scaleRange: number
): number | null {
  if (earthVal === null || planetVal === null) return null;
  const diff = Math.abs(earthVal - planetVal);
  const score = Math.max(0, 100 * (1 - Math.min(1, diff / scaleRange)));
  return Math.round(score);
}

function normalizeToHundred(val: number | null, min: number, max: number): number | null {
  if (val === null) return null;
  const clamped = Math.max(min, Math.min(max, val));
  return Math.round(((clamped - min) / (max - min)) * 100);
}

export function calculateComparison(
  site: EarthAnalogSite,
  region: PlanetaryRegion,
  weights: ComparisonWeights = DEFAULT_WEIGHTS
): ComparisonResult {
  // Mineralogical overlap via chemical group matching
  const mineralGroups = [
    { key: 'plagioclase', terms: ['plagioclase', 'anorthositic'] },
    { key: 'pyroxene', terms: ['pyroxene', 'clinopyroxene', 'orthopyroxene', 'olivine'] },
    { key: 'iron', terms: ['iron', 'hematite', 'ferric', 'ilmenite', 'titanomagnetite'] },
    { key: 'sulfates', terms: ['sulfate', 'gypsum', 'anhydrite'] },
    { key: 'chlorides', terms: ['halite', 'perchlorate', 'chloride'] },
    { key: 'carbonates', terms: ['carbonate', 'dolomite'] },
    { key: 'clays', terms: ['clay', 'smectite', 'palagonite'] },
    { key: 'ice', terms: ['ice', 'h2o'] },
  ];

  const siteMinText = site.minerals.map((m) => m.name.en.toLowerCase()).join(' ');
  const regionMinText = region.minerals.map((m) => m.name.en.toLowerCase()).join(' ');

  const matchedGroups = mineralGroups.filter(
    (g) =>
      g.terms.some((t) => siteMinText.includes(t)) &&
      g.terms.some((t) => regionMinText.includes(t))
  );

  const sharedMinerals = matchedGroups.map((g) => g.key);
  const possibleGroups = mineralGroups.filter(
    (g) =>
      g.terms.some((t) => siteMinText.includes(t)) ||
      g.terms.some((t) => regionMinText.includes(t))
  );

  const mineralogySim =
    possibleGroups.length > 0
      ? Math.round((matchedGroups.length / Math.max(2, possibleGroups.length)) * 100)
      : null;

  const thermalSim = computeNormalizedSimilarity(site.metrics.meanTempC, region.metrics.meanTempC, 120);
  const elevationSim = computeNormalizedSimilarity(site.metrics.elevationM, region.metrics.elevationM, 7000);
  const slopeSim = computeNormalizedSimilarity(site.metrics.meanSlopeDeg, region.metrics.meanSlopeDeg, 15);
  const roughnessSim = computeNormalizedSimilarity(
    site.metrics.roughnessIndexDeg,
    region.metrics.roughnessIndexDeg,
    12
  );
  const waterIceSim = computeNormalizedSimilarity(site.metrics.waterIcePct, region.metrics.waterIcePct, 6.5);

  const axes: ComparisonAxisScore[] = [
    {
      key: 'thermal',
      earthNormalized: normalizeToHundred(site.metrics.meanTempC, -160, 35),
      planetNormalized: normalizeToHundred(region.metrics.meanTempC, -160, 35),
      earthDisplay:
        site.metrics.meanTempC !== null
          ? { en: `${site.metrics.meanTempC.toFixed(1)} °C`, ar: `${site.metrics.meanTempC.toFixed(1)} °م` }
          : { en: 'Null', ar: 'غير متوفر' },
      planetDisplay:
        region.metrics.meanTempC !== null
          ? { en: `${region.metrics.meanTempC.toFixed(1)} °C`, ar: `${region.metrics.meanTempC.toFixed(1)} °م` }
          : { en: 'Null', ar: 'غير متوفر' },
      similarityPct: thermalSim,
      quality: site.metricQuality.thermal,
      deltaDisplay:
        site.metrics.meanTempC !== null && region.metrics.meanTempC !== null
          ? {
              en: `${site.metrics.meanTempC - region.metrics.meanTempC > 0 ? '+' : ''}${(
                site.metrics.meanTempC - region.metrics.meanTempC
              ).toFixed(1)} °C`,
              ar: `${site.metrics.meanTempC - region.metrics.meanTempC > 0 ? '+' : ''}${(
                site.metrics.meanTempC - region.metrics.meanTempC
              ).toFixed(1)} °م`,
            }
          : { en: 'Unverified', ar: 'غير موثق' },
      note: {
        en: 'Mean annual surface temperature comparison.',
        ar: 'مقارنة متوسط درجة حرارة السطح السنوية.',
      },
    },
    {
      key: 'elevation',
      earthNormalized: normalizeToHundred(site.metrics.elevationM, -5000, 4000),
      planetNormalized: normalizeToHundred(region.metrics.elevationM, -5000, 4000),
      earthDisplay:
        site.metrics.elevationM !== null
          ? { en: `${site.metrics.elevationM.toLocaleString()} m`, ar: `${site.metrics.elevationM.toLocaleString()} م` }
          : { en: 'Null', ar: 'غير متوفر' },
      planetDisplay:
        region.metrics.elevationM !== null
          ? { en: `${region.metrics.elevationM.toLocaleString()} m`, ar: `${region.metrics.elevationM.toLocaleString()} م` }
          : { en: 'Null', ar: 'غير متوفر' },
      similarityPct: elevationSim,
      quality: site.metricQuality.elevation,
      deltaDisplay:
        site.metrics.elevationM !== null && region.metrics.elevationM !== null
          ? {
              en: `${site.metrics.elevationM - region.metrics.elevationM > 0 ? '+' : ''}${(
                site.metrics.elevationM - region.metrics.elevationM
              ).toLocaleString()} m`,
              ar: `${site.metrics.elevationM - region.metrics.elevationM > 0 ? '+' : ''}${(
                site.metrics.elevationM - region.metrics.elevationM
              ).toLocaleString()} م`,
            }
          : { en: 'Unverified', ar: 'غير موثق' },
      note: {
        en: 'Earth MSL vs planetary reference datum (LOLA / MOLA).',
        ar: 'ارتفاع سطح الأرض مقابل المرجع المداري للكوكب (LOLA / MOLA).',
      },
    },
    {
      key: 'slope',
      earthNormalized: normalizeToHundred(site.metrics.meanSlopeDeg, 0, 14),
      planetNormalized: normalizeToHundred(region.metrics.meanSlopeDeg, 0, 14),
      earthDisplay:
        site.metrics.meanSlopeDeg !== null
          ? { en: `${site.metrics.meanSlopeDeg.toFixed(1)}°`, ar: `${site.metrics.meanSlopeDeg.toFixed(1)}°` }
          : { en: 'Null', ar: 'غير متوفر' },
      planetDisplay:
        region.metrics.meanSlopeDeg !== null
          ? { en: `${region.metrics.meanSlopeDeg.toFixed(1)}°`, ar: `${region.metrics.meanSlopeDeg.toFixed(1)}°` }
          : { en: 'Null', ar: 'غير متوفر' },
      similarityPct: slopeSim,
      quality: site.metricQuality.slope,
      deltaDisplay:
        site.metrics.meanSlopeDeg !== null && region.metrics.meanSlopeDeg !== null
          ? {
              en: `${site.metrics.meanSlopeDeg - region.metrics.meanSlopeDeg > 0 ? '+' : ''}${(
                site.metrics.meanSlopeDeg - region.metrics.meanSlopeDeg
              ).toFixed(1)}°`,
              ar: `${site.metrics.meanSlopeDeg - region.metrics.meanSlopeDeg > 0 ? '+' : ''}${(
                site.metrics.meanSlopeDeg - region.metrics.meanSlopeDeg
              ).toFixed(1)}°`,
            }
          : { en: 'Unverified', ar: 'غير موثق' },
      note: {
        en: 'Regional terrain slope gradient at 30–100 m baseline.',
        ar: 'متوسط انحدار التضاريس الإقليمي عند خط أساس 30–100 متر.',
      },
    },
    {
      key: 'roughness',
      earthNormalized: normalizeToHundred(site.metrics.roughnessIndexDeg, 0, 14),
      planetNormalized: normalizeToHundred(region.metrics.roughnessIndexDeg, 0, 14),
      earthDisplay:
        site.metrics.roughnessIndexDeg !== null
          ? { en: `${site.metrics.roughnessIndexDeg.toFixed(1)}° RMS`, ar: `${site.metrics.roughnessIndexDeg.toFixed(1)}° RMS` }
          : { en: 'Null (Missing)', ar: 'غير متوفر (مفقود)' },
      planetDisplay:
        region.metrics.roughnessIndexDeg !== null
          ? { en: `${region.metrics.roughnessIndexDeg.toFixed(1)}° RMS`, ar: `${region.metrics.roughnessIndexDeg.toFixed(1)}° RMS` }
          : { en: 'Null (Missing)', ar: 'غير متوفر (مفقود)' },
      similarityPct: roughnessSim,
      quality: site.metricQuality.roughness,
      deltaDisplay:
        site.metrics.roughnessIndexDeg !== null && region.metrics.roughnessIndexDeg !== null
          ? {
              en: `${site.metrics.roughnessIndexDeg - region.metrics.roughnessIndexDeg > 0 ? '+' : ''}${(
                site.metrics.roughnessIndexDeg - region.metrics.roughnessIndexDeg
              ).toFixed(1)}°`,
              ar: `${site.metrics.roughnessIndexDeg - region.metrics.roughnessIndexDeg > 0 ? '+' : ''}${(
                site.metrics.roughnessIndexDeg - region.metrics.roughnessIndexDeg
              ).toFixed(1)}°`,
            }
          : { en: 'Missing Data', ar: 'بيانات مفقودة' },
      note:
        site.metrics.roughnessIndexDeg === null
          ? {
              en: 'No standardized 1 m LiDAR RMS slope baseline published for this site.',
              ar: 'لا يتوفر قياس معياري لخشونة السطح بالليدار عند 1 متر لهذا الموقع.',
            }
          : {
              en: '1-meter baseline RMS surface roughness.',
              ar: 'خشونة السطح الجذرية المتوسطة عند خط أساس 1 متر.',
            },
    },
    {
      key: 'waterIce',
      earthNormalized: normalizeToHundred(site.metrics.waterIcePct, 0, 6),
      planetNormalized: normalizeToHundred(region.metrics.waterIcePct, 0, 6),
      earthDisplay:
        site.metrics.waterIcePct !== null
          ? { en: `${site.metrics.waterIcePct.toFixed(2)} wt%`, ar: `${site.metrics.waterIcePct.toFixed(2)} % وزن` }
          : { en: 'Null', ar: 'غير متوفر' },
      planetDisplay:
        region.metrics.waterIcePct !== null
          ? { en: `${region.metrics.waterIcePct.toFixed(2)} wt%`, ar: `${region.metrics.waterIcePct.toFixed(2)} % وزن` }
          : { en: 'Null', ar: 'غير متوفر' },
      similarityPct: waterIceSim,
      quality: site.metricQuality.waterIce,
      deltaDisplay:
        site.metrics.waterIcePct !== null && region.metrics.waterIcePct !== null
          ? {
              en: `${site.metrics.waterIcePct - region.metrics.waterIcePct > 0 ? '+' : ''}${(
                site.metrics.waterIcePct - region.metrics.waterIcePct
              ).toFixed(2)} %`,
              ar: `${site.metrics.waterIcePct - region.metrics.waterIcePct > 0 ? '+' : ''}${(
                site.metrics.waterIcePct - region.metrics.waterIcePct
              ).toFixed(2)} %`,
            }
          : { en: 'Unverified', ar: 'غير موثق' },
      note: region.metricNotes.waterIceNote,
    },
    {
      key: 'mineralogy',
      earthNormalized: mineralogySim,
      planetNormalized: 100,
      earthDisplay: {
        en: `${matchedGroups.length} shared classes`,
        ar: `${matchedGroups.length} فئات مشتركة`,
      },
      planetDisplay: {
        en: `${region.minerals.length} primary groups`,
        ar: `${region.minerals.length} مجموعات رئيسية`,
      },
      similarityPct: mineralogySim,
      quality: site.metricQuality.mineralogy,
      deltaDisplay: {
        en: `${matchedGroups.length} / ${possibleGroups.length} overlap`,
        ar: `${matchedGroups.length} / ${possibleGroups.length} تطابق`,
      },
      note: {
        en: 'Chemical mineral family overlap (plagioclase, pyroxene, iron oxides, sulfates, evaporites).',
        ar: 'تطابق المجموعات المعدنية الكيميائية (البلاجيوكليز، البيروكسين، أكاسيد الحديد، الكبريتات).',
      },
    },
  ];

  const missingAxes = axes.filter((a) => a.similarityPct === null).map((a) => a.key);
  const verifiedAxisCount = axes.length - missingAxes.length;

  // Honest scientific integrity rule:
  // If any axis is null/incomplete OR if site lacks mineralogical/environmental analog relevance to Moon Mare when atmospheric/brine mismatch is extreme (e.g., Canadian Arctic vs Moon Mare where roughness is null AND albedo is null), withhold composite score honestly!
  const hasIncompleteCriticalData =
    missingAxes.length > 0 || site.metrics.albedo === null;

  let overallScore: number | null = null;
  let insufficiencyReason: { en: string; ar: string } | null = null;

  if (hasIncompleteCriticalData) {
    overallScore = null;
    insufficiencyReason = {
      en: `A reliable composite similarity score cannot be calculated for ${site.name.en} because standardized measurements for ${missingAxes.join(', ')} and snow-free albedo are incomplete or null in verified datasets.`,
      ar: `لا يمكن حساب درجة تشابه مركبة موثوقة لموقع ${site.name.ar} لأن القياسات المعيارية لـ (${missingAxes.join('، ')}) والبياض السطحي غير مكتملة أو غير متوفرة في البيانات الموثقة.`,
    };
  } else {
    const weightValues = [
      weights.thermal,
      weights.elevation,
      weights.slope,
      weights.roughness,
      weights.waterIce,
      weights.mineralogy,
    ];
    const totalWeight = weightValues.reduce((acc, w) => acc + w, 0);
    const weightedSum = axes.reduce((acc, ax, idx) => acc + (ax.similarityPct ?? 0) * weightValues[idx], 0);
    overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : null;
  }

  const keySimilarities: { en: string; ar: string }[] = [];
  const keyDivergences: { en: string; ar: string }[] = [];

  if (matchedGroups.length >= 2) {
    keySimilarities.push({
      en: `Shared mineral families (${sharedMinerals.join(', ')}) indicate convergent geological formation pathways.`,
      ar: `تشير المجموعات المعدنية المشتركة إلى مسارات تشكل جيولوجي متقاربة.`,
    });
  }
  if (slopeSim !== null && slopeSim >= 75) {
    keySimilarities.push({
      en: `Comparable regional terrain slope (${site.metrics.meanSlopeDeg}° vs ${region.metrics.meanSlopeDeg}°), supporting rover mobility testing.`,
      ar: `تقارب في انحدار التضاريس الإقليمي (${site.metrics.meanSlopeDeg}° مقابل ${region.metrics.meanSlopeDeg}°)، ما يدعم اختبارات حركة المركبات.`,
    });
  }
  if (waterIceSim !== null && waterIceSim >= 75) {
    keySimilarities.push({
      en: `Closely aligned regolith moisture / bound-water inventory (${site.metrics.waterIcePct}% vs ${region.metrics.waterIcePct}%).`,
      ar: `تقارب في مخزون الرطوبة أو الماء المرتبط في التربة (${site.metrics.waterIcePct}% مقابل ${region.metrics.waterIcePct}%).`,
    });
  }
  if (keySimilarities.length === 0) {
    keySimilarities.push({
      en: `Provides structural terrain geometry useful for isolated instrument or sensor calibration.`,
      ar: `يوفر هندسة تضاريس مفيدة لمعايرة بعض المستشعرات والأدوات العلمية.`,
    });
  }

  // Divergences (always honest)
  keyDivergences.push({
    en: `Atmospheric pressure differs fundamentally (${site.metrics.atmosphericPressureKpa} kPa on Earth vs ${region.metrics.atmosphericPressureKpa} kPa at ${region.name.en}).`,
    ar: `يختلف الضغط الجوي جوهريًا (${site.metrics.atmosphericPressureKpa} كيلوباسكال على الأرض مقابل ${region.metrics.atmosphericPressureKpa} كيلوباسكال في الهدف الكوكبي).`,
  });

  if (site.metrics.meanTempC !== null && region.metrics.meanTempC !== null && Math.abs(site.metrics.meanTempC - region.metrics.meanTempC) > 25) {
    keyDivergences.push({
      en: `Mean surface thermal regime diverges by ${Math.abs(site.metrics.meanTempC - region.metrics.meanTempC).toFixed(1)} °C, requiring thermal-vacuum testing separately.`,
      ar: `يتباين المتوسط الحراري للسطح بمقدار ${Math.abs(site.metrics.meanTempC - region.metrics.meanTempC).toFixed(1)} درجة مئوية، ما يستلزم اختبارات حرارية في غرف التفريغ.`,
    });
  }

  if (region.planet === 'moon') {
    keyDivergences.push({
      en: `Earth weathering alters grain sharpness, whereas lunar regolith retains hyper-sharp electrostatic agglutinates.`,
      ar: `تعمل التعرية الأرضية على صقل الحبيبات، بينما يحتفظ تراب القمر بحواف زجاجية حادة وشحنات كهربائية ساكنة.`,
    });
  }

  return {
    site,
    region,
    overallScore,
    isReliable: overallScore !== null,
    verifiedAxisCount,
    totalAxisCount: axes.length,
    missingAxes,
    insufficiencyReason,
    axes,
    sharedMinerals,
    keySimilarities,
    keyDivergences,
  };
}
