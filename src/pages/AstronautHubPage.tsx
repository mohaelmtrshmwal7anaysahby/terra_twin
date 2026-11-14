import React, { useState } from 'react';
import {
  Award,
  BatteryCharging,
  CheckCircle2,
  Compass,
  Play,
  RotateCcw,
  ShieldAlert,
  Thermometer,
  Wind,
} from 'lucide-react';
import { ActionButton, SurfacePanel } from '../components/DesignSystem';
import { TrackHeader } from '../components/TrackHeader';
import { useObservatory } from '../context/ObservatoryContext';
import { ACHIEVEMENT_CATALOG, ASTRONAUT_MISSIONS } from '../data/experiencesData';

type AstronautTab = 'missions' | 'simulator' | 'survival' | 'achievements';

interface SimLogEntry {
  phase: number;
  choiceTitle: string;
  deltaOxygen: number;
  deltaPower: number;
  deltaSamples: number;
  outcome: string;
}

interface SurvivalScenario {
  id: string;
  title: { en: string; ar: string };
  situation: { en: string; ar: string };
  options: {
    label: { en: string; ar: string };
    success: boolean;
    consequence: { en: string; ar: string };
  }[];
}

const SURVIVAL_SCENARIOS: SurvivalScenario[] = [
  {
    id: 'solar-proton',
    title: {
      en: 'Alert 01 · Solar Proton Event (Mars Surface)',
      ar: 'تنبيه 01 · عاصفة بروتونات شمسية (سطح المريخ)',
    },
    situation: {
      en: 'Orbiters detect an X-class solar flare 14 minutes out while your pressurized rover is 8 km from the lava-tube base.',
      ar: 'ترصد الأقمار المدارية توهجًا شمسيًا هائلًا سيصل خلال 14 دقيقة بينما مركبتك على بُعد 8 كم من قاعدة أنبوب الحمم.',
    },
    options: [
      {
        label: {
          en: 'Park inside the shadowed basalt canyon wall & pack water bags around cabin',
          ar: 'التوقف بمحاذاة جدار الوادي البازلتي المظلل وتدريع الكابينة بأكياس الماء',
        },
        success: true,
        consequence: {
          en: 'Optimal Protocol: Water-rich shielding and basalt rock cut ionizing dose by 78% until the flare passes.',
          ar: 'بروتوكول مثالي: خفض الدرع المائي والصخور البازلتية الإشعاع بنسبة 78% حتى انتهاء العاصفة.',
        },
      },
      {
        label: {
          en: 'Sprint at top rover speed across flat regolith toward base',
          ar: 'الاندفاع بأقصى سرعة فوق السهل المكشوف نحو القاعدة',
        },
        success: false,
        consequence: {
          en: 'Hazardous Exposure: Open terrain maximizes radiation exposure and risks suspension failure on rocks.',
          ar: 'تعرض خطير: السهل المكشوف يرفع الجرعة الإشعاعية ويهدد نظام تعليق المركبة.',
        },
      },
    ],
  },
  {
    id: 'perchlorate-seal',
    title: {
      en: 'Alert 02 · Abrasive Regolith & Perchlorate Seal Contamination',
      ar: 'تنبيه 02 · تلوث موانع البدلة بغبار البيركلورات الكاشط',
    },
    situation: {
      en: 'Fine electrostatic dust coats the airlock suitport ring after a Jezero clay sampling EVA.',
      ar: 'يغطي غبار إلكتروستاتيكي دقيق حلقة الإغلاق في غرفة الضغط بعد جولة جمع عينات في جيزيرو.',
    },
    options: [
      {
        label: {
          en: 'Engage electrostatic dust shield + CO₂ purge before hatch equalization',
          ar: 'تشغيل الدرع الإلكتروستاتيكي وتنظيف الحلقة بضغط CO₂ قبل فتح الباب',
        },
        success: true,
        consequence: {
          en: 'Habitat Safe: Prevents toxic ClO₄⁻ dust ingestion inside crew quarters and preserves seal elasticity.',
          ar: 'البيئة آمنة: منع تسرب أملاح البيركلورات السامة لداخل الموئل وحافظ على سلامة الإغلاق.',
        },
      },
      {
        label: {
          en: 'Sweep manually with nylon brush inside the crew cabin',
          ar: 'تنظيف الغبار يدويًا بالفرشاة داخل الكابينة',
        },
        success: false,
        consequence: {
          en: 'Contamination Event: Electrostatic dust embeds into bearings and circulates airborne particulates.',
          ar: 'حدث تلوث: يلتصق الغبار المشحون بالمحاور وينتشر داخل هواء الكابينة.',
        },
      },
    ],
  },
  {
    id: 'shackleton-slope',
    title: {
      en: 'Alert 03 · 12° Loose Anorthosite Slip inside Shackleton Crater',
      ar: 'تنبيه 03 · انزلاق على منحدر 12° داخل فوهة شاكلتون المظلمة',
    },
    situation: {
      en: 'At -230 °C inside permanent shadow, rear rover wheels begin slipping 18% while climbing toward the sunlit ridge.',
      ar: 'عند درجة -230°م داخل الظل الدائم، تبدأ العجلات الخلفية بالانزلاق بنسبة 18% أثناء الصعود نحو الحافة المضاءة.',
    },
    options: [
      {
        label: {
          en: 'Switch to crab-steering diagonally across contour + lower tire torque',
          ar: 'التحول إلى السير المائل على خطوط الكنتور وتقليل عزم الدوران',
        },
        success: true,
        consequence: {
          en: 'Traction Recovered: Diagonal switchbacks restore grip and reach solar illumination before battery cutoff.',
          ar: 'تمت استعادة التماسك: الصعود المائل استعاد الثبات ووصل لضوء الشمس قبل نفاد البطارية.',
        },
      },
      {
        label: {
          en: 'Apply full emergency throttle straight up the fall line',
          ar: 'دفع كامل طاقة المحركات صعودًا بشكل عمودي مباشر',
        },
        success: false,
        consequence: {
          en: 'Wheel Sinkage: High torque digs wheels deeper into fluffy polar regolith and drains 14 kWh.',
          ar: 'غرز العجلات: العزم المفرط يغرس العجلات في التراب المفكك ويستنزف 14 كيلوواط ساعة.',
        },
      },
    ],
  },
];

