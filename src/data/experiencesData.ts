import { BilingualText, RoutePage, UserRole } from '../types/terratwin';

export interface PersonaCardDef {
  id: UserRole;
  emoji: string;
  title: BilingualText;
  description: BilingualText;
  accentHex: string;
  lightAccentHex: string;
  image: string;
  targetRoute: RoutePage;
}

export const PERSONA_CARDS: PersonaCardDef[] = [
  {
    id: 'explorer',
    emoji: '🔭',
    title: { en: 'Explorer', ar: 'المستكشف' },
    description: { en: 'Discover and explore.', ar: 'اكتشف واستكشف.' },
    accentHex: '#2A9D9F',
    lightAccentHex: '#218385',
    image: '/src/assets/images/persona_explorer_1794655848976.jpg',
    targetRoute: 'explorer-hub',
  },
  {
    id: 'student',
    emoji: '🎓',
    title: { en: 'Student', ar: 'الطالب' },
    description: { en: 'Learn and understand.', ar: 'تعلّم وافهم.' },
    accentHex: '#D9C5A3',
    lightAccentHex: '#9C7F50',
    image: '/src/assets/images/persona_student_1794655851123.jpg',
    targetRoute: 'student-hub',
  },
  {
    id: 'scientist',
    emoji: '🔬',
    title: { en: 'Scientist', ar: 'العالم' },
    description: { en: 'Analyze and research.', ar: 'حلّل وابحث.' },
    accentHex: '#3B82F6',
    lightAccentHex: '#1D4ED8',
    image: '/src/assets/images/persona_scientist_1794655852902.jpg',
    targetRoute: 'scientist-hub',
  },
  {
    id: 'astronaut',
    emoji: '🚀',
    title: { en: 'Astronaut', ar: 'رائد الفضاء' },
    description: { en: 'Experience space exploration.', ar: 'عِش تجربة استكشاف الفضاء.' },
    accentHex: '#D96B43',
    lightAccentHex: '#B84A27',
    image: '/src/assets/images/persona_astronaut_1794655850377.jpg',
    targetRoute: 'astronaut-hub',
  },
];

export interface AmazingFact {
  id: string;
  category: 'earth' | 'moon' | 'mars';
  kicker: BilingualText;
  headline: BilingualText;
  detail: BilingualText;
  metricValue: string;
  metricUnit: BilingualText;
  linkedSiteId?: string;
}

