import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BookOpen, 
  Home, 
  Youtube, 
  Wrench, 
  ArrowRight, 
  Search,
  Compass
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';
import { MainTabType } from './Header';

interface NotFoundViewProps {
  attemptedPath?: string;
  onNavigate: (tab: MainTabType, extraSlug?: string) => void;
  onSelectChapter?: (chapterId: number, slug: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  attemptedPath = window.location.pathname,
  onNavigate,
  onSelectChapter
}) => {
  const [query, setQuery] = useState('');

  const matchingChapters = query.trim()
    ? textbookChapters.filter(ch => 
        ch.title.toLowerCase().includes(query.toLowerCase()) ||
        ch.slug.toLowerCase().includes(query.toLowerCase()) ||
        ch.summary.some(s => s.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-fade-in text-[#F5F7FA]">
      
      {/* 404 Status Header */}
      <div className="bg-[#11141B] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>HTTP 404 // MODULE NOT FOUND</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Requested Trading Module Does Not Exist
        </h1>

        <p className="text-sm sm:text-base text-[#9BA1AE] leading-relaxed max-w-2xl">
          The path <code className="px-2 py-0.5 rounded bg-white/[0.06] font-mono text-[#55E6D1] text-xs">{attemptedPath}</code> does not match any published ICT textbook chapter, masterclass lecture, or workbench laboratory tool on <strong className="text-white">LearnSMC</strong>.
        </p>

        {/* Search Input */}
        <div className="pt-2 max-w-md">
          <label className="block text-xs font-mono uppercase text-[#656B78] mb-1.5">
            Search 57 Institutional Chapters
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#656B78] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by topic (e.g. Fair Value Gap, Liquidity, PO3)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#08090D] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs font-mono text-white placeholder-[#656B78] focus:outline-none focus:border-[#5865FF] transition-all"
            />
          </div>

          {/* Quick Filter Results */}
          {matchingChapters.length > 0 && (
            <div className="mt-3 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#55E6D1]">
                Matching Chapters:
              </span>
              <div className="space-y-1.5">
                {matchingChapters.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChapter ? onSelectChapter(ch.id, ch.slug) : onNavigate('chapter_room')}
                    className="w-full text-left p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-xs flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[#5865FF] text-[10px] mr-2">CH {ch.id < 10 ? `0${ch.id}` : ch.id}</span>
                      <span className="text-white group-hover:text-[#55E6D1] transition-colors">{ch.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#656B78] group-hover:text-[#55E6D1] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Primary Navigation Destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <button
          onClick={() => onNavigate('curriculum')}
          className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#5865FF]/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5865FF]/10 border border-[#5865FF]/20 flex items-center justify-center text-[#5865FF]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-white group-hover:text-[#5865FF] transition-colors">
            Curriculum Directory
          </div>
          <p className="text-xs text-[#9BA1AE] leading-relaxed">
            Browse all 57 codified chapters organized from Foundations to Execution.
          </p>
        </button>

        <button
          onClick={() => onNavigate('masood')}
          className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#FF6B7A]/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FF6B7A]/10 border border-[#FF6B7A]/20 flex items-center justify-center text-[#FF6B7A]">
            <Youtube className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-white group-hover:text-[#FF6B7A] transition-colors">
            Masood Academy
          </div>
          <p className="text-xs text-[#9BA1AE] leading-relaxed">
            52 institutional masterclasses, Daily Bias tool, and 10 Golden Execution Rules.
          </p>
        </button>

        <button
          onClick={() => onNavigate('tools')}
          className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#55E6D1]/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#55E6D1]/10 border border-[#55E6D1]/20 flex items-center justify-center text-[#55E6D1]">
            <Wrench className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-white group-hover:text-[#55E6D1] transition-colors">
            Trading Workbench
          </div>
          <p className="text-xs text-[#9BA1AE] leading-relaxed">
            Chart Lab, Trade Simulator, Monte Carlo Backtesting, and Concept Explorer.
          </p>
        </button>

        <button
          onClick={() => onNavigate('welcome')}
          className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/30 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
            <Home className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-white group-hover:text-white transition-colors">
            Return Home
          </div>
          <p className="text-xs text-[#9BA1AE] leading-relaxed">
            Go back to the LearnSMC overview and institutional codex entrance.
          </p>
        </button>

      </div>

    </div>
  );
};

export default NotFoundView;
