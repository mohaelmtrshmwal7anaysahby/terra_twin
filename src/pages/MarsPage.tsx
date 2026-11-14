import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Layers, Radio } from 'lucide-react';
import { ActionButton, MetricReadout, ResilientImage, SurfacePanel } from '../components/DesignSystem';
import { TerrainProfileChart, ThermalLineChart } from '../components/charts/ScientificCharts';
import { useObservatory } from '../context/ObservatoryContext';
import { EARTH_ANALOG_SITES, HERO_ASSETS, PLANETARY_REGIONS } from '../data/planetaryData';
import { useNasaPlanetaryFeed } from '../hooks/useLiveTelemetry';
import { PlanetaryRegionId } from '../types/terratwin';

const MARS_REGIONS: PlanetaryRegionId[] = ['mars-jezero', 'mars-gale'];

export const MarsPage: React.FC = () => {
  const { locale, isRTL, level, navigate, t } = useObservatory();
  const [selectedRegionId, setSelectedRegionId] = useState<PlanetaryRegionId>('mars-jezero');
  const { data: nasaFeed, loading: nasaLoading } = useNasaPlanetaryFeed();

  const region = PLANETARY_REGIONS[selectedRegionId];
  const linkedAnalogs = EARTH_ANALOG_SITES.filter((s) =>
    region.recommendedAnalogs.includes(s.id)
  );
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-[#FAF6F2] dark:bg-[#030102] transition-colors duration-200">
      {/* Martian Atmospheric Hero */}
      <section className="relative min-h-[500px] flex items-end bg-[#030102] text-[#F7F8FA] overflow-hidden border-b border-[#E56E45]/25">
        <img
          src={HERO_ASSETS.marsSurface}
          alt={t.mars.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030102] via-[#030102]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030102]/92 via-[#030102]/35 to-transparent rtl:bg-gradient-to-l" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-18">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#D9C5A3]">
              <span className="text-[#E58464]">{t.nav.mars}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{region.coordinatesLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{region.missionContext[locale]}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              {t.mars.title}
            </h1>
            <p className="text-base sm:text-lg text-[#E6D6C5] leading-relaxed max-w-2xl">
              {t.mars.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Martian Basin Workspace */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 space-y-14">
        {/* Basin Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#B84A27]/15 dark:border-[#D96B43]/20">
          <div className="space-y-1">
            <span className="text-xs font-mono-tabular text-[#B84A27] dark:text-[#D96B43]">
              {t.mars.regionSwitchLabel}
            </span>
            <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {region.name[locale]}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-[#EFE5DC] dark:bg-[#080405] border border-[#B84A27]/15 dark:border-[#E56E45]/25">
            {MARS_REGIONS.map((rid) => {
              const active = rid === selectedRegionId;
              return (
                <button
                  key={rid}
                  type="button"
                  onClick={() => setSelectedRegionId(rid)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#B84A27] dark:bg-[#D96B43] text-white shadow-sm'
                      : 'text-[#4A596C] dark:text-[#D9C5A3] hover:text-[#101B2B] dark:hover:text-white'
                  }`}
                >
                  {PLANETARY_REGIONS[rid].name[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stratigraphic 12-Column Composition (Mirrored/Warm Mineral Aesthetic) */}
        <motion.div
          key={selectedRegionId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Charts & Stratigraphy */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SurfacePanel className="p-6 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] mb-4">
                  {t.mars.thermalTitle}
                </h3>
                <ThermalLineChart
                  primarySeries={region.thermalProfile24h}
                  primaryLabel={region.name[locale]}
                />
              </SurfacePanel>

              <SurfacePanel className="p-6 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] mb-4">
                  {t.mars.terrainTitle}
                </h3>
                <TerrainProfileChart
                  profile={region.terrainProfile}
                  planet="mars"
                  locale={locale}
                />
              </SurfacePanel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SurfacePanel className="p-6 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.mars.mineralsTitle}
                </h3>
                <div className="space-y-3">
                  {region.minerals.map((m) => (
                    <div key={m.formula} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#101B2B] dark:text-[#F7F8FA] font-medium">
                          {m.name[locale]}
                        </span>
                        <span className="font-mono-tabular text-[#B84A27] dark:text-[#E58464]" dir="ltr">
                          {m.percentage !== null ? `${m.percentage}%` : t.location.traceLabel}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#B84A27]/12 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#B84A27] dark:bg-[#D96B43]"
                          style={{ width: `${m.percentage ?? 5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SurfacePanel>

              <SurfacePanel className="p-6 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.mars.featuresTitle}
                </h3>
                <ul className="space-y-3 text-sm text-[#4A596C] dark:text-[#D9C5A3]">
                  {region.geologicalFeatures.map((feat) => (
                    <li
                      key={feat.en}
                      className="pb-2.5 border-b border-[#B84A27]/10 dark:border-white/10 last:border-0 last:pb-0"
                    >
                      {feat[locale]}
                    </li>
                  ))}
                </ul>
              </SurfacePanel>
            </div>
          </div>

          {/* Right Narrative & Telemetry */}
          <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <p className="text-xs font-mono-tabular text-[#B84A27] dark:text-[#D96B43]">
                {t.home.levelAdapterNote}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#101B2B] dark:text-[#F7F8FA]">
                {region.adaptiveOverview[level][locale]}
              </p>
            </div>

            <SurfacePanel className="p-6 grid grid-cols-2 gap-x-6 gap-y-4 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20">
              <MetricReadout
                label={t.explorer.meanTempLabel}
                value={region.metrics.meanTempC !== null ? `${region.metrics.meanTempC}` : t.location.nullLabel}
                unit="°C"
                accentColor="mars"
              />
              <MetricReadout
                label={t.explorer.elevationLabel}
                value={region.metrics.elevationM !== null ? `${region.metrics.elevationM}` : t.location.nullLabel}
                unit="m (MOLA)"
                accentColor="mars"
              />
              <MetricReadout
                label={t.compare.axisNames.slope}
                value={region.metrics.meanSlopeDeg !== null ? `${region.metrics.meanSlopeDeg}` : t.location.nullLabel}
                unit="deg"
                accentColor="sand"
              />
              <MetricReadout
                label={t.explorer.waterIceLabel}
                value={region.metrics.waterIcePct !== null ? `${region.metrics.waterIcePct}` : t.location.nullLabel}
                unit="wt% bound"
                accentColor="teal"
              />
            </SurfacePanel>

            <p className="text-xs text-[#4A596C] dark:text-[#D9C5A3] leading-relaxed border-t border-[#B84A27]/15 dark:border-white/10 pt-4">
              {region.metricNotes.waterIceNote[locale]}
            </p>

            <ActionButton
              variant="mars"
              size="lg"
              onClick={() =>
                navigate('compare', {
                  compareSiteId: region.recommendedAnalogs[0],
                  compareRegionId: region.id,
                })
              }
            >
              <Layers className="w-4 h-4" />
              <span>{t.mars.compareThisRegion}</span>
            </ActionButton>
          </div>
        </motion.div>

        {/* Live NASA Perseverance & EONET Earth Events Strip */}
        <SurfacePanel className="p-6 !bg-white dark:!bg-[#080406] !border-[#B84A27]/15 dark:!border-[#D96B43]/20 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B84A27]/12 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#B84A27] dark:text-[#D96B43]" />
              <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {t.mars.liveFeedTitle}
              </h3>
            </div>
            <span className="text-xs font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]">
              {nasaLoading
                ? t.location.loadingFeed
                : nasaFeed?.perseverance.source === 'live-nasa'
                ? t.mars.liveNasaSource
                : t.mars.cachedBaselineSource}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <MetricReadout
                label={t.mars.roverLabel}
                value={nasaFeed?.perseverance.status ?? (nasaLoading ? '—' : 'Active')}
                accentColor="mars"
              />
              <MetricReadout
                label={t.mars.solLabel}
                value={
                  nasaLoading
                    ? '—'
                    : nasaFeed?.perseverance.maxSol !== null &&
                      nasaFeed?.perseverance.maxSol !== undefined
                    ? `${nasaFeed.perseverance.maxSol.toLocaleString()}`
                    : t.location.nullLabel
                }
                accentColor="sand"
              />
              <MetricReadout
                label={t.mars.photosLabel}
                value={
                  nasaLoading
                    ? '—'
                    : nasaFeed?.perseverance.totalPhotos !== null &&
                      nasaFeed?.perseverance.totalPhotos !== undefined
                    ? `${nasaFeed.perseverance.totalPhotos.toLocaleString()}`
                    : t.location.nullLabel
                }
              />
              <MetricReadout
                label={t.location.observedLabel}
                value={
                  nasaLoading
                    ? '—'
                    : nasaFeed?.perseverance.maxDate ?? t.location.nullLabel
                }
              />
            </div>

            <div className="lg:col-span-7 space-y-2 border-t lg:border-t-0 lg:border-s border-[#B84A27]/12 dark:border-white/10 pt-4 lg:pt-0 lg:ps-6">
              <p className="text-xs font-medium text-[#4A596C] dark:text-[#D9C5A3]">
                {t.mars.eonetTitle}
              </p>
              {nasaFeed && nasaFeed.earthEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {nasaFeed.earthEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-lg border border-[#B84A27]/12 dark:border-white/10 px-3 py-2 text-xs space-y-0.5"
                    >
                      <p className="font-medium text-[#101B2B] dark:text-[#F7F8FA] truncate">
                        {ev.title}
                      </p>
                      <p className="text-[11px] font-mono-tabular text-[#B84A27] dark:text-[#E58464]">
                        {ev.category}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {nasaLoading ? t.location.loadingFeed : t.location.liveUnavailable}
                </p>
              )}
            </div>
          </div>
        </SurfacePanel>

        {/* Linked Earth Analogs */}
        <div className="pt-8 border-t border-[#B84A27]/15 dark:border-[#D96B43]/20 space-y-6">
          <h3 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.mars.linkedAnalogsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {linkedAnalogs.map((site) => (
              <div
                key={site.id}
                onClick={() => navigate('location', { locationId: site.id })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate('location', { locationId: site.id });
                }}
                className="group rounded-xl border border-[#B84A27]/15 dark:border-[#E56E45]/22 bg-white dark:bg-[#080406] dark:shadow-[0_22px_55px_-16px_rgba(0,0,0,0.96)] overflow-hidden cursor-pointer hover:border-[#E56E45] transition-colors"
              >
                <ResilientImage
                  src={site.image}
                  alt={site.name[locale]}
                  aspectClassName="aspect-[4/3]"
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#B84A27] dark:text-[#D9C5A3]">
                    <span>{site.country[locale]}</span>
                    <span className="font-mono-tabular" dir="ltr">
                      {site.coordinates.label}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] flex items-center justify-between gap-2">
                    <span className="truncate">{site.name[locale]}</span>
                    <ForwardArrow className="w-4 h-4 shrink-0 text-[#B84A27] dark:text-[#D96B43]" />
                  </h4>
                  <p className="text-xs text-[#4A596C] dark:text-[#D9C5A3]/80 leading-relaxed line-clamp-2">
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
