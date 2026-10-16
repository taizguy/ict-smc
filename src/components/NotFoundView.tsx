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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-fade-in text-ink">
      
      {/* 404 Status Header */}
      <div className="bg-surface border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 text-xs font-sans tabular-nums uppercase tracking-widest text-amber-700">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>HTTP 404 // MODULE NOT FOUND</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Requested Trading Module Does Not Exist
        </h1>

        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl">
          The path <code className="px-2 py-0.5 rounded bg-ink/[0.06] font-sans tabular-nums text-teal text-xs">{attemptedPath}</code> does not match any published ICT textbook chapter, masterclass lecture, or workbench laboratory tool on <strong className="text-ink">LearnSMC</strong>.
        </p>

        {/* Search Input */}
        <div className="pt-2 max-w-md">
          <label className="block text-xs font-sans tabular-nums uppercase text-ink-muted mb-1.5">
            Search 57 Institutional Chapters
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by topic (e.g. Fair Value Gap, Liquidity, PO3)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-canvas border border-ink/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs font-sans tabular-nums text-ink placeholder-[#5f7064] focus:outline-none focus:border-brand transition-all"
            />
          </div>

          {/* Quick Filter Results */}
          {matchingChapters.length > 0 && (
            <div className="mt-3 space-y-2">
              <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-wider text-teal">
                Matching Chapters:
              </span>
              <div className="space-y-1.5">
                {matchingChapters.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChapter ? onSelectChapter(ch.id, ch.slug) : onNavigate('chapter_room')}
                    className="w-full text-left p-2.5 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.07] border border-ink/[0.06] text-xs flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div>
                      <span className="font-sans tabular-nums text-brand text-[0.8125rem] mr-2">CH {ch.id < 10 ? `0${ch.id}` : ch.id}</span>
                      <span className="text-ink group-hover:text-teal transition-colors">{ch.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
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
          className="p-5 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.05] border border-ink/[0.08] hover:border-brand/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-ink group-hover:text-brand transition-colors">
            Curriculum Directory
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Browse all 57 codified chapters organized from Foundations to Execution.
          </p>
        </button>

        <button
          onClick={() => onNavigate('masood')}
          className="p-5 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.05] border border-ink/[0.08] hover:border-negative/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-negative/10 border border-negative/20 flex items-center justify-center text-negative">
            <Youtube className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-ink group-hover:text-negative transition-colors">
            Masood Academy
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed">
            52 institutional masterclasses, Daily Bias tool, and 10 Golden Execution Rules.
          </p>
        </button>

        <button
          onClick={() => onNavigate('tools')}
          className="p-5 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.05] border border-ink/[0.08] hover:border-teal/40 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
            <Wrench className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-ink group-hover:text-teal transition-colors">
            Trading Workbench
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Chart Lab, Trade Simulator, Monte Carlo Backtesting, and Concept Explorer.
          </p>
        </button>

        <button
          onClick={() => onNavigate('welcome')}
          className="p-5 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.05] border border-ink/[0.08] hover:border-ink/30 text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center text-ink">
            <Home className="w-4 h-4" />
          </div>
          <div className="font-semibold text-sm text-ink group-hover:text-ink transition-colors">
            Return Home
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Go back to the LearnSMC overview and institutional codex entrance.
          </p>
        </button>

      </div>

    </div>
  );
};

export default NotFoundView;
