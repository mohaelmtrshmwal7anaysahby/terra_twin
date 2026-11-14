import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CHROME_TRANSLATIONS_BY_LANG, LANGUAGES_50, LanguageMeta50 } from '../i18n/languages50';
import { UI_TEXT } from '../i18n/translations';
import {
  ExperienceLevel,
  LocaleCode,
  PlanetaryRegionId,
  RoutePage,
  ThemeMode,
  UserRole,
} from '../types/terratwin';

interface RouteState {
  page: RoutePage;
  locationId: string;
  compareSiteId: string;
  compareRegionId: PlanetaryRegionId;
}

export function roleToExperienceLevel(role: UserRole): ExperienceLevel {
  return role === 'astronaut' ? 'pioneer' : role;
}

export function roleToRoutePage(role: UserRole): RoutePage {
  switch (role) {
    case 'explorer':
      return 'explorer-hub';
    case 'student':
      return 'student-hub';
    case 'scientist':
      return 'scientist-hub';
    case 'astronaut':
      return 'astronaut-hub';
  }
}

interface ObservatoryContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  locale: LocaleCode;
  activeLangCode: string;
  activeLangMeta: LanguageMeta50;
  setLanguageCode: (code: string) => void;
  setLocale: (loc: LocaleCode) => void;
  toggleLocale: () => void;
  isRTL: boolean;
  level: ExperienceLevel;
  setLevel: (lvl: ExperienceLevel) => void;
  userName: string;
  userRole: UserRole | null;
  saveUserProfile: (name: string, role: UserRole) => void;
  clearUserProfile: () => void;
  achievements: string[];
  unlockAchievement: (id: string) => void;
  bestTriviaScore: number;
  updateBestTriviaScore: (score: number) => void;
  bestQuizScore: number;
  updateBestQuizScore: (score: number) => void;
  route: RouteState;
  navigate: (
    page: RoutePage,
    opts?: {
      locationId?: string;
      compareSiteId?: string;
      compareRegionId?: PlanetaryRegionId;
    }
  ) => void;
  t: (typeof UI_TEXT)['en'];
}

const DEFAULT_ROUTE: RouteState = {
  page: 'welcome',
  locationId: 'atacama',
  compareSiteId: 'atacama',
  compareRegionId: 'mars-jezero',
};

function parseHashRoute(): RouteState {
  if (typeof window === 'undefined') return DEFAULT_ROUTE;
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash || hash === 'welcome') return { ...DEFAULT_ROUTE, page: 'welcome' };

  const [seg, param, param2] = hash.split('/');
  if (seg === 'home') return { ...DEFAULT_ROUTE, page: 'home' };
  if (seg === 'explorer-hub') return { ...DEFAULT_ROUTE, page: 'explorer-hub' };
  if (seg === 'student-hub') return { ...DEFAULT_ROUTE, page: 'student-hub' };
  if (seg === 'scientist-hub') return { ...DEFAULT_ROUTE, page: 'scientist-hub' };
  if (seg === 'astronaut-hub') return { ...DEFAULT_ROUTE, page: 'astronaut-hub' };
  if (seg === 'about') return { ...DEFAULT_ROUTE, page: 'about' };
  if (seg === 'settings') return { ...DEFAULT_ROUTE, page: 'settings' };
  if (seg === 'moon') return { ...DEFAULT_ROUTE, page: 'moon' };
  if (seg === 'mars') return { ...DEFAULT_ROUTE, page: 'mars' };
  if (seg === 'explorer') return { ...DEFAULT_ROUTE, page: 'explorer' };
  if (seg === 'compare') {
    return {
      ...DEFAULT_ROUTE,
      page: 'compare',
      compareSiteId: param || 'atacama',
      compareRegionId: (param2 as PlanetaryRegionId) || 'mars-jezero',
    };
  }
  if (seg === 'location' && param) {
    return { ...DEFAULT_ROUTE, page: 'location', locationId: param };
  }
  return DEFAULT_ROUTE;
}

const ObservatoryContext = createContext<ObservatoryContextValue | null>(null);

