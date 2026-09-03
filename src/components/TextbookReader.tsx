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
      return { border: 'border-emerald-300', badge: 'bg-emerald-50 text-emerald-800 border-emerald-300', accent: 'text-emerald-600' };
    }
    if (partName.includes('Part II') || partName.includes('Algorithmic')) {
      return { border: 'border-sky-300', badge: 'bg-sky-50 text-sky-800 border-sky-300', accent: 'text-sky-600' };
    }
    if (partName.includes('Part III') || partName.includes('Liquidity')) {
      return { border: 'border-blue-300', badge: 'bg-blue-50 text-blue-800 border-blue-300', accent: 'text-blue-600' };
    }
    if (partName.includes('Part IV') || partName.includes('Structure')) {
      return { border: 'border-purple-300', badge: 'bg-purple-50 text-purple-800 border-purple-300', accent: 'text-purple-600' };
    }
    if (partName.includes('Part V') || partName.includes('Imbalances') || partName.includes('Order Blocks')) {
      return { border: 'border-rose-300', badge: 'bg-rose-50 text-rose-800 border-rose-300', accent: 'text-rose-600' };
    }
    if (partName.includes('Part VI') || partName.includes('Time')) {
      return { border: 'border-amber-300', badge: 'bg-amber-50 text-amber-800 border-amber-300', accent: 'text-amber-600' };
    }
    if (partName.includes('Part VII') || partName.includes('Execution')) {
      return { border: 'border-orange-300', badge: 'bg-orange-50 text-orange-800 border-orange-300', accent: 'text-orange-600' };
    }
    // Abdullah Masood Masterclass
    return { border: 'border-amber-400', badge: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-sm', accent: 'text-amber-800' };
  };

  const getDifficultyBadge = (level: number) => {
    switch (level) {
      case 0:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">Level 0: Foundation</span>;
      case 1:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-50 text-sky-800 border border-sky-300">Level 1: Core</span>;
      case 2:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-300">Level 2: Advanced</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">Level 3: Masterclass</span>;
    }
  };

  const completionPercentage = Math.round((completedChapters.length / textbookChapters.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Syllabus Control & Progress Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <span>OFFICIAL CURRICULUM SYLLABUS</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500 font-medium">23 Chapters • 8 Master Modules</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              The Institutional Trading Syllabus
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans leading-relaxed">
              A comprehensive, zero-fluff syllabus for institutional order flow, algorithmic price delivery, and high-probability SMC execution models.
            </p>
          </div>

          {/* View Mode Toggle & Progress Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            {/* View Mode Switch */}
            <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('syllabus')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'syllabus'
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Syllabus Grid</span>
              </button>
              <button
                onClick={() => setViewMode('reader')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'reader'
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter Reader</span>
              </button>
            </div>

            {/* Quick Progress Ring Box */}
            <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-3 shrink-0 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center font-mono font-extrabold text-xs text-sky-700 shadow-sm">
                {completionPercentage}%
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Completed</div>
                <div className="text-xs font-mono font-bold text-slate-800">
                  {completedChapters.length} / {textbookChapters.length} Units
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 transition-all duration-500 rounded-full shadow-sm"
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedPartFilter === 'all'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                        : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search syllabus topics & terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400 shadow-sm"
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
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${styling.badge}`}>
                          {partName}
                        </span>
                        {isAbdullahMasood && (
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                            <Youtube className="w-3.5 h-3.5 text-red-600" />
                            <span>Mentor Spotlight Series</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        {chapters.filter((c) => completedChapters.includes(c.id)).length} of {chapters.length} Completed
                      </span>
                    </div>

                    {/* Chapter Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {chapters.map((ch) => {
                        const isCompleted = completedChapters.includes(ch.id);
                        const isBookmarked = bookmarkedChapters.includes(ch.id);

                        return (
                          <div
                            key={ch.id}
                            className={`group bg-white border-2 ${
                              isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                            } hover:border-sky-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 hover:-translate-y-0.5`}
                          >
                            <div className="space-y-3">
                              {/* Top Bar of Card */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-extrabold bg-sky-100 text-sky-800 border border-sky-300">
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
                                        ? 'bg-amber-100 border-amber-400 text-amber-700'
                                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
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
                                        ? 'bg-emerald-500 border-emerald-600 text-white'
                                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                    }`}
                                    title={isCompleted ? 'Mastered' : 'Mark as Complete'}
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </button>
                                </div>
                              </div>

                              {/* Chapter Title */}
                              <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-700 transition-colors line-clamp-2">
                                {ch.title}
                              </h3>

                              {/* Quote / Summary Preview */}
                              <p className="text-xs text-slate-500 font-sans line-clamp-2 italic border-l-2 border-sky-300 pl-2">
                                "{ch.quote}"
                              </p>
                            </div>

                            {/* Card Footer & Action */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs font-mono">
                              <span className="text-slate-500">
                                {ch.sections.length} Sections • {ch.practiceQuestions.length} Practice
                              </span>

                              <button
                                onClick={() => {
                                  setSelectedChapterId(ch.id);
                                  setViewMode('reader');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-800 border border-slate-200 hover:border-sky-600 font-bold transition-all flex items-center gap-1.5 group-hover:bg-sky-600 group-hover:text-white shadow-sm"
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
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <button
                  onClick={() => setViewMode('syllabus')}
                  className="flex items-center gap-2 text-sky-700 hover:text-sky-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Syllabus</span>
                </button>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
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
                          ? 'bg-sky-50 text-sky-900 border-2 border-sky-400 font-bold shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="font-bold text-sky-700">CH {ch.id}</span>
                          <span>•</span>
                          <span className="truncate">{ch.part.split('-')[0]}</span>
                        </div>
                        <div className={`font-semibold truncate ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                          {ch.title}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 mt-1">
                        {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                        {isBookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-sky-700 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 font-extrabold">
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
                        ? 'bg-amber-100 border-amber-400 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                    title="Bookmark Chapter"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleComplete(chapter.id)}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                      completedChapters.includes(chapter.id)
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {completedChapters.includes(chapter.id) ? 'Mastered ✓' : 'Mark as Mastered'}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mt-3">
                Chapter {chapter.id}: {chapter.title}
              </h1>

              {/* Master Quotation */}
              <blockquote className="my-5 p-4 border-l-4 border-sky-500 bg-sky-50/50 rounded-r-2xl text-slate-700 italic text-xs sm:text-sm font-serif leading-relaxed shadow-sm">
                "{chapter.quote}"
              </blockquote>

              {/* Interactive Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setExplainSimpler(!explainSimpler)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    explainSimpler
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {explainSimpler ? 'Show Standard Technical Version' : 'Explain Simpler (First-Principles Analogy)'}
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white flex items-center gap-2 transition-all shadow-md shadow-sky-600/20"
                >
                  <Lightbulb className="w-4 h-4 text-white fill-white" />
                  Test Me On This Concept
                </button>
              </div>
            </div>

            {/* Beginner Analogy Callout (If active) */}
            {explainSimpler && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-xs text-amber-900 font-mono space-y-3 animate-fadeIn shadow-sm">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Simplified First-Principles Analogy:</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm font-sans">
                  Imagine an auction house where 50 buyers enter wanting to buy gold coins. As they buy all the cheap coins at $100, the next coin costs $110. Price jumped not because buyers outnumbered sellers, but because cheap resting supply was exhausted. ICT concepts are simply footprints of where these bulk transactions leave empty zones on the floor.
                </p>
              </div>
            )}

            {/* Main Chapter Content Sections */}
            <div className="space-y-6">
              {chapter.sections.map((sec) => (
                <div key={sec.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 font-display tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-gradient-to-b from-sky-500 to-blue-600 rounded-full" />
                    {sec.title}
                  </h3>

                  <div className="text-slate-700 text-sm leading-relaxed font-sans space-y-3 whitespace-pre-line">
                    {sec.content.replace(/\*/g, '')}
                  </div>

                  {/* Embedded Diagram if specified */}
                  {sec.diagramType && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-slate-900 font-display text-lg font-bold">
                <CheckSquare className="w-5 h-5 text-emerald-600" />
                <span>Chapter {chapter.id} Summary & Ruleset</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Core Takeaways:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {chapter.summary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Key Terminology Glossary:</span>
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700 max-h-56 overflow-y-auto pr-1">
                    {chapter.keyTerms.map((kt, idx) => (
                      <div key={idx} className="border-b border-slate-200/80 pb-2">
                        <span className="font-bold text-slate-900 font-mono">{kt.term}: </span>
                        <span className="text-slate-600">{kt.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Questions Accordion */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="text-xs font-mono text-sky-700 hover:text-sky-800 font-bold flex items-center gap-2 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showQuestions ? 'Hide' : 'Show'} Self-Check Practice Questions ({chapter.practiceQuestions.length})</span>
                </button>

                {showQuestions && (
                  <div className="mt-4 space-y-2.5 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700">
                    {chapter.practiceQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-sky-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">Q{idx + 1}</span>
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
                className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>

              <button
                onClick={handleNextChapter}
                disabled={currentIndex === textbookChapters.length - 1}
                className={`px-6 py-3 rounded-2xl text-xs font-mono font-extrabold flex items-center gap-2 transition-all shadow-md ${
                  currentIndex === textbookChapters.length - 1
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-sky-600/20'
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
