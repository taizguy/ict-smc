import React, { useState } from 'react';
import { conceptComparisons } from '../data/comparisonsData';
import { ConceptComparison } from '../types';
import { GitCompare, AlertTriangle, Scale } from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

export const CompareView: React.FC = () => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(conceptComparisons[0].id);
  const comparison = conceptComparisons.find((c) => c.id === selectedComparisonId) || conceptComparisons[0];

  return (
    <div className="space-y-6">
      {/* Top Header - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#D02020] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                ICT Concept Comparison Matrix
              </h2>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Dissect subtle differences and eliminate the most common conceptual confusions in Smart Money trading.
            </p>
          </div>
        </div>

        {/* Comparison Selector with BauhausNavScroller */}
        <div className="pt-4 border-t-4 border-[#121212]">
          <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60 mb-2">
            SELECT PAIRING (SCROLL WITH ARROWS):
          </div>
          <BauhausNavScroller>
            {conceptComparisons.map((c) => {
              const isSelected = selectedComparisonId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedComparisonId(c.id)}
                  className={`px-4 py-2 text-xs font-mono font-black uppercase whitespace-nowrap transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    isSelected
                      ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  {c.title.split(':')[0]}
                </button>
              );
            })}
          </BauhausNavScroller>
        </div>
      </div>

      {/* Main Side-by-Side Comparison Container */}
      <div className="space-y-6">
        <div className="text-center space-y-2 py-1">
          <h3 className="text-xl sm:text-2xl font-black text-[#121212] uppercase tracking-tight">
            {comparison.title}
          </h3>
          <p className="text-xs font-mono text-[#121212] font-black uppercase bg-[#F0C020] px-4 py-1.5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] inline-block">
            {comparison.keyDifference}
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept A Card */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
            <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212]">
              <span className="px-3.5 py-1 bg-[#1040C0] text-white font-mono text-xs font-black uppercase border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                {comparison.conceptA.name}
              </span>
            </div>

            <p className="text-[#121212] text-sm leading-relaxed font-medium">
              {comparison.conceptA.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-black text-[#D02020] uppercase tracking-wider">
                Key Attributes:
              </h5>
              <ul className="space-y-1.5 text-xs font-mono text-[#121212]">
                {comparison.conceptA.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-medium">
                    <span className="text-[#1040C0] font-black">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t-2 border-[#121212] text-xs font-mono text-[#121212] bg-[#F0F0F0] p-4 border-2 border-[#121212]">
              <strong className="text-[#121212] font-black uppercase block text-[10px] text-[#121212]/70 mb-0.5">
                Ideal Setup Condition:
              </strong>
              <span className="font-bold">{comparison.conceptA.idealCondition}</span>
            </div>
          </div>

          {/* Concept B Card */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
            <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212]">
              <span className="px-3.5 py-1 bg-[#F0C020] text-[#121212] font-mono text-xs font-black uppercase border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                {comparison.conceptB.name}
              </span>
            </div>

            <p className="text-[#121212] text-sm leading-relaxed font-medium">
              {comparison.conceptB.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-black text-[#1040C0] uppercase tracking-wider">
                Key Attributes:
              </h5>
              <ul className="space-y-1.5 text-xs font-mono text-[#121212]">
                {comparison.conceptB.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-medium">
                    <span className="text-[#D02020] font-black">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t-2 border-[#121212] text-xs font-mono text-[#121212] bg-[#F0F0F0] p-4 border-2 border-[#121212]">
              <strong className="text-[#121212] font-black uppercase block text-[10px] text-[#121212]/70 mb-0.5">
                Ideal Setup Condition:
              </strong>
              <span className="font-bold">{comparison.conceptB.idealCondition}</span>
            </div>
          </div>
        </div>

        {/* The Decisive Separation Rule Card */}
        <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
          <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
            <Scale className="w-5 h-5 text-[#1040C0] stroke-[2.5]" />
            <span>The Decisive Execution Rule</span>
          </div>

          <div className="bg-[#DCFCE7] p-5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] font-mono text-xs text-[#121212] font-bold leading-relaxed">
            {comparison.decisionRule}
          </div>

          <div className="flex items-start gap-3 bg-[#FFF9C4] p-5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-mono text-[#121212]">
            <AlertTriangle className="w-4 h-4 text-[#D02020] shrink-0 mt-0.5 stroke-[2.5]" />
            <div>
              <strong className="text-[#D02020] font-black uppercase">Common Retail Mistake: </strong>
              <span className="font-bold">{comparison.commonConfusion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView;
