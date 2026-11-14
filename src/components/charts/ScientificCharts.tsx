import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ComparisonAxisScore,
  EarthAnalogSite,
  LocaleCode,
  PlanetTargetId,
  TerrainProfilePoint,
  ThermalSamplePoint,
} from '../../types/terratwin';

interface RadarProps {
  axes: ComparisonAxisScore[];
  axisLabels: Record<ComparisonAxisScore['key'], string>;
  earthLabel: string;
  planetLabel: string;
  planetType: PlanetTargetId;
}

export const RadarComparisonChart: React.FC<RadarProps> = ({
  axes,
  axisLabels,
  earthLabel,
  planetLabel,
  planetType,
}) => {
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 112;
  const levels = [0.25, 0.5, 0.75, 1];
  const angleStep = (Math.PI * 2) / axes.length;

  const planetStroke = planetType === 'mars' ? '#D96B43' : '#94A3B8';
  const planetFill = planetType === 'mars' ? 'rgba(217, 107, 67, 0.22)' : 'rgba(148, 163, 184, 0.24)';

  const getPoint = (index: number, normalizedVal: number | null) => {
    const angle = index * angleStep - Math.PI / 2;
    const ratio = normalizedVal === null ? 0 : Math.max(0.08, normalizedVal / 100);
    return {
      x: cx + Math.cos(angle) * maxR * ratio,
      y: cy + Math.sin(angle) * maxR * ratio,
    };
  };

  const earthPoints = axes.map((a, idx) => getPoint(idx, a.earthNormalized));
  const planetPoints = axes.map((a, idx) => getPoint(idx, a.planetNormalized));

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[340px] h-auto overflow-visible"
        role="img"
        aria-label="Multi-axis scientific comparison radar chart"
      >
        {/* Concentric grid polygons */}
        {levels.map((lvl) => {
          const pts = axes.map((_, idx) => {
            const angle = idx * angleStep - Math.PI / 2;
            return `${(cx + Math.cos(angle) * maxR * lvl).toFixed(1)},${(
              cy +
              Math.sin(angle) * maxR * lvl
            ).toFixed(1)}`;
          });
          return (
            <polygon
              key={lvl}
              points={pts.join(' ')}
              fill="none"
              className="stroke-[#101B2B]/12 dark:stroke-white/12"
              strokeWidth="1"
            />
          );
        })}

        {/* Radial spoke axes & labels */}
        {axes.map((axis, idx) => {
          const angle = idx * angleStep - Math.PI / 2;
          const x2 = cx + Math.cos(angle) * maxR;
          const y2 = cy + Math.sin(angle) * maxR;
          const labelR = maxR + 24;
          const lx = cx + Math.cos(angle) * labelR;
          const ly = cy + Math.sin(angle) * labelR;
          const isNull = axis.earthNormalized === null || axis.planetNormalized === null;

          return (
            <g key={axis.key}>
              <line
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                className={isNull ? 'stroke-[#B84A27]/45' : 'stroke-[#101B2B]/15 dark:stroke-white/15'}
                strokeWidth="1"
                strokeDasharray={isNull ? '3 3' : undefined}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#101B2B] dark:fill-[#F7F8FA] text-[11px] font-medium"
              >
                {axisLabels[axis.key]}
                {isNull ? ' (∅)' : ''}
              </text>
            </g>
          );
        })}

        {/* Planetary Target Polygon */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, d: toPath(planetPoints) }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          fill={planetFill}
          stroke={planetStroke}
          strokeWidth="2"
        />

        {/* Earth Analog Polygon */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, d: toPath(earthPoints) }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          fill="rgba(42, 157, 159, 0.22)"
          stroke="#2A9D9F"
          strokeWidth="2"
        />

        {/* Vertex dots */}
        {earthPoints.map((pt, idx) => (
          <circle
            key={`e-${axes[idx].key}`}
            cx={pt.x}
            cy={pt.y}
            r="3.5"
            fill={axes[idx].earthNormalized === null ? '#B84A27' : '#2A9D9F'}
          />
        ))}
        {planetPoints.map((pt, idx) => (
          <circle
            key={`p-${axes[idx].key}`}
            cx={pt.x}
            cy={pt.y}
            r="3.5"
            fill={planetStroke}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-2 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-0.5 bg-[#2A9D9F]" />
          <span>{earthLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-0.5"
            style={{ backgroundColor: planetStroke }}
          />
          <span>{planetLabel}</span>
        </div>
      </div>
    </div>
  );
};

interface ThermalLineChartProps {
  primarySeries: ThermalSamplePoint[];
  primaryLabel: string;
  secondarySeries?: ThermalSamplePoint[];
  secondaryLabel?: string;
  secondaryAccent?: 'moon' | 'mars';
}

export const ThermalLineChart: React.FC<ThermalLineChartProps> = ({
  primarySeries,
  primaryLabel,
  secondarySeries,
  secondaryLabel,
  secondaryAccent = 'mars',
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const width = 560;
  const height = 220;
  const padL = 46;
  const padR = 20;
  const padT = 20;
  const padB = 34;

  const allTemps = [
    ...primarySeries.map((d) => d.tempC),
    ...(secondarySeries ? secondarySeries.map((d) => d.tempC) : []),
  ];
  const minT = Math.floor(Math.min(...allTemps, -20) / 20) * 20;
  const maxT = Math.ceil(Math.max(...allTemps, 20) / 20) * 20;
  const rangeT = Math.max(20, maxT - minT);

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = (idx: number, len: number) =>
    padL + (idx / Math.max(1, len - 1)) * plotW;
  const getY = (temp: number) =>
    padT + plotH - ((temp - minT) / rangeT) * plotH;

  const buildPath = (series: ThermalSamplePoint[]) =>
    series
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i, series.length).toFixed(1)} ${getY(pt.tempC).toFixed(1)}`)
      .join(' ');

  const secondaryColor = secondaryAccent === 'mars' ? '#D96B43' : '#94A3B8';
  const yTicks = [minT, Math.round((minT + maxT) / 2), maxT];

  const activeIdx = hoverIdx ?? Math.floor(primarySeries.length / 2);
  const activePrimary = primarySeries[activeIdx];
  const activeSecondary = secondarySeries?.[activeIdx];

  return (
    <div className="space-y-3" dir="ltr">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#101B2B] dark:text-[#F7F8FA]">
            <span className="inline-block w-3.5 h-0.5 bg-[#2A9D9F]" />
            <span>{primaryLabel}</span>
          </div>
          {secondarySeries && secondaryLabel && (
            <div className="flex items-center gap-2 text-[#101B2B] dark:text-[#F7F8FA]">
              <span
                className="inline-block w-3.5 h-0.5 border-b-2 border-dashed"
                style={{ borderColor: secondaryColor }}
              />
              <span>{secondaryLabel}</span>
            </div>
          )}
        </div>

        {activePrimary && (
          <div className="font-mono-tabular text-[11px] text-[#4A596C] dark:text-[#D9C5A3]">
            <span>{activePrimary.hourOrSol} · </span>
            <span className="text-[#218385] dark:text-[#2A9D9F] font-semibold">
              {activePrimary.tempC}°C
            </span>
            {activeSecondary && (
              <>
                <span> / </span>
                <span style={{ color: secondaryColor }} className="font-semibold">
                  {activeSecondary.tempC}°C
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto cursor-crosshair select-none"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {/* Horizontal gridlines */}
        {yTicks.map((val) => {
          const y = getY(val);
          return (
            <g key={val}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                className="stroke-[#101B2B]/10 dark:stroke-white/10"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-[#4A596C] dark:fill-[#A6B7CA] text-[10px] font-mono-tabular"
              >
                {val}°
              </text>
            </g>
          );
        })}

        {/* Zero Celsius reference if inside range */}
        {minT < 0 && maxT > 0 && (
          <line
            x1={padL}
            y1={getY(0)}
            x2={width - padR}
            y2={getY(0)}
            className="stroke-[#D9C5A3]/45"
            strokeDasharray="2 4"
            strokeWidth="1"
          />
        )}

        {/* Secondary curve (Planet) */}
        {secondarySeries && (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
            d={buildPath(secondarySeries)}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        )}

        {/* Primary curve (Earth or selected region) */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
          d={buildPath(primarySeries)}
          fill="none"
          stroke="#2A9D9F"
          strokeWidth="2.5"
        />

        {/* Crosshair vertical line */}
        {hoverIdx !== null && (
          <line
            x1={getX(hoverIdx, primarySeries.length)}
            y1={padT}
            x2={getX(hoverIdx, primarySeries.length)}
            y2={height - padB}
            className="stroke-[#101B2B]/25 dark:stroke-[#D9C5A3]/40"
            strokeWidth="1"
          />
        )}

        {/* Interactive hover hit zones and data points */}
        {primarySeries.map((pt, i) => {
          const x = getX(i, primarySeries.length);
          const y1 = getY(pt.tempC);
          const y2 = secondarySeries?.[i] ? getY(secondarySeries[i].tempC) : null;
          return (
            <g key={pt.hourOrSol}>
              <text
                x={x}
                y={height - 10}
                textAnchor="middle"
                className="fill-[#4A596C] dark:fill-[#A6B7CA] text-[10px] font-mono-tabular"
              >
                {pt.hourOrSol}
              </text>
              <circle
                cx={x}
                cy={y1}
                r={hoverIdx === i ? 4.5 : 3}
                fill="#2A9D9F"
              />
              {y2 !== null && (
                <circle
                  cx={x}
                  cy={y2}
                  r={hoverIdx === i ? 4.5 : 3}
                  fill={secondaryColor}
                />
              )}
              <rect
                x={x - plotW / (primarySeries.length * 2)}
                y={padT}
                width={plotW / primarySeries.length}
                height={plotH + 10}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const AxisAlignmentBarChart: React.FC<{
  axes: ComparisonAxisScore[];
  axisLabels: Record<ComparisonAxisScore['key'], string>;
  nullLabel?: string;
}> = ({ axes, axisLabels, nullLabel = 'Null / Incomplete' }) => {
  return (
    <div className="space-y-4">
      {axes.map((axis) => {
        const isNull = axis.similarityPct === null;
        return (
          <div key={axis.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                {axisLabels[axis.key]}
              </span>
              <span className="font-mono-tabular text-[#4A596C] dark:text-[#D9C5A3]">
                {isNull ? `∅ ${nullLabel}` : `${axis.similarityPct}%`}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#101B2B]/8 dark:bg-white/10 overflow-hidden">
              {isNull ? (
                <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(184,74,39,0.25)_6px,rgba(184,74,39,0.25)_12px)]" />
              ) : (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${axis.similarityPct}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-[#218385] dark:bg-[#2A9D9F]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TerrainProfileChart: React.FC<{
  profile: TerrainProfilePoint[];
  planet: PlanetTargetId;
  locale: LocaleCode;
}> = ({ profile, planet, locale }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const width = 560;
  const height = 210;
  const padL = 52;
  const padR = 22;
  const padT = 26;
  const padB = 34;

  const elevations = profile.map((p) => p.elevationM);
  const minE = Math.min(...elevations) - 350;
  const maxE = Math.max(...elevations) + 350;
  const rangeE = Math.max(500, maxE - minE);
  const maxDist = Math.max(1, profile[profile.length - 1]?.distanceKm ?? 30);

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = (dist: number) => padL + (dist / maxDist) * plotW;
  const getY = (elev: number) => padT + plotH - ((elev - minE) / rangeE) * plotH;

  const linePath = profile
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.distanceKm).toFixed(1)} ${getY(pt.elevationM).toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${getX(profile[profile.length - 1].distanceKm).toFixed(1)} ${(
    padT + plotH
  ).toFixed(1)} L ${getX(profile[0].distanceKm).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

  const strokeColor = planet === 'mars' ? '#D96B43' : '#94A3B8';
  const fillGradId = `terrain-grad-${planet}`;
  const activePt = hoverIdx !== null ? profile[hoverIdx] : null;

  return (
    <div className="space-y-2" dir="ltr">
      <div className="flex items-center justify-between text-xs font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
        <span>
          {planet === 'mars'
            ? locale === 'ar'
              ? 'مرجع MOLA'
              : 'MOLA Datum'
            : locale === 'ar'
            ? 'مرجع LOLA'
            : 'LOLA Datum'}
        </span>
        {activePt ? (
          <span className="text-[#101B2B] dark:text-[#F7F8FA] font-semibold">
            {activePt.distanceKm} {locale === 'ar' ? 'كم' : 'km'} ·{' '}
            {activePt.elevationM.toLocaleString()} {locale === 'ar' ? 'م' : 'm'}
            {activePt.landmark ? ` (${activePt.landmark[locale]})` : ''}
          </span>
        ) : (
          <span>
            {locale === 'ar' ? `مقطع 0 — ${maxDist} كم` : `0 — ${maxDist} km transect`}
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto cursor-crosshair select-none"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={fillGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.38" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {[minE + 350, Math.round((minE + maxE) / 2), maxE - 350].map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                className="stroke-[#101B2B]/10 dark:stroke-white/10"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-[#4A596C] dark:fill-[#A6B7CA] text-[10px] font-mono-tabular"
              >
                {tick}m
              </text>
            </g>
          );
        })}

        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          d={areaPath}
          fill={`url(#${fillGradId})`}
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.65 }}
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
        />

        {profile.map((pt, i) => {
          const x = getX(pt.distanceKm);
          const y = getY(pt.elevationM);
          return (
            <g key={pt.distanceKm}>
              <text
                x={x}
                y={height - 10}
                textAnchor="middle"
                className="fill-[#4A596C] dark:fill-[#A6B7CA] text-[10px] font-mono-tabular"
              >
                {pt.distanceKm}km
              </text>
              {pt.landmark && (
                <text
                  x={x}
                  y={Math.max(12, y - 10)}
                  textAnchor="middle"
                  className="fill-[#101B2B] dark:fill-[#F7F8FA] text-[10px] font-medium"
                >
                  {pt.landmark[locale]}
                </text>
              )}
              <circle
                cx={x}
                cy={y}
                r={hoverIdx === i ? 4.5 : pt.landmark ? 3.5 : 2}
                fill={strokeColor}
              />
              <rect
                x={x - plotW / (profile.length * 2)}
                y={padT}
                width={plotW / profile.length}
                height={plotH + 10}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const StudentFormationDiagram: React.FC<{
  site: EarthAnalogSite;
  locale: LocaleCode;
}> = ({ site, locale }) => {
  const title =
    locale === 'ar'
      ? 'مقطع جيولوجي مبسط: آلية التشكل التناظري'
      : 'Educational Cross-Section: Analog Formation Mechanism';

  const layerTop =
    site.category === 'hyper-arid' || site.category === 'evaporite-playa'
      ? locale === 'ar'
        ? 'قشرة ملحية وبيركلورات مؤكسدة'
        : 'Evaporite Crust & Perchlorate Layer'
      : site.category === 'polar-cryogenic'
      ? locale === 'ar'
        ? 'مضلعات سطحية جافة فوق جليد مدفون'
        : 'Dry Contraction Polygons Over Buried Ice'
      : site.category === 'impact-crater'
      ? locale === 'ar'
        ? 'بريشيا تصادمية وحواف فوهة متكسرة'
        : 'Impact Melt Breccia & Fractured Rim'
      : locale === 'ar'
      ? 'رماد بازلتي وتدفقات حمم مسامية'
      : 'Basaltic Tephra & Vesicular Lava Flows';

  const layerBase =
    locale === 'ar'
      ? 'صخر أساس كوكبي مكافئ (بازلت / كربونات)'
      : 'Planetary Analog Bedrock (Basalt / Dolomite)';

  return (
    <div className="rounded-xl border border-[#101B2B]/10 dark:border-[#D9C5A3]/15 bg-[#EEF2F6]/70 dark:bg-[#04070D]/80 p-4">
      <p className="text-xs font-semibold text-[#218385] dark:text-[#2A9D9F] mb-3">{title}</p>
      <svg viewBox="0 0 480 120" className="w-full h-auto">
        {/* Sky / Atmosphere band */}
        <rect x="0" y="0" width="480" height="36" rx="4" className="fill-[#2A9D9F]/10" />
        <text
          x="16"
          y="22"
          className="fill-[#4A596C] dark:fill-[#A6B7CA] text-[11px]"
        >
          {site.metrics.atmosphericPressureKpa} kPa · {site.metrics.meanTempC}°C avg
        </text>
        {/* Top regolith / analog crust */}
        <path
          d="M 0 42 Q 120 34 240 42 T 480 40 L 480 74 L 0 74 Z"
          className="fill-[#D9C5A3]/45 dark:fill-[#D9C5A3]/25 stroke-[#9C7F50] dark:stroke-[#D9C5A3]"
          strokeWidth="1.2"
        />
        <text
          x="16"
          y="60"
          className="fill-[#101B2B] dark:fill-[#F7F8FA] text-[11px] font-medium"
        >
          {layerTop}
        </text>
        {/* Subsurface bedrock */}
        <rect
          x="0"
          y="74"
          width="480"
          height="42"
          rx="4"
          className="fill-[#101B2B]/15 dark:fill-[#0B111C] stroke-[#101B2B]/25 dark:stroke-white/15"
          strokeWidth="1"
        />
        <text
          x="16"
          y="99"
          className="fill-[#101B2B] dark:fill-[#CBD5E1] text-[11px]"
        >
          {layerBase}
        </text>
      </svg>
    </div>
  );
};
