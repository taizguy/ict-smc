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
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookMarked className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white font-mono tracking-wide">ICT Trade Journal & Pre-Flight Checklist</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Log institutional setups, enforce the 7-Point ICT Quality Score, and maintain an audit of execution discipline.
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            Log New Trade
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Total Logged:</span>
            <span className="text-white font-bold text-base">{totalTrades} Trades</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Win Rate:</span>
            <span className="text-emerald-400 font-bold text-base">{winRate}%</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Cumulative R:</span>
            <span className="text-cyan-400 font-bold text-base">+{totalR.toFixed(1)}R</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Avg ICT Score:</span>
            <span className="text-amber-400 font-bold text-base">{avgChecklistScore} / 7</span>
          </div>
        </div>
      </div>

      {/* Trade Log List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3 font-mono text-xs hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    entry.direction === 'LONG'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {entry.direction}
                </span>
                <span className="font-bold text-white text-sm">{entry.asset}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{entry.modelUsed}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">{entry.date} {entry.time}</span>
                <span
                  className={`px-2.5 py-0.5 rounded font-bold ${
                    entry.result === 'WIN'
                      ? 'bg-emerald-500 text-slate-950'
                      : entry.result === 'LOSS'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {entry.result} ({entry.rRealized > 0 ? `+${entry.rRealized}R` : `${entry.rRealized}R`})
                </span>
              </div>
            </div>

            {/* ICT Parameters Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[11px]">HTF Bias & Draw:</span>
                <span>{entry.htfBias}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Liquidity Swept:</span>
                <span className="text-amber-300">{entry.liquiditySwept}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Entry Array & Stop:</span>
                <span className="text-cyan-300">{entry.entryArray}</span>
              </div>
            </div>

            {/* Quality Score & Notes */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Quality Score:</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-bold border border-slate-800">
                  {entry.checklistScore} / 7 Confluences
                </span>
              </div>
              <div className="text-slate-400 italic">
                "{entry.psychologyNotes}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Trade Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Log Institutional Trade</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Asset / Symbol:</label>
                  <input
                    type="text"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Direction:</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="LONG">LONG</option>
                    <option value="SHORT">SHORT</option>
                  </select>
                </div>
              </div>

              {/* 7-Point ICT Checklist */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-bold text-cyan-400">
                  <span>ICT 7-Point Quality Checklist</span>
                  <span>Score: {checklistScore} / 7</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.htfBiasAligned}
                      onChange={(e) => setChecklist({ ...checklist, htfBiasAligned: e.target.checked })}
                    />
                    <span>1. HTF Bias & Draw on Liquidity clearly identified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inDiscountPremium}
                      onChange={(e) => setChecklist({ ...checklist, inDiscountPremium: e.target.checked })}
                    />
                    <span>2. Trade executes in Discount (for Buys) or Premium (for Sells)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.liquiditySweptFirst}
                      onChange={(e) => setChecklist({ ...checklist, liquiditySweptFirst: e.target.checked })}
                    />
                    <span>3. Key liquidity pool (BSL/SSL) was swept prior to displacement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.displacementWithFullBody}
                      onChange={(e) => setChecklist({ ...checklist, displacementWithFullBody: e.target.checked })}
                    />
                    <span>4. Energetic displacement with full candle bodies broke structure (MSS)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.fvgClearlyVisible}
                      onChange={(e) => setChecklist({ ...checklist, fvgClearlyVisible: e.target.checked })}
                    />
                    <span>5. Clean 3-candle Fair Value Gap (FVG) or Order Block left behind</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.invalidationStopPlaced}
                      onChange={(e) => setChecklist({ ...checklist, invalidationStopPlaced: e.target.checked })}
                    />
                    <span>6. Stop Loss is set safely beyond structural invalidation point</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inKillzoneTimeWindow}
                      onChange={(e) => setChecklist({ ...checklist, inKillzoneTimeWindow: e.target.checked })}
                    />
                    <span>7. Setup occurred inside dedicated ICT Killzone or Silver Bullet window</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Result:</label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="WIN">WIN</option>
                    <option value="LOSS">LOSS</option>
                    <option value="BE">BREAKEVEN</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">R Realized:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rRealized}
                    onChange={(e) => setRRealized(parseFloat(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Psychology & Execution Notes:</label>
                <textarea
                  value={psychologyNotes}
                  onChange={(e) => setPsychologyNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
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
