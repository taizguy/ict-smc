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
        algorithmicReason: 'True institutional displacement has enough force to smash through the previous structural swing point, formally breaking the prior trend regime and confirming a Market Structure Shift.',
        orderbookMechanic: 'The origin of the previous opposing swing is overwhelmed and closed beyond, proving change of control.',
        riskOfSkipping: 'Entering on displacement that fails to break a structural swing point leaves you in a minor retracement within the old trend.'
      }
    },
    {
      id: 'step-5',
      stepNumber: 5,
      label: '5. Market Structure Shift (MSS)',
      category: 'Structure',
      shortSummary: 'Candle body close decisively beyond a protected swing pivot.',
      conceptIdRef: 'market_structure_bos_mss_choch',
      whyNext: {
        nextStepLabel: '6. Fair Value Gap (FVG) / Order Block (OB)',
        algorithmicReason: 'Because the displacement that generated the MSS was so violent, it bypassed fair auction delivery, leaving behind a 3-candle Fair Value Gap (FVG) and an institutional Order Block at the origin.',
        orderbookMechanic: 'Low volume nodes across the displacement corridor contain un-offered liquidity that the matching engine must re-price into.',
        riskOfSkipping: 'Chasing the market after the MSS candle breakout without locating the FVG gives terrible risk:reward and wide stop losses.'
      }
    },
    {
      id: 'step-6',
      stepNumber: 6,
      label: '6. Imbalance / PD Array Creation',
      category: 'Imbalance',
      shortSummary: 'Unbalanced 3-candle corridor (FVG) or institutional origin candle (OB).',
      conceptIdRef: 'fair_value_gap',
      whyNext: {
        nextStepLabel: '7. Retracement to Equilibrium',
        algorithmicReason: 'The algorithm (IPDA) temporarily pauses directional expansion to retrace into Discount (for longs) or Premium (for shorts) to rebalance the imbalance before the next expansion leg.',
        orderbookMechanic: 'Auction efficiency: Price trades back to fair value so passive inventory can be re-hedged.',
        riskOfSkipping: 'Buying in Premium or selling in Discount instead of waiting for retracement guarantees maximum drawdown.'
      }
    },
    {
      id: 'step-7',
      stepNumber: 7,
      label: '7. Retracement to PD Array',
      category: 'Execution',
      shortSummary: 'Counter-trend repricing back into the FVG or Order Block.',
      conceptIdRef: 'fair_value_gap',
      whyNext: {
        nextStepLabel: '8. Limit Order Tap & CE Mitigation',
        algorithmicReason: 'Price reaches the Consequent Encroachment (50% midpoint) of the FVG or open of the OB, where institutional resting limit buy/sell orders are loaded.',
        orderbookMechanic: 'Passive liquidity wall: As price touches the CE, limit order execution absorbs the retracement and halts adverse delivery.',
        riskOfSkipping: 'Entering before price enters the PD Array forces you to take premature entries with undefined risk.'
      }
    },
    {
      id: 'step-8',
      stepNumber: 8,
      label: '8. Trade Entry & Invalidation Anchor',
      category: 'Execution',
      shortSummary: 'Execution at the PD Array with Stop Loss behind the swing or OB origin.',
      conceptIdRef: 'order_blocks_anatomy',
      whyNext: {
        nextStepLabel: '9. Expansion Phase (Second Leg)',
        algorithmicReason: 'With retail traders trapped and institutional inventory replenished, IPDA initiates the main expansion leg toward the primary Draw on Liquidity (DOL).',
        orderbookMechanic: 'Aggressive programmatic execution accelerates through low resistance liquidity runs.',
        riskOfSkipping: 'Hesitating at the entry tap leads to chasing price once the expansion candle ignites.'
      }
    },
    {
      id: 'step-9',
      stepNumber: 9,
      label: '9. Expansion Phase',
      category: 'Execution',
      shortSummary: 'Fast one-directional impulse delivery toward opposing pools.',
      conceptIdRef: 'draw_on_liquidity',
      whyNext: {
        nextStepLabel: '10. Target Delivery (Draw on Liquidity)',
        algorithmicReason: 'Every institutional delivery cycle terminates at an opposing pool of liquidity (Equal Highs, Equal Lows, or HTF PD Array) where smart money takes profit.',
        orderbookMechanic: 'Institutional distribution: Large players offload their positions into the awaiting resting stop orders at the target.',
        riskOfSkipping: 'Greedily holding through the target without taking partials risks a complete re-accumulation reversal.'
      }
    },
    {
      id: 'step-10',
      stepNumber: 10,
      label: '10. Target Delivery (DOL)',
      category: 'Target',
      shortSummary: 'Full cycle completion at opposing HTF BSL/SSL or internal liquidity.',
      conceptIdRef: 'draw_on_liquidity',
      whyNext: {
        nextStepLabel: 'Cycle Resets to Step 1',
        algorithmicReason: 'Once liquidity is consumed at the target, the algorithm either pauses in consolidation or begins sweeping the opposing side, re-initiating the cycle.',
        orderbookMechanic: 'Liquidity void created: The market seeks balance before the next institutional accumulation campaign.',
        riskOfSkipping: 'Expecting infinite trend continuation without recognizing cycle termination leads to giving back all gains.'
      }
    }
  ];

  const currentStep = pipelineSteps.find((s) => s.stepNumber === selectedPipelineStep) || pipelineSteps[2];

  const nodes: Node[] = [
    { id: 'liquidity_pools', label: 'Liquidity Pools (BSL/SSL)', category: 'Liquidity', x: 120, y: 70, description: 'Where market stops accumulate.', prereqs: [] },
    { id: 'liquidity_sweeps', label: 'Liquidity Sweep (Raid)', category: 'Liquidity', x: 300, y: 50, description: 'Penetration of stops before reversal.', prereqs: ['liquidity_pools'] },
    { id: 'displacement', label: 'Algorithmic Displacement', category: 'Imbalances', x: 480, y: 100, description: 'Fast, energetic candle velocity.', prereqs: ['liquidity_sweeps'] },
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
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GitFork className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-wide font-display">
                ICT Concept Dependency & Causal Pipeline
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-300 font-bold uppercase">
                Institutional Causality
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-sans">
              Understand the non-random causal logic linking liquidity raids, displacement, FVG imbalances, and terminal execution.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10-Step Causal Pipeline
            </button>
            <button
              onClick={() => setViewMode('network')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                viewMode === 'network'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-600 hover:text-slate-900'
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
          {/* Horizontal Step Progression Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-2 min-w-[900px]">
              {pipelineSteps.map((step) => {
                const isSelected = step.stepNumber === selectedPipelineStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setSelectedPipelineStep(step.stepNumber)}
                    className={`flex-1 p-3 rounded-xl text-left transition-all font-mono border ${
                      isSelected
                        ? 'bg-sky-50 border-2 border-sky-500 text-sky-950 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={isSelected ? 'text-sky-800 font-bold' : 'text-slate-500'}>
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">
                        {step.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate text-slate-900">
                      {step.label.split('. ')[1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Causal Reasoning Box for Selected Step */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono text-sky-700 font-bold uppercase tracking-wider">
                  Active Execution Node: Step {currentStep.stepNumber} of 10
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                  {currentStep.label}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 font-sans">
                  {currentStep.shortSummary}
                </p>
              </div>

              {currentStep.conceptIdRef && (
                <button
                  onClick={() => onSelectConcept(currentStep.conceptIdRef!)}
                  className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 font-mono text-xs font-bold hover:bg-sky-100 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  Read Full Encyclopedia Article
                </button>
              )}
            </div>

            {/* "WHY DOES THIS COME NEXT?" Deep Institutional Inspector */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-sky-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-mono text-sm font-bold">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <h4>Why Does This Step Connect to: <span className="text-sky-900 underline font-bold">{currentStep.whyNext.nextStepLabel}</span>?</h4>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold uppercase">
                  Institutional Causality
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
                {/* 1. Algorithmic Reason */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                  <span className="text-sky-800 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-sky-600" /> 1. Algorithmic Delivery Reason
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {currentStep.whyNext.algorithmicReason}
                  </p>
                </div>

                {/* 2. Orderbook Matching Engine Mechanics */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                  <span className="text-amber-800 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" /> 2. Order Book Mechanics
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {currentStep.whyNext.orderbookMechanic}
                  </p>
                </div>

                {/* 3. Risk of Premature Skipping */}
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 shadow-sm">
                  <span className="text-rose-800 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> 3. Risk of Skipping This Step
                  </span>
                  <p className="text-rose-900 leading-relaxed">
                    {currentStep.whyNext.riskOfSkipping}
                  </p>
                </div>
              </div>

              {/* Transition CTA */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={selectedPipelineStep <= 1}
                  onClick={() => setSelectedPipelineStep((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-mono disabled:opacity-40 hover:bg-slate-100 transition-colors"
                >
                  ← Previous Step
                </button>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  Step {selectedPipelineStep} of {pipelineSteps.length}
                </span>
                <button
                  disabled={selectedPipelineStep >= pipelineSteps.length}
                  onClick={() => setSelectedPipelineStep((prev) => Math.min(pipelineSteps.length, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-xs font-mono disabled:opacity-40 hover:from-sky-500 hover:to-blue-500 flex items-center gap-1 shadow-md shadow-sky-600/20"
                >
                  Advance to Step {selectedPipelineStep + 1} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 2D DEPENDENCY MAP */}
      {viewMode === 'network' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 overflow-x-auto shadow-sm relative">
            <svg viewBox="0 0 1150 340" className="w-full min-w-[950px] h-80 select-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284c7" />
                </marker>
              </defs>

              {/* Connectors */}
              <line x1="180" y1="70" x2="240" y2="50" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="180" y1="70" x2="240" y2="120" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="180" y1="70" x2="240" y2="200" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="50" x2="420" y2="100" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="120" x2="420" y2="100" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="200" x2="420" y2="260" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="200" x2="580" y2="150" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="100" x2="590" y2="60" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="100" x2="590" y2="150" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="60" x2="760" y2="60" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="150" x2="760" y2="150" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="150" x2="760" y2="220" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="260" x2="590" y2="260" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="880" y1="60" x2="940" y2="100" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="880" y1="150" x2="940" y2="100" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="60" x2="940" y2="180" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="260" x2="940" y2="180" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="260" x2="940" y2="260" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNode;
                const isHovered = node.id === hoveredNode;

                let bgColor = '#f8fafc';
                let strokeColor = '#94a3b8';
                let textColor = '#0f172a';
                if (node.category === 'Liquidity') {
                  bgColor = '#fffbeb';
                  strokeColor = '#f59e0b';
                  textColor = '#92400e';
                } else if (node.category === 'Imbalances') {
                  bgColor = '#f0f9ff';
                  strokeColor = '#0284c7';
                  textColor = '#0369a1';
                } else if (node.category === 'Order Blocks') {
                  bgColor = '#faf5ff';
                  strokeColor = '#9333ea';
                  textColor = '#6b21a8';
                } else if (node.category === 'Time') {
                  bgColor = '#eef2ff';
                  strokeColor = '#4f46e5';
                  textColor = '#3730a3';
                } else if (node.category === 'Models') {
                  bgColor = '#f0fdf4';
                  strokeColor = '#16a34a';
                  textColor = '#15803d';
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
                    <rect
                      x="-70"
                      y="-22"
                      width="140"
                      height="44"
                      rx="10"
                      fill={bgColor}
                      stroke={isSelected ? '#0284c7' : strokeColor}
                      strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1.5'}
                      className="transition-all"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.label.length > 18 ? node.label.substring(0, 16) + '...' : node.label}
                    </text>
                    <text
                      x="0"
                      y="10"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-sky-700 font-bold uppercase">{activeNodeObj.category} Node</span>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">{activeNodeObj.label}</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">{activeNodeObj.description}</p>
            </div>
            <button
              onClick={() => onSelectConcept(activeNodeObj.id)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-mono text-xs font-bold shadow-md shadow-sky-600/20 hover:from-sky-500 hover:to-blue-500 transition-all shrink-0"
            >
              Open Concept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
