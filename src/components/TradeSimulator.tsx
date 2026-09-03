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

      // Evaluation Logic
      const hasDirectionAlignment = (direction === 'LONG' && htfBias === 'Bullish' && location === 'Discount') ||
                                    (direction === 'SHORT' && htfBias === 'Bearish' && location === 'Premium');

      const hasLiquiditySweep = (direction === 'LONG' && liquidityEvent === 'SSL Sweep') ||
                                (direction === 'SHORT' && liquidityEvent === 'BSL Sweep');

      const hasValidConfirmation = confirmation === 'Displacement + MSS';

      narrative.push(`1. Market Context: ${htfBias} bias identified with price positioned in ${location}.`);

      if (liquidityEvent === 'No Sweep (Chop)') {
        narrative.push('2. Execution Warning: No key liquidity was raided before the move. Price lacked institutional counterparty fuel.');
      } else {
        narrative.push(`2. Liquidity Event: Price successfully raided ${liquidityEvent}, collecting stop orders into ${location}.`);
      }

      if (confirmation === 'Displacement + MSS') {
        narrative.push('3. Institutional Confirmation: Violent displacement printed with full candle bodies breaking structure (MSS).');
      } else if (confirmation === 'News Spike') {
        narrative.push('3. Volatility Warning: Sudden news spike created erratic wicks without structural consensus.');
      } else {
        narrative.push('3. Weak Momentum: Price drifted with overlapping candles failing to prove directional control.');
      }

      narrative.push(`4. Entry Trigger: Limit order filled on retracement into ${entryArray} at $${entryPrice.toLocaleString()}.`);

      if (stopPlacement === 'Tight (Inside Array)') {
        narrative.push('5. Stop Out: Price performed a normal deep probe into the array wick, tagging the tight stop before expanding.');
        isWin = false;
        rMultiple = -1.0;
        lesson = 'Placing stops tightly inside the array instead of beyond the structural invalidation (sweep extreme) causes premature stop-outs during normal mitigation.';
      } else if (hasDirectionAlignment && hasLiquiditySweep && hasValidConfirmation) {
        isWin = true;
        rMultiple = Math.round((targetDistance / stopDistance) * 10) / 10;
        narrative.push(`5. Expansion Delivery: Institutional distribution accelerated cleanly toward $${targetPrice.toLocaleString()}. Full Take Profit achieved!`);
        lesson = 'Flawless top-down alignment: Higher Timeframe context, liquidity sweep in discount/premium, displacement confirmation, and structural invalidation stop.';
      } else {
        isWin = false;
        rMultiple = -1.0;
        narrative.push(`5. Thesis Failure: Opposing order flow overwhelmed the setup, hitting stop loss at $${stopPrice.toLocaleString()}.`);
        lesson = 'The trade was missing one or more essential confluence pillars (e.g. trading against HTF location or lacking real displacement).';
      }

      setSimResult({
        outcome: isWin ? 'WIN' : isMissed ? 'MISSED' : 'LOSS',
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
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <PlayCircle className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-bold text-slate-900 font-display tracking-wide">ICT Trade Decision Simulator</h2>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm">
          Formulate a full institutional trade thesis from Higher Timeframe bias down to entry array and calculate realistic market execution outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Setup Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <h3 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Step 1: Configure Trade Hypothesis</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Direction */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Trade Direction:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection('LONG')}
                  className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                    direction === 'LONG' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" /> LONG
                </button>
                <button
                  onClick={() => setDirection('SHORT')}
                  className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                    direction === 'SHORT' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowDownRight className="w-3.5 h-3.5" /> SHORT
                </button>
              </div>
            </div>

            {/* HTF Bias */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Higher Timeframe Bias:</label>
              <select
                value={htfBias}
                onChange={(e) => setHtfBias(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="Bullish">Daily/Weekly Bullish</option>
                <option value="Bearish">Daily/Weekly Bearish</option>
              </select>
            </div>

            {/* Dealing Range Location */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Dealing Range Location:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="Discount">Discount (Below 50% Equilibrium)</option>
                <option value="Premium">Premium (Above 50% Equilibrium)</option>
                <option value="Equilibrium">Equilibrium (Middle 50%)</option>
              </select>
            </div>

            {/* Liquidity Event */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Liquidity Event (Before Move):</label>
              <select
                value={liquidityEvent}
                onChange={(e) => setLiquidityEvent(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="SSL Sweep">Sell Side Liquidity (SSL) Swept</option>
                <option value="BSL Sweep">Buy Side Liquidity (BSL) Swept</option>
                <option value="No Sweep (Chop)">No Clear Sweep (Random Chop)</option>
              </select>
            </div>

            {/* Confirmation */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Structural Confirmation:</label>
              <select
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="Displacement + MSS">Strong Displacement + Valid MSS</option>
                <option value="Weak Move">Weak Drift / No MSS</option>
                <option value="News Spike">High-Impact News Spike</option>
              </select>
            </div>

            {/* Entry Array */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Entry PD Array:</label>
              <select
                value={entryArray}
                onChange={(e) => setEntryArray(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="FVG (50% CE)">Fair Value Gap (50% Consequent Encroachment)</option>
                <option value="Order Block">Fresh Order Block (Mitigation)</option>
                <option value="Breaker Block">Breaker Block (Role Reversal)</option>
                <option value="OTE (70.5%)">Optimal Trade Entry (70.5% Fibonacci)</option>
              </select>
            </div>

            {/* Stop Placement */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Stop Loss Invalidation:</label>
              <select
                value={stopPlacement}
                onChange={(e) => setStopPlacement(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="Structural Invalidation (Sweep Low/High)">Below Sweep Low / Above Sweep High</option>
                <option value="Tight (Inside Array)">Tight (Inside the FVG/OB)</option>
                <option value="Arbitrary 20-point">Arbitrary Fixed 20 Points</option>
              </select>
            </div>

            {/* Target */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">Target Objective (Draw):</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-sky-500"
              >
                <option value="Major External Liquidity (PDH/PDL)">External Liquidity (PDH / PDL / PWH)</option>
                <option value="Internal Range Liquidity">Internal Range Swing</option>
                <option value="Fixed 1.5R">Fixed 1.5R Quick Scalp</option>
              </select>
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-600/20 cursor-pointer"
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
            {isSimulating ? 'Simulating Price Delivery...' : 'Simulate Market Execution'}
          </button>
        </div>

        {/* Output & Narrative Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          {simResult ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  {simResult.outcome === 'WIN' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600" />
                  )}
                  <span
                    className={`font-mono text-lg font-bold ${
                      simResult.outcome === 'WIN' ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    TRADE RESULT: {simResult.outcome} ({simResult.rMultiple > 0 ? `+${simResult.rMultiple}R` : `${simResult.rMultiple}R`})
                  </span>
                </div>
              </div>

              {/* Price Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Entry Fill:</span>
                  <span className="text-sky-700 font-bold text-sm">${simResult.entryPrice.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Exit Price:</span>
                  <span className="text-slate-900 font-bold text-sm">${simResult.exitPrice.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Stop (Invalidation):</span>
                  <span className="text-rose-600 font-bold text-sm">${simResult.stopPrice.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Target (Draw):</span>
                  <span className="text-emerald-600 font-bold text-sm">${simResult.targetPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Step by Step Narrative */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Price Delivery Chronology:
                </h5>
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
                  {simResult.narrativeSteps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodological Lesson */}
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs font-mono text-sky-950">
                <strong className="text-sky-900">Institutional Takeaway: </strong>
                {simResult.lesson}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 h-full flex flex-col items-center justify-center shadow-sm">
              <Zap className="w-10 h-10 text-sky-600/70 animate-pulse" />
              <h4 className="text-sm font-mono font-bold text-slate-800">Ready to Simulate</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Select your setup parameters on the left and click "Simulate Market Execution" to see how the algorithmic delivery sequence unfolds.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
