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
      {/* Background Ambience Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-sky-200/20 via-blue-100/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/20 via-orange-50/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl" />
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

      {/* Footer & Special Tribute Section */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tribute Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50/80 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 text-white">
                <Youtube className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-mono font-extrabold text-amber-800 flex items-center gap-2">
                  <span>SPECIAL MENTORSHIP TRIBUTE</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Honoring <strong>Trader Abdullah Masood</strong> (<span className="text-amber-800 font-mono font-bold">@TraderAbdullahMasood</span>) — whose free masterclasses & market breakdown videos inspired this digital curriculum.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('masood');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-extrabold flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
                <span>Masood's Academy (52 Lectures)</span>
              </button>
              <button
                onClick={() => setIsMentorSpotlightOpen(true)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold transition-all hover:scale-105 shadow-sm"
              >
                View Tribute Spotlight
              </button>
              <button
                onClick={() => setShowOpeningScreen(true)}
                className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-mono text-xs font-bold transition-all"
              >
                Replay Journey Intro
              </button>
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-extrabold flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
                <span>Visit Channel</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-3 border-t border-slate-200">
            <div>
              <button
                onClick={() => setShowOpeningScreen(true)}
                className="text-slate-900 font-bold hover:text-sky-600 transition-colors cursor-pointer text-left inline-flex items-center gap-1"
                title="Return to Animated Opening Screen"
              >
                ICT & SMC ACADEMY
              </button>{' '}
              — The Complete Digital Syllabus & Algorithmic Laboratory
            </div>
            <div className="text-sky-700 font-semibold">
              Algorithmic Price Delivery • Smart Money Concepts • Intermarket SMT Analysis
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
