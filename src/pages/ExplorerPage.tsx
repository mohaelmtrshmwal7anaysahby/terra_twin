import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Layers, Radio, Search, X } from 'lucide-react';
import {
  ActionButton,
  EmptyState,
  MetricReadout,
  ResilientImage,
  SurfacePanel,
} from '../components/DesignSystem';
import { MapLayerMode, ObservatoryMap } from '../components/ObservatoryMap';
import { useObservatory } from '../context/ObservatoryContext';
import { EARTH_ANALOG_SITES } from '../data/planetaryData';
import { useAnalogLiveWeather } from '../hooks/useLiveTelemetry';
import { EnvironmentCategory } from '../types/terratwin';

const CATEGORIES: ('all' | EnvironmentCategory)[] = [
  'all',
  'hyper-arid',
  'polar-cryogenic',
  'volcanic-basalt',
  'impact-crater',
  'evaporite-playa',
];

const TARGET_FILTERS: ('all' | 'moon' | 'mars')[] = ['all', 'moon', 'mars'];

export const ExplorerPage: React.FC = () => {
  const { theme, locale, isRTL, level, navigate, t } = useObservatory();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | EnvironmentCategory>('all');
  const [targetFilter, setTargetFilter] = useState<'all' | 'moon' | 'mars'>('all');
  const [selectedSiteId, setSelectedSiteId] = useState<string>(EARTH_ANALOG_SITES[0].id);
  const [mapLayer, setMapLayer] = useState<MapLayerMode>('standard');

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const filteredSites = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EARTH_ANALOG_SITES.filter((site) => {
      if (categoryFilter !== 'all' && site.category !== categoryFilter) return false;
      if (targetFilter !== 'all') {
        if (site.primaryTwin !== targetFilter && site.primaryTwin !== 'both') return false;
      }
      if (!q) return true;
      const haystack = [
        site.name.en,
        site.name.ar,
        site.country.en,
        site.country.ar,
        site.region.en,
        site.researchFocus.en,
        site.researchFocus.ar,
        ...site.minerals.map((m) => m.name.en),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, categoryFilter, targetFilter]);

  const activeSite =
    filteredSites.find((s) => s.id === selectedSiteId) ?? filteredSites[0] ?? null;

  const { data: liveWeather, loading: liveWeatherLoading } = useAnalogLiveWeather(
    activeSite?.coordinates.lat ?? 0,
    activeSite?.coordinates.lng ?? 0
  );

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setTargetFilter('all');
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-6">
      {/* Observatory Header & Search / Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#101B2B]/10 dark:border-white/10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
            <span>{t.nav.explorer}</span>
            <span aria-hidden="true">·</span>
            <span>
              {filteredSites.length} {t.explorer.sitesCount}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA]">
            {t.explorer.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA]">
            {t.explorer.subtitle}
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#4A596C] dark:text-[#A6B7CA] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.explorer.searchPlaceholder}
            aria-label={t.explorer.searchPlaceholder}
            className="w-full rounded-lg border border-[#101B2B]/15 dark:border-[#D9C5A3]/20 bg-white dark:bg-[#070B12] ps-10 pe-9 py-2.5 text-sm text-[#101B2B] dark:text-[#F7F8FA] placeholder:text-[#4A596C] dark:placeholder:text-[#A6B7CA] focus:outline-none focus:ring-2 focus:ring-[#2A9D9F]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-[#4A596C] hover:text-[#101B2B] dark:text-[#A6B7CA] dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category & Planetary Twin Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = categoryFilter === cat;
            const label =
              cat === 'all' ? t.explorer.allCategories : t.explorer.categories[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
                  active
                    ? 'bg-[#101B2B] dark:bg-[#F7F8FA] text-white dark:text-[#101B2B]'
                    : 'bg-[#EEF2F6] dark:bg-[#070B12] text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-[#F7F8FA]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#EEF2F6] dark:bg-[#070B12] border border-[#101B2B]/10 dark:border-white/10 w-fit">
          {TARGET_FILTERS.map((tgt) => {
            const active = targetFilter === tgt;
            const label =
              tgt === 'all' ? t.explorer.allTargets : t.explorer.targets[tgt];
            return (
              <button
                key={tgt}
                type="button"
                onClick={() => setTargetFilter(tgt)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-white dark:bg-[#0E1624] text-[#218385] dark:text-[#38D6D8] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                    : 'text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-[#F7F8FA]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Observatory Stage */}
      {filteredSites.length === 0 ? (
        <EmptyState
          message={t.explorer.emptyState}
          actionLabel={t.explorer.resetFilters}
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Map Dominating Left/Center Viewport */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-medium text-[#4A596C] dark:text-[#A6B7CA]">
                {t.explorer.mapLayerLabel}
              </span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EEF2F6] dark:bg-[#070B12] border border-[#101B2B]/10 dark:border-white/10">
                {(['standard', 'satellite', 'topographic'] as MapLayerMode[]).map((layerMode) => {
                  const active = mapLayer === layerMode;
                  return (
                    <button
                      key={layerMode}
                      type="button"
                      onClick={() => setMapLayer(layerMode)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'bg-white dark:bg-[#0E1624] text-[#218385] dark:text-[#38D6D8] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                          : 'text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-[#F7F8FA]'
                      }`}
                    >
                      {t.explorer.mapLayers[layerMode]}
                    </button>
                  );
                })}
              </div>
            </div>

            <ObservatoryMap
              sites={filteredSites}
              selectedSiteId={activeSite?.id ?? ''}
              onSelectSite={setSelectedSiteId}
              theme={theme}
              locale={locale}
              mapLayer={mapLayer}
            />

            {/* Quick Station Switcher Strip below map */}
            <div className="flex flex-wrap gap-2">
              {filteredSites.map((site) => {
                const isSelected = site.id === activeSite?.id;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setSelectedSiteId(site.id)}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#218385] dark:border-[#2FD1D3] bg-[#218385]/10 dark:bg-[#2FD1D3]/14 text-[#101B2B] dark:text-[#F7F8FA] console-active-cyan'
                        : 'border-[#101B2B]/10 dark:border-white/10 bg-white dark:bg-[#070B12] text-[#4A596C] dark:text-[#A6B7CA] hover:border-[#2A9D9F]/50'
                    }`}
                  >
                    {site.name[locale]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Location Telemetry & Action Panel */}
          <div className="lg:col-span-5 xl:col-span-4">
            {activeSite ? (
              <div key={activeSite.id} className="h-full">
                <SurfacePanel className="h-full flex flex-col overflow-hidden">
                  <ResilientImage
                    src={activeSite.image}
                    alt={activeSite.name[locale]}
                    aspectClassName="aspect-[16/10]"
                    priority
                  />

                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                        <span>
                          {activeSite.country[locale]} · {t.explorer.targets[activeSite.primaryTwin]}
                        </span>
                        <span className="font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]" dir="ltr">
                          {activeSite.coordinates.label}
                        </span>
                      </div>

                      <div>
                        <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                          {activeSite.name[locale]}
                        </h2>
                        <p className="text-xs font-medium text-[#218385] dark:text-[#2A9D9F] mt-1">
                          {activeSite.researchFocus[locale]}
                        </p>
                      </div>

                      <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                        {activeSite.adaptiveSummary[level][locale]}
                      </p>

                      <div className="pt-3 border-t border-[#101B2B]/10 dark:border-white/10">
                        <p className="text-xs font-medium text-[#4A596C] dark:text-[#A6B7CA] mb-2">
                          {t.explorer.keyMeasurements}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <MetricReadout
                            label={t.explorer.meanTempLabel}
                            value={
                              activeSite.metrics.meanTempC !== null
                                ? `${activeSite.metrics.meanTempC}`
                                : t.location.nullLabel
                            }
                            unit="°C"
                          />
                          <MetricReadout
                            label={t.explorer.elevationLabel}
                            value={
                              activeSite.metrics.elevationM !== null
                                ? `${activeSite.metrics.elevationM.toLocaleString()}`
                                : t.location.nullLabel
                            }
                            unit="m"
                          />
                          <MetricReadout
                            label={t.explorer.waterIceLabel}
                            value={
                              activeSite.metrics.waterIcePct !== null
                                ? `${activeSite.metrics.waterIcePct}`
                                : t.location.nullLabel
                            }
                            unit="wt%"
                          />
                          <MetricReadout
                            label={t.compare.axisNames.roughness}
                            value={
                              activeSite.metrics.roughnessIndexDeg !== null
                                ? `${activeSite.metrics.roughnessIndexDeg}`
                                : t.location.nullLabel
                            }
                            unit={activeSite.metrics.roughnessIndexDeg !== null ? 'deg RMS' : ''}
                            accentColor={
                              activeSite.metrics.roughnessIndexDeg === null ? 'mars' : 'neutral'
                            }
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#101B2B]/10 dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                          <span className="inline-flex items-center gap-1.5 font-medium">
                            <Radio className="w-3.5 h-3.5 text-[#218385] dark:text-[#2A9D9F]" />
                            {t.location.liveConditionsTitle}
                          </span>
                          <span className="font-mono-tabular text-[11px]">
                            {liveWeatherLoading
                              ? '...'
                              : liveWeather?.source === 'live-open-meteo'
                              ? 'Open-Meteo'
                              : t.location.nullLabel}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#EEF2F6]/80 dark:bg-[#04070D]/80 px-3 py-2 text-xs font-mono-tabular">
                          <div>
                            <span className="text-[10px] text-[#4A596C] dark:text-[#A6B7CA] block truncate">
                              {t.explorer.meanTempLabel}
                            </span>
                            <span className="font-semibold text-[#101B2B] dark:text-[#F7F8FA]" dir="ltr">
                              {liveWeatherLoading
                                ? '—'
                                : liveWeather?.temperatureC !== null && liveWeather?.temperatureC !== undefined
                                ? `${liveWeather.temperatureC}°C`
                                : t.location.nullLabel}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#4A596C] dark:text-[#A6B7CA] block truncate">
                              {t.location.windSpeedLabel}
                            </span>
                            <span className="font-semibold text-[#101B2B] dark:text-[#F7F8FA]" dir="ltr">
                              {liveWeatherLoading
                                ? '—'
                                : liveWeather?.windSpeedKmh !== null && liveWeather?.windSpeedKmh !== undefined
                                ? `${liveWeather.windSpeedKmh} km/h`
                                : t.location.nullLabel}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#4A596C] dark:text-[#A6B7CA] block truncate">
                              {t.location.humidityLabel}
                            </span>
                            <span className="font-semibold text-[#101B2B] dark:text-[#F7F8FA]" dir="ltr">
                              {liveWeatherLoading
                                ? '—'
                                : liveWeather?.humidityPct !== null && liveWeather?.humidityPct !== undefined
                                ? `${liveWeather.humidityPct}%`
                                : t.location.nullLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {activeSite.missingDataNotes && (
                        <p className="text-[11px] text-[#B84A27] dark:text-[#E58464] leading-snug">
                          ∅ {activeSite.missingDataNotes[locale]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-4 border-t border-[#101B2B]/10 dark:border-white/10">
                      <ActionButton
                        variant="primary"
                        className="w-full"
                        onClick={() => navigate('location', { locationId: activeSite.id })}
                      >
                        <span>{t.explorer.openDossier}</span>
                        <ForwardArrow className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        className="w-full"
                        onClick={() =>
                          navigate('compare', {
                            compareSiteId: activeSite.id,
                            compareRegionId:
                              activeSite.primaryTwin === 'moon' ? 'moon-mare' : 'mars-jezero',
                          })
                        }
                      >
                        <Layers className="w-4 h-4" />
                        <span>{t.explorer.compareNow}</span>
                      </ActionButton>
                    </div>
                  </div>
                </SurfacePanel>
              </div>
            ) : (
              <SurfacePanel className="p-6 text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                {t.explorer.selectPrompt}
              </SurfacePanel>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