export const EXPLORER_AMAZING_FACTS: AmazingFact[] = [
  {
    id: 'fact-atacama-rain',
    category: 'mars',
    kicker: { en: 'Did You Know?', ar: 'هل تعلم؟' },
    headline: {
      en: 'Parts of Chile’s Atacama Desert went decades without measurable rainfall.',
      ar: 'شهدت أجزاء من صحراء أتاكاما في تشيلي عقودًا كاملة دون هطول مطري يُذكر.',
    },
    detail: {
      en: 'Its hyper-arid nitrate and perchlorate soils mirror Mars’s surface chemistry so closely that NASA tests life-detection drills here before launching rovers.',
      ar: 'تتشابه تربتها شديدة الجفاف والغنية بالنترات والبيركلورات مع تربة المريخ لدرجة أن وكالة ناسا تختبر فيها مثاقيب البحث عن الحياة قبل إرسال المركبات.',
    },
    metricValue: '< 2',
    metricUnit: { en: 'mm rain / yr', ar: 'ملم مطر / سنة' },
    linkedSiteId: 'atacama',
  },
  {
    id: 'fact-moon-swing',
    category: 'moon',
    kicker: { en: 'Extreme Thermal Swing', ar: 'التباين الحراري القمري' },
    headline: {
      en: 'One lunar day shifts temperatures by nearly 300 °C from noon to night.',
      ar: 'يتغير سطح القمر حراريًا بنحو 300 درجة مئوية بين الظهيرة والليل القمري.',
    },
    detail: {
      en: 'Without air or oceans to store heat, basaltic plains hit +127 °C under sunlight and plunge to -173 °C after sunset—while south polar craters stay below -230 °C.',
      ar: 'بدون غلاف جوي أو محيطات لتخزين الحرارة، ترتفع حرارة السهول البازلتية إلى +127°م نهارًا وتهوي إلى -173°م ليلًا، بينما تظل فوهات القطب الجنوبي دون -230°م.',
    },
    metricValue: '300 °C',
    metricUnit: { en: 'diurnal swing', ar: 'مدى حراري' },
  },
  {
    id: 'fact-antarctica-ice',
    category: 'earth',
    kicker: { en: 'Frozen Analog', ar: 'نظير قطبي متجمد' },
    headline: {
      en: 'Antarctica’s McMurdo Dry Valleys haven’t seen rain for ~2 million years.',
      ar: 'الوديان الجافة في أنتاركتيكا لم تشهد أمطارًا منذ قرابة مليوني عام.',
    },
    detail: {
      en: 'Fierce katabatic winds evaporate snow before it melts, leaving dry polygon-patterned ground over buried permafrost—just like Mars’s northern plains.',
      ar: 'تبخر الرياح القطبية الجافة الثلوج قبل ذوبانها، تاركة تربة مضلعة جافة فوق جليد دائم مدفون تشبه سهول المريخ الشمالية.',
    },
    metricValue: '0.5',
    metricUnit: { en: 'wt% surface moisture', ar: 'رطوبة سطحية' },
    linkedSiteId: 'antarctica',
  },
  {
    id: 'fact-haughton-breccia',
    category: 'moon',
    kicker: { en: 'Impact Laboratory', ar: 'مختبر الفوهات' },
    headline: {
      en: 'A 23-km Arctic crater lets astronauts train inside real impact-shattered rock.',
      ar: 'تتيح فوهة قطبية بقطر 23 كم لرواد الفضاء التدريب داخل صخور محطمة بالتصادم النيزكي.',
    },
    detail: {
      en: 'Haughton Crater in Nunavut was carved 23 million years ago, preserving impact melt breccia and polar frost polygons identical to high-latitude lunar and Martian craters.',
      ar: 'تشكّلت فوهة هوتون في كندا قبل 23 مليون سنة، وتحتفظ بصخور بريشيا مصهورة ومضلعات جليدية مماثلة لفوهات القمر والمريخ.',
    },
    metricValue: '23 km',
    metricUnit: { en: 'crater diameter', ar: 'قطر الفوهة' },
    linkedSiteId: 'haughton',
  },
  {
    id: 'fact-iceland-basalt',
    category: 'mars',
    kicker: { en: 'Volcanic Glass & Ice', ar: 'الزجاج البركاني والجليد' },
    headline: {
      en: 'Iceland’s central highlands mimic the volcanic dust storms and basalt sands of Mars.',
      ar: 'تحاكي مرتفعات أيسلندا العواصف الغبارية البازلتية والسهول البركانية فوق المريخ.',
    },
    detail: {
      en: 'When lava erupts beneath glaciers in Iceland, it forms glassy iron-rich palagonite—one of the closest spectral matches to Martian dark sand dunes.',
      ar: 'عندما تندفع الحمم تحت الأنهار الجليدية في أيسلندا تتكوّن معادن البالاغونيت الزجاجية الغنية بالحديد، وهي أقرب نظير طيفي لكثبان المريخ الداكنة.',
    },
    metricValue: '49%',
    metricUnit: { en: 'plagioclase basalt', ar: 'بلاجيوكلاز بازلتي' },
    linkedSiteId: 'iceland',
  },
  {
    id: 'fact-olympus-scale',
    category: 'mars',
    kicker: { en: 'Planetary Scale', ar: 'مقياس كوكبي مذهل' },
    headline: {
      en: 'Martian Jezero Crater’s ancient river delta spans 10 km across a 45-km lake basin.',
      ar: 'تمتد دلتا النهر القديمة في فوهة جيزيرو بالمريخ لمسافة 10 كم داخل حوض بحيرة بقطر 45 كم.',
    },
    detail: {
      en: 'Just like Death Valley’s Badwater evaporite fans, Jezero’s clay and carbonate terraces trap minerals that on Earth preserve microscopic fossil signatures.',
      ar: 'تمامًا مثل مراوح وادي الموت التبخيرية، تحفظ مدرجات الطين والكربونات في جيزيرو معادن قادرة على حفظ البصمات الحيوية المجهرية.',
    },
    metricValue: '3.6B',
    metricUnit: { en: 'years old', ar: 'عمر الدلتا' },
    linkedSiteId: 'death-valley',
  },
];

export interface EarthSpaceComparisonFact {
  id: string;
  title: BilingualText;
  earthLabel: BilingualText;
  earthValue: string;
  spaceLabel: BilingualText;
  spaceValue: string;
  insight: BilingualText;
}

export const EARTH_SPACE_COMPARISONS: EarthSpaceComparisonFact[] = [
  {
    id: 'cmp-gravity',
    title: { en: 'Surface Gravity', ar: 'الجاذبية السطحية' },
    earthLabel: { en: 'Earth Standard', ar: 'جاذبية الأرض' },
    earthValue: '9.81 m/s²',
    spaceLabel: { en: 'Moon / Mars', ar: 'القمر / المريخ' },
    spaceValue: '1.62 / 3.72 m/s²',
    insight: {
      en: 'Astronauts weigh ~16.5% on the Moon and ~38% on Mars, dramatically changing dust settling and rover traction.',
      ar: 'يزن رائد الفضاء نحو 16.5% على القمر و38% على المريخ، مما يغيّر حركة الغبار وثبات عجلات المركبات.',
    },
  },
  {
    id: 'cmp-pressure',
    title: { en: 'Atmospheric Pressure', ar: 'الضغط الجوي السطحي' },
    earthLabel: { en: 'Atacama Field Site', ar: 'محطة أتاكاما' },
    earthValue: '76.5 kPa',
    spaceLabel: { en: 'Mars Jezero Crater', ar: 'جيزيرو بالمريخ' },
    spaceValue: '0.65 kPa',
    insight: {
      en: 'Mars has less than 1% of Earth’s sea-level air pressure—meaning liquid water boils or freezes almost instantly on its surface.',
      ar: 'يمتلك المريخ أقل من 1% من الضغط الجوي الأرضي عند مستوى سطح البحر، لذا لا يستقر الماء السائل على سطحه اليوم.',
    },
  },
  {
    id: 'cmp-elevation',
    title: { en: 'Extreme Relief', ar: 'تباين الارتفاعات' },
    earthLabel: { en: 'Mauna Kea vs Death Valley', ar: 'ماونا كيا ووادي الموت' },
    earthValue: '4,207 m / -86 m',
    spaceLabel: { en: 'Moon South Pole / Jezero', ar: 'القطب الجنوبي / جيزيرو' },
    spaceValue: '+1,950 m / -2,570 m',
    insight: {
      en: 'Mauna Kea’s high volcanic ridge tests low-pressure optics, while Death Valley’s -86 m salt flat models sunken Martian lakebeds.',
      ar: 'تختبر قمة ماونا كيا البصريات في الضغط المنخفض، بينما يحاكي منخفض وادي الموت (-86 م) قيعان البحيرات المريخية.',
    },
  },
];

