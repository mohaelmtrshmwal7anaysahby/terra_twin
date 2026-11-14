import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Layers, Radio } from 'lucide-react';
import {
  ActionButton,
  MetricReadout,
  ResilientImage,
  ScientificTooltip,
  SurfacePanel,
} from '../components/DesignSystem';
import { StudentFormationDiagram, ThermalLineChart } from '../components/charts/ScientificCharts';
import { useObservatory } from '../context/ObservatoryContext';
import { EARTH_ANALOG_SITES } from '../data/planetaryData';
import { useAnalogLiveWeather } from '../hooks/useLiveTelemetry';

export const LocationDetailPage: React.FC = () => {
  const { locale, isRTL, level, route, navigate, t } = useObservatory();

  const site =
    EARTH_ANALOG_SITES.find((s) => s.id === route.locationId) ?? EARTH_ANALOG_SITES[0];
  const { data: liveWeather, loading: liveWeatherLoading } = useAnalogLiveWeather(
    site.coordinates.lat,
    site.coordinates.lng
  );

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const targetRegionId = site.primaryTwin === 'moon' ? 'moon-mare' : 'mars-jezero';

  return (
    <motion.div
      key={site.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-12"
    >
      {/* Top Action Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('explorer')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-[#F7F8FA] transition-colors cursor-pointer"
        >
          <BackArrow className="w-4 h-4" />
          <span>{t.location.backToExplorer}</span>
        </button>

        <ActionButton
          variant="primary"
          onClick={() =>
            navigate('compare', {
              compareSiteId: site.id,
              compareRegionId: targetRegionId,
            })
          }
        >
          <Layers className="w-4 h-4" />
          <span>{t.location.launchComparison}</span>
        </ActionButton>
      </div>

      {/* Editorial Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#101B2B]/12 dark:border-[#D9C5A3]/18">
          <ResilientImage
            src={site.image}
            alt={site.name[locale]}
            aspectClassName="aspect-[16/10] lg:h-full"
            priority
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-6 py-2">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]">
              <span>{site.country[locale]}</span>
              <span aria-hidden="true">·</span>
              <span>{t.explorer.categories[site.category]}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{site.coordinates.label}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA] text-balance">
              {site.name[locale]}
            </h1>

            <div className="pt-2">
              <p className="text-xs font-medium text-[#218385] dark:text-[#2A9D9F]">
                {t.location.researchFocus}
              </p>
              <p className="text-base text-[#101B2B] dark:text-[#F7F8FA] mt-1 font-medium">
                {site.researchFocus[locale]}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed pt-2 border-t border-[#101B2B]/10 dark:border-white/10">
              {site.adaptiveSummary[level][locale]}
            </p>
          </div>

          {/* Educational Diagram for Student Level */}
          {level === 'student' && <StudentFormationDiagram site={site} locale={locale} />}

          {/* Pioneer / Scientist ISRU Notes */}
          {(level === 'pioneer' || level === 'scientist') && (
            <div className="rounded-xl border border-[#218385]/25 dark:border-[#2FD1D3]/35 bg-[#218385]/5 dark:bg-[#060C14] dark:shadow-[0_18px_45px_-14px_rgba(0,0,0,0.95),0_0_24px_-12px_rgba(47,209,211,0.3)] p-4 space-y-1.5">
              <p className="text-xs font-semibold text-[#218385] dark:text-[#38D6D8]">
                {t.location.pioneerSectionTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#101B2B] dark:text-[#F7F8FA] leading-relaxed">
                {site.pioneerIsruNotes[locale]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Live Meteorological Station Feed (Open-Meteo) */}
      <SurfacePanel className="p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#101B2B]/10 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#218385] dark:text-[#2A9D9F]" />
            <h2 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {t.location.liveConditionsTitle}
            </h2>
          </div>
          <span className="text-xs font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]">
            {liveWeatherLoading
              ? t.location.loadingFeed
              : liveWeather?.source === 'live-open-meteo'
              ? `${t.location.liveSourceOpenMeteo}${
                  liveWeather.observedAt
                    ? ` · ${liveWeather.observedAt.replace('T', ' ')} UTC`
                    : ''
                }`
              : t.location.liveUnavailable}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <MetricReadout
            label={t.explorer.meanTempLabel}
            value={
              liveWeatherLoading
                ? '—'
                : liveWeather?.temperatureC !== null && liveWeather?.temperatureC !== undefined
                ? `${liveWeather.temperatureC}`
                : t.location.nullLabel
            }
            unit="°C"
            accentColor="teal"
          />
          <MetricReadout
            label={t.location.windSpeedLabel}
            value={
              liveWeatherLoading
                ? '—'
                : liveWeather?.windSpeedKmh !== null && liveWeather?.windSpeedKmh !== undefined
                ? `${liveWeather.windSpeedKmh}`
                : t.location.nullLabel
            }
            unit="km/h"
          />
          <MetricReadout
            label={t.location.humidityLabel}
            value={
              liveWeatherLoading
                ? '—'
                : liveWeather?.humidityPct !== null && liveWeather?.humidityPct !== undefined
                ? `${liveWeather.humidityPct}`
                : t.location.nullLabel
            }
            unit="%"
          />
          <MetricReadout
            label={t.location.pressureLabel}
            value={
              liveWeatherLoading
                ? '—'
                : liveWeather?.pressureKpa !== null && liveWeather?.pressureKpa !== undefined
                ? `${liveWeather.pressureKpa}`
                : t.location.nullLabel
            }
            unit="kPa"
          />
        </div>
      </SurfacePanel>

      {/* Missing Data Disclosure if any fields are null */}
      {site.missingDataNotes && (
        <SurfacePanel className="p-5 !border-[#B84A27]/30 dark:!border-[#E58464]/35">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono-tabular font-semibold text-[#B84A27] dark:text-[#E58464]">
              ∅ {t.location.missingDataTitle}
            </span>
            <p className="text-xs sm:text-sm text-[#4A596C] dark:text-[#CBD5E1]">
              {site.missingDataNotes[locale]}
            </p>
          </div>
        </SurfacePanel>
      )}

      {/* Measurements & Thermal Curve Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <SurfacePanel className="lg:col-span-5 p-6 space-y-5">
          <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.location.telemetryGrid}
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <MetricReadout
              label={t.explorer.meanTempLabel}
              value={site.metrics.meanTempC !== null ? `${site.metrics.meanTempC}` : t.location.nullLabel}
              unit="°C"
              quality={site.metricQuality.thermal}
              qualityLabel={t.compare.qualityNames[site.metricQuality.thermal]}
              accentColor="teal"
            />
            <MetricReadout
              label={t.explorer.elevationLabel}
              value={
                site.metrics.elevationM !== null
                  ? `${site.metrics.elevationM.toLocaleString()}`
                  : t.location.nullLabel
              }
              unit="m"
              quality={site.metricQuality.elevation}
              qualityLabel={t.compare.qualityNames[site.metricQuality.elevation]}
            />
            <MetricReadout
              label={t.compare.axisNames.slope}
              value={
                site.metrics.meanSlopeDeg !== null
                  ? `${site.metrics.meanSlopeDeg}`
                  : t.location.nullLabel
              }
              unit="deg"
              quality={site.metricQuality.slope}
              qualityLabel={t.compare.qualityNames[site.metricQuality.slope]}
            />
            <MetricReadout
              label={t.compare.axisNames.roughness}
              value={
                site.metrics.roughnessIndexDeg !== null
                  ? `${site.metrics.roughnessIndexDeg}`
                  : t.location.nullLabel
              }
              unit={site.metrics.roughnessIndexDeg !== null ? 'deg RMS' : ''}
              quality={site.metricQuality.roughness}
              qualityLabel={t.compare.qualityNames[site.metricQuality.roughness]}
              accentColor={site.metrics.roughnessIndexDeg === null ? 'mars' : 'neutral'}
            />
            <MetricReadout
              label={t.explorer.waterIceLabel}
              value={
                site.metrics.waterIcePct !== null
                  ? `${site.metrics.waterIcePct}`
                  : t.location.nullLabel
              }
              unit="wt%"
              quality={site.metricQuality.waterIce}
              qualityLabel={t.compare.qualityNames[site.metricQuality.waterIce]}
              accentColor="teal"
            />
            <div className="flex flex-col justify-between">
              <MetricReadout
                label={t.location.albedoLabel}
                value={site.metrics.albedo !== null ? `${site.metrics.albedo}` : t.location.nullLabel}
                accentColor={site.metrics.albedo === null ? 'mars' : 'sand'}
              />
              <div className="text-[11px] text-[#4A596C] dark:text-[#A6B7CA]">
                <ScientificTooltip
                  term={t.compare.glossaryTerms[1].term}
                  explanation={t.compare.glossaryTerms[1].definition}
                />
              </div>
            </div>
          </div>
        </SurfacePanel>

        <SurfacePanel className="lg:col-span-7 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.location.thermalCurveTitle}
          </h2>
          <ThermalLineChart
            primarySeries={site.thermalProfile24h}
            primaryLabel={site.name[locale]}
          />
        </SurfacePanel>
      </div>

      {/* Mineralogy, Geological Features & Literature */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SurfacePanel className="p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.location.mineralogyTitle}
          </h2>
          <div className="space-y-3">
            {site.minerals.map((m) => (
              <div key={m.formula} className="space-y-1">
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                    {m.name[locale]}
                  </span>
                  <span className="font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]" dir="ltr">
                    {m.percentage !== null ? `${m.percentage}%` : t.location.traceLabel}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#101B2B]/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#218385] dark:bg-[#2A9D9F]"
                    style={{ width: `${m.percentage ?? 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SurfacePanel>

        <SurfacePanel className="p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.location.featuresTitle}
          </h2>
          <ul className="space-y-3 text-sm text-[#4A596C] dark:text-[#A6B7CA]">
            {site.geologicalFeatures.map((feat) => (
              <li
                key={feat.en}
                className="pb-2.5 border-b border-[#101B2B]/8 dark:border-white/8 last:border-0 last:pb-0"
              >
                {feat[locale]}
              </li>
            ))}
          </ul>
        </SurfacePanel>

        <SurfacePanel className="p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
            {t.location.sourcesTitle}
          </h2>
          <div className="space-y-3">
            {site.sources.map((src) => (
              <div key={src.id} className="text-xs space-y-1">
                <p className="font-medium text-[#101B2B] dark:text-[#F7F8FA] leading-snug">
                  {src.title}
                </p>
                <p className="text-[#4A596C] dark:text-[#A6B7CA]">
                  {src.institution} · {src.year}
                </p>
                <p className="font-mono-tabular text-[#218385] dark:text-[#2A9D9F]" dir="ltr">
                  {src.identifier}
                </p>
              </div>
            ))}
          </div>
        </SurfacePanel>
      </div>
    </motion.div>
  );
};
