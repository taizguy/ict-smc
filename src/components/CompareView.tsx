import React, { useState, useEffect } from 'react';
import { conceptComparisons } from '../data/comparisonsData';
import { AlertTriangle, Scale, GitCompare, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { getComparisonSlug, getComparisonUrl } from '../utils/workbenchToolRoutes';

export interface CompareViewProps {
  initialComparisonSlug?: string;
  onNavigateUrl?: (url: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  initialComparisonSlug,
  onNavigateUrl
}) => {
  const resolvedComparison = initialComparisonSlug
    ? conceptComparisons.find(c => getComparisonSlug(c.id) === initialComparisonSlug || c.id === initialComparisonSlug)
    : conceptComparisons[0];

  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(
    resolvedComparison ? resolvedComparison.id : conceptComparisons[0].id
  );

  useEffect(() => {
    if (initialComparisonSlug) {
      const match = conceptComparisons.find(c => getComparisonSlug(c.id) === initialComparisonSlug || c.id === initialComparisonSlug);
      if (match && match.id !== selectedComparisonId) {
        setSelectedComparisonId(match.id);
      }
    }
  }, [initialComparisonSlug]);

  const handleSelectComparison = (id: string) => {
    setSelectedComparisonId(id);
    const targetUrl = getComparisonUrl(id);
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const comparison = conceptComparisons.find((c) => c.id === selectedComparisonId) || conceptComparisons[0];
  const comparisonSlug = getComparisonSlug(comparison.id);
  const canonicalPath = `/tools/compare/${comparisonSlug}/`;

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      <SEO
        title={`${comparison.title} — Compare Matrix | LearnSMC`}
        description={`Key Difference: ${comparison.keyDifference} Institutional side-by-side comparison of ${comparison.conceptA.name} and ${comparison.conceptB.name}.`}
        path={canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Workbench', path: '/tools/' },
          { name: 'Compare Matrix', path: '/tools/compare/' },
          { name: comparison.title, path: canonicalPath }
        ]}
      />

      {/* Top Header */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                ICT Concept Comparison Matrix
              </h2>
            </div>
            <p className="text-[#9BA1AE] text-xs sm:text-sm">
              Dissect subtle differences and eliminate the most common conceptual confusions in Smart Money trading.
            </p>
          </div>
        </div>

        {/* Comparison Selector */}
        <div className="pt-4 border-t border-white/[0.07]">
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#656B78] mb-2">
            SELECT PAIRING:
          </div>
          <BauhausNavScroller>
            {conceptComparisons.map((c) => {
              const isSelected = selectedComparisonId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectComparison(c.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase whitespace-nowrap transition-all rounded-lg border cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                      : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
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
          <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F7FA] tracking-tight">
            {comparison.title}
          </h3>
          <p className="text-xs font-mono text-[#55E6D1] uppercase bg-[#55E6D1]/10 px-3 py-1 rounded-full border border-[#55E6D1]/20 inline-block">
            {comparison.keyDifference}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <caption className="p-3">{comparison.title}: definitions and study conditions</caption>
            <thead><tr><th scope="col" className="p-3">Feature</th><th scope="col" className="p-3">{comparison.conceptA.name}</th><th scope="col" className="p-3">{comparison.conceptB.name}</th></tr></thead>
            <tbody><tr><th scope="row" className="p-3">Definition</th><td className="p-3">{comparison.conceptA.summary}</td><td className="p-3">{comparison.conceptB.summary}</td></tr><tr><th scope="row" className="p-3">Study condition</th><td className="p-3">{comparison.conceptA.idealCondition}</td><td className="p-3">{comparison.conceptB.idealCondition}</td></tr></tbody>
          </table>
        </div>
        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept A Card */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <span className="px-3 py-0.5 rounded bg-[#5865FF]/10 text-[#5865FF] font-mono text-xs font-medium border border-[#5865FF]/20 uppercase">
                {comparison.conceptA.name}
              </span>
            </div>

            <p className="text-[#9BA1AE] text-sm leading-relaxed font-normal">
              {comparison.conceptA.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono text-[#5865FF] uppercase tracking-wider">
                Key Attributes:
              </h5>
              <ul className="space-y-1.5 text-xs font-mono text-[#F5F7FA]/90">
                {comparison.conceptA.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#5865FF]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-xs font-mono bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
              <strong className="text-[#656B78] uppercase block text-[10px] mb-0.5">
                Ideal Setup Condition:
              </strong>
              <span className="text-[#F5F7FA] font-medium">{comparison.conceptA.idealCondition}</span>
            </div>
          </div>

          {/* Concept B Card */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <span className="px-3 py-0.5 rounded bg-[#55E6D1]/10 text-[#55E6D1] font-mono text-xs font-medium border border-[#55E6D1]/20 uppercase">
                {comparison.conceptB.name}
              </span>
            </div>

            <p className="text-[#9BA1AE] text-sm leading-relaxed font-normal">
              {comparison.conceptB.summary}
            </p>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono text-[#55E6D1] uppercase tracking-wider">
                Key Attributes:
              </h5>
              <ul className="space-y-1.5 text-xs font-mono text-[#F5F7FA]/90">
                {comparison.conceptB.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#55E6D1]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-xs font-mono bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
              <strong className="text-[#656B78] uppercase block text-[10px] mb-0.5">
                Ideal Setup Condition:
              </strong>
              <span className="text-[#F5F7FA] font-medium">{comparison.conceptB.idealCondition}</span>
            </div>
          </div>
        </div>

        {/* The Decisive Separation Rule Card */}
        <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase">
            <Scale className="w-4 h-4 text-[#5865FF]" />
            <span className="font-semibold">The Decisive Execution Rule</span>
          </div>

          <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 font-mono text-xs text-emerald-200 leading-relaxed">
            {comparison.decisionRule}
          </div>

          <div className="flex items-start gap-3 bg-rose-500/5 p-4 rounded-xl border border-rose-500/20 text-xs font-mono text-[#9BA1AE]">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-400 uppercase">Common Retail Mistake: </strong>
              <span className="text-[#F5F7FA]/90">{comparison.commonConfusion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Engine & Structured Data */}
      <SEO
        title="Concept Comparison Matrix — Side-by-Side Analysis | LearnSMC"
        description="Direct side-by-side contrast between overlapping concepts: Order Blocks vs Breaker Blocks, MSS vs BOS, Liquidity Sweeps vs Real Structural Breaks."
        canonicalPath="/tools/compare/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LearnSMC Concept Comparison Matrix",
          "url": "https://learnsmc.xyz/tools/compare/",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Comparative matrix contrasting overlapping and commonly confused Smart Money Concepts.",
          "educationalUse": "Technical definition disambiguation and execution rules",
          "provider": {
            "@type": "Organization",
            "name": "LearnSMC",
            "url": "https://learnsmc.xyz/"
          }
        }}
      />

      {/* Static Semantic HTML Documentation Block (Indexable by Googlebot & Search Engines) */}
      <article className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 text-[#F5F7FA]">
        <header className="border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#5865FF]">
              DOCUMENTATION // COMPARISON CODEX
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
            Institutional Concept Contrast Matrix &amp; Disambiguation Rules
          </h2>
          <p className="text-sm text-[#9BA1AE] mt-1">
            Definitive technical guide resolving the most common conceptual conflations in Inner Circle Trader and Smart Money trading.
          </p>
        </header>

        {/* Section 1: Order Block vs Breaker Block */}
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#55E6D1] flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-[#55E6D1]" />
            1. Order Block (OB) vs. Breaker Block (BB)
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            The fundamental differentiator between an Order Block and a Breaker Block is whether prior liquidity was swept before the displacement occurred. 
            An <strong>Order Block</strong> is the last opposing candle before an impulsive displacement that creates a structural continuation. 
            A <strong>Breaker Block</strong>, by contrast, is an invalidated Order Block that successfully swept opposing liquidity (creating a Turtle Soup or higher high / lower low) 
            prior to being broken violently by displacement. When retested, the Breaker functions as high-confluence support or resistance because trapped retail traders are forced to exit at breakeven.
          </p>
        </section>

        {/* Section 2: MSS vs BOS */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#5865FF] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5865FF]" />
            2. Market Structure Shift (MSS) vs. Break of Structure (BOS)
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            A <strong>Break of Structure (BOS)</strong> occurs in the direction of the existing prevailing trend, indicating institutional continuation. 
            A <strong>Market Structure Shift (MSS)</strong> occurs when price sweeps liquidity and subsequently closes beyond the swing low (in an uptrend) 
            or swing high (in a downtrend) with an institutional displacement candle. Crucially, a mere wick piercing a swing point is considered a liquidity raid, 
            whereas an MSS strictly requires a candle body close through the structural pivot.
          </p>
        </section>

        {/* Section 3: Liquidity Sweeps vs Real Structural Breaks */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#FFB020] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFB020]" />
            3. Liquidity Sweeps vs. Genuine Structural Expansion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#9BA1AE]">
            <div className="bg-[#151923] p-4 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Liquidity Sweep Signatures</strong>
              Fast wick penetration beyond old highs or lows followed by swift rejection. Candle bodies close back inside the prior range, signaling false breakout traps.
            </div>
            <div className="bg-[#151923] p-4 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Genuine Structural Break Signatures</strong>
              Substantial candle body closes well beyond the key level. Multiple consecutive candles expand away, leaving fair value gaps and no immediate retracement back inside the range.
            </div>
          </div>
        </section>
        <p className="text-sm">Page updated: <time dateTime="2026-10-16">16 October 2026</time>. <a href="/about/#editorial-policy" className="underline">Editorial policy</a>.</p>
      </article>
    </div>
  );
};

export default CompareView;
