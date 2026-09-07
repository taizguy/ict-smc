import React, { useState } from 'react';
import { Header, MainTabType } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CurriculumView } from './components/CurriculumView';
import { ChapterRoom } from './components/ChapterRoom';
import { TradingToolsWorkbench, TradingToolId } from './components/TradingToolsWorkbench';
import { MasoodAcademyView } from './components/masood/MasoodAcademyView';
import { SearchModal } from './components/SearchModal';
import { MentorSpotlight } from './components/MentorSpotlight';
import { textbookChapters } from './data/chaptersData';
import { 
  getStoredProgress, 
  saveCompletedChapter 
} from './utils/academyProgress';
import { 
  Youtube, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Wrench,
  GraduationCap
} from 'lucide-react';

export const App: React.FC = () => {
  // Start directly in the open curriculum without forced onboarding modal
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<MainTabType>('curriculum');
  const [initialTool, setInitialTool] = useState<TradingToolId>('chartlab');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMentorSpotlightOpen, setIsMentorSpotlightOpen] = useState<boolean>(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string>('fair_value_gap');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);

  // Chapter completion (optional reference, non-blocking)
  const [completedChapterIds, setCompletedChapterIds] = useState<number[]>(() => {
    return getStoredProgress().completedChapterIds;
  });

  const totalChapters = textbookChapters.length;
  const progressPercent = Math.round((completedChapterIds.length / totalChapters) * 100);

  // Jump handlers
  const handleSelectConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setInitialTool('concepts');
    setActiveTab('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setActiveTab('chapter_room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteChapter = (chapterId: number) => {
    const updated = saveCompletedChapter(chapterId);
    setCompletedChapterIds(updated);
  };

  // Switch to specific trading workbench tool
  const handleNavigateTool = (toolId: TradingToolId) => {
    setShowWelcomeScreen(false);
    setInitialTool(toolId);
    setActiveTab('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWelcome = () => {
    setShowWelcomeScreen(true);
    setActiveTab('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isShowingWelcome = showWelcomeScreen || activeTab === 'welcome';

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#121212] flex flex-col font-sans selection:bg-[#1040C0] selection:text-white relative">
      {/* Bauhaus Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, #121212 1px, transparent 1px), linear-gradient(to bottom, #121212 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Simplified, Accessible Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'welcome') {
            setShowWelcomeScreen(true);
            setActiveTab('welcome');
          } else {
            setShowWelcomeScreen(false);
            if (['chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'].includes(tab)) {
              setInitialTool(tab);
              setActiveTab('tools');
            } else {
              setActiveTab(tab);
            }
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMentorSpotlight={() => setIsMentorSpotlightOpen(true)}
        onOpenWelcomeIntro={handleOpenWelcome}
        progressPercent={progressPercent}
      />

      {/* Main Educational Application Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* WELCOME SCREEN (When invoked or when activeTab is 'welcome') */}
        {isShowingWelcome && (
          <WelcomeScreen
            onEnterAcademy={(targetTab?: MainTabType) => {
              setShowWelcomeScreen(false);
              if (targetTab && targetTab !== 'welcome') {
                setActiveTab(targetTab);
              } else {
                setActiveTab('curriculum');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMentorSpotlight={() => {
              setIsMentorSpotlightOpen(true);
            }}
          />
        )}

        {/* PILLAR 1: OPEN SYLLABUS & CURRICULUM VIEW (All 48 Chapters Unlocked) */}
        {!isShowingWelcome && (activeTab === 'curriculum' || activeTab === 'world_map' || activeTab === 'textbook') && (
          <CurriculumView
            onSelectChapter={handleSelectChapter}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {/* PILLAR 1 DETAIL: DEDICATED CHAPTER ROOM */}
        {!isShowingWelcome && activeTab === 'chapter_room' && (
          <ChapterRoom
            chapterId={selectedChapterId}
            onSelectChapter={handleSelectChapter}
            onReturnToMap={() => {
              setActiveTab('curriculum');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteChapter={handleCompleteChapter}
            isCompleted={completedChapterIds.includes(selectedChapterId)}
          />
        )}

        {/* PILLAR 2: TRADER ABDULLAH MASOOD ACADEMY (52 LECTURES) */}
        {!isShowingWelcome && activeTab === 'masood' && <MasoodAcademyView />}

        {/* PILLAR 3: TRADING TOOLS WORKBENCH (Separated from primary learning) */}
        {!isShowingWelcome && (activeTab === 'tools' || [
          'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'
        ].includes(activeTab)) && (
          <TradingToolsWorkbench
            initialTool={initialTool}
            onSelectConcept={handleSelectConcept}
          />
        )}

      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectConcept={handleSelectConcept}
        onSelectChapter={handleSelectChapter}
      />

      {/* Mentor Tribute Spotlight Modal */}
      <MentorSpotlight
        isOpen={isMentorSpotlightOpen}
        onClose={() => setIsMentorSpotlightOpen(false)}
        onOpenMasoodAcademy={() => {
          setIsMentorSpotlightOpen(false);
          setActiveTab('masood');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Bauhaus Constructivist Footer */}
      <footer className="border-t-4 border-[#121212] bg-white py-8 px-4 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Tribute Banner */}
          <div className="p-6 bg-[#F0F0F0] border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D02020] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center justify-center shrink-0 text-white">
                <Youtube className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-mono font-black uppercase text-[#D02020] flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212] text-[10px] tracking-widest uppercase font-black">
                    MENTORSHIP TRIBUTE
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                </div>
                <p className="text-xs sm:text-sm text-[#121212] mt-1 leading-relaxed font-bold uppercase">
                  HONORING <strong>TRADER ABDULLAH MASOOD</strong> (<span className="text-[#D02020] font-mono font-black">@TraderAbdullahMasood</span>) — MASTER EDUCATOR OF ICT &amp; SMC INSTITUTIONAL ALGORITHMIC DELIVERY.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => {
                  setActiveTab('masood');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 bg-[#D02020] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>MASOOD'S ACADEMY (52)</span>
              </button>
              <button
                onClick={() => setIsMentorSpotlightOpen(true)}
                className="px-4 py-2.5 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-mono text-xs font-black uppercase tracking-wider active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                VIEW TRIBUTE
              </button>
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#1040C0] hover:bg-blue-700 text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <Youtube className="w-4 h-4" />
                <span>YOUTUBE CHANNEL</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-black uppercase text-[#121212] pt-4 border-t-2 border-[#121212]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#D02020] border border-black inline-block" />
              <span>ICT &amp; SMC ACADEMY</span>
              <span>— OPEN ACCESS INSTITUTIONAL SYLLABUS</span>
            </div>
            <div className="text-[#121212]/70 font-bold flex items-center gap-3">
              <span>48 CHAPTERS</span>
              <span>/</span>
              <span>52 MASOOD LECTURES</span>
              <span>/</span>
              <span>TRADING LAB</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
