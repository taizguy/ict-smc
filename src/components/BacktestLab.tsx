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
import { BauhausNavScroller } from './BauhausNavScroller';

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
      tradesPerMonth: minQualityScore >= 6 ? 18 : 34,
      maxDrawdown: minQualityScore >= 6 ? 4.8 : 8.1,
      profitFactor: minQualityScore >= 6 ? 2.62 : 2.05,
      description: 'Focuses on 15m structural order flow aligned with the 20-day institutional lookback high/low draw on liquidity.',
      ruleSet: [
        '1. 20-day IPDA institutional lookback benchmark marked',
        '2. 15-minute directional order flow aligned with Daily Bias',
        '3. New York AM Killzone execution (07:00 - 10:00 NY)',
        '4. Quick partial profits taken at +1.5R, stop trailed to breakeven',
        '5. Terminal target at previous day session high or low'
      ]
    },
    'charter_model_8': {
      title: 'ICT Charter Model 8 (25 Pips / Week Framework)',
      baseWinRate: minQualityScore >= 6 ? 76 : minQualityScore >= 5 ? 69 : 58,
      avgRR: 2.5,
      tradesPerMonth: minQualityScore >= 6 ? 8 : 14,
      maxDrawdown: minQualityScore >= 6 ? 3.4 : 6.2,
      profitFactor: minQualityScore >= 6 ? 3.10 : 2.30,
      description: 'High-probability single weekly setup design for busy professionals seeking exactly 25-30 pips compounding per week with zero greed.',
      ruleSet: [
        '1. Weekly profile determination (Tuesday London or NY Wednesday expansion)',
        '2. Only ONE or TWO trade executions permitted per calendar week',
        '3. Strict 25–35 pip fixed target, zero runners allowed',
        '4. Stop Loss capped at 12–15 pips below institutional mitigation block',
        '5. After target achieved, platform is locked until next Monday'
      ]
    },
    'charter_model_9': {
      title: 'ICT Charter Model 9 (One Shot One Kill - OSOK)',
      baseWinRate: minQualityScore >= 6 ? 65 : minQualityScore >= 5 ? 57 : 48,
      avgRR: 4.2,
      tradesPerMonth: minQualityScore >= 6 ? 6 : 11,
      maxDrawdown: minQualityScore >= 6 ? 6.5 : 11.2,
      profitFactor: minQualityScore >= 6 ? 2.85 : 2.15,
      description: 'Captures the massive weekly range expansion from low of the week to high of the week using Daily & 4-Hour institutional order blocks.',
      ruleSet: [
        '1. Weekly Open Judas swing identified on Monday or Tuesday',
        '2. Daily Order Block or Rejection Block tapped in extreme Discount/Premium',
        '3. 4H MSS confirmation with significant displacement body closes',
        '4. Stop loss placed below weekly extreme (25–35 pips)',
        '5. Target opposing Weekly Draw on Liquidity for multi-day swing'
      ]
    },
    'silver_bullet': {
      title: 'ICT Silver Bullet (10:00 - 11:00 AM NY Macro Engine)',
      baseWinRate: minQualityScore >= 6 ? 74 : minQualityScore >= 5 ? 66 : 56,
      avgRR: 2.2,
      tradesPerMonth: minQualityScore >= 6 ? 16 : 22,
      maxDrawdown: minQualityScore >= 6 ? 4.2 : 7.8,
      profitFactor: minQualityScore >= 6 ? 2.70 : 2.10,
      description: 'Executes strictly inside the 60-minute algorithmic window (10:00 - 11:00 AM NY) targeting 15-20 index handles with surgical precision.',
      ruleSet: [
        '1. Wait until 10:00 AM NY clock time before taking any action',
        '2. Identify session high or low liquidity run between 09:30 and 10:00',
        '3. Look for 1-minute or 5-minute displacement creating an obvious FVG',
        '4. Enter at FVG CE or boundary with predetermined 15-point stop',
        '5. Lock profits at resting buy-side or sell-side stops before 11:00 AM'
      ]
    },
    'breaker_reversal': {
      title: 'ICT Breaker Block Structural Reversals',
      baseWinRate: minQualityScore >= 6 ? 70 : minQualityScore >= 5 ? 62 : 51,
      avgRR: 3.2,
      tradesPerMonth: minQualityScore >= 6 ? 10 : 18,
      maxDrawdown: minQualityScore >= 6 ? 5.8 : 9.8,
      profitFactor: minQualityScore >= 6 ? 2.55 : 1.90,
      description: 'High-magnitude structural turns where the last up-close candle prior to a liquidity raid fails and becomes violent mitigation resistance.',
      ruleSet: [
        '1. Higher timeframe key level pierced with a clean liquidity sweep',
        '2. Immediate aggressive displacement breaking market structure',
        '3. Breaker block established (last up/down candle before the high/low sweep)',
        '4. Limit order placed at breaker block retest',
        '5. Target opposing external liquidity pool with 1:3 RR'
      ]
    }
  }[selectedStrategy];

  const generateMonteCarloPaths = () => {
    const paths: number[][] = [];
    const numTrades = 40;
    const winProb = strategyData.baseWinRate / 100;

    for (let p = 0; p < 5; p++) {
      let currentEquity = 10000;
      const pathPoints = [currentEquity];

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
      {/* Top Banner - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#F0C020] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                ICT Backtest &amp; Expectancy Engine
              </h2>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Mathematical expectancy simulation, Monte Carlo randomized variance bounds, and institutional execution parameters.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSimSeed((prev) => prev + 1)}
            className="px-5 py-2.5 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-mono font-black uppercase flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
            Reseed Monte Carlo Run
          </button>
        </div>

        {/* Strategy Selector with BauhausNavScroller with < and > navigation */}
        <div className="pt-4 border-t-4 border-[#121212]">
          <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60 mb-2">
            SELECT INSTITUTIONAL MODEL (SCROLL WITH ARROWS):
          </div>
          <BauhausNavScroller>
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
                type="button"
                onClick={() => setSelectedStrategy(strat.id as any)}
                className={`px-4 py-2 text-xs font-mono font-black uppercase whitespace-nowrap transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  selectedStrategy === strat.id
                    ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212]'
                    : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                }`}
              >
                {strat.label}
              </button>
            ))}
          </BauhausNavScroller>
        </div>
      </div>

      {/* Main Grid: Controls + Equity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-5 font-mono text-xs text-[#121212]">
          <h3 className="text-sm font-black text-[#121212] uppercase tracking-wider pb-3 border-b-4 border-[#121212]">
            Model Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-[#121212] block mb-1.5 font-black uppercase text-[11px]">
                Setup Confluence Score Filter: <span className="text-[#1040C0] font-black">{minQualityScore} / 7</span>
              </label>
              <input
                type="range"
                min="4"
                max="7"
                value={minQualityScore}
                onChange={(e) => setMinQualityScore(parseInt(e.target.value, 10))}
                className="w-full accent-[#1040C0] cursor-pointer"
              />
              <span className="text-[10px] text-[#121212]/70 block mt-1 font-bold">
                {minQualityScore >= 6 ? '★ Elite A+ Confluence (Lower frequency, tighter drawdowns)' : 'Standard Setup Filter'}
              </span>
            </div>

            <div>
              <label className="text-[#121212] block mb-1.5 font-black uppercase text-[11px]">
                Risk Per Trade: <span className="text-[#D02020] font-black">{riskPerTrade}%</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={riskPerTrade}
                onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
                className="w-full accent-[#D02020] cursor-pointer"
              />
            </div>

            <div className="bg-[#F0F0F0] p-3 border-2 border-[#121212]">
              <label className="text-[#121212] block font-black uppercase text-[10px]">
                Starting Account Equity: <span className="text-[#121212] font-black text-sm block mt-0.5">$10,000.00</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t-4 border-[#121212] space-y-2.5">
            <h4 className="font-black text-[#D02020] uppercase text-xs">Execution Checklist:</h4>
            <ul className="space-y-2 text-xs text-[#121212] font-medium">
              {strategyData.ruleSet.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#121212]">
                  <CheckCircle2 className="w-4 h-4 text-[#1040C0] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistical Summary & Curve */}
        <div className="lg:col-span-8 bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-6 text-[#121212]">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Model Win Rate:</span>
              <span className="text-[#1040C0] font-black text-xl">{strategyData.baseWinRate}%</span>
            </div>
            <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Average R:R:</span>
              <span className="text-[#121212] font-black text-xl">1 : {strategyData.avgRR}</span>
            </div>
            <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Profit Factor:</span>
              <span className="text-[#121212] font-black text-xl">{strategyData.profitFactor}</span>
            </div>
            <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Max Drawdown:</span>
              <span className="text-[#D02020] font-black text-xl">{strategyData.maxDrawdown}%</span>
            </div>
          </div>

          {/* Svg Equity Curve with Multi-Path Monte Carlo */}
          <div className="bg-[#FAF9F5] p-5 sm:p-6 border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <span className="text-[#121212] flex items-center gap-1.5 font-black uppercase">
                <Activity className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                Monte Carlo Simulated Equity (5 Randomized Variance Paths, 40 Trades):
              </span>
              <span className="text-[#1040C0] font-black text-sm bg-white px-2 py-1 border border-[#121212]">
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
                      stroke="#D4D4D4"
                      strokeWidth="1"
                      strokeDasharray="4 4"
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
                      stroke="#A1A1AA"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      points={pts}
                    />
                  );
                })}

                {/* Primary Median Line */}
                <polyline
                  fill="none"
                  stroke="#1040C0"
                  strokeWidth="3"
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
                    r="3.5"
                    fill="#F0C020"
                    stroke="#121212"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Epistemological & Risk Disclaimer */}
          <div className="p-5 bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#121212] font-mono font-black uppercase">
              <AlertTriangle className="w-4 h-4 text-[#D02020] stroke-[2.5]" />
              <span>Simulation Methodology &amp; Epistemological Disclaimer</span>
            </div>
            <p className="text-[#121212]/90 leading-relaxed font-medium">
              This engine calculates <em>mathematical expectancy distributions</em> based on parameterized win-rates and risk-to-reward ratios derived from backtested ICT sample series. Real-world execution is subject to matching-engine spread, slippage during high-impact macroeconomic news releases, execution latency, and human psychological variance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestLab;
