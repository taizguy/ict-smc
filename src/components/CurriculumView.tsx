import { chapterCount, lectureCount } from '../utils/catalogCounts';
import { topicClusters, topicSlug } from '../utils/topicClusters';
import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { getLessonPath } from '../utils/url';
import { 
  Search, 
  ArrowRight, 
  X
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
import { ScrollReveal } from './ScrollReveal';

interface CurriculumViewProps {
  onSelectChapter: (chapterId: number, slug?: string) => void;
  onOpenSearch: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onSelectChapter,
  onOpenSearch
}) => {
  const [selectedPart, setSelectedPart] = useState<string>(() => topicClusters.find(c => location.pathname === `/curriculum/${c.slug}/`)?.part || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique parts
  const parts = useMemo(() => {
    const list: string[] = [];
    textbookChapters.forEach((ch) => {
      if (!list.includes(ch.part)) {
        list.push(ch.part);
      }
    });
    return list;
  }, []);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return textbookChapters.filter((ch) => {
      if (selectedPart !== 'all' && ch.part !== selectedPart) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = ch.title.toLowerCase().includes(query);
        const matchesQuote = ch.quote.toLowerCase().includes(query);
        const matchesPart = ch.part.toLowerCase().includes(query);
        const matchesTerms = ch.keyTerms.some(k => k.term.toLowerCase().includes(query) || k.definition.toLowerCase().includes(query));
        const matchesSummary = ch.summary.some(s => s.toLowerCase().includes(query));
        return matchesTitle || matchesQuote || matchesPart || matchesTerms || matchesSummary;
      }
      return true;
    });
  }, [selectedPart, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      <nav aria-label="Curriculum topics" className="flex flex-wrap gap-3">
        <a className="underline" href="/curriculum/">All lessons</a>
        {topicClusters.map(c => <a key={c.slug} className="underline text-[#55E6D1]" href={`/curriculum/${c.slug}/`}>{c.part}</a>)}
      </nav>
      {/* Editorial Header Section */}
      <ScrollReveal y={25} duration={0.6}>
        <section className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Technical Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#55E6D1]">
                  01 / CURRICULUM ARCHITECTURE
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#656B78]">
                  {chapterCount} CODIFIED CHAPTERS
                </span>
              </div>

              {/* Large Section Headline */}
              <div className="space-y-1">
                <h1 className="predikt-section-title">{selectedPart === 'all' ? 'ICT & SMC Syllabus' : selectedPart}</h1>
                <p className="text-sm sm:text-base text-[#9BA1AE] leading-relaxed max-w-2xl font-normal pt-1">
                  The complete {chapterCount}-chapter institutional trading curriculum organized with rigorous technical hierarchy. Examine order flow, liquidity voids, and algorithmic delivery with zero artificial barriers.
                </p>
              </div>

              {/* Search Bar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#656B78]" />
                  <input
                    type="text"
                    placeholder="SEARCH CHAPTERS, CONCEPTS, TERMS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#0C0E13] border border-white/[0.09] rounded-xl text-xs sm:text-sm font-mono text-[#F5F7FA] placeholder-[#656B78] uppercase tracking-wider focus:outline-none focus:border-[#5865FF]/60 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#656B78] hover:text-[#F5F7FA] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={onOpenSearch}
                  className="btn-predikt-secondary text-xs px-4 whitespace-nowrap"
                >
                  Index (⌘K)
                </button>
              </div>
            </div>

            {/* Right Column: Stats Block */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              
              <div className="flex-1 bg-white/[0.02] border border-white/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-mono text-[#F5F7FA] tracking-tight leading-none">
                  {chapterCount}
                </div>
                <div className="text-xs text-[#9BA1AE] mt-1 font-mono tracking-wider uppercase">
                  Textbook Chapters
                </div>
              </div>

              <div className="flex-1 bg-white/[0.02] border border-white/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-mono text-[#5865FF] tracking-tight leading-none">
                  07
                </div>
                <div className="text-xs text-[#9BA1AE] mt-1 font-mono tracking-wider uppercase">
                  Curriculum Modules
                </div>
              </div>

              <div className="flex-1 bg-white/[0.02] border border-white/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-mono text-[#55E6D1] tracking-tight leading-none">
                  100%
                </div>
                <div className="text-xs text-[#9BA1AE] mt-1 font-mono tracking-wider uppercase">
                  Unrestricted &amp; Open
                </div>
              </div>

            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* Part Filter Section */}
      <ScrollReveal y={20} delay={0.1}>
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#9BA1AE]">
                FILTER BY CURRICULUM MODULE
              </span>
            </div>
            <div className="text-xs font-mono text-[#656B78]">
              {filteredChapters.length} of {textbookChapters.length} Chapters
            </div>
          </div>

          <BauhausNavScroller innerClassName="gap-2 py-1" showArrowsAlways={true}>
            <button
              onClick={() => setSelectedPart('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
                selectedPart === 'all'
                  ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                  : 'bg-white/[0.02] hover:bg-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
              }`}
            >
              All Modules ({textbookChapters.length})
            </button>

            {parts.map((p, idx) => {
              const count = textbookChapters.filter(ch => ch.part === p).length;
              const shortName = p.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');
              const isSelected = selectedPart === p;

              return (
                <button
                  key={p}
                  onClick={() => setSelectedPart(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                  }`}
                >
                  P{idx + 1}: {shortName} ({count})
                </button>
              );
            })}
          </BauhausNavScroller>
        </section>
      </ScrollReveal>

      {/* Chapters Grid - Predikt Dark Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredChapters.map((ch) => {
          const partShort = ch.part.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');

          return (
            <a
              key={ch.id}
              href={getLessonPath(ch.slug)}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectChapter(ch.id, ch.slug);
                }
              }}
              className="group predikt-card p-6 flex flex-col justify-between cursor-pointer space-y-5 no-underline block"
            >
              <div className="space-y-4">
                {/* Card Header Metadata */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#5865FF] tracking-wider">
                    {ch.id < 10 ? `0${ch.id}` : ch.id} / 57
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#656B78]">
                    LEVEL {ch.level} · {partShort}
                  </span>
                </div>

                {/* Chapter Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#F5F7FA] group-hover:text-[#5865FF] transition-colors leading-snug">
                    {ch.title}
                  </h3>
                  
                  {/* Quote Callout */}
                  <div className="mt-3 p-3 rounded-lg bg-white/[0.02] border-l-2 border-[#5865FF] text-xs text-[#9BA1AE] italic line-clamp-2 leading-relaxed">
                    "{ch.quote}"
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#656B78] text-[11px]">
                  <span>{ch.sections.length} SEC</span>
                  <span>·</span>
                  <span>{ch.keyTerms.length} TERMS</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#F5F7FA] font-sans group-hover:text-[#5865FF] transition-colors">
                  <span>Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </a>
          );
        })}
      </section>

      {/* Empty Search State */}
      {filteredChapters.length === 0 && (
        <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#9BA1AE]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#F5F7FA] tracking-tight">
            No Chapters Match Your Search
          </h3>
          <p className="text-xs sm:text-sm text-[#9BA1AE] max-w-md mx-auto leading-relaxed">
            Try searching for terms like "Liquidity", "Order Block", "FVG", or reset your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPart('all');
            }}
            className="btn-predikt-secondary text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

      <section className="space-y-3 text-sm leading-relaxed"><h2 className="text-xl font-semibold">How to study a chapter</h2><p>Read the definition, identify its conditions on a historical chart, and record an example where the pattern fails. Hide future candles to reduce hindsight bias. Keep observations separate from assumptions about institutional intent.</p><p>Page updated: <time dateTime="2026-10-16">16 October 2026</time>. <a className="underline" href="/about/#editorial-policy">Editorial policy</a>.</p></section>
    </div>
  );
};

export default CurriculumView;
