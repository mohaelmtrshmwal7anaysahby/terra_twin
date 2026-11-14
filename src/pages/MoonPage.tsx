import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { ActionButton, MetricReadout, ResilientImage, SurfacePanel } from '../components/DesignSystem';
import { TerrainProfileChart, ThermalLineChart } from '../components/charts/ScientificCharts';
import { useObservatory } from '../context/ObservatoryContext';
import { EARTH_ANALOG_SITES, HERO_ASSETS, PLANETARY_REGIONS } from '../data/planetaryData';
import { PlanetaryRegionId } from '../types/terratwin';

const LUNAR_REGIONS: PlanetaryRegionId[] = ['moon-mare', 'moon-south-pole'];

export const MoonPage: React.FC = () => {
  const { locale, isRTL, level, navigate, t } = useObservatory();
  const [selectedRegionId, setSelectedRegionId] = useState<PlanetaryRegionId>('moon-mare');

  const region = PLANETARY_REGIONS[selectedRegionId];
  const linkedAnalogs = EARTH_ANALOG_SITES.filter((s) =>
    region.recommendedAnalogs.includes(s.id)
  );
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-[#F4F6F9] dark:bg-[#010205] transition-colors duration-200">
      {/* Lunar Dramatic Hero */}
      <section className="relative min-h-[480px] flex items-end bg-[#010205] text-[#F7F8FA] overflow-hidden border-b border-white/[0.08]">
        <img
          src={HERO_ASSETS.moonSurface}
          alt={t.moon.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010205] via-[#010205]/55 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-18">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#CBD5E1]">
              <span>{t.nav.moon}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{region.coordinatesLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{region.missionContext[locale]}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              {t.moon.title}
            </h1>
            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl">
              {t.moon.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Lunar Observatory Workspace */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 space-y-14">
        {/* Lunar Province Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#101B2B]/10 dark:border-white/10">
          <div className="space-y-1">
            <span className="text-xs font-mono-tabular text-[#526071] dark:text-[#94A3B8]">
              {t.moon.regionSwitchLabel}
            </span>
            <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {region.name[locale]}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-[#E2E8F0] dark:bg-[#05080F] border border-[#101B2B]/10 dark:border-white/[0.1]">
            {LUNAR_REGIONS.map((rid) => {
              const active = rid === selectedRegionId;
              return (
                <button
                  key={rid}
                  type="button"
                  onClick={() => setSelectedRegionId(rid)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-[#CBD5E1] text-[#101B2B] shadow-sm'
                      : 'text-[#4A596C] dark:text-[#94A3B8] hover:text-[#101B2B] dark:hover:text-white'
                  }`}
                >
                  {PLANETARY_REGIONS[rid].name[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Science Grid */}
        <motion.div
          key={selectedRegionId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Narrative & Telemetry */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono-tabular text-[#526071] dark:text-[#94A3B8]">
                {t.home.levelAdapterNote}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#101B2B] dark:text-[#E2E8F0]">
                {region.adaptiveOverview[level][locale]}
              </p>
            </div>

            <SurfacePanel className="p-6 grid grid-cols-2 gap-x-6 gap-y-4 !bg-white dark:!bg-[#05080F]">
              <MetricReadout
                label={t.explorer.meanTempLabel}
                value={region.metrics.meanTempC !== null ? `${region.metrics.meanTempC}` : t.location.nullLabel}
                unit="°C"
                accentColor="moon"
              />
              <MetricReadout
                label={t.explorer.elevationLabel}
                value={region.metrics.elevationM !== null ? `${region.metrics.elevationM}` : t.location.nullLabel}
                unit="m (LOLA)"
                accentColor="moon"
              />
              <MetricReadout
                label={t.compare.axisNames.slope}
                value={region.metrics.meanSlopeDeg !== null ? `${region.metrics.meanSlopeDeg}` : t.location.nullLabel}
                unit="deg"
                accentColor="moon"
              />
              <MetricReadout
                label={t.explorer.waterIceLabel}
                value={region.metrics.waterIcePct !== null ? `${region.metrics.waterIcePct}` : t.location.nullLabel}
                unit="wt%"
                accentColor="teal"
              />
            </SurfacePanel>

            {region.metricNotes.nullFieldNote && (
              <p className="text-xs text-[#4A596C] dark:text-[#94A3B8] leading-relaxed border-t border-[#101B2B]/10 dark:border-white/10 pt-4">
                {region.metricNotes.nullFieldNote[locale]}
              </p>
            )}

            <ActionButton
              variant="moon"
              size="lg"
              onClick={() =>
                navigate('compare', {
                  compareSiteId: region.recommendedAnalogs[0],
                  compareRegionId: region.id,
                })
              }
            >
              <Layers className="w-4 h-4" />
              <span>{t.moon.compareThisRegion}</span>
            </ActionButton>
          </div>

          {/* Right Charts & Mineralogy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SurfacePanel className="p-6 !bg-white dark:!bg-[#05080F]">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] mb-4">
                  {t.moon.thermalTitle}
                </h3>
                <ThermalLineChart
                  primarySeries={region.thermalProfile24h}
                  primaryLabel={region.name[locale]}
                />
              </SurfacePanel>

              <SurfacePanel className="p-6 !bg-white dark:!bg-[#05080F]">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] mb-4">
                  {t.moon.terrainTitle}
                </h3>
                <TerrainProfileChart
                  profile={region.terrainProfile}
                  planet="moon"
                  locale={locale}
                />
              </SurfacePanel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SurfacePanel className="p-6 !bg-white dark:!bg-[#05080F] space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.moon.mineralsTitle}
                </h3>
                <div className="space-y-3">
                  {region.minerals.map((m) => (
                    <div key={m.formula} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#101B2B] dark:text-[#E2E8F0] font-medium">
                          {m.name[locale]}
                        </span>
                        <span className="font-mono-tabular text-[#526071] dark:text-[#94A3B8]" dir="ltr">
                          {m.percentage !== null ? `${m.percentage}%` : t.location.traceLabel}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#101B2B]/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#64748B] dark:bg-[#CBD5E1]"
                          style={{ width: `${m.percentage ?? 5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SurfacePanel>

              <SurfacePanel className="p-6 !bg-white dark:!bg-[#05080F] space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.moon.featuresTitle}
                </h3>
                <ul className="space-y-3 text-sm text-[#4A596C] dark:text-[#CBD5E1]">
                  {region.geologicalFeatures.map((feat) => (
                    <li
                      key={feat.en}
                      className="pb-2.5 border-b border-[#101B2B]/8 dark:border-white/8 last:border-0 last:pb-0"
                    >
                      {feat[locale]}
                    </li>
                  ))}
                </ul>
              </SurfacePanel>
            </div>
          </div>
        </motion.div>

        {/* Linked Earth Analogs */}
        <div className="pt-8 border-t border-[#101B2B]/10 dark:border-white/10 space-y-6">
          <h3 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.moon.linkedAnalogsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linkedAnalogs.map((site) => (
              <div
                key={site.id}
                onClick={() => navigate('location', { locationId: site.id })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate('location', { locationId: site.id });
                }}
                className="group rounded-xl border border-[#101B2B]/10 dark:border-white/[0.09] bg-white dark:bg-[#05080F] dark:shadow-[0_22px_55px_-16px_rgba(0,0,0,0.96)] overflow-hidden cursor-pointer hover:border-[#2FD1D3] transition-colors"
              >
                <ResilientImage
                  src={site.image}
                  alt={site.name[locale]}
                  aspectClassName="aspect-[4/3]"
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#526071] dark:text-[#94A3B8]">
                    <span>{site.country[locale]}</span>
                    <span className="font-mono-tabular" dir="ltr">
                      {site.coordinates.label}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA] flex items-center justify-between">
                    <span>{site.name[locale]}</span>
                    <ForwardArrow className="w-4 h-4 text-[#94A3B8] group-hover:text-[#2A9D9F] transition-colors" />
                  </h4>
                  <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                    {site.researchFocus[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
