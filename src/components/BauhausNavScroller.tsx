import { useTranslation } from '../i18n/TranslationProvider';
import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BauhausNavScrollerProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  scrollAmount?: number;
  showArrowsAlways?: boolean;
}

export const BauhausNavScroller: React.FC<BauhausNavScrollerProps> = ({
  children,
  className = '',
  innerClassName = '',
  scrollAmount = 260,
  showArrowsAlways = false
}) => {
  const { t, locale } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth - clientWidth;
    const rtl = getComputedStyle(el).direction === 'rtl';
    setCanScrollLeft(rtl ? scrollLeft > -overflow + 2 : scrollLeft > 2);
    setCanScrollRight(rtl ? scrollLeft < -2 : scrollLeft < overflow - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    const observer = new ResizeObserver(() => checkScroll());
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      observer.disconnect();
    };
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  const hasOverflow = canScrollLeft || canScrollRight || showArrowsAlways;

  return (
    <div dir="ltr" className={`relative flex items-center gap-2 w-full ${className}`}>
      {/* Left Scroll Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft && !showArrowsAlways}
          aria-label={t("Scroll left")}
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-ink/[0.08] transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer select-none ${
            canScrollLeft || showArrowsAlways
              ? 'bg-ink/[0.04] hover:bg-ink/[0.1] text-ink'
              : 'opacity-20 cursor-not-allowed text-ink-muted'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Horizontal Scrollable Area */}
      <div
        ref={scrollRef}
        dir={locale === 'ur' ? 'rtl' : 'ltr'}
        data-lenis-prevent="true"
        data-lenis-prevent-horizontal="true"
        className={`flex-1 flex items-center overflow-x-auto overscroll-contain scrollbar-none scroll-smooth ${innerClassName}`}
      >
        {children}
      </div>

      {/* Right Scroll Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight && !showArrowsAlways}
          aria-label={t("Scroll right")}
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-ink/[0.08] transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer select-none ${
            canScrollRight || showArrowsAlways
              ? 'bg-ink/[0.04] hover:bg-ink/[0.1] text-ink'
              : 'opacity-20 cursor-not-allowed text-ink-muted'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default BauhausNavScroller;
