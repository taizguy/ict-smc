import React, { useState } from 'react';
import { conceptComparisons } from '../data/comparisonsData';
import { ConceptComparison } from '../types';
import { GitCompare, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

export const CompareView: React.FC = () => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(conceptComparisons[0].id);
  const comparison = conceptComparisons.find((c) => c.id === selectedComparisonId) || conceptComparisons[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GitCompare className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white font-mono tracking-wide">ICT Concept Comparison Matrix</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Dissect subtle differences and eliminate the most common conceptual confusions in Smart Money trading.
            </p>
          </div>
        </div>

        {/* Comparison Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-slate-800/80 scrollbar-none">
          {conceptComparisons.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedComparisonId(c.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                selectedComparisonId === c.id
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {c.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Side-by-Side Comparison Container */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">{comparison.title}</h3>
          <p className="text-xs font-mono text-cyan-400">{comparison.keyDifference}</p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept A Card */}
          <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-800">
                {comparison.conceptA.name}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {comparison.conceptA.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                {comparison.conceptA.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-lg">
              <strong className="text-cyan-400">Ideal Setup:</strong> {comparison.conceptA.idealCondition}
            </div>
          </div>

          {/* Concept B Card */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 font-mono text-xs font-bold border border-amber-800">
                {comparison.conceptB.name}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {comparison.conceptB.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                {comparison.conceptB.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-lg">
              <strong className="text-amber-400">Ideal Setup:</strong> {comparison.conceptB.idealCondition}
            </div>
          </div>
        </div>

        {/* The Decisive Separation Rule Card */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span>The Decisive Execution Rule</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed">
            {comparison.decisionRule}
          </div>

          <div className="flex items-start gap-3 bg-amber-950/30 p-4 rounded-lg border border-amber-500/30 text-xs font-mono text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400">Common Retail Mistake: </strong>
              <span>{comparison.commonConfusion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
