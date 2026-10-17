import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles,
  Clock
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

export type MainTabType = 
  | 'welcome'
  | 'articles'
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
  | 'dashboard'
  | 'masterclass'
  | 'ict_suite'
  | 'disclaimer'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'adsense'
  | 'not_found';

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
    'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard', 'masterclass', 'ict_suite'
  ].includes(activeTab);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-canvas/90 backdrop-blur-xl border-ink/[0.08] shadow-[0_4px_30px_rgba(34,59,53,0.06)]'
        : 'bg-canvas/60 backdrop-blur-md border-ink/[0.05]'
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
            <div className="w-8 h-8 rounded-lg bg-ink/[0.04] border border-ink/[0.09] flex items-center justify-center group-hover:border-ink/20 transition-all">
              <span className="w-2 h-2 rounded-full bg-brand group-hover:scale-125 transition-transform" />
            </div>

            <div>
              <div className="font-semibold text-sm sm:text-base tracking-tight text-ink flex items-center gap-1.5 leading-none">
                <span>ICT</span>
                <span className="text-ink">/</span>
                <span className="text-ink-secondary">SMC</span>
              </div>
              <div className="text-[0.8125rem] font-sans tabular-nums tracking-[0.16em] uppercase text-ink-muted mt-0.5">
                ACADEMY
              </div>
            </div>
          </button>
        </div>

        {/* Center: Minimal Segmented Navigation */}
        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1 p-1 bg-ink/[0.03] border border-ink/[0.07] rounded-xl">
          {/* Pillar 1: Curriculum */}
          <a href="/curriculum/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isCurriculumActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>Curriculum</span>
          </a>

          <a href="/articles/" aria-current={activeTab === 'articles' ? 'page' : undefined}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'articles' ? 'bg-ink/[0.08] text-ink' : 'text-ink-secondary hover:text-ink'}`}>Articles</a>

          {/* Pillar 2: Masood's Academy */}
          <a href="/masood/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isMasoodActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>Masood Academy</span>
          </a>

          {/* Pillar 3: Trading Tools */}
          <a href="/tools/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isToolsActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>Workbench &amp; Lab</span>
          </a>
        </nav>

        {/* Right: Search, Market Clock, Tribute */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NY Market Session Clock */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink/[0.02] border border-ink/[0.07] text-xs font-sans tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
            <span className="text-ink-secondary uppercase">{activeSession}</span>
            <span className="text-ink">|</span>
            <span className="text-ink font-medium">{nyTime || 'Loading time…'} ET</span>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.07] border border-ink/[0.07] hover:border-ink/15 text-xs text-ink-secondary hover:text-ink transition-all cursor-pointer"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-sans">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[0.8125rem] font-sans tabular-nums bg-ink/[0.06] border border-ink/[0.08] rounded text-ink-secondary">
              ⌘K
            </kbd>
          </button>

          {/* Mentor Tribute */}
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="p-2 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.08] border border-ink/[0.07] text-ink-secondary hover:text-ink transition-all cursor-pointer"
              title="Trader Abdullah Masood Tribute"
              aria-label="Trader Abdullah Masood Tribute"
            >
              <Sparkles className="w-4 h-4 text-teal" />
            </button>
          )}
        </div>

      </div>

      {/* Mobile Macro Navigation Bar */}
      <div role="navigation" aria-label="Main navigation" className="flex xl:hidden border-t border-ink/[0.06] px-3 py-2 bg-surface-muted/70">
        <BauhausNavScroller innerClassName="gap-1.5">
          <a href="/curriculum/"
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isCurriculumActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >
            Curriculum
          </a>
          <a href="/articles/" aria-current={activeTab === 'articles' ? 'page' : undefined}
            className={`min-h-11 inline-flex items-center px-3 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 ${activeTab === 'articles' ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'}`}>Articles</a>
          <a href="/masood/"
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isMasoodActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >
            Masood Academy
          </a>
          <a href="/tools/"
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isToolsActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >
            Workbench &amp; Lab
          </a>
        </BauhausNavScroller>
      </div>
    </header>
  );
};

export default Header;
