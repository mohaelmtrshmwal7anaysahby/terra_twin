import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Globe, Image as ImageIcon, Layers } from 'lucide-react';
import { ActionButton, ResilientImage } from '../components/DesignSystem';
import { PlanetaryGlobe3D } from '../components/PlanetaryGlobe3D';
import { useObservatory } from '../context/ObservatoryContext';
import { EARTH_ANALOG_SITES, HERO_ASSETS, PLANETARY_REGIONS } from '../data/planetaryData';
import { EXPERIENCE_LEVEL_META } from '../i18n/translations';
import { ExperienceLevel } from '../types/terratwin';

type HeroFocus = 'earth' | 'moon' | 'mars';
type HeroViewMode = '3d' | 'imagery';

export const HomePage: React.FC = () => {
  const { locale, isRTL, level, setLevel, navigate, t } = useObservatory();
  const [heroFocus, setHeroFocus] = useState<HeroFocus>('earth');
  const [heroViewMode, setHeroViewMode] = useState<HeroViewMode>('3d');
  const [hoveredAnalogId, setHoveredAnalogId] = useState<string>(EARTH_ANALOG_SITES[0].id);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const orbitParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const activeHeroImage =
    heroFocus === 'earth'
      ? HERO_ASSETS.earthOrbit
      : heroFocus === 'moon'
      ? HERO_ASSETS.moonSurface
      : HERO_ASSETS.marsSurface;

  const activeSpotlightSite =
    EARTH_ANALOG_SITES.find((s) => s.id === hoveredAnalogId) ?? EARTH_ANALOG_SITES[0];

  const scrollToScience = () => {
    const el = document.getElementById('discover-science');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const levelNarrative: Record<ExperienceLevel, { en: string; ar: string }> = {
    explorer: {
      en: 'Before sending rovers or astronauts across millions of kilometers, planetary scientists study extreme places right here on Earth—dry deserts, polar craters, and dark volcanic fields that mirror the Moon and Mars.',
      ar: 'قبل إرسال المركبات الفضائية ورواد الفضاء عبر ملايين الكيلومترات، يدرس العلماء بيئات متطرفة هنا على الأرض—كالصحارى القاحلة والفوهات القطبية وحقول الحمم الداكنة التي تحاكي القمر والمريخ.',
    },
    student: {
      en: 'Planetary analog geology works by comparing physical processes: where liquid water vanished, salts like sulfates and perchlorates remain; where basalt lava cools rapidly under ice or thin air, glassy mineral grains preserve ancient planetary climates.',
      ar: 'تعتمد جيولوجيا النظائر الكوكبية على مقارنة العمليات الفيزيائية: حيث يتبخر الماء تبقى أملاح الكبريتات والبيركلورات، وحيث تبرد حمم البازلت تحت الجليد تحفظ المعادن الزجاجية تاريخ المناخ الكوكبي.',
    },
    scientist: {
      en: 'Cross-planetary calibration pairs orbital hyperspectral reflectance (MRO CRISM, LRO Diviner) and laser altimetry (MOLA, LOLA) with ground-truth terrestrial XRD mineralogy, LiDAR 1-m RMS roughness, and perchlorate/cryobrine geochemistry.',
      ar: 'تجمع المعايرة الكوكبية بين التحليل الطيفي المداري (CRISM وDiviner) وقياس الارتفاع بالليزر مع بيانات حيود الأشعة السينية الأرضية وخشونة الليدار عند خط أساس 1 متر.',
    },
    pioneer: {
      en: 'Terrestrial analogs de-risk Artemis and Mars surface architectures: validating regolith microwave sintering, oxygen extraction from ilmenite, dust-abrasion seals, and autonomous hazard-avoidance navigation across steep crater slopes.',
      ar: 'تخفض النظائر الأرضية مخاطر مهمات أرتميس والمريخ عبر اختبار تلبيد التربة القمرية واستخلاص الأكسجين من الإيلمنيت وموانع تسرب الغبار والملاحة الذاتية على المنحدرات.',
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. SIGNATURE CINEMATIC PLANETARY HERO */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[calc(100vh-4rem)] flex items-end bg-[#010205] text-[#F5F7FA] overflow-hidden border-b border-white/[0.08]"
      >
        {/* Background: Interactive 3D Planetary Globe OR High-Res Orbital Imagery */}
        {heroViewMode === '3d' ? (
          <div className="absolute inset-0 z-0">
            <PlanetaryGlobe3D
              focus={heroFocus}
              locale={locale}
              onSelectAnalogSite={(siteId) => navigate('location', { locationId: siteId })}
            />
          </div>
        ) : (
          <motion.div
            key={heroFocus}
            style={{ y: bgParallaxY }}
            initial={{ opacity: 1, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1.01 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 will-change-transform pointer-events-none"
          >
            <img
              src={activeHeroImage}
              alt={t.hero.destinations[heroFocus].label}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        )}

        {/* Measured Contrast Scrim for 4.5:1+ Legibility (pointer-events-none so 3D globe stays interactive) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010205] via-[#010205]/45 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#010205]/92 via-[#010205]/35 to-transparent rtl:bg-gradient-to-l"
          aria-hidden="true"
        />

        {/* Delicate Orbital Trajectory SVG Layer with Parallax */}
        <motion.svg
          style={{ y: orbitParallaxY }}
          viewBox="0 0 1440 760"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-25 will-change-transform"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <ellipse
            cx="980"
            cy="340"
            rx="560"
            ry="230"
            transform="rotate(-14 980 340)"
            fill="none"
            stroke="#D9C5A3"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <ellipse
            cx="980"
            cy="340"
            rx="380"
            ry="150"
            transform="rotate(-14 980 340)"
            fill="none"
            stroke="#2A9D9F"
            strokeWidth="0.85"
          />
        </motion.svg>

        {/* Top-End Hero Mode Switcher (3D Interactive WebGL vs Orbital Imagery) */}
        <div className="absolute top-5 end-4 sm:end-6 lg:end-10 z-20 flex items-center gap-1 rounded-lg border border-white/[0.12] bg-[#020409]/95 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          <button
            type="button"
            onClick={() => setHeroViewMode('3d')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              heroViewMode === '3d'
                ? 'bg-[#2FD1D3] text-[#010205] font-semibold console-active-cyan'
                : 'text-[#CBD5E1] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'مجسم ثلاثي الأبعاد' : '3D Observatory'}</span>
          </button>
          <button
            type="button"
            onClick={() => setHeroViewMode('imagery')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              heroViewMode === 'imagery'
                ? 'bg-[#2FD1D3] text-[#010205] font-semibold console-active-cyan'
                : 'text-[#CBD5E1] hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'صور مدارية' : 'Orbital Imagery'}</span>
          </button>
        </div>

        {/* Hero Foreground Editorial Grid (pointer-events-none outer shell so canvas drag works smoothly) */}
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            {/* Left Primary Narrative */}
            <div className="pointer-events-auto lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#D9C5A3]">
                <span>{t.hero.orbitFocusLabel}</span>
                <span aria-hidden="true">·</span>
                <span dir="ltr">
                  {heroFocus === 'earth'
                    ? '0.00° N, 0.00° E'
                    : heroFocus === 'moon'
                    ? PLANETARY_REGIONS['moon-mare'].coordinatesLabel
                    : PLANETARY_REGIONS['mars-jezero'].coordinatesLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.destinations[heroFocus].distance}</span>
                {heroViewMode === '3d' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#2A9D9F]">
                      {locale === 'ar'
                        ? 'اسحب للتدوير · انقر المحطات'
                        : 'Drag to orbit · Click Earth pins'}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-[#F5F7FA] text-balance max-w-2xl">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#B8C6D8] leading-relaxed max-w-xl">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <ActionButton variant="primary" size="lg" onClick={() => navigate('explorer')}>
                  <span>{t.hero.primaryCta}</span>
                  <ForwardArrow className="w-4 h-4" />
                </ActionButton>
                <ActionButton
                  variant="secondary"
                  size="lg"
                  onClick={scrollToScience}
                  className="!bg-[#090E17]/95 !text-[#F5F7FA] !border-white/20 hover:!bg-[#111928]"
                >
                  <span>{t.hero.secondaryCta}</span>
                </ActionButton>
              </div>
            </div>

            {/* Right Interactive Destination Selector (No backdrop-blur over WebGL canvas) */}
            <div className="pointer-events-auto lg:col-span-5">
              <div className="rounded-xl border border-white/[0.12] bg-[#020409]/95 p-2 space-y-1 shadow-[0_36px_90px_rgba(0,0,0,0.98),0_0_40px_-18px_rgba(47,209,211,0.22)]">
                {(['earth', 'moon', 'mars'] as HeroFocus[]).map((dest) => {
                  const active = heroFocus === dest;
                  const meta = t.hero.destinations[dest];
                  return (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setHeroFocus(dest)}
                      className={`w-full text-start rounded-lg px-4 py-3 transition-all duration-150 cursor-pointer flex items-center justify-between gap-4 ${
                        active
                          ? 'bg-[#080E18] border border-[#2FD1D3]/75 console-active-cyan'
                          : 'border border-transparent hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-semibold text-[#F5F7FA]">
                            {meta.label}
                          </span>
                          <span className="text-xs font-mono-tabular text-[#D9C5A3]" dir="ltr">
                            {meta.distance}
                          </span>
                        </div>
                        <p className="text-xs text-[#8FA1B6] mt-0.5 truncate">{meta.note}</p>
                      </div>
                      {active && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(dest === 'earth' ? 'explorer' : dest);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#2A9D9F] hover:text-white shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC EDITORIAL SCIENCE THESIS + ADAPTIVE LEVEL PREVIEW */}
      <section
        id="discover-science"
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28 border-b border-[#101B2B]/10 dark:border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
              01 · {t.home.levelAdapterNote}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA] text-balance">
              {t.home.scienceSectionTitle}
            </h2>
            <p className="text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
              {t.home.scienceSectionSubtitle}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {/* Experience Level Segmented Switcher */}
            <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-[#EEF2F6] dark:bg-[#05080F] border border-[#101B2B]/10 dark:border-white/[0.1] dark:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.95)] w-fit">
              {(['explorer', 'student', 'scientist', 'pioneer'] as ExperienceLevel[]).map((lvl) => {
                const active = level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-[#0E1624] text-[#101B2B] dark:text-[#F5F7FA] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                        : 'text-[#4A596C] dark:text-[#8FA1B6] hover:text-[#101B2B] dark:hover:text-[#F5F7FA]'
                    }`}
                  >
                    {EXPERIENCE_LEVEL_META[lvl][locale].label}
                  </button>
                );
              })}
            </div>

            <motion.p
              key={level}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="text-lg sm:text-xl leading-relaxed text-[#101B2B] dark:text-[#F7F8FA] font-normal"
            >
              {levelNarrative[level][locale]}
            </motion.p>

            {/* Clean quantitative planetary baseline strip (no boxed cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#101B2B]/10 dark:border-white/10">
              <div>
                <span className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'المحطات الأرضية' : 'Analog Stations'}
                </span>
                <p className="text-2xl font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA] mt-1">
                  07
                </p>
              </div>
              <div>
                <span className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'الأقاليم الكوكبية' : 'Planetary Baselines'}
                </span>
                <p className="text-2xl font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA] mt-1">
                  04
                </p>
              </div>
              <div>
                <span className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'محاور القياس' : 'Physical Axes'}
                </span>
                <p className="text-2xl font-mono-tabular font-semibold text-[#218385] dark:text-[#2A9D9F] mt-1">
                  06
                </p>
              </div>
              <div>
                <span className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'النطاق الحراري' : 'Thermal Span'}
                </span>
                <p className="text-2xl font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA] mt-1" dir="ltr">
                  -238°/+127°C
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWIN DESTINATIONS: MOON & MARS STAGGERED EDITORIAL PLATES */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28 border-b border-[#101B2B]/10 dark:border-white/10">
        <div className="max-w-2xl mb-14 space-y-3">
          <p className="text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
            02 · {t.home.worldsTitle}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA] text-balance">
            {t.home.worldsSubtitle}
          </h2>
        </div>

        {/* Lunar Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-[#101B2B]/12 dark:border-white/15">
              <ResilientImage
                src={HERO_ASSETS.moonSurface}
                alt={t.moon.title}
                aspectClassName="aspect-[16/9]"
              />
            </div>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#526071] dark:text-[#CBD5E1]">
              <span>{t.nav.moon}</span>
              <span aria-hidden="true">/</span>
              <span dir="ltr">0.674° N, 23.473° E</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {t.moon.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
              {PLANETARY_REGIONS['moon-mare'].adaptiveOverview[level][locale]}
            </p>
            <div className="flex items-center gap-6 py-3 border-y border-[#101B2B]/10 dark:border-white/10 text-xs font-mono-tabular">
              <div>
                <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                  {t.explorer.meanTempLabel}
                </span>
                <span className="text-[#101B2B] dark:text-[#F7F8FA] font-semibold" dir="ltr">
                  -23 °C (-173/+127)
                </span>
              </div>
              <div>
                <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                  {locale === 'ar' ? 'الجليد القطبي' : 'Polar PSR Ice'}
                </span>
                <span className="text-[#101B2B] dark:text-[#F7F8FA] font-semibold" dir="ltr">
                  5.6 wt%
                </span>
              </div>
            </div>
            <ActionButton variant="moon" onClick={() => navigate('moon')}>
              <span>{t.home.enterLunarArchive}</span>
              <ForwardArrow className="w-4 h-4" />
            </ActionButton>
          </div>
        </div>

        {/* Martian Editorial Row (Reversed asymmetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B84A27] dark:text-[#D96B43]">
              <span>{t.nav.mars}</span>
              <span aria-hidden="true">/</span>
              <span dir="ltr">18.380° N, 77.580° E</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {t.mars.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
              {PLANETARY_REGIONS['mars-jezero'].adaptiveOverview[level][locale]}
            </p>
            <div className="flex items-center gap-6 py-3 border-y border-[#101B2B]/10 dark:border-white/10 text-xs font-mono-tabular">
              <div>
                <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                  {t.explorer.meanTempLabel}
                </span>
                <span className="text-[#101B2B] dark:text-[#F7F8FA] font-semibold" dir="ltr">
                  -63 °C (-92/+8)
                </span>
              </div>
              <div>
                <span className="text-[#4A596C] dark:text-[#A6B7CA] block">
                  {locale === 'ar' ? 'المياه المرتبطة' : 'Bound Regolith H2O'}
                </span>
                <span className="text-[#101B2B] dark:text-[#F7F8FA] font-semibold" dir="ltr">
                  2.1 wt%
                </span>
              </div>
            </div>
            <ActionButton variant="mars" onClick={() => navigate('mars')}>
              <span>{t.home.enterMarsArchive}</span>
              <ForwardArrow className="w-4 h-4" />
            </ActionButton>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden border border-[#B84A27]/25 dark:border-[#D96B43]/30">
              <ResilientImage
                src={HERO_ASSETS.marsSurface}
                alt={t.mars.title}
                aspectClassName="aspect-[16/9]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEVEN VERIFIED EARTH ANALOG STATIONS — INTERACTIVE INDEX + SPOTLIGHT */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28 border-b border-[#101B2B]/10 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
              03 · {t.explorer.title}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA] text-balance">
              {t.home.analogsStripTitle}
            </h2>
            <p className="text-base text-[#4A596C] dark:text-[#A6B7CA]">
              {t.home.analogsStripSubtitle}
            </p>
          </div>

          <ActionButton variant="primary" onClick={() => navigate('explorer')}>
            <Compass className="w-4 h-4" />
            <span>{t.home.openObservatory}</span>
          </ActionButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Station Directory List */}
          <div className="lg:col-span-6 divide-y divide-[#101B2B]/10 dark:divide-white/10 border-y border-[#101B2B]/10 dark:border-white/10">
            {EARTH_ANALOG_SITES.map((site, index) => {
              const active = site.id === activeSpotlightSite.id;
              return (
                <button
                  key={site.id}
                  type="button"
                  onMouseEnter={() => setHoveredAnalogId(site.id)}
                  onFocus={() => setHoveredAnalogId(site.id)}
                  onClick={() => navigate('location', { locationId: site.id })}
                  className={`w-full text-start py-4 px-3 transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                    active
                      ? 'bg-[#218385]/8 dark:bg-[#2A9D9F]/12'
                      : 'hover:bg-black/[0.025] dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base font-display font-semibold text-[#101B2B] dark:text-[#F7F8FA] truncate">
                        {site.name[locale]}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] mt-1 truncate ps-7">
                      {site.country[locale]} · {t.explorer.targets[site.primaryTwin]}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]" dir="ltr">
                      {site.coordinates.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#218385] dark:text-[#2A9D9F]" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Hover/Focus Spotlight Plate */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-[#101B2B]/12 dark:border-white/[0.09] bg-white dark:bg-gradient-to-b dark:from-[#080C15] dark:to-[#030509] dark:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.98),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
            <ResilientImage
              src={activeSpotlightSite.image}
              alt={activeSpotlightSite.name[locale]}
              aspectClassName="aspect-[16/10]"
            />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                <span>{t.explorer.categories[activeSpotlightSite.category]}</span>
                <span className="font-mono-tabular" dir="ltr">
                  {activeSpotlightSite.coordinates.label}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {activeSpotlightSite.name[locale]}
              </h3>
              <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                {activeSpotlightSite.adaptiveSummary[level][locale]}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <ActionButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('location', { locationId: activeSpotlightSite.id })}
                >
                  <span>{t.home.inspectSite}</span>
                  <ForwardArrow className="w-3.5 h-3.5" />
                </ActionButton>
                <ActionButton
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    navigate('compare', {
                      compareSiteId: activeSpotlightSite.id,
                      compareRegionId:
                        activeSpotlightSite.primaryTwin === 'moon' ? 'moon-mare' : 'mars-jezero',
                    })
                  }
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.explorer.compareNow}</span>
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCIENTIFIC INTEGRITY ARCHITECTURE */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20">
        <div className="mb-10">
          <p className="text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
            04 · {t.home.integrityTitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.home.integrityItems.map((item, idx) => (
            <div
              key={item.title}
              className="pt-5 border-t border-[#101B2B]/15 dark:border-[#D9C5A3]/20 space-y-2.5"
            >
              <span className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
                0{idx + 1}.
              </span>
              <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {item.title}
              </h3>
              <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
