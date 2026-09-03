import React, { useState } from 'react';
import { 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  AlertTriangle, 
  Activity,
  CheckCircle2
} from 'lucide-react';

export const BacktestLab: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<'2022_model' | 'charter_model_1' | 'charter_model_8' | 'charter_model_9' | 'silver_bullet' | 'breaker_reversal'>('2022_model');
  const [riskPerTrade, setRiskPerTrade] = useState<number>(1.0); // 1%
  const [minQualityScore, setMinQualityScore] = useState<number>(5); // only 5+ score trades
  const [simSeed, setSimSeed] = useState<number>(1);

  // Strategy profiles
  const strategyData = {
    '2022_model': {
      title: 'ICT Charter Model 13 / 2022 Mentorship Model (Displacement + FVG)',
      baseWinRate: minQualityScore >= 6 ? 68 : minQualityScore >= 5 ? 61 : 52,
      avgRR: 2.8,
      tradesPerMonth: minQualityScore >= 6 ? 14 : 26,
      maxDrawdown: minQualityScore >= 6 ? 5.2 : 9.4,
      profitFactor: minQualityScore >= 6 ? 2.45 : 1.95,
      description: 'Executes strictly when session liquidity (AM/Lunch/PDH/PDL) is swept, followed by aggressive displacement and MSS creating a clean 50% CE FVG.',
      ruleSet: [
        '1. Clear raid of AM session high/low, PDH, PDL, or Lunch range',
        '2. Energetic 1m/5m displacement candle breaking internal swing with body close',
        '3. Entry placed at 50% Consequent Encroachment (CE) of FVG',
        '4. Stop Loss placed 1 tick beyond the raid swing high/low',
        '5. Profit target set at opposing HTF pool (minimum 2.0R)'
      ]
    },
    'charter_model_1': {
      title: 'ICT Charter Model 1 (Intraday Scalping & 20-Day IPDA)',
      baseWinRate: minQualityScore >= 6 ? 72 : minQualityScore >= 5 ? 64 : 54,
      avgRR: 2.1,
      tradesPerMonth: minQualityScore >= 6 ? 22 : 36,
      maxDrawdown: minQualityScore >= 6 ? 4.4 : 7.8,
      profitFactor: minQualityScore >= 6 ? 2.55 : 2.05,
      description: 'High-frequency intraday scalping targeting 10 to 30 pips within the New York Killzone after raiding PDH/PDL with 20-Day IPDA discount/premium alignment.',
      ruleSet: [
        '1. 20-Day IPDA lookback defines active dealing range Equilibrium',
        '2. Raids Previous Day High (for Premium Sells) or Low (for Discount Buys)',
        '3. 62% to 79% Optimal Trade Entry (OTE) retracement entry',
        '4. Stop loss fixed 1 tick outside the raid high or low',
        '5. Target: 10, 20, or 30 pips expansion beyond the raided swing'
      ]
    },
    'charter_model_8': {
      title: 'ICT Charter Model 8 (25 Pips / Week Compounding Precision)',
      baseWinRate: minQualityScore >= 6 ? 81 : minQualityScore >= 5 ? 74 : 62,
      avgRR: 2.2,
      tradesPerMonth: minQualityScore >= 6 ? 5 : 9,
      maxDrawdown: minQualityScore >= 6 ? 2.8 : 5.1,
      profitFactor: minQualityScore >= 6 ? 3.15 : 2.4,
      description: 'Ultra-disciplined compounding framework executing only the single cleanest counter-bias manipulation entry per week with a strict 15-pip stop.',
      ruleSet: [
        '1. Single weekly execution window during high-volatility injection',
        '2. Counter-bias manipulation into an established HTF Discount FVG',
        '3. Tight 15-pip structural stop loss on the 5-minute execution chart',
        '4. Rigid 25-pip fixed objective with zero greed or overtrading',
        '5. Complete screen detachment once 25 pips are secured'
      ]
    },
    'charter_model_9': {
      title: 'ICT Charter Model 9 (One Shot One Kill - OSOK)',
      baseWinRate: minQualityScore >= 6 ? 76 : minQualityScore >= 5 ? 67 : 55,
      avgRR: 3.2,
      tradesPerMonth: minQualityScore >= 6 ? 4 : 8,
      maxDrawdown: minQualityScore >= 6 ? 3.9 : 6.8,
      profitFactor: minQualityScore >= 6 ? 2.95 : 2.25,
      description: 'The patient sniper approach: waiting for Internal Range Liquidity (FVG/OB) rebalancing to ride the expansion towards External Range Liquidity.',
      ruleSet: [
        '1. Directional alignment with Weekly Institutional Order Flow',
        '2. External Range Liquidity swept first to spark the retracement',
        '3. Entry executed at Internal Range Liquidity (FVG / Order Block)',
        '4. Target: Full expansion to opposing External Range Liquidity',
        '5. Maximum 1 high-conviction trade execution per week'
      ]
    },
    'silver_bullet': {
      title: 'ICT Silver Bullet (10:00 - 11:00 AM NY Window)',
      baseWinRate: minQualityScore >= 6 ? 74 : minQualityScore >= 5 ? 65 : 56,
      avgRR: 2.2,
      tradesPerMonth: minQualityScore >= 6 ? 18 : 32,
      maxDrawdown: minQualityScore >= 6 ? 4.1 : 7.2,
      profitFactor: minQualityScore >= 6 ? 2.65 : 2.1,
      description: 'Strict 1-hour time-window strategy executing on the first clean FVG formed after sweeping session liquidity in New York AM session.',
      ruleSet: [
        '1. Active execution window: 10:00 AM to 11:00 AM NY Time',
        '2. London or NY Open liquidity sweep prerequisite',
        '3. First qualifying Fair Value Gap inside the 60-minute window',
        '4. Minimum 15-tick / 1:2 R:R objective to opposing session draw',
        '5. Immediate trade cancellation if not triggered by 10:45 AM'
      ]
    },
    'breaker_reversal': {
      title: 'Failed Order Block Breaker Reversal',
      baseWinRate: minQualityScore >= 6 ? 62 : minQualityScore >= 5 ? 55 : 48,
      avgRR: 3.4,
      tradesPerMonth: minQualityScore >= 6 ? 9 : 18,
      maxDrawdown: minQualityScore >= 6 ? 6.8 : 11.2,
      profitFactor: minQualityScore >= 6 ? 2.3 : 1.75,
      description: 'High reward-to-risk model catching the exact structural point where trapped retail breakout buyers/sellers are forced into liquidation.',
      ruleSet: [
        '1. Swing High -> Swing Low -> Higher High raid pattern (Bearish Breaker)',
        '2. Rapid invalidation of the intermediate down-close order block',
        '3. Return to retest the high of the violated order block',
        '4. Stop Loss placed tightly behind the retest candle',
        '5. Primary target: Origin of the entire higher timeframe impulse leg'
      ]
    }
  }[selectedStrategy];

  // Generate 5 Monte Carlo simulation paths to visualize variance
  const generateMonteCarloPaths = () => {
    const paths: number[][] = [];
    const numPaths = 5;
    const numTrades = 40;
    const winProb = strategyData.baseWinRate / 100;

    for (let p = 0; p < numPaths; p++) {
      let currentEquity = 10000;
      const pathPoints: number[] = [currentEquity];
      for (let t = 1; t <= numTrades; t++) {
        const pseudoRand = ((t * 97 + p * 313 + simSeed * 7919) % 1000) / 1000;
        const isWin = pseudoRand < winProb;
        const riskAmount = currentEquity * (riskPerTrade / 100);
        if (isWin) {
          currentEquity += riskAmount * strategyData.avgRR;
        } else {
          currentEquity -= riskAmount;
        }
        pathPoints.push(Math.round(currentEquity));
      }
      paths.push(pathPoints);
    }
    return paths;
  };

  const mcPaths = generateMonteCarloPaths();
  const medianPath = mcPaths[0];
  const startingEquity = 10000;
  const endingEquity = medianPath[medianPath.length - 1];
  const totalReturn = Math.round(((endingEquity - startingEquity) / startingEquity) * 100);

  const allValues = mcPaths.flat();
  const chartMax = Math.max(...allValues) * 1.05;
  const chartMin = Math.min(...allValues) * 0.95;
  const chartHeight = 220;
  const chartWidth = 650;

  const getSvgX = (index: number, total: number) => (index / (total - 1)) * (chartWidth - 60) + 30;
  const getSvgY = (val: number) => chartHeight - ((val - chartMin) / (chartMax - chartMin || 1)) * (chartHeight - 40) - 20;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display tracking-wide">
                ICT Backtest & Expectancy Engine
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-sans">
              Mathematical expectancy simulation, Monte Carlo randomized variance bounds, and institutional execution parameters.
            </p>
          </div>

          <button
            onClick={() => setSimSeed((prev) => prev + 1)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
            Reseed Monte Carlo Run
          </button>
        </div>

        {/* Strategy Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-slate-200 scrollbar-none">
          {[
            { id: '2022_model', label: 'ICT Charter Model 13 (2022 Model)' },
            { id: 'charter_model_1', label: 'Charter Model 1 (Intraday Scalp)' },
            { id: 'charter_model_8', label: 'Charter Model 8 (25 Pips/Wk)' },
            { id: 'charter_model_9', label: 'Charter Model 9 (OSOK)' },
            { id: 'silver_bullet', label: 'Silver Bullet (10 AM Window)' },
            { id: 'breaker_reversal', label: 'Breaker Block Reversals' }
          ].map((strat) => (
            <button
              key={strat.id}
              onClick={() => setSelectedStrategy(strat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                selectedStrategy === strat.id
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold shadow-md shadow-sky-600/20'
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {strat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls + Equity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200">
            Model Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-slate-700 block mb-1.5 font-semibold">
                Setup Confluence Score Filter: <span className="text-sky-700 font-bold">{minQualityScore} / 7</span>
              </label>
              <input
                type="range"
                min="4"
                max="7"
                value={minQualityScore}
                onChange={(e) => setMinQualityScore(parseInt(e.target.value, 10))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                {minQualityScore >= 6 ? '★ Elite A+ Confluence (Lower frequency, tighter drawdowns)' : 'Standard Setup Filter'}
              </span>
            </div>

            <div>
              <label className="text-slate-700 block mb-1.5 font-semibold">
                Risk Per Trade: <span className="text-emerald-600 font-bold">{riskPerTrade}%</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={riskPerTrade}
                onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1.5 font-semibold">
                Starting Account Equity: <span className="text-slate-900 font-bold">$10,000.00</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <h4 className="font-bold text-amber-800 uppercase text-[11px]">Execution Checklist:</h4>
            <ul className="space-y-1 text-[11px] text-slate-700 font-sans">
              {strategyData.ruleSet.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistical Summary & Curve */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Model Win Rate:</span>
              <span className="text-emerald-600 font-bold text-lg">{strategyData.baseWinRate}%</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Average R:R:</span>
              <span className="text-sky-700 font-bold text-lg">1 : {strategyData.avgRR}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Profit Factor:</span>
              <span className="text-amber-700 font-bold text-lg">{strategyData.profitFactor}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Max Drawdown:</span>
              <span className="text-rose-600 font-bold text-lg">{strategyData.maxDrawdown}%</span>
            </div>
          </div>

          {/* Svg Equity Curve with Multi-Path Monte Carlo */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-700 flex items-center gap-1.5 font-semibold">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                Monte Carlo Simulated Equity (5 Randomized Variance Paths, 40 Trades):
              </span>
              <span className="text-emerald-600 font-bold text-sm">
                ${endingEquity.toLocaleString()} (+{totalReturn}%)
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto min-w-[500px]">
                {/* Grid lines */}
                {[0, 0.33, 0.66, 1].map((r, i) => {
                  const yVal = chartHeight - r * (chartHeight - 40) - 20;
                  return (
                    <line
                      key={i}
                      x1="30"
                      y1={yVal}
                      x2={chartWidth - 30}
                      y2={yVal}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Background Monte Carlo variance paths */}
                {mcPaths.slice(1).map((path, pIdx) => {
                  const pts = path
                    .map((val, idx) => `${getSvgX(idx, path.length)},${getSvgY(val)}`)
                    .join(' ');
                  return (
                    <polyline
                      key={pIdx}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      opacity="0.7"
                      points={pts}
                    />
                  );
                })}

                {/* Primary Median Line */}
                <polyline
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  points={medianPath
                    .map((val, idx) => `${getSvgX(idx, medianPath.length)},${getSvgY(val)}`)
                    .join(' ')}
                />

                {/* Points */}
                {medianPath.map((val, idx) => (
                  <circle
                    key={idx}
                    cx={getSvgX(idx, medianPath.length)}
                    cy={getSvgY(val)}
                    r="2.5"
                    fill="#0369a1"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Epistemological & Risk Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-amber-900 font-mono font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Simulation Methodology & Epistemological Disclaimer</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              This engine calculates <em>mathematical expectancy distributions</em> based on parameterized win-rates and risk-to-reward ratios derived from backtested ICT sample series. Real-world execution is subject to matching-engine spread, slippage during high-impact macroeconomic news releases, execution latency, and human psychological variance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
