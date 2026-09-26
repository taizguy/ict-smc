import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles,
  Clock
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

export type MainTabType = 
  | 'welcome'
  | 'curriculum' 
  | 'chapter_room' 
  | 'masood' 
  | 'tools'
  | 'world_map' 
  | 'textbook' 
  | 'concepts' 
  | 'chartlab' 
  | 'graph' 
  | 'compare' 
  | 'simulator' 
  | 'journal' 
  | 'backtest' 
  | 'dashboard';

interface HeaderProps {
  activeTab: MainTabType;
  setActiveTab: (tab: any) => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight?: () => void;
  onOpenWelcomeIntro?: () => void;
  progressPercent?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenMentorSpotlight, 
  onOpenWelcomeIntro,
  progressPercent = 0
}) => {
  const [nyTime, setNyTime] = useState<string>('');
  const [activeSession, setActiveSession] = useState<string>('Asian');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Scroll detection for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clock in NY time (IPDA benchmark)
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
        setActiveSession('London KZ');
      } else if (nyHour >= 7 && nyHour < 12) {
        setActiveSession('NY AM Killzone');
      } else if (nyHour >= 12 && nyHour < 16) {
        setActiveSession('NY PM Session');
      } else {
        setActiveSession('Post-Market');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine which macro section is active
  const isCurriculumActive = activeTab === 'curriculum' || activeTab === 'chapter_room' || activeTab === 'world_map' || activeTab === 'textbook';
  const isMasoodActive = activeTab === 'masood';
  const isToolsActive = activeTab === 'tools' || [
    'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'
  ].includes(activeTab);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-[#08090D]/90 backdrop-blur-xl border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
        : 'bg-[#08090D]/60 backdrop-blur-md border-white/[0.05]'
    }`}>
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenWelcomeIntro) {
                onOpenWelcomeIntro();
              } else {
                setActiveTab('welcome');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left cursor-pointer group select-none"
            title="Return to Welcome Screen"
            aria-label="Return to Welcome Screen"
          >
            {/* Minimal Technical Emblem */}
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.09] flex items-center justify-center group-hover:border-white/20 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#5865FF] group-hover:scale-125 transition-transform" />
            </div>

            <div>
              <div className="font-semibold text-sm sm:text-base tracking-tight text-[#F5F7FA] flex items-center gap-1.5 leading-none">
                <span>ICT</span>
                <span className="text-white/25">/</span>
                <span className="text-[#9BA1AE]">SMC</span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#656B78] mt-0.5">
                ACADEMY
              </div>
            </div>
          </button>
        </div>

        {/* Center: Minimal Segmented Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl">
          {/* Pillar 1: Curriculum */}
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-tight transition-all cursor-pointer ${
              isCurriculumActive
                ? 'bg-white/[0.08] text-[#F5F7FA] shadow-sm'
                : 'text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
            }`}
          >
            <span>Curriculum</span>
            <span className="ml-1.5 text-[10px] font-mono text-[#656B78]">48</span>
          </button>

          {/* Pillar 2: Masood's Academy */}
          <button
            onClick={() => setActiveTab('masood')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-tight transition-all cursor-pointer ${
              isMasoodActive
                ? 'bg-white/[0.08] text-[#F5F7FA] shadow-sm'
                : 'text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
            }`}
          >
            <span>Masood Academy</span>
            <span className="ml-1.5 text-[10px] font-mono text-[#656B78]">52</span>
          </button>

          {/* Pillar 3: Trading Tools */}
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-tight transition-all cursor-pointer ${
              isToolsActive
                ? 'bg-white/[0.08] text-[#F5F7FA] shadow-sm'
                : 'text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
            }`}
          >
            <span>Workbench &amp; Lab</span>
            <span className="ml-1.5 text-[10px] font-mono text-[#656B78]">8</span>
          </button>
        </nav>

        {/* Right: Search, Market Clock, Tribute */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NY Market Session Clock */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.07] text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52D273] animate-pulse" />
            <span className="text-[#9BA1AE] uppercase">{activeSession}</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F5F7FA] font-medium">{nyTime || '09:30:00'} EST</span>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/15 text-xs text-[#9BA1AE] hover:text-[#F5F7FA] transition-all cursor-pointer"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-sans">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[9px] font-mono bg-white/[0.06] border border-white/[0.08] rounded text-[#9BA1AE]">
              ⌘K
            </kbd>
          </button>

          {/* Mentor Tribute */}
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] text-[#9BA1AE] hover:text-[#F5F7FA] transition-all cursor-pointer"
              title="Trader Abdullah Masood Tribute"
              aria-label="Trader Abdullah Masood Tribute"
            >
              <Sparkles className="w-4 h-4 text-[#55E6D1]" />
            </button>
          )}
        </div>

      </div>

      {/* Mobile Macro Navigation Bar */}
      <div className="flex md:hidden border-t border-white/[0.06] px-3 py-2 bg-[#0C0E13]/70">
        <BauhausNavScroller innerClassName="gap-1.5">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isCurriculumActive ? 'bg-white/[0.10] text-[#F5F7FA]' : 'text-[#9BA1AE]'
            }`}
          >
            Curriculum (48)
          </button>
          <button
            onClick={() => setActiveTab('masood')}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isMasoodActive ? 'bg-white/[0.10] text-[#F5F7FA]' : 'text-[#9BA1AE]'
            }`}
          >
            Masood Academy (52)
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isToolsActive ? 'bg-white/[0.10] text-[#F5F7FA]' : 'text-[#9BA1AE]'
            }`}
          >
            Workbench &amp; Lab (8)
          </button>
        </BauhausNavScroller>
      </div>
    </header>
  );
};

export default Header;
