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

    // Also observe mutations in case children change size
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
    <div className={`relative flex items-center gap-1.5 w-full ${className}`}>
      {/* Left Scroll Arrow */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        disabled={!canScrollLeft && !showArrowsAlways}
        aria-label="Scroll left"
        className={`w-8 h-8 flex items-center justify-center shrink-0 border-2 border-[#121212] font-black transition-all cursor-pointer select-none ${
          canScrollLeft || showArrowsAlways
            ? 'bg-white hover:bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
            : 'bg-[#E5E5E5] text-[#121212]/30 border-[#121212]/30 cursor-not-allowed opacity-40 shadow-none'
        }`}
      >
        <ChevronLeft className="w-4 h-4 stroke-[3]" />
      </button>

      {/* Horizontal Scrollable Area */}
      <div
        ref={scrollRef}
        className={`flex-1 flex items-center overflow-x-auto scrollbar-none scroll-smooth ${innerClassName}`}
      >
        {children}
      </div>

      {/* Right Scroll Arrow */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        disabled={!canScrollRight && !showArrowsAlways}
        aria-label="Scroll right"
        className={`w-8 h-8 flex items-center justify-center shrink-0 border-2 border-[#121212] font-black transition-all cursor-pointer select-none ${
          canScrollRight || showArrowsAlways
            ? 'bg-white hover:bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
            : 'bg-[#E5E5E5] text-[#121212]/30 border-[#121212]/30 cursor-not-allowed opacity-40 shadow-none'
        }`}
      >
        <ChevronRight className="w-4 h-4 stroke-[3]" />
      </button>
    </div>
  );
};

export default BauhausNavScroller;