export const ObservatoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('terratwin_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [activeLangCode, setActiveLangCodeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved50 = window.localStorage.getItem('terratwin_lang_50');
      if (saved50 && LANGUAGES_50.some((l) => l.code === saved50)) return saved50;
      const savedLegacy = window.localStorage.getItem('terratwin_locale');
      if (savedLegacy === 'en' || savedLegacy === 'ar') return savedLegacy;
    }
    return 'en';
  });

  const [userName, setUserNameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('terratwin_user_name') ?? '';
    }
    return '';
  });

  const [userRole, setUserRoleState] = useState<UserRole | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('terratwin_user_role');
      if (
        saved === 'explorer' ||
        saved === 'student' ||
        saved === 'scientist' ||
        saved === 'astronaut'
      ) {
        return saved;
      }
    }
    return null;
  });

  const [achievements, setAchievements] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem('terratwin_achievements');
        if (raw) return JSON.parse(raw) as string[];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [bestTriviaScore, setBestTriviaScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(window.localStorage.getItem('terratwin_best_trivia') || '0');
    }
    return 0;
  });

  const [bestQuizScore, setBestQuizScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(window.localStorage.getItem('terratwin_best_quiz') || '0');
    }
    return 0;
  });

  const [level, setLevelState] = useState<ExperienceLevel>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('terratwin_level');
      if (
        saved === 'explorer' ||
        saved === 'student' ||
        saved === 'scientist' ||
        saved === 'pioneer'
      ) {
        return saved;
      }
    }
    return 'explorer';
  });

  const [route, setRoute] = useState<RouteState>(() => parseHashRoute());

  const activeLangMeta = useMemo(
    () => LANGUAGES_50.find((l) => l.code === activeLangCode) ?? LANGUAGES_50[0],
    [activeLangCode]
  );

  const locale: LocaleCode = activeLangCode === 'ar' ? 'ar' : 'en';
  const isRTL = activeLangMeta.dir === 'rtl';

  const mergedT = useMemo(() => {
    const base = UI_TEXT[locale];
    const override = CHROME_TRANSLATIONS_BY_LANG[activeLangCode];
    if (!override) return base;
    return {
      ...base,
      nav: override.nav,
      controls: {
        ...base.controls,
        levelLabel: override.controls.levelLabel,
      },
      hero: {
        ...base.hero,
        headline: override.hero.headline,
        subheadline: override.hero.subheadline,
        primaryCta: override.hero.primaryCta,
        secondaryCta: override.hero.secondaryCta,
      },
    };
  }, [activeLangCode, locale]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('terratwin_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = activeLangMeta.code;
    root.dir = activeLangMeta.dir;
    window.localStorage.setItem('terratwin_lang_50', activeLangMeta.code);
    window.localStorage.setItem('terratwin_locale', locale);
  }, [activeLangMeta, locale]);

  useEffect(() => {
    window.localStorage.setItem('terratwin_level', level);
  }, [level]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setTheme(mode);
  }, []);

  const setLanguageCode = useCallback((code: string) => {
    if (LANGUAGES_50.some((l) => l.code === code)) {
      setActiveLangCodeState(code);
    }
  }, []);

  const setLocale = useCallback((loc: LocaleCode) => {
    setActiveLangCodeState(loc);
  }, []);

  const toggleLocale = useCallback(() => {
    setActiveLangCodeState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const setLevel = useCallback((lvl: ExperienceLevel) => {
    setLevelState(lvl);
  }, []);

  const saveUserProfile = useCallback((name: string, role: UserRole) => {
    const cleanName = name.trim();
    setUserNameState(cleanName);
    setUserRoleState(role);
    setLevelState(roleToExperienceLevel(role));
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('terratwin_user_name', cleanName);
      window.localStorage.setItem('terratwin_user_role', role);
    }
  }, []);

  const clearUserProfile = useCallback(() => {
    setUserNameState('');
    setUserRoleState(null);
    setAchievements([]);
    setBestTriviaScore(0);
    setBestQuizScore(0);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('terratwin_user_name');
      window.localStorage.removeItem('terratwin_user_role');
      window.localStorage.removeItem('terratwin_achievements');
      window.localStorage.removeItem('terratwin_best_trivia');
      window.localStorage.removeItem('terratwin_best_quiz');
    }
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('terratwin_achievements', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const updateBestTriviaScore = useCallback((score: number) => {
    setBestTriviaScore((prev) => {
      const next = Math.max(prev, score);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('terratwin_best_trivia', String(next));
      }
      return next;
    });
  }, []);

  const updateBestQuizScore = useCallback((score: number) => {
    setBestQuizScore((prev) => {
      const next = Math.max(prev, score);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('terratwin_best_quiz', String(next));
      }
      return next;
    });
  }, []);

  const navigate = useCallback(
    (
      page: RoutePage,
      opts?: {
        locationId?: string;
        compareSiteId?: string;
        compareRegionId?: PlanetaryRegionId;
      }
    ) => {
      setRoute((prev) => {
        const next: RouteState = {
          page,
          locationId: opts?.locationId ?? prev.locationId,
          compareSiteId: opts?.compareSiteId ?? prev.compareSiteId,
          compareRegionId: opts?.compareRegionId ?? prev.compareRegionId,
        };

        let nextHash = '#/welcome';
        if (page === 'home') nextHash = '#/home';
        else if (page === 'explorer-hub') nextHash = '#/explorer-hub';
        else if (page === 'student-hub') nextHash = '#/student-hub';
        else if (page === 'scientist-hub') nextHash = '#/scientist-hub';
        else if (page === 'astronaut-hub') nextHash = '#/astronaut-hub';
        else if (page === 'about') nextHash = '#/about';
        else if (page === 'settings') nextHash = '#/settings';
        else if (page === 'moon') nextHash = '#/moon';
        else if (page === 'mars') nextHash = '#/mars';
        else if (page === 'explorer') nextHash = '#/explorer';
        else if (page === 'location') nextHash = `#/location/${next.locationId}`;
        else if (page === 'compare')
          nextHash = `#/compare/${next.compareSiteId}/${next.compareRegionId}`;

        if (window.location.hash !== nextHash) {
          window.location.hash = nextHash;
        }
        return next;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  return (
    <ObservatoryContext.Provider
      value={{
        theme,
        toggleTheme,
        setThemeMode,
        locale,
        activeLangCode,
        activeLangMeta,
        setLanguageCode,
        setLocale,
        toggleLocale,
        isRTL,
        level,
        setLevel,
        userName,
        userRole,
        saveUserProfile,
        clearUserProfile,
        achievements,
        unlockAchievement,
        bestTriviaScore,
        updateBestTriviaScore,
        bestQuizScore,
        updateBestQuizScore,
        route,
        navigate,
        t: mergedT,
      }}
    >
      {children}
    </ObservatoryContext.Provider>
  );
};

export function useObservatory(): ObservatoryContextValue {
  const ctx = useContext(ObservatoryContext);
  if (!ctx) {
    throw new Error('useObservatory must be used inside ObservatoryProvider');
  }
  return ctx;
}
