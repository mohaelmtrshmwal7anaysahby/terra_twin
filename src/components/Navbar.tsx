import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Compass,
  Globe,
  Home,
  Info,
  Layers,
  Menu,
  Moon,
  Rocket,
  Search,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useObservatory } from '../context/ObservatoryContext';
import { RoutePage } from '../types/terratwin';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    locale,
    toggleLocale,
    isRTL,
    userName,
    userRole,
    route,
    navigate,
    t,
  } = useObservatory();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const primarySidebarLinks: {
    page: RoutePage;
    label: string;
    subtitle: string;
    badge?: string;
    icon: React.ReactNode;
  }[] = [
    {
      page: 'welcome',
      label: locale === 'ar' ? 'الرئيسية (الترحيب)' : 'Home',
      subtitle: locale === 'ar' ? 'الصفحة الترحيبية واختيار المسار' : 'Welcome & Persona Selector',
      icon: <Home className="w-4 h-4" />,
    },
    {
      page: 'explorer-hub',
      label: locale === 'ar' ? 'المستكشف' : 'Explorer',
      subtitle: locale === 'ar' ? 'اكتشف الأرض والقمر والمريخ والألعاب' : 'Discover, Facts, Gallery & Games',
      badge: '🔭',
      icon: <Compass className="w-4 h-4 text-[#2A9D9F]" />,
    },
    {
      page: 'student-hub',
      label: locale === 'ar' ? 'الطالب' : 'Student',
      subtitle: locale === 'ar' ? 'الدروس والجيولوجيا والاختبارات' : 'Lessons, Flashcards & Quizzes',
      badge: '🎓',
      icon: <Globe className="w-4 h-4 text-[#D9C5A3]" />,
    },
    {
      page: 'scientist-hub',
      label: locale === 'ar' ? 'العالم' : 'Scientist',
      subtitle: locale === 'ar' ? 'البيانات العلمية والتحليل والمراجع' : 'Telemetry, Matrices & Studies',
      badge: '🔬',
      icon: <Layers className="w-4 h-4 text-[#3B82F6]" />,
    },
    {
      page: 'astronaut-hub',
      label: locale === 'ar' ? 'رائد الفضاء' : 'Astronaut',
      subtitle: locale === 'ar' ? 'محاكي المهمات وتحديات البقاء' : 'Mission Simulator & Challenges',
      badge: '🚀',
      icon: <Rocket className="w-4 h-4 text-[#D96B43]" />,
    },
    {
      page: 'about',
      label: locale === 'ar' ? 'عن TerraTwin' : 'About TerraTwin',
      subtitle: locale === 'ar' ? 'الرؤية العلمية ومنهجية البيانات' : 'Scientific Vision & Sources',
      icon: <Info className="w-4 h-4" />,
    },
    {
      page: 'settings',
      label: locale === 'ar' ? 'الإعدادات' : 'Settings',
      subtitle: locale === 'ar' ? 'الاسم، الشخصية، اللغة، والمظهر' : 'Profile, Language & Theme',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const observatoryShortcuts: { page: RoutePage; label: string }[] = [
    { page: 'home', label: locale === 'ar' ? 'المرصد 3D' : '3D Observatory' },
    { page: 'explorer', label: t.nav.explorer },
    { page: 'moon', label: t.nav.moon },
    { page: 'mars', label: t.nav.mars },
    { page: 'compare', label: t.nav.compare },
  ];

  const handleSidebarNavigate = (page: RoutePage) => {
    navigate(page);
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-[#101B2B]/10 dark:border-white/[0.08] bg-[#F7F8FA]/95 dark:bg-[#010205]/95 dark:shadow-[0_14px_45px_rgba(0,0,0,0.95)] transition-colors duration-200">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Left (Start): TerraTwin Logo */}
          <a
            href="#/welcome"
            onClick={(e) => {
              e.preventDefault();
              navigate('welcome');
            }}
            className="flex items-center gap-2.5 text-lg font-display font-semibold tracking-tight text-[#101B2B] dark:text-[#F5F7FA] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D9F] rounded-md px-1"
          >
            <svg
              className="w-6 h-6 text-[#218385] dark:text-[#2A9D9F] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="10" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="16.5" cy="8.5" r="3" stroke="#D9C5A3" strokeWidth="1.5" />
            </svg>
            <span>{t.brand}</span>
          </a>

          {/* Right (End): In-site Search + Language Switcher (English / العربية) + Hamburger Menu (☰) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {route.page !== 'welcome' && (
              <button
                type="button"
                onClick={() => navigate('welcome')}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/[0.12] bg-white dark:bg-[#060A12] px-3 py-1.5 text-xs font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#218385] dark:hover:border-[#2FD1D3] whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[38px]"
              >
                <Home className="w-3.5 h-3.5 text-[#218385] dark:text-[#2FD1D3]" />
                <span>{locale === 'ar' ? 'الرئيسية' : 'Home'}</span>
              </button>
            )}

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={locale === 'ar' ? 'بحث في الموقع' : 'Search TerraTwin'}
              title={locale === 'ar' ? 'بحث في الموقع' : 'Search TerraTwin'}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/[0.12] bg-white dark:bg-[#060A12] px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#218385] dark:hover:border-[#2FD1D3] transition-colors cursor-pointer min-h-[38px]"
            >
              <Search className="w-3.5 h-3.5 text-[#218385] dark:text-[#2FD1D3]" />
              <span className="hidden md:inline">
                {locale === 'ar' ? 'بحث' : 'Search'}
              </span>
            </button>

            {/* Language Switcher (English / العربية + RTL/LTR) */}
            <button
              type="button"
              onClick={toggleLocale}
              aria-label="Switch Language"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/[0.12] bg-white dark:bg-[#060A12] px-3 py-1.5 text-xs font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#218385] dark:hover:border-[#2FD1D3] whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[38px]"
            >
              <Globe className="w-3.5 h-3.5 text-[#218385] dark:text-[#2FD1D3]" />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Hamburger Menu Icon (☰) */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label={locale === 'ar' ? 'فتح القائمة الجانبية' : 'Open Navigation Menu'}
              aria-expanded={sidebarOpen}
              className="inline-flex items-center justify-center rounded-lg border border-[#101B2B]/15 dark:border-[#2FD1D3]/30 bg-white dark:bg-[#060A12] w-10 h-10 text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#218385] dark:hover:border-[#2FD1D3] dark:shadow-[0_0_20px_-6px_rgba(47,209,211,0.45)] transition-colors cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Vertical Slide-Out Sidebar (Hidden by default) */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
            {/* Solid dark scrim backdrop (no backdrop-blur over WebGL canvas) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/85"
            />

            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-sm h-full bg-[#F7F8FA] dark:bg-[#020408] border-s border-[#101B2B]/12 dark:border-white/[0.1] flex flex-col justify-between shadow-[0_0_100px_rgba(0,0,0,0.98)] overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#101B2B]/10 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <svg
                      className="w-5 h-5 text-[#218385] dark:text-[#2A9D9F]"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="16.5" cy="8.5" r="3" stroke="#D9C5A3" strokeWidth="1.5" />
                    </svg>
                    <span className="font-display text-lg font-semibold text-[#101B2B] dark:text-[#F5F7FA]">
                      {t.brand}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close Sidebar"
                    className="p-2 rounded-lg border border-[#101B2B]/10 dark:border-white/12 text-[#4A596C] dark:text-[#A6B7CA] hover:text-[#101B2B] dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* User Profile Banner inside Sidebar */}
                {userName && (
                  <div className="rounded-xl border border-[#101B2B]/10 dark:border-[#D9C5A3]/20 bg-white dark:bg-[#090E17] px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#218385]/15 dark:bg-[#2A9D9F]/20 flex items-center justify-center text-[#218385] dark:text-[#2A9D9F] shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#101B2B] dark:text-[#F7F8FA] truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-[#4A596C] dark:text-[#D9C5A3]">
                        {userRole
                          ? userRole === 'explorer'
                            ? locale === 'ar'
                              ? '🔭 المستكشف'
                              : '🔭 Explorer'
                            : userRole === 'student'
                            ? locale === 'ar'
                              ? '🎓 الطالب'
                              : '🎓 Student'
                            : userRole === 'scientist'
                            ? locale === 'ar'
                              ? '🔬 العالم'
                              : '🔬 Scientist'
                            : locale === 'ar'
                            ? '🚀 رائد الفضاء'
                            : '🚀 Astronaut'
                          : locale === 'ar'
                          ? 'زائر المرصد'
                          : 'Observatory Guest'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Primary Vertical Navigation Links */}
                <nav className="space-y-1.5" aria-label="Sidebar Navigation">
                  {primarySidebarLinks.map((item) => {
                    const active = route.page === item.page;
                    return (
                      <button
                        key={item.page}
                        type="button"
                        onClick={() => handleSidebarNavigate(item.page)}
                        className={`w-full text-start rounded-xl px-3.5 py-3 transition-colors flex items-start gap-3 cursor-pointer border ${
                          active
                            ? 'bg-[#218385]/10 dark:bg-[#2FD1D3]/14 border-[#218385]/35 dark:border-[#2FD1D3]/60 console-active-cyan text-[#101B2B] dark:text-[#F7F8FA]'
                            : 'border-transparent hover:bg-black/5 dark:hover:bg-white/[0.04] text-[#101B2B] dark:text-[#F7F8FA]'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">{item.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold">{item.label}</span>
                            {item.badge && <span className="text-sm">{item.badge}</span>}
                          </div>
                          <p className="text-[11px] text-[#4A596C] dark:text-[#A6B7CA] leading-snug mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Direct Observatory Shortcuts */}
                <div className="pt-4 border-t border-[#101B2B]/10 dark:border-white/10 space-y-2.5">
                  <p className="text-xs font-medium text-[#4A596C] dark:text-[#A6B7CA] px-1">
                    {locale === 'ar' ? 'أدوات المرصد المباشرة' : 'Direct Observatory Access'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {observatoryShortcuts.map((shortcut) => (
                      <button
                        key={shortcut.page}
                        type="button"
                        onClick={() => handleSidebarNavigate(shortcut.page)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-start border transition-colors cursor-pointer ${
                          route.page === shortcut.page
                            ? 'border-[#2A9D9F] dark:border-[#2FD1D3] bg-[#2A9D9F]/15 text-[#218385] dark:text-[#38D6D8] console-active-cyan'
                            : 'border-[#101B2B]/10 dark:border-white/10 bg-white dark:bg-[#090E17] text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#2A9D9F]/50'
                        }`}
                      >
                        {shortcut.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer: Theme & Language Controls */}
              <div className="p-6 border-t border-[#101B2B]/10 dark:border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#101B2B]/12 dark:border-white/12 bg-white dark:bg-[#090E17] px-3 py-2 text-xs font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#2A9D9F] cursor-pointer min-h-[40px]"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#D9C5A3]" />
                      <span>{t.controls.themeLight}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#101B2B]" />
                      <span>{t.controls.themeDark}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleLocale}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#101B2B]/12 dark:border-white/12 bg-white dark:bg-[#090E17] px-3 py-2 text-xs font-medium text-[#101B2B] dark:text-[#F5F7FA] hover:border-[#2A9D9F] cursor-pointer min-h-[40px]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#2A9D9F]" />
                  <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
