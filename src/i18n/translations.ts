import { ExperienceLevel, LocaleCode } from '../types/terratwin';

export interface LanguageCatalogEntry {
  code: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  active: boolean;
}

// Expandable 50-language architecture registry; English & Arabic active at launch
export const SUPPORTED_LANGUAGE_REGISTRY: LanguageCatalogEntry[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', active: true },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', active: true },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', active: false },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', active: false },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', active: false },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', active: false },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr', active: false },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr', active: false },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', active: false },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', active: false },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', dir: 'ltr', active: false },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', active: false },
];

export const EXPERIENCE_LEVEL_META: Record<
  ExperienceLevel,
  {
    en: { label: string; shortDesc: string };
    ar: { label: string; shortDesc: string };
  }
> = {
  explorer: {
    en: { label: 'Explorer', shortDesc: 'Visual stories & intuitive discovery' },
    ar: { label: 'مستكشف', shortDesc: 'سرد بصري واستكشاف مبسط' },
  },
  student: {
    en: { label: 'Student', shortDesc: 'Geological context & guided learning' },
    ar: { label: 'طالب', shortDesc: 'شروحات جيولوجية ومقارنات تعليمية' },
  },
  scientist: {
    en: { label: 'Scientist', shortDesc: 'Measurements, error bars & citations' },
    ar: { label: 'عالم', shortDesc: 'قياسات دقيقة ومصادر علمية محكمة' },
  },
  pioneer: {
    en: { label: 'Pioneer', shortDesc: 'Multi-parameter ISRU & mission analysis' },
    ar: { label: 'رائد', shortDesc: 'تحليل متقدم للموارد والعمليات الفضائية' },
  },
};

export const UI_TEXT: Record<
  LocaleCode,
  {
    brand: string;
    nav: {
      home: string;
      moon: string;
      mars: string;
      explorer: string;
      compare: string;
    };
    controls: {
      levelLabel: string;
      themeDark: string;
      themeLight: string;
      languageLabel: string;
      searchLanguagePlaceholder: string;
      languagesCountLabel: string;
      plannedLanguagesNote: string;
    };
    hero: {
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
      orbitFocusLabel: string;
      destinations: {
        earth: { label: string; distance: string; note: string };
        moon: { label: string; distance: string; note: string };
        mars: { label: string; distance: string; note: string };
      };
    };
    home: {
      scienceSectionTitle: string;
      scienceSectionSubtitle: string;
      levelAdapterNote: string;
      worldsTitle: string;
      worldsSubtitle: string;
      enterLunarArchive: string;
      enterMarsArchive: string;
      analogsStripTitle: string;
      analogsStripSubtitle: string;
      openObservatory: string;
      inspectSite: string;
      integrityTitle: string;
      integrityItems: { title: string; body: string }[];
    };
    moon: {
      title: string;
      subtitle: string;
      regionSwitchLabel: string;
      thermalTitle: string;
      terrainTitle: string;
      mineralsTitle: string;
      featuresTitle: string;
      linkedAnalogsTitle: string;
      compareThisRegion: string;
    };
    mars: {
      title: string;
      subtitle: string;
      regionSwitchLabel: string;
      thermalTitle: string;
      terrainTitle: string;
      mineralsTitle: string;
      featuresTitle: string;
      linkedAnalogsTitle: string;
      compareThisRegion: string;
      liveFeedTitle: string;
      roverLabel: string;
      solLabel: string;
      photosLabel: string;
      statusLabel: string;
      eonetTitle: string;
      liveNasaSource: string;
      cachedBaselineSource: string;
    };
    explorer: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      allCategories: string;
      allTargets: string;
      categories: Record<string, string>;
      targets: { moon: string; mars: string; both: string };
      sitesCount: string;
      emptyState: string;
      resetFilters: string;
      selectPrompt: string;
      openDossier: string;
      compareNow: string;
      keyMeasurements: string;
      coordinatesLabel: string;
      elevationLabel: string;
      meanTempLabel: string;
      waterIceLabel: string;
      missingTag: string;
      mapLayerLabel: string;
      mapLayers: { standard: string; satellite: string; topographic: string };
    };
    location: {
      backToExplorer: string;
      launchComparison: string;
      researchFocus: string;
      telemetryGrid: string;
      mineralogyTitle: string;
      thermalCurveTitle: string;
      featuresTitle: string;
      pioneerSectionTitle: string;
      sourcesTitle: string;
      missingDataTitle: string;
      albedoLabel: string;
      traceLabel: string;
      nullLabel: string;
      liveConditionsTitle: string;
      liveSourceOpenMeteo: string;
      liveUnavailable: string;
      loadingFeed: string;
      windSpeedLabel: string;
      humidityLabel: string;
      pressureLabel: string;
      observedLabel: string;
    };
    compare: {
      title: string;
      subtitle: string;
      selectEarthSite: string;
      selectPlanetaryTarget: string;
      similarityScoreTitle: string;
      axesVerifiedLabel: string;
      verifiedMethodology: string;
      methodologyModalTitle: string;
      methodologyBody: string;
      closeModal: string;
      scoreUnavailableTitle: string;
      radarTitle: string;
      thermalLineTitle: string;
      barChartTitle: string;
      nullIncompleteLabel: string;
      tableTitle: string;
      axisLabel: string;
      earthValueLabel: string;
      targetValueLabel: string;
      varianceLabel: string;
      qualityLabel: string;
      qualityNames: {
        verified: string;
        'orbital-estimate': string;
        incomplete: string;
      };
      geologyComparisonTitle: string;
      mineralComparisonTitle: string;
      similaritiesHeading: string;
      divergencesHeading: string;
      pioneerWeightsTitle: string;
      resetWeights: string;
      exportCsv: string;
      sourcesHeading: string;
      explorerModeNote: string;
      studentGlossaryTitle: string;
      glossaryTerms: { term: string; definition: string }[];
      axisNames: {
        thermal: string;
        elevation: string;
        slope: string;
        roughness: string;
        waterIce: string;
        mineralogy: string;
      };
    };
    footer: {
      tagline: string;
      copyright: string;
      methodologyNote: string;
      activeLanguagesLabel: string;
    };
  }
