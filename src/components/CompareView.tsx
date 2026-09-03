import React, { useState } from 'react';
import { conceptComparisons } from '../data/comparisonsData';
import { ConceptComparison } from '../types';
import { GitCompare, AlertTriangle, Scale } from 'lucide-react';

export const CompareView: React.FC = () => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(conceptComparisons[0].id);
  const comparison = conceptComparisons.find((c) => c.id === selectedComparisonId) || conceptComparisons[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GitCompare className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display tracking-wide">ICT Concept Comparison Matrix</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm">
              Dissect subtle differences and eliminate the most common conceptual confusions in Smart Money trading.
            </p>
          </div>
        </div>

        {/* Comparison Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-slate-200 scrollbar-none">
          {conceptComparisons.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedComparisonId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                selectedComparisonId === c.id
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold shadow-md shadow-sky-600/20'
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">{comparison.title}</h3>
          <p className="text-xs font-mono text-sky-800 font-semibold">{comparison.keyDifference}</p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept A Card */}
          <div className="bg-white border-2 border-sky-300 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 font-mono text-xs font-bold border border-sky-300">
                {comparison.conceptA.name}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed font-sans">
              {comparison.conceptA.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-700">
                {comparison.conceptA.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 mt-0.5 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs font-mono text-slate-700 bg-sky-50/60 p-3.5 rounded-2xl border border-sky-200">
              <strong className="text-sky-900">Ideal Setup:</strong> {comparison.conceptA.idealCondition}
            </div>
          </div>

          {/* Concept B Card */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-300">
                {comparison.conceptB.name}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed font-sans">
              {comparison.conceptB.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Key Attributes:</h5>
              <ul className="space-y-1.5 text-xs font-mono text-slate-700">
                {comparison.conceptB.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs font-mono text-slate-700 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
              <strong className="text-amber-900">Ideal Setup:</strong> {comparison.conceptB.idealCondition}
            </div>
          </div>
        </div>

        {/* The Decisive Separation Rule Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-mono text-sm font-bold">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span>The Decisive Execution Rule</span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 font-mono text-xs text-emerald-950 leading-relaxed">
            {comparison.decisionRule}
          </div>

          <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-300 text-xs font-mono text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900">Common Retail Mistake: </strong>
              <span>{comparison.commonConfusion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
