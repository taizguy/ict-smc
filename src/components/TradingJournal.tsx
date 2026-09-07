import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { BookMarked, Plus, CheckSquare, BarChart2, ShieldAlert, Award, Calendar, ArrowUpRight, ArrowDownRight, Trash2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TradingJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'j-1',
      date: '2026-03-24',
      time: '10:15 EDT',
      asset: 'NQ_F',
      timeframe: '1m / 5m',
      direction: 'LONG',
      modelUsed: 'Silver Bullet (10 AM Window)',
      htfBias: 'Daily Bullish towards 18,650 BSL',
      drawOnLiquidity: 'Previous Day High (PDH)',
      liquiditySwept: 'Asian Low (SSL)',
      entryArray: '5m Bullish FVG (50% CE)',
      stopPlacement: 'Below Sweep Low (18,480.00)',
      target: 'PDH (18,580.00)',
      riskRewardRatio: 3.2,
      result: 'WIN',
      rRealized: 3.2,
      pnl: 1600,
      checklistScore: 7,
      psychologyNotes: 'Executed without hesitation at 10:15 AM candle retest of FVG. Did not look at PnL during trade.',
      mistakesOrLearnings: 'Exited full position at PDH target cleanly without leaving runners unnecessarily.'
    }
  ]);

  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  // Form State
  const [asset, setAsset] = useState<string>('BTC/USDT');
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [modelUsed, setModelUsed] = useState<string>('ICT 2022 Model');
  const [htfBias, setHtfBias] = useState<string>('Daily Bullish towards BSL');
  const [drawOnLiquidity, setDrawOnLiquidity] = useState<string>('Previous Day High (PDH)');
  const [liquiditySwept, setLiquiditySwept] = useState<string>('Sell Side Liquidity (SSL)');
  const [entryArray, setEntryArray] = useState<string>('5m Bullish FVG');
  const [stopPlacement, setStopPlacement] = useState<string>('Below Sweep Low');
  const [target, setTarget] = useState<string>('PDH High');
  const [rRealized, setRRealized] = useState<number>(2.5);
  const [pnl, setPnl] = useState<number>(1250);
  const [result, setResult] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [psychologyNotes, setPsychologyNotes] = useState<string>('Followed rules with zero emotional impulse.');

  // 7-Point Quality Checklist State
  const [checklist, setChecklist] = useState({
    htfBiasAligned: true,
    inDiscountPremium: true,
    liquiditySweptFirst: true,
    displacementWithFullBody: true,
    fvgClearlyVisible: true,
    invalidationStopPlaced: true,
    inKillzoneTimeWindow: true
  });

  const checklistScore = Object.values(checklist).filter(Boolean).length;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: '10:00 EDT',
      asset,
      timeframe: '5m',
      direction,
      modelUsed,
      htfBias,
      drawOnLiquidity,
      liquiditySwept,
      entryArray,
      stopPlacement,
      target,
      riskRewardRatio: Math.abs(rRealized),
      result,
      rRealized: result === 'WIN' ? rRealized : result === 'LOSS' ? -1.0 : 0,
      pnl: result === 'WIN' ? pnl : result === 'LOSS' ? -pnl : 0,
      checklistScore,
      psychologyNotes,
      mistakesOrLearnings: checklistScore < 6 ? 'Setup was executed with less than 6 confluences.' : 'Execution strictly followed plan.'
    };

    setEntries([newEntry, ...entries]);
    setShowNewModal(false);
    if (result === 'WIN') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Performance calculations
  const totalTrades = entries.length;
  const wins = entries.filter((e) => e.result === 'WIN').length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const totalR = entries.reduce((acc, curr) => acc + curr.rRealized, 0);
  const avgChecklistScore = totalTrades > 0
    ? Math.round((entries.reduce((acc, curr) => acc + curr.checklistScore, 0) / totalTrades) * 10) / 10
    : 7;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#D02020] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                ICT Trade Journal &amp; Pre-Flight Checklist
              </h2>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Log institutional setups, enforce the 7-Point ICT Quality Score, and maintain an audit of execution discipline.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            className="px-5 py-2.5 bg-[#D02020] hover:bg-red-700 text-white font-mono text-xs font-black uppercase flex items-center gap-2 transition-all border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] shrink-0 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Log New Trade
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-4 border-[#121212] font-mono text-xs">
          <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Total Logged:</span>
            <span className="text-[#121212] font-black text-lg">{totalTrades} Trades</span>
          </div>
          <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Win Rate:</span>
            <span className="text-[#1040C0] font-black text-lg">{winRate}%</span>
          </div>
          <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Cumulative R:</span>
            <span className="text-[#121212] font-black text-lg">+{totalR.toFixed(1)}R</span>
          </div>
          <div className="bg-[#F0F0F0] p-4 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <span className="text-[#121212]/60 block text-[10px] uppercase font-black tracking-wider">Avg ICT Score:</span>
            <span className="text-[#D02020] font-black text-lg">{avgChecklistScore} / 7</span>
          </div>
        </div>
      </div>

      {/* Trade Log List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-6 space-y-4 font-mono text-xs text-[#121212]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-4 border-[#121212]">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-3 py-1 font-black uppercase text-[11px] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] ${
                    entry.direction === 'LONG'
                      ? 'bg-[#1040C0] text-white'
                      : 'bg-[#D02020] text-white'
                  }`}
                >
                  {entry.direction}
                </span>
                <span className="font-black text-[#121212] text-sm uppercase">{entry.asset}</span>
                <span className="text-[#121212]/40 font-bold">•</span>
                <span className="text-[#121212] font-bold uppercase">{entry.modelUsed}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#121212]/60 font-bold">{entry.date} {entry.time}</span>
                <span
                  className={`px-3 py-1 font-black uppercase text-xs border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] ${
                    entry.result === 'WIN'
                      ? 'bg-[#F0C020] text-[#121212]'
                      : entry.result === 'LOSS'
                      ? 'bg-[#D02020] text-white'
                      : 'bg-[#F0F0F0] text-[#121212]'
                  }`}
                >
                  {entry.result} ({entry.rRealized > 0 ? `+${entry.rRealized}R` : `${entry.rRealized}R`})
                </span>
              </div>
            </div>

            {/* ICT Parameters Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#F0F0F0] p-3.5 border-2 border-[#121212]">
                <span className="text-[#121212]/60 block text-[10px] uppercase font-black">HTF Bias &amp; Draw:</span>
                <span className="font-bold text-[#121212] text-xs mt-0.5 block">{entry.htfBias}</span>
              </div>
              <div className="bg-[#F0F0F0] p-3.5 border-2 border-[#121212]">
                <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Liquidity Swept:</span>
                <span className="text-[#1040C0] font-bold text-xs mt-0.5 block">{entry.liquiditySwept}</span>
              </div>
              <div className="bg-[#F0F0F0] p-3.5 border-2 border-[#121212]">
                <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Entry Array &amp; Stop:</span>
                <span className="text-[#D02020] font-bold text-xs mt-0.5 block">{entry.entryArray}</span>
              </div>
            </div>

            {/* Quality Score & Notes */}
            <div className="pt-3 border-t-2 border-[#121212] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-[#121212]/60 font-black uppercase">Quality Score:</span>
                <span className="px-2.5 py-0.5 bg-[#FFF9C4] text-[#121212] font-black uppercase border border-[#121212]">
                  {entry.checklistScore} / 7 Confluences
                </span>
              </div>
              <div className="text-[#121212] italic font-medium">
                "{entry.psychologyNotes}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Trade Modal - Bauhaus Constructivist Dialog */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#121212] shadow-[12px_12px_0px_0px_#121212] p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 font-mono text-xs text-[#121212]">
            <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212]">
              <h3 className="text-base font-black uppercase text-[#121212]">Log Institutional Trade</h3>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="w-8 h-8 bg-white hover:bg-[#D02020] hover:text-white text-[#121212] border-2 border-[#121212] font-black flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">Asset / Symbol:</label>
                  <input
                    type="text"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">Direction:</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
                  >
                    <option value="LONG">LONG</option>
                    <option value="SHORT">SHORT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">ICT Execution Model:</label>
                <select
                  value={modelUsed}
                  onChange={(e) => setModelUsed(e.target.value)}
                  className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
                >
                  <option value="ICT Charter Model 1: Intraday Scalping (20-Day IPDA & OTE)">ICT Charter Model 1: Intraday Scalping (20-Day IPDA &amp; OTE)</option>
                  <option value="ICT Charter Model 2: Weekly Range Expansion (Tuesday Low/High)">ICT Charter Model 2: Weekly Range Expansion (Tuesday Low/High)</option>
                  <option value="ICT Charter Model 3: Swing Trading (COT Hedging Program)">ICT Charter Model 3: Swing Trading (COT Hedging Program)</option>
                  <option value="ICT Charter Model 4: Position Trading & Quarterly Shifts">ICT Charter Model 4: Position Trading &amp; Quarterly Shifts</option>
                  <option value="ICT Charter Model 5: Session Day Trading (London Judas & NY)">ICT Charter Model 5: Session Day Trading (London Judas &amp; NY)</option>
                  <option value="ICT Charter Model 6: Universal Buyside Expansion (PD Array Matrix)">ICT Charter Model 6: Universal Buyside Expansion (PD Array Matrix)</option>
                  <option value="ICT Charter Model 7: Universal Sell-Side & Market Maker Models (MMBM/MMSM)">ICT Charter Model 7: Universal Sell-Side &amp; Market Maker Models (MMBM/MMSM)</option>
                  <option value="ICT Charter Model 8: Precision Compounding (25 Pips/Week)">ICT Charter Model 8: Precision Compounding (25 Pips/Week)</option>
                  <option value="ICT Charter Model 9: One Shot One Kill (OSOK)">ICT Charter Model 9: One Shot One Kill (OSOK)</option>
                  <option value="ICT Charter Model 10: Dealing Ranges & 50% Equilibrium Swings">ICT Charter Model 10: Dealing Ranges &amp; 50% Equilibrium Swings</option>
                  <option value="ICT Charter Model 11: Day Trading Daily Runs & 60m Rebalances">ICT Charter Model 11: Day Trading Daily Runs &amp; 60m Rebalances</option>
                  <option value="ICT Charter Model 12: Scalping Order Block & FVG Synergy">ICT Charter Model 12: Scalping Order Block &amp; FVG Synergy</option>
                  <option value="ICT Charter Model 13: 2022 Mentorship Model">ICT Charter Model 13: 2022 Mentorship Model</option>
                  <option value="ICT Silver Bullet Model (10:00 - 11:00 AM NY)">ICT Silver Bullet Model (10:00 - 11:00 AM NY)</option>
                  <option value="Unicorn Model (Breaker Block + FVG Confluence)">Unicorn Model (Breaker Block + FVG Confluence)</option>
                  <option value="Abdullah Masood 4-Pillar Daily Bias & Session Sweep">Abdullah Masood 4-Pillar Daily Bias &amp; Session Sweep</option>
                </select>
              </div>

              {/* 7-Point ICT Checklist */}
              <div className="bg-[#FFF9C4] p-5 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-3">
                <div className="flex items-center justify-between font-black uppercase text-[#121212]">
                  <span>ICT 7-Point Quality Checklist</span>
                  <span className="bg-[#D02020] text-white border border-[#121212] px-3 py-0.5 text-[11px] font-mono">
                    Score: {checklistScore} / 7
                  </span>
                </div>
                <div className="space-y-2 text-[#121212] font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.htfBiasAligned}
                      onChange={(e) => setChecklist({ ...checklist, htfBiasAligned: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>1. HTF Bias &amp; Draw on Liquidity clearly identified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inDiscountPremium}
                      onChange={(e) => setChecklist({ ...checklist, inDiscountPremium: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>2. Trade executes in Discount (for Buys) or Premium (for Sells)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.liquiditySweptFirst}
                      onChange={(e) => setChecklist({ ...checklist, liquiditySweptFirst: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>3. Key liquidity pool (BSL/SSL) was swept prior to displacement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.displacementWithFullBody}
                      onChange={(e) => setChecklist({ ...checklist, displacementWithFullBody: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>4. Energetic displacement with full candle bodies broke structure (MSS)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.fvgClearlyVisible}
                      onChange={(e) => setChecklist({ ...checklist, fvgClearlyVisible: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>5. Clean 3-candle Fair Value Gap (FVG) or Order Block left behind</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.invalidationStopPlaced}
                      onChange={(e) => setChecklist({ ...checklist, invalidationStopPlaced: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>6. Stop Loss is set safely beyond structural invalidation point</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inKillzoneTimeWindow}
                      onChange={(e) => setChecklist({ ...checklist, inKillzoneTimeWindow: e.target.checked })}
                      className="accent-[#1040C0] w-4 h-4"
                    />
                    <span>7. Setup occurred inside dedicated ICT Killzone or Silver Bullet window</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">Result:</label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value as any)}
                    className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
                  >
                    <option value="WIN">WIN</option>
                    <option value="LOSS">LOSS</option>
                    <option value="BE">BREAKEVEN</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">R Realized:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rRealized}
                    onChange={(e) => setRRealized(parseFloat(e.target.value))}
                    className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#121212] block mb-1 font-black uppercase text-[11px]">Psychology &amp; Execution Notes:</label>
                <textarea
                  value={psychologyNotes}
                  onChange={(e) => setPsychologyNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[#F0F0F0] border-2 border-[#121212] p-3 text-[#121212] font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#121212]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-4 border-[#121212]">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-5 py-3 bg-white hover:bg-[#F0C020] text-[#121212] font-mono text-xs font-black uppercase border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D02020] hover:bg-red-700 text-white font-mono text-xs font-black uppercase border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingJournal;
