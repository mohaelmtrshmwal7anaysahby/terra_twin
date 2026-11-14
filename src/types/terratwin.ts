export type ExperienceLevel = 'explorer' | 'student' | 'scientist' | 'pioneer';

export type UserRole = 'explorer' | 'student' | 'scientist' | 'astronaut';

export type LocaleCode = 'en' | 'ar';

export type ThemeMode = 'dark' | 'light';

export type RoutePage =
  | 'welcome'
  | 'home'
  | 'explorer-hub'
  | 'student-hub'
  | 'scientist-hub'
  | 'astronaut-hub'
  | 'about'
  | 'settings'
  | 'moon'
  | 'mars'
  | 'explorer'
  | 'compare'
  | 'location';

export type PlanetTargetId = 'moon' | 'mars';

export type PlanetaryRegionId =
  | 'moon-mare'
  | 'moon-south-pole'
  | 'mars-jezero'
  | 'mars-gale';

export type EnvironmentCategory =
  | 'hyper-arid'
  | 'polar-cryogenic'
  | 'volcanic-basalt'
  | 'impact-crater'
  | 'evaporite-playa';

export type DataQualityLevel = 'verified' | 'orbital-estimate' | 'incomplete';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface LevelAdaptiveText {
  explorer: BilingualText;
  student: BilingualText;
  scientist: BilingualText;
  pioneer: BilingualText;
}

export interface SourceReference {
  id: string;
  title: string;
  institution: string;
  year: number;
  identifier: string;
}

export interface MineralComponent {
  name: BilingualText;
  formula: string;
  percentage: number | null;
}

export interface ThermalSamplePoint {
  hourOrSol: string;
  tempC: number;
}

export interface TerrainProfilePoint {
  distanceKm: number;
  elevationM: number;
  landmark?: BilingualText;
}

export interface EarthAnalogSite {
  id: string;
  name: BilingualText;
  region: BilingualText;
  country: BilingualText;
  coordinates: {
    lat: number;
    lng: number;
    label: string;
  };
  category: EnvironmentCategory;
  primaryTwin: 'mars' | 'moon' | 'both';
  image: string;
  researchFocus: BilingualText;
  geologyTags: BilingualText[];
  adaptiveSummary: LevelAdaptiveText;
  metrics: {
    meanTempC: number | null;
    tempMinC: number | null;
    tempMaxC: number | null;
    elevationM: number | null;
    meanSlopeDeg: number | null;
    roughnessIndexDeg: number | null;
    waterIcePct: number | null;
    atmosphericPressureKpa: number | null;
    albedo: number | null;
  };
  metricQuality: {
    thermal: DataQualityLevel;
    elevation: DataQualityLevel;
    slope: DataQualityLevel;
    roughness: DataQualityLevel;
    waterIce: DataQualityLevel;
    mineralogy: DataQualityLevel;
  };
  missingDataNotes: BilingualText | null;
  minerals: MineralComponent[];
  geologicalFeatures: BilingualText[];
  thermalProfile24h: ThermalSamplePoint[];
  pioneerIsruNotes: BilingualText;
  sources: SourceReference[];
}

export interface PlanetaryRegion {
  id: PlanetaryRegionId;
  planet: PlanetTargetId;
  name: BilingualText;
  coordinatesLabel: string;
  missionContext: BilingualText;
  metrics: {
    meanTempC: number | null;
    tempMinC: number | null;
    tempMaxC: number | null;
    elevationM: number | null;
    meanSlopeDeg: number | null;
    roughnessIndexDeg: number | null;
    waterIcePct: number | null;
    atmosphericPressureKpa: number | null;
    albedo: number | null;
  };
  metricNotes: {
    waterIceNote: BilingualText;
    elevationDatum: BilingualText;
    nullFieldNote: BilingualText | null;
  };
  minerals: MineralComponent[];
  geologicalFeatures: BilingualText[];
  thermalProfile24h: ThermalSamplePoint[];
  terrainProfile: TerrainProfilePoint[];
  adaptiveOverview: LevelAdaptiveText;
  recommendedAnalogs: string[];
  sources: SourceReference[];
}

export interface ComparisonAxisScore {
  key: 'thermal' | 'elevation' | 'slope' | 'roughness' | 'waterIce' | 'mineralogy';
  earthNormalized: number | null;
  planetNormalized: number | null;
  earthDisplay: BilingualText;
  planetDisplay: BilingualText;
  similarityPct: number | null;
  quality: DataQualityLevel;
  deltaDisplay: BilingualText;
  note: BilingualText;
}

export interface ComparisonWeights {
  thermal: number;
  elevation: number;
  slope: number;
  roughness: number;
  waterIce: number;
  mineralogy: number;
}

export interface ComparisonResult {
  site: EarthAnalogSite;
  region: PlanetaryRegion;
  overallScore: number | null;
  isReliable: boolean;
  verifiedAxisCount: number;
  totalAxisCount: number;
  missingAxes: string[];
  insufficiencyReason: BilingualText | null;
  axes: ComparisonAxisScore[];
  sharedMinerals: string[];
  keySimilarities: BilingualText[];
  keyDivergences: BilingualText[];
}
