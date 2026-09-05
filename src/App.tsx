import React, { useState } from 'react';
import { Header } from './components/Header';
import { TextbookReader } from './components/TextbookReader';
import { ConceptExplorer } from './components/ConceptExplorer';
import { ChartLab } from './components/ChartLab';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { CompareView } from './components/CompareView';
import { TradeSimulator } from './components/TradeSimulator';
import { TradingJournal } from './components/TradingJournal';
import { BacktestLab } from './components/BacktestLab';
import { MasteryDashboard } from './components/MasteryDashboard';
import { SearchModal } from './components/SearchModal';
import { MentorSpotlight } from './components/MentorSpotlight';
import { OpeningScreen } from './components/OpeningScreen';
import { MasoodAcademyView } from './components/masood/MasoodAcademyView';
import { Youtube, Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [showOpeningScreen, setShowOpeningScreen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard' | 'masood'
  >('textbook');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMentorSpotlightOpen, setIsMentorSpotlightOpen] = useState<boolean>(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string>('fair_value_gap');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);

  // Jump handlers
  const handleSelectConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setActiveTab('concepts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setActiveTab('textbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If opening screen is active, show the animated student story & tribute screen first
  if (showOpeningScreen) {
    return (
      <OpeningScreen
        onEnter={() => setShowOpeningScreen(false)}
        onOpenMentorSpotlight={() => {
          setShowOpeningScreen(false);
          setIsMentorSpotlightOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* 2026 Ambient Tech Grid & Radial Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-tech-grid opacity-75" />
        <div className="absolute top-0 left-1/4 w-[700px] h-[450px] bg-gradient-to-br from-sky-200/25 via-blue-100/15 to-transparent rounded-full blur-3xl animate-pulse-aura" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-amber-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-100/25 via-teal-50/15 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Global Header & Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMentorSpotlight={() => setIsMentorSpotlightOpen(true)}
        onOpenWelcomeIntro={() => setShowOpeningScreen(true)}
        progressPercent={38}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 relative z-10">
        {activeTab === 'textbook' && (
          <TextbookReader
            onSelectConcept={handleSelectConcept}
            onOpenQuiz={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'masood' && <MasoodAcademyView />}

        {activeTab === 'concepts' && (
          <ConceptExplorer
            onSelectConcept={handleSelectConcept}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'chartlab' && <ChartLab />}

        {activeTab === 'graph' && (
          <KnowledgeGraph onSelectConcept={handleSelectConcept} />
        )}

        {activeTab === 'compare' && <CompareView />}

        {activeTab === 'simulator' && <TradeSimulator />}

        {activeTab === 'journal' && <TradingJournal />}

        {activeTab === 'backtest' && <BacktestLab />}

        {activeTab === 'dashboard' && (
          <MasteryDashboard onSelectTab={setActiveTab} />
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectConcept={handleSelectConcept}
        onSelectChapter={handleSelectChapter}
      />

      {/* Mentor Spotlight & Tribute Modal */}
      <MentorSpotlight
        isOpen={isMentorSpotlightOpen}
        onClose={() => setIsMentorSpotlightOpen(false)}
        onOpenMasoodAcademy={() => {
          setIsMentorSpotlightOpen(false);
          setActiveTab('masood');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2026 Footer & Special Tribute Section */}
      <footer className="border-t border-slate-200/90 glass-acrylic py-8 px-4 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tribute Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50/90 via-white to-amber-50/70 border border-amber-200/90 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg shadow-amber-500/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25 text-white">
                <Youtube className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-mono font-extrabold text-amber-800 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-[10px] tracking-wider uppercase">
                    SPECIAL MENTORSHIP TRIBUTE
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed font-sans">
                  Honoring <strong>Trader Abdullah Masood</strong> (<span className="text-amber-800 font-mono font-bold">@TraderAbdullahMasood</span>) — whose free masterclasses & market breakdown videos inspired this digital curriculum.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => {
                  setActiveTab('masood');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-extrabold flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <Youtube className="w-4 h-4" />
                <span>Masood's Academy (52 Lectures)</span>
              </button>
              <button
                onClick={() => setIsMentorSpotlightOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50/80 text-amber-900 border border-amber-300 font-mono text-xs font-bold transition-all hover:scale-105 shadow-xs"
              >
                View Tribute Spotlight
              </button>
              <button
                onClick={() => setShowOpeningScreen(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-mono text-xs font-bold transition-all"
              >
                Replay Journey Intro
              </button>
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-extrabold flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>Visit Channel</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <button
                onClick={() => setShowOpeningScreen(true)}
                className="text-slate-900 font-extrabold hover:text-sky-600 transition-colors cursor-pointer text-left inline-flex items-center gap-1"
                title="Return to Animated Opening Screen"
              >
                ICT & SMC ACADEMY 2026
              </button>{' '}
              — The Complete Digital Syllabus & Algorithmic Laboratory
            </div>
            <div className="text-sky-700 font-bold flex items-center gap-2">
              <span className="hidden sm:inline">⚡</span>
              <span>Algorithmic Price Delivery • Smart Money Concepts • Intermarket SMT Analysis</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
