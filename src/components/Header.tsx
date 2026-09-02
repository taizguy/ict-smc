import React, { useState, useEffect } from 'react';
import { BookOpen, Compass, BarChart2, GitFork, GitCompare, PlayCircle, BookMarked, Cpu, Search, Clock, Award, Shield, Youtube, Sparkles, Heart } from 'lucide-react';

interface HeaderProps {
  activeTab: 'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard';
  setActiveTab: (tab: 'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard') => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight?: () => void;
  progressPercent: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSearch, onOpenMentorSpotlight, progressPercent }) => {
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
    <header className="sticky top-0 z-40 bg-[#070A12]/95 border-b border-slate-800/80 backdrop-blur-xl shadow-2xl">
      {/* Top Global Market Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-cyan-400 font-bold tracking-wider">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-extrabold uppercase">
              ICT & SMC ALGORITHMIC ACADEMY
            </span>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          {/* Mentor Acknowledgement pill */}
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-semibold transition-all group shadow-sm shadow-amber-950/40 hover:scale-105"
              title="Special Mentorship Acknowledgement: Trader Abdullah Masood"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
              <span>Mentorship: <strong className="text-amber-200">@TraderAbdullahMasood</strong></span>
              <Sparkles className="w-3 h-3 text-amber-400 group-hover:rotate-12 transition-transform" />
            </button>
          )}
        </div>

        {/* Global Clock & Search Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-slate-200 bg-[#0B0F19] px-3 py-1 rounded-lg border border-slate-800 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 text-[11px]">NY (EDT):</span>
            <span className="text-cyan-300 font-bold">{nyTime || '10:00:00'}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
              {activeSession}
            </span>
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#0B0F19] hover:bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:border-cyan-500/50 transition-all font-mono text-[11px] group shadow-sm"
            title="Global Concept Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search Concepts...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-[9px] border border-slate-700 font-bold hidden sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('textbook')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-300/40 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight font-display flex items-center gap-1.5">
              <span>ICT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">ACADEMY</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400/80 font-semibold tracking-wider">THE COMPLETE DIGITAL BIBLE</div>
          </div>
        </div>

        {/* Modern Vibrant Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-[#0B0F19]/80 p-1.5 rounded-xl border border-slate-800/90 shadow-inner shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'}`} />
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
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-mono font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span className="hidden sm:inline">Mentor Tribute</span>
              <span className="sm:hidden">Tribute</span>
            </button>
          )}

          {/* Progress summary widget */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="hidden xl:flex items-center gap-3 bg-[#0B0F19] px-3.5 py-1.5 rounded-xl border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-colors shrink-0 shadow-sm"
          >
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Mastery</div>
              <div className="text-xs font-mono font-bold text-cyan-300">{progressPercent}%</div>
            </div>
            <div className="w-12 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
