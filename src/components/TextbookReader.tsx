import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { TextbookChapter } from '../types';
import { InteractiveDiagram } from './InteractiveDiagram';
import { 
  BookOpen, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  Eye, 
  Bookmark, 
  Layers, 
  Lightbulb, 
  CheckSquare,
  LayoutGrid,
  Clock,
  Award,
  Zap,
  Compass,
  ArrowRight,
  GraduationCap,
  Youtube,
  Search,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TextbookReaderProps {
  onSelectConcept: (conceptId: string) => void;
  onOpenQuiz: () => void;
}

export const TextbookReader: React.FC<TextbookReaderProps> = ({ onSelectConcept, onOpenQuiz }) => {
  const [viewMode, setViewMode] = useState<'syllabus' | 'reader'>('syllabus');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(textbookChapters[0].id);
  const [explainSimpler, setExplainSimpler] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<number[]>([1, 2]);
  const [bookmarkedChapters, setBookmarkedChapters] = useState<number[]>([]);
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

  const toggleBookmark = (id: number) => {
    if (bookmarkedChapters.includes(id)) {
      setBookmarkedChapters(bookmarkedChapters.filter((c) => c !== id));
    } else {
      setBookmarkedChapters([...bookmarkedChapters, id]);
    }
  };

  const toggleComplete = (id: number) => {
    if (completedChapters.includes(id)) {
      setCompletedChapters(completedChapters.filter((c) => c !== id));
    } else {
      setCompletedChapters([...completedChapters, id]);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    }
  };

  const getPartColor = (partName: string) => {
    if (partName.includes('Part I') || partName.includes('Foundations')) {
      return { border: 'border-emerald-500/50', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40', accent: 'text-emerald-400' };
    }
    if (partName.includes('Part II') || partName.includes('Algorithmic')) {
      return { border: 'border-cyan-500/50', badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40', accent: 'text-cyan-400' };
    }
    if (partName.includes('Part III') || partName.includes('Liquidity')) {
      return { border: 'border-blue-500/50', badge: 'bg-blue-950/80 text-blue-300 border-blue-500/40', accent: 'text-blue-400' };
    }
    if (partName.includes('Part IV') || partName.includes('Structure')) {
      return { border: 'border-purple-500/50', badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40', accent: 'text-purple-400' };
    }
    if (partName.includes('Part V') || partName.includes('Imbalances') || partName.includes('Order Blocks')) {
      return { border: 'border-pink-500/50', badge: 'bg-pink-950/80 text-pink-300 border-pink-500/40', accent: 'text-pink-400' };
    }
    if (partName.includes('Part VI') || partName.includes('Time')) {
      return { border: 'border-amber-500/50', badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40', accent: 'text-amber-400' };
    }
    if (partName.includes('Part VII') || partName.includes('Execution')) {
      return { border: 'border-orange-500/50', badge: 'bg-orange-950/80 text-orange-300 border-orange-500/40', accent: 'text-orange-400' };
    }
    // Abdullah Masood Masterclass
    return { border: 'border-amber-400', badge: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-300 font-extrabold', accent: 'text-amber-300' };
  };

  const getDifficultyBadge = (level: number) => {
    switch (level) {
      case 0:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">Level 0: Foundation</span>;
      case 1:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">Level 1: Core</span>;
      case 2:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">Level 2: Advanced</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">Level 3: Masterclass</span>;
    }
  };

  const completionPercentage = Math.round((completedChapters.length / textbookChapters.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Syllabus Control & Progress Banner */}
      <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>OFFICIAL CURRICULUM SYLLABUS</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">23 Chapters • 8 Master Modules</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              The Institutional Trading Syllabus
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl font-sans leading-relaxed">
              A comprehensive, zero-fluff syllabus for institutional order flow, algorithmic price delivery, and high-probability SMC execution models.
            </p>
          </div>

          {/* View Mode Toggle & Progress Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            {/* View Mode Switch */}
            <div className="flex items-center p-1 rounded-xl bg-[#070A12] border border-slate-800 shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('syllabus')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'syllabus'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Syllabus Grid</span>
              </button>
              <button
                onClick={() => setViewMode('reader')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'reader'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter Reader</span>
              </button>
            </div>

            {/* Quick Progress Ring Box */}
            <div className="bg-[#070A12] px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-mono font-extrabold text-xs text-cyan-300">
                {completionPercentage}%
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Completed</div>
                <div className="text-xs font-mono font-bold text-white">
                  {completedChapters.length} / {textbookChapters.length} Units
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 w-full bg-[#070A12] h-2.5 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-500 rounded-full shadow-sm"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* SYLLABUS GRID VIEW MODE */}
      {viewMode === 'syllabus' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedPartFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedPartFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:text-slate-200'
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                        : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search syllabus topics & terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
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
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${styling.badge}`}>
                          {partName}
                        </span>
                        {isAbdullahMasood && (
                          <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                            <Youtube className="w-3.5 h-3.5 text-red-400" />
                            <span>Mentor Spotlight Series</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {chapters.filter((c) => completedChapters.includes(c.id)).length} of {chapters.length} Completed
                      </span>
                    </div>

                    {/* Chapter Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chapters.map((ch) => {
                        const isCompleted = completedChapters.includes(ch.id);
                        const isBookmarked = bookmarkedChapters.includes(ch.id);

                        return (
                          <div
                            key={ch.id}
                            className={`group bg-[#0B0F19] border ${
                              isCompleted ? 'border-emerald-500/40 bg-gradient-to-b from-[#0B0F19] to-emerald-950/10' : 'border-slate-800/90'
                            } hover:border-cyan-500/60 rounded-xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between gap-4 hover:translate-y-[-2px] hover:shadow-cyan-500/10`}
                          >
                            <div className="space-y-3">
                              {/* Top Bar of Card */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-extrabold bg-[#070A12] text-cyan-400 border border-slate-800">
                                    CH {ch.id < 10 ? `0${ch.id}` : ch.id}
                                  </span>
                                  {getDifficultyBadge(ch.level)}
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleBookmark(ch.id);
                                    }}
                                    className={`p-1.5 rounded-lg border transition-colors ${
                                      isBookmarked
                                        ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                                        : 'bg-[#070A12] border-slate-800 text-slate-500 hover:text-slate-300'
                                    }`}
                                  >
                                    <Bookmark className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleComplete(ch.id);
                                    }}
                                    className={`p-1.5 rounded-lg border transition-all ${
                                      isCompleted
                                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                                        : 'bg-[#070A12] border-slate-800 text-slate-500 hover:text-slate-300'
                                    }`}
                                    title={isCompleted ? 'Mastered' : 'Mark as Complete'}
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </button>
                                </div>
                              </div>

                              {/* Chapter Title */}
                              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors line-clamp-2">
                                {ch.title}
                              </h3>

                              {/* Quote / Summary Preview */}
                              <p className="text-xs text-slate-400 font-sans line-clamp-2 italic border-l-2 border-slate-800 pl-2">
                                "{ch.quote}"
                              </p>
                            </div>

                            {/* Card Footer & Action */}
                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono">
                              <span className="text-slate-500">
                                {ch.sections.length} Sections • {ch.practiceQuestions.length} Practice
                              </span>

                              <button
                                onClick={() => {
                                  setSelectedChapterId(ch.id);
                                  setViewMode('reader');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700/80 hover:border-cyan-400 font-bold transition-all flex items-center gap-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950"
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
            <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-4 shadow-xl sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <button
                  onClick={() => setViewMode('syllabus')}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Syllabus</span>
                </button>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-2 py-0.5 rounded">
                  {completedChapters.length}/{textbookChapters.length} Done
                </span>
              </div>

              {/* Chapter Navigation List */}
              <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {textbookChapters.map((ch) => {
                  const isSelected = ch.id === selectedChapterId;
                  const isCompleted = completedChapters.includes(ch.id);
                  const isBookmarked = bookmarkedChapters.includes(ch.id);

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setExplainSimpler(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/90 to-[#070A12] text-cyan-300 border border-cyan-500/60 shadow-md'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="font-bold text-cyan-400">CH {ch.id}</span>
                          <span>•</span>
                          <span className="truncate">{ch.part.split('-')[0]}</span>
                        </div>
                        <div className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {ch.title}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 mt-1">
                        {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />}
                        {isBookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
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
            <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyan-400 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-extrabold">
                    {chapter.part}
                  </span>
                  <span>•</span>
                  {getDifficultyBadge(chapter.level)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(chapter.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      bookmarkedChapters.includes(chapter.id)
                        ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                        : 'bg-[#070A12] border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Bookmark Chapter"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleComplete(chapter.id)}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                      completedChapters.includes(chapter.id)
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                        : 'bg-[#070A12] border-slate-700 text-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {completedChapters.includes(chapter.id) ? 'Mastered ✓' : 'Mark as Mastered'}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-3">
                Chapter {chapter.id}: {chapter.title}
              </h1>

              {/* Master Quotation */}
              <blockquote className="my-5 p-4 border-l-4 border-cyan-400 bg-[#070A12] rounded-r-xl text-slate-200 italic text-xs sm:text-sm font-serif leading-relaxed shadow-inner">
                "{chapter.quote}"
              </blockquote>

              {/* Interactive Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setExplainSimpler(!explainSimpler)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    explainSimpler
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/25'
                      : 'bg-[#070A12] hover:bg-slate-800 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {explainSimpler ? 'Show Standard Technical Version' : 'Explain Simpler (First-Principles Analogy)'}
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20"
                >
                  <Lightbulb className="w-4 h-4 text-slate-950 fill-slate-950" />
                  Test Me On This Concept
                </button>
              </div>
            </div>

            {/* Beginner Analogy Callout (If active) */}
            {explainSimpler && (
              <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-6 text-xs text-amber-200 font-mono space-y-3 animate-fadeIn shadow-xl">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Simplified First-Principles Analogy:</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-sm font-sans">
                  Imagine an auction house where 50 buyers enter wanting to buy gold coins. As they buy all the cheap coins at $100, the next coin costs $110. Price jumped not because buyers outnumbered sellers, but because cheap resting supply was exhausted. ICT concepts are simply footprints of where these bulk transactions leave empty zones on the floor.
                </p>
              </div>
            )}

            {/* Main Chapter Content Sections */}
            <div className="space-y-6">
              {chapter.sections.map((sec) => (
                <div key={sec.id} className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
                  <h3 className="text-lg font-bold text-white font-display tracking-tight flex items-center gap-2.5">
                    <span className="w-2 h-5 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full" />
                    {sec.title}
                  </h3>

                  <div className="text-slate-200 text-sm leading-relaxed font-sans space-y-3 whitespace-pre-line">
                    {sec.content}
                  </div>

                  {/* Embedded Diagram if specified */}
                  {sec.diagramType && (
                    <div className="mt-5 pt-4 border-t border-slate-800/80">
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
            <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center gap-2.5 text-white font-display text-lg font-bold">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                <span>Chapter {chapter.id} Summary & Ruleset</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#070A12] p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Core Takeaways:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {chapter.summary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#070A12] p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Key Terminology Glossary:</span>
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300 max-h-56 overflow-y-auto pr-1">
                    {chapter.keyTerms.map((kt, idx) => (
                      <div key={idx} className="border-b border-slate-800/80 pb-2">
                        <span className="font-bold text-white font-mono">{kt.term}: </span>
                        <span className="text-slate-400">{kt.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Questions Accordion */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-2 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showQuestions ? 'Hide' : 'Show'} Self-Check Practice Questions ({chapter.practiceQuestions.length})</span>
                </button>

                {showQuestions && (
                  <div className="mt-4 space-y-2.5 bg-[#070A12] p-5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {chapter.practiceQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-cyan-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Q{idx + 1}</span>
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
                className={`px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? 'bg-[#0B0F19] text-slate-600 border border-slate-800 cursor-not-allowed'
                    : 'bg-[#0B0F19] hover:bg-slate-800 text-slate-200 border border-slate-700 shadow-md'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>

              <button
                onClick={handleNextChapter}
                disabled={currentIndex === textbookChapters.length - 1}
                className={`px-6 py-3 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 transition-all shadow-lg ${
                  currentIndex === textbookChapters.length - 1
                    ? 'bg-[#0B0F19] text-slate-600 border border-slate-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 shadow-cyan-500/25'
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