> = {
  en: {
    brand: 'TerraTwin',
    nav: {
      home: 'Overview',
      moon: 'Moon',
      mars: 'Mars',
      explorer: 'Earth Map',
      compare: 'Compare',
    },
    controls: {
      levelLabel: 'Level',
      themeDark: 'Dark mode',
      themeLight: 'Light mode',
      languageLabel: 'العربية',
      searchLanguagePlaceholder: 'Search 50 languages...',
      languagesCountLabel: '50 languages active',
      plannedLanguagesNote: 'Global multi-script i18n architecture',
    },
    hero: {
      headline: 'Two Worlds. One Earth. Endless Discoveries.',
      subheadline:
        "Explore Earth's extraordinary landscapes and uncover their connections to the Moon and Mars.",
      primaryCta: 'Start Exploring',
      secondaryCta: 'Discover the Science',
      orbitFocusLabel: 'Orbital Reference',
      destinations: {
        earth: {
          label: 'Earth Analogs',
          distance: '7 Verified Stations',
          note: 'Hyper-arid, polar, volcanic & impact terrains',
        },
        moon: {
          label: 'The Moon',
          distance: '384,400 km',
          note: 'Basaltic maria & south polar ice traps',
        },
        mars: {
          label: 'Mars',
          distance: '225M km avg',
          note: 'Ancient river deltas, clays & perchlorate plains',
        },
      },
    },
    home: {
      scienceSectionTitle: 'Why Earth Holds the Blueprint for Other Worlds',
      scienceSectionSubtitle:
        'Planetary analog science translates remote orbital spectra and rover telemetry into measurable terrestrial landscapes.',
      levelAdapterNote: 'Depth adapted for current experience level',
      worldsTitle: 'Planetary Destinations',
      worldsSubtitle:
        'Enter two distinct scientific environments—from airless lunar basalt seas to iron-rich Martian river deltas.',
      enterLunarArchive: 'Explore Lunar Environment',
      enterMarsArchive: 'Explore Martian Environment',
      analogsStripTitle: 'Seven Verified Earth Analog Stations',
      analogsStripSubtitle:
        'Field-validated landscapes bridging terrestrial geology with lunar and Martian surface missions.',
      openObservatory: 'Open Interactive Observatory',
      inspectSite: 'Inspect Dossier',
      integrityTitle: 'Scientific Data Integrity',
      integrityItems: [
        {
          title: 'Mission-Anchored Telemetry',
          body: 'Planetary baselines reference NASA LRO Diviner/LOLA, Mars 2020 Perseverance, MRO CRISM, and MSL Curiosity datasets.',
        },
        {
          title: 'Honest Null Preservation',
          body: 'Unverified or instrumentally incomparable fields remain explicitly null. Composite similarity scores are withheld when baselines are incomplete.',
        },
        {
          title: 'Four Analytical Depths',
          body: 'Switch seamlessly between Explorer, Student, Scientist, and Pioneer levels without altering underlying scientific values.',
        },
      ],
    },
    moon: {
      title: 'Lunar Surface Environments',
      subtitle:
        'Airless basaltic maria and cryogenic polar cold traps shaped by 4 billion years of impact gardening.',
      regionSwitchLabel: 'Select Lunar Province',
      thermalTitle: 'Diurnal Thermal Excursion (°C)',
      terrainTitle: 'LOLA Orbital Elevation Transect (m)',
      mineralsTitle: 'Bulk Regolith Mineralogy',
      featuresTitle: 'Key Surface Geomorphology',
      linkedAnalogsTitle: 'Corresponding Earth Analogs',
      compareThisRegion: 'Compare Lunar Province',
    },
    mars: {
      title: 'Martian Geological Environments',
      subtitle:
        'Rust-toned sedimentary deltas, sulfate evaporites, and basaltic plains preserving an ancient wet epoch.',
      regionSwitchLabel: 'Select Martian Basin',
      thermalTitle: 'Sol Diurnal Thermal Cycle (°C)',
      terrainTitle: 'MOLA Stratigraphic Terrain Profile (m)',
      mineralsTitle: 'Measured Mineral Assemblage',
      featuresTitle: 'Stratigraphic & Surface Signatures',
      linkedAnalogsTitle: 'Corresponding Earth Analogs',
      compareThisRegion: 'Compare Martian Basin',
      liveFeedTitle: 'Live Mission & Earth Telemetry',
      roverLabel: 'Perseverance Rover',
      solLabel: 'Max Sol',
      photosLabel: 'Mission Photos',
      statusLabel: 'Status',
      eonetTitle: 'Recent NASA EONET Earth Events',
      liveNasaSource: 'Live NASA API',
      cachedBaselineSource: 'Baseline Cached (Live Unavailable)',
    },
    explorer: {
      title: 'Earth Analog Observatory',
      subtitle: 'Select a terrestrial field station to inspect planetary correspondence and measurements.',
      searchPlaceholder: 'Search sites, minerals, or regions...',
      allCategories: 'All Environments',
      allTargets: 'All Targets',
      categories: {
        'hyper-arid': 'Hyper-Arid',
        'polar-cryogenic': 'Polar & Cryogenic',
        'volcanic-basalt': 'Volcanic Basalt',
        'impact-crater': 'Impact Crater',
        'evaporite-playa': 'Evaporite Playa',
      },
      targets: { moon: 'Moon', mars: 'Mars', both: 'Moon & Mars' },
      sitesCount: 'stations visible',
      emptyState: 'No analog stations match your active filters.',
      resetFilters: 'Reset Filters',
      selectPrompt: 'Select a marker on the map or choose a station to inspect telemetry.',
      openDossier: 'Full Site Dossier',
      compareNow: 'Compare with Planet',
      keyMeasurements: 'Verified Measurements',
      coordinatesLabel: 'Coordinates',
      elevationLabel: 'Elevation',
      meanTempLabel: 'Mean Temp',
      waterIceLabel: 'Water / Ice',
      missingTag: 'Partial null data',
      mapLayerLabel: 'Map Layer',
      mapLayers: {
        standard: 'Observatory',
        satellite: 'Satellite',
        topographic: 'Topographic',
      },
    },
    location: {
      backToExplorer: 'Back to Observatory',
      launchComparison: 'Launch Scientific Comparison',
      researchFocus: 'Primary Research Focus',
      telemetryGrid: 'Field Measurements',
      mineralogyTitle: 'Mineralogical Composition',
      thermalCurveTitle: '24-Hour Surface Thermal Envelope',
      featuresTitle: 'Diagnostic Geological Features',
      pioneerSectionTitle: 'Engineering & ISRU Mission Assessment',
      sourcesTitle: 'Primary Literature & Agency Sources',
      missingDataTitle: 'Missing Data Disclosure',
      albedoLabel: 'Surface Albedo',
      traceLabel: 'Trace',
      nullLabel: 'Null',
      liveConditionsTitle: 'Live Station Conditions',
      liveSourceOpenMeteo: 'Open-Meteo Live Feed',
      liveUnavailable: 'Live meteorological feed unavailable',
      loadingFeed: 'Querying live station telemetry...',
      windSpeedLabel: 'Wind Speed',
      humidityLabel: 'Rel. Humidity',
      pressureLabel: 'Surface Pressure',
      observedLabel: 'Observed',
    },
    compare: {
      title: 'Scientific Comparison Studio',
      subtitle: 'Cross-planetary quantitative alignment across thermal, topographic, hydrological, and mineralogical axes.',
      selectEarthSite: 'Earth Analog Station',
      selectPlanetaryTarget: 'Planetary Reference Region',
      similarityScoreTitle: 'Composite Analog Similarity',
      axesVerifiedLabel: 'axes verified',
      verifiedMethodology: 'Methodology & Weights',
      methodologyModalTitle: 'Similarity Scoring Methodology',
      methodologyBody:
        'TerraTwin computes similarity across six independent physical axes: Mean Temperature (scale 120 °C), Elevation Datum (7,000 m), Regional Slope (15°), 1-m RMS Roughness (12°), Water/Ice Inventory (6.5 wt%), and Shared Mineralogical Classes. If any critical baseline parameter is null or unverified, the composite score is intentionally withheld to preserve scientific rigor.',
      closeModal: 'Close',
      scoreUnavailableTitle: 'Composite Score Withheld — Incomplete Baseline',
      radarTitle: 'Multi-Axis Normalization Radar',
      thermalLineTitle: 'Diurnal Thermal Profile Comparison (°C)',
      barChartTitle: 'Normalized Axis Alignment (%)',
      nullIncompleteLabel: 'Null / Incomplete',
      tableTitle: 'Precision Parameter Matrix',
      axisLabel: 'Parameter',
      earthValueLabel: 'Earth Station',
      targetValueLabel: 'Planetary Target',
      varianceLabel: 'Delta (Δ)',
      qualityLabel: 'Data Quality',
      qualityNames: {
        verified: 'Verified',
        'orbital-estimate': 'Orbital Est.',
        incomplete: 'Null / Missing',
      },
      geologyComparisonTitle: 'Side-by-Side Geological Features',
      mineralComparisonTitle: 'Mineralogical Assemblage Comparison',
      similaritiesHeading: 'Verified Similarities',
      divergencesHeading: 'Critical Planetary Divergences',
      pioneerWeightsTitle: 'Pioneer Custom Axis Weighting',
      resetWeights: 'Reset Weights',
      exportCsv: 'Export CSV',
      sourcesHeading: 'Referenced Datasets & Publications',
      explorerModeNote: 'Explorer visual view active — switch to Scientist or Pioneer in the top bar for full statistical matrices and custom axis weights.',
      studentGlossaryTitle: 'Scientific Reference Glossary',
      glossaryTerms: [
        { term: 'LOLA / MOLA', definition: 'Laser altimeters aboard Moon (LRO) and Mars (MGS) orbiters measuring planetary elevation.' },
        { term: 'RMS Roughness', definition: 'Root-mean-square slope variation at 1-meter baseline indicating boulder and micro-terrain hazard.' },
        { term: 'wt%', definition: 'Weight percent of water or mineral phase within bulk regolith or rock.' },
        { term: 'ISRU', definition: 'In-Situ Resource Utilization — producing oxygen, water, or construction materials locally.' },
      ],
      axisNames: {
        thermal: 'Mean Temp',
        elevation: 'Elevation',
        slope: 'Slope',
        roughness: 'Roughness',
        waterIce: 'Water / Ice',
        mineralogy: 'Mineralogy',
      },
    },
    footer: {
      tagline: 'Explore Earth. Understand Other Worlds.',
      copyright: '© 2026 TerraTwin Planetary Analog Observatory',
      methodologyNote: 'Scientific measurements remain invariant across languages and experience levels.',
      activeLanguagesLabel: 'active / 50 target languages',
    },
  },
  ar: {
    brand: 'تيرا توين',
    nav: {
      home: 'الرئيسية',
      moon: 'القمر',
      mars: 'المريخ',
      explorer: 'خريطة الأرض',
      compare: 'المقارنة',
    },
    controls: {
      levelLabel: 'المستوى',
      themeDark: 'الوضع الداكن',
      themeLight: 'الوضع الفاتح',
      languageLabel: 'English',
      searchLanguagePlaceholder: 'ابحث بين 50 لغة...',
      languagesCountLabel: '50 لغة متاحة',
      plannedLanguagesNote: 'بنية لغوية متعددة الاتجاهات (50 لغة)',
    },
    hero: {
      headline: 'عالمان. أرض واحدة. اكتشافات لا تنتهي.',
      subheadline:
        'استكشف تضاريس الأرض الاستثنائية واكتشف الروابط العلمية التي تجمعها بالقمر والمريخ.',
      primaryCta: 'ابدأ الاستكشاف',
      secondaryCta: 'اكتشف العلم',
      orbitFocusLabel: 'المرجع المداري',
      destinations: {
        earth: {
          label: 'نظائر الأرض',
          distance: '7 محطات موثقة',
          note: 'بيئات جافة وقطبية وبركانية وفوهات تصادمية',
        },
        moon: {
          label: 'القمر',
          distance: '384,400 كم',
          note: 'البحار البازلتية ومصائد الجليد القطبية',
        },
        mars: {
          label: 'المريخ',
          distance: '225 مليون كم',
          note: 'دلتا الأنهار القديمة والطين والبيركلورات',
        },
      },
    },
    home: {
      scienceSectionTitle: 'لماذا تحمل الأرض مفاتيح فهم الكواكب الأخرى',
      scienceSectionSubtitle:
        'يحول علم النظائر الكوكبية القياسات المدارية وبيانات المركبات إلى مواقع أرضية قابلة للدراسة المباشرة.',
      levelAdapterNote: 'تم تكييف عمق الشرح حسب مستواك الحالي',
      worldsTitle: 'الوجهات الكوكبية',
      worldsSubtitle:
        'ادخل إلى بيئتين علميتين متمايزتين—من البحار البازلتية القمرية الخالية من الهواء إلى دلتا المريخ الغنية بالحديد.',
      enterLunarArchive: 'استكشف بيئة القمر',
      enterMarsArchive: 'استكشف بيئة المريخ',
      analogsStripTitle: 'سبع محطات نظائر أرضية موثقة',
      analogsStripSubtitle:
        'مواقع ميدانية موثقة تربط جيولوجيا الأرض بمهمات استكشاف القمر والمريخ.',
      openObservatory: 'افتح المرصد التفاعلي',
      inspectSite: 'عرض الملف العلمي',
      integrityTitle: 'نزاهة البيانات العلمية',
      integrityItems: [
        {
          title: 'بيانات مستندة إلى المهمات الفضائية',
          body: 'تعتمد المعايير الكوكبية على بيانات مستكشف القمر LRO ومركبتي المثابرة وكيوريوسيتي على المريخ.',
        },
        {
          title: 'الشفافية في البيانات المفقودة',
          body: 'تُحفظ الحقول غير الموثقة كقيم فارغة بوضوح، وتُحجب درجة التشابه المركبة عند نقص المعايير الأساسية.',
        },
        {
          title: 'أربعة مستويات معرفية',
          body: 'بدّل بسلاسة بين المستكشف والطالب والعالم والرائد دون تغيير القيم العلمية الحقيقية.',
        },
      ],
    },
    moon: {
      title: 'بيئات سطح القمر',
      subtitle: 'سهول بازلتية خالية من الغلاف الجوي ومصائد جليد قطبية تشكلت عبر 4 مليارات سنة.',
      regionSwitchLabel: 'اختر الإقليم القمري',
      thermalTitle: 'التباين الحراري اليومي (°م)',
      terrainTitle: 'مقطع الارتفاعات المداري LOLA (متر)',
      mineralsTitle: 'التركيب المعدني للتربة القمرية',
      featuresTitle: 'السمات الجيومورفولوجية الرئيسية',
      linkedAnalogsTitle: 'النظائر الأرضية المقابلة',
      compareThisRegion: 'قارن هذا الإقليم القمري',
    },
    mars: {
      title: 'البيئات الجيولوجية للمريخ',
      subtitle: 'دلتا رسوبية صدئة ومتبخرات كبريتية وسهول بازلتية تحفظ أثر عصر مائي قديم.',
      regionSwitchLabel: 'اختر الحوض المريخي',
      thermalTitle: 'الدورة الحرارية اليومية للمريخ (°م)',
      terrainTitle: 'مقطع التضاريس الطبقي MOLA (متر)',
      mineralsTitle: 'التجمع المعدني المقاس',
      featuresTitle: 'البصمات الطبقية والسطحية',
      linkedAnalogsTitle: 'النظائر الأرضية المقابلة',
      compareThisRegion: 'قارن هذا الحوض المريخي',
      liveFeedTitle: 'بيانات المهمة والأرض الحية (NASA)',
      roverLabel: 'مركبة المثابرة (Perseverance)',
      solLabel: 'أحدث يوم مريخي (Sol)',
      photosLabel: 'إجمالي الصور',
      statusLabel: 'الحالة',
      eonetTitle: 'أحدث أحداث رصد الأرض (NASA EONET)',
      liveNasaSource: 'بث NASA الحي',
      cachedBaselineSource: 'مرجع أساسي (البث الحي غير متاح)',
    },
    explorer: {
      title: 'مرصد النظائر الأرضية',
      subtitle: 'اختر محطة أرضية لمعاينة تطابقها الكوكبي وقياسات التضاريس والمعادن.',
      searchPlaceholder: 'ابحث بالاسم أو المعدن أو الإقليم...',
      allCategories: 'كل البيئات',
      allTargets: 'كل الأهداف',
      categories: {
        'hyper-arid': 'صحراء شديدة الجفاف',
        'polar-cryogenic': 'قطبية ومبردة',
        'volcanic-basalt': 'بازلت بركاني',
        'impact-crater': 'فوهة تصادمية',
        'evaporite-playa': 'سبخة متبخرات',
      },
      targets: { moon: 'القمر', mars: 'المريخ', both: 'القمر والمريخ' },
      sitesCount: 'محطات معروضة',
      emptyState: 'لا توجد محطات تطابق عوامل التصفية الحالية.',
      resetFilters: 'إعادة ضبط المرشحات',
      selectPrompt: 'اختر نقطة على الخريطة أو من القائمة لعرض القياسات العلمية.',
      openDossier: 'الملف العلمي الكامل',
      compareNow: 'قارن مع الكوكب',
      keyMeasurements: 'القياسات الموثقة',
      coordinatesLabel: 'الإحداثيات',
      elevationLabel: 'الارتفاع',
      meanTempLabel: 'متوسط الحرارة',
      waterIceLabel: 'الماء / الجليد',
      missingTag: 'بيانات ناقصة جزئيًا',
      mapLayerLabel: 'طبقة الخريطة',
      mapLayers: {
        standard: 'المرصد',
        satellite: 'أقمار صناعية',
        topographic: 'طبوغرافية',
      },
    },
    location: {
      backToExplorer: 'العودة إلى المرصد',
      launchComparison: 'بدء المقارنة العلمية',
      researchFocus: 'محور البحث الرئيسي',
      telemetryGrid: 'القياسات الميدانية',
      mineralogyTitle: 'التركيب المعدني',
      thermalCurveTitle: 'المنحنى الحراري السطحي خلال 24 ساعة',
      featuresTitle: 'الخصائص الجيولوجية المميزة',
      pioneerSectionTitle: 'تقييم الهندسة والموارد الفضائية (ISRU)',
      sourcesTitle: 'المصادر والمراجع العلمية',
      missingDataTitle: 'إفصاح عن البيانات المفقودة',
      albedoLabel: 'البياض السطحي (Albedo)',
      traceLabel: 'آثار ضئيلة',
      nullLabel: 'غير متوفر',
      liveConditionsTitle: 'الطقس الميداني الحي بالمحطة',
      liveSourceOpenMeteo: 'بث Open-Meteo الحي',
      liveUnavailable: 'تعذر جلب البث الجوي الحي حاليًا',
      loadingFeed: 'جارٍ جلب القياسات الجوية الحية...',
      windSpeedLabel: 'سرعة الرياح',
      humidityLabel: 'الرطوبة النسبية',
      pressureLabel: 'الضغط السطحي',
      observedLabel: 'وقت الرصد',
    },
    compare: {
      title: 'مختبر المقارنة العلمية',
      subtitle: 'مقارنة كمية دقيقة عبر محاور الحرارة والارتفاع والانحدار والخشونة والماء والمعادن.',
      selectEarthSite: 'محطة النظير الأرضي',
      selectPlanetaryTarget: 'الهدف الكوكبي المرجعي',
      similarityScoreTitle: 'نسبة التشابه الكوكبي المركبة',
      axesVerifiedLabel: 'محاور موثقة',
      verifiedMethodology: 'المنهجية والأوزان',
      methodologyModalTitle: 'منهجية حساب نسبة التشابه',
      methodologyBody:
        'تحسب منصة تيرا توين التشابه عبر ستة محاور فيزيائية مستقلة: متوسط الحرارة (نطاق 120°م)، مستوى الارتفاع (7,000 م)، الانحدار الإقليمي (15°)، خشونة السطح بالليدار عند 1 متر (12°)، مخزون الماء/الجليد (6.5%)، وتطابق الفئات المعدنية. وفي حال وجود قيمة مفقودة أو غير موثقة في أي محور أساسي، يتم حجب النتيجة المركبة حفاظًا على الدقة العلمية.',
      closeModal: 'إغلاق',
      scoreUnavailableTitle: 'تم حجب النتيجة — بيانات مرجعية غير مكتملة',
      radarTitle: 'مخطط الرادار متعدد المحاور',
      thermalLineTitle: 'مقارنة الدورة الحرارية اليومية (°م)',
      barChartTitle: 'محاذاة المحاور المعيارية (%)',
      nullIncompleteLabel: 'غير متوفر / ناقص',
      tableTitle: 'مصفوفة القياسات العلمية',
      axisLabel: 'المعيار',
      earthValueLabel: 'المحطة الأرضية',
      targetValueLabel: 'الهدف الكوكبي',
      varianceLabel: 'الفارق (Δ)',
      qualityLabel: 'جودة البيانات',
      qualityNames: {
        verified: 'موثق',
        'orbital-estimate': 'تقدير مداري',
        incomplete: 'بيانات ناقصة',
      },
      geologyComparisonTitle: 'مقارنة السمات الجيولوجية جنبًا إلى جنب',
      mineralComparisonTitle: 'مقارنة التركيب المعدني',
      similaritiesHeading: 'أوجه التشابه الموثقة',
      divergencesHeading: 'الاختلافات الكوكبية الجوهرية',
      pioneerWeightsTitle: 'تخصيص أوزان المحاور (مستوى الرائد)',
      resetWeights: 'إعادة ضبط الأوزان',
      exportCsv: 'تصدير CSV',
      sourcesHeading: 'المصادر والأبحاث المعتمدة',
      explorerModeNote: 'وضع المستكشف البصري نشط — يمكنك التبديل إلى مستوى العالم أو الرائد من الشريط العلوي لعرض المصفوفات الإحصائية الكاملة.',
      studentGlossaryTitle: 'دليل المصطلحات العلمية',
      glossaryTerms: [
        { term: 'LOLA / MOLA', definition: 'أجهزة قياس الارتفاع بالليزر على متن مدارات القمر والمريخ لرسم خرائط التضاريس.' },
        { term: 'RMS خشونة', definition: 'انحراف الميل الجذري المتوسط عند خط أساس 1 متر لقياس وعورة الصخور للمركبات.' },
        { term: 'wt%', definition: 'النسبة المئوية الوزنية للماء أو المعدن داخل التربة أو الصخر.' },
        { term: 'ISRU', definition: 'استخدام الموارد الموضعية — إنتاج الأكسجين والماء ومواد البناء من تربة الكوكب.' },
      ],
      axisNames: {
        thermal: 'الحرارة',
        elevation: 'الارتفاع',
        slope: 'الانحدار',
        roughness: 'الخشونة',
        waterIce: 'الماء/الجليد',
        mineralogy: 'المعادن',
      },
    },
    footer: {
      tagline: 'استكشف الأرض. افهم العوالم الأخرى.',
      copyright: '© 2026 مرصد تيرا توين للنظائر الكوكبية',
      methodologyNote: 'تبقى القيم والقياسات العلمية ثابتة عند تغيير اللغة أو مستوى التجربة.',
      activeLanguagesLabel: 'نشطة / 50 لغة مستهدفة',
    },
  },
};
