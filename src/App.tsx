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
import { Youtube, Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'textbook' | 'concepts' | 'chartlab' | 'graph' | 'compare' | 'simulator' | 'journal' | 'backtest' | 'dashboard'
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

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Ambience Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/5 via-indigo-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Global Header & Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMentorSpotlight={() => setIsMentorSpotlightOpen(true)}
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
      />

      {/* Footer & Special Tribute Section */}
      <footer className="border-t border-slate-800/80 bg-[#070A12]/95 py-8 px-4 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tribute Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0B0F19] to-amber-950/30 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 border border-amber-300">
                <Youtube className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-mono font-extrabold text-amber-300 flex items-center gap-2">
                  <span>SPECIAL MENTORSHIP TRIBUTE</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Honoring <strong>Trader Abdullah Masood</strong> (<span className="text-amber-300 font-mono font-bold">@TraderAbdullahMasood</span>) — whose free masterclasses & market breakdown videos inspired this digital curriculum.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMentorSpotlightOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#070A12] hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold transition-all hover:scale-105"
              >
                View Tribute Spotlight
              </button>
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
                <span>Visit Channel</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
            <div>
              <span className="text-white font-bold">ICT & SMC ACADEMY</span> — The Complete Digital Syllabus & Algorithmic Laboratory
            </div>
            <div className="text-cyan-400/80 font-semibold">
              Algorithmic Price Delivery • Smart Money Concepts • Intermarket SMT Analysis
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
