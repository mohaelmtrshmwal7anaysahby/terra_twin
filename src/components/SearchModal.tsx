import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { useObservatory } from '../context/ObservatoryContext';
import {
  ASTRONAUT_MISSIONS,
  EXPLORER_AMAZING_FACTS,
  STUDENT_LESSONS,
} from '../data/experiencesData';
import { EARTH_ANALOG_SITES, PLANETARY_REGIONS } from '../data/planetaryData';
import { RoutePage } from '../types/terratwin';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

interface SearchHit {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  const { locale, isRTL, navigate } = useObservatory();
  const [query, setQuery] = useState('');
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const allItems: SearchHit[] = useMemo(() => {
    const hits: SearchHit[] = [];

    EARTH_ANALOG_SITES.forEach((site) => {
      hits.push({
        id: `site-${site.id}`,
        category: locale === 'ar' ? 'محطة نظير أرضي' : 'Earth Analog Station',
        title: site.name[locale],
        subtitle: `${site.country[locale]} · ${site.researchFocus[locale]}`,
        action: () => {
          navigate('location', { locationId: site.id });
          onClose();
        },
      });
    });

    Object.values(PLANETARY_REGIONS).forEach((reg) => {
      const targetPage: RoutePage = reg.planet === 'moon' ? 'moon' : 'mars';
      hits.push({
        id: `region-${reg.id}`,
        category: reg.planet === 'moon' ? (locale === 'ar' ? 'القمر' : 'Moon') : locale === 'ar' ? 'المريخ' : 'Mars',
        title: reg.name[locale],
        subtitle: reg.missionContext[locale],
        action: () => {
          navigate(targetPage);
          onClose();
        },
      });
    });

    STUDENT_LESSONS.forEach((lesson) => {
      hits.push({
        id: lesson.id,
        category: locale === 'ar' ? 'درس الطالب' : 'Student Lesson',
        title: lesson.title[locale],
        subtitle: lesson.subjectLabel[locale],
        action: () => {
          navigate('student-hub');
          onClose();
        },
      });
    });

    EXPLORER_AMAZING_FACTS.forEach((fact) => {
      hits.push({
        id: fact.id,
        category: locale === 'ar' ? 'معلومة المستكشف' : 'Explorer Fact',
        title: fact.headline[locale],
        subtitle: fact.kicker[locale],
        action: () => {
          navigate('explorer-hub');
          onClose();
        },
      });
    });

    ASTRONAUT_MISSIONS.forEach((mission) => {
      hits.push({
        id: mission.id,
        category: locale === 'ar' ? 'مهمة رائد الفضاء' : 'Astronaut Mission',
        title: mission.name[locale],
        subtitle: mission.siteOrRegionName[locale],
        action: () => {
          navigate('astronaut-hub');
          onClose();
        },
      });
    });

    return hits;
  }, [locale, navigate, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 7);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'ar' ? 'البحث في تيرا توين' : 'Search TerraTwin'}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85"
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl rounded-xl border border-[#101B2B]/15 dark:border-[#2FD1D3]/25 bg-white dark:bg-[#030509] shadow-[0_32px_100px_rgba(0,0,0,0.98),0_0_40px_-14px_rgba(47,209,211,0.22)] overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-[#101B2B]/10 dark:border-white/10 px-4 py-3.5">
              <Search className="w-4 h-4 text-[#218385] dark:text-[#2A9D9F] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  locale === 'ar'
                    ? 'ابحث في المواقع الأرضية، القمر، المريخ، الدروس، والمهمات...'
                    : 'Search Earth analogs, Moon, Mars, lessons, facts, or missions...'
                }
                className="w-full bg-transparent text-sm text-[#101B2B] dark:text-[#F5F7FA] placeholder:text-[#4A596C] dark:placeholder:text-[#8FA1B6] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Search"
                className="p-1.5 rounded-lg text-[#4A596C] hover:text-[#101B2B] dark:text-[#8FA1B6] dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-[#101B2B]/8 dark:divide-white/[0.06] p-2">
              {results.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#4A596C] dark:text-[#8FA1B6]">
                  {locale === 'ar'
                    ? 'لم يتم العثور على نتائج مطابقة.'
                    : 'No matching discoveries or telemetry entries found.'}
                </div>
              ) : (
                results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.action}
                    className="w-full text-start px-3.5 py-3 rounded-lg hover:bg-[#EEF2F6] dark:hover:bg-[#0D1422] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono-tabular text-[#218385] dark:text-[#2A9D9F] block">
                        {item.category}
                      </span>
                      <p className="text-sm font-medium text-[#101B2B] dark:text-[#F7F8FA] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#4A596C] dark:text-[#A6B7CA] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <ForwardArrow className="w-4 h-4 text-[#4A596C] dark:text-[#D9C5A3] shrink-0" />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
