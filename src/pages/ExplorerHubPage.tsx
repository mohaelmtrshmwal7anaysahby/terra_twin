import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Gamepad2,
  Globe,
  Images,
  Layers,
  RefreshCw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { ActionButton, ResilientImage, SurfacePanel } from '../components/DesignSystem';
import { PlanetaryGlobe3D } from '../components/PlanetaryGlobe3D';
import { TrackHeader } from '../components/TrackHeader';
import { useObservatory } from '../context/ObservatoryContext';
import {
  EARTH_SPACE_COMPARISONS,
  EXPLORER_AMAZING_FACTS,
  EXPLORER_TRIVIA_QUESTIONS,
} from '../data/experiencesData';
import { EARTH_ANALOG_SITES, HERO_ASSETS } from '../data/planetaryData';

type ExplorerTab = 'explore' | 'facts' | 'gallery' | 'games';
type GalleryFilter = 'all' | 'earth' | 'moon' | 'mars';

export const ExplorerHubPage: React.FC = () => {
  const {
    locale,
    isRTL,
    navigate,
    bestTriviaScore,
    updateBestTriviaScore,
    unlockAchievement,
  } = useObservatory();

  const [activeTab, setActiveTab] = useState<ExplorerTab>('explore');
  const [globeFocus, setGlobeFocus] = useState<'earth' | 'moon' | 'mars'>('earth');
  const [factIndex, setFactIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [lightboxItem, setLightboxItem] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);

  // Game 1: Guess the Twin World
  const [twinRound, setTwinRound] = useState(0);
  const [twinGuess, setTwinGuess] = useState<'moon' | 'mars' | 'both' | null>(null);
  const [twinScore, setTwinScore] = useState(0);

  // Game 2: Trivia Challenge
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaAnswer, setTriviaAnswer] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaCompleted, setTriviaCompleted] = useState(false);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const galleryItems = useMemo(() => {
    const items: { id: string; group: 'earth' | 'moon' | 'mars'; src: string; title: string; subtitle: string }[] = [
      {
        id: 'gal-earth',
        group: 'earth',
        src: HERO_ASSETS.earthOrbit,
        title: locale === 'ar' ? 'الأرض من المدار' : 'Earth Orbital Perspective',
        subtitle: locale === 'ar' ? 'مرصد النظائر الكوكبية' : 'TerraTwin Orbital Reference',
      },
      {
        id: 'gal-moon',
        group: 'moon',
        src: HERO_ASSETS.moonSurface,
        title: locale === 'ar' ? 'بحر السكون القمري' : 'Mare Tranquillitatis Basalt',
        subtitle: '0.674° N, 23.473° E',
      },
      {
        id: 'gal-mars',
        group: 'mars',
        src: HERO_ASSETS.marsSurface,
        title: locale === 'ar' ? 'حافة فوهة جيزيرو بالمريخ' : 'Jezero Crater Delta Ridge',
        subtitle: '18.380° N, 77.580° E',
      },
      ...EARTH_ANALOG_SITES.map((s) => ({
        id: `gal-${s.id}`,
        group: 'earth' as const,
        src: s.image,
        title: s.name[locale],
        subtitle: `${s.country[locale]} · ${s.coordinates.label}`,
      })),
    ];

    if (galleryFilter === 'all') return items;
    return items.filter((item) => item.group === galleryFilter);
  }, [galleryFilter, locale]);

  const currentTwinSite = EARTH_ANALOG_SITES[twinRound % EARTH_ANALOG_SITES.length];
  const currentTrivia = EXPLORER_TRIVIA_QUESTIONS[triviaIndex];

  const handleTwinAnswer = (choice: 'moon' | 'mars' | 'both') => {
    if (twinGuess !== null) return;
    setTwinGuess(choice);
    if (choice === currentTwinSite.primaryTwin) {
      setTwinScore((s) => s + 1);
      unlockAchievement('twin-matcher');
    }
  };

  const nextTwinRound = () => {
    setTwinGuess(null);
    setTwinRound((r) => (r + 1) % EARTH_ANALOG_SITES.length);
  };

  const handleTriviaOption = (idx: number) => {
    if (triviaAnswer !== null) return;
    setTriviaAnswer(idx);
    if (idx === currentTrivia.correctIndex) {
      const nextScore = triviaScore + 1;
      setTriviaScore(nextScore);
      updateBestTriviaScore(nextScore);
    }
  };

  const nextTriviaQuestion = () => {
    if (triviaIndex + 1 >= EXPLORER_TRIVIA_QUESTIONS.length) {
      setTriviaCompleted(true);
      unlockAchievement('twin-matcher');
    } else {
      setTriviaIndex((i) => i + 1);
      setTriviaAnswer(null);
    }
  };

  const restartTrivia = () => {
    setTriviaIndex(0);
    setTriviaAnswer(null);
    setTriviaScore(0);
    setTriviaCompleted(false);
  };

  const tabs: { id: ExplorerTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'explore',
      label: locale === 'ar' ? 'الاستكشاف والخرائط' : 'Explore & Maps',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'facts',
      label: locale === 'ar' ? 'هل تعلم؟ ومقارنات' : 'Did You Know? & Comparisons',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'gallery',
      label: locale === 'ar' ? 'معرض الصور' : 'Photo Gallery',
      icon: <Images className="w-4 h-4" />,
    },
    {
      id: 'games',
      label: locale === 'ar' ? 'الألعاب والتحديات' : 'Games & Challenges',
      icon: <Gamepad2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      <TrackHeader
        activeRole="explorer"
        accentColor="#2A9D9F"
        title={locale === 'ar' ? '🔭 مسار المستكشف' : '🔭 Explorer Discovery Hub'}
        subtitle={
          locale === 'ar'
            ? 'اكتشف تضاريس الأرض المذهلة وصلاتها بالقمر والمريخ عبر الخرائط التفاعلية والحقائق والمعارض والألعاب.'
            : 'Discover Earth’s extraordinary landscapes and their connections to the Moon and Mars through interactive maps, facts, galleries, and games.'
        }
      />

      {/* Internal Section Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#EEF2F6] dark:bg-[#05080F] border border-[#101B2B]/10 dark:border-white/[0.1] dark:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.95)] w-fit">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer min-h-[38px] ${
                active
                  ? 'bg-white dark:bg-[#0E1624] text-[#218385] dark:text-[#38D6D8] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                  : 'text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EARTH, MOON, MARS EXPLORATION + 3D GLOBE */}
      {activeTab === 'explore' && (
        <div className="space-y-10">
          {/* Interactive 3D Planetary Globe Stage */}
          <SurfacePanel className="overflow-hidden !bg-[#010205] text-[#F7F8FA]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 min-h-[380px] sm:min-h-[440px]">
                <PlanetaryGlobe3D
                  focus={globeFocus}
                  locale={locale}
                  onSelectAnalogSite={(id) => navigate('location', { locationId: id })}
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-s border-white/10">
                <div className="space-y-4">
                  <span className="text-xs font-mono-tabular text-[#D9C5A3]">
                    {locale === 'ar' ? 'مجسم كوكبي تفاعلي' : 'Interactive 3D Planetary Stage'}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F8FA]">
                    {locale === 'ar' ? 'تجوّل بين العوالم الثلاثة' : 'Orbit Across Three Worlds'}
                  </h2>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    {locale === 'ar'
                      ? 'اسحب الكوكب لتدويره أو انقر على أحد المسامير الأرضية السبع لفتح بيانات الموقع فورًا.'
                      : 'Drag to rotate the 3D scene, switch focal worlds below, or click any glowing station pin on Earth to open its field dossier.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(['earth', 'moon', 'mars'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setGlobeFocus(f)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          globeFocus === f
                            ? 'bg-[#2FD1D3] text-[#010205] font-semibold console-active-cyan'
                            : 'bg-[#060A12] text-[#CBD5E1] hover:text-white border border-white/[0.12]'
                        }`}
                      >
                        {f === 'earth'
                          ? locale === 'ar'
                            ? 'الأرض (7 محطات)'
                            : 'Earth (7 Stations)'
                          : f === 'moon'
                          ? locale === 'ar'
                            ? 'القمر'
                            : 'The Moon'
                          : locale === 'ar'
                          ? 'المريخ'
                          : 'Mars'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
                  <ActionButton variant="primary" size="sm" onClick={() => navigate('explorer')}>
                    <Globe className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'خريطة الأرض التفاعلية' : 'Interactive Earth Map'}</span>
                  </ActionButton>
                  <ActionButton variant="moon" size="sm" onClick={() => navigate('moon')}>
                    <span>{locale === 'ar' ? 'استكشف القمر' : 'Explore Moon'}</span>
                  </ActionButton>
                  <ActionButton variant="mars" size="sm" onClick={() => navigate('mars')}>
                    <span>{locale === 'ar' ? 'استكشف المريخ' : 'Explore Mars'}</span>
                  </ActionButton>
                </div>
              </div>
            </div>
          </SurfacePanel>

          {/* Direct Destination Exploration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SurfacePanel className="overflow-hidden flex flex-col justify-between">
              <ResilientImage src={HERO_ASSETS.earthOrbit} alt="Earth" aspectClassName="aspect-[16/9]" />
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar' ? 'استكشاف الأرض (7 مواقع)' : 'Earth Exploration (7 Sites)'}
                </h3>
                <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar'
                    ? 'افتح الخريطة الجغرافية التفاعلية لاستعراض صحراء أتاكاما وأنتاركتيكا وأيسلندا وهاواي.'
                    : 'Open the interactive world map to inspect Atacama, Antarctica Dry Valleys, Iceland, Hawaiʻi, and more.'}
                </p>
                <ActionButton variant="primary" onClick={() => navigate('explorer')}>
                  <span>{locale === 'ar' ? 'افتح خريطة الأرض' : 'Open Earth Map'}</span>
                  <ForwardArrow className="w-4 h-4" />
                </ActionButton>
              </div>
            </SurfacePanel>

            <SurfacePanel className="overflow-hidden flex flex-col justify-between">
              <ResilientImage src={HERO_ASSETS.moonSurface} alt="Moon" aspectClassName="aspect-[16/9]" />
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar' ? 'استكشاف القمر' : 'Moon Exploration'}
                </h3>
                <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar'
                    ? 'استعرض السهول البازلتية وفوهات الجليد القطبية مع مقاطع الارتفاعات LOLA.'
                    : 'Inspect basaltic lunar seas and permanently shadowed polar craters with LOLA elevation profiles.'}
                </p>
                <ActionButton variant="moon" onClick={() => navigate('moon')}>
                  <span>{locale === 'ar' ? 'ادخل أرشيف القمر' : 'Enter Moon Archive'}</span>
                  <ForwardArrow className="w-4 h-4" />
                </ActionButton>
              </div>
            </SurfacePanel>

            <SurfacePanel className="overflow-hidden flex flex-col justify-between">
              <ResilientImage src={HERO_ASSETS.marsSurface} alt="Mars" aspectClassName="aspect-[16/9]" />
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar' ? 'استكشاف المريخ' : 'Mars Exploration'}
                </h3>
                <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar'
                    ? 'تعرّف على دلتا فوهة جيزيرو وفوهة غيل وبيانات مهمة المثابرة.'
                    : 'Explore Jezero Crater’s ancient river delta, Gale Crater evaporites, and live NASA rover status.'}
                </p>
                <ActionButton variant="mars" onClick={() => navigate('mars')}>
                  <span>{locale === 'ar' ? 'ادخل أرشيف المريخ' : 'Enter Mars Archive'}</span>
                  <ForwardArrow className="w-4 h-4" />
                </ActionButton>
              </div>
            </SurfacePanel>
          </div>
        </div>
      )}

      {/* TAB 2: DID YOU KNOW?, AMAZING FACTS & EARTH-SPACE COMPARISONS */}
      {activeTab === 'facts' && (
        <div className="space-y-12">
          {/* Interactive Featured Fact Spotlight */}
          <SurfacePanel className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
                {EXPLORER_AMAZING_FACTS[factIndex].kicker[locale]} · {factIndex + 1} /{' '}
                {EXPLORER_AMAZING_FACTS.length}
              </span>
              <button
                type="button"
                onClick={() => setFactIndex((i) => (i + 1) % EXPLORER_AMAZING_FACTS.length)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/15 px-3 py-1.5 text-xs font-medium text-[#101B2B] dark:text-[#F7F8FA] hover:border-[#2A9D9F] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'المعلومة التالية' : 'Next Discovery'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {EXPLORER_AMAZING_FACTS[factIndex].headline[locale]}
                </h2>
                <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                  {EXPLORER_AMAZING_FACTS[factIndex].detail[locale]}
                </p>
              </div>
              <div className="lg:col-span-4 rounded-xl bg-[#EEF2F6] dark:bg-[#04070D] p-6 text-center space-y-1">
                <p className="font-display text-4xl font-semibold font-mono-tabular text-[#218385] dark:text-[#2A9D9F]" dir="ltr">
                  {EXPLORER_AMAZING_FACTS[factIndex].metricValue}
                </p>
                <p className="text-xs text-[#4A596C] dark:text-[#D9C5A3]">
                  {EXPLORER_AMAZING_FACTS[factIndex].metricUnit[locale]}
                </p>
              </div>
            </div>
          </SurfacePanel>

          {/* All Amazing Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPLORER_AMAZING_FACTS.map((fact, idx) => (
              <SurfacePanel key={fact.id} className="p-6 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
                    <span>{fact.kicker[locale]}</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {fact.headline[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                    {fact.detail[locale]}
                  </p>
                </div>
                {fact.linkedSiteId && (
                  <button
                    type="button"
                    onClick={() => navigate('location', { locationId: fact.linkedSiteId })}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#218385] dark:text-[#2A9D9F] hover:underline cursor-pointer w-fit"
                  >
                    <span>{locale === 'ar' ? 'استكشف الموقع المرتبط' : 'Inspect Linked Station'}</span>
                    <ForwardArrow className="w-3.5 h-3.5" />
                  </button>
                )}
              </SurfacePanel>
            ))}
          </div>

          {/* Earth & Space Comparisons */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {locale === 'ar' ? 'مقارنات الأرض والفضاء' : 'Earth & Space Comparisons'}
              </h2>
              <ActionButton variant="secondary" size="sm" onClick={() => navigate('compare')}>
                <Layers className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'مختبر المقارنة الكامل' : 'Open Full Comparison Lab'}</span>
              </ActionButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EARTH_SPACE_COMPARISONS.map((cmp) => (
                <SurfacePanel key={cmp.id} className="p-6 space-y-4">
                  <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {cmp.title[locale]}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-[#EEF2F6] dark:bg-[#04070D] p-3">
                      <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                        {cmp.earthLabel[locale]}
                      </span>
                      <span className="font-mono-tabular font-semibold text-[#218385] dark:text-[#2A9D9F] mt-1 block" dir="ltr">
                        {cmp.earthValue}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#EEF2F6] dark:bg-[#04070D] p-3">
                      <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                        {cmp.spaceLabel[locale]}
                      </span>
                      <span className="font-mono-tabular font-semibold text-[#B84A27] dark:text-[#D96B43] mt-1 block" dir="ltr">
                        {cmp.spaceValue}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                    {cmp.insight[locale]}
                  </p>
                </SurfacePanel>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PHOTO GALLERY WITH LIGHTBOX */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {locale === 'ar' ? 'معرض صور الأرض والقمر والمريخ' : 'Planetary & Analog Photo Gallery'}
            </h2>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EEF2F6] dark:bg-[#070B12] border border-[#101B2B]/10 dark:border-white/10">
              {(['all', 'earth', 'moon', 'mars'] as GalleryFilter[]).map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setGalleryFilter(flt)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    galleryFilter === flt
                      ? 'bg-white dark:bg-[#0E1624] text-[#218385] dark:text-[#38D6D8] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                      : 'text-[#4A596C] dark:text-[#A6B7CA]'
                  }`}
                >
                  {flt === 'all'
                    ? locale === 'ar'
                      ? 'الكل'
                      : 'All'
                    : flt === 'earth'
                    ? locale === 'ar'
                      ? 'الأرض'
                      : 'Earth'
                    : flt === 'moon'
                    ? locale === 'ar'
                      ? 'القمر'
                      : 'Moon'
                    : locale === 'ar'
                    ? 'المريخ'
                    : 'Mars'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxItem(item)}
                className="group text-start rounded-xl border border-[#101B2B]/12 dark:border-white/12 bg-white dark:bg-[#070B12] overflow-hidden cursor-pointer hover:border-[#2A9D9F] transition-colors"
              >
                <ResilientImage
                  src={item.src}
                  alt={item.title}
                  aspectClassName="aspect-[4/3]"
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="p-4 space-y-1">
                  <p className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {item.title}
                  </p>
                  <p className="text-xs font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {lightboxItem && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
              >
                <div
                  onClick={() => setLightboxItem(null)}
                  className="fixed inset-0 bg-black/88"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative z-10 w-full max-w-4xl rounded-xl border border-white/15 bg-[#05080E] overflow-hidden shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    aria-label="Close"
                    className="absolute top-3 end-3 z-20 p-2 rounded-lg bg-black/80 text-white hover:bg-[#2A9D9F] hover:text-[#020408] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[70vh] object-cover"
                  />
                  <div className="p-5 text-[#F7F8FA] flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{lightboxItem.title}</h3>
                    <span className="text-xs font-mono-tabular text-[#D9C5A3]">
                      {lightboxItem.subtitle}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* TAB 4: REAL PLAYABLE GAMES & CHALLENGES */}
      {activeTab === 'games' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Game 1: Guess the Twin World */}
          <SurfacePanel className="lg:col-span-6 p-6 space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-[#101B2B]/10 dark:border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
                  {locale === 'ar' ? 'تحدي 01' : 'Challenge 01'}
                </span>
                <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar' ? 'خمّن الكوكب التوأم' : 'Guess the Twin World'}
                </h2>
              </div>
              <span className="font-mono-tabular text-sm font-semibold text-[#218385] dark:text-[#2A9D9F]">
                {locale === 'ar' ? `النقاط: ${twinScore}` : `Score: ${twinScore}`}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#101B2B]/10 dark:border-white/10">
              <ResilientImage
                src={currentTwinSite.image}
                alt={currentTwinSite.name[locale]}
                aspectClassName="aspect-[16/9]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {currentTwinSite.name[locale]} ({currentTwinSite.country[locale]})
              </h3>
              <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                {currentTwinSite.researchFocus[locale]}
              </p>
              <p className="text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
                {locale === 'ar' ? 'متوسط الحرارة:' : 'Mean Temp:'}{' '}
                {currentTwinSite.metrics.meanTempC}°C ·{' '}
                {locale === 'ar' ? 'الارتفاع:' : 'Elevation:'} {currentTwinSite.metrics.elevationM}m
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(['moon', 'mars', 'both'] as const).map((opt) => {
                const isPicked = twinGuess === opt;
                const isCorrect = currentTwinSite.primaryTwin === opt;
                let cls =
                  'border-[#101B2B]/15 dark:border-white/15 bg-[#F7F8FA] dark:bg-[#04070D] text-[#101B2B] dark:text-[#F7F8FA] hover:border-[#2A9D9F]';
                if (twinGuess !== null) {
                  if (isCorrect) {
                    cls = 'border-[#10B981] bg-[#10B981]/15 text-[#065F46] dark:text-[#6EE7B7]';
                  } else if (isPicked) {
                    cls = 'border-[#B84A27] bg-[#B84A27]/15 text-[#B84A27] dark:text-[#E58464]';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleTwinAnswer(opt)}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${cls}`}
                  >
                    {tLabelTwin(opt, locale)}
                  </button>
                );
              })}
            </div>

            {twinGuess !== null && (
              <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#101B2B]/10 dark:border-white/10">
                <span className="text-xs font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                  {twinGuess === currentTwinSite.primaryTwin
                    ? locale === 'ar'
                      ? 'إجابة صحيحة!'
                      : 'Correct planetary match!'
                    : locale === 'ar'
                    ? `التطابق الأساسي هو: ${tLabelTwin(currentTwinSite.primaryTwin, locale)}`
                    : `Primary twin is: ${tLabelTwin(currentTwinSite.primaryTwin, locale)}`}
                </span>
                <ActionButton variant="primary" size="sm" onClick={nextTwinRound}>
                  <span>{locale === 'ar' ? 'الموقع التالي' : 'Next Site'}</span>
                  <ForwardArrow className="w-3.5 h-3.5" />
                </ActionButton>
              </div>
            )}
          </SurfacePanel>

          {/* Game 2: Planetary Trivia Challenge */}
          <SurfacePanel className="lg:col-span-6 p-6 space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-[#101B2B]/10 dark:border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
                  {locale === 'ar' ? 'تحدي 02' : 'Challenge 02'}
                </span>
                <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar' ? 'مسابقة الحقائق الكوكبية' : 'Planetary Trivia Challenge'}
                </h2>
              </div>
              <div className="text-end font-mono-tabular text-xs">
                <span className="text-[#218385] dark:text-[#2A9D9F] font-semibold block">
                  {triviaScore} / {EXPLORER_TRIVIA_QUESTIONS.length}
                </span>
                <span className="text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? `أفضل نتيجة: ${bestTriviaScore}` : `Best: ${bestTriviaScore}`}
                </span>
              </div>
            </div>

            {triviaCompleted ? (
              <div className="py-10 text-center space-y-4">
                <Trophy className="w-10 h-10 text-[#D9C5A3] mx-auto" />
                <h3 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar'
                    ? `أنهيت التحدي بنتيجة ${triviaScore} من ${EXPLORER_TRIVIA_QUESTIONS.length}`
                    : `Challenge Complete: ${triviaScore} / ${EXPLORER_TRIVIA_QUESTIONS.length}`}
                </h3>
                <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar'
                    ? 'تم حفظ أعلى نتيجة لك محليًا.'
                    : 'Your highest score is saved locally in this browser.'}
                </p>
                <ActionButton variant="primary" onClick={restartTrivia}>
                  <RefreshCw className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'العب مجددًا' : 'Play Again'}</span>
                </ActionButton>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
                  <span>{currentTrivia.topic[locale]}</span>
                  <span>
                    {triviaIndex + 1} / {EXPLORER_TRIVIA_QUESTIONS.length}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA] leading-snug">
                  {currentTrivia.question[locale]}
                </h3>

                <div className="space-y-2.5">
                  {currentTrivia.options.map((opt, idx) => {
                    const picked = triviaAnswer === idx;
                    const correct = currentTrivia.correctIndex === idx;
                    let cls =
                      'border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] text-[#101B2B] dark:text-[#F7F8FA] hover:border-[#2A9D9F]';
                    if (triviaAnswer !== null) {
                      if (correct) {
                        cls = 'border-[#10B981] bg-[#10B981]/15 text-[#065F46] dark:text-[#6EE7B7]';
                      } else if (picked) {
                        cls = 'border-[#B84A27] bg-[#B84A27]/15 text-[#B84A27] dark:text-[#E58464]';
                      }
                    }
                    return (
                      <button
                        key={opt.en}
                        type="button"
                        onClick={() => handleTriviaOption(idx)}
                        className={`w-full text-start rounded-lg border px-4 py-3 text-sm transition-colors cursor-pointer ${cls}`}
                      >
                        {opt[locale]}
                      </button>
                    );
                  })}
                </div>

                {triviaAnswer !== null && (
                  <div className="rounded-lg bg-[#EEF2F6] dark:bg-[#04070D] p-4 space-y-3">
                    <p className="text-xs sm:text-sm text-[#4A596C] dark:text-[#CBD5E1] leading-relaxed">
                      {currentTrivia.explanation[locale]}
                    </p>
                    <ActionButton variant="primary" size="sm" onClick={nextTriviaQuestion}>
                      <span>
                        {triviaIndex + 1 >= EXPLORER_TRIVIA_QUESTIONS.length
                          ? locale === 'ar'
                            ? 'عرض النتيجة'
                            : 'Finish Challenge'
                          : locale === 'ar'
                          ? 'السؤال التالي'
                          : 'Next Question'}
                      </span>
                      <ForwardArrow className="w-3.5 h-3.5" />
                    </ActionButton>
                  </div>
                )}
              </div>
            )}
          </SurfacePanel>
        </div>
      )}
    </div>
  );
};

function tLabelTwin(val: 'moon' | 'mars' | 'both', locale: 'en' | 'ar'): string {
  if (val === 'moon') return locale === 'ar' ? 'القمر' : 'Moon';
  if (val === 'mars') return locale === 'ar' ? 'المريخ' : 'Mars';
  return locale === 'ar' ? 'القمر والمريخ' : 'Moon & Mars';
}
