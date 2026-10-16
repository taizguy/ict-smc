import React from 'react';
import { 
  BookOpen, Youtube, BarChart2, PlayCircle, Shield, ArrowRight, 
  Sparkles, CheckCircle2, TrendingUp, Zap, Cpu, Award, BookMarked, 
  Compass, Layers, Clock, Flame, ChevronRight, GraduationCap, LayoutGrid
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';

interface SheryiansHomeProps {
  onNavigate: (tab: 'home' | 'textbook' | 'masood' | 'chartlab' | 'simulator' | 'journal' | 'backtest' | 'concepts' | 'compare' | 'graph' | 'dashboard') => void;
  onSelectChapter: (chapterId: number) => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight: () => void;
}

export const SheryiansHome: React.FC<SheryiansHomeProps> = ({
  onNavigate,
  onSelectChapter,
  onOpenSearch,
  onOpenMentorSpotlight
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fadeIn">
      {/* 1. SHERYIANS HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-5xl mx-auto space-y-8">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] bg-gradient-to-r from-rust/15 via-amber/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Sheryians Signature Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-ink/[0.08] shadow-lg hover:border-rust/40 transition-colors cursor-pointer group">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rust opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rust"></span>
          </span>
          <span className="text-ink-secondary font-mono text-xs font-bold tracking-wider uppercase">
            COHORT 3.0 • <span className="text-rust">JOB READY INSTITUTIONAL OPERATOR</span>
          </span>
          <span className="text-ink-muted">|</span>
          <span className="text-[11px] font-mono text-ink-muted group-hover:text-ink transition-colors">
            EDITION 2026
          </span>
        </div>

        {/* Sheryians Signature Bold Headline */}
        <div className="space-y-5">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-ink font-display tracking-tight leading-[1.04]">
            WE ONLY TEACH WHAT <br className="hidden sm:block" />
            WE ARE <span className="bg-gradient-to-r from-rust via-amber to-[#FFAB00] bg-clip-text text-transparent">REALLY REALLY GOOD AT.</span>
          </h1>

          <p className="text-ink-muted text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-sans font-normal">
            Eliminate retail speculation and lagging indicators. Master algorithmic liquidity sweeps, Fair Value Gaps, Daily PO3 cycles, and the complete methodology taught by Inner Circle Trader (ICT) & Trader Abdullah Masood.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => onNavigate('textbook')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rust to-amber hover:from-rust hover:to-amber text-on-brand font-mono font-bold text-sm flex items-center gap-3 shadow-[0_10px_35px_rgba(255,87,34,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer group on-accent"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore 31 Modules</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('chartlab')}
            className="px-7 py-4 rounded-full bg-surface hover:bg-surface-raised text-ink-secondary hover:text-ink border border-ink/[0.08] hover:border-rust/50 font-mono font-bold text-sm flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <BarChart2 className="w-4 h-4 text-rust" />
            <span>Launch Chart Lab</span>
          </button>

          <button
            onClick={onOpenMentorSpotlight}
            className="px-6 py-4 rounded-full bg-rose-50/30 hover:bg-rose-50/40 text-rose-700 border border-rose-500/30 font-mono font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Youtube className="w-4 h-4 text-rose-700" />
            <span>Masood Mentorship Tribute</span>
          </button>
        </div>

        {/* Social Proof & Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-10 max-w-4xl mx-auto">
          <div className="p-4 rounded-3xl bg-surface border border-ink/[0.06] text-center space-y-1 shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-ink font-display">31</div>
            <div className="text-xs font-mono text-ink-muted font-bold uppercase tracking-wider">Textbook Chapters</div>
            <div className="text-[11px] text-ink-muted">From Level 0 to Masterclass</div>
          </div>

          <div className="p-4 rounded-3xl bg-surface border border-ink/[0.06] text-center space-y-1 shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-rose-700 font-display">52</div>
            <div className="text-xs font-mono text-ink-muted font-bold uppercase tracking-wider">Video Masterclasses</div>
            <div className="text-[11px] text-ink-muted">Trader Abdullah Masood Series</div>
          </div>

          <div className="p-4 rounded-3xl bg-surface border border-ink/[0.06] text-center space-y-1 shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-rust font-display">10-Step</div>
            <div className="text-xs font-mono text-ink-muted font-bold uppercase tracking-wider">Execution Pipeline</div>
            <div className="text-[11px] text-ink-muted">Institutional Delivery Rules</div>
          </div>

          <div className="p-4 rounded-3xl bg-surface border border-ink/[0.06] text-center space-y-1 shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-display">100%</div>
            <div className="text-xs font-mono text-ink-muted font-bold uppercase tracking-wider">Free Access</div>
            <div className="text-[11px] text-ink-muted">Zero Upsells, Pure Knowledge</div>
          </div>
        </div>
      </section>

      {/* 2. SHERYIANS COURSES & TRACKS SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-ink/[0.08] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust/15 text-amber text-xs font-mono font-bold border border-rust/30">
              <GraduationCap className="w-3.5 h-3.5 text-rust" />
              <span>COURSES & BOOTCAMPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-ink font-display tracking-tight">
              Featured Pathways & Interactive Labs
            </h2>
            <p className="text-ink-muted text-sm max-w-2xl">
              Select a specialized learning track or interactive workbench. Every program includes real market mechanics, step-by-step documentation, and live simulation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('textbook')}
            className="text-xs font-mono font-bold text-rust hover:text-amber flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>View Full Syllabus</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Sheryians Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* COURSE 1: THE CORE BIBLE */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-rust/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50/80 text-emerald-700 border border-emerald-500/40 text-[11px] font-mono font-bold">
                  FLAGSHIP CURRICULUM
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">31 Chapters</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-amber transition-colors leading-tight">
                  3.0 Job-Ready Institutional Cohort: Complete ICT Bible
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  The definitive 31-chapter curriculum spanning from foundation mechanics to institutional order flow, fair value gaps, liquidity pools, daily PO3 cycles, and algorithmic delivery.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Liquidity Pools', 'Fair Value Gaps', 'Order Blocks', 'PO3 Expansion', 'Market Structure'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">Level 0 to 5</span> • Free Access
              </div>
              <button
                onClick={() => onNavigate('textbook')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rust to-amber text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rust/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Enter Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* COURSE 2: MASOOD ACADEMY */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-rose-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-50/80 text-rose-700 border border-rose-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
                  <Youtube className="w-3 h-3 text-rose-700" />
                  <span>MASTERCLASS SERIES</span>
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">52 Lectures</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-rose-700 transition-colors leading-tight">
                  Trader Abdullah Masood Academy & Tape Reading
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  52 dedicated lectures covering daily bias rules, SMT divergence, Asian range raids, prop firm drawdown math, and the 10 immutable laws of the institutional operator.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Tape Reading', 'SMT Divergence', 'Killzones', 'Prop Firm Math', 'Gold vs NASDAQ'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">52 Videos</span> • Interactive Demos
              </div>
              <button
                onClick={() => onNavigate('masood')}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Watch Lectures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* COURSE 3: INTERACTIVE CHART LAB */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-rust/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-50/80 text-cyan-700 border border-cyan-500/40 text-[11px] font-mono font-bold">
                  CANVAS WORKBENCH
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">Interactive</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-cyan-700 transition-colors leading-tight">
                  Algorithmic Chart Lab & Candlestick Canvas
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  Interactive charting laboratory with custom candlestick simulations, liquidity sweep detection, fair value gap annotations, and institutional delivery tracking.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Candlestick Engine', 'FVG Zones', 'Displacement', 'MSS Sequence', 'PO3 Visualizer'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">Live Simulation</span> • Hands-On
              </div>
              <button
                onClick={() => onNavigate('chartlab')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rust to-amber text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rust/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Launch Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* COURSE 4: TRADE SIMULATOR & JOURNAL */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50/80 text-emerald-700 border border-emerald-500/40 text-[11px] font-mono font-bold">
                  SIMULATION SUITE
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">Real-Time</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-emerald-700 transition-colors leading-tight">
                  Trade Simulator & Institutional Journal
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  Simulate live tick executions, verify 7-point pre-flight checklist criteria, calculate risk-to-reward R-multiples, and maintain your trading journal logs.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Live Execution', 'R-Multiples', 'Pre-Flight Checklist', 'Journal Logs', 'Performance Stats'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">Risk-Free</span> • 7-Point Audit
              </div>
              <button
                onClick={() => onNavigate('simulator')}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Start Simulating</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* COURSE 5: QUANTITATIVE BACKTEST LAB */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-50/80 text-amber-700 border border-amber-500/40 text-[11px] font-mono font-bold">
                  PROBABILITY MATH
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">Monte Carlo</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-amber-700 transition-colors leading-tight">
                  Quantitative Backtest & Expectancy Lab
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  Run 100-trade randomized Monte Carlo distribution curves, calculate mathematical expectancy, max drawdown variance, and verify ICT setup edge.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Monte Carlo Curves', 'Drawdown Probability', 'Edge Expectancy', 'Kelly Criterion', 'Parameter Stress'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">Statistical Edge</span> • Stress Test
              </div>
              <button
                onClick={() => onNavigate('backtest')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rust to-amber text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rust/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Run Backtest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* COURSE 6: ENCYCLOPEDIA & MATRIX */}
          <div className="bg-surface hover:bg-surface border border-ink/[0.08] hover:border-purple-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50/80 text-purple-700 border border-purple-500/40 text-[11px] font-mono font-bold">
                  KNOWLEDGE REPOSITORY
                </span>
                <span className="text-xs font-mono text-ink-muted font-bold">30+ Concepts</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-ink font-display group-hover:text-purple-700 transition-colors leading-tight">
                  Encyclopedia & Cross-Concept Matrix
                </h3>
                <p className="text-ink-muted text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                  Interactive reference library of every core ICT concept: FVGs, Order Blocks, Liquidity Sweeps, Breaker Blocks, and side-by-side comparative matrices.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Concept Matrix', 'Knowledge Graph', 'Search Engine', 'Institutional Rules', 'Mistake Audits'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface text-ink-secondary text-[10px] font-mono border border-ink/[0.05]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/[0.06] mt-6 flex items-center justify-between">
              <div className="text-xs font-mono text-ink-muted">
                <span className="text-ink font-bold">Glossary & Matrix</span> • Quick Reference
              </div>
              <button
                onClick={() => onNavigate('concepts')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rust to-amber text-on-brand font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rust/20 hover:scale-105 transition-transform cursor-pointer on-accent"
              >
                <span>Browse Concepts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHERYIANS SIGNATURE BENTO GRID */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust/15 text-amber text-xs font-mono font-bold border border-rust/30">
            <Zap className="w-3.5 h-3.5 text-rust" />
            <span>HOW WE ARE BUILT DIFFERENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink font-display tracking-tight">
            Designed for Real Institutional Competency
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Box 1 */}
          <div className="md:col-span-7 bg-surface border border-ink/[0.08] rounded-3xl p-7 sm:p-8 relative overflow-hidden space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rust/15 text-amber flex items-center justify-center border border-rust/30">
              <Cpu className="w-5 h-5 text-rust" />
            </div>
            <h3 className="text-2xl font-black text-ink font-display">
              Algorithmic Delivery: Not Human Speculation
            </h3>
            <p className="text-ink-muted text-sm font-sans leading-relaxed">
              Markets are driven by the Interbank Price Delivery Algorithm (IPDA). Prices move to engineer liquidity above old highs and below old lows, before rebalancing into Fair Value Gaps. We teach you to identify the computer program, not the emotion.
            </p>
            <div className="pt-2 flex items-center gap-3 font-mono text-xs text-rust">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 100% Algorithmic Logic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Zero Retail Lag
              </span>
            </div>
          </div>

          {/* Bento Box 2 */}
          <div className="md:col-span-5 bg-surface border border-ink/[0.08] rounded-3xl p-7 sm:p-8 relative overflow-hidden space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-700 flex items-center justify-center border border-rose-500/30">
              <Flame className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="text-2xl font-black text-ink font-display">
              Depth Before Deadlines
            </h3>
            <p className="text-ink-muted text-sm font-sans leading-relaxed">
              Trader Abdullah Masood’s golden principle: Never rush a trade or a lesson. Understand the 'why' behind the wick, the daily bias open, and the macro delivery time.
            </p>
            <button
              onClick={onOpenMentorSpotlight}
              className="text-xs font-mono font-bold text-rose-700 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore Masood's Sanctum Laws</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bento Box 3 */}
          <div className="md:col-span-5 bg-surface border border-ink/[0.08] rounded-3xl p-7 sm:p-8 relative overflow-hidden space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-700 flex items-center justify-center border border-cyan-500/30">
              <Clock className="w-5 h-5 text-cyan-700" />
            </div>
            <h3 className="text-2xl font-black text-ink font-display">
              Time is More Important Than Price
            </h3>
            <p className="text-ink-muted text-sm font-sans leading-relaxed">
              Price moves because of the clock. London Open (02:00–05:00 AM NY), New York Open (07:00–10:00 AM NY), and Macro Windows dictate when institutional orders execute.
            </p>
          </div>

          {/* Bento Box 4 */}
          <div className="md:col-span-7 bg-surface border border-ink/[0.08] rounded-3xl p-7 sm:p-8 relative overflow-hidden space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center border border-amber-500/30">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-2xl font-black text-ink font-display">
              Rigorous Certification & Mastery Exams
            </h3>
            <p className="text-ink-muted text-sm font-sans leading-relaxed">
              Test your knowledge across 6 progressive examination levels. Verify your recognition of liquidity runs, market structure shifts, and daily candle power of three mechanics.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-full bg-surface hover:bg-surface-raised text-ink-secondary border border-ink/[0.08] text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Take Level 1 Certification Exam</span>
              <ArrowRight className="w-3.5 h-3.5 text-rust" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CHAPTER CURRICULUM PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-rust uppercase tracking-wider">
              CURRICULUM SYLLABUS DIRECTORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-ink font-display">
              31 Chapters at a Glance
            </h3>
          </div>

          <button
            onClick={() => onNavigate('textbook')}
            className="px-4 py-2 rounded-full bg-surface hover:bg-surface-raised text-ink-secondary hover:text-ink border border-ink/[0.08] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Reader</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {textbookChapters.slice(0, 9).map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => {
                onSelectChapter(chapter.id);
                onNavigate('textbook');
              }}
              className="p-4 rounded-2xl bg-surface hover:bg-surface border border-ink/[0.06] hover:border-rust/50 transition-all cursor-pointer group flex items-start gap-3.5 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-surface text-rust font-mono font-extrabold text-xs flex items-center justify-center border border-ink/[0.06] shrink-0 group-hover:bg-rust group-hover:text-on-brand transition-colors">
                {chapter.id}
              </div>
              <div className="min-w-0 space-y-1 flex-1">
                <div className="text-[10px] font-mono text-ink-muted font-bold uppercase truncate">
                  {chapter.part.split('-')[0]}
                </div>
                <div className="text-xs font-bold text-ink-secondary group-hover:text-ink truncate font-sans">
                  {chapter.title}
                </div>
                <div className="text-[11px] text-ink-muted font-sans line-clamp-1">
                  {chapter.summary[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('textbook')}
            className="px-6 py-2.5 rounded-full bg-surface hover:bg-surface-raised text-ink-secondary hover:text-ink border border-ink/[0.08] font-mono text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>View All 31 Chapters in Syllabus Grid</span>
            <ArrowRight className="w-3.5 h-3.5 text-rust" />
          </button>
        </div>
      </section>

      {/* 5. SHERYIANS FOOTER BANNER */}
      <section className="rounded-3xl bg-gradient-to-b from-surface via-surface to-surface border border-ink/[0.08] p-8 sm:p-12 text-center relative overflow-hidden space-y-6">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-rust/15 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-rust/15 text-amber text-xs font-mono font-extrabold border border-rust/30">
            START YOUR COHORT JOURNEY
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-ink font-display tracking-tight">
            Stop Guessing. Start Operating.
          </h2>

          <p className="text-ink-muted text-sm sm:text-base font-sans leading-relaxed">
            Gain immediate free access to the entire 31-chapter textbook, Abdullah Masood's masterclasses, interactive chart labs, and institutional simulations.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('textbook')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rust to-amber hover:from-rust hover:to-amber text-on-brand font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rust/30 hover:scale-105 transition-all cursor-pointer on-accent"
            >
              <BookOpen className="w-4 h-4" />
              <span>Begin With Chapter 1</span>
            </button>

            <button
              onClick={() => onNavigate('masood')}
              className="px-7 py-3.5 rounded-full bg-surface hover:bg-surface-raised text-ink-secondary border border-ink/[0.08] font-mono font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4 text-rose-700" />
              <span>Masood's Academy</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
