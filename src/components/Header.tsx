import React, { useState, useEffect } from 'react';
import { BookOpen, Compass, BarChart2, GitFork, GitCompare, PlayCircle, BookMarked, Cpu, Search, Clock, Award, Shield, Youtube, Sparkles, Heart, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard';
  setActiveTab: (tab: 'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard') => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight?: () => void;
  onOpenWelcomeIntro?: () => void;
  progressPercent: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenMentorSpotlight, 
  onOpenWelcomeIntro,
  progressPercent 
}) => {
  const [nyTime, setNyTime] = useState<string>('');
  const [activeSession, setActiveSession] = useState<string>('Asian');

  // Clock in NY time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nyTimeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setNyTime(nyTimeString);

      const nyHour = parseInt(nyTimeString.split(':')[0], 10);
      if (nyHour >= 20 || nyHour < 2) {
        setActiveSession('Asia');
      } else if (nyHour >= 2 && nyHour < 7) {
        setActiveSession('London Killzone');
      } else if (nyHour >= 7 && nyHour < 12) {
        setActiveSession('New York AM');
      } else if (nyHour >= 12 && nyHour < 16) {
        setActiveSession('New York PM');
      } else {
        setActiveSession('Post-Market');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'textbook', label: 'Bible & Textbook', icon: BookOpen },
    { id: 'concepts', label: 'Encyclopedia', icon: Compass },
    { id: 'chartlab', label: 'Chart Lab', icon: BarChart2 },
    { id: 'graph', label: 'Knowledge Graph', icon: GitFork },
    { id: 'compare', label: 'Compare', icon: GitCompare },
    { id: 'simulator', label: 'Trade Simulator', icon: PlayCircle },
    { id: 'journal', label: 'Trading Journal', icon: BookMarked },
    { id: 'backtest', label: 'Backtest Lab', icon: Cpu },
    { id: 'dashboard', label: 'Mastery', icon: Award }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/90 backdrop-blur-xl shadow-sm">
      {/* Top Global Market Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onOpenWelcomeIntro) {
                onOpenWelcomeIntro();
              }
            }}
            className="flex items-center gap-2 font-mono text-sky-700 font-bold tracking-wider hover:opacity-85 transition-opacity cursor-pointer text-left"
            title="Return to Animated Journey & Opening Screen"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-600"></span>
            </span>
            <span className="text-slate-900 font-extrabold uppercase tracking-tight hover:text-sky-600 transition-colors">
              ICT & SMC ALGORITHMIC ACADEMY
            </span>
          </button>

          <span className="text-slate-300 hidden sm:inline">•</span>

          {/* Mentor Acknowledgement pill */}
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-mono font-semibold transition-all group shadow-sm hover:scale-105"
              title="Special Mentorship Acknowledgement: Trader Abdullah Masood"
            >
              <Youtube className="w-3.5 h-3.5 text-red-600 fill-red-600/20" />
              <span>Mentorship: <strong className="text-amber-800">@TraderAbdullahMasood</strong></span>
              <Sparkles className="w-3 h-3 text-amber-600 group-hover:rotate-12 transition-transform" />
            </button>
          )}

          {/* Welcome Intro Trigger */}
          {onOpenWelcomeIntro && (
            <button
              onClick={onOpenWelcomeIntro}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-mono font-semibold transition-all"
              title="Return to Animated Journey & Opening Screen"
            >
              <span>Student Story</span>
            </button>
          )}
        </div>

        {/* Global Clock & Search Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-500 text-[11px]">NY (EDT):</span>
            <span className="text-slate-900 font-bold">{nyTime || '10:00:00'}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
              {activeSession}
            </span>
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 hover:border-sky-400 transition-all font-mono text-[11px] group shadow-sm"
            title="Global Concept Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search Concepts...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-600 text-[9px] border border-slate-300 font-bold hidden sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            if (onOpenWelcomeIntro) {
              onOpenWelcomeIntro();
            } else {
              setActiveTab('textbook');
            }
          }}
          className="flex items-center gap-3 cursor-pointer shrink-0 group text-left focus:outline-none"
          title="Return to Animated Opening Screen"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-md shadow-sky-500/25 border border-sky-400/40 group-hover:scale-105 transition-transform text-white">
            <Shield className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base tracking-tight font-display flex items-center gap-1.5">
              <span>ICT</span>
              <span className="text-sky-600 group-hover:text-blue-700 transition-colors">ACADEMY</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider group-hover:text-sky-600 transition-colors">THE COMPLETE DIGITAL BIBLE</div>
          </div>
        </button>

        {/* Modern Vibrant Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 shadow-inner shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white stroke-[2.5]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-mono font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span className="hidden sm:inline">Mentor Tribute</span>
              <span className="sm:hidden">Tribute</span>
            </button>
          )}

          {/* Progress summary widget */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="hidden xl:flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200 cursor-pointer hover:border-sky-400 transition-colors shrink-0 shadow-sm"
          >
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Mastery</div>
              <div className="text-xs font-mono font-bold text-sky-700">{progressPercent}%</div>
            </div>
            <div className="w-12 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 rounded-full shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

