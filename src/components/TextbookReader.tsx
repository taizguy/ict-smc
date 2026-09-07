import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { TextbookChapter } from '../types';
import { InteractiveDiagram } from './InteractiveDiagram';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  Eye, 
  Layers, 
  Lightbulb, 
  LayoutGrid,
  Clock,
  Award,
  Zap,
  Compass,
  ArrowRight,
  GraduationCap,
  Youtube,
  Search,
  CheckSquare,
  CheckCircle2,
  Bookmark,
  ShieldAlert
} from 'lucide-react';

interface TextbookReaderProps {
  onSelectConcept: (conceptId: string) => void;
  onOpenQuiz: () => void;
}

export const TextbookReader: React.FC<TextbookReaderProps> = ({ onSelectConcept, onOpenQuiz }) => {
  const [viewMode, setViewMode] = useState<'syllabus' | 'reader'>('syllabus');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(textbookChapters[0].id);
  const [explainSimpler, setExplainSimpler] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const chapter = textbookChapters.find((c) => c.id === selectedChapterId) || textbookChapters[0];
  const currentIndex = textbookChapters.findIndex((c) => c.id === selectedChapterId);

  // Group chapters by Part for the syllabus view
  const groupedModules = useMemo(() => {
    const map = new Map<string, TextbookChapter[]>();
    textbookChapters.forEach((ch) => {
      const partKey = ch.part;
      if (!map.has(partKey)) {
        map.set(partKey, []);
      }
      map.get(partKey)!.push(ch);
    });
    return Array.from(map.entries()).map(([partName, chapters]) => ({
      partName,
      chapters
    }));
  }, []);

  // Filtered chapters for search / part selection
  const filteredChapters = useMemo(() => {
    return textbookChapters.filter((ch) => {
      const matchesPart = selectedPartFilter === 'all' || ch.part.includes(selectedPartFilter);
      const matchesSearch = searchQuery === '' || 
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.summary.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ch.keyTerms.some(kt => kt.term.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesPart && matchesSearch;
    });
  }, [selectedPartFilter, searchQuery]);

  const handleNextChapter = () => {
    if (currentIndex < textbookChapters.length - 1) {
      const nextChapter = textbookChapters[currentIndex + 1];
      setSelectedChapterId(nextChapter.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      const prevChapter = textbookChapters[currentIndex - 1];
      setSelectedChapterId(prevChapter.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPartColor = (partName: string) => {
    if (partName.includes('Part I') || partName.includes('Foundations')) {
      return { border: 'border-emerald-500/40', badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40', accent: 'text-emerald-400' };
    }
    if (partName.includes('Part II') || partName.includes('Algorithmic')) {
      return { border: 'border-cyan-500/40', badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40', accent: 'text-cyan-400' };
    }
    if (partName.includes('Part III') || partName.includes('Liquidity')) {
      return { border: 'border-sky-500/40', badge: 'bg-sky-950/60 text-sky-300 border-sky-500/40', accent: 'text-sky-400' };
    }
    if (partName.includes('Part IV') || partName.includes('Structure')) {
      return { border: 'border-purple-500/40', badge: 'bg-purple-950/60 text-purple-300 border-purple-500/40', accent: 'text-purple-400' };
    }
    if (partName.includes('Part V') || partName.includes('Imbalances') || partName.includes('Order Blocks')) {
      return { border: 'border-rose-500/40', badge: 'bg-rose-950/60 text-rose-300 border-rose-500/40', accent: 'text-rose-400' };
    }
    if (partName.includes('Part VI') || partName.includes('Time')) {
      return { border: 'border-amber-500/40', badge: 'bg-amber-950/60 text-amber-300 border-amber-500/40', accent: 'text-amber-400' };
    }
    if (partName.includes('Part VII') || partName.includes('Execution')) {
      return { border: 'border-orange-500/40', badge: 'bg-orange-950/60 text-orange-300 border-orange-500/40', accent: 'text-orange-400' };
    }
    // Abdullah Masood Masterclass
    return { border: 'border-amber-400/50', badge: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 border-amber-300 font-extrabold shadow-sm', accent: 'text-amber-400' };
  };

  const getDifficultyBadge = (level: number) => {
    switch (level) {
      case 0:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">Level 0: Foundation</span>;
      case 1:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40">Level 1: Core</span>;
      case 2:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/70 text-purple-300 border border-purple-500/40">Level 2: Advanced</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">Level 3: Masterclass</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Syllabus Control & Banner */}
      <div className="bg-gradient-to-b from-[#141418] via-[#101013] to-[#0A0A0C] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Dark Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>OFFICIAL CURRICULUM SYLLABUS</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400 font-bold">{textbookChapters.length} Chapters • 9 Master Modules</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
              The Institutional Trading Syllabus
            </h1>
            <p className="text-zinc-300 text-sm max-w-2xl font-sans leading-relaxed">
              A comprehensive, zero-fluff syllabus for institutional order flow, algorithmic price delivery, ICT 2025 Mentorship frameworks, and high-probability SMC execution models.
            </p>
          </div>

          {/* View Mode Switch */}
          <div className="flex items-center p-1.5 rounded-full bg-[#0D0D10] border border-white/[0.08] shadow-inner shrink-0">
            <button
              onClick={() => setViewMode('syllabus')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                viewMode === 'syllabus'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-lg shadow-[#FF5722]/30 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Syllabus Grid</span>
            </button>
            <button
              onClick={() => setViewMode('reader')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                viewMode === 'reader'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-lg shadow-[#FF5722]/30 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapter Reader</span>
            </button>
          </div>
        </div>
      </div>

      {/* SYLLABUS GRID VIEW MODE */}
      {viewMode === 'syllabus' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div 
              onWheel={(e) => { 
                if (e.deltaY !== 0) {
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }} 
              className="bg-[#0E0E11] border border-white/[0.08] p-2 rounded-2xl flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none scroll-smooth shadow-xs"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <button
                onClick={() => setSelectedPartFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedPartFilter === 'all'
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-md shadow-[#FF5722]/30 scale-[1.02]'
                    : 'bg-[#121215] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-zinc-800 shadow-xs'
                }`}
              >
                All Modules ({textbookChapters.length})
              </button>
              {groupedModules.map(({ partName }) => {
                const isSelected = selectedPartFilter !== 'all' && partName.includes(selectedPartFilter);
                const shortLabel = partName.split('-')[0].trim();
                return (
                  <button
                    key={partName}
                    onClick={() => setSelectedPartFilter(shortLabel)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-md shadow-[#FF5722]/30 scale-[1.02]'
                        : 'bg-[#121215] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-zinc-800 shadow-xs'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search syllabus topics & terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121215] border border-white/[0.08] rounded-full pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/50 transition-all placeholder:text-zinc-500 shadow-sm"
              />
            </div>
          </div>

          {/* Module Breakdown Grid */}
          <div className="space-y-8">
            {groupedModules
              .filter(({ partName }) => selectedPartFilter === 'all' || partName.includes(selectedPartFilter))
              .map(({ partName, chapters }) => {
                const styling = getPartColor(partName);
                const isAbdullahMasood = partName.includes('Abdullah Masood');

                return (
                  <div key={partName} className="space-y-4">
                    {/* Module Header Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border ${styling.badge}`}>
                          {partName}
                        </span>
                        {isAbdullahMasood && (
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                            <Youtube className="w-3.5 h-3.5 text-rose-500" />
                            <span>Mentor Spotlight Series</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-400 font-semibold">
                        {chapters.length} Chapters
                      </span>
                    </div>

                    {/* Chapter Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {chapters.map((ch) => {
                        return (
                          <div
                            key={ch.id}
                            className="group bg-[#111114] border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-between gap-4 hover:border-[#FF5722]/50 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                          >
                            <div className="space-y-3">
                              {/* Top Bar of Card */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-black bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 shadow-xs">
                                    CH {ch.id < 10 ? `0${ch.id}` : ch.id}
                                  </span>
                                  {getDifficultyBadge(ch.level)}
                                </div>
                              </div>

                              {/* Chapter Title */}
                              <h3 className="text-base font-black text-white font-display group-hover:text-[#FF5722] transition-colors line-clamp-2">
                                {ch.title}
                              </h3>

                              {/* Quote / Summary Preview */}
                              <p className="text-xs text-zinc-400 font-sans line-clamp-2 italic border-l-2 border-[#FF5722]/70 pl-2.5">
                                "{ch.quote}"
                              </p>
                            </div>

                            {/* Card Footer & Action */}
                            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono">
                              <span className="text-zinc-400 font-medium text-[11px]">
                                {ch.sections.length} Sections • {ch.practiceQuestions.length} Practice
                              </span>

                              <button
                                onClick={() => {
                                  setSelectedChapterId(ch.id);
                                  setViewMode('reader');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-[#FF5722] hover:text-white text-zinc-200 border border-white/[0.1] hover:border-[#FF5722] font-bold transition-all flex items-center gap-1.5 shadow-xs"
                              >
                                <span>Read Unit</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* CHAPTER READER VIEW MODE */}
      {viewMode === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Sidebar: Table of Contents & Chapter List */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            <div className="bg-[#111114] border border-white/[0.08] rounded-3xl p-5 sticky top-24 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                <button
                  onClick={() => setViewMode('syllabus')}
                  className="flex items-center gap-2 text-[#FF5722] hover:text-[#FF7A00] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Syllabus</span>
                </button>
                <span className="text-[10px] font-mono font-bold text-[#FF5722] bg-[#FF5722]/15 border border-[#FF5722]/30 px-2.5 py-0.5 rounded-full">
                  {textbookChapters.length} Chapters
                </span>
              </div>

              {/* Chapter Navigation List */}
              <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {textbookChapters.map((ch) => {
                  const isSelected = ch.id === selectedChapterId;

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setExplainSimpler(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl text-xs font-mono transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#FF5722]/15 text-white border-2 border-[#FF5722] font-bold shadow-md shadow-[#FF5722]/20'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-850 border border-transparent'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                          <span className={`font-bold ${isSelected ? 'text-[#FF5722]' : 'text-zinc-400'}`}>CH {ch.id}</span>
                          <span>•</span>
                          <span className="truncate">{ch.part.split('-')[0]}</span>
                        </div>
                        <div className={`font-semibold truncate ${isSelected ? 'text-white font-bold' : 'text-zinc-300'}`}>
                          {ch.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Chapter Reader View */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Chapter Header Card */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#FF5722] mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#FF5722]/15 border border-[#FF5722]/30 text-[#FF5722] font-extrabold">
                    {chapter.part}
                  </span>
                  <span>•</span>
                  {getDifficultyBadge(chapter.level)}
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-3">
                Chapter {chapter.id}: {chapter.title}
              </h1>

              {/* Master Quotation */}
              <blockquote className="my-5 p-4 border-l-4 border-[#FF5722] bg-[#FF5722]/10 rounded-r-2xl text-zinc-200 italic text-xs sm:text-sm font-serif leading-relaxed shadow-sm">
                "{chapter.quote}"
              </blockquote>

              {/* Interactive Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setExplainSimpler(!explainSimpler)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    explainSimpler
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/25'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {explainSimpler ? 'Show Standard Technical Version' : 'Explain Simpler (First-Principles Analogy)'}
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-[#FF5722] to-[#FF7A00] hover:from-[#FF6A3D] hover:to-[#FF8E26] text-white flex items-center gap-2 transition-all shadow-lg shadow-[#FF5722]/30 hover:scale-105"
                >
                  <Lightbulb className="w-4 h-4 text-white fill-white" />
                  Test Me On This Concept
                </button>
              </div>
            </div>

            {/* Beginner Analogy Callout (If active) */}
            {explainSimpler && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 text-xs text-amber-300 font-mono space-y-3 animate-fadeIn shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Simplified First-Principles Analogy:</span>
                </div>
                <p className="text-zinc-200 leading-relaxed text-sm font-sans">
                  Imagine an auction house where 50 buyers enter wanting to buy gold coins. As they buy all the cheap coins at $100, the next coin costs $110. Price jumped not because buyers outnumbered sellers, but because cheap resting supply was exhausted. ICT concepts are simply footprints of where these bulk transactions leave empty zones on the floor.
                </p>
              </div>
            )}

            {/* Main Chapter Content Sections */}
            <div className="space-y-6">
              {chapter.sections.map((sec) => (
                <div key={sec.id} className="bg-[#111114] border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
                  <h3 className="text-lg font-bold text-white font-display tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-gradient-to-b from-[#FF5722] to-[#FF7A00] rounded-full" />
                    {sec.title}
                  </h3>

                  <div className="text-zinc-300 text-sm leading-relaxed font-sans space-y-3 whitespace-pre-line">
                    {sec.content.replace(/\*/g, '')}
                  </div>

                  {/* Embedded Diagram if specified */}
                  {sec.diagramType && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08]">
                      <InteractiveDiagram type={sec.diagramType} title={sec.title} />
                    </div>
                  )}
                </div>
              ))}

              {/* Automatic Diagram insertion if chapter represents key ICT modules */}
              {chapter.id === 4 && (
                <InteractiveDiagram type="liquidity_sweep" title="Chapter 4 Liquidity Sweep Mechanics" />
              )}
              {chapter.id === 13 && (
                <InteractiveDiagram type="fvg_formation" title="Chapter 13 Fair Value Gap 3-Candle Structure" />
              )}
              {chapter.id === 15 && (
                <InteractiveDiagram type="order_block" title="Chapter 15 Order Block Origin & Mitigation" />
              )}
              {chapter.id === 16 && (
                <InteractiveDiagram type="breaker_block" title="Chapter 16 Failed Order Block Role Reversal (Breaker)" />
              )}
              {chapter.id === 19 && (
                <InteractiveDiagram type="session_timeline" title="Chapter 19 Global Session Clocks & Killzones" />
              )}
              {chapter.id === 21 && (
                <InteractiveDiagram type="po3_amd" title="Chapter 21 Daily Power of Three (AMD) Sequence" />
              )}
              {chapter.id === 22 && (
                <InteractiveDiagram type="top_down_matrix" title="Chapter 22 Top-Down Multi-Timeframe Alignment" />
              )}
            </div>

            {/* Chapter Summary Checklist & Key Terms */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-white font-display text-lg font-bold">
                <CheckSquare className="w-5 h-5 text-[#22C55E]" />
                <span>Chapter {chapter.id} Summary & Ruleset</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0A0A0D] p-5 rounded-2xl border border-white/[0.06] space-y-3">
                  <h4 className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Core Takeaways:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {chapter.summary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0A0A0D] p-5 rounded-2xl border border-white/[0.06] space-y-3">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Key Terminology Glossary:</span>
                  </h4>
                  <div className="space-y-2 text-xs text-zinc-300 max-h-56 overflow-y-auto pr-1">
                    {chapter.keyTerms.map((kt, idx) => (
                      <div key={idx} className="border-b border-white/[0.06] pb-2">
                        <span className="font-bold text-white font-mono">{kt.term}: </span>
                        <span className="text-zinc-400">{kt.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Questions Accordion */}
              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="text-xs font-mono text-[#FF5722] hover:text-[#FF7A00] font-bold flex items-center gap-2 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showQuestions ? 'Hide' : 'Show'} Self-Check Practice Questions ({chapter.practiceQuestions.length})</span>
                </button>

                {showQuestions && (
                  <div className="mt-4 space-y-2.5 bg-[#0A0A0D] p-5 rounded-2xl border border-white/[0.06] text-xs text-zinc-300">
                    {chapter.practiceQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-[#FF5722] font-bold bg-[#111114] px-2.5 py-0.5 rounded-full border border-white/[0.08]">Q{idx + 1}</span>
                        <span className="leading-relaxed pt-0.5">{q}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Pagination Footer */}
            <div className="flex items-center justify-between gap-4 py-4">
              <button
                onClick={handlePrevChapter}
                disabled={currentIndex === 0}
                className={`px-6 py-3 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? 'bg-[#111114] text-zinc-600 border border-white/[0.05] cursor-not-allowed'
                    : 'bg-[#121215] hover:bg-zinc-800 text-zinc-200 border border-white/[0.1] shadow-md'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>

              <button
                onClick={handleNextChapter}
                disabled={currentIndex === textbookChapters.length - 1}
                className={`px-7 py-3 rounded-full text-xs font-mono font-extrabold flex items-center gap-2 transition-all shadow-lg ${
                  currentIndex === textbookChapters.length - 1
                    ? 'bg-[#111114] text-zinc-600 border border-white/[0.05] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] hover:from-[#FF6A3D] hover:to-[#FF8E26] text-white shadow-[#FF5722]/30 hover:scale-105'
                }`}
              >
                Next Chapter
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
