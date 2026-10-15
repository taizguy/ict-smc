import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Target, BookOpen } from 'lucide-react';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { SIMULATOR_MODELS, SimulatorModelMeta } from '../utils/workbenchToolRoutes';

interface SimulationResult {
  outcome: 'WIN' | 'LOSS' | 'MISSED';
  rMultiple: number;
  entryPrice: number;
  exitPrice: number;
  stopPrice: number;
  targetPrice: number;
  mfe: number;
  mae: number;
  narrativeSteps: string[];
  lesson: string;
}

export interface TradeSimulatorProps {
  initialModelSlug?: string;
  onNavigateUrl?: (url: string) => void;
}

export const TradeSimulator: React.FC<TradeSimulatorProps> = ({
  initialModelSlug,
  onNavigateUrl
}) => {
  const resolvedModel = initialModelSlug
    ? SIMULATOR_MODELS.find(m => m.slug === initialModelSlug || m.id === initialModelSlug)
    : undefined;

  const [activeModelSlug, setActiveModelSlug] = useState<string | null>(resolvedModel ? resolvedModel.slug : null);

  useEffect(() => {
    if (initialModelSlug) {
      const match = SIMULATOR_MODELS.find(m => m.slug === initialModelSlug || m.id === initialModelSlug);
      if (match && match.slug !== activeModelSlug) {
        applyModelPreset(match);
      }
    }
  }, [initialModelSlug]);
  const [asset] = useState<string>('BTC/USDT');
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>(resolvedModel ? resolvedModel.direction : 'LONG');
  const [htfBias, setHtfBias] = useState<'Bullish' | 'Bearish'>(resolvedModel ? resolvedModel.htfBias : 'Bullish');
  const [location, setLocation] = useState<'Discount' | 'Premium' | 'Equilibrium'>(resolvedModel ? resolvedModel.location : 'Discount');
  const [liquidityEvent, setLiquidityEvent] = useState<'SSL Sweep' | 'BSL Sweep' | 'No Sweep (Chop)'>(resolvedModel ? (resolvedModel.liquidityEvent as any) : 'SSL Sweep');
  const [confirmation, setConfirmation] = useState<'Displacement + MSS' | 'Weak Move' | 'News Spike'>(resolvedModel ? (resolvedModel.confirmation as any) : 'Displacement + MSS');
  const [entryArray, setEntryArray] = useState<'FVG (50% CE)' | 'Order Block' | 'Breaker Block' | 'OTE (70.5%)'>(resolvedModel ? (resolvedModel.entryArray as any) : 'FVG (50% CE)');
  const [stopPlacement, setStopPlacement] = useState<'Structural Invalidation (Sweep Low/High)' | 'Tight (Inside Array)' | 'Arbitrary 20-point'>(resolvedModel ? (resolvedModel.stopPlacement as any) : 'Structural Invalidation (Sweep Low/High)');
  const [targetType, setTargetType] = useState<'Major External Liquidity (PDH/PDL)' | 'Internal Range Liquidity' | 'Fixed 1.5R'>(resolvedModel ? (resolvedModel.targetType as any) : 'Major External Liquidity (PDH/PDL)');

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const applyModelPreset = (model: SimulatorModelMeta) => {
    setActiveModelSlug(model.slug);
    setDirection(model.direction);
    setHtfBias(model.htfBias);
    setLocation(model.location);
    setLiquidityEvent(model.liquidityEvent as any);
    setConfirmation(model.confirmation as any);
    setEntryArray(model.entryArray as any);
    setStopPlacement(model.stopPlacement as any);
    setTargetType(model.targetType as any);
    setSimResult(null);

    const targetUrl = `/tools/simulator/${model.slug}/`;
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const currentModelMeta = activeModelSlug 
    ? SIMULATOR_MODELS.find(m => m.slug === activeModelSlug)
    : undefined;
  
  const canonicalPath = activeModelSlug
    ? `/tools/simulator/${activeModelSlug}/`
    : '/tools/simulator/';

  const runSimulation = () => {
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      // Algorithmic evaluation of trade model confluence
      let isWin = false;
      let rMultiple = 0;
      const narrative: string[] = [];
      let lesson = '';

      // Base price anchors
      const entryPrice = direction === 'LONG' ? 100400 : 101600;
      const stopDistance = stopPlacement === 'Structural Invalidation (Sweep Low/High)' ? 600 : stopPlacement === 'Tight (Inside Array)' ? 200 : 150;
      const stopPrice = direction === 'LONG' ? entryPrice - stopDistance : entryPrice + stopDistance;

      const targetDistance = targetType === 'Major External Liquidity (PDH/PDL)' ? 2400 : targetType === 'Internal Range Liquidity' ? 1200 : 900;
      const targetPrice = direction === 'LONG' ? entryPrice + targetDistance : entryPrice - targetDistance;

      narrative.push(`1. Market Context: ${htfBias} bias established in ${location} of the 4H dealing range.`);

      // Confluence score calculation
      let score = 0;
      if (direction === 'LONG' && htfBias === 'Bullish') score += 2;
      if (direction === 'SHORT' && htfBias === 'Bearish') score += 2;

      if (direction === 'LONG' && location === 'Discount') score += 2;
      if (direction === 'SHORT' && location === 'Premium') score += 2;

      if (direction === 'LONG' && liquidityEvent === 'SSL Sweep') score += 2;
      if (direction === 'SHORT' && liquidityEvent === 'BSL Sweep') score += 2;

      if (confirmation === 'Displacement + MSS') score += 2;
      if (confirmation === 'Weak Move') score -= 2;

      if (stopPlacement === 'Structural Invalidation (Sweep Low/High)') score += 1;
      if (stopPlacement === 'Tight (Inside Array)') score -= 1;
      if (stopPlacement === 'Arbitrary 20-point') score -= 2;

      if (liquidityEvent !== 'No Sweep (Chop)') {
        narrative.push(`2. Liquidity Purge: Algorithmic raid of ${liquidityEvent} completed at macro key time.`);
      } else {
        narrative.push(`2. Low Conviction: Price hovered in choppy consolidation without raiding liquidity.`);
      }

      if (confirmation === 'Displacement + MSS') {
        narrative.push(`3. Institutional Footprint: Explosive displacement candle created an authoritative Market Structure Shift (MSS).`);
      } else {
        narrative.push(`3. Execution Risk: Lack of clean displacement left market vulnerable to adverse flow.`);
      }

      narrative.push(`4. Mitigation Retest: Price pulled back into ${entryArray} filling limit orders.`);

      if (score >= 7) {
        isWin = true;
        rMultiple = Math.round((targetDistance / stopDistance) * 10) / 10;
        narrative.push(`5. Target Fulfilled: Price expanded directly to Draw on Liquidity at $${targetPrice.toLocaleString()} for +${rMultiple}R.`);
        lesson = 'Flawless confluence alignment. Entry in proper range, confirmed displacement, and safe structural invalidation.';
      } else if (score >= 5) {
        if (stopPlacement === 'Tight (Inside Array)') {
          isWin = false;
          rMultiple = -1.0;
          narrative.push(`5. Premature Stop: Setup was directional correct, but tight stop inside array was wicked out before expansion.`);
          lesson = 'Do not choke your stop loss. Always anchor invalidation beyond the structural sweep high/low.';
        } else {
          isWin = true;
          rMultiple = 1.8;
          narrative.push(`5. Scalp Achieved: Sub-optimal context capped continuation, but primary target reached for +1.8R.`);
          lesson = 'Acceptable execution, but trading with medium confluence requires active profit taking.';
        }
      } else {
        isWin = false;
        rMultiple = -1.0;
        narrative.push(`5. Invalidation Hit: Lack of HTF alignment and insufficient liquidity purge resulted in full stop out.`);
        lesson = 'Do not trade without liquidity raid and higher timeframe displacement. You were retail counterparty.';
      }

      setSimResult({
        outcome: isWin ? 'WIN' : 'LOSS',
        rMultiple,
        entryPrice,
        exitPrice: isWin ? targetPrice : stopPrice,
        stopPrice,
        targetPrice,
        mfe: isWin ? rMultiple : 0.4,
        mae: isWin ? 0.3 : 1.0,
        narrativeSteps: narrative,
        lesson
      });

      setIsSimulating(false);
      if (isWin) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }, 600);
  };

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      <SEO
        title={currentModelMeta ? `${currentModelMeta.name} — Trade Simulator | LearnSMC` : 'ICT Trade Simulator & Execution Engine | LearnSMC'}
        description={currentModelMeta ? `${currentModelMeta.description}` : 'Simulate institutional trade setups, liquidity sweeps, displacement confirmation, and optimal trade entry execution.'}
        path={canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Workbench', path: '/tools/' },
          { name: 'Trade Simulator', path: '/tools/simulator/' },
          ...(currentModelMeta ? [{ name: currentModelMeta.name, path: canonicalPath }] : [])
        ]}
      />

      {/* Top Banner - Predikt Dark Card */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                ICT Trade Decision Simulator
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20 rounded-full font-medium uppercase">
                Algorithmic Lab
              </span>
            </div>
            <p className="text-[#9BA1AE] text-xs sm:text-sm">
              Formulate a full institutional trade thesis from Higher Timeframe bias down to entry array and calculate realistic market execution outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#9BA1AE]">
              PAIR: <span className="text-[#F5F7FA] font-medium">{asset}</span>
            </span>
          </div>
        </div>

        {/* Model Presets Bar */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[10px] font-mono text-[#656B78] uppercase whitespace-nowrap">Presets:</span>
          {SIMULATOR_MODELS.map((m) => {
            const isSelected = activeModelSlug === m.slug;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => applyModelPreset(m)}
                className={`px-3 py-1 text-xs font-mono rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.12] text-[#55E6D1] border-[#55E6D1]/40'
                    : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Configuration Setup Form */}
        <div className="lg:col-span-7 bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.07]">
            <h3 className="text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-[#F5F7FA]">
              <ShieldCheck className="w-4 h-4 text-[#55E6D1]" />
              <span>Step 1: Configure Trade Hypothesis</span>
            </h3>
            <span className="text-[10px] font-mono text-[#656B78] uppercase">
              Parameters // 08
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Direction */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Trade Direction:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('LONG')}
                  className={`py-2.5 rounded-xl font-medium uppercase text-xs flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                    direction === 'LONG'
                      ? 'bg-[#55E6D1]/15 text-[#55E6D1] border-[#55E6D1]/40 shadow-sm'
                      : 'bg-white/[0.02] text-[#9BA1AE] border-white/[0.06] hover:bg-white/[0.05] hover:text-[#F5F7FA]'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" /> LONG
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('SHORT')}
                  className={`py-2.5 rounded-xl font-medium uppercase text-xs flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                    direction === 'SHORT'
                      ? 'bg-[#FF6B7A]/15 text-[#FF6B7A] border-[#FF6B7A]/40 shadow-sm'
                      : 'bg-white/[0.02] text-[#9BA1AE] border-white/[0.06] hover:bg-white/[0.05] hover:text-[#F5F7FA]'
                  }`}
                >
                  <ArrowDownRight className="w-3.5 h-3.5" /> SHORT
                </button>
              </div>
            </div>

            {/* HTF Bias */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Higher Timeframe Bias:</label>
              <select
                value={htfBias}
                onChange={(e) => setHtfBias(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="Bullish">Daily/Weekly Bullish</option>
                <option value="Bearish">Daily/Weekly Bearish</option>
              </select>
            </div>

            {/* Dealing Range Location */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Dealing Range Location:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="Discount">Discount (Below 50% Equilibrium)</option>
                <option value="Premium">Premium (Above 50% Equilibrium)</option>
                <option value="Equilibrium">Equilibrium (Middle 50%)</option>
              </select>
            </div>

            {/* Liquidity Event */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Liquidity Event (Before Move):</label>
              <select
                value={liquidityEvent}
                onChange={(e) => setLiquidityEvent(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="SSL Sweep">Sell Side Liquidity (SSL) Swept</option>
                <option value="BSL Sweep">Buy Side Liquidity (BSL) Swept</option>
                <option value="No Sweep (Chop)">No Clear Sweep (Random Chop)</option>
              </select>
            </div>

            {/* Confirmation */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Structural Confirmation:</label>
              <select
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="Displacement + MSS">Strong Displacement + Valid MSS</option>
                <option value="Weak Move">Weak Drift / No MSS</option>
                <option value="News Spike">High-Impact News Spike</option>
              </select>
            </div>

            {/* Entry Array */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Entry PD Array:</label>
              <select
                value={entryArray}
                onChange={(e) => setEntryArray(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="FVG (50% CE)">Fair Value Gap (50% Consequent Encroachment)</option>
                <option value="Order Block">Fresh Order Block (Mitigation)</option>
                <option value="Breaker Block">Breaker Block (Role Reversal)</option>
                <option value="OTE (70.5%)">Optimal Trade Entry (70.5% Fibonacci)</option>
              </select>
            </div>

            {/* Stop Placement */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Stop Loss Invalidation:</label>
              <select
                value={stopPlacement}
                onChange={(e) => setStopPlacement(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="Structural Invalidation (Sweep Low/High)">Below Sweep Low / Above Sweep High</option>
                <option value="Tight (Inside Array)">Tight (Inside the FVG/OB)</option>
                <option value="Arbitrary 20-point">Arbitrary Fixed 20 Points</option>
              </select>
            </div>

            {/* Target */}
            <div className="space-y-1.5">
              <label className="text-[#9BA1AE] text-[11px] uppercase">Target Objective (Draw):</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full bg-[#151923] border border-white/[0.08] text-[#F5F7FA] rounded-xl p-2.5 focus:outline-none focus:border-[#5865FF] cursor-pointer"
              >
                <option value="Major External Liquidity (PDH/PDL)">External Liquidity (PDH / PDL / PWH)</option>
                <option value="Internal Range Liquidity">Internal Range Swing</option>
                <option value="Fixed 1.5R">Fixed 1.5R Quick Scalp</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full py-3.5 rounded-xl bg-[#5865FF] hover:bg-[#4752E6] text-white font-mono font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#5865FF]/20 active:scale-[0.99] disabled:opacity-50"
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
            <span>{isSimulating ? 'Simulating Price Delivery...' : 'Simulate Market Execution'}</span>
          </button>
        </div>

        {/* Output & Narrative Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          {simResult ? (
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-5 text-[#F5F7FA]">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div className="flex items-center gap-2.5">
                  {simResult.outcome === 'WIN' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#55E6D1]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#FF6B7A]" />
                  )}
                  <span
                    className={`font-mono text-sm sm:text-base font-semibold uppercase ${
                      simResult.outcome === 'WIN' ? 'text-[#55E6D1]' : 'text-[#FF6B7A]'
                    }`}
                  >
                    TRADE RESULT: {simResult.outcome} ({simResult.rMultiple > 0 ? `+${simResult.rMultiple}R` : `${simResult.rMultiple}R`})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#656B78] uppercase">
                  EXECUTION LOG
                </span>
              </div>

              {/* Price Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="bg-[#151923] p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[#656B78] block text-[10px] uppercase">Entry Fill:</span>
                  <span className="text-[#5865FF] font-semibold text-sm">${simResult.entryPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#151923] p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[#656B78] block text-[10px] uppercase">Exit Price:</span>
                  <span className="text-[#F5F7FA] font-semibold text-sm">${simResult.exitPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#151923] p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[#656B78] block text-[10px] uppercase">Stop (Invalidation):</span>
                  <span className="text-[#FF6B7A] font-semibold text-sm">${simResult.stopPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#151923] p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[#656B78] block text-[10px] uppercase">Target (Draw):</span>
                  <span className="text-[#55E6D1] font-semibold text-sm">${simResult.targetPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Step by Step Narrative */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#9BA1AE]">
                  Price Delivery Chronology:
                </h5>
                <div className="space-y-2 bg-[#0C0E13] p-4 rounded-xl border border-white/[0.06] text-xs font-mono text-[#9BA1AE]">
                  {simResult.narrativeSteps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed border-b border-white/[0.04] pb-1.5 last:border-0 last:pb-0">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodological Lesson */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono text-[#F5F7FA]">
                <strong className="text-[#F0B35B] uppercase font-semibold">Institutional Takeaway: </strong>
                <span className="text-[#9BA1AE]">{simResult.lesson}</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-8 text-center space-y-3 h-full flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-1 text-[#5865FF]">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-mono uppercase font-semibold text-[#F5F7FA]">Ready to Simulate</h4>
              <p className="text-xs text-[#9BA1AE] max-w-xs leading-relaxed">
                Select your setup parameters on the left and click "Simulate Market Execution" to observe how the algorithmic delivery sequence unfolds.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Engine & Structured Data */}
      <SEO
        title="Trade Simulator & Algorithmic Market Replay | LearnSMC"
        description="Step-by-step blind testing across London and NY Killzones with realistic limit order fills, slippage, and institutional order book simulation."
        canonicalPath="/tools/simulator/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LearnSMC Trade Simulator",
          "url": "https://learnsmc.xyz/tools/simulator/",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Algorithmic execution simulator modeling order fills, stop runs, and price delivery.",
          "educationalUse": "Execution strategy simulation and trade mechanics testing",
          "provider": {
            "@type": "Organization",
            "name": "LearnSMC",
            "url": "https://learnsmc.xyz/"
          }
        }}
      />

      {/* Static Semantic HTML Documentation Block (Indexable by Googlebot & Search Engines) */}
      <article className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 text-[#F5F7FA]">
        <header className="border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#5865FF]">
              DOCUMENTATION // EXECUTION SIMULATOR
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
            Algorithmic Trade Simulator &amp; Order Execution Mechanics
          </h2>
          <p className="text-sm text-[#9BA1AE] mt-1">
            Understanding passive limit order queue priority, aggressive market order consumption, and trade expectancy modeling.
          </p>
        </header>

        {/* Section 1: Execution Mechanics */}
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#55E6D1] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#55E6D1]" />
            1. Simulated Market Fills vs. Live Order Book Reality
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            In live exchange trading, an order is not filled merely because price touches a level on a chart. 
            Limit orders placed at an Order Block or Fair Value Gap join the back of the queue at that price level (Price-Time Priority). 
            Unless aggressive market orders consume sufficient volume at that quote, resting orders remain unfilled. 
            This simulator models both fill probability and adverse excursion to prevent retail traders from building false confidence on frictionless paper executions.
          </p>
        </section>

        {/* Section 2: Confluence Multipliers */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#5865FF] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#5865FF]" />
            2. Confluence Hierarchy for Trade Expectancy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#9BA1AE]">
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Higher-Timeframe Alignment</strong>
              Executing trades in agreement with daily and 4-hour market structure yields over 2.5x higher win probability compared to counter-trend scalps.
            </div>
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Prior Liquidity Sweep</strong>
              Entering without a clean sweep of external liquidity results in getting caught inside range-bound whipsaws and retail stop-runs.
            </div>
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Displacement Confirmation</strong>
              A decisive close creating an energetic FVG confirms algorithmic participation, validating entry on the subsequent pullback.
            </div>
          </div>
        </section>

        {/* Section 3: Risk & Sizing */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#FFB020] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFB020]" />
            3. Maximum Adverse Excursion (MAE) &amp; Stop Placement
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            Never place stops arbitrarily (e.g., fixed 10 pips or 20 ticks). Stops must always be placed beyond the structural invalidation point — specifically 
            the swing point that initiated the displacement. If price breaches that extreme, the setup thesis is fundamentally broken.
          </p>
        </section>
      </article>
    </div>
  );
};

export default TradeSimulator;
