import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Youtube, 
  Wrench, 
  Search, 
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
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
  onOpenWelcomeIntro
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

  // Determine which macro section is active
  const isCurriculumActive = activeTab === 'curriculum' || activeTab === 'chapter_room' || activeTab === 'world_map' || activeTab === 'textbook';
  const isMasoodActive = activeTab === 'masood';
  const isToolsActive = activeTab === 'tools' || [
    'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'
  ].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 bg-[#F0F0F0] border-b-4 border-[#121212]">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Geometric Bauhaus Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            id="main-bauhaus-logo-btn"
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
            {/* The 3 Primaries Geometric Mark: Red Circle, Blue Square, Yellow Triangle */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] rounded-none group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_#121212] transition-all">
              <span className="w-3.5 h-3.5 rounded-full bg-[#D02020] border border-[#121212] inline-block shrink-0" />
              <span className="w-3.5 h-3.5 rounded-none bg-[#1040C0] border border-[#121212] inline-block shrink-0" />
              <span className="w-3.5 h-3.5 bg-[#F0C020] clip-triangle inline-block shrink-0" />
            </div>

            <div>
              <div className="font-black text-lg sm:text-xl uppercase tracking-tighter text-[#121212] flex items-center gap-1.5 leading-none group-hover:text-[#D02020] transition-colors">
                <span>ICT</span>
                <span className="text-[#D02020]">//</span>
                <span>BAUHAUS</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/70 leading-tight mt-0.5 font-mono">
                SMC SYLLABUS &amp; LAB
              </div>
            </div>
          </button>
        </div>

        {/* Center: Constructivist 3-Pillar Macro Navigation */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 bg-[#E0E0E0] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none">
          {/* Pillar 1: Curriculum */}
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121212] ${
              isCurriculumActive
                ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-[#121212] hover:bg-[#F0C020] hover:text-[#121212]'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full border border-black ${isCurriculumActive ? 'bg-white' : 'bg-[#D02020]'}`} />
            <span>Curriculum (48)</span>
          </button>

          {/* Pillar 2: Masood's Academy */}
          <button
            onClick={() => setActiveTab('masood')}
            className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121212] ${
              isMasoodActive
                ? 'bg-[#F0C020] text-[#121212] shadow-[3px_3px_0px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-[#121212] hover:bg-[#F0C020] hover:text-[#121212]'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-none border border-black ${isMasoodActive ? 'bg-[#121212]' : 'bg-[#F0C020]'}`} />
            <span>Masood Academy (52)</span>
          </button>

          {/* Pillar 3: Trading Tools */}
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121212] ${
              isToolsActive
                ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-[#121212] hover:bg-[#F0C020] hover:text-[#121212]'
            }`}
          >
            <span className={`w-2.5 h-2.5 bg-[#F0C020] clip-triangle ${isToolsActive ? 'bg-white' : ''}`} />
            <span>Workbench & Lab</span>
          </button>
        </nav>

        {/* Right: Search & Market Clock */}
        <div className="flex items-center gap-2.5">
          {/* NY Market Session Clock */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-none bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D02020] border border-black animate-pulse" />
            <span className="text-[#121212] font-black uppercase">{activeSession}</span>
            <span className="text-[#121212]/40 font-black">|</span>
            <span className="text-[#121212] font-bold">{nyTime || '10:00:00'} EST</span>
          </div>

          {/* Bauhaus Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] font-mono font-bold bg-[#F0F0F0] border border-[#121212]">
              ⌘K
            </kbd>
          </button>

          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="p-2 rounded-none bg-[#F0C020] hover:bg-yellow-400 text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              title="Mentor Tribute"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

      </div>

      {/* Mobile Bauhaus Macro Navigation Bar with Navigation Arrows */}
      <div className="flex md:hidden border-t-2 border-[#121212] px-2 py-1.5 bg-[#E0E0E0]">
        <BauhausNavScroller innerClassName="gap-1.5" showArrowsAlways={false}>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-2 px-3 rounded-none text-xs font-black uppercase tracking-wider whitespace-nowrap text-center border-2 border-[#121212] transition-all shrink-0 ${
              isCurriculumActive ? 'bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212]' : 'bg-white text-[#121212]'
            }`}
          >
            Curriculum (48)
          </button>
          <button
            onClick={() => setActiveTab('masood')}
            className={`py-2 px-3 rounded-none text-xs font-black uppercase tracking-wider whitespace-nowrap text-center border-2 border-[#121212] transition-all shrink-0 ${
              isMasoodActive ? 'bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212]' : 'bg-white text-[#121212]'
            }`}
          >
            Masood Academy (52)
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-2 px-3 rounded-none text-xs font-black uppercase tracking-wider whitespace-nowrap text-center border-2 border-[#121212] transition-all shrink-0 ${
              isToolsActive ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]' : 'bg-white text-[#121212]'
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
