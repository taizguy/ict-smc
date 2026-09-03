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
  const [psychologyNotes, setPsychologyNotes] = useState<string>('Followed rulebook precisely without emotional interference.');

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
      time: '10:30 EDT',
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
      rRealized: result === 'WIN' ? Math.abs(rRealized) : result === 'LOSS' ? -1 : 0,
      pnl: result === 'WIN' ? Math.abs(pnl) : result === 'LOSS' ? -Math.abs(pnl) : 0,
      checklistScore,
      psychologyNotes,
      mistakesOrLearnings: checklistScore === 7 ? 'A+ Setup execution.' : 'Review missed checklist points.'
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
      {/* Top Banner & Stats */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookMarked className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display tracking-wide">ICT Trade Journal & Pre-Flight Checklist</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm">
              Log institutional setups, enforce the 7-Point ICT Quality Score, and maintain an audit of execution discipline.
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-600/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Log New Trade
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 font-mono text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Total Logged:</span>
            <span className="text-slate-900 font-bold text-base">{totalTrades} Trades</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Win Rate:</span>
            <span className="text-emerald-600 font-bold text-base">{winRate}%</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Cumulative R:</span>
            <span className="text-sky-700 font-bold text-base">+{totalR.toFixed(1)}R</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Avg ICT Score:</span>
            <span className="text-amber-700 font-bold text-base">{avgChecklistScore} / 7</span>
          </div>
        </div>
      </div>

      {/* Trade Log List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-xl font-bold ${
                    entry.direction === 'LONG'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border border-rose-300'
                  }`}
                >
                  {entry.direction}
                </span>
                <span className="font-bold text-slate-900 text-sm">{entry.asset}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{entry.modelUsed}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-500">{entry.date} {entry.time}</span>
                <span
                  className={`px-3 py-1 rounded-xl font-bold ${
                    entry.result === 'WIN'
                      ? 'bg-emerald-600 text-white'
                      : entry.result === 'LOSS'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {entry.result} ({entry.rRealized > 0 ? `+${entry.rRealized}R` : `${entry.rRealized}R`})
                </span>
              </div>
            </div>

            {/* ICT Parameters Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[11px]">HTF Bias & Draw:</span>
                <span className="font-medium">{entry.htfBias}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Liquidity Swept:</span>
                <span className="text-amber-800 font-medium">{entry.liquiditySwept}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Entry Array & Stop:</span>
                <span className="text-sky-800 font-medium">{entry.entryArray}</span>
              </div>
            </div>

            {/* Quality Score & Notes */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Quality Score:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 font-bold border border-amber-300">
                  {entry.checklistScore} / 7 Confluences
                </span>
              </div>
              <div className="text-slate-600 italic">
                "{entry.psychologyNotes}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Trade Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display">Log Institutional Trade</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Asset / Symbol:</label>
                  <input
                    type="text"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Direction:</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="LONG">LONG</option>
                    <option value="SHORT">SHORT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">ICT Execution Model:</label>
                <select
                  value={modelUsed}
                  onChange={(e) => setModelUsed(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  <option value="ICT Charter Model 1: Intraday Scalping (20-Day IPDA & OTE)">ICT Charter Model 1: Intraday Scalping (20-Day IPDA & OTE)</option>
                  <option value="ICT Charter Model 2: Weekly Range Expansion (Tuesday Low/High)">ICT Charter Model 2: Weekly Range Expansion (Tuesday Low/High)</option>
                  <option value="ICT Charter Model 3: Swing Trading (COT Hedging Program)">ICT Charter Model 3: Swing Trading (COT Hedging Program)</option>
                  <option value="ICT Charter Model 4: Position Trading & Quarterly Shifts">ICT Charter Model 4: Position Trading & Quarterly Shifts</option>
                  <option value="ICT Charter Model 5: Session Day Trading (London Judas & NY)">ICT Charter Model 5: Session Day Trading (London Judas & NY)</option>
                  <option value="ICT Charter Model 6: Universal Buyside Expansion (PD Array Matrix)">ICT Charter Model 6: Universal Buyside Expansion (PD Array Matrix)</option>
                  <option value="ICT Charter Model 7: Universal Sell-Side & Market Maker Models (MMBM/MMSM)">ICT Charter Model 7: Universal Sell-Side & Market Maker Models (MMBM/MMSM)</option>
                  <option value="ICT Charter Model 8: Precision Compounding (25 Pips/Week)">ICT Charter Model 8: Precision Compounding (25 Pips/Week)</option>
                  <option value="ICT Charter Model 9: One Shot One Kill (OSOK)">ICT Charter Model 9: One Shot One Kill (OSOK)</option>
                  <option value="ICT Charter Model 10: Dealing Ranges & 50% Equilibrium Swings">ICT Charter Model 10: Dealing Ranges & 50% Equilibrium Swings</option>
                  <option value="ICT Charter Model 11: Day Trading Daily Runs & 60m Rebalances">ICT Charter Model 11: Day Trading Daily Runs & 60m Rebalances</option>
                  <option value="ICT Charter Model 12: Scalping Order Block & FVG Synergy">ICT Charter Model 12: Scalping Order Block & FVG Synergy</option>
                  <option value="ICT Charter Model 13: 2022 Mentorship Model">ICT Charter Model 13: 2022 Mentorship Model</option>
                  <option value="ICT Silver Bullet Model (10:00 - 11:00 AM NY)">ICT Silver Bullet Model (10:00 - 11:00 AM NY)</option>
                  <option value="Unicorn Model (Breaker Block + FVG Confluence)">Unicorn Model (Breaker Block + FVG Confluence)</option>
                  <option value="Abdullah Masood 4-Pillar Daily Bias & Session Sweep">Abdullah Masood 4-Pillar Daily Bias & Session Sweep</option>
                </select>
              </div>

              {/* 7-Point ICT Checklist */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between font-bold text-sky-900">
                  <span>ICT 7-Point Quality Checklist</span>
                  <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md text-[11px]">Score: {checklistScore} / 7</span>
                </div>
                <div className="space-y-2 text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.htfBiasAligned}
                      onChange={(e) => setChecklist({ ...checklist, htfBiasAligned: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>1. HTF Bias & Draw on Liquidity clearly identified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inDiscountPremium}
                      onChange={(e) => setChecklist({ ...checklist, inDiscountPremium: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>2. Trade executes in Discount (for Buys) or Premium (for Sells)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.liquiditySweptFirst}
                      onChange={(e) => setChecklist({ ...checklist, liquiditySweptFirst: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>3. Key liquidity pool (BSL/SSL) was swept prior to displacement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.displacementWithFullBody}
                      onChange={(e) => setChecklist({ ...checklist, displacementWithFullBody: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>4. Energetic displacement with full candle bodies broke structure (MSS)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.fvgClearlyVisible}
                      onChange={(e) => setChecklist({ ...checklist, fvgClearlyVisible: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>5. Clean 3-candle Fair Value Gap (FVG) or Order Block left behind</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.invalidationStopPlaced}
                      onChange={(e) => setChecklist({ ...checklist, invalidationStopPlaced: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>6. Stop Loss is set safely beyond structural invalidation point</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inKillzoneTimeWindow}
                      onChange={(e) => setChecklist({ ...checklist, inKillzoneTimeWindow: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>7. Setup occurred inside dedicated ICT Killzone or Silver Bullet window</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Result:</label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="WIN">WIN</option>
                    <option value="LOSS">LOSS</option>
                    <option value="BE">BREAKEVEN</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">R Realized:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rRealized}
                    onChange={(e) => setRRealized(parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Psychology & Execution Notes:</label>
                <textarea
                  value={psychologyNotes}
                  onChange={(e) => setPsychologyNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold shadow-md shadow-sky-600/20"
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
