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
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollReveal } from './components/ScrollReveal';

export const App: React.FC = () => {
  // Initialize buttery smooth momentum mouse scrolling
  useSmoothScroll();

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
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA] flex flex-col font-sans selection:bg-[#5865FF] selection:text-white relative overflow-x-hidden">
      {/* Subtle Film Grain Texture */}
      <div className="predikt-grain" aria-hidden="true" />

      {/* Predikt Deep Atmospheric Light Fields */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Core Blue Atmosphere */}
        <div 
          className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full opacity-20 filter blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #5865FF 0%, rgba(138, 114, 255, 0.45) 45%, transparent 75%)' }}
        />
        {/* Violet Horizon Accent */}
        <div 
          className="absolute top-[35%] -right-[15%] w-[800px] h-[800px] rounded-full opacity-12 filter blur-[170px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8A72FF 0%, transparent 70%)' }}
        />
        {/* Cyan Liquidity Ambience */}
        <div 
          className="absolute bottom-[-10%] -left-[10%] w-[900px] h-[900px] rounded-full opacity-10 filter blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #55E6D1 0%, transparent 70%)' }}
        />
      </div>

      {/* Minimal, Dark, Translucent Predikt Header */}
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
      <main className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-10 sm:space-y-14">
        
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

      {/* Predikt Editorial Footer */}
      <footer className="border-t border-white/[0.07] bg-[#08090D]/80 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-[1560px] w-full mx-auto space-y-8">
          
          {/* Tribute Banner - Sleek Dark Card */}
          <ScrollReveal y={30} duration={0.6}>
            <div className="p-6 sm:p-7 bg-[#11141B] border border-white/[0.08] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors hover:border-white/[0.14]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#FF6B7A]">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#9BA1AE] flex items-center gap-2">
                    <span className="text-[#55E6D1]">MENTORSHIP TRIBUTE</span>
                    <span className="text-white/20">/</span>
                    <span>TRADER ABDULLAH MASOOD</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F7FA]/90 mt-1 leading-relaxed font-normal">
                    Master educator of ICT &amp; Smart Money Concepts algorithmic delivery. 52 structured masterclasses preserved with complete fidelity.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
                <button
                  onClick={() => {
                    setActiveTab('masood');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-predikt-primary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Masood Academy (52)</span>
                </button>
                <button
                  onClick={() => setIsMentorSpotlightOpen(true)}
                  className="btn-predikt-secondary text-xs"
                >
                  View Tribute
                </button>
                <a
                  href="https://www.youtube.com/@TraderAbdullahMasood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-predikt-secondary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal y={15} delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9BA1AE] pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                <span className="font-medium text-[#F5F7FA]">ICT &amp; SMC ACADEMY</span>
                <span className="text-white/20">|</span>
                <span>OPEN INSTITUTIONAL CURRICULUM</span>
              </div>
              <div className="text-[#656B78] flex items-center gap-3">
                <span>48 CHAPTERS</span>
                <span>·</span>
                <span>52 LECTURES</span>
                <span>·</span>
                <span>LABORATORY</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
};

export default App;
