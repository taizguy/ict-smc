import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Filter,
  X
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

interface CurriculumViewProps {
  onSelectChapter: (chapterId: number) => void;
  onOpenSearch: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onSelectChapter,
  onOpenSearch
}) => {
  const [selectedPart, setSelectedPart] = useState<string>('all');
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
    <div className="space-y-10 pb-20">
      
      {/* Bauhaus Constructivist Hero Section */}
      <section className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Abstract background decorative shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D02020]/10 pointer-events-none" />
        <div className="absolute -bottom-16 right-1/4 w-40 h-40 bg-[#F0C020]/20 rotate-45 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Geometric Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white text-xs font-black uppercase tracking-widest border-2 border-[#121212] rounded-none">
                <span className="w-2 h-2 rounded-full bg-[#D02020]" />
                BAUHAUS COMPOSITION // 01
              </span>
              <span className="px-3 py-1 bg-[#F0C020] text-[#121212] text-xs font-black uppercase tracking-widest border-2 border-[#121212] rounded-none">
                48 CHAPTERS UNLOCKED
              </span>
            </div>

            {/* Massive Constructivist Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#121212] leading-[0.9]">
                ICT &amp; SMC
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                <span className="bg-[#D02020] text-white px-3 py-1 border-2 border-[#121212] inline-block shadow-[4px_4px_0px_0px_#121212]">
                  INSTITUTIONAL
                </span>
                <span className="text-[#121212]">SYLLABUS</span>
              </div>
            </div>

            <p className="text-base sm:text-lg font-medium text-[#121212] leading-relaxed max-w-2xl">
              Form follows function. The complete 48-chapter institutional trading curriculum organized into pure geometric clarity. Examine orderflow, liquidity voids, and market delivery with zero locks or artificial barriers.
            </p>

            {/* Search Bar in Bauhaus styling */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212] stroke-[3]" />
                <input
                  type="text"
                  placeholder="SEARCH 48 CHAPTERS, CONCEPTS, TERMS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-[#F0F0F0] border-2 sm:border-4 border-[#121212] rounded-none text-xs sm:text-sm font-black text-[#121212] placeholder-[#121212]/50 uppercase tracking-wide focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#121212] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#121212] hover:bg-[#D02020] hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                )}
              </div>

              <button
                onClick={onOpenSearch}
                className="px-5 py-3 bg-[#1040C0] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
              >
                INDEX (⌘K)
              </button>
            </div>
          </div>

          {/* Right Hero Column: Geometric Stats Block */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            
            {/* Stat 1: Chapters (Red) */}
            <div className="flex-1 bg-[#D02020] text-white p-5 border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none relative">
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white border border-black" />
              <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                48
              </div>
              <div className="text-xs font-black uppercase tracking-widest mt-1">
                Full Curriculum Chapters
              </div>
            </div>

            {/* Stat 2: Core Parts (Yellow) */}
            <div className="flex-1 bg-[#F0C020] text-[#121212] p-5 border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#121212] rounded-none" />
              <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                07
              </div>
              <div className="text-xs font-black uppercase tracking-widest mt-1">
                Modular Knowledge Sections
              </div>
            </div>

            {/* Stat 3: Open Access (Blue) */}
            <div className="flex-1 bg-[#1040C0] text-white p-5 border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-white clip-triangle inline-block" />
              <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                100%
              </div>
              <div className="text-xs font-black uppercase tracking-widest mt-1">
                Unrestricted &amp; Open Access
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Part Filter Section - Bauhaus Color-Blocked Tabs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4 pb-2 border-b-4 border-[#121212]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-[#D02020] rounded-none border border-black" />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#121212]">
              Filter By Curriculum Module
            </h2>
          </div>
          <div className="text-xs font-mono font-bold text-[#121212]">
            Showing {filteredChapters.length} of {textbookChapters.length} Chapters
          </div>
        </div>

        <BauhausNavScroller innerClassName="gap-2 py-1" showArrowsAlways={true}>
          <button
            onClick={() => setSelectedPart('all')}
            className={`px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider whitespace-nowrap border-2 border-[#121212] transition-all cursor-pointer shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              selectedPart === 'all'
                ? 'bg-[#121212] text-white shadow-[4px_4px_0px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020]'
            }`}
          >
            All Modules ({textbookChapters.length})
          </button>

          {parts.map((p, idx) => {
            const count = textbookChapters.filter(ch => ch.part === p).length;
            const shortName = p.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');
            const isSelected = selectedPart === p;

            // Rotating Bauhaus active color per part
            const activeColors = [
              'bg-[#D02020] text-white',
              'bg-[#1040C0] text-white',
              'bg-[#F0C020] text-[#121212]',
              'bg-[#D02020] text-white',
              'bg-[#1040C0] text-white',
              'bg-[#F0C020] text-[#121212]',
              'bg-[#121212] text-white'
            ];
            const activeClass = activeColors[idx % activeColors.length];

            return (
              <button
                key={p}
                onClick={() => setSelectedPart(p)}
                className={`px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider whitespace-nowrap border-2 border-[#121212] transition-all cursor-pointer shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  isSelected
                    ? `${activeClass} shadow-[4px_4px_0px_0px_#121212] -translate-y-0.5`
                    : 'bg-white text-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020]'
                }`}
              >
                P{idx + 1}: {shortName} ({count})
              </button>
            );
          })}
        </BauhausNavScroller>
      </section>

      {/* Chapters Grid - Bauhaus Hard-Border Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((ch, index) => {
          const partShort = ch.part.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');
          
          // Bauhaus Geometric Corner Decoration (Circle, Square, Triangle in rotation)
          const shapeType = index % 3;

          return (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="group bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] hover:shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 transition-all relative"
            >
              {/* Corner Geometric Shape Decoration */}
              <div className="absolute top-4 right-4">
                {shapeType === 0 && (
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D02020] border-2 border-[#121212] inline-block" />
                )}
                {shapeType === 1 && (
                  <span className="w-3.5 h-3.5 rounded-none bg-[#1040C0] border-2 border-[#121212] inline-block" />
                )}
                {shapeType === 2 && (
                  <span className="w-3.5 h-3.5 bg-[#F0C020] clip-triangle inline-block" />
                )}
              </div>

              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[#121212] bg-[#F0C020] text-[#121212] font-black text-sm flex items-center justify-center shadow-[3px_3px_0px_0px_#121212] rounded-none">
                    {ch.id < 10 ? `0${ch.id}` : ch.id}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/70 block">
                      LEVEL {ch.level} • {partShort}
                    </span>
                  </div>
                </div>

                {/* Chapter Title */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#121212] group-hover:text-[#D02020] transition-colors leading-tight">
                    {ch.title}
                  </h3>
                  
                  {/* Quote Banner */}
                  <div className="mt-3 p-2.5 bg-[#F0F0F0] border-l-4 border-[#D02020] text-xs font-bold text-[#121212]/85 italic line-clamp-2">
                    "{ch.quote}"
                  </div>
                </div>
              </div>

              {/* Card Footer Meta & Action */}
              <div className="mt-6 pt-4 border-t-2 border-[#121212] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#121212]/70">
                  <span>{ch.sections.length} SEC</span>
                  <span>•</span>
                  <span>{ch.keyTerms.length} TERMS</span>
                </div>

                <div className="px-3 py-1.5 bg-[#121212] group-hover:bg-[#D02020] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-colors">
                  <span>STUDY</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

            </div>
          );
        })}
      </section>

      {filteredChapters.length === 0 && (
        <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-[#F0C020] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-[#121212] stroke-[3]" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
            NO CHAPTERS MATCH YOUR CRITERIA
          </h3>
          <p className="text-sm font-medium text-[#121212] max-w-md mx-auto">
            Try searching for terms like "Liquidity", "Order Block", "FVG", or reset your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPart('all');
            }}
            className="px-6 py-3 bg-[#D02020] text-white font-black text-xs uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

    </div>
  );
};

export default CurriculumView;
