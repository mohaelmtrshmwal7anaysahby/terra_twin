import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass } from 'lucide-react';
import { ActionButton, ResilientImage } from '../components/DesignSystem';
import { roleToRoutePage, useObservatory } from '../context/ObservatoryContext';
import { PERSONA_CARDS } from '../data/experiencesData';
import { HERO_ASSETS } from '../data/planetaryData';
import { UserRole } from '../types/terratwin';

export const WelcomePage: React.FC = () => {
  const {
    locale,
    isRTL,
    userName,
    userRole,
    saveUserProfile,
    unlockAchievement,
    navigate,
  } = useObservatory();

  const [nameInput, setNameInput] = useState<string>(userName);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(userRole);
  const [validationError, setValidationError] = useState<string | null>(null);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed && !selectedRole) {
      setValidationError(
        locale === 'ar'
          ? 'يرجى إدخال اسمك واختيار شخصيتك قبل المتابعة.'
          : 'Please enter your name and choose one of the four personas to continue.'
      );
      return;
    }
    if (!trimmed) {
      setValidationError(
        locale === 'ar'
          ? 'يرجى إدخال اسمك في الخانة المخصصة أولًا.'
          : 'Please enter your name before continuing.'
      );
      return;
    }
    if (!selectedRole) {
      setValidationError(
        locale === 'ar'
          ? 'يرجى اختيار إحدى الشخصيات الأربع (المستكشف، الطالب، العالم، أو رائد الفضاء).'
          : 'Please select who you are from the four cards below.'
      );
      return;
    }

    setValidationError(null);
    saveUserProfile(trimmed, selectedRole);
    unlockAchievement('first-profile');
    navigate(roleToRoutePage(selectedRole));
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F7F8FA] dark:bg-[#010205] space-console-grid">
      {/* Cinematic Deep-Space Orbital Horizon Backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30">
        <img
          src={HERO_ASSETS.earthOrbit}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FA]/80 via-[#F7F8FA]/95 to-[#F7F8FA] dark:from-[#010205]/70 dark:via-[#010205]/94 dark:to-[#010205]" />
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top,rgba(47,209,211,0.14),transparent_60%)]" />
      </div>

      {/* Sweeping Astronomical Orbit Geometry */}
      <svg
        viewBox="0 0 1440 820"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20 dark:opacity-35"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <ellipse
          cx="720"
          cy="140"
          rx="760"
          ry="290"
          fill="none"
          stroke="#D9C5A3"
          strokeOpacity="0.35"
          strokeWidth="0.75"
          strokeDasharray="4 8"
        />
        <ellipse
          cx="720"
          cy="140"
          rx="540"
          ry="190"
          fill="none"
          stroke="#2A9D9F"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <form onSubmit={handleExplore} className="space-y-12">
          {/* D. Centered Welcome Section */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F5F7FA] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              {locale === 'ar' ? 'مرحبًا بك في TerraTwin!' : 'Welcome to TerraTwin!'}
            </h1>
            <p className="font-display text-lg sm:text-2xl font-medium text-[#218385] dark:text-[#38D6D8] tracking-wide">
              {locale === 'ar' ? 'اكتشف. استكشف. عِش التجربة.' : 'Discover. Explore. Experience.'}
            </p>
            <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#93A4B8] leading-relaxed">
              {locale === 'ar'
                ? 'منصة علمية تفاعلية تربط بيئات الأرض الاستثنائية بالقمر والمريخ عبر مسارات مخصصة لكل باحث ومستكشف.'
                : 'An interactive planetary exploration platform connecting Earth’s extreme landscapes with the Moon and Mars.'}
            </p>
          </div>

          {/* E. Name Input */}
          <div className="max-w-md mx-auto space-y-3 text-center">
            <label
              htmlFor="terratwin-user-name"
              className="block font-display text-xl sm:text-2xl font-semibold text-[#101B2B] dark:text-[#F5F7FA]"
            >
              {locale === 'ar' ? 'بماذا تحب أن نناديك؟' : 'What should we call you?'}
            </label>
            <input
              id="terratwin-user-name"
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder={locale === 'ar' ? 'اكتب اسمك هنا...' : 'Your Name...'}
              className="w-full rounded-xl border border-[#101B2B]/18 dark:border-white/[0.12] bg-white dark:bg-[#05080F] px-5 py-3.5 text-center text-base font-medium text-[#101B2B] dark:text-[#F5F7FA] placeholder:text-[#4A596C] dark:placeholder:text-[#6B7E96] shadow-sm dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.98),inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-[#2FD1D3] focus:border-[#2FD1D3]/60 transition-all"
            />
          </div>

          {/* F. User Selection (Who are you? + 4 Distinct Persona Cards) */}
          <div className="space-y-6">
            <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-[#101B2B] dark:text-[#F5F7FA]">
              {locale === 'ar' ? 'من أنت؟' : 'Who are you?'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PERSONA_CARDS.map((card) => {
                const isSelected = selectedRole === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(card.id);
                      if (validationError) setValidationError(null);
                    }}
                    style={{
                      borderColor: isSelected ? card.accentHex : undefined,
                      boxShadow: isSelected
                        ? `0 22px 50px -16px ${card.accentHex}55, 0 0 0 1px ${card.accentHex}80`
                        : undefined,
                    }}
                    className={`group relative text-start rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col bg-white dark:bg-gradient-to-b dark:from-[#080C15] dark:to-[#030509] ${
                      isSelected
                        ? '-translate-y-1.5 shadow-2xl'
                        : 'border-[#101B2B]/12 dark:border-white/[0.09] hover:-translate-y-1 hover:border-[#2FD1D3]/55 dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.98),inset_0_1px_0_rgba(255,255,255,0.04)]'
                    }`}
                  >
                    {/* Consistent 4:3 Portrait Photo with Cinematic Edge Fade */}
                    <div className="relative overflow-hidden">
                      <ResilientImage
                        src={card.image}
                        alt={card.title[locale]}
                        aspectClassName="aspect-[4/3]"
                        className="group-hover:scale-[1.05] transition-transform duration-700"
                        priority
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                        aria-hidden="true"
                      />
                      {/* Distinct Accent Rim */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-0.5"
                        style={{ backgroundColor: card.accentHex }}
                      />
                      {isSelected && (
                        <div
                          style={{ backgroundColor: card.accentHex }}
                          className="absolute top-3 end-3 w-7 h-7 rounded-full flex items-center justify-center text-[#020408] shadow-lg"
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </div>

                    {/* Persona Title & Description */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F5F7FA] flex items-center gap-2">
                            <span>{card.title[locale]}</span>
                            <span aria-hidden="true">{card.emoji}</span>
                          </h3>
                        </div>
                        <p className="text-sm text-[#4A596C] dark:text-[#8FA1B6] leading-snug">
                          {card.description[locale]}
                        </p>
                      </div>

                      <div
                        className="pt-2 text-xs font-medium flex items-center gap-1"
                        style={{ color: card.accentHex }}
                      >
                        <span>
                          {isSelected
                            ? locale === 'ar'
                              ? 'تم الاختيار'
                              : 'Selected'
                            : locale === 'ar'
                            ? 'اختر هذا المسار'
                            : 'Select track'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* G. Let's Explore! Button + Validation Feedback */}
          <div className="flex flex-col items-center gap-4 pt-2">
            {validationError && (
              <p
                role="alert"
                className="text-sm font-medium text-[#B84A27] dark:text-[#E58464] text-center"
              >
                {validationError}
              </p>
            )}

            <ActionButton
              type="submit"
              variant="primary"
              size="lg"
              className="px-10 py-3.5 text-base font-semibold shadow-xl"
            >
              <span>{locale === 'ar' ? 'لنبدأ الاستكشاف!' : "Let's Explore!"}</span>
              <ForwardArrow className="w-5 h-5" />
            </ActionButton>

            <button
              type="button"
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-1.5 text-xs text-[#4A596C] dark:text-[#8FA1B6] hover:text-[#218385] dark:hover:text-[#2A9D9F] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>
                {locale === 'ar'
                  ? 'أو تصفح المرصد ثلاثي الأبعاد مباشرة'
                  : 'Or jump directly to the 3D Planetary Observatory'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
