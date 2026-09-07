import React, { useState } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { 
  GitFork, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Zap, 
  ShieldAlert, 
  ChevronRight, 
  Cpu
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

interface KnowledgeGraphProps {
  onSelectConcept: (conceptId: string) => void;
}

interface PipelineStep {
  id: string;
  stepNumber: number;
  label: string;
  category: 'Foundation' | 'Liquidity' | 'Displacement' | 'Structure' | 'Imbalance' | 'Execution' | 'Target';
  shortSummary: string;
  whyNext: {
    nextStepLabel: string;
    algorithmicReason: string;
    orderbookMechanic: string;
    riskOfSkipping: string;
  };
  conceptIdRef?: string;
}

interface Node {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  description: string;
  prereqs: string[];
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onSelectConcept }) => {
  const [viewMode, setViewMode] = useState<'pipeline' | 'network'>('pipeline');
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(3);
  const [selectedNode, setSelectedNode] = useState<string>('fair_value_gap');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // The Canonical 10-Step Institutional Execution Pipeline
  const pipelineSteps: PipelineStep[] = [
    {
      id: 'step-1',
      stepNumber: 1,
      label: '1. Resting Liquidity',
      category: 'Foundation',
      shortSummary: 'Limit bids and asks resting in the central order book queues.',
      conceptIdRef: 'market_mechanics_liquidity',
      whyNext: {
        nextStepLabel: '2. Liquidity Pool (BSL / SSL)',
        algorithmicReason: 'Because traders cluster their stop-loss orders around recognizable technical swing peaks and valleys, resting liquidity is not evenly distributed—it concentrates into dense pools.',
        orderbookMechanic: 'Depth of Market (DOM) books show massive spikes in resting stop orders directly above obvious swing highs (BSL) and below swing lows (SSL).',
        riskOfSkipping: 'Failing to map where liquidity pools sit leaves the trader blind to where large institutions will steer price.'
      }
    },
    {
      id: 'step-2',
      stepNumber: 2,
      label: '2. Liquidity Pool',
      category: 'Liquidity',
      shortSummary: 'Concentration of buy-stops (BSL) above highs or sell-stops (SSL) below lows.',
      conceptIdRef: 'buy_side_liquidity',
      whyNext: {
        nextStepLabel: '3. Liquidity Sweep (The Raid)',
        algorithmicReason: 'Institutions cannot enter massive positions at current market prices without moving the market against themselves. They intentionally push price into these dense stop pools to extract counterparty volume.',
        orderbookMechanic: 'When price crosses the old swing high, thousands of buy-stop orders trigger simultaneously as market orders, creating deep liquidity for institutional sellers.',
        riskOfSkipping: 'Trading before a liquidity pool is swept exposes the trader to getting caught inside the manipulation run.'
      }
    },
    {
      id: 'step-3',
      stepNumber: 3,
      label: '3. Liquidity Sweep',
      category: 'Liquidity',
      shortSummary: 'Sharp price penetration into resting stops (Turtle Soup / Stop Run).',
      conceptIdRef: 'buy_side_liquidity',
      whyNext: {
        nextStepLabel: '4. Displacement (Velocity)',
        algorithmicReason: 'Once institutional orders are fully filled against the triggered stops, smart money aggressively deploys market orders in the opposite direction, creating violent one-sided displacement.',
        orderbookMechanic: 'Instantaneous book clearing: Aggressive orders devour all resting bids/asks across multiple price ticks, leaving single prints and wide candle bodies.',
        riskOfSkipping: 'If displacement does not immediately follow a sweep, price is simply accepting and continuing the breakout—not sweeping.'
      }
    },
    {
      id: 'step-4',
      stepNumber: 4,
      label: '4. Displacement',
      category: 'Displacement',
      shortSummary: 'Energetic, wide-body candle velocity confirming institutional sponsorship.',
      conceptIdRef: 'displacement_engine',
      whyNext: {
        nextStepLabel: '5. Market Structure Shift (MSS)',
        algorithmicReason: 'True institutional sponsorship has enough kinetic momentum to shatter the preceding short-term trend, breaking previous opposing swing highs or lows with authority.',
        orderbookMechanic: 'The sheer volume of institutional displacement sweeps through structural pivot points, forcing algorithmic trend-followers to exit and reverse.',
        riskOfSkipping: 'Displacement without breaking market structure is merely high-volume consolidation or a temporary news impulse.'
      }
    },
    {
      id: 'step-5',
      stepNumber: 5,
      label: '5. Market Structure Shift',
      category: 'Structure',
      shortSummary: 'Violation of key swing high/low confirming directional bias change.',
      conceptIdRef: 'market_structure_shift',
      whyNext: {
        nextStepLabel: '6. Fair Value Gap Creation',
        algorithmicReason: 'Violent displacement that creates an MSS moves so fast through the auction book that it fails to pair equal buy and sell transactions, tearing open an inefficiency gap.',
        orderbookMechanic: 'The middle candle of a 3-candle sequence has wicks that do not overlap with candle 1 and candle 3, creating an unpaid void in the ledger.',
        riskOfSkipping: 'An MSS without an accompanying FVG lacks energetic conviction and may merely be a slow multi-leg retest.'
      }
    },
    {
      id: 'step-6',
      stepNumber: 6,
      label: '6. Fair Value Gap (FVG)',
      category: 'Imbalance',
      shortSummary: '3-candle imbalance void indicating one-sided institutional buying/selling.',
      conceptIdRef: 'fair_value_gap',
      whyNext: {
        nextStepLabel: '7. Discount / Premium Check',
        algorithmicReason: 'Even with a valid FVG, institutions will never buy at premium prices or sell at discount prices. The market must rebalance into the favorable half of the dealing range before entry.',
        orderbookMechanic: 'Smart money algorithms strictly calibrate inventory accumulation to discount zones (<50% of the dealing range) to maximize edge.',
        riskOfSkipping: 'Entering an FVG that sits in Premium when looking to buy results in unfavorable risk-to-reward and frequent deep drawdowns.'
      }
    },
    {
      id: 'step-7',
      stepNumber: 7,
      label: '7. Dealing Range Filter',
      category: 'Execution',
      shortSummary: '50% Equilibrium filter: Buys strictly in Discount, Sells in Premium.',
      conceptIdRef: 'premium_discount',
      whyNext: {
        nextStepLabel: '8. Retest / Mitigation Entry',
        algorithmicReason: 'The Interbank Price Delivery Algorithm (IPDA) intentionally circles back to re-offer prices through the imbalance void, allowing institutions to balance the books and add positions.',
        orderbookMechanic: 'Price retraces into the FVG (often to Consequent Encroachment 50%), filling limit orders sitting at the gap boundary before resuming expansion.',
        riskOfSkipping: 'Chasing the initial breakout instead of waiting for the mitigation retest forces wide, uncalibrated stop losses.'
      }
    },
    {
      id: 'step-8',
      stepNumber: 8,
      label: '8. Mitigation Retest',
      category: 'Execution',
      shortSummary: 'Price pulls back to rebalance the FVG / OB array, filling limit orders.',
      conceptIdRef: 'order_blocks',
      whyNext: {
        nextStepLabel: '9. Invalidation Stop Anchoring',
        algorithmicReason: 'Every institutional trade model must have a mathematically definitive level that proves the thesis false. If price violates the original sweep extreme, the trade is voided.',
        orderbookMechanic: 'Protective stops are anchored beyond the high/low that generated the displacement. Once order blocks are mitigated, price must not revisit those extremes.',
        riskOfSkipping: 'Arbitrary tight stop losses get wicked out by secondary liquidity testing, destroying win rates.'
      }
    },
    {
      id: 'step-9',
      stepNumber: 9,
      label: '9. Invalidation Stop',
      category: 'Execution',
      shortSummary: 'Stop loss anchored beyond the structural sweep point or order block.',
      conceptIdRef: 'stop_loss_invalidation',
      whyNext: {
        nextStepLabel: '10. Terminal Target (Draw on Liquidity)',
        algorithmicReason: 'Institutions never enter without knowing their exit destination. Price moves continuously from one liquidity pool or imbalance to an opposing liquidity pool.',
        orderbookMechanic: 'Institutional algorithms harvest accumulated profits against opposing resting stops (PDH, PDL, or Old Equal Highs/Lows).',
        riskOfSkipping: 'Trading without an objective Draw on Liquidity results in premature exits or round-tripping winning positions into losses.'
      }
    },
    {
      id: 'step-10',
      stepNumber: 10,
      label: '10. Target (Draw on Liquidity)',
      category: 'Target',
      shortSummary: 'Opposing external liquidity pool or unmitigated imbalance harvested.',
      conceptIdRef: 'draw_on_liquidity',
      whyNext: {
        nextStepLabel: 'Cycle Resets: Resting Liquidity',
        algorithmicReason: 'Once target liquidity is swept, counterparty fills are complete and the IPDA delivery loop begins again at Step 1.',
        orderbookMechanic: 'The newly created liquidity event generates the foundation for the next market cycle.',
        riskOfSkipping: 'Failing to take profit at the targeted Draw on Liquidity exposes the position to sharp reversal sweeps.'
      }
    }
  ];

  const currentStep = pipelineSteps.find((s) => s.stepNumber === selectedPipelineStep) || pipelineSteps[0];

  // 2D Network Nodes
  const nodes: Node[] = [
    { id: 'liquidity_pools', label: 'Liquidity Pools (BSL / SSL)', category: 'Liquidity', x: 280, y: 70, description: 'Accumulation of retail stops above/below structure.', prereqs: [] },
    { id: 'liquidity_sweeps', label: 'Liquidity Sweeps (Raids)', category: 'Liquidity', x: 280, y: 150, description: 'False breakout piercing stop clusters.', prereqs: ['liquidity_pools'] },
    { id: 'displacement', label: 'Displacement', category: 'Displacement', x: 480, y: 100, description: 'Aggressive institutional market order expansion.', prereqs: ['liquidity_sweeps'] },
    { id: 'fair_value_gap', label: 'Fair Value Gap (FVG)', category: 'Imbalances', x: 650, y: 60, description: '3-candle price imbalance.', prereqs: ['displacement'] },
    { id: 'order_blocks', label: 'Institutional Order Block', category: 'Order Blocks', x: 650, y: 150, description: 'Last opposing candle before impulse.', prereqs: ['displacement'] },
    { id: 'market_structure', label: 'MSS & BOS Shifts', category: 'Structure', x: 300, y: 200, description: 'Change of structural character.', prereqs: ['liquidity_pools'] },
    { id: 'killzones', label: 'ICT Killzones & Macros', category: 'Time', x: 480, y: 260, description: 'Time-of-day algorithmic windows.', prereqs: [] },
    { id: 'silver_bullet', label: 'Silver Bullet Trade Model', category: 'Models', x: 820, y: 60, description: 'Time-windowed 1:2 R:R FVG execution.', prereqs: ['fair_value_gap', 'killzones'] },
    { id: 'ict_2022_model', label: 'ICT 2022 Model', category: 'Models', x: 820, y: 150, description: 'Sweep + MSS + FVG institutional model.', prereqs: ['fair_value_gap', 'order_blocks', 'market_structure'] },
    { id: 'turtle_soup', label: 'Turtle Soup Sweep Model', category: 'Models', x: 820, y: 240, description: 'Direct counter-trend false breakout entry.', prereqs: ['liquidity_sweeps', 'killzones'] }
  ];

  const activeNodeObj = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Top Banner - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#1040C0] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                ICT Concept Dependency &amp; Causal Pipeline
              </h2>
              <span className="px-3 py-0.5 text-[10px] font-mono bg-[#F0C020] text-[#121212] border-2 border-[#121212] font-black uppercase shadow-[2px_2px_0px_0px_#121212]">
                Institutional Causality
              </span>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Understand the non-random causal logic linking liquidity raids, displacement, FVG imbalances, and terminal execution.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-[#F0F0F0] border-2 border-[#121212]">
            <button
              type="button"
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2 text-xs font-mono font-black uppercase transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                viewMode === 'pipeline'
                  ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              10-Step Causal Pipeline
            </button>
            <button
              type="button"
              onClick={() => setViewMode('network')}
              className={`px-4 py-2 text-xs font-mono font-black uppercase transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                viewMode === 'network'
                  ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              Full Dependency Map
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: 10-STEP CAUSAL PIPELINE */}
      {viewMode === 'pipeline' && (
        <div className="space-y-6">
          {/* Horizontal Step Progression Bar with BauhausNavScroller */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-4">
            <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60 mb-2">
              PIPELINE SEQUENCE (SCROLL WITH ARROWS):
            </div>
            <BauhausNavScroller>
              {pipelineSteps.map((step) => {
                const isSelected = step.stepNumber === selectedPipelineStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setSelectedPipelineStep(step.stepNumber)}
                    className={`p-3.5 text-left transition-all font-mono border-2 border-[#121212] cursor-pointer min-w-[160px] shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                      isSelected
                        ? 'bg-[#F0C020] text-[#121212] shadow-[3px_3px_0px_0px_#121212]'
                        : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-black uppercase text-[#121212]">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#121212] text-white font-black uppercase">
                        {step.category}
                      </span>
                    </div>
                    <div className="text-xs font-black truncate uppercase">
                      {step.label.split('. ')[1]}
                    </div>
                  </button>
                );
              })}
            </BauhausNavScroller>
          </div>

          {/* Detailed Causal Reasoning Box for Selected Step */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-6 text-[#121212]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-4 border-[#121212]">
              <div>
                <span className="text-xs font-mono text-[#D02020] font-black uppercase tracking-wider">
                  Active Execution Node: Step {currentStep.stepNumber} of 10
                </span>
                <h3 className="text-2xl font-black text-[#121212] uppercase tracking-tight mt-0.5">
                  {currentStep.label}
                </h3>
                <p className="text-[#121212]/80 text-xs sm:text-sm mt-1 font-medium">
                  {currentStep.shortSummary}
                </p>
              </div>

              {currentStep.conceptIdRef && (
                <button
                  type="button"
                  onClick={() => onSelectConcept(currentStep.conceptIdRef!)}
                  className="px-4 py-2 bg-white hover:bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-[#121212] font-mono text-xs font-black uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  Read Full Encyclopedia Article
                </button>
              )}
            </div>

            {/* "WHY DOES THIS COME NEXT?" Deep Institutional Inspector */}
            <div className="p-6 bg-[#FAF9F5] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                  <HelpCircle className="w-5 h-5 text-[#1040C0] stroke-[2.5]" />
                  <h4>Why Does This Step Connect to: <span className="text-[#D02020] underline">{currentStep.whyNext.nextStepLabel}</span>?</h4>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 bg-[#F0C020] border-2 border-[#121212] text-[#121212] font-black uppercase">
                  Institutional Causality
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
                {/* 1. Algorithmic Reason */}
                <div className="p-5 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-2">
                  <span className="text-[#1040C0] font-mono font-black block uppercase text-[11px] flex items-center gap-1">
                    <Cpu className="w-4 h-4 stroke-[2.5]" /> 1. Algorithmic Delivery Reason
                  </span>
                  <p className="text-[#121212] font-medium leading-relaxed">
                    {currentStep.whyNext.algorithmicReason}
                  </p>
                </div>

                {/* 2. Orderbook Matching Engine Mechanics */}
                <div className="p-5 bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-2">
                  <span className="text-[#121212] font-mono font-black block uppercase text-[11px] flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#D02020] stroke-[2.5]" /> 2. Order Book Mechanics
                  </span>
                  <p className="text-[#121212] font-medium leading-relaxed">
                    {currentStep.whyNext.orderbookMechanic}
                  </p>
                </div>

                {/* 3. Risk of Premature Skipping */}
                <div className="p-5 bg-rose-50 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-2">
                  <span className="text-[#D02020] font-mono font-black block uppercase text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 stroke-[2.5]" /> 3. Risk of Skipping This Step
                  </span>
                  <p className="text-[#121212] font-medium leading-relaxed">
                    {currentStep.whyNext.riskOfSkipping}
                  </p>
                </div>
              </div>

              {/* Transition CTA */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={selectedPipelineStep <= 1}
                  onClick={() => setSelectedPipelineStep((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-white hover:bg-[#F0C020] border-2 border-[#121212] text-[#121212] text-xs font-mono font-black uppercase disabled:opacity-40 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#121212]"
                >
                  ← Previous Step
                </button>
                <span className="text-xs font-mono text-[#121212] font-black uppercase">
                  Step {selectedPipelineStep} of {pipelineSteps.length}
                </span>
                <button
                  type="button"
                  disabled={selectedPipelineStep >= pipelineSteps.length}
                  onClick={() => setSelectedPipelineStep((prev) => Math.min(pipelineSteps.length, prev + 1))}
                  className="px-5 py-2.5 bg-[#D02020] hover:bg-red-700 text-white font-black text-xs font-mono uppercase disabled:opacity-40 flex items-center gap-1.5 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Advance to Step {selectedPipelineStep + 1} <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 2D DEPENDENCY MAP */}
      {viewMode === 'network' && (
        <div className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-5 overflow-x-auto">
            <svg viewBox="0 0 1150 340" className="w-full min-w-[950px] h-84 select-none bg-[#FAF9F5] border-2 border-[#121212]">
              <defs>
                <marker id="arrow-bauhaus" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#121212" />
                </marker>
              </defs>

              {/* Connectors */}
              <line x1="180" y1="70" x2="240" y2="50" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="180" y1="70" x2="240" y2="120" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="180" y1="70" x2="240" y2="200" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="360" y1="50" x2="420" y2="100" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="360" y1="120" x2="420" y2="100" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="360" y1="200" x2="420" y2="260" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="360" y1="200" x2="580" y2="150" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="540" y1="100" x2="590" y2="60" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="540" y1="100" x2="590" y2="150" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="60" x2="760" y2="60" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="150" x2="760" y2="150" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="150" x2="760" y2="220" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="540" y1="260" x2="590" y2="260" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="880" y1="60" x2="940" y2="100" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="880" y1="150" x2="940" y2="100" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="60" x2="940" y2="180" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="260" x2="940" y2="180" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />
              <line x1="710" y1="260" x2="940" y2="260" stroke="#121212" strokeWidth="2" markerEnd="url(#arrow-bauhaus)" />

              {/* Render Bauhaus Constructivist Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNode;
                const isHovered = node.id === hoveredNode;

                let bgColor = '#FFFFFF';
                let headerColor = '#121212';
                if (node.category === 'Liquidity') {
                  bgColor = '#FFF9C4';
                  headerColor = '#D02020';
                } else if (node.category === 'Imbalances') {
                  bgColor = '#FEE2E2';
                  headerColor = '#D02020';
                } else if (node.category === 'Order Blocks') {
                  bgColor = '#E0E7FF';
                  headerColor = '#1040C0';
                } else if (node.category === 'Time') {
                  bgColor = '#FEF3C7';
                  headerColor = '#121212';
                } else if (node.category === 'Models') {
                  bgColor = '#DCFCE7';
                  headerColor = '#166534';
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer transition-transform"
                    onClick={() => setSelectedNode(node.id)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Hard shadow */}
                    <rect
                      x="-68"
                      y="-20"
                      width="140"
                      height="44"
                      fill="#121212"
                    />
                    <rect
                      x="-70"
                      y="-22"
                      width="140"
                      height="44"
                      fill={bgColor}
                      stroke="#121212"
                      strokeWidth={isSelected ? '3' : '2'}
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill="#121212"
                      fontSize="10"
                      fontWeight="900"
                      fontFamily="monospace"
                    >
                      {node.label.length > 18 ? node.label.substring(0, 16) + '...' : node.label}
                    </text>
                    <text
                      x="0"
                      y="10"
                      textAnchor="middle"
                      fill={headerColor}
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="800"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector - Bauhaus Card */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#121212]">
            <div>
              <span className="text-xs font-mono text-[#D02020] font-black uppercase">{activeNodeObj.category} Node</span>
              <h3 className="text-xl font-black text-[#121212] uppercase mt-0.5">{activeNodeObj.label}</h3>
              <p className="text-[#121212]/80 text-xs sm:text-sm mt-1 font-medium">{activeNodeObj.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectConcept(activeNodeObj.id)}
              className="px-5 py-2.5 bg-[#1040C0] hover:bg-blue-700 text-white font-mono text-xs font-black uppercase border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all shrink-0 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Open Concept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
