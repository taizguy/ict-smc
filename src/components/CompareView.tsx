import React, { useState, useRef, useEffect } from 'react';
import { conceptComparisons } from '../data/comparisonsData';
import { ConceptComparison } from '../types';
import { GitCompare, AlertTriangle, Scale, ChevronLeft, ChevronRight } from 'lucide-react';

export const CompareView: React.FC = () => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(conceptComparisons[0].id);
  const comparison = conceptComparisons.find((c) => c.id === selectedComparisonId) || conceptComparisons[0];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [selectedComparisonId]);

  useEffect(() => {
    const activeEl = scrollContainerRef.current?.querySelector(`[data-active="true"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedComparisonId]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-acrylic border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 border border-sky-200 shadow-xs">
                <GitCompare className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">ICT Concept Comparison Matrix</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-sans">
              Dissect subtle differences and eliminate the most common conceptual confusions in Smart Money trading.
            </p>
          </div>
        </div>

        {/* Comparison Selector Chips with Scroll Chevrons & Wheel Support */}
        <div className="relative flex items-center pt-4 mt-3 border-t border-slate-200/80">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className={`flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition-all mr-2 shrink-0 ${
              canScrollLeft ? 'opacity-100 hover:bg-slate-50' : 'opacity-25 pointer-events-none'
            }`}
            title="Scroll comparisons left"
            aria-label="Scroll comparisons left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="flex items-center gap-2 overflow-x-auto scrollbar-thin py-1 scroll-smooth w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {conceptComparisons.map((c) => (
              <button
                key={c.id}
                data-active={selectedComparisonId === c.id ? 'true' : 'false'}
                onClick={() => setSelectedComparisonId(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all shrink-0 ${
                  selectedComparisonId === c.id
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-extrabold shadow-md shadow-sky-600/25 scale-[1.02]'
                    : 'bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
                }`}
              >
                {c.title.split(':')[0]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            className={`flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition-all ml-2 shrink-0 ${
              canScrollRight ? 'opacity-100 hover:bg-slate-50' : 'opacity-25 pointer-events-none'
            }`}
            title="Scroll comparisons right"
            aria-label="Scroll comparisons right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Side-by-Side Comparison Container */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5 py-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">{comparison.title}</h3>
          <p className="text-xs font-mono text-sky-700 font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block shadow-xs">
            {comparison.keyDifference}
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept A Card */}
          <div className="card-2026 p-6 sm:p-7 space-y-4 relative overflow-hidden group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 font-mono text-xs font-black border border-sky-200 shadow-xs">
                {comparison.conceptA.name}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed font-sans">
              {comparison.conceptA.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-extrabold text-sky-800 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-700">
                {comparison.conceptA.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 mt-0.5 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/80 text-xs font-mono text-slate-700 bg-sky-50/70 p-3.5 rounded-2xl border border-sky-200/80">
              <strong className="text-sky-950 font-black">Ideal Setup:</strong> {comparison.conceptA.idealCondition}
            </div>
          </div>

          {/* Concept B Card */}
          <div className="card-2026 p-6 sm:p-7 space-y-4 relative overflow-hidden group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 font-mono text-xs font-black border border-amber-300 shadow-xs">
                {comparison.conceptB.name}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed font-sans">
              {comparison.conceptB.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-extrabold text-amber-800 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-700">
                {comparison.conceptB.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/80 text-xs font-mono text-slate-700 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80">
              <strong className="text-amber-950 font-black">Ideal Setup:</strong> {comparison.conceptB.idealCondition}
            </div>
          </div>
        </div>

        {/* The Decisive Separation Rule Card */}
        <div className="card-2026 p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-mono text-sm font-bold">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span className="font-extrabold">The Decisive Execution Rule</span>
          </div>

          <div className="bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200 font-mono text-xs text-emerald-950 leading-relaxed shadow-xs">
            {comparison.decisionRule}
          </div>

          <div className="flex items-start gap-3 bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs font-mono text-amber-950 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 font-black">Common Retail Mistake: </strong>
              <span>{comparison.commonConfusion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
