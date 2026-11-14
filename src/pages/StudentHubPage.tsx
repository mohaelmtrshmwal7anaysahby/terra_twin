import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Pause,
  Play,
  RefreshCw,
  RotateCw,
  Video,
} from 'lucide-react';
import { ActionButton, SurfacePanel } from '../components/DesignSystem';
import { TrackHeader } from '../components/TrackHeader';
import { StudentFormationDiagram, ThermalLineChart } from '../components/charts/ScientificCharts';
import { useObservatory } from '../context/ObservatoryContext';
import {
  EXPLORER_TRIVIA_QUESTIONS,
  STUDENT_LESSONS,
  STUDENT_VIDEO_MODULES,
} from '../data/experiencesData';
import { EARTH_ANALOG_SITES, PLANETARY_REGIONS } from '../data/planetaryData';

type StudentTab = 'lessons' | 'videos' | 'materials' | 'quizzes';

export const StudentHubPage: React.FC = () => {
  const { locale, isRTL, navigate, bestQuizScore, updateBestQuizScore, unlockAchievement } =
    useObservatory();

  const [activeTab, setActiveTab] = useState<StudentTab>('lessons');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(STUDENT_LESSONS[0].id);

  // Interactive Visual Explainer state
  const [videoIdx, setVideoIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Flashcards state
  const [flippedCard, setFlippedCard] = useState<Record<string, boolean>>({});

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const activeLesson =
    STUDENT_LESSONS.find((l) => l.id === selectedLessonId) ?? STUDENT_LESSONS[0];
  const lessonSite =
    EARTH_ANALOG_SITES.find((s) => s.id === activeLesson.relatedSiteId) ?? EARTH_ANALOG_SITES[0];
  const lessonRegion = PLANETARY_REGIONS[activeLesson.relatedRegionId];

  const activeVideo = STUDENT_VIDEO_MODULES[videoIdx];
  const activeStep = activeVideo.steps[stepIdx];

  React.useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStepIdx((prev) => {
        if (prev + 1 >= activeVideo.steps.length) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, [playing, activeVideo.steps.length]);

  const currentQuizQ = EXPLORER_TRIVIA_QUESTIONS[quizIdx];

  const handleQuizSelect = (idx: number) => {
    if (quizChoice !== null) return;
    setQuizChoice(idx);
    if (idx === currentQuizQ.correctIndex) {
      setQuizCorrectCount((c) => c + 1);
    }
  };

  const advanceQuiz = () => {
    if (quizIdx + 1 >= EXPLORER_TRIVIA_QUESTIONS.length) {
      const pct = Math.round((quizCorrectCount / EXPLORER_TRIVIA_QUESTIONS.length) * 100);
      updateBestQuizScore(pct);
      if (pct >= 75) unlockAchievement('scholar-quiz');
      setQuizFinished(true);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizChoice(null);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizChoice(null);
    setQuizCorrectCount(0);
    setQuizFinished(false);
  };

  const tabs: { id: StudentTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'lessons',
      label: locale === 'ar' ? 'الدروس العلمية' : 'Educational Lessons',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'videos',
      label: locale === 'ar' ? 'الشروحات التفاعلية' : 'Visual Explainers',
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: 'materials',
      label: locale === 'ar' ? 'المواد والبطاقات التعليمية' : 'Study Materials',
      icon: <RotateCw className="w-4 h-4" />,
    },
    {
      id: 'quizzes',
      label: locale === 'ar' ? 'الاختبارات' : 'Quizzes',
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      <TrackHeader
        activeRole="student"
        accentColor="#D9C5A3"
        title={locale === 'ar' ? '🎓 مسار الطالب' : '🎓 Student Learning Hub'}
        subtitle={
          locale === 'ar'
            ? 'مناهج منظمة في علوم الأرض والكواكب والجيولوجيا والمناخ ودراسات القمر والمريخ مع شروحات واختبارات.'
            : 'Structured lessons across Earth science, planetary science, geology, climate, and Moon & Mars studies with interactive diagrams and quizzes.'
        }
      />

      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#EEF2F6] dark:bg-[#070B12] border border-[#101B2B]/10 dark:border-white/10 w-fit">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer min-h-[38px] ${
                active
                  ? 'bg-white dark:bg-[#0E1624] text-[#9C7F50] dark:text-[#E8D5B5] shadow-sm dark:border dark:border-[#2FD1D3]/55 console-active-cyan'
                  : 'text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STRUCTURED CURRICULUM LESSONS */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Subject List */}
          <div className="lg:col-span-4 space-y-2">
            {STUDENT_LESSONS.map((lesson, i) => {
              const selected = lesson.id === activeLesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-start rounded-xl border p-4 transition-all cursor-pointer ${
                    selected
                      ? 'border-[#9C7F50] dark:border-[#D9C5A3] bg-white dark:bg-[#0B111C] shadow-sm'
                      : 'border-[#101B2B]/10 dark:border-white/10 bg-[#EEF2F6]/60 dark:bg-[#060910] hover:border-[#D9C5A3]/60'
                  }`}
                >
                  <span className="text-[11px] font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3] block">
                    0{i + 1} · {lesson.subjectLabel[locale]}
                  </span>
                  <p className="font-display text-base font-semibold text-[#101B2B] dark:text-[#F7F8FA] mt-1">
                    {lesson.title[locale]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Lesson Workspace */}
          <SurfacePanel className="lg:col-span-8 p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-[#101B2B]/10 dark:border-white/10 pb-4">
              <span className="text-xs font-mono-tabular text-[#218385] dark:text-[#2A9D9F]">
                {activeLesson.subjectLabel[locale]}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {activeLesson.title[locale]}
              </h2>
              <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#CBD5E1] leading-relaxed">
                {activeLesson.summary[locale]}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {locale === 'ar' ? 'أبرز النقاط العلمية' : 'Key Scientific Takeaways'}
              </h3>
              <ul className="space-y-2.5">
                {activeLesson.keyTakeaways.map((tk) => (
                  <li
                    key={tk.en}
                    className="flex items-start gap-2.5 text-sm text-[#4A596C] dark:text-[#A6B7CA]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#218385] dark:text-[#2A9D9F] mt-0.5 shrink-0" />
                    <span>{tk[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guided Geological Diagram + Thermal Comparison */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">
              <StudentFormationDiagram site={lessonSite} locale={locale} />
              <div className="rounded-xl border border-[#101B2B]/10 dark:border-white/10 p-4">
                <p className="text-xs font-semibold text-[#101B2B] dark:text-[#F7F8FA] mb-2">
                  {lessonSite.name[locale]} vs {lessonRegion.name[locale]}
                </p>
                <ThermalLineChart
                  primarySeries={lessonSite.thermalProfile24h}
                  primaryLabel={lessonSite.name[locale]}
                  secondarySeries={lessonRegion.thermalProfile24h}
                  secondaryLabel={lessonRegion.name[locale]}
                  secondaryAccent={lessonRegion.planet}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#101B2B]/10 dark:border-white/10">
              <ActionButton
                variant="primary"
                size="sm"
                onClick={() => navigate('location', { locationId: lessonSite.id })}
              >
                <span>
                  {locale === 'ar' ? `ملف ${lessonSite.name.ar}` : `Inspect ${lessonSite.name.en}`}
                </span>
                <ForwardArrow className="w-3.5 h-3.5" />
              </ActionButton>
              <ActionButton
                variant="secondary"
                size="sm"
                onClick={() =>
                  navigate('compare', {
                    compareSiteId: lessonSite.id,
                    compareRegionId: lessonRegion.id,
                  })
                }
              >
                <span>{locale === 'ar' ? 'افتح المقارنة العلمية' : 'Compare in Lab'}</span>
              </ActionButton>
            </div>
          </SurfacePanel>
        </div>
      )}

      {/* TAB 2: INTERACTIVE VISUAL EXPLAINERS (ANIMATED STAGE SEQUENCER) */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {STUDENT_VIDEO_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  setVideoIdx(idx);
                  setStepIdx(0);
                  setPlaying(false);
                }}
                className={`px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  videoIdx === idx
                    ? 'border-[#2A9D9F] bg-[#2A9D9F]/12 text-[#101B2B] dark:text-[#F7F8FA]'
                    : 'border-[#101B2B]/12 dark:border-white/12 bg-white dark:bg-[#070B12] text-[#4A596C] dark:text-[#A6B7CA]'
                }`}
              >
                {mod.title[locale]}
              </button>
            ))}
          </div>

          <SurfacePanel className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
                  {activeVideo.durationLabel} · {activeStep.telemetryTag}
                </span>
                <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA] mt-1">
                  {activeStep.stepTitle[locale]}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <ActionButton
                  variant="primary"
                  size="sm"
                  onClick={() => setPlaying((p) => !p)}
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>
                    {playing
                      ? locale === 'ar'
                        ? 'إيقاف مؤقت'
                        : 'Pause'
                      : locale === 'ar'
                      ? 'تشغيل الشرح'
                      : 'Play Sequence'}
                  </span>
                </ActionButton>
              </div>
            </div>

            {/* Interactive SVG Process Canvas */}
            <div className="rounded-xl bg-[#030509] border border-white/10 p-6">
              <svg viewBox="0 0 680 180" className="w-full h-auto">
                <line
                  x1="60"
                  y1="90"
                  x2="620"
                  y2="90"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {activeVideo.steps.map((st, idx) => {
                  const cx = 110 + idx * 230;
                  const active = idx === stepIdx;
                  const passed = idx <= stepIdx;
                  return (
                    <g
                      key={st.telemetryTag}
                      onClick={() => {
                        setStepIdx(idx);
                        setPlaying(false);
                      }}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={cx}
                        cy={90}
                        r={active ? 26 : 18}
                        fill={passed ? activeVideo.planetColor : '#0B111C'}
                        stroke={active ? '#F7F8FA' : 'rgba(255,255,255,0.25)'}
                        strokeWidth={active ? 3 : 1.5}
                      />
                      <text
                        x={cx}
                        y={94}
                        textAnchor="middle"
                        className="fill-white text-xs font-mono-tabular font-semibold"
                      >
                        0{idx + 1}
                      </text>
                      <text
                        x={cx}
                        y={144}
                        textAnchor="middle"
                        className="fill-[#CBD5E1] text-[11px]"
                      >
                        {st.telemetryTag}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="text-base text-[#101B2B] dark:text-[#F7F8FA] leading-relaxed">
              {activeStep.narration[locale]}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#101B2B]/10 dark:border-white/10">
              <button
                type="button"
                disabled={stepIdx === 0}
                onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
                className="text-xs font-medium text-[#4A596C] dark:text-[#A6B7CA] disabled:opacity-40 cursor-pointer"
              >
                {locale === 'ar' ? 'المرحلة السابقة' : 'Previous Stage'}
              </button>
              <button
                type="button"
                disabled={stepIdx + 1 >= activeVideo.steps.length}
                onClick={() => setStepIdx((s) => Math.min(activeVideo.steps.length - 1, s + 1))}
                className="text-xs font-medium text-[#218385] dark:text-[#2A9D9F] disabled:opacity-40 cursor-pointer"
              >
                {locale === 'ar' ? 'المرحلة التالية' : 'Next Stage'}
              </button>
            </div>
          </SurfacePanel>
        </div>
      )}

      {/* TAB 3: STUDY MATERIALS & FLIPPABLE FLASHCARDS */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {locale === 'ar' ? 'البطاقات التعليمية التفاعلية' : 'Interactive Study Flashcards'}
            </h2>
            <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
              {locale === 'ar'
                ? 'انقر على أي بطاقة لقلبها واستعراض التعريف العلمي.'
                : 'Click any flashcard below to flip between the scientific term and its definition.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDENT_LESSONS.flatMap((lesson) =>
              lesson.flashcards.map((fc) => {
                const key = fc.term.en;
                const flipped = Boolean(flippedCard[key]);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFlippedCard((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`text-start rounded-xl border p-6 min-h-[170px] flex flex-col justify-between transition-all cursor-pointer ${
                      flipped
                        ? 'border-[#2A9D9F] bg-[#218385]/8 dark:bg-[#2A9D9F]/15'
                        : 'border-[#101B2B]/12 dark:border-white/12 bg-white dark:bg-[#070B12] hover:border-[#D9C5A3]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9C7F50] dark:text-[#D9C5A3]">
                      <span>{lesson.subjectLabel[locale]}</span>
                      <span>
                        {flipped
                          ? locale === 'ar'
                            ? 'التعريف'
                            : 'Definition'
                          : locale === 'ar'
                          ? 'المصطلح'
                          : 'Term'}
                      </span>
                    </div>
                    <p
                      className={
                        flipped
                          ? 'text-sm text-[#101B2B] dark:text-[#F7F8FA] leading-relaxed'
                          : 'font-display text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]'
                      }
                    >
                      {flipped ? fc.definition[locale] : fc.term[locale]}
                    </p>
                    <span className="text-[11px] text-[#4A596C] dark:text-[#A6B7CA]">
                      {locale === 'ar' ? 'انقر للقلب' : 'Click to flip'}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 4: GRADED STUDENT QUIZ */}
      {activeTab === 'quizzes' && (
        <SurfacePanel className="max-w-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#101B2B]/10 dark:border-white/10 pb-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {locale === 'ar' ? 'اختبار الطالب في علوم الكواكب' : 'Planetary Science Quiz'}
              </h2>
              <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] mt-1">
                {locale === 'ar'
                  ? `أفضل نتيجة محفوظة: ${bestQuizScore}%`
                  : `Best Saved Score: ${bestQuizScore}%`}
              </p>
            </div>
            {!quizFinished && (
              <span className="font-mono-tabular text-sm font-semibold text-[#218385] dark:text-[#2A9D9F]">
                {quizIdx + 1} / {EXPLORER_TRIVIA_QUESTIONS.length}
              </span>
            )}
          </div>

          {quizFinished ? (
            <div className="py-8 text-center space-y-4">
              <Award className="w-12 h-12 text-[#D9C5A3] mx-auto" />
              <p className="font-display text-3xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {Math.round((quizCorrectCount / EXPLORER_TRIVIA_QUESTIONS.length) * 100)}%
              </p>
              <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA]">
                {locale === 'ar'
                  ? `أجبت إجابة صحيحة على ${quizCorrectCount} من أصل ${EXPLORER_TRIVIA_QUESTIONS.length} أسئلة.`
                  : `You answered ${quizCorrectCount} out of ${EXPLORER_TRIVIA_QUESTIONS.length} questions accurately.`}
              </p>
              <ActionButton variant="primary" onClick={resetQuiz}>
                <RefreshCw className="w-4 h-4" />
                <span>{locale === 'ar' ? 'أعد الاختبار' : 'Retake Quiz'}</span>
              </ActionButton>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="font-display text-lg sm:text-xl font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {currentQuizQ.question[locale]}
              </h3>

              <div className="space-y-2.5">
                {currentQuizQ.options.map((opt, idx) => {
                  const selected = quizChoice === idx;
                  const correct = currentQuizQ.correctIndex === idx;
                  let cls =
                    'border-[#101B2B]/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#04070D] text-[#101B2B] dark:text-[#F7F8FA] hover:border-[#2A9D9F]';
                  if (quizChoice !== null) {
                    if (correct) {
                      cls = 'border-[#10B981] bg-[#10B981]/15 text-[#065F46] dark:text-[#6EE7B7]';
                    } else if (selected) {
                      cls = 'border-[#B84A27] bg-[#B84A27]/15 text-[#B84A27] dark:text-[#E58464]';
                    }
                  }
                  return (
                    <button
                      key={opt.en}
                      type="button"
                      onClick={() => handleQuizSelect(idx)}
                      className={`w-full text-start rounded-lg border px-4 py-3 text-sm transition-colors cursor-pointer ${cls}`}
                    >
                      {opt[locale]}
                    </button>
                  );
                })}
              </div>

              {quizChoice !== null && (
                <div className="rounded-lg bg-[#EEF2F6] dark:bg-[#04070D] p-4 space-y-3">
                  <p className="text-sm text-[#4A596C] dark:text-[#CBD5E1] leading-relaxed">
                    {currentQuizQ.explanation[locale]}
                  </p>
                  <ActionButton variant="primary" size="sm" onClick={advanceQuiz}>
                    <span>
                      {quizIdx + 1 >= EXPLORER_TRIVIA_QUESTIONS.length
                        ? locale === 'ar'
                          ? 'اعتماد النتيجة'
                          : 'Complete Quiz'
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
      )}
    </div>
  );
};
