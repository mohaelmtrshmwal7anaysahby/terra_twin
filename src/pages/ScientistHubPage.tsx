import React, { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  BookMarked,
  Database,
  Download,
  ExternalLink,
  Search,
} from 'lucide-react';
import { ActionButton, MetricReadout, SurfacePanel } from '../components/DesignSystem';
import { TrackHeader } from '../components/TrackHeader';
import {
  AxisAlignmentBarChart,
  RadarComparisonChart,
  ThermalLineChart,
} from '../components/charts/ScientificCharts';
import { useObservatory } from '../context/ObservatoryContext';
import {
  calculateComparison,
  DEFAULT_WEIGHTS,
  EARTH_ANALOG_SITES,
  PLANETARY_REGIONS,
} from '../data/planetaryData';
import { useAnalogLiveWeather, useNasaPlanetaryFeed } from '../hooks/useLiveTelemetry';
import { PlanetaryRegionId } from '../types/terratwin';

type ScientistTab = 'telemetry' | 'comparison' | 'research';

const REGION_IDS: PlanetaryRegionId[] = [
  'mars-jezero',
  'mars-gale',
  'moon-mare',
  'moon-south-pole',
];

export const ScientistHubPage: React.FC = () => {
  const { locale, navigate, t } = useObservatory();
  const [activeTab, setActiveTab] = useState<ScientistTab>('telemetry');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('atacama');
  const [selectedRegionId, setSelectedRegionId] = useState<PlanetaryRegionId>('mars-jezero');
  const [researchQuery, setResearchQuery] = useState('');

  const selectedSite = useMemo(
    () => EARTH_ANALOG_SITES.find((s) => s.id === selectedSiteId) ?? EARTH_ANALOG_SITES[0],
    [selectedSiteId]
  );
  const selectedRegion = PLANETARY_REGIONS[selectedRegionId];

  const { data: liveWeather, loading: weatherLoading } = useAnalogLiveWeather(
    selectedSite.coordinates.lat,
    selectedSite.coordinates.lng
  );
  const { data: nasaFeed, loading: nasaLoading } = useNasaPlanetaryFeed();

  const comparison = useMemo(
    () => calculateComparison(selectedSite, selectedRegion, DEFAULT_WEIGHTS),
    [selectedSite, selectedRegion]
  );

  const allResearchSources = useMemo(() => {
    const items: {
      id: string;
      title: string;
      institution: string;
      year: number;
      identifier: string;
      originLabel: string;
      originType: 'earth' | 'moon' | 'mars';
      action: () => void;
    }[] = [];

    EARTH_ANALOG_SITES.forEach((site) => {
      site.sources.forEach((src) => {
        items.push({
          ...src,
          originLabel: site.name[locale],
          originType: 'earth',
          action: () => navigate('location', { locationId: site.id }),
        });
      });
    });

    REGION_IDS.forEach((rid) => {
      const reg = PLANETARY_REGIONS[rid];
      reg.sources.forEach((src) => {
        items.push({
          ...src,
          originLabel: reg.name[locale],
          originType: reg.planet,
          action: () => navigate(reg.planet === 'moon' ? 'moon' : 'mars'),
        });
      });
    });

    const q = researchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.institution.toLowerCase().includes(q) ||
        item.identifier.toLowerCase().includes(q) ||
        item.originLabel.toLowerCase().includes(q)
    );
  }, [locale, navigate, researchQuery]);

  const handleExportMatrixCsv = () => {
    const header = [
      'Site/Region',
      'Body',
      'Mean Temp (C)',
      'Elevation (m)',
      'Mean Slope (deg)',
      'RMS Roughness (deg)',
      'Water/Ice (wt%)',
      'Pressure (kPa)',
      'Albedo',
    ];
    const earthRows = EARTH_ANALOG_SITES.map((s) => [
      s.name.en,
      'Earth',
      s.metrics.meanTempC ?? 'NULL',
      s.metrics.elevationM ?? 'NULL',
      s.metrics.meanSlopeDeg ?? 'NULL',
      s.metrics.roughnessIndexDeg ?? 'NULL',
      s.metrics.waterIcePct ?? 'NULL',
      s.metrics.atmosphericPressureKpa ?? 'NULL',
      s.metrics.albedo ?? 'NULL',
    ]);
    const planetRows = REGION_IDS.map((rid) => {
      const r = PLANETARY_REGIONS[rid];
      return [
        r.name.en,
        r.planet.toUpperCase(),
        r.metrics.meanTempC ?? 'NULL',
        r.metrics.elevationM ?? 'NULL',
        r.metrics.meanSlopeDeg ?? 'NULL',
        r.metrics.roughnessIndexDeg ?? 'NULL',
        r.metrics.waterIcePct ?? 'NULL',
        r.metrics.atmosphericPressureKpa ?? 'NULL',
        r.metrics.albedo ?? 'NULL',
      ];
    });
    const csv = [header, ...earthRows, ...planetRows]
      .map((row) => row.map((v) => `"${v}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terratwin-scientific-matrix.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: ScientistTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'telemetry',
      label: locale === 'ar' ? 'البيانات العلمية والقياس المباشر' : 'Scientific Data & Telemetry',
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: 'comparison',
      label: locale === 'ar' ? 'مقارنة الأرض والقمر والمريخ والرسوم' : 'Comparison & Data Visualization',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'research',
      label: locale === 'ar' ? 'الدراسات والمراجع العلمية' : 'Research Studies & References',
      icon: <BookMarked className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-8">
      <TrackHeader
        activeRole="scientist"
        accentColor="#3B82F6"
        title={
          locale === 'ar'
            ? '🔬 مختبر العالم: التحليل والبيانات الدقيقة'
            : '🔬 Scientist Research Workbench'
        }
        subtitle={
          locale === 'ar'
            ? 'حلّل مصفوفات القياس الأرضية والكوكبية، قارن الأطياف المعدنية والخشونة، وصدّر البيانات الموثقة مع حفظ القيم المفقودة بصدق علمي.'
            : 'Analyze multi-parameter analog matrices, evaluate mineralogical and climatic telemetry, and export verified scientific datasets without fabricated baselines.'
        }
      />

      {/* Internal Section Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm dark:shadow-[0_0_24px_-4px_rgba(59,130,246,0.65)]'
                  : 'bg-white dark:bg-[#05080F] text-[#101B2B] dark:text-[#F7F8FA] border-[#101B2B]/12 dark:border-white/10 hover:border-[#3B82F6]/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton variant="secondary" size="sm" onClick={handleExportMatrixCsv}>
            <Download className="w-4 h-4" />
            <span>{locale === 'ar' ? 'تصدير المصفوفة CSV' : 'Export Matrix CSV'}</span>
          </ActionButton>
          <ActionButton
            variant="primary"
            size="sm"
            onClick={() =>
              navigate('compare', {
                compareSiteId: selectedSiteId,
                compareRegionId: selectedRegionId,
              })
            }
          >
            <span>{locale === 'ar' ? 'فتح استوديو المقارنة الكامل' : 'Open Full Compare Studio'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </ActionButton>
        </div>
      </div>

      {/* TAB 1: Scientific Data & Live Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="space-y-8">
          {/* Live Telemetry Feeds (Open-Meteo + NASA Perseverance/EONET) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SurfacePanel className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#218385] dark:text-[#2A9D9F]" />
                  <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {locale === 'ar'
                      ? 'قياسات الطقس الميدانية المباشرة (Open-Meteo)'
                      : 'Live Ground Station Telemetry (Open-Meteo)'}
                  </h2>
                </div>
                <select
                  aria-label="Select Earth Station"
                  value={selectedSiteId}
                  onChange={(e) => setSelectedSiteId(e.target.value)}
                  className="rounded-lg border border-[#101B2B]/15 dark:border-white/15 bg-[#F7F8FA] dark:bg-[#04070D] px-3 py-1.5 text-xs font-medium text-[#101B2B] dark:text-[#F7F8FA]"
                >
                  {EARTH_ANALOG_SITES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name[locale]}
                    </option>
                  ))}
                </select>
              </div>

              {weatherLoading ? (
                <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'جاري استعلام محطة الرصد...' : 'Querying ground station...'}
                </p>
              ) : liveWeather && liveWeather.source === 'live-open-meteo' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#101B2B]/10 dark:border-white/10 pt-3">
                  <MetricReadout
                    label={locale === 'ar' ? 'الحرارة الآنية' : 'Air Temp'}
                    value={liveWeather.temperatureC !== null ? liveWeather.temperatureC.toFixed(1) : 'Null'}
                    unit="°C"
                    accentColor="teal"
                  />
                  <MetricReadout
                    label={locale === 'ar' ? 'الرطوبة النسبية' : 'Humidity'}
                    value={liveWeather.humidityPct !== null ? `${liveWeather.humidityPct}` : 'Null'}
                    unit="%"
                  />
                  <MetricReadout
                    label={locale === 'ar' ? 'الرياح' : 'Wind Speed'}
                    value={liveWeather.windSpeedKmh !== null ? liveWeather.windSpeedKmh.toFixed(1) : 'Null'}
                    unit="km/h"
                  />
                  <MetricReadout
                    label={locale === 'ar' ? 'الضغط الجوي' : 'Surface Pressure'}
                    value={liveWeather.pressureKpa !== null ? liveWeather.pressureKpa.toFixed(1) : 'Null'}
                    unit="kPa"
                  />
                </div>
              ) : (
                <p className="text-xs text-[#B84A27] dark:text-[#E58464]">
                  {locale === 'ar'
                    ? 'محطة الرصد الحية غير متاحة حاليًا (يُعرض عدم التوفر بصدق دون بيانات وهمية).'
                    : 'Live Open-Meteo station currently unavailable (honest status preserved; no fabricated fallback).'}
                </p>
              )}
            </SurfacePanel>

            <SurfacePanel className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#B84A27] dark:text-[#D96B43]" />
                  <h2 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {locale === 'ar'
                      ? 'بث مهام المريخ والأرض من NASA'
                      : 'NASA Planetary & EONET Telemetry'}
                  </h2>
                </div>
                {nasaFeed && (
                  <span className="text-[11px] font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
                    {nasaFeed.perseverance.source}
                  </span>
                )}
              </div>

              {nasaLoading ? (
                <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'جاري تحميل بيانات NASA...' : 'Loading NASA mission feed...'}
                </p>
              ) : nasaFeed ? (
                <div className="space-y-3 border-t border-[#101B2B]/10 dark:border-white/10 pt-3">
                  <div className="grid grid-cols-3 gap-4">
                    <MetricReadout
                      label={locale === 'ar' ? 'آخر يوم مريخي (Sol)' : 'Perseverance Max Sol'}
                      value={nasaFeed.perseverance.maxSol !== null ? `${nasaFeed.perseverance.maxSol}` : 'Null'}
                      accentColor="mars"
                    />
                    <MetricReadout
                      label={locale === 'ar' ? 'أحدث تاريخ' : 'Latest Earth Date'}
                      value={nasaFeed.perseverance.maxDate ?? 'Null'}
                    />
                    <MetricReadout
                      label={locale === 'ar' ? 'حالة المهمة' : 'Rover Status'}
                      value={nasaFeed.perseverance.status}
                      accentColor="teal"
                    />
                  </div>
                  {nasaFeed.earthEvents.length > 0 && (
                    <div className="text-xs text-[#4A596C] dark:text-[#A6B7CA] space-y-1">
                      <p className="font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                        {locale === 'ar' ? 'أحداث طبيعية مرصودة (NASA EONET):' : 'Active Earth Events (NASA EONET):'}
                      </p>
                      {nasaFeed.earthEvents.slice(0, 2).map((ev) => (
                        <p key={ev.id} className="truncate">
                          · {ev.title} ({ev.category})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#B84A27] dark:text-[#E58464]">
                  {locale === 'ar'
                    ? 'تعذر الاتصال بخادم بيانات ناسا حاليًا.'
                    : 'NASA telemetry service unavailable.'}
                </p>
              )}
            </SurfacePanel>
          </div>

          {/* Complete Scientific Parameter Matrix */}
          <SurfacePanel className="overflow-hidden">
            <div className="p-6 border-b border-[#101B2B]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar'
                    ? 'المصفوفة الكمية الشاملة (7 نظائر أرضية + 4 أقاليم كوكبية)'
                    : 'Complete Multi-Planet Parameter Matrix (7 Earth Analogs + 4 Planetary Targets)'}
                </h2>
                <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] mt-1">
                  {locale === 'ar'
                    ? 'ملاحظة: أي خانة تفتقر إلى قياس معياري موثق (مثل خشونة الليدار 1م أو البياض في القطب الكندي) تُعرض صراحةً كـ Null.'
                    : 'Integrity Note: Unverified standardized baselines (e.g., 1m LiDAR RMS roughness or snow-free albedo in Axel Heiberg) remain explicitly Null.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#101B2B]/10 dark:border-white/10 bg-[#EEF2F6]/70 dark:bg-[#04070D]/60 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الموقع / الإقليم' : 'Site / Region'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الكوكب' : 'Body'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'متوسط الحرارة' : 'Mean Temp'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الارتفاع' : 'Elevation'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الانحدار' : 'Mean Slope'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الخشونة RMS' : 'RMS Roughness'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'الماء/الجليد' : 'H₂O / Ice'}
                    </th>
                    <th className="py-3.5 px-4 text-start font-medium">
                      {locale === 'ar' ? 'البياض' : 'Albedo'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#101B2B]/8 dark:divide-white/8">
                  {EARTH_ANALOG_SITES.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedSiteId(s.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedSiteId === s.id
                          ? 'bg-[#3B82F6]/10 dark:bg-[#3B82F6]/15'
                          : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('location', { locationId: s.id });
                          }}
                          className="text-start hover:underline text-[#218385] dark:text-[#2A9D9F] cursor-pointer"
                        >
                          {s.name[locale]}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#218385] dark:text-[#2A9D9F]">
                        {locale === 'ar' ? 'الأرض' : 'Earth'}
                      </td>
                      <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                        {s.metrics.meanTempC !== null ? `${s.metrics.meanTempC.toFixed(1)} °C` : 'Null'}
                      </td>
                      <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                        {s.metrics.elevationM !== null ? `${s.metrics.elevationM.toLocaleString()} m` : 'Null'}
                      </td>
                      <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                        {s.metrics.meanSlopeDeg !== null ? `${s.metrics.meanSlopeDeg.toFixed(1)}°` : 'Null'}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono-tabular ${
                          s.metrics.roughnessIndexDeg === null ? 'text-[#B84A27] dark:text-[#E58464]' : ''
                        }`}
                        dir="ltr"
                      >
                        {s.metrics.roughnessIndexDeg !== null
                          ? `${s.metrics.roughnessIndexDeg.toFixed(1)}°`
                          : 'Null (Missing)'}
                      </td>
                      <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                        {s.metrics.waterIcePct !== null ? `${s.metrics.waterIcePct.toFixed(1)} wt%` : 'Null'}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono-tabular ${
                          s.metrics.albedo === null ? 'text-[#B84A27] dark:text-[#E58464]' : ''
                        }`}
                        dir="ltr"
                      >
                        {s.metrics.albedo !== null ? s.metrics.albedo.toFixed(2) : 'Null'}
                      </td>
                    </tr>
                  ))}

                  {REGION_IDS.map((rid) => {
                    const r = PLANETARY_REGIONS[rid];
                    return (
                      <tr
                        key={rid}
                        onClick={() => setSelectedRegionId(rid)}
                        className={`cursor-pointer transition-colors ${
                          selectedRegionId === rid
                            ? 'bg-[#D96B43]/10 dark:bg-[#D96B43]/15'
                            : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                          {r.name[locale]}
                        </td>
                        <td
                          className={`py-3.5 px-4 text-xs font-medium ${
                            r.planet === 'mars'
                              ? 'text-[#B84A27] dark:text-[#D96B43]'
                              : 'text-[#64748B] dark:text-[#CBD5E1]'
                          }`}
                        >
                          {t.explorer.targets[r.planet]}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.meanTempC !== null ? `${r.metrics.meanTempC.toFixed(1)} °C` : 'Null'}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.elevationM !== null ? `${r.metrics.elevationM.toLocaleString()} m` : 'Null'}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.meanSlopeDeg !== null ? `${r.metrics.meanSlopeDeg.toFixed(1)}°` : 'Null'}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.roughnessIndexDeg !== null
                            ? `${r.metrics.roughnessIndexDeg.toFixed(1)}°`
                            : 'Null'}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.waterIcePct !== null ? `${r.metrics.waterIcePct.toFixed(2)} wt%` : 'Null'}
                        </td>
                        <td className="py-3.5 px-4 font-mono-tabular" dir="ltr">
                          {r.metrics.albedo !== null ? r.metrics.albedo.toFixed(2) : 'Null'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SurfacePanel>
        </div>
      )}

      {/* TAB 2: Comparison & Data Visualization */}
      {activeTab === 'comparison' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SurfacePanel className="p-5 space-y-2">
              <label className="block text-xs font-medium text-[#218385] dark:text-[#2A9D9F]">
                {t.compare.selectEarthSite}
              </label>
              <select
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                className="w-full rounded-lg border border-[#101B2B]/15 dark:border-white/15 bg-[#F7F8FA] dark:bg-[#04070D] px-3.5 py-2.5 text-sm font-medium"
              >
                {EARTH_ANALOG_SITES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name[locale]} ({s.country[locale]})
                  </option>
                ))}
              </select>
            </SurfacePanel>

            <SurfacePanel className="p-5 space-y-2">
              <label className="block text-xs font-medium text-[#9C7F50] dark:text-[#D9C5A3]">
                {t.compare.selectPlanetaryTarget}
              </label>
              <select
                value={selectedRegionId}
                onChange={(e) => setSelectedRegionId(e.target.value as PlanetaryRegionId)}
                className="w-full rounded-lg border border-[#101B2B]/15 dark:border-white/15 bg-[#F7F8FA] dark:bg-[#04070D] px-3.5 py-2.5 text-sm font-medium"
              >
                {REGION_IDS.map((rid) => (
                  <option key={rid} value={rid}>
                    {t.explorer.targets[PLANETARY_REGIONS[rid].planet]} ·{' '}
                    {PLANETARY_REGIONS[rid].name[locale]}
                  </option>
                ))}
              </select>
            </SurfacePanel>
          </div>

          <SurfacePanel className="p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-mono-tabular text-[#3B82F6]">
                {selectedSite.name[locale]} ↔ {selectedRegion.name[locale]}
              </p>
              <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {comparison.isReliable && comparison.overallScore !== null
                  ? locale === 'ar'
                    ? `معامل التطابق المركب: ${comparison.overallScore}%`
                    : `Composite Similarity Index: ${comparison.overallScore}%`
                  : locale === 'ar'
                  ? 'التقييم المركب محجوب لنقص البيانات المعيارية'
                  : 'Composite Score Withheld (Incomplete Verified Baselines)'}
              </h2>
              <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] max-w-2xl">
                {selectedRegion.adaptiveOverview.scientist[locale]}
              </p>
            </div>
            <ActionButton
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate('compare', {
                  compareSiteId: selectedSiteId,
                  compareRegionId: selectedRegionId,
                })
              }
            >
              <span>{locale === 'ar' ? 'تحكم بالأوزان العلمية' : 'Adjust Axis Weights'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </ActionButton>
          </SurfacePanel>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <SurfacePanel className="lg:col-span-5 p-6 space-y-4">
              <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {t.compare.radarTitle}
              </h3>
              <RadarComparisonChart
                axes={comparison.axes}
                axisLabels={t.compare.axisNames}
                earthLabel={selectedSite.name[locale]}
                planetLabel={selectedRegion.name[locale]}
                planetType={selectedRegion.planet}
              />
            </SurfacePanel>

            <div className="lg:col-span-7 space-y-6">
              <SurfacePanel className="p-6 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.compare.barChartTitle}
                </h3>
                <AxisAlignmentBarChart
                  axes={comparison.axes}
                  axisLabels={t.compare.axisNames}
                  nullLabel={t.compare.nullIncompleteLabel}
                />
              </SurfacePanel>

              <SurfacePanel className="p-6 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {t.compare.thermalLineTitle}
                </h3>
                <ThermalLineChart
                  primarySeries={selectedSite.thermalProfile24h}
                  primaryLabel={selectedSite.name[locale]}
                  secondarySeries={selectedRegion.thermalProfile24h}
                  secondaryLabel={selectedRegion.name[locale]}
                  secondaryAccent={selectedRegion.planet}
                />
              </SurfacePanel>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Research Studies & Scientific References */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {locale === 'ar'
                  ? 'الأوراق المحكّمة وقواعد بيانات ناسا والمسوحات الميدانية'
                  : 'Peer-Reviewed Papers, NASA PDS Datasets & Field Literature'}
              </h2>
              <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] mt-1">
                {locale === 'ar'
                  ? `عرض ${allResearchSources.length} مرجعًا علميًا موثقًا.`
                  : `Showing ${allResearchSources.length} verified scientific references.`}
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#4A596C] dark:text-[#A6B7CA] absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder={
                  locale === 'ar' ? 'ابحث بالعنوان أو DOI أو المؤسسة...' : 'Filter by title, DOI, or agency...'
                }
                className="w-full rounded-lg border border-[#101B2B]/15 dark:border-white/15 bg-white dark:bg-[#070B12] ps-9 pe-3 py-2 text-xs text-[#101B2B] dark:text-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allResearchSources.map((src) => (
              <SurfacePanel key={`${src.id}-${src.originLabel}`} className="p-5 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`font-medium ${
                        src.originType === 'mars'
                          ? 'text-[#B84A27] dark:text-[#D96B43]'
                          : src.originType === 'moon'
                          ? 'text-[#64748B] dark:text-[#CBD5E1]'
                          : 'text-[#218385] dark:text-[#2A9D9F]'
                      }`}
                    >
                      {src.originLabel}
                    </span>
                    <span className="font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
                      {src.year}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {src.title}
                  </h3>
                  <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                    {src.institution}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#101B2B]/10 dark:border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono-tabular text-[#3B82F6]" dir="ltr">
                    {src.identifier}
                  </span>
                  <button
                    type="button"
                    onClick={src.action}
                    className="text-xs font-medium text-[#218385] dark:text-[#2A9D9F] hover:underline cursor-pointer"
                  >
                    {locale === 'ar' ? 'فتح السجل العلمي' : 'Open Record'}
                  </button>
                </div>
              </SurfacePanel>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
