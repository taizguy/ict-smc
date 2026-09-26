import React, { useState } from 'react';
import { 
  GitFork, 
  BookOpen, 
  Cpu, 
  Zap, 
  ShieldAlert, 
  HelpCircle, 
  ArrowRight,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

export interface KnowledgeGraphProps {
  onSelectConcept: (conceptId: string) => void;
}

interface PipelineStep {
  id: string;
  stepNumber: number;
  label: string;
  category: string;
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
        algorithmicReason: 'Institutions cannot enter hundreds of millions in size without finding counterparty liquidity. They drive price into resting stop clusters to absorb orders.',
        orderbookMechanic: 'Triggered stop-loss orders convert into immediate market orders, providing institutional limit orders with instantaneous high-volume fills.',
        riskOfSkipping: 'Entering before a pool is raided guarantees you will be used as the stop-loss liquidity.'
      }
    },
    {
      id: 'step-3',
      stepNumber: 3,
      label: '3. Liquidity Sweep (The Raid)',
      category: 'Manipulation',
      shortSummary: 'False breakout piercing key swing levels, purging stops before reversing.',
      conceptIdRef: 'liquidity_pools_and_runs',
      whyNext: {
        nextStepLabel: '4. Institutional Absorption',
        algorithmicReason: 'A mere price touch does not confirm institutional intent. We must verify that large entities absorbed the volume rather than letting price run continuously.',
        orderbookMechanic: 'Aggressive absorption is visible when price rejects the extreme rapidly, leaving long candle wicks and failing to close beyond the level on higher timeframes.',
        riskOfSkipping: 'Treating real structural continuation as a false sweep leads to catastrophic counter-trend losses.'
      }
    },
    {
      id: 'step-4',
      stepNumber: 4,
      label: '4. Institutional Absorption',
      category: 'Order Flow',
      shortSummary: 'Interbank algorithms absorb counterparty fills against the swept pool.',
      conceptIdRef: 'interbank_price_delivery_algorithm',
      whyNext: {
        nextStepLabel: '5. Energetic Displacement',
        algorithmicReason: 'Once institutional accumulation/distribution is complete, the algorithm transitions from passive absorption into active repricing (displacement).',
        orderbookMechanic: 'Market orders aggressively sweep the thinned order book in the opposite direction, creating rapid large-range candles.',
        riskOfSkipping: 'Without displacement, you are entering in chop or low-conviction market drift.'
      }
    },
    {
      id: 'step-5',
      stepNumber: 5,
      label: '5. Displacement Candle',
      category: 'Displacement',
      shortSummary: 'Fast impulse candle with large body and minimal wicks indicating genuine intent.',
      conceptIdRef: 'displacement',
      whyNext: {
        nextStepLabel: '6. Market Structure Shift (MSS)',
        algorithmicReason: 'Displacement must have structural authority. It must break previous internal or swing structure (BOS/MSS) to officially reclassify the order flow regime.',
        orderbookMechanic: 'Full candle body closes across the opposing swing point mathematically confirm the prior trend is invalidated.',
        riskOfSkipping: 'Mistaking single-candle volatility spikes (news wicks) for genuine shifts in order flow.'
      }
    },
    {
      id: 'step-6',
      stepNumber: 6,
      label: '6. Market Structure Shift',
      category: 'Structure',
      shortSummary: 'Body close breaking recent swing high/low, confirming trend reversal.',
      conceptIdRef: 'market_structure_shifts',
      whyNext: {
        nextStepLabel: '7. Imbalance / FVG Formation',
        algorithmicReason: 'Because the displacement was one-sided, interbank pricing created inefficiency where buy orders were delivered without two-sided auction.',
        orderbookMechanic: 'The 3-candle sequence leaves a void between Candle 1 wick and Candle 3 wick: the Fair Value Gap (FVG).',
        riskOfSkipping: 'Entering blindly at market rather than identifying the precise institutional discount/premium array to mitigate.'
      }
    },
    {
      id: 'step-7',
      stepNumber: 7,
      label: '7. FVG Imbalance Formation',
      category: 'Imbalance',
      shortSummary: 'Inefficient price delivery leaving a 3-candle liquidity gap.',
      conceptIdRef: 'fair_value_gap',
      whyNext: {
        nextStepLabel: '8. Mitigation Retest (Execution Entry)',
        algorithmicReason: 'Interbank algorithms are mandated to offer fair two-sided auction. Price returns to rebalance the inefficiency before expanding toward the ultimate target.',
        orderbookMechanic: 'Resting limit orders from algorithmic desks are filled at the 50% Consequent Encroachment (CE) of the FVG.',
        riskOfSkipping: 'Chasing expansion moves at market prices results in adverse drawdown and poor risk-to-reward.'
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
    <div className="space-y-6 text-[#F5F7FA]">
      {/* Top Banner */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                ICT Concept Dependency &amp; Causal Pipeline
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20 rounded-full uppercase">
                Causality Engine
              </span>
            </div>
            <p className="text-[#9BA1AE] text-xs sm:text-sm">
              Understand the non-random causal logic linking liquidity raids, displacement, FVG imbalances, and terminal execution.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('pipeline')}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                viewMode === 'pipeline'
                  ? 'bg-white/[0.12] text-[#F5F7FA] border border-white/20'
                  : 'text-[#9BA1AE] hover:text-[#F5F7FA]'
              }`}
            >
              10-Step Pipeline
            </button>
            <button
              type="button"
              onClick={() => setViewMode('network')}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                viewMode === 'network'
                  ? 'bg-white/[0.12] text-[#F5F7FA] border border-white/20'
                  : 'text-[#9BA1AE] hover:text-[#F5F7FA]'
              }`}
            >
              Dependency Map
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: 10-STEP CAUSAL PIPELINE */}
      {viewMode === 'pipeline' && (
        <div className="space-y-6">
          {/* Horizontal Step Progression Bar */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#656B78] mb-2 px-1">
              PIPELINE SEQUENCE:
            </div>
            <BauhausNavScroller>
              {pipelineSteps.map((step) => {
                const isSelected = step.stepNumber === selectedPipelineStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setSelectedPipelineStep(step.stepNumber)}
                    className={`p-3 text-left transition-all font-mono rounded-xl border cursor-pointer min-w-[170px] shrink-0 ${
                      isSelected
                        ? 'bg-white/[0.10] border-white/25 text-[#F5F7FA] shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-[#5865FF] font-medium">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#656B78] uppercase">
                        {step.category}
                      </span>
                    </div>
                    <div className="text-xs font-medium truncate text-[#F5F7FA]">
                      {step.label.split('. ')[1]}
                    </div>
                  </button>
                );
              })}
            </BauhausNavScroller>
          </div>

          {/* Detailed Causal Reasoning Box for Selected Step */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6 text-[#F5F7FA]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
              <div>
                <span className="text-xs font-mono text-[#55E6D1] uppercase tracking-wider">
                  Active Execution Node: Step {currentStep.stepNumber} of 10
                </span>
                <h3 className="text-2xl font-semibold text-[#F5F7FA] tracking-tight mt-0.5">
                  {currentStep.label}
                </h3>
                <p className="text-[#9BA1AE] text-xs sm:text-sm mt-1">
                  {currentStep.shortSummary}
                </p>
              </div>

              {currentStep.conceptIdRef && (
                <button
                  type="button"
                  onClick={() => onSelectConcept(currentStep.conceptIdRef!)}
                  className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-[#F5F7FA] font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#5865FF]" />
                  Read Full Encyclopedia Article
                </button>
              )}
            </div>

            {/* "WHY DOES THIS COME NEXT?" Deep Institutional Inspector */}
            <div className="p-6 bg-[#0C0E13] rounded-xl border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                  <HelpCircle className="w-4 h-4 text-[#5865FF]" />
                  <h4>Why Does This Step Connect to: <span className="text-[#55E6D1] underline">{currentStep.whyNext.nextStepLabel}</span>?</h4>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#9BA1AE] uppercase">
                  Institutional Causality
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
                {/* 1. Algorithmic Reason */}
                <div className="p-5 bg-[#151923] rounded-xl border border-white/[0.06] space-y-2">
                  <span className="text-[#5865FF] font-mono uppercase text-[11px] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> 1. Algorithmic Delivery Reason
                  </span>
                  <p className="text-[#9BA1AE] leading-relaxed">
                    {currentStep.whyNext.algorithmicReason}
                  </p>
                </div>

                {/* 2. Orderbook Matching Engine Mechanics */}
                <div className="p-5 bg-[#151923] rounded-xl border border-white/[0.06] space-y-2">
                  <span className="text-[#55E6D1] font-mono uppercase text-[11px] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> 2. Order Book Mechanics
                  </span>
                  <p className="text-[#9BA1AE] leading-relaxed">
                    {currentStep.whyNext.orderbookMechanic}
                  </p>
                </div>

                {/* 3. Risk of Premature Skipping */}
                <div className="p-5 bg-[#151923] rounded-xl border border-white/[0.06] space-y-2">
                  <span className="text-[#FF6B7A] font-mono uppercase text-[11px] flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> 3. Risk of Skipping This Step
                  </span>
                  <p className="text-[#9BA1AE] leading-relaxed">
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
                  className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-[#9BA1AE] hover:text-[#F5F7FA] text-xs font-mono uppercase tracking-wider disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
                </button>
                <span className="text-xs font-mono text-[#656B78] uppercase">
                  Step {selectedPipelineStep} of {pipelineSteps.length}
                </span>
                <button
                  type="button"
                  disabled={selectedPipelineStep >= pipelineSteps.length}
                  onClick={() => setSelectedPipelineStep((prev) => Math.min(pipelineSteps.length, prev + 1))}
                  className="px-5 py-2.5 bg-[#5865FF] hover:bg-[#4752E6] text-white text-xs font-mono uppercase tracking-wider disabled:opacity-40 flex items-center gap-1.5 rounded-xl cursor-pointer shadow-lg shadow-[#5865FF]/20"
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
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-5 overflow-x-auto">
            <svg viewBox="0 0 1150 340" className="w-full min-w-[950px] h-84 select-none bg-[#0C0E13] rounded-xl border border-white/[0.06]">
              <defs>
                <marker id="arrow-predikt" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(255,255,255,0.4)" />
                </marker>
              </defs>

              {/* Connectors */}
              <line x1="180" y1="70" x2="240" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="180" y1="70" x2="240" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="180" y1="70" x2="240" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="360" y1="50" x2="420" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="360" y1="120" x2="420" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="360" y1="200" x2="420" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="360" y1="200" x2="580" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="540" y1="100" x2="590" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="540" y1="100" x2="590" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="60" x2="760" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="150" x2="760" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="150" x2="760" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="540" y1="260" x2="590" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="880" y1="60" x2="940" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="880" y1="150" x2="940" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="60" x2="940" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="260" x2="940" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />
              <line x1="710" y1="260" x2="940" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrow-predikt)" />

              {/* Render Modern Dark Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNode;

                let tagColor = '#5865FF';
                if (node.category === 'Liquidity') tagColor = '#55E6D1';
                else if (node.category === 'Imbalances') tagColor = '#FF6B7A';
                else if (node.category === 'Order Blocks') tagColor = '#5865FF';
                else if (node.category === 'Time') tagColor = '#F0B35B';
                else if (node.category === 'Models') tagColor = '#55E6D1';

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
                      fill={isSelected ? '#1A1F2C' : '#151923'}
                      stroke={isSelected ? '#5865FF' : 'rgba(255, 255, 255, 0.1)'}
                      strokeWidth={isSelected ? '2' : '1'}
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill="#F5F7FA"
                      fontSize="10"
                      fontWeight="500"
                      fontFamily="sans-serif"
                    >
                      {node.label.length > 18 ? node.label.substring(0, 16) + '...' : node.label}
                    </text>
                    <text
                      x="0"
                      y="11"
                      textAnchor="middle"
                      fill={tagColor}
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
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#F5F7FA]">
            <div>
              <span className="text-xs font-mono text-[#55E6D1] uppercase tracking-wider">{activeNodeObj.category} Node</span>
              <h3 className="text-xl font-semibold text-[#F5F7FA] mt-0.5">{activeNodeObj.label}</h3>
              <p className="text-[#9BA1AE] text-xs sm:text-sm mt-1">{activeNodeObj.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectConcept(activeNodeObj.id)}
              className="px-5 py-2.5 bg-[#5865FF] hover:bg-[#4752E6] text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer shadow-lg shadow-[#5865FF]/20"
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
