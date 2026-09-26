import React, { useState } from 'react';
import { 
  BarChart2, 
  PlayCircle, 
  Cpu, 
  BookMarked, 
  GitFork, 
  Layers, 
  GitCompare, 
  Award,
  Wrench,
  Flame,
  Compass
} from 'lucide-react';
import { ChartLab } from './ChartLab';
import { TradeSimulator } from './TradeSimulator';
import { BacktestLab } from './BacktestLab';
import { TradingJournal } from './TradingJournal';
import { KnowledgeGraph } from './KnowledgeGraph';
import { ConceptExplorer } from './ConceptExplorer';
import { CompareView } from './CompareView';
import { MasteryDashboard } from './MasteryDashboard';
import { MasterclassWorkbench } from './MasterclassWorkbench';
import { InstitutionalToolsSuite } from './InstitutionalToolsSuite';
import { ScrollReveal } from './ScrollReveal';

export type TradingToolId = 'chartlab' | 'simulator' | 'backtest' | 'journal' | 'graph' | 'concepts' | 'compare' | 'dashboard' | 'masterclass' | 'ict_suite';

export interface TradingToolsWorkbenchProps {
  initialTool?: TradingToolId;
  onSelectConcept?: (conceptId: string) => void;
}

export const TradingToolsWorkbench: React.FC<TradingToolsWorkbenchProps> = ({
  initialTool = 'masterclass',
  onSelectConcept
}) => {
  const [activeTool, setActiveTool] = useState<TradingToolId>(initialTool);

  const tools = [
    {
      id: 'masterclass',
      name: 'Masterclass Hub',
      badge: '34 Masterclasses',
      desc: '34 Masterclasses, 15 PD Arrays in hierarchy, 5 Entry Models & 5 Opening Ranges',
      icon: Flame
    },
    {
      id: 'chartlab',
      name: 'Chart Lab',
      badge: 'Trading Floor',
      desc: 'Interactive 8-stage candle sequence marking & price delivery',
      icon: BarChart2
    },
    {
      id: 'simulator',
      name: 'Trade Simulator',
      badge: 'Execution Room',
      desc: 'Simulated market entry, limit orders, and fill mechanics',
      icon: PlayCircle
    },
    {
      id: 'backtest',
      name: 'Backtest Lab',
      badge: 'Research Lab',
      desc: 'Statistical expectancy, win-rates, and drawdown analysis',
      icon: Cpu
    },
    {
      id: 'journal',
      name: 'Trading Journal',
      badge: "Trader's Log",
      desc: '7-point institutional trade audit and rule validation',
      icon: BookMarked
    },
    {
      id: 'graph',
      name: 'Knowledge Graph',
      badge: 'Concept Matrix',
      desc: '10-step institutional pipeline and connected concept nodes',
      icon: GitFork
    },
    {
      id: 'concepts',
      name: 'Glossary',
      badge: 'Encyclopedia',
      desc: 'Searchable glossary of ICT mechanics, definitions, and diagrams',
      icon: Layers
    },
    {
      id: 'compare',
      name: 'Compare Matrix',
      badge: 'Side-by-Side',
      desc: 'Side-by-side contrast of overlapping or misunderstood concepts',
      icon: GitCompare
    },
    {
      id: 'dashboard',
      name: 'Mastery Profile',
      badge: 'Diagnostics',
      desc: 'Assessments, diagnostic quizzes, and operator credentials',
      icon: Award
    },
    {
      id: 'ict_suite',
      name: 'ICT Delivery Suite',
      badge: 'Tools & Macros',
      desc: 'Official OTE calculator, Asian Judas planner, 8 macro windows clock & 5-phase roadmap',
      icon: Compass
    }
  ] as const;

  const currentToolMeta = tools.find(t => t.id === activeTool) || tools[0];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20 text-[#F5F7FA]">
      
      {/* Workbench Control Panel */}
      <ScrollReveal y={20}>
        <section className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#5865FF]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#55E6D1]">
                    WORKBENCH // 03
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs font-mono text-[#9BA1AE] uppercase">
                    ACTIVE: {currentToolMeta.name}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA] mt-0.5">
                  Trading Tools &amp; Laboratory
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/[0.04] text-[#9BA1AE] text-xs font-mono rounded-lg border border-white/[0.08]">
                {tools.length} DEDICATED MODULES
              </span>
            </div>
          </div>

          {/* Tool Selector Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white/[0.10] border-white/20 text-[#F5F7FA] shadow-sm'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-[#9BA1AE] hover:text-[#F5F7FA]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/[0.12] text-[#F5F7FA]' : 'bg-white/[0.04] text-[#9BA1AE]'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#656B78]">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-medium tracking-tight truncate">
                      {tool.name}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#656B78] truncate mt-0.5">
                      {tool.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Render Active Tool Content */}
      <ScrollReveal y={25}>
        <div className="predikt-workbench-body">
          {activeTool === 'masterclass' && <MasterclassWorkbench />}
          {activeTool === 'chartlab' && <ChartLab />}
          {activeTool === 'simulator' && <TradeSimulator />}
          {activeTool === 'backtest' && <BacktestLab />}
          {activeTool === 'journal' && <TradingJournal />}
          {activeTool === 'graph' && (
            <KnowledgeGraph 
              onSelectConcept={onSelectConcept || (() => {})} 
            />
          )}
          {activeTool === 'concepts' && (
            <ConceptExplorer 
              onSelectConcept={onSelectConcept || (() => {})} 
              onOpenSimulator={() => setActiveTool('simulator')} 
            />
          )}
          {activeTool === 'compare' && <CompareView />}
          {activeTool === 'dashboard' && <MasteryDashboard onSelectTab={(tab) => setActiveTool(tab as any)} />}
          {activeTool === 'ict_suite' && <InstitutionalToolsSuite />}
        </div>
      </ScrollReveal>

    </div>
  );
};

export default TradingToolsWorkbench;
