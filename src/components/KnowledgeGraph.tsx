import React, { useState } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { 
  GitFork, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles,
  Cpu,
  Target,
  Clock,
  ArrowDown
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
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(3); // Step 3 by default
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
        algorithmicReason: 'Once institutional orders are fully filled against the triggered stops, smart money aggressively aggressively deploys market orders in the opposite direction, creating violent one-sided displacement.',
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
      label: '7. Retracement Phase',
      category: 'Execution',
      shortSummary: 'Corrective pullback into the Discount/Premium dealing range.',
      conceptIdRef: 'optimal_trade_entry_ote',
      whyNext: {
        nextStepLabel: '8. PD Array Mitigation (50% CE / MT)',
        algorithmicReason: 'As price enters the FVG or OB, it seeks the mathematical equilibrium: 50% Consequent Encroachment (CE) of the FVG or 50% Mean Threshold (MT) of the Order Block.',
        orderbookMechanic: 'Institutional limit orders resting at the 50% midpoint are filled, and rejection wicks form.',
        riskOfSkipping: 'Entering at the very outer edge of the gap requires larger stop-loss buffers and lowers your realized R:R.'
      }
    },
    {
      id: 'step-8',
      stepNumber: 8,
      label: '8. PD Array Mitigation',
      category: 'Execution',
      shortSummary: 'Price taps 50% CE or OB Open and begins printing rejection wicks.',
      conceptIdRef: 'consequent_encroachment',
      whyNext: {
        nextStepLabel: '9. Precision Entry Trigger',
        algorithmicReason: 'With the imbalance now balanced and higher timeframe orderflow aligned, the trade execution criteria is fully satisfied.',
        orderbookMechanic: 'The limit buy/sell order fills and protective stop loss is placed beyond the protected invalidation swing.',
        riskOfSkipping: 'Failing to define strict invalidation beyond the displacement swing leads to catastrophic uncontrolled losses.'
      }
    },
    {
      id: 'step-9',
      stepNumber: 9,
      label: '9. Precision Trade Entry',
      category: 'Execution',
      shortSummary: 'Limit order fill at CE with stop loss safely anchored beyond the sweep swing.',
      conceptIdRef: 'ict_2022_model',
      whyNext: {
        nextStepLabel: '10. Terminal Draw on Liquidity (Target)',
        algorithmicReason: 'Once smart money secures their position at discount, IPDA accelerates price directly toward the opposing liquidity pool (BSL/SSL) to distribute the accumulated positions.',
        orderbookMechanic: 'Targeting opposing resting stops where deep counterparty volume exists to close positions into profit.',
        riskOfSkipping: 'Exiting prematurely before price reaches the logical Draw on Liquidity deprives the trader of the high R-multiple.'
      }
    },
    {
      id: 'step-10',
      stepNumber: 10,
      label: '10. Terminal Draw on Liquidity',
      category: 'Target',
      shortSummary: 'Full profit realization into opposing BSL/SSL or HTF PD Array.',
      conceptIdRef: 'sell_side_liquidity',
      whyNext: {
        nextStepLabel: '1. Cycle Complete -> New Auction Begins',
        algorithmicReason: 'With the target liquidity pool cleared, the entire delivery cycle resets. The algorithm begins accumulating new orders for the next session or timeframe cycle.',
        orderbookMechanic: 'Order books reload, liquidity pools re-form, and the 10-step institutional sequence repeats fractally.',
        riskOfSkipping: 'Staying in a position after the primary Draw on Liquidity is reached risks giving back profits in the subsequent reversal.'
      }
    }
  ];

  // 2D Network Graph Nodes
  const nodes: Node[] = [
    { id: 'market_mechanics_liquidity', label: 'Order Book & Mechanics', category: 'Foundations', x: 120, y: 70, description: 'Bids, Asks, Price-Time Priority, Aggression vs Passive limit orders.', prereqs: [] },
    { id: 'buy_side_liquidity', label: 'Buy Side Liquidity (BSL)', category: 'Liquidity', x: 300, y: 50, description: 'Stops and breakout orders clustered above swing peaks and PDH.', prereqs: ['market_mechanics_liquidity'] },
    { id: 'sell_side_liquidity', label: 'Sell Side Liquidity (SSL)', category: 'Liquidity', x: 300, y: 120, description: 'Stops resting beneath swing lows, double bottoms, and PDL.', prereqs: ['market_mechanics_liquidity'] },
    { id: 'market_structure_bos_mss_choch', label: 'Structure: BOS & MSS', category: 'Structure', x: 300, y: 200, description: 'Swing hierarchy, Protected Lows, Trend Continuation vs MSS.', prereqs: ['market_mechanics_liquidity'] },
    { id: 'displacement_engine', label: 'Displacement (The Engine)', category: 'Imbalances', x: 480, y: 100, description: 'Aggressive one-sided repricing that leaves behind imbalances.', prereqs: ['buy_side_liquidity', 'sell_side_liquidity'] },
    { id: 'fair_value_gap', label: 'Fair Value Gap (FVG)', category: 'Imbalances', x: 650, y: 60, description: '3-candle imbalance corridor with 50% Consequent Encroachment (CE).', prereqs: ['displacement_engine'] },
    { id: 'inverse_fair_value_gap', label: 'Inverse FVG (IFVG)', category: 'Imbalances', x: 820, y: 60, description: 'Violated FVG that inverts into opposite support/resistance.', prereqs: ['fair_value_gap'] },
    { id: 'order_block', label: 'Order Block (OB)', category: 'Order Blocks', x: 650, y: 150, description: 'Last opposing candle before displacement and structural break.', prereqs: ['displacement_engine', 'market_structure_bos_mss_choch'] },
    { id: 'breaker_block', label: 'Breaker Block', category: 'Order Blocks', x: 820, y: 150, description: 'Failed Order Block after liquidity sweep, flipping role on retest.', prereqs: ['order_block'] },
    { id: 'mitigation_block', label: 'Mitigation Block', category: 'Order Blocks', x: 820, y: 220, description: 'Failure swing reversal block retested before continuation.', prereqs: ['order_block'] },
    { id: 'sessions_killzones_timing', label: 'Sessions & Killzones', category: 'Time', x: 480, y: 260, description: 'Asian range, London Judas Swing, New York AM/PM distribution.', prereqs: ['market_structure_bos_mss_choch'] },
    { id: 'power_of_three_amd', label: 'Power of Three (AMD)', category: 'Time', x: 650, y: 260, description: 'Accumulation -> Manipulation below Open -> Distribution.', prereqs: ['sessions_killzones_timing'] },
    { id: 'ict_2022_model', label: 'ICT 2022 Model', category: 'Models', x: 1000, y: 100, description: 'Sweep -> Displacement -> MSS -> FVG Entry -> Target Liquidity.', prereqs: ['fair_value_gap', 'order_block', 'market_structure_bos_mss_choch'] },
    { id: 'silver_bullet_model', label: 'Silver Bullet (10 AM)', category: 'Models', x: 1000, y: 180, description: '1-Hour algorithmic window FVG execution targeting session liquidity.', prereqs: ['sessions_killzones_timing', 'fair_value_gap'] },
    { id: 'optimal_trade_entry_ote', label: 'Optimal Trade Entry (OTE)', category: 'Models', x: 1000, y: 260, description: '62% - 79% Fibonacci retracement confluence with PD arrays.', prereqs: ['fair_value_gap', 'power_of_three_amd'] }
  ];

  const currentStep = pipelineSteps[selectedPipelineStep - 1] || pipelineSteps[0];
  const activeNodeObj = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GitFork className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white font-mono tracking-wide">
                ICT Knowledge Backbone & Causal Engine
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-sans">
              Understand the institutional causality linking each concept: why Step B must follow Step A in algorithmic price delivery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              10-Step Causal Pipeline
            </button>
            <button
              onClick={() => setViewMode('network')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'network'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Dependency Map
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: 10-STEP CAUSAL PIPELINE ("WHY DOES THIS COME NEXT?") */}
      {viewMode === 'pipeline' && (
        <div className="space-y-6">
          {/* Horizontal Step Progression Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-[900px]">
              {pipelineSteps.map((step) => {
                const isSelected = step.stepNumber === selectedPipelineStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setSelectedPipelineStep(step.stepNumber)}
                    className={`flex-1 p-2.5 rounded-lg text-left transition-all font-mono border ${
                      isSelected
                        ? 'bg-cyan-950 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                        {step.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">
                      {step.label.split('. ')[1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Causal Reasoning Box for Selected Step */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Active Execution Node: Step {currentStep.stepNumber} of 10
                </span>
                <h3 className="text-2xl font-bold text-white font-mono mt-0.5">
                  {currentStep.label}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 font-sans">
                  {currentStep.shortSummary}
                </p>
              </div>

              {currentStep.conceptIdRef && (
                <button
                  onClick={() => onSelectConcept(currentStep.conceptIdRef!)}
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Full Encyclopedia Article
                </button>
              )}
            </div>

            {/* "WHY DOES THIS COME NEXT?" Deep Institutional Inspector */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <h4>Why Does This Step Connect to: <span className="text-white underline">{currentStep.whyNext.nextStepLabel}</span>?</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 uppercase">
                  Institutional Causality
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
                {/* 1. Algorithmic Reason */}
                <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" /> 1. Algorithmic Delivery Reason
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentStep.whyNext.algorithmicReason}
                  </p>
                </div>

                {/* 2. Orderbook Matching Engine Mechanics */}
                <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 2. Order Book Mechanics
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentStep.whyNext.orderbookMechanic}
                  </p>
                </div>

                {/* 3. Risk of Premature Skipping */}
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <span className="text-rose-400 font-mono font-bold block uppercase text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> 3. Risk of Skipping This Step
                  </span>
                  <p className="text-rose-200/90 leading-relaxed">
                    {currentStep.whyNext.riskOfSkipping}
                  </p>
                </div>
              </div>

              {/* Transition CTA */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={selectedPipelineStep <= 1}
                  onClick={() => setSelectedPipelineStep((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded bg-slate-900 text-slate-400 text-xs font-mono disabled:opacity-30 hover:text-white"
                >
                  ← Previous Step
                </button>
                <span className="text-xs font-mono text-slate-500">
                  Step {selectedPipelineStep} of {pipelineSteps.length}
                </span>
                <button
                  disabled={selectedPipelineStep >= pipelineSteps.length}
                  onClick={() => setSelectedPipelineStep((prev) => Math.min(pipelineSteps.length, prev + 1))}
                  className="px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold text-xs font-mono disabled:opacity-30 hover:bg-cyan-400 flex items-center gap-1"
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
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto shadow-2xl relative">
            <svg viewBox="0 0 1150 340" className="w-full min-w-[950px] h-80 select-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#06b6d4" />
                </marker>
              </defs>

              {/* Connectors */}
              <line x1="180" y1="70" x2="240" y2="50" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="180" y1="70" x2="240" y2="120" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="180" y1="70" x2="240" y2="200" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="50" x2="420" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="120" x2="420" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="200" x2="420" y2="260" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="360" y1="200" x2="580" y2="150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="100" x2="590" y2="60" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="100" x2="590" y2="150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="60" x2="760" y2="60" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="150" x2="760" y2="150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="150" x2="760" y2="220" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="540" y1="260" x2="590" y2="260" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="880" y1="60" x2="940" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="880" y1="150" x2="940" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="60" x2="940" y2="180" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="260" x2="940" y2="180" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="710" y1="260" x2="940" y2="260" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNode;
                const isHovered = node.id === hoveredNode;

                let bgColor = '#1e293b';
                let strokeColor = '#475569';
                if (node.category === 'Liquidity') {
                  bgColor = '#451a03';
                  strokeColor = '#f59e0b';
                } else if (node.category === 'Imbalances') {
                  bgColor = '#083344';
                  strokeColor = '#06b6d4';
                } else if (node.category === 'Order Blocks') {
                  bgColor = '#2e1065';
                  strokeColor = '#a855f7';
                } else if (node.category === 'Time') {
                  bgColor = '#1e1b4b';
                  strokeColor = '#6366f1';
                } else if (node.category === 'Models') {
                  bgColor = '#022c22';
                  strokeColor = '#10b981';
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
                      rx="8"
                      fill={bgColor}
                      stroke={isSelected ? '#38bdf8' : strokeColor}
                      strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1'}
                      className="transition-all"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#e2e8f0'}
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
                      fill="#94a3b8"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{activeNodeObj.category} Node</span>
              <h3 className="text-lg font-bold text-white font-mono mt-0.5">{activeNodeObj.label}</h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">{activeNodeObj.description}</p>
            </div>
            <button
              onClick={() => onSelectConcept(activeNodeObj.id)}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-all shrink-0"
            >
              Open Concept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