export const AstronautHubPage: React.FC = () => {
  const { locale, achievements, unlockAchievement, navigate } = useObservatory();
  const [activeTab, setActiveTab] = useState<AstronautTab>('missions');
  const [selectedMissionId, setSelectedMissionId] = useState<string>(ASTRONAUT_MISSIONS[0].id);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    suit: true,
    lidar: true,
    isru: false,
    comms: true,
  });

  // Mission Simulator State
  const selectedMission =
    ASTRONAUT_MISSIONS.find((m) => m.id === selectedMissionId) ?? ASTRONAUT_MISSIONS[0];
  const [phase, setPhase] = useState(1);
  const [oxygen, setOxygen] = useState(selectedMission.initialOxygenPct);
  const [power, setPower] = useState(selectedMission.initialPowerKwh);
  const [cabinTempC, setCabinTempC] = useState(21);
  const [samples, setSamples] = useState(0);
  const [simLogs, setSimLogs] = useState<SimLogEntry[]>([]);
  const [simStatus, setSimStatus] = useState<'active' | 'success' | 'failed'>('active');

  // Survival Challenge Answers
  const [survivalAnswers, setSurvivalAnswers] = useState<Record<string, number>>({});

  const resetSimulator = (missionId = selectedMissionId) => {
    const m = ASTRONAUT_MISSIONS.find((item) => item.id === missionId) ?? ASTRONAUT_MISSIONS[0];
    setSelectedMissionId(m.id);
    setPhase(1);
    setOxygen(m.initialOxygenPct);
    setPower(m.initialPowerKwh);
    setCabinTempC(21);
    setSamples(0);
    setSimLogs([]);
    setSimStatus('active');
  };

  const applyStrategy = (mode: 'conservative' | 'standard' | 'aggressive') => {
    if (simStatus !== 'active') return;

    let dO2 = -12;
    let dPwr = -10;
    let dSamples = 1;
    let dTemp = 0;
    let title = '';
    let outcome = '';

    if (mode === 'conservative') {
      dO2 = -8;
      dPwr = selectedMission.targetPlanet === 'moon' ? +6 : +8;
      dSamples = 1;
      dTemp = 1;
      title =
        locale === 'ar'
          ? 'شحن شمسي وحفظ الموارد'
          : 'Solar Recharge & Resource Conservation';
      outcome =
        locale === 'ar'
          ? 'أولوية للثبات الحراري وشحن البطاريات مع جمع عينة واحدة.'
          : 'Prioritized thermal balance and array charging; logged 1 core sample.';
    } else if (mode === 'standard') {
      dO2 = -14;
      dPwr = -14;
      dSamples = 2;
      dTemp = -1;
      title = locale === 'ar' ? 'مسح علمي قياسي' : 'Standard Traverse & Sampling';
      outcome =
        locale === 'ar'
          ? 'توازن بين استهلاك الأكسجين واستخراج عينتين جيولوجيتين.'
          : 'Balanced EVA consumption with 2 verified geological samples.';
    } else {
      dO2 = -20;
      dPwr = -22;
      dSamples = 4;
      dTemp = -3;
      title =
        locale === 'ar'
          ? 'حفر عميق واستخلاص موارد (ISRU)'
          : 'Deep Core Drilling & ISRU Extraction';
      outcome =
        locale === 'ar'
          ? 'استخلاص مكثف لـ 4 عينات مع حمل حراري وكهربائي مرتفع.'
          : 'High-yield 4-sample extraction under heavy thermal/battery load.';
    }

    const nextO2 = Math.max(0, Math.min(100, oxygen + dO2));
    const nextPwr = Math.max(0, Math.min(100, power + dPwr));
    const nextTemp = cabinTempC + dTemp;
    const nextSamples = samples + dSamples;

    setOxygen(nextO2);
    setPower(nextPwr);
    setCabinTempC(nextTemp);
    setSamples(nextSamples);
    setSimLogs((prev) => [
      {
        phase,
        choiceTitle: title,
        deltaOxygen: dO2,
        deltaPower: dPwr,
        deltaSamples: dSamples,
        outcome,
      },
      ...prev,
    ]);

    if (nextO2 <= 0 || nextPwr <= 0) {
      setSimStatus('failed');
      return;
    }

    if (phase >= 5) {
      setSimStatus('success');
      unlockAchievement('mission-commander');
    } else {
      setPhase((p) => p + 1);
    }
  };

  const tabs: { id: AstronautTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'missions',
      label: locale === 'ar' ? 'اختيار المهمة والقيادة' : 'Mission Selection & Control',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'simulator',
      label: locale === 'ar' ? 'محاكي المهمات التفاعلي' : 'Interactive Mission Simulator',
      icon: <Play className="w-4 h-4" />,
    },
    {
      id: 'survival',
      label: locale === 'ar' ? 'تحديات البقاء في الفضاء' : 'Survival & Space Challenges',
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      id: 'achievements',
      label: locale === 'ar' ? 'إنجازات المهمات' : 'Mission Achievements',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-8">
      <TrackHeader
        activeRole="astronaut"
        accentColor="#D96B43"
        title={
          locale === 'ar'
            ? '🚀 مركز رائد الفضاء: محاكاة المهمات والبقاء'
            : '🚀 Astronaut Mission Operations Deck'
        }
        subtitle={
          locale === 'ar'
            ? 'تولَّ قيادة الرحلات الفضائية نحو القمر والمريخ، أدِر الأكسجين والطاقة عبر 5 مراحل حاسمة، وواجه تحديات البقاء الفضائية.'
            : 'Select lunar and Martian field missions, manage life-support oxygen and power across 5 operational phases, and resolve high-stakes survival alerts.'
        }
      />

      {/* Internal Section Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#D96B43] dark:bg-[#E56E45] text-white border-[#E56E45] shadow-sm dark:shadow-[0_0_24px_-4px_rgba(229,110,69,0.65)]'
                : 'bg-white dark:bg-[#05080F] text-[#101B2B] dark:text-[#F7F8FA] border-[#101B2B]/12 dark:border-white/10 hover:border-[#E56E45]/60'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Mission Selection & Control */}
      {activeTab === 'missions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            {ASTRONAUT_MISSIONS.map((mission) => {
              const active = mission.id === selectedMissionId;
              return (
                <SurfacePanel
                  key={mission.id}
                  className={`p-6 space-y-3 transition-all ${
                    active ? 'ring-2 ring-[#D96B43]' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono-tabular text-[#D96B43] font-semibold">
                      {mission.durationLabel[locale]} · {mission.difficulty[locale]}
                    </span>
                    <span className="text-[#4A596C] dark:text-[#A6B7CA]">
                      {mission.siteOrRegionName[locale]}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {mission.name[locale]}
                  </h2>
                  <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                    {mission.objective[locale]}
                  </p>
                  <p className="text-xs text-[#B84A27] dark:text-[#E58464]">
                    {locale === 'ar' ? 'تحذير بيئي:' : 'Hazard:'} {mission.hazardNote[locale]}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <ActionButton
                      variant={active ? 'mars' : 'secondary'}
                      size="sm"
                      onClick={() => {
                        resetSimulator(mission.id);
                        setActiveTab('simulator');
                      }}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>
                        {locale === 'ar' ? 'تشغيل المحاكاة الآن' : 'Launch Mission Simulator'}
                      </span>
                    </ActionButton>
                    <ActionButton
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(mission.linkedRoute)}
                    >
                      <span>{locale === 'ar' ? 'استعراض أرشيف الكوكب' : 'Inspect Planet Archive'}</span>
                    </ActionButton>
                  </div>
                </SurfacePanel>
              );
            })}
          </div>

          <SurfacePanel elevated className="lg:col-span-5 p-6 space-y-5 h-fit">
            <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {locale === 'ar' ? 'قائمة الفحص قبل الإطلاق (Pre-Flight EVA)' : 'Pre-Flight EVA Control Checklist'}
            </h3>
            <div className="space-y-2.5">
              {[
                {
                  key: 'suit',
                  label:
                    locale === 'ar'
                      ? 'فحص ضغط بدلة الفضاء وإغلاق الغبار الإلكتروستاتيكي'
                      : 'Spacesuit pressure integrity & electrostatic dust seals',
                },
                {
                  key: 'lidar',
                  label:
                    locale === 'ar'
                      ? 'معايرة الليدار لتجنب منحدرات 12° والحفر المظلمة'
                      : 'Hazard LiDAR calibrated for 12° slopes & crater rims',
                },
                {
                  key: 'isru',
                  label:
                    locale === 'ar'
                      ? 'تجهيز فرن استخلاص الماء والمثقاب المبرد'
                      : 'ISRU bound-water oven & cryogenic core drill primed',
                },
                {
                  key: 'comms',
                  label:
                    locale === 'ar'
                      ? 'تأكيد رابط التتابع المداري للبيانات (LRO / MRO)'
                      : 'Orbital relay telemetry link verified (LRO / MRO)',
                },
              ].map((item) => {
                const checked = !!checklist[item.key];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className={`w-full text-start p-3 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${
                      checked
                        ? 'border-[#2A9D9F] bg-white dark:bg-[#04070D]'
                        : 'border-[#101B2B]/12 dark:border-white/12 bg-white/60 dark:bg-[#04070D]/50'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        checked ? 'text-[#2A9D9F]' : 'text-[#4A596C] dark:text-[#A6B7CA]'
                      }`}
                    />
                    <span className="text-xs font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
              {locale === 'ar'
                ? 'تم فحص الأنظمة الأساسية لبدء المحاكاة التفاعلية.'
                : 'Checklist updates Mission Readiness before launching your 5-phase simulation.'}
            </p>
          </SurfacePanel>
        </div>
      )}

      {/* TAB 2: Interactive 5-Phase Mission Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <SurfacePanel className="p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#101B2B]/10 dark:border-white/10 pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#D96B43]">
                  {locale === 'ar'
                    ? `المرحلة ${Math.min(phase, 5)} من 5`
                    : `Phase ${Math.min(phase, 5)} of 5`}
                </p>
                <h2 className="font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {selectedMission.name[locale]}
                </h2>
              </div>
              <ActionButton variant="secondary" size="sm" onClick={() => resetSimulator()}>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'إعادة ضبط المحاكاة' : 'Reset Simulation'}</span>
              </ActionButton>
            </div>

            {/* Live Subsystems Telemetry Bars */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-[#101B2B]/10 dark:border-white/10 bg-[#F7F8FA] dark:bg-[#04070D] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-[#2A9D9F]" />
                    {locale === 'ar' ? 'الأكسجين (O₂)' : 'Oxygen Reserve'}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {oxygen}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#101B2B]/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      oxygen < 25 ? 'bg-[#B84A27]' : 'bg-[#2A9D9F]'
                    }`}
                    style={{ width: `${oxygen}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#101B2B]/10 dark:border-white/10 bg-[#F7F8FA] dark:bg-[#04070D] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  <span className="flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-[#D9C5A3]" />
                    {locale === 'ar' ? 'البطارية' : 'Battery Power'}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {power} kWh
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#101B2B]/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      power < 25 ? 'bg-[#B84A27]' : 'bg-[#D9C5A3]'
                    }`}
                    style={{ width: `${power}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#101B2B]/10 dark:border-white/10 bg-[#F7F8FA] dark:bg-[#04070D] p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  <Thermometer className="w-3.5 h-3.5 text-[#D96B43]" />
                  <span>{locale === 'ar' ? 'حرارة الكابينة / الخارج' : 'Cabin / Ambient'}</span>
                </div>
                <p className="text-lg font-mono-tabular font-semibold text-[#101B2B] dark:text-[#F7F8FA]" dir="ltr">
                  +{cabinTempC}°C / {selectedMission.ambientTempC}°C
                </p>
              </div>

              <div className="rounded-xl border border-[#101B2B]/10 dark:border-white/10 bg-[#F7F8FA] dark:bg-[#04070D] p-4 space-y-1">
                <div className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'العينات الجيولوجية' : 'Core Samples Collected'}
                </div>
                <p className="text-lg font-mono-tabular font-semibold text-[#218385] dark:text-[#2A9D9F]">
                  {samples} {locale === 'ar' ? 'عينات' : 'Cores'}
                </p>
              </div>
            </div>

            {/* Active Phase Controls OR Outcome Banner */}
            {simStatus === 'active' ? (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                  {locale === 'ar'
                    ? `اختر استراتيجية التشغيل للمرحلة ${phase}:`
                    : `Select Operational Strategy for Phase ${phase}:`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => applyStrategy('conservative')}
                    className="text-start p-4 rounded-xl border border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] hover:border-[#2A9D9F] transition-colors cursor-pointer space-y-1.5"
                  >
                    <p className="font-display font-semibold text-sm text-[#218385] dark:text-[#2A9D9F]">
                      {locale === 'ar' ? '1. مسار محافظ وشحن شمسي' : '1. Conservative & Recharge'}
                    </p>
                    <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                      {locale === 'ar'
                        ? '-8% أكسجين · شحن بطارية (+6 إلى +8) · +1 عينة'
                        : '-8% O₂ · Battery Recharge (+6 to +8) · +1 Core'}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyStrategy('standard')}
                    className="text-start p-4 rounded-xl border border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] hover:border-[#D9C5A3] transition-colors cursor-pointer space-y-1.5"
                  >
                    <p className="font-display font-semibold text-sm text-[#101B2B] dark:text-[#F7F8FA]">
                      {locale === 'ar' ? '2. عبور ومسح علمي قياسي' : '2. Standard Science Traverse'}
                    </p>
                    <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                      {locale === 'ar'
                        ? '-14% أكسجين · -14 كيلوواط · +2 عينتين'
                        : '-14% O₂ · -14 kWh · +2 Cores'}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyStrategy('aggressive')}
                    className="text-start p-4 rounded-xl border border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] hover:border-[#D96B43] transition-colors cursor-pointer space-y-1.5"
                  >
                    <p className="font-display font-semibold text-sm text-[#B84A27] dark:text-[#D96B43]">
                      {locale === 'ar' ? '3. حفر عميق واستخلاص مكثف' : '3. Deep Core & ISRU Push'}
                    </p>
                    <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA]">
                      {locale === 'ar'
                        ? '-20% أكسجين · -22 كيلوواط · +4 عينات'
                        : '-20% O₂ · -22 kWh · +4 Cores'}
                    </p>
                  </button>
                </div>
              </div>
            ) : simStatus === 'success' ? (
              <div className="rounded-xl border border-[#2A9D9F] bg-[#2A9D9F]/10 p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-semibold text-[#218385] dark:text-[#2A9D9F]">
                    {locale === 'ar'
                      ? 'تم إتمام المهمة بنجاح وفتح وسام قائد المهمة 🚀'
                      : 'Mission Accomplished! EVA Commander Badge Unlocked 🚀'}
                  </h3>
                  <p className="text-sm text-[#101B2B] dark:text-[#F7F8FA]">
                    {locale === 'ar'
                      ? `جمعت ${samples} عينات جيولوجية واحتفظت بـ ${oxygen}% أكسجين و${power} كيلوواط طاقة.`
                      : `Collected ${samples} planetary cores with ${oxygen}% O₂ and ${power} kWh reserves intact.`}
                  </p>
                </div>
                <ActionButton variant="primary" size="sm" onClick={() => resetSimulator()}>
                  {locale === 'ar' ? 'خوض مهمة جديدة' : 'Run Another Mission'}
                </ActionButton>
              </div>
            ) : (
              <div className="rounded-xl border border-[#B84A27] bg-[#B84A27]/10 p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-semibold text-[#B84A27] dark:text-[#E58464]">
                    {locale === 'ar'
                      ? 'نفدت موارد دعم الحياة قبل إتمام المرحلة 5'
                      : 'Life Support Reserves Depleted'}
                  </h3>
                  <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                    {locale === 'ar'
                      ? 'حاول الموازنة بين الحفر العميق ومراحل الشحن الشمسي.'
                      : 'Balance deep-core extraction phases with solar recharge turns to survive all 5 phases.'}
                  </p>
                </div>
                <ActionButton variant="mars" size="sm" onClick={() => resetSimulator()}>
                  {locale === 'ar' ? 'إعادة المحاولة' : 'Retry Mission'}
                </ActionButton>
              </div>
            )}

            {/* Telemetry Log */}
            {simLogs.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#101B2B]/10 dark:border-white/10">
                <p className="text-xs font-semibold text-[#4A596C] dark:text-[#A6B7CA]">
                  {locale === 'ar' ? 'سجل العمليات المرحلي:' : 'Operational Telemetry Log:'}
                </p>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {simLogs.map((log) => (
                    <div
                      key={log.phase}
                      className="rounded-lg border border-[#101B2B]/8 dark:border-white/8 bg-[#F7F8FA] dark:bg-[#04070D] px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-semibold text-[#D96B43]">
                          {locale === 'ar' ? `المرحلة ${log.phase}:` : `Phase ${log.phase}:`}
                        </span>{' '}
                        <span className="font-medium text-[#101B2B] dark:text-[#F7F8FA]">
                          {log.choiceTitle}
                        </span>
                        <p className="text-[#4A596C] dark:text-[#A6B7CA] mt-0.5">{log.outcome}</p>
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[#4A596C] dark:text-[#A6B7CA]" dir="ltr">
                        O₂ {log.deltaOxygen}% · Pwr {log.deltaPower >= 0 ? `+${log.deltaPower}` : log.deltaPower} · +{log.deltaSamples} cores
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SurfacePanel>
        </div>
      )}

      {/* TAB 3: Survival & Space Challenges */}
      {activeTab === 'survival' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SURVIVAL_SCENARIOS.map((sc) => {
            const chosenIdx = survivalAnswers[sc.id];
            return (
              <SurfacePanel key={sc.id} className="p-6 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                    {sc.title[locale]}
                  </h3>
                  <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                    {sc.situation[locale]}
                  </p>
                  <div className="space-y-2 pt-2">
                    {sc.options.map((opt, idx) => {
                      const picked = chosenIdx === idx;
                      return (
                        <button
                          key={opt.label.en}
                          type="button"
                          onClick={() =>
                            setSurvivalAnswers((prev) => ({ ...prev, [sc.id]: idx }))
                          }
                          className={`w-full text-start p-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                            picked
                              ? opt.success
                                ? 'border-[#2A9D9F] bg-[#2A9D9F]/15 text-[#101B2B] dark:text-white'
                                : 'border-[#B84A27] bg-[#B84A27]/15 text-[#101B2B] dark:text-white'
                              : 'border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] hover:border-[#D96B43]/60'
                          }`}
                        >
                          {opt.label[locale]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {chosenIdx !== undefined && (
                  <p
                    className={`text-xs leading-relaxed pt-3 border-t border-[#101B2B]/10 dark:border-white/10 ${
                      sc.options[chosenIdx].success
                        ? 'text-[#218385] dark:text-[#2A9D9F]'
                        : 'text-[#B84A27] dark:text-[#E58464]'
                    }`}
                  >
                    {sc.options[chosenIdx].consequence[locale]}
                  </p>
                )}
              </SurfacePanel>
            );
          })}
        </div>
      )}

      {/* TAB 4: Mission Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACHIEVEMENT_CATALOG.map((ach) => {
            const unlocked = achievements.includes(ach.id);
            return (
              <SurfacePanel
                key={ach.id}
                className={`p-6 space-y-3 transition-all ${
                  unlocked ? 'border-[#D96B43]/60 shadow-md' : 'opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{ach.icon}</span>
                  <span
                    className={`text-xs font-medium ${
                      unlocked
                        ? 'text-[#218385] dark:text-[#2A9D9F]'
                        : 'text-[#4A596C] dark:text-[#A6B7CA]'
                    }`}
                  >
                    {unlocked
                      ? locale === 'ar'
                        ? 'مكتمل ✓'
                        : 'Unlocked ✓'
                      : locale === 'ar'
                      ? 'مغلق'
                      : 'Locked'}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                  {ach.title[locale]}
                </h3>
                <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
                  {ach.description[locale]}
                </p>
              </SurfacePanel>
            );
          })}
        </div>
      )}
    </div>
  );
};
