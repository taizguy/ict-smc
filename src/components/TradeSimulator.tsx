import React, { useState } from 'react';
import { PlayCircle, ShieldCheck, Target, RefreshCw, BarChart2, CheckCircle2, XCircle, AlertCircle, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

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

export const TradeSimulator: React.FC = () => {
  const [asset, setAsset] = useState<string>('BTC/USDT');
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [htfBias, setHtfBias] = useState<'Bullish' | 'Bearish'>('Bullish');
  const [location, setLocation] = useState<'Discount' | 'Premium' | 'Equilibrium'>('Discount');
  const [liquidityEvent, setLiquidityEvent] = useState<'SSL Sweep' | 'BSL Sweep' | 'No Sweep (Chop)'>('SSL Sweep');
  const [confirmation, setConfirmation] = useState<'Displacement + MSS' | 'Weak Move' | 'News Spike'>('Displacement + MSS');
  const [entryArray, setEntryArray] = useState<'FVG (50% CE)' | 'Order Block' | 'Breaker Block' | 'OTE (70.5%)'>('FVG (50% CE)');
  const [stopPlacement, setStopPlacement] = useState<'Structural Invalidation (Sweep Low/High)' | 'Tight (Inside Array)' | 'Arbitrary 20-point'>('Structural Invalidation (Sweep Low/High)');
  const [targetType, setTargetType] = useState<'Major External Liquidity (PDH/PDL)' | 'Internal Range Liquidity' | 'Fixed 1.5R'>('Major External Liquidity (PDH/PDL)');

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      // Algorithmic evaluation of trade model confluence
      let isWin = false;
      let isMissed = false;
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
        // Marginal setup
        if (stopPlacement === 'Tight (Inside Array)') {
          isWin = false;
          rMultiple = -1.0;
          narrative.push(`5. Premature Stop: Setup was directional correct, but tight stop inside array was wicked out before expansion.`);
          lesson = 'Do not choke your stop loss. Always anchor invalidation beyond the structural sweep high/low.';
        } else {
          isWin = true;
          rMultiple = 1.8;
          narrative.push(`5. Reduced Target: Front-run expansion yielded partial fill before internal exhaustion for +1.8R.`);
          lesson = 'Acceptable execution with minor timing friction. Disciplined take-profit secured.';
        }
      } else {
        isWin = false;
        rMultiple = -1.0;
        narrative.push(`5. Invalidation Stop Out: Low-confluence execution broke opposite structure, hitting protective stop.`);
        lesson = 'Low confluence trade. Trading into adverse liquidity pools without confirmed displacement carries extreme risk.';
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
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-4 bg-[#1040C0] border border-black inline-block" />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
              ICT Trade Decision Simulator
            </h2>
            <span className="px-3 py-1 text-[10px] font-mono bg-[#F0C020] text-[#121212] border-2 border-[#121212] font-black uppercase shadow-[2px_2px_0px_0px_#121212]">
              Algorithmic Simulator
            </span>
          </div>
          <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
            Formulate a full institutional trade thesis from Higher Timeframe bias down to entry array and calculate realistic market execution outcomes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Setup Form - Bauhaus Panel */}
        <div className="lg:col-span-7 bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-5 text-[#121212]">
          <h3 className="text-sm font-mono font-black uppercase tracking-wider flex items-center gap-2 pb-3 border-b-4 border-[#121212]">
            <ShieldCheck className="w-4 h-4 text-[#D02020] stroke-[2.5]" />
            <span>Step 1: Configure Trade Hypothesis</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Direction */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Trade Direction:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('LONG')}
                  className={`py-2.5 rounded-none font-black uppercase text-xs flex items-center justify-center gap-1 transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    direction === 'LONG'
                      ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" /> LONG
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('SHORT')}
                  className={`py-2.5 rounded-none font-black uppercase text-xs flex items-center justify-center gap-1 transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    direction === 'SHORT'
                      ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[3]" /> SHORT
                </button>
              </div>
            </div>

            {/* HTF Bias */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Higher Timeframe Bias:</label>
              <select
                value={htfBias}
                onChange={(e) => setHtfBias(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="Bullish">Daily/Weekly Bullish</option>
                <option value="Bearish">Daily/Weekly Bearish</option>
              </select>
            </div>

            {/* Dealing Range Location */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Dealing Range Location:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="Discount">Discount (Below 50% Equilibrium)</option>
                <option value="Premium">Premium (Above 50% Equilibrium)</option>
                <option value="Equilibrium">Equilibrium (Middle 50%)</option>
              </select>
            </div>

            {/* Liquidity Event */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Liquidity Event (Before Move):</label>
              <select
                value={liquidityEvent}
                onChange={(e) => setLiquidityEvent(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="SSL Sweep">Sell Side Liquidity (SSL) Swept</option>
                <option value="BSL Sweep">Buy Side Liquidity (BSL) Swept</option>
                <option value="No Sweep (Chop)">No Clear Sweep (Random Chop)</option>
              </select>
            </div>

            {/* Confirmation */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Structural Confirmation:</label>
              <select
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="Displacement + MSS">Strong Displacement + Valid MSS</option>
                <option value="Weak Move">Weak Drift / No MSS</option>
                <option value="News Spike">High-Impact News Spike</option>
              </select>
            </div>

            {/* Entry Array */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Entry PD Array:</label>
              <select
                value={entryArray}
                onChange={(e) => setEntryArray(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="FVG (50% CE)">Fair Value Gap (50% Consequent Encroachment)</option>
                <option value="Order Block">Fresh Order Block (Mitigation)</option>
                <option value="Breaker Block">Breaker Block (Role Reversal)</option>
                <option value="OTE (70.5%)">Optimal Trade Entry (70.5% Fibonacci)</option>
              </select>
            </div>

            {/* Stop Placement */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Stop Loss Invalidation:</label>
              <select
                value={stopPlacement}
                onChange={(e) => setStopPlacement(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                <option value="Structural Invalidation (Sweep Low/High)">Below Sweep Low / Above Sweep High</option>
                <option value="Tight (Inside Array)">Tight (Inside the FVG/OB)</option>
                <option value="Arbitrary 20-point">Arbitrary Fixed 20 Points</option>
              </select>
            </div>

            {/* Target */}
            <div className="space-y-1.5">
              <label className="text-[#121212] font-black uppercase text-[11px]">Target Objective (Draw):</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] font-bold rounded-none p-2.5 focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
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
            className="w-full py-4 rounded-none bg-[#D02020] hover:bg-red-700 text-white font-mono font-black text-sm uppercase flex items-center justify-center gap-2 transition-all border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-5 h-5 fill-white/20 stroke-[2.5]" />}
            <span>{isSimulating ? 'SIMULATING PRICE DELIVERY...' : 'SIMULATE MARKET EXECUTION'}</span>
          </button>
        </div>

        {/* Output & Narrative Breakdown - Bauhaus Results Card */}
        <div className="lg:col-span-5 space-y-4">
          {simResult ? (
            <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
              <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212]">
                <div className="flex items-center gap-2.5">
                  {simResult.outcome === 'WIN' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#1040C0] stroke-[3]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#D02020] stroke-[3]" />
                  )}
                  <span
                    className={`font-mono text-base sm:text-lg font-black uppercase ${
                      simResult.outcome === 'WIN' ? 'text-[#1040C0]' : 'text-[#D02020]'
                    }`}
                  >
                    TRADE RESULT: {simResult.outcome} ({simResult.rMultiple > 0 ? `+${simResult.rMultiple}R` : `${simResult.rMultiple}R`})
                  </span>
                </div>
              </div>

              {/* Price Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-[#F0F0F0] p-3 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Entry Fill:</span>
                  <span className="text-[#1040C0] font-black text-sm">${simResult.entryPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#F0F0F0] p-3 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Exit Price:</span>
                  <span className="text-[#121212] font-black text-sm">${simResult.exitPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#F0F0F0] p-3 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Stop (Invalidation):</span>
                  <span className="text-[#D02020] font-black text-sm">${simResult.stopPrice.toLocaleString()}</span>
                </div>
                <div className="bg-[#F0F0F0] p-3 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Target (Draw):</span>
                  <span className="text-[#1040C0] font-black text-sm">${simResult.targetPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Step by Step Narrative */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono font-black text-[#121212] uppercase tracking-wider">
                  Price Delivery Chronology:
                </h5>
                <div className="space-y-2 bg-[#FAF9F5] p-4 border-2 border-[#121212] text-xs font-mono font-bold text-[#121212]">
                  {simResult.narrativeSteps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed border-b border-[#121212]/10 pb-1.5 last:border-0 last:pb-0">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodological Lesson */}
              <div className="p-4 bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-mono text-[#121212]">
                <strong className="text-[#D02020] uppercase font-black">Institutional Takeaway: </strong>
                {simResult.lesson}
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-8 text-center space-y-3 h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-[#F0C020] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center justify-center mb-1">
                <Zap className="w-6 h-6 text-[#121212] stroke-[2.5]" />
              </div>
              <h4 className="text-base font-mono font-black uppercase text-[#121212]">Ready to Simulate</h4>
              <p className="text-xs text-[#121212]/80 max-w-xs leading-relaxed font-medium">
                Select your setup parameters on the left and click "Simulate Market Execution" to see how the algorithmic delivery sequence unfolds.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeSimulator;
