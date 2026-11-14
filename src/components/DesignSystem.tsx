import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, X } from 'lucide-react';
import { DataQualityLevel } from '../types/terratwin';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'mars' | 'moon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[42px]',
    lg: 'px-6 py-3 text-sm min-h-[46px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#218385] hover:bg-[#1a6e70] dark:bg-[#2FD1D3] dark:hover:bg-[#52E5E7] text-white dark:text-[#010205] font-semibold border border-transparent shadow-sm console-active-cyan',
    secondary:
      'bg-white hover:bg-slate-50 dark:bg-[#060A12] dark:hover:bg-[#0C1320] text-[#101B2B] dark:text-[#F5F7FA] border border-[#101B2B]/15 dark:border-white/[0.14] dark:hover:border-[#2FD1D3]/45 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)]',
    ghost:
      'bg-transparent hover:bg-black/5 dark:hover:bg-white/[0.06] text-[#101B2B] dark:text-[#F5F7FA] border border-transparent',
    mars:
      'bg-[#B84A27] hover:bg-[#9f3d1e] dark:bg-[#E56E45] dark:hover:bg-[#F2825B] text-white border border-transparent dark:shadow-[0_0_30px_-4px_rgba(229,110,69,0.58),inset_0_1px_0_rgba(255,255,255,0.22)]',
    moon:
      'bg-[#334155] hover:bg-[#1e293b] dark:bg-[#E2E8F0] dark:hover:bg-white text-white dark:text-[#010205] font-semibold border border-transparent dark:shadow-[0_0_26px_-6px_rgba(226,232,240,0.45)]',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FD1D3] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#010205] disabled:opacity-45 disabled:pointer-events-none cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface SurfacePanelProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export const SurfacePanel: React.FC<SurfacePanelProps> = ({
  children,
  className = '',
  elevated = false,
}) => {
  return (
    <div
      className={`rounded-xl border ${
        elevated
          ? 'border-[#101B2B]/12 dark:border-[#2FD1D3]/22 bg-[#EEF2F6] dark:bg-gradient-to-b dark:from-[#0B121E] dark:to-[#05080F] dark:shadow-[0_30px_80px_-16px_rgba(0,0,0,0.98),0_0_30px_-14px_rgba(47,209,211,0.16),inset_0_1px_0_rgba(255,255,255,0.07)]'
          : 'border-[#101B2B]/10 dark:border-white/[0.08] bg-white dark:bg-gradient-to-b dark:from-[#070B13] dark:to-[#030509] dark:shadow-[0_24px_64px_-14px_rgba(0,0,0,0.96),0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.05)]'
      } transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

interface MetricReadoutProps {
  label: string;
  value: string;
  unit?: string;
  sublabel?: string;
  quality?: DataQualityLevel;
  qualityLabel?: string;
  accentColor?: 'teal' | 'sand' | 'mars' | 'moon' | 'neutral';
}

export const MetricReadout: React.FC<MetricReadoutProps> = ({
  label,
  value,
  unit,
  sublabel,
  quality,
  qualityLabel,
  accentColor = 'neutral',
}) => {
  const valueTone = {
    teal: 'text-[#218385] dark:text-[#38D6D8]',
    sand: 'text-[#8C6D3F] dark:text-[#E8D5B5]',
    mars: 'text-[#B84A27] dark:text-[#FF7F54]',
    moon: 'text-[#475569] dark:text-[#E2E8F0]',
    neutral: 'text-[#101B2B] dark:text-[#F5F7FA]',
  }[accentColor];

  const qualityGlyph =
    quality === 'verified'
      ? '✓'
      : quality === 'orbital-estimate'
      ? '◐'
      : quality === 'incomplete'
      ? '∅'
      : null;

  const qualityTone =
    quality === 'verified'
      ? 'text-[#218385] dark:text-[#2A9D9F]'
      : quality === 'orbital-estimate'
      ? 'text-[#9C7F50] dark:text-[#D9C5A3]'
      : 'text-[#B84A27] dark:text-[#E58464]';

  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[#4A596C] dark:text-[#A6B7CA]">
          {label}
        </span>
        {quality && qualityLabel && (
          <span className={`text-[11px] font-mono-tabular ${qualityTone}`}>
            {qualityGlyph} {qualityLabel}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5" dir="ltr">
        <span className={`text-2xl font-semibold tracking-tight font-mono-tabular ${valueTone}`}>
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono-tabular text-[#4A596C] dark:text-[#A6B7CA]">
            {unit}
          </span>
        )}
      </div>
      {sublabel && (
        <span className="text-xs text-[#4A596C] dark:text-[#A6B7CA] leading-snug">
          {sublabel}
        </span>
      )}
    </div>
  );
};

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = '',
  priority = false,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (errored) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B111C] via-[#04070D] to-[#0E1624] text-[#D9C5A3] p-6 ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 opacity-60 mb-2" />
        <span className="text-xs font-medium text-center text-[#F7F8FA]/80 max-w-[22ch]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#101B2B]/10 dark:bg-[#04070D] ${aspectClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl rounded-xl border border-[#101B2B]/15 dark:border-[#2FD1D3]/22 bg-white dark:bg-[#04060B] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.98),0_0_40px_-16px_rgba(47,209,211,0.22)]"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#101B2B]/10 dark:border-white/10">
              <h3 id="modal-heading" className="text-lg font-display font-semibold text-[#101B2B] dark:text-[#F7F8FA]">
                {title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg text-[#4A596C] dark:text-[#A6B7CA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const EmptyState: React.FC<{
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ message, actionLabel, onAction }) => (
  <SurfacePanel className="p-8 text-center flex flex-col items-center justify-center gap-4">
    <Compass className="w-8 h-8 text-[#2A9D9F] opacity-70" />
    <p className="text-sm text-[#4A596C] dark:text-[#A6B7CA] max-w-md">{message}</p>
    {actionLabel && onAction && (
      <ActionButton variant="secondary" size="sm" onClick={onAction}>
        {actionLabel}
      </ActionButton>
    )}
  </SurfacePanel>
);

export const ScientificTooltip: React.FC<{
  term: string;
  explanation: string;
  children?: React.ReactNode;
}> = ({ term, explanation, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`${term}: ${explanation}`}
        className="inline-flex items-center gap-1 border-b border-dashed border-[#218385]/60 dark:border-[#2A9D9F]/60 text-inherit hover:text-[#218385] dark:hover:text-[#2A9D9F] transition-colors cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D9F] rounded-sm"
      >
        {children ?? term}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mb-2 w-60 rounded-lg border border-[#101B2B]/15 dark:border-[#D9C5A3]/25 bg-[#101B2B] dark:bg-[#04070D] text-[#F7F8FA] px-3 py-2 text-xs leading-relaxed shadow-xl z-40 pointer-events-none"
          >
            <span className="block font-semibold text-[#D9C5A3] mb-0.5">{term}</span>
            <span>{explanation}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
}> = ({ value, suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const start = 0;
    const durationMs = 550;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (value - start) * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span className={`font-mono-tabular ${className}`} dir="ltr">
      {displayValue}
      {suffix}
    </span>
  );
};
