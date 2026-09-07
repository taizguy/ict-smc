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
  Sparkles
} from 'lucide-react';
import { ChartLab } from './ChartLab';
import { TradeSimulator } from './TradeSimulator';
import { BacktestLab } from './BacktestLab';
import { TradingJournal } from './TradingJournal';
import { KnowledgeGraph } from './KnowledgeGraph';
import { ConceptExplorer } from './ConceptExplorer';
import { CompareView } from './CompareView';
import { MasteryDashboard } from './MasteryDashboard';

export type TradingToolId = 'chartlab' | 'simulator' | 'backtest' | 'journal' | 'graph' | 'concepts' | 'compare' | 'dashboard';

export interface TradingToolsWorkbenchProps {
  initialTool?: TradingToolId;
  onSelectConcept?: (conceptId: string) => void;
}

export const TradingToolsWorkbench: React.FC<TradingToolsWorkbenchProps> = ({
  initialTool = 'chartlab',
  onSelectConcept
}) => {
  const [activeTool, setActiveTool] = useState<TradingToolId>(initialTool);

  const tools = [
    {
      id: 'chartlab',
      name: 'Chart Lab',
      badge: 'Trading Floor',
      desc: 'Interactive 8-stage candle sequence marking & price delivery',
      icon: BarChart2,
      accent: 'bg-[#D02020]'
    },
    {
      id: 'simulator',
      name: 'Trade Simulator',
      badge: 'Execution Room',
      desc: 'Simulated market entry, limit orders, and fill mechanics',
      icon: PlayCircle,
      accent: 'bg-[#1040C0]'
    },
    {
      id: 'backtest',
      name: 'Backtest Lab',
      badge: 'Research Lab',
      desc: 'Statistical expectancy, win-rates, and drawdown analysis',
      icon: Cpu,
      accent: 'bg-[#F0C020]'
    },
    {
      id: 'journal',
      name: 'Trading Journal',
      badge: "Trader's Log",
      desc: '7-point institutional trade audit and rule validation',
      icon: BookMarked,
      accent: 'bg-[#121212]'
    },
    {
      id: 'graph',
      name: 'Knowledge Graph',
      badge: 'Concept Matrix',
      desc: '10-step institutional pipeline and connected concept nodes',
      icon: GitFork,
      accent: 'bg-[#1040C0]'
    },
    {
      id: 'concepts',
      name: 'Glossary',
      badge: 'Encyclopedia',
      desc: 'Searchable glossary of ICT mechanics, definitions, and diagrams',
      icon: Layers,
      accent: 'bg-[#D02020]'
    },
    {
      id: 'compare',
      name: 'Compare Matrix',
      badge: 'Side-by-Side',
      desc: 'Side-by-side contrast of overlapping or misunderstood concepts',
      icon: GitCompare,
      accent: 'bg-[#F0C020]'
    },
    {
      id: 'dashboard',
      name: 'Mastery Profile',
      badge: 'Diagnostics',
      desc: 'Assessments, diagnostic quizzes, and operator credentials',
      icon: Award,
      accent: 'bg-[#D02020]'
    }
  ] as const;

  const currentToolMeta = tools.find(t => t.id === activeTool) || tools[0];

  return (
    <div className="space-y-8 pb-20">
      
      {/* Bauhaus Workbench Control Panel */}
      <section className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-[#121212] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
                  BAUHAUS WORKBENCH // 03
                </span>
                <span className="text-xs font-mono font-bold text-[#121212]/60 uppercase">
                  ACTIVE: {currentToolMeta.name}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212] mt-0.5">
                TRADING TOOLS &amp; LABORATORY
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-[#121212] text-white text-xs font-mono font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              {tools.length} DEDICATED TOOLS
            </span>
          </div>
        </div>

        {/* Bauhaus Tool Selector Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-3 border-2 border-[#121212] text-left transition-all cursor-pointer flex flex-col justify-between rounded-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  isActive
                    ? 'bg-[#1040C0] text-white shadow-[4px_4px_0px_0px_#121212] -translate-y-0.5'
                    : 'bg-white hover:bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`w-8 h-8 border-2 border-[#121212] flex items-center justify-center ${
                    isActive ? 'bg-white text-[#1040C0]' : 'bg-[#F0F0F0] text-[#121212]'
                  }`}>
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white' : 'text-[#121212]/50'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-black uppercase tracking-tight truncate leading-snug">
                    {tool.name}
                  </div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider truncate mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-[#121212]/60'
                  }`}>
                    {tool.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Render Active Tool Content inside Bauhaus Boundary */}
      <div className="bauhaus-workbench-body">
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
      </div>

    </div>
  );
};

export default TradingToolsWorkbench;