export interface TriviaQuestion {
  id: string;
  topic: BilingualText;
  question: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export const EXPLORER_TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'triv-1',
    topic: { en: 'Atacama & Mars', ar: 'أتاكاما والمريخ' },
    question: {
      en: 'Which reactive salt found in both Chile’s Atacama Desert and Mars’s soil complicates life-detection chemistry?',
      ar: 'ما الملح المؤكسد الموجود في صحراء أتاكاما وتربة المريخ والذي يؤثر على اختبارات البحث عن الحياة؟',
    },
    options: [
      { en: 'Perchlorate salts', ar: 'أملاح البيركلورات' },
      { en: 'Limestone chalk', ar: 'الطباشير الجيري' },
      { en: 'Quartz river gravel', ar: 'حصى الكوارتز النهري' },
      { en: 'Organic peat moss', ar: 'الطحالب العضوية' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Perchlorates (ClO₄⁻) accumulate in hyper-arid regions like Yungay in Atacama and across Mars regolith.',
      ar: 'تتراكم البيركلورات في البيئات شديدة الجفاف مثل منطقة يونغاي في أتاكاما وفي تربة المريخ.',
    },
  },
  {
    id: 'triv-2',
    topic: { en: 'Lunar South Pole', ar: 'القطب الجنوبي للقمر' },
    question: {
      en: 'Why can water ice survive inside Shackleton Crater near the lunar south pole?',
      ar: 'لماذا يستطيع الجليد المائي البقاء داخل فوهة شاكلتون قرب القطب الجنوبي للقمر؟',
    },
    options: [
      { en: 'Permanent shadow keeps temperatures below -230 °C', ar: 'الظل الدائم يبقي الحرارة دون -230°م' },
      { en: 'Thick lunar clouds block sunlight', ar: 'سحب قمرية كثيفة تحجب الشمس' },
      { en: 'Underground geothermal volcanoes heat it', ar: 'براكين جوفية تحفظه' },
      { en: 'High lunar air pressure traps vapor', ar: 'ضغط جوي قمري مرتفع يحبسه' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Because the Moon’s axial tilt is only 1.54°, deep polar crater floors never receive direct sunlight.',
      ar: 'بسبب ميل محور القمر الطفيف (1.54°)، لا تصل أشعة الشمس أبدًا إلى قيعان الفوهات القطبية العميقة.',
    },
  },
  {
    id: 'triv-3',
    topic: { en: 'Volcanic Analogs', ar: 'النظائر البركانية' },
    question: {
      en: 'Where do engineers test lunar regolith simulant (JSC-1A) derived from iron-rich basaltic tephra?',
      ar: 'أين يختبر المهندسون تربة قمرية محاكية (JSC-1A) مشتقة من رماد البازلت الغني بالحديد؟',
    },
    options: [
      { en: 'Mauna Kea, Hawaiʻi', ar: 'ماونا كيا، هاواي' },
      { en: 'Amazon Rainforest', ar: 'غابات الأمازون' },
      { en: 'Sahara Sand Erg', ar: 'عرق الصحراء الكبرى' },
      { en: 'Dead Sea Shore', ar: 'شاطئ البحر الميت' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Mauna Kea’s Puʻu Nēnē cinder cone supplies volcanic tephra whose composition closely matches lunar mare regolith.',
      ar: 'يوفر مخروط بوو نيني البركاني في ماونا كيا رمادًا بازلتيًا يطابق كيميائيًا تربة البحار القمرية.',
    },
  },
  {
    id: 'triv-4',
    topic: { en: 'Mars Rovers', ar: 'مركبات المريخ' },
    question: {
      en: 'Which Martian crater contains an ancient river delta currently explored by NASA’s Perseverance rover?',
      ar: 'أي فوهة مريخية تضم دلتا نهر قديمة تستكشفها مركبة المثابرة (Perseverance) التابعة لناسا؟',
    },
    options: [
      { en: 'Jezero Crater', ar: 'فوهة جيزيرو' },
      { en: 'Tycho Crater', ar: 'فوهة تايكو' },
      { en: 'Meteor Crater', ar: 'فوهة النيزك' },
      { en: 'Mare Tranquillitatis', ar: 'بحر السكون' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Jezero Crater preserves 3.6-billion-year-old clay and carbonate delta sediments deposited when a river entered an ancient lake.',
      ar: 'تحفظ فوهة جيزيرو رواسب دلتا عمرها 3.6 مليار سنة تشكلت عندما صب نهر في بحيرة مريخية قديمة.',
    },
  },
  {
    id: 'triv-5',
    topic: { en: 'Polar Mars', ar: 'المريخ القطبي' },
    question: {
      en: 'What causes geometric polygon cracks in Antarctica’s Dry Valleys and Mars’s northern plains?',
      ar: 'ما سبب تكوّن الشقوق المضلعة الهندسية في الوديان الجافة بأنتاركتيكا وسهول المريخ الشمالية؟',
    },
    options: [
      { en: 'Seasonal thermal contraction of subsurface ice', ar: 'الانكماش الحراري الموسمي للجليد تحت السطحي' },
      { en: 'Tectonic ocean subduction', ar: 'اندساس الصفائح المحيطية' },
      { en: 'Tropical monsoon erosion', ar: 'تعرية الأمطار الموسمية الاستوائية' },
      { en: 'Coral reef calcification', ar: 'تكلس الشعاب المرجانية' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Extreme seasonal cooling contracts buried ice wedges, fracturing overlying dry regolith into 5–20 m polygons.',
      ar: 'يؤدي التبريد الموسمي الشديد إلى انكماش الجليد المدفون وتصدّع التربة فوقه إلى مضلعات هندسية منتظمة.',
    },
  },
  {
    id: 'triv-6',
    topic: { en: 'Evaporites', ar: 'المتبخرات' },
    question: {
      en: 'Why is Death Valley’s Badwater Basin compared to Gale Crater on Mars?',
      ar: 'لماذا يُقارن حوض بادواتر في وادي الموت بفوهة غيل على المريخ؟',
    },
    options: [
      { en: 'Both preserve layered sulfate and chloride salts left by evaporating lakes', ar: 'كلاهما يحفظ أملاح الكبريتات والكلوريد المتبقية من تبخر البحيرات' },
      { en: 'Both have active liquid oceans today', ar: 'كلاهما يضم محيطات سائلة نشطة حاليًا' },
      { en: 'Both sit at 8,000 meters above sea level', ar: 'كلاهما يقع على ارتفاع 8,000 متر' },
      { en: 'Both are covered in pure granite', ar: 'كلاهما مغطى بالجرانيت النقي' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Evaporating closed-basin lakes concentrate sulfates (gypsum/halite) in distinct mineral crusts observed by MSL Curiosity.',
      ar: 'تُركّز البحيرات المغلقة المتبخرة أملاح الكبريتات والهاليت في طبقات واضحة رصدتها مركبة كيوريوسيتي في فوهة غيل.',
    },
  },
];

export interface StudentLesson {
  id: string;
  subject: 'earth-science' | 'planetary-science' | 'geology' | 'climate' | 'moon-mars';
  subjectLabel: BilingualText;
  title: BilingualText;
  summary: BilingualText;
  keyTakeaways: BilingualText[];
  relatedSiteId: string;
  relatedRegionId: 'moon-mare' | 'moon-south-pole' | 'mars-jezero' | 'mars-gale';
  flashcards: { term: BilingualText; definition: BilingualText }[];
}

export const STUDENT_LESSONS: StudentLesson[] = [
  {
    id: 'lesson-earth-science',
    subject: 'earth-science',
    subjectLabel: { en: 'Earth Science', ar: 'علوم الأرض' },
    title: {
      en: 'Hyper-Arid Deserts & Moisture Limits on Earth',
      ar: 'الصحارى شديدة الجفاف وحدود الرطوبة على الأرض',
    },
    summary: {
      en: 'Earth’s rain-shadow basins—like the Atacama Desert between the Andes and the Pacific upwelling—show how atmospheric circulation starves landscapes of liquid water while concentrating surface salts.',
      ar: 'تُظهر أحواض الظل المطري على الأرض—كصحراء أتاكاما بين جبال الأنديز والمحيط الهادئ—كيف تحرم الدورة الجوية التضاريس من الماء وتُركّز الأملاح على السطح.',
    },
    keyTakeaways: [
      {
        en: 'Atacama receives < 2 mm/year of rain, reducing biological soil moisture to ~0.3 wt%.',
        ar: 'تتلقى أتاكاما أقل من 2 ملم مطر سنويًا، مما يخفض رطوبة التربة إلى ~0.3%.',
      },
      {
        en: 'Without rainfall leaching, nitrate and perchlorate minerals survive intact for millions of years.',
        ar: 'بدون غسيل مطري، تبقى معادن النترات والبيركلورات محفوظة لملايين السنين.',
      },
      {
        en: 'Subsurface microbes hide inside translucent salt crystals (halite) to harvest trace fog humidity.',
        ar: 'تختبئ الميكروبات داخل بلورات الملح الشفافة لاستخلاص رطوبة الضباب الضئيلة.',
      },
    ],
    relatedSiteId: 'atacama',
    relatedRegionId: 'mars-jezero',
    flashcards: [
      {
        term: { en: 'Hyper-arid Index', ar: 'مؤشر الجفاف المفرط' },
        definition: {
          en: 'Regions where potential evaporation exceeds annual precipitation by more than 20×.',
          ar: 'مناطق يتجاوز فيها التبخر المحتمل كمية الأمطار السنوية بأكثر من عشرين ضعفًا.',
        },
      },
      {
        term: { en: 'Endolithic Habitat', ar: 'موطن صخري داخلي' },
        definition: {
          en: 'Microscopic niches inside porous rocks or salt crusts shielded from intense UV radiation.',
          ar: 'بيئات مجهرية داخل مسام الصخور أو القشور الملحية تحمي من الأشعة فوق البنفسجية.',
        },
      },
    ],
  },
  {
    id: 'lesson-planetary-science',
    subject: 'planetary-science',
    subjectLabel: { en: 'Planetary Science', ar: 'علوم الكواكب' },
    title: {
      en: 'How Analog Telemetry Calibrates Space Missions',
      ar: 'كيف تعاير قياسات النظائر مهمات استكشاف الفضاء',
    },
    summary: {
      en: 'Orbiters measure light spectra and laser elevations from hundreds of kilometers up. By testing the exact same spectrometers and altimeters over terrestrial analogs, scientists eliminate guesswork.',
      ar: 'تقيس الأقمار المدارية الأطياف الضوئية والارتفاعات بالليزر من مئات الكيلومترات. وعند اختبار نفس الأجهزة فوق النظائر الأرضية، يتأكد العلماء من دقة التفسير الكوكبي.',
    },
    keyTakeaways: [
      {
        en: '1-meter LiDAR roughness predicts whether a rover wheel or lander footpad will tip or slip.',
        ar: 'تتنبأ خشونة الليدار عند متر واحد بإمكانية انزلاق عجلات المركبات أو قواعد الهبوط.',
      },
      {
        en: 'Surface albedo controls solar heating: dark lunar basalt (~0.09) absorbs far more heat than polar ice (~0.35+).',
        ar: 'يتحكم البياض السطحي في امتصاص الحرارة: البازلت القمري الداكن (~0.09) يمتص حرارة أعلى بكثير من الجليد.',
      },
      {
        en: 'When ground measurements are missing (Null), scientists withhold composite similarity scores rather than guessing.',
        ar: 'عند نقص قياس ميداني (غير متوفر)، يحجب العلماء النتيجة المركبة بدل تخمينها.',
      },
    ],
    relatedSiteId: 'hawaii',
    relatedRegionId: 'moon-mare',
    flashcards: [
      {
        term: { en: 'Surface Albedo', ar: 'البياض السطحي (Albedo)' },
        definition: {
          en: 'Fraction of incoming solar radiation reflected by a surface (0 = pure black, 1 = perfect mirror).',
          ar: 'نسبة الإشعاع الشمسي المنعكس عن السطح (0 امتصاص كامل، 1 انعكاس كامل).',
        },
      },
      {
        term: { en: 'LOLA / MOLA Datum', ar: 'مرجع الليزر القمري/المريخي' },
        definition: {
          en: 'Zero-elevation reference sphere defined by orbital laser altimetry on the Moon (LRO) and Mars (MGS).',
          ar: 'مستوى الصفر المرجعي للارتفاعات المقاس بالليزر المداري حول القمر والمريخ.',
        },
      },
    ],
  },
  {
    id: 'lesson-geology',
    subject: 'geology',
    subjectLabel: { en: 'Geology', ar: 'الجيولوجيا' },
    title: {
      en: 'Basaltic Volcanism, Impact Breccia & Evaporites',
      ar: 'البراكين البازلتية وصخور التصادم والمتبخرات',
    },
    summary: {
      en: 'Three rock families dominate the Moon and Mars: dark basalt lava plains, impact-shattered breccia around craters, and layered sulfate/clay sediments left by ancient lakes.',
      ar: 'تهيمن ثلاث عائلات صخرية على القمر والمريخ: سهول الحمم البازلتية الداكنة، وبريشيا التصادم حول الفوهات، ورواسب الكبريتات والطين من البحيرات القديمة.',
    },
    keyTakeaways: [
      {
        en: 'Plagioclase feldspar and pyroxene dominate lunar mare and Martian volcanic provinces.',
        ar: 'يسود معدن البلاجيوكلاز والبيروكسين في البحار القمرية والمناطق البركانية بالمريخ.',
      },
      {
        en: 'Smectite clays and carbonates in Jezero indicate sustained liquid water around 3.6 billion years ago.',
        ar: 'تدل معادن الطين السميكتيتي والكربونات في جيزيرو على وجود ماء سائل مستقر قبل 3.6 مليار سنة.',
      },
      {
        en: 'Gypsum and halite crusts in Death Valley mirror sulfate-rich strata in Gale Crater.',
        ar: 'تعكس قشور الجبس والهاليت في وادي الموت الطبقات الغنية بالكبريتات في فوهة غيل.',
      },
    ],
    relatedSiteId: 'iceland',
    relatedRegionId: 'mars-gale',
    flashcards: [
      {
        term: { en: 'Impact Melt Breccia', ar: 'بريشيا الصهر التصادمي' },
        definition: {
          en: 'Angular rock fragments welded together by extreme heat and shock pressure during a meteorite impact.',
          ar: 'شظايا صخرية حادة التَحمت بفعل الحرارة والصدمة الهائلة أثناء ارتطام نيزكي.',
        },
      },
      {
        term: { en: 'Palagonite', ar: 'البالاغونيت' },
        definition: {
          en: 'Altered iron-rich volcanic glass formed when hot basalt lava interacts with glacial ice or water.',
          ar: 'زجاج بركاني متحلل غني بالحديد يتكوّن عند تلامس الحمم البازلتية الساخنة مع الجليد أو الماء.',
        },
      },
    ],
  },
  {
    id: 'lesson-climate',
    subject: 'climate',
    subjectLabel: { en: 'Climate & Atmosphere', ar: 'المناخ والغلاف الجوي' },
    title: {
      en: 'Atmospheric Thickness & Diurnal Thermal Envelopes',
      ar: 'كثافة الغلاف الجوي والمنحنيات الحرارية اليومية',
    },
    summary: {
      en: 'Compare 24-hour temperature curves across Earth, Mars, and the Moon: dense Earth air cushions day-to-night swings, thin Martian CO₂ (~0.65 kPa) amplifies 100 °C swings, and airless lunar rock jumps 300 °C.',
      ar: 'تُظهر مقارنة منحنيات الـ 24 ساعة أثر الهواء: الغلاف الأرضي الكثيف يلطّف التغير اليومي، بينما يضاعف غاز المريخ الرقيق (0.65 كيلوباسكال) الفارق إلى 100°م، ويقفز القمر بلا هواء 300°م.',
    },
    keyTakeaways: [
      {
        en: 'Earth analog pressure drops with altitude: Mauna Kea (4,207 m) sits at ~61 kPa vs sea-level 101.3 kPa.',
        ar: 'ينخفض الضغط الأرضي مع الارتفاع: قمة ماونا كيا (4,207 م) عند ~61 كيلوباسكال مقابل 101.3 عند سطح البحر.',
      },
      {
        en: 'Mars atmosphere is ~95% CO₂ at ~0.65 kPa, driving extreme radiative cooling immediately after sunset.',
        ar: 'يتألف جو المريخ من 95% ثاني أكسيد الكربون عند ~0.65 كيلوباسكال مما يسبب تبريدًا إشعاعيًا سريعًا عند الغروب.',
      },
    ],
    relatedSiteId: 'antarctica',
    relatedRegionId: 'mars-jezero',
    flashcards: [
      {
        term: { en: 'Diurnal Thermal Excursion', ar: 'التباين الحراري اليومي' },
        definition: {
          en: 'The temperature difference between maximum afternoon solar heating and minimum pre-dawn cooling.',
          ar: 'الفارق الحراري بين ذروة التسخين الشمسي بعد الظهر وأدنى برودة قبل الفجر.',
        },
      },
    ],
  },
  {
    id: 'lesson-moon-mars',
    subject: 'moon-mars',
    subjectLabel: { en: 'Moon & Mars Studies', ar: 'دراسات القمر والمريخ' },
    title: {
      en: 'Where Water Ice Hides: Polar Cold Traps vs Bound Minerals',
      ar: 'أين يختبئ الماء: مصائد الجليد القمرية مقابل معادن المريخ',
    },
    summary: {
      en: 'Water exists in two completely different forms: frozen volatile ice inside permanently shadowed lunar craters (~5.6 wt%), and chemically bound water locked inside Martian clay minerals (~2.1 wt%).',
      ar: 'يوجد الماء بصورتين مختلفتين تمامًا: جليد متجمد في ظلال فوهات القمر القطبية (~5.6%)، وماء مرتبط كيميائيًا داخل بلورات الطين المريخي (~2.1%).',
    },
    keyTakeaways: [
      {
        en: 'Moon Mare equatorial regolith is anhydrous (< 0.01 wt%), whereas south pole cold traps reach 5.6 wt% ice.',
        ar: 'تربة البحار القمرية الاستوائية جافة تمامًا (< 0.01%)، بينما تصل مصائد القطب الجنوبي إلى 5.6% جليدًا.',
      },
      {
        en: 'Extracting bound water from Martian clays requires heating regolith above 300–450 °C in ISRU ovens.',
        ar: 'يتطلب استخلاص الماء المرتبط من طين المريخ تسخين التربة فوق 300–450°م في أفران خاصة.',
      },
    ],
    relatedSiteId: 'canadian-arctic',
    relatedRegionId: 'moon-south-pole',
    flashcards: [
      {
        term: { en: 'PSR (Permanently Shadowed Region)', ar: 'منطقة الظل الدائم' },
        definition: {
          en: 'Deep polar lunar crater floors shielded from sunlight for billions of years, acting as cryogenic water traps.',
          ar: 'قيعان فوهات قطبية قمرية لم تبلغها الشمس لمليارات السنين وتعمل كمصائد تبريد للماء.',
        },
      },
    ],
  },
];

export interface StudentVideoStage {
  id: string;
  title: BilingualText;
  durationLabel: string;
  planetColor: string;
  steps: {
    stepTitle: BilingualText;
    narration: BilingualText;
    telemetryTag: string;
  }[];
}

export const STUDENT_VIDEO_MODULES: StudentVideoStage[] = [
  {
    id: 'vid-jezero-delta',
    title: {
      en: 'Visual Sequence 01 · How Jezero Crater Delta Preserved Clays',
      ar: 'تسلسل مرئي 01 · كيف حفظت دلتا جيزيرو معادن الطين',
    },
    durationLabel: '3 Stages',
    planetColor: '#D96B43',
    steps: [
      {
        stepTitle: { en: 'Stage 1 · Ancient River Inflow (3.6 Ga)', ar: 'المرحلة 1 · تدفق النهر القديم (3.6 مليار سنة)' },
        narration: {
          en: 'Liquid water carved a valley through the western rim of Jezero Crater, filling a 45-km lake and depositing fan-shaped delta strata.',
          ar: 'شق الماء السائل واديًا عبر الحافة الغربية لفوهة جيزيرو، ليملأ بحيرة بقطر 45 كم ويرسّب طبقات الدلتا المروحية.',
        },
        telemetryTag: 'P ~ 50 kPa · H2O Active',
      },
      {
        stepTitle: { en: 'Stage 2 · Climate Desiccation & Evaporites', ar: 'المرحلة 2 · الجفاف المناخي وترسّب الأملاح' },
        narration: {
          en: 'As Mars lost its magnetic shield and atmosphere thinned to 0.65 kPa, the lake evaporated—leaving magnesium carbonates and smectite clays.',
          ar: 'مع تلاشي الغلاف الجوي إلى 0.65 كيلوباسكال تبخرت البحيرة تاركة كربونات المغنيسيوم ومعادن الطين السميكتيتي.',
        },
        telemetryTag: 'P ~ 0.65 kPa · Bound H2O 2.1 wt%',
      },
      {
        stepTitle: { en: 'Stage 3 · Earth Analog Calibration (Death Valley / Atacama)', ar: 'المرحلة 3 · المعايرة بالنظائر الأرضية' },
        narration: {
          en: 'Scientists scan terrestrial clay fans and hyper-arid evaporite crusts with rover spectrometers to recognize ancient biosignature traps.',
          ar: 'يفحص العلماء مراوح الطين وقشور المتبخرات الأرضية بنفس مطيافيات المركبات لرصد مصائد البصمات الحيوية.',
        },
        telemetryTag: 'CRISM / SuperCam Calibrated',
      },
    ],
  },
  {
    id: 'vid-lunar-ice',
    title: {
      en: 'Visual Sequence 02 · Cryogenic Ice Trapping at the Lunar South Pole',
      ar: 'تسلسل مرئي 02 · احتجاز الجليد في القطب الجنوبي للقمر',
    },
    durationLabel: '3 Stages',
    planetColor: '#94A3B8',
    steps: [
      {
        stepTitle: { en: 'Stage 1 · 1.54° Axial Tilt Geometry', ar: 'المرحلة 1 · هندسة ميل المحور (1.54°)' },
        narration: {
          en: 'Sunlight skims horizontally across Shackleton Crater’s rim, leaving the crater floor 4.2 km below in eternal darkness.',
          ar: 'تمر أشعة الشمس أفقيًا فوق حافة فوهة شاكلتون، تاركة قاع الفوهة على عمق 4.2 كم في ظلام أبدي.',
        },
        telemetryTag: 'Rim +1,950 m · T_floor -238 °C',
      },
      {
        stepTitle: { en: 'Stage 2 · Volatile Cold Trapping', ar: 'المرحلة 2 · المصيدة الحرارية للمواد المتطايرة' },
        narration: {
          en: 'Water molecules delivered by comets and solar-wind protons bounce across sunlit regolith until they freeze permanently inside polar craters.',
          ar: 'تقفز جزيئات الماء القادمة من المذنبات عبر التربة المضاءة حتى تتجمد نهائيًا داخل فوهات الظل الدائم.',
        },
        telemetryTag: 'Ice Inventory ~ 5.6 wt%',
      },
      {
        stepTitle: { en: 'Stage 3 · Arctic Permafrost Testing (Devon Island)', ar: 'المرحلة 3 · اختبارات القطب الكندي' },
        narration: {
          en: 'Autonomous drills test cryogenic core extraction inside Haughton Crater and Antarctica’s Dry Valleys before Artemis III.',
          ar: 'تختبر المثاقيب الذاتية استخراج العينات المتجمدة داخل فوهة هوتون والوديان الجافة قبل مهمة أرتميس 3.',
        },
        telemetryTag: 'Artemis III ISRU Prep',
      },
    ],
  },
];

export interface AstronautMission {
  id: string;
  name: BilingualText;
  targetPlanet: 'moon' | 'mars' | 'earth';
  siteOrRegionName: BilingualText;
  durationLabel: BilingualText;
  difficulty: BilingualText;
  objective: BilingualText;
  initialOxygenPct: number;
  initialPowerKwh: number;
  ambientTempC: number;
  hazardNote: BilingualText;
  linkedRoute: RoutePage;
}

export const ASTRONAUT_MISSIONS: AstronautMission[] = [
  {
    id: 'mission-artemis-pole',
    name: { en: 'Artemis South Pole Ice Traverse', ar: 'مهمة أرتميس لاستكشاف جليد القطب الجنوبي' },
    targetPlanet: 'moon',
    siteOrRegionName: { en: 'Shackleton Crater PSR', ar: 'فوهة شاكلتون — القطب الجنوبي' },
    durationLabel: { en: '5 Operational Phases', ar: '5 مراحل تشغيلية' },
    difficulty: { en: 'Cryogenic High-Risk', ar: 'تحدي تبريد فائق' },
    objective: {
      en: 'Descend 12° crater slopes to sample 5.6 wt% volatile ice while conserving suit battery heat at -238 °C.',
      ar: 'الهبوط على منحدرات بزاوية 12° لأخذ عينات جليد بنسبة 5.6% مع الحفاظ على طاقة التدفئة عند -238°م.',
    },
    initialOxygenPct: 100,
    initialPowerKwh: 85,
    ambientTempC: -210,
    hazardNote: {
      en: 'Sharp abrasive highland dust & total optical shadow inside the crater floor.',
      ar: 'غبار قمري حاد كاشط وظلام بصري كامل داخل قاع الفوهة.',
    },
    linkedRoute: 'moon',
  },
  {
    id: 'mission-mars-jezero',
    name: { en: 'Jezero Delta Core Retrieval', ar: 'مهمة استعادة عينات دلتا جيزيرو' },
    targetPlanet: 'mars',
    siteOrRegionName: { en: 'Jezero Crater Western Delta', ar: 'الدلتا الغربية لفوهة جيزيرو' },
    durationLabel: { en: '5 Sol Traverse', ar: 'عبور 5 أيام مريخية (Sol)' },
    difficulty: { en: 'Dust Storm & Perchlorate', ar: 'عاصفة غبار وبيركلورات' },
    objective: {
      en: 'Navigate a pressurized rover across smectite clay benches, mitigate regional dust opacity, and extract bound water.',
      ar: 'قيادة مركبة مضغوطة عبر مدرجات الطين ومواجهة العواصف الغبارية واستخلاص الماء المرتبط.',
    },
    initialOxygenPct: 100,
    initialPowerKwh: 90,
    ambientTempC: -63,
    hazardNote: {
      en: 'Fine perchlorate regolith clings to radiator seals; 0.65 kPa atmosphere prevents evaporative cooling.',
      ar: 'يلتصق غبار البيركلورات بالموانع، والضغط 0.65 كيلوباسكال يحد من التبريد التقليدي.',
    },
    linkedRoute: 'mars',
  },
  {
    id: 'mission-atacama-trial',
    name: { en: 'Atacama Pre-Flight Rover Simulation', ar: 'محاكاة مركبة أتاكاما الميدانية' },
    targetPlanet: 'earth',
    siteOrRegionName: { en: 'Yungay Hyper-Arid Station, Chile', ar: 'محطة يونغاي بأتاكاما، تشيلي' },
    durationLabel: { en: '5 Field Sols', ar: '5 أيام تجارب ميدانية' },
    difficulty: { en: 'Autonomous Navigation', ar: 'ملاحة ذاتية' },
    objective: {
      en: 'Validate autonomous LiDAR hazard avoidance and deep subsurface drilling across crusted nitrate terrain.',
      ar: 'اختبار الملاحة الذاتية بالليدار والحفر العميق عبر القشور الملحية الجافة قبل الإطلاق.',
    },
    initialOxygenPct: 100,
    initialPowerKwh: 95,
    ambientTempC: 17,
    hazardNote: {
      en: 'Intense UV irradiance and high-albedo evaporite glare test optical rover stereo cameras.',
      ar: 'أشعة فوق بنفسجية عالية وانعكاس ملحي يختبران كاميرات الملاحة للمركبة.',
    },
    linkedRoute: 'explorer',
  },
];

export interface AchievementDef {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
}

export const ACHIEVEMENT_CATALOG: AchievementDef[] = [
  {
    id: 'first-profile',
    title: { en: 'Observatory Credentials', ar: 'اعتماد المرصد' },
    description: {
      en: 'Registered your explorer profile and joined TerraTwin.',
      ar: 'سجّلت اسمك واخترت مسارك العلمي في تيرا توين.',
    },
    icon: '🛰️',
  },
  {
    id: 'twin-matcher',
    title: { en: 'Analog Pathfinder', ar: 'مستكشف النظائر' },
    description: {
      en: 'Completed a round of the Earth-to-Planet Twin Matcher or Trivia challenge.',
      ar: 'أتممت تحدي مطابقة النظائر أو الاختبار المعرفي.',
    },
    icon: '🔭',
  },
  {
    id: 'scholar-quiz',
    title: { en: 'Planetary Scholar', ar: 'باحث كوكبي' },
    description: {
      en: 'Scored 75% or higher on the Student Planetary Science Quiz.',
      ar: 'حققت 75% فأكثر في اختبار الطالب لعلوم الكواكب.',
    },
    icon: '🎓',
  },
  {
    id: 'mission-commander',
    title: { en: 'EVA Mission Commander', ar: 'قائد مهمة فضائية' },
    description: {
      en: 'Successfully completed a full 5-phase Astronaut Mission Simulation with reserves intact.',
      ar: 'أتممت محاكاة مهمة رائد الفضاء ذات المراحل الخمس بنجاح.',
    },
    icon: '🚀',
  },
];
