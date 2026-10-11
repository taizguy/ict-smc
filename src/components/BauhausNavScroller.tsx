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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
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
    <div className={`relative flex items-center gap-2 w-full ${className}`}>
      {/* Left Scroll Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft && !showArrowsAlways}
          aria-label="Scroll left"
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.08] transition-all cursor-pointer select-none ${
            canScrollLeft || showArrowsAlways
              ? 'bg-white/[0.04] hover:bg-white/[0.1] text-[#F5F7FA]'
              : 'opacity-20 cursor-not-allowed text-[#656B78]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Horizontal Scrollable Area */}
      <div
        ref={scrollRef}
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
          aria-label="Scroll right"
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.08] transition-all cursor-pointer select-none ${
            canScrollRight || showArrowsAlways
              ? 'bg-white/[0.04] hover:bg-white/[0.1] text-[#F5F7FA]'
              : 'opacity-20 cursor-not-allowed text-[#656B78]'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default BauhausNavScroller;
