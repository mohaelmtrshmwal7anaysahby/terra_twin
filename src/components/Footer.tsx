import React from 'react';
import { useObservatory } from '../context/ObservatoryContext';
import { RoutePage } from '../types/terratwin';

export const Footer: React.FC = () => {
  const { locale, navigate, t } = useObservatory();

  const links: { page: RoutePage; label: string }[] = [
    { page: 'welcome', label: locale === 'ar' ? 'الرئيسية' : 'Home' },
    { page: 'home', label: locale === 'ar' ? 'المرصد ثلاثي الأبعاد' : '3D Observatory' },
    { page: 'explorer', label: t.nav.explorer },
    { page: 'moon', label: t.nav.moon },
    { page: 'mars', label: t.nav.mars },
    { page: 'about', label: locale === 'ar' ? 'عن TerraTwin' : 'About TerraTwin' },
    { page: 'settings', label: locale === 'ar' ? 'الإعدادات' : 'Settings' },
  ];

  return (
    <footer className="border-t border-[#101B2B]/10 dark:border-white/[0.08] bg-[#EEF2F6]/60 dark:bg-[#010205] transition-colors duration-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[#101B2B]/10 dark:border-white/10">
          <div className="max-w-md space-y-2">
            <span className="text-lg font-display font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
              {t.brand}
            </span>
            <p className="text-sm font-medium text-[#218385] dark:text-[#2A9D9F]">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-relaxed">
              {t.footer.methodologyNote}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer Navigation">
            {links.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="text-sm text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-[#F7F8FA] transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#4A596C] dark:text-[#A6B7CA]">
          <span>{t.footer.copyright}</span>
          <span>
            {locale === 'ar'
              ? 'اللغات المتاحة: العربية (RTL) / English (LTR)'
              : 'Supported Languages: English (LTR) / العربية (RTL)'}
          </span>
        </div>
      </div>
    </footer>
  );
};
