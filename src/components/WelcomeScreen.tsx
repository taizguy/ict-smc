import { FinancialDisclaimer } from './FinancialDisclaimer';
import { chapterCount, lectureCount } from '../utils/catalogCounts';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Youtube, 
  BookOpen, 
  Wrench, 
  Clock
} from 'lucide-react';
import { AcademyStudyIllustration } from './AcademyStudyIllustration';
import { MainTabType } from './Header';
import { ScrollReveal } from './ScrollReveal';

interface WelcomeScreenProps {
  onEnterAcademy: (targetTab?: MainTabType) => void;
  onOpenMentorSpotlight: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onEnterAcademy, 
  onOpenMentorSpotlight 
}) => {
  const quotes = [
    "“Trading isn't guessing. It's reading institutional footprints candle by candle.”",
    "“Price does not move because there are more buyers than sellers. It moves because liquidity is consumed.”",
    "“Patience pays better than any intraday leverage. Wait for the liquidity sweep.”",
    "“In honor of Trader Abdullah Masood — turning algorithmic complexity into mathematical clarity.”"
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="text-ink flex flex-col justify-between relative selection:bg-brand selection:text-on-brand font-sans space-y-8 sm:space-y-10">
      
      {/* Top Ambient Sub-Header Bar */}
      <div className="w-full px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-ink/[0.08] bg-surface/80 backdrop-blur-md rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_12px_rgba(37,101,82,0.7)]" />
          <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.18em] uppercase text-ink-secondary">
            INSTITUTIONAL CURRICULUM · OPEN ACCESS CODEX
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMentorSpotlight}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.08] border border-ink/[0.08] text-xs text-ink transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span>Mentor Tribute</span>
          </button>

          <button
            type="button"
            onClick={() => onEnterAcademy('curriculum')}
            className="btn-predikt-primary text-xs py-1.5 px-3.5"
          >
            <span>Enter Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Hero Section: Predikt Enormous Typography & Layout */}
      <section className="relative z-10 w-full pt-2 sm:pt-4 space-y-12">
        <ScrollReveal y={30} duration={0.7}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Editorial Display Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.2em] uppercase text-teal font-medium">
                  00 / THE INNER CIRCLE TRADER
                </span>
                <span className="text-ink">·</span>
                <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.16em] uppercase text-ink-muted">
                  SMART MONEY CONCEPTS
                </span>
              </div>

              {/* Enormous Editorial Display Title */}
              <h1 className="predikt-hero-title">
                Read the<br />
                <span className="text-brand">market.</span>
              </h1>

              {/* Supporting Educational Description */}
              <p className="text-base sm:text-lg text-ink-secondary font-normal leading-relaxed max-w-xl">
                An institutional trading syllabus engineered with complete mathematical discipline. Master order flow, Fair Value Gaps, algorithmic displacement, and liquidity delivery across {chapterCount} codified chapters, {lectureCount} masterclasses by Trader Abdullah Masood, and an interactive 10-tool laboratory.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onEnterAcademy('curriculum')}
                  className="btn-predikt-primary text-sm px-6 py-3"
                >
                  <BookOpen className="w-4 h-4 text-canvas" />
                  <span>Explore {chapterCount} Chapters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onEnterAcademy('masood')}
                  className="btn-predikt-secondary text-sm px-5 py-3"
                >
                  <Youtube className="w-4 h-4 text-negative" />
                  <span>Masood Academy ({lectureCount})</span>
                </button>

                <button
                  onClick={() => onEnterAcademy('tools')}
                  className="btn-predikt-secondary text-sm px-5 py-3"
                >
                  <Wrench className="w-4 h-4 text-teal" />
                  <span>Trading Lab</span>
                </button>
              </div>

              {/* Dynamic Algorithmic Quote */}
              <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.06] space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 text-[0.8125rem] font-sans tabular-nums uppercase tracking-[0.16em] text-ink-muted">
                  <Clock className="w-3 h-3 text-brand" />
                  <span>ALGORITHMIC DICTUM</span>
                </div>
                <p className="text-xs sm:text-sm text-ink/80 italic font-normal">
                  {quotes[quoteIndex]}
                </p>
              </div>

            </div>

            {/* Right Column: Visual Showcase Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden space-y-5 transition-all hover:border-ink/[0.15]">
                
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-teal" />
                    <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.16em] uppercase text-ink">
                      DEDICATION &amp; TRIBUTE
                    </span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums text-brand bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20">
                    100% UNLOCKED
                  </span>
                </div>

                {/* Framed Image */}
                <div className="relative rounded-xl overflow-hidden bg-surface-muted border border-ink/[0.08] aspect-[640/570]">
                  <AcademyStudyIllustration />
                  <div className="absolute bottom-3 left-3 bg-canvas/85 backdrop-blur-md text-ink px-3 py-1 text-[0.8125rem] font-sans tabular-nums rounded-md border border-ink/[0.09] tracking-wider uppercase">
                    FOCUS // ORDERFLOW DISCIPLINE
                  </div>
                </div>

                {/* Inscription */}
                <div className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06] text-xs space-y-1">
                  <div className="font-sans tabular-nums text-[0.8125rem] text-teal tracking-[0.14em] uppercase">
                    IN HONOR OF TRADER ABDULLAH MASOOD
                  </div>
                  <p className="text-ink-secondary text-xs leading-relaxed font-normal">
                    Transforming thousands of retail traders through relentless dedication to open education, algorithmic precision, and disciplined risk psychology.
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-ink/[0.02] border border-ink/[0.06]">
                    <div className="text-2xl font-semibold text-ink font-sans tabular-nums">{chapterCount}</div>
                    <div className="text-[0.8125rem] uppercase text-ink-muted font-sans tabular-nums tracking-wider mt-0.5">Chapters</div>
                  </div>
                  <div className="p-3 rounded-xl bg-ink/[0.02] border border-ink/[0.06]">
                    <div className="text-2xl font-semibold text-negative font-sans tabular-nums">{lectureCount}</div>
                    <div className="text-[0.8125rem] uppercase text-ink-muted font-sans tabular-nums tracking-wider mt-0.5">Lectures</div>
                  </div>
                  <div className="p-3 rounded-xl bg-ink/[0.02] border border-ink/[0.06]">
                    <div className="text-2xl font-semibold text-teal font-sans tabular-nums">10</div>
                    <div className="text-[0.8125rem] uppercase text-ink-muted font-sans tabular-nums tracking-wider mt-0.5">Tools</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* 3 Pillars Section */}
        <ScrollReveal y={30} delay={0.15}>
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-2">
              <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-[0.18em] text-ink-muted">
                01 / THREE PILLARS OF MASTERY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: Textbook */}
              <div 
                onClick={() => onEnterAcademy('curriculum')}
                className="predikt-card p-6 sm:p-7 space-y-4 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center font-sans tabular-nums text-xs text-brand font-semibold">
                    01
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-wider text-ink-muted">
                    OPEN SYLLABUS
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                    The ICT Textbook
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed font-normal">
                    {chapterCount} fully codified institutional chapters spanning market structure, liquidity sweeps, Fair Value Gaps, and killzones without arbitrary locks.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-brand font-medium">
                  <span>Read Chapters</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 2: Masood Academy */}
              <div 
                onClick={() => onEnterAcademy('masood')}
                className="predikt-card p-6 sm:p-7 space-y-4 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center font-sans tabular-nums text-xs text-negative font-semibold">
                    02
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-wider text-ink-muted">
                    VIDEO SYNDICATE
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-negative transition-colors">
                    Abdullah Masood Academy
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed font-normal">
                    {lectureCount} structured video masterclasses across 6 curated playlists, the Daily Bias calculator, and the 10 Golden Execution Rules.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-negative font-medium">
                  <span>Watch Masterclasses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 3: Trading Workbench */}
              <div 
                onClick={() => onEnterAcademy('tools')}
                className="predikt-card p-6 sm:p-7 space-y-4 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center font-sans tabular-nums text-xs text-teal font-semibold">
                    03
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-wider text-ink-muted">
                    INTERACTIVE LAB
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-teal transition-colors">
                    Trading Workbench
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed font-normal">
                    Step-by-step ChartLab, Execution Simulator, Monte Carlo Backtesting Engine, 7-point Trading Journal, and Knowledge Graph.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-teal font-medium">
                  <span>Launch Laboratory</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </section>

      <section className="space-y-4 text-sm leading-relaxed text-ink-secondary">
        <h2 className="text-2xl font-semibold text-ink">What are ICT and Smart Money Concepts?</h2>
        <p>ICT stands for Inner Circle Trader, a trading education framework associated with Michael J. Huddleston. Smart Money Concepts covers chart-reading terms such as market structure, liquidity, order blocks and price imbalances. A chart pattern does not establish that a bank placed an order or that a future move is certain.</p>
        <h2 className="text-xl font-semibold text-ink">Choose a study path</h2>
        <p>Start with <a className="underline" href="/curriculum/">market foundations</a>, then study liquidity and structure before entry patterns. Read definitions in the <a className="underline" href="/tools/glossary/">glossary</a>, compare related concepts and practice on historical charts without looking ahead.</p>
<p><a className="underline" href="/articles/">Read our illustrated trading articles</a> for longer explanations of psychology, risk, market mechanics and on-chain data.</p>
        <h2 className="text-xl font-semibold text-ink">A practice example</h2>
        <p>If price moves above a previous high and returns below it, record it as a possible liquidity sweep. Do not assume a reversal follows. Note the timeframe, range and invalidation condition. Compare it with a case where price continues higher. Use historical charts or a demo account.</p>
        <p>Written by <a className="underline" href="/about/#author">Muhammad Umer Ijaz</a>. Page updated: <time dateTime="2026-10-16">16 October 2026</time>. <a className="underline" href="/about/#editorial-policy">Editorial policy</a>.</p>
        <FinancialDisclaimer />
      </section>
    </div>
  );
};

export default WelcomeScreen;
