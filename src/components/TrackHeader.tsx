import React from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useObservatory, roleToRoutePage } from '../context/ObservatoryContext';
import { PERSONA_CARDS } from '../data/experiencesData';
import { RoutePage, UserRole } from '../types/terratwin';

interface TrackHeaderProps {
  activeRole?: UserRole;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export const TrackHeader: React.FC<TrackHeaderProps> = ({
  activeRole,
  title,
  subtitle,
  accentColor = '#2A9D9F',
}) => {
  const { locale, isRTL, userName, navigate } = useObservatory();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const switchTrack = (targetPage: RoutePage) => {
    navigate(targetPage);
  };

  return (
    <div className="border-b border-[#101B2B]/10 dark:border-white/10 pb-6 space-y-5">
      {/* Top Return + Direct Cross-Track Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => navigate('welcome')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/[0.12] bg-white dark:bg-[#070B12] px-3 py-1.5 font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#218385] dark:hover:border-[#2A9D9F] transition-colors cursor-pointer min-h-[36px]"
          >
            <BackArrow className="w-3.5 h-3.5" />
            <Home className="w-3.5 h-3.5 text-[#218385] dark:text-[#2A9D9F]" />
            <span>{locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>

          {userName && (
            <span className="text-[#4A596C] dark:text-[#D9C5A3] font-medium">
              {locale === 'ar' ? `مرحبًا، ${userName}` : `Welcome, ${userName}`}
            </span>
          )}
        </div>

        {/* Switch between the 4 tracks without returning to Welcome Page */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#EEF2F6] dark:bg-[#04060B] border border-[#101B2B]/10 dark:border-white/[0.09] dark:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.95)]">
          {PERSONA_CARDS.map((p) => {
            const active = activeRole === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => switchTrack(roleToRoutePage(p.id))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? 'bg-white dark:bg-[#0E1624] text-[#101B2B] dark:text-[#F5F7FA] shadow-sm dark:border dark:border-[#2FD1D3]/60 console-active-cyan'
                    : 'text-[#4A596C] dark:text-[#8FA1B6] hover:text-[#101B2B] dark:hover:text-white'
                }`}
              >
                <span>{p.emoji}</span>
                <span>{p.title[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Title */}
      <div className="space-y-2 max-w-3xl">
        <div
          className="h-0.5 w-12 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101B2B] dark:text-[#F7F8FA] text-balance">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
