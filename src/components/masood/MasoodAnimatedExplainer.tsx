import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, 
  TrendingUp, Shield, Clock, Zap, ArrowRight, Eye, Layers, BarChart2, Activity,
  Award, Flame, Target, DollarSign, Check, ChevronRight, ChevronLeft
} from 'lucide-react';

export type AnimationKind = 
  | 'po3_expansion' 
  | 'seek_and_destroy' 
  | 'smt_divergence' 
  | 'mmxm_curve' 
  | 'volume_imbalance' 
  | 'session_clock'
  | 'timeframe_fractal'
  | 'prop_drawdown'
  | 'gold_smc'
  | 'tape_reading'
  | 'godfather_laws';

interface MasoodAnimatedExplainerProps {
  initialType?: AnimationKind;
  onSelectType?: (type: AnimationKind) => void;
}

export const MasoodAnimatedExplainer: React.FC<MasoodAnimatedExplainerProps> = ({
  initialType = 'po3_expansion'
}) => {
  const [selectedType, setSelectedType] = useState<AnimationKind>(initialType);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [selectedSession, setSelectedSession] = useState<'asia' | 'london' | 'ny_am' | 'lunch' | 'ny_pm'>('ny_am');

  const pillsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkPillsScroll = () => {
    if (pillsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkPillsScroll();
    const el = pillsRef.current;
    if (el) {
      el.addEventListener('scroll', checkPillsScroll);
      window.addEventListener('resize', checkPillsScroll);
      return () => {
        el.removeEventListener('scroll', checkPillsScroll);
        window.removeEventListener('resize', checkPillsScroll);
      };
    }
  }, [selectedType]);

  const scrollPills = (direction: 'left' | 'right') => {
    if (pillsRef.current) {
      pillsRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const handlePillsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && pillsRef.current) {
      pillsRef.current.scrollLeft += e.deltaY;
    }
  };

  // Interactive Prop firm calculator state
  const [propAccountSize, setPropAccountSize] = useState<number>(100000);
  const [propRiskPct, setPropRiskPct] = useState<number>(0.5);
  const [propStopLossPoints, setPropStopLossPoints] = useState<number>(25);

  // Tape reading simulator state
  const [tapeStep, setTapeStep] = useState<number>(1);

  // Gold vs Nasdaq state
  const [activeGoldTab, setActiveGoldTab] = useState<'gold' | 'nasdaq'>('gold');

  // Godfather laws state
  const [selectedLaw, setSelectedLaw] = useState<number>(1);

  // Animation ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1.25;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#111114] text-white rounded-3xl border border-white/[0.08] p-5 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#FF7A00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-[#FF5722]/15 text-[#FF7A00] border border-[#FF5722]/30 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" />
              DYNAMIC ANIMATED DEMONSTRATOR
            </span>
            <span className="text-xs text-zinc-500 font-mono font-bold hidden sm:inline">
              Visual Learning Engine
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-white mt-1 font-display tracking-tight">
            {selectedType === 'po3_expansion' && 'Power of 3 (PO3): The 4 Stages of the Daily Candle'}
            {selectedType === 'seek_and_destroy' && 'Seek & Destroy: Dual-Sided Stop Hunt Trap Simulator'}
            {selectedType === 'smt_divergence' && 'SMT Divergence: Uncovering Smart Money Accumulation'}
            {selectedType === 'mmxm_curve' && 'Market Maker Buy & Sell Models (MMXM) Order Flow Curve'}
            {selectedType === 'volume_imbalance' && 'Volume Imbalance vs. Fair Value Gap (FVG) Anatomy'}
            {selectedType === 'session_clock' && 'The 24-Hour Algorithmic Cycle & ICT Killzones'}
            {selectedType === 'timeframe_fractal' && 'Top-Down Multi-Timeframe Alignment (Daily to 1M)'}
            {selectedType === 'prop_drawdown' && 'Prop Firm Risk Geometry: Drawdown Buffer & Lot Math'}
            {selectedType === 'gold_smc' && 'Gold (XAUUSD) vs. NASDAQ (NQ) SMC Liquidity Mechanics'}
            {selectedType === 'tape_reading' && 'The SMC Syndicate: 09:30 AM Live Tape Reading Drill'}
            {selectedType === 'godfather_laws' && "The Godfather's Sanctum: 10 Immutable Laws of the Operator"}
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-white/[0.08] text-zinc-200 text-xs font-mono font-bold hover:bg-zinc-800 transition-all shadow-xs cursor-pointer"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-[#18181B] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-xs cursor-pointer"
            title="Restart Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selector Pills with Chevron and Wheel Support */}
      <div className="relative flex items-center py-3 border-b border-white/[0.08] mb-4">
        <button
          type="button"
          onClick={() => scrollPills('left')}
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#18181B] border border-white/[0.08] text-zinc-400 hover:text-white shadow-xs transition-all mr-2 shrink-0 cursor-pointer ${
            canScrollLeft ? 'opacity-100 hover:bg-zinc-800' : 'opacity-25 pointer-events-none'
          }`}
          title="Scroll left"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div 
          ref={pillsRef}
          onWheel={handlePillsWheel}
          className="flex items-center gap-2 overflow-x-auto text-xs scrollbar-none scroll-smooth py-1 w-full"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[
            { id: 'po3_expansion', label: '1. PO3 Daily Candle', icon: TrendingUp },
            { id: 'seek_and_destroy', label: '2. Seek & Destroy Trap', icon: AlertTriangle },
            { id: 'smt_divergence', label: '3. SMT Divergence', icon: Zap },
            { id: 'mmxm_curve', label: '4. MMXM Curve', icon: Layers },
            { id: 'volume_imbalance', label: '5. Volume Imbalance', icon: BarChart2 },
            { id: 'session_clock', label: '6. Killzone Radar', icon: Clock },
            { id: 'timeframe_fractal', label: '7. Multi-Timeframe', icon: Eye },
            { id: 'prop_drawdown', label: '8. Prop Firm Math', icon: Shield },
            { id: 'gold_smc', label: '9. Gold vs NASDAQ', icon: Flame },
            { id: 'tape_reading', label: '10. Live Tape Reading', icon: Target },
            { id: 'godfather_laws', label: '11. Sanctum 10 Laws', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedType(tab.id as AnimationKind);
                  setProgress(0);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-md shadow-[#FF5722]/25 scale-[1.02]'
                    : 'bg-[#0A0A0D] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.08] shadow-xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollPills('right')}
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#18181B] border border-white/[0.08] text-zinc-400 hover:text-white shadow-sm transition-all ml-2 shrink-0 cursor-pointer ${
            canScrollRight ? 'opacity-100 hover:bg-zinc-800' : 'opacity-25 pointer-events-none'
          }`}
          title="Scroll right"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Animated Stage - Dark Theme */}
      <div className="relative min-h-[340px] bg-slate-950/90 rounded-2xl border border-slate-800 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
        {/* ANIMATION 1: POWER OF 3 (PO3) DAILY CANDLE */}
        {selectedType === 'po3_expansion' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            {/* Left: Interactive Animated Candle */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[260px]">
              {/* Price scale grid */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 text-[10px] font-mono text-slate-400">
                <div className="border-b border-dashed border-slate-700 pb-0.5">High of Day (Distribution) — 20,450.00</div>
                <div className="border-b border-dashed border-slate-700 pb-0.5">Cash Close — 20,420.00</div>
                <div className="border-b border-dashed border-amber-500 pb-0.5 text-amber-400 font-bold">Midnight Open (00:00 NY) — 20,300.00</div>
                <div className="border-b border-dashed border-slate-700 pb-0.5">Low of Day (Judas Dip) — 20,240.00</div>
              </div>

              {/* Dynamic Candle SVG representation */}
              <svg className="w-48 h-64 overflow-visible relative z-10" viewBox="0 0 160 220">
                {/* Upper Wick (Forms during expansion/distribution, progress > 65) */}
                {progress > 65 && (
                  <line 
                    x1="80" 
                    y1="30" 
                    x2="80" 
                    y2="55" 
                    stroke="#10b981" 
                    strokeWidth="3" 
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                )}

                {/* Lower Wick (Judas Swing, progress > 15) */}
                {progress > 15 && (
                  <line 
                    x1="80" 
                    y1="130" 
                    x2="80" 
                    y2={progress < 45 ? 130 + (progress - 15) * 2.2 : 195} 
                    stroke="#ef4444" 
                    strokeWidth="3" 
                    className="transition-all"
                  />
                )}

                {/* Candle Body */}
                {progress < 20 ? (
                  // Phase 1: Open line
                  <line x1="50" y1="130" x2="110" y2="130" stroke="#f59e0b" strokeWidth="4" />
                ) : progress < 45 ? (
                  // Phase 2: Judas dip below open (red temporary body)
                  <rect
                    x="55"
                    y="130"
                    width="50"
                    height={(progress - 20) * 2.2}
                    fill="#ef4444"
                    fillOpacity="0.85"
                    stroke="#ef4444"
                    strokeWidth="2"
                    rx="2"
                  />
                ) : (
                  // Phase 3 & 4: Bullish Green Expansion Body
                  <rect
                    x="55"
                    y={Math.max(55, 130 - (progress - 45) * 1.5)}
                    width="50"
                    height={Math.min(75, (progress - 45) * 1.5)}
                    fill="#10b981"
                    fillOpacity="0.9"
                    stroke="#10b981"
                    strokeWidth="2"
                    rx="2"
                  />
                )}

                {/* Animated Price Pulse Marker */}
                <circle
                  cx="80"
                  cy={
                    progress < 20 ? 130 :
                    progress < 45 ? 130 + (progress - 20) * 2.2 :
                    progress < 85 ? Math.max(30, 130 - (progress - 45) * 1.9) :
                    55 + (progress - 85) * 0.5
                  }
                  r="6"
                  fill="#06b6d4"
                  className="animate-ping"
                />
              </svg>

              {/* Live phase badge */}
              <div className="mt-2 text-center">
                {progress < 25 && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                    PHASE 1: 00:00 Midnight NY Open & Asian Range
                  </span>
                )}
                {progress >= 25 && progress < 50 && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40 animate-pulse">
                    PHASE 2: Judas Swing Manipulation (Dipping to Discount)
                  </span>
                )}
                {progress >= 50 && progress < 85 && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    PHASE 3: Explosive Trend Expansion (New York AM Window)
                  </span>
                )}
                {progress >= 85 && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    PHASE 4: Cash Close & High of Day Distribution
                  </span>
                )}
              </div>
            </div>

            {/* Right: Institutional Rulebook Explanation */}
            <div className="w-full md:w-1/2 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                <h4 className="font-bold text-cyan-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Abdullah Masood's Daily Candle Axiom
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "If your Daily Bias is Bullish, the algorithm's job in the morning is to create the <strong className="text-white">Low of the Day</strong> first. It dips below the 00:00 Midnight Open to bait retail sellers into panic, taps into a discount FVG, and then distributes upward toward Buy-Side Liquidity."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Retail Trap</span>
                  <span className="text-rose-400 font-bold block mt-0.5">Selling the Judas Dip</span>
                  <p className="text-[11px] text-slate-400 mt-1">Retail sees red candles at 09:30 AM and panic shorts at the absolute daily low.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Smart Money Rule</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">Buy Below Midnight Open</span>
                  <p className="text-[11px] text-slate-400 mt-1">Wait for Judas dip into Discount FVG, confirm 5M MSS, and ride expansion to PDH.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 2: SEEK AND DESTROY CHOP TRAP */}
        {selectedType === 'seek_and_destroy' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            {/* Visual simulation */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[260px]">
              <svg className="w-full h-56 overflow-visible" viewBox="0 0 320 180">
                {/* Upper Buy Stop Line (Retail Resistance) */}
                <line x1="10" y1="40" x2="310" y2="40" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
                <text x="15" y="32" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">BUY STOPS LIQUIDITY POOL (BSL)</text>

                {/* Lower Sell Stop Line (Retail Support) */}
                <line x1="10" y1="140" x2="310" y2="140" stroke="#f87171" strokeWidth="2" strokeDasharray="4 3" />
                <text x="15" y="155" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">SELL STOPS LIQUIDITY POOL (SSL)</text>

                {/* Animated whipsaw path */}
                <path
                  d="M 20 90 Q 60 90, 80 30 T 140 150 T 200 25 T 260 155 T 300 90"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2.5"
                />

                {/* Pulsing Trapper Point */}
                <circle
                  cx={
                    progress < 25 ? 20 + (progress / 25) * 60 :
                    progress < 50 ? 80 + ((progress - 25) / 25) * 60 :
                    progress < 75 ? 140 + ((progress - 50) / 25) * 60 :
                    200 + ((progress - 75) / 25) * 100
                  }
                  cy={
                    progress < 25 ? 90 - (progress / 25) * 60 :
                    progress < 50 ? 30 + ((progress - 25) / 25) * 120 :
                    progress < 75 ? 150 - ((progress - 50) / 25) * 125 :
                    25 + ((progress - 75) / 25) * 65
                  }
                  r="7"
                  fill={progress > 20 && progress < 30 ? '#38bdf8' : progress > 45 && progress < 55 ? '#f87171' : '#fbbf24'}
                  className="animate-pulse"
                />

                {/* Trap Warnings */}
                {progress > 18 && progress < 35 && (
                  <g className="animate-bounce">
                    <rect x="70" y="5" width="130" height="22" rx="4" fill="#0b111e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="75" y="20" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">SWEEP 1: Trapping Buyers!</text>
                  </g>
                )}
                {progress > 45 && progress < 60 && (
                  <g className="animate-bounce">
                    <rect x="130" y="155" width="130" height="22" rx="4" fill="#0b111e" stroke="#f87171" strokeWidth="1.5" />
                    <text x="135" y="170" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="monospace">SWEEP 2: Trapping Sellers!</text>
                  </g>
                )}
              </svg>

              <div className="w-full text-center mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                  SEEK & DESTROY PROFILE: Both Highs & Lows Purged with Zero Expansion
                </span>
              </div>
            </div>

            {/* Explanation */}
            <div className="w-full md:w-1/2 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                <h4 className="font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  How to Avoid 100% of Losses in Seek & Destroy
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "When the market whips above the morning high, triggers breakout buyers, instantly crashes through the morning low to stop them out, and then bounces right back to the midpoint—this is a <strong className="text-white">Seek and Destroy Profile</strong>. It happens before NFP or FOMC. Close your laptop immediately."
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">Early Recognition:</strong> Long wicks on 5-minute candles on both sides.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">The Institutional Mandate:</strong> Algorithm is harvesting retail liquidity before high-impact news.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">Trader Action:</strong> Zero trades. Preserving 100% of your risk capital is a major winning decision.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 3: SMT DIVERGENCE */}
        {selectedType === 'smt_divergence' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            <div className="w-full md:w-3/5 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Chart 1: US100 (NASDAQ) */}
              <div className="w-full sm:w-1/2 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xs">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="font-bold text-cyan-400">US100 (NASDAQ)</span>
                  <span className="text-rose-400 text-[10px] font-bold">Swept Low (Lower Low)</span>
                </div>
                <svg className="w-full h-36" viewBox="0 0 140 100">
                  {/* Swing Low 1 */}
                  <line x1="20" y1="60" x2="60" y2="40" stroke="#64748b" strokeWidth="2" />
                  <circle cx="20" cy="60" r="4" fill="#ef4444" />
                  <text x="15" y="75" fill="#94a3b8" fontSize="8" fontWeight="bold">Low 1</text>

                  {/* Swing Low 2 (Lower Low) */}
                  <line x1="60" y1="40" x2="110" y2="80" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="110" cy="80" r="5" fill="#ef4444" className="animate-ping" />
                  <text x="85" y="95" fill="#f87171" fontSize="8" fontWeight="bold">Lower Low 🚨</text>

                  {/* Liquidity line */}
                  <line x1="15" y1="60" x2="130" y2="60" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />
                </svg>
                <div className="text-[11px] text-slate-400 text-center font-mono">
                  Swept Sell Stops Below Low 1
                </div>
              </div>

              {/* Chart 2: US500 (ES) */}
              <div className="w-full sm:w-1/2 p-3.5 bg-slate-900/90 rounded-2xl border border-emerald-500/40 shadow-xs">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="font-bold text-emerald-400">US500 (S&P 500)</span>
                  <span className="text-emerald-400 text-[10px] font-bold">Failed (Higher Low)</span>
                </div>
                <svg className="w-full h-36" viewBox="0 0 140 100">
                  {/* Swing Low 1 */}
                  <line x1="20" y1="60" x2="60" y2="35" stroke="#64748b" strokeWidth="2" />
                  <circle cx="20" cy="60" r="4" fill="#10b981" />
                  <text x="15" y="75" fill="#94a3b8" fontSize="8" fontWeight="bold">Low 1</text>

                  {/* Swing Low 2 (Higher Low - Institutional Refusal) */}
                  <line x1="60" y1="35" x2="110" y2="50" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="110" cy="50" r="5" fill="#10b981" className="animate-pulse" />
                  <text x="80" y="45" fill="#34d399" fontSize="8" fontWeight="bold">Higher Low 🛡️</text>

                  {/* Liquidity line */}
                  <line x1="15" y1="60" x2="130" y2="60" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />
                </svg>
                <div className="text-[11px] text-emerald-400 text-center font-mono font-bold">
                  Refused to Sweep Low 1 (Accumulation)
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="w-full md:w-2/5 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40">
                <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Bullish SMT Divergence Secret
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "Correlated assets should move together. When US100 makes a Lower Low to trigger retail sell stops, but US500 FAILS to make a lower low, <strong className="text-white">Smart Money is aggressively buying US500</strong>. This crack in correlation confirms an explosive upward reversal!"
                </p>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 shadow-xs">
                <strong className="text-white block mb-1">Execution Rule:</strong>
                Buy the stronger asset (US500) or buy US100 once it reclaims its sweep low with an energetic 1-minute Fair Value Gap.
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 4: MMXM CURVE */}
        {selectedType === 'mmxm_curve' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center">
              <svg className="w-full h-52 overflow-visible" viewBox="0 0 340 180">
                {/* Original Consolidation ceiling */}
                <line x1="10" y1="40" x2="330" y2="40" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="15" y="32" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">ORIGINAL CONSOLIDATION (TARGET)</text>

                {/* The Complete MMBM Curve Path */}
                <path
                  d="M 30 45 L 60 70 L 50 60 L 90 100 L 80 90 L 130 140 L 170 160 L 210 130 L 200 138 L 240 95 L 230 105 L 280 60 L 310 40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Animated Pulse along the MMXM path */}
                <circle
                  cx={
                    progress < 30 ? 30 + (progress / 30) * 100 :
                    progress < 50 ? 130 + ((progress - 30) / 20) * 40 :
                    progress < 80 ? 170 + ((progress - 50) / 30) * 110 :
                    280 + ((progress - 80) / 20) * 30
                  }
                  cy={
                    progress < 30 ? 45 + (progress / 30) * 95 :
                    progress < 50 ? 140 + ((progress - 30) / 20) * 20 :
                    progress < 80 ? 160 - ((progress - 50) / 30) * 100 :
                    60 - ((progress - 80) / 20) * 20
                  }
                  r="6"
                  fill={progress > 45 && progress < 55 ? '#10b981' : '#38bdf8'}
                  className="animate-ping"
                />

                {/* Key annotations */}
                <text x="50" y="110" fill="#94a3b8" fontSize="9" fontWeight="bold">Sell-Side Curve</text>
                <text x="135" y="175" fill="#34d399" fontSize="9" fontWeight="bold">Smart Money Reversal (SMR)</text>
                <text x="240" y="110" fill="#38bdf8" fontSize="9" fontWeight="bold">Buy-Side Curve (Re-accumulation)</text>
              </svg>

              <div className="text-xs font-mono text-center text-slate-400 mt-2 font-bold">
                Stage: {progress < 35 ? '1. Sell-Side Engineering' : progress < 55 ? '2. Smart Money Reversal (SMR)' : progress < 85 ? '3. Low Risk Buy & Re-accumulation' : '4. Target Mitigation into Original Consolidation'}
              </div>
            </div>

            <div className="w-full md:w-2/5 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                <h4 className="font-bold text-cyan-400">The Market Maker Buy Model (MMBM)</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "Institutional algorithms do not buy in a straight line. They engineer a <strong className="text-white">Sell-Side Curve</strong> to build liquidity, execute the <strong className="text-white">Smart Money Reversal</strong> at HTF Discount, and then distribute up the <strong className="text-white">Buy-Side Curve</strong> back into the Original Consolidation."
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
                <span className="text-emerald-300 font-bold">Scout Sniper Entry:</span>
                <p className="text-slate-300 mt-1">Wait for the Smart Money Reversal. Enter on the <strong className="text-white">first re-accumulation FVG</strong> on the Buy-Side curve. Your target is 100% the Original Consolidation high.</p>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 5: VOLUME IMBALANCE VS FVG */}
        {selectedType === 'volume_imbalance' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            <div className="w-full md:w-3/5 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Type A: Standard Fair Value Gap */}
              <div className="w-full sm:w-1/2 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xs">
                <div className="text-xs font-bold text-cyan-400 mb-1">Standard Fair Value Gap (FVG)</div>
                <div className="text-[10px] text-slate-400 font-mono mb-2">3-Candle Wick Void</div>
                <svg className="w-full h-36" viewBox="0 0 120 120">
                  {/* Candle 1 */}
                  <line x1="30" y1="20" x2="30" y2="60" stroke="#10b981" strokeWidth="2" />
                  <rect x="23" y="30" width="14" height="20" fill="#10b981" />

                  {/* Candle 2 (Displacement) */}
                  <line x1="60" y1="10" x2="60" y2="105" stroke="#10b981" strokeWidth="2" />
                  <rect x="52" y="20" width="16" height="75" fill="#10b981" />

                  {/* Candle 3 */}
                  <line x1="90" y1="55" x2="90" y2="95" stroke="#10b981" strokeWidth="2" />
                  <rect x="83" y="65" width="14" height="20" fill="#10b981" />

                  {/* FVG Gap Shading between C1 Low and C3 High */}
                  <rect x="20" y="50" width="80" height="15" fill="#38bdf8" fillOpacity="0.25" stroke="#0284c7" strokeDasharray="2 2" />
                  <text x="25" y="61" fill="#38bdf8" fontSize="8" fontWeight="bold">FVG Gap</text>
                </svg>
                <div className="text-[10px] text-slate-400 text-center font-mono">
                  Gap between Candle 1 & Candle 3 wicks
                </div>
              </div>

              {/* Type B: Volume Imbalance */}
              <div className="w-full sm:w-1/2 p-3.5 bg-slate-900/90 rounded-2xl border border-amber-500/40 shadow-xs">
                <div className="text-xs font-bold text-amber-300 mb-1">Volume Imbalance (VI)</div>
                <div className="text-[10px] text-slate-400 font-mono mb-2">Body-to-Body Open Gap</div>
                <svg className="w-full h-36" viewBox="0 0 120 120">
                  {/* Candle 1 (Down) */}
                  <line x1="45" y1="20" x2="45" y2="95" stroke="#ef4444" strokeWidth="2" />
                  <rect x="38" y="25" width="14" height="35" fill="#ef4444" />

                  {/* Candle 2 (Down - Gapped Open) */}
                  <line x1="75" y1="45" x2="75" y2="110" stroke="#ef4444" strokeWidth="2" />
                  <rect x="68" y="70" width="14" height="30" fill="#ef4444" />

                  {/* Volume Imbalance Shading between C1 close (60) and C2 open (70) */}
                  <rect x="30" y="60" width="60" height="10" fill="#f59e0b" fillOpacity="0.3" stroke="#d97706" strokeDasharray="2 2" />
                  <text x="35" y="68" fill="#fbbf24" fontSize="7" fontWeight="bold">VI (Body Gap)</text>
                </svg>
                <div className="text-[10px] text-amber-300 text-center font-mono font-bold">
                  Wicks overlap, but BODIES have open gap!
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                <h4 className="font-bold text-amber-300">Abdullah Masood on Volume Imbalances</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "Most retail traders only look for 3-candle Fair Value Gaps. But when consecutive candle <strong className="text-white">wicks overlap while their real candle bodies leave an empty void</strong>, this is an institutional Volume Imbalance. The algorithm will retest this exact open-close gap with surgical precision."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 6: SESSION CLOCK & KILLZONE RADAR */}
        {selectedType === 'session_clock' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            {/* Interactive Radar Dial */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900 shadow-xl">
                {/* 24-Hour Markers */}
                <span className="absolute top-2 text-[11px] font-mono text-slate-400 font-bold">00:00 Midnight NY</span>
                <span className="absolute right-2 text-[11px] font-mono text-slate-400 font-bold">06:00</span>
                <span className="absolute bottom-2 text-[11px] font-mono text-slate-400 font-bold">12:00 Lunch</span>
                <span className="absolute left-2 text-[11px] font-mono text-slate-400 font-bold">18:00</span>

                {/* Killzone arcs */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-700 pointer-events-none" />

                {/* Center time readout */}
                <div className="text-center z-10">
                  <div className="text-2xl font-bold font-mono text-white">09:30 AM</div>
                  <div className="text-xs font-mono text-amber-400 font-bold">New York Cash Open</div>
                  <div className="text-[10px] text-slate-400 mt-1">High Volatility Injection</div>
                </div>

                {/* Animated Clock Hand */}
                <div 
                  className="absolute w-1.5 h-28 bg-gradient-to-t from-cyan-500 to-transparent origin-bottom transition-all duration-300 rounded-full"
                  style={{ transform: `rotate(${(progress / 100) * 360}deg)`, bottom: '50%' }}
                />
              </div>

              <div className="flex items-center gap-1.5 mt-3 text-xs">
                {(['asia', 'london', 'ny_am', 'lunch', 'ny_pm'] as const).map((sess) => (
                  <button
                    key={sess}
                    onClick={() => setSelectedSession(sess)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-bold transition-colors ${
                      selectedSession === sess 
                        ? 'bg-cyan-600 text-white shadow-xs' 
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {sess.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Session specific rules */}
            <div className="w-full md:w-1/2 space-y-3 text-sm">
              {selectedSession === 'asia' && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                  <span className="text-xs font-mono font-bold text-cyan-400">20:00 - 00:00 EST</span>
                  <h4 className="font-bold text-white text-base mt-1">Asian Range Accumulation</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The initial liquidity range of the day. Map the exact Asian High and Asian Low. In normal daily delivery, London or New York AM will sweep one or both boundaries before establishing the true expansion.
                  </p>
                </div>
              )}
              {selectedSession === 'london' && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                  <span className="text-xs font-mono font-bold text-rose-400">02:00 - 05:00 EST</span>
                  <h4 className="font-bold text-white text-base mt-1">London Killzone & Judas Swing</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    London produces the classic false move (Judas Swing) sweeping the Asian high or low. On a bullish day, London frequently establishes the Low of the Day for European trading.
                  </p>
                </div>
              )}
              {selectedSession === 'ny_am' && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-xs">
                  <span className="text-xs font-mono font-bold text-amber-400">08:00 - 11:30 EST</span>
                  <h4 className="font-bold text-white text-base mt-1">New York AM Prime Execution Engine</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The highest volume and cleanest algorithmic displacement of the day. Includes the 08:30 red folder releases, the 09:30 cash equities open, and the 10:00 AM Silver Bullet macro window.
                  </p>
                </div>
              )}
              {selectedSession === 'lunch' && (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40">
                  <span className="text-xs font-mono font-bold text-rose-400">12:00 - 13:15 EST</span>
                  <h4 className="font-bold text-rose-300 text-base mt-1">The Midday Retail Graveyard</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Volume drops, institutions step away for lunch, and algorithms rebalance inside tight ranges. Never enter new trades during lunch hour; this is where traders give back morning gains.
                  </p>
                </div>
              )}
              {selectedSession === 'ny_pm' && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                  <span className="text-xs font-mono font-bold text-emerald-400">13:30 - 16:00 EST</span>
                  <h4 className="font-bold text-white text-base mt-1">New York PM Session & Settlement</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Second wave of volume. 13:30 Macro triggers afternoon trend continuation or sharp reversal into the 16:00 cash close.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ANIMATION 7: TIMEFRAME FRACTALITY */}
        {selectedType === 'timeframe_fractal' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            <div className="w-full md:w-3/5 space-y-2">
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-cyan-500/40 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Step 1: Daily Chart</span>
                  <div className="text-xs font-bold text-white">Determine Draw on Liquidity (DOL)</div>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">Daily Bias</span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-amber-500/40 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Step 2: 15-Minute Chart</span>
                  <div className="text-xs font-bold text-white">Identify Session Liquidity Sweep & Judas Trap</div>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">Structural Framing</span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-emerald-500/40 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Step 3: 5M & 1M Chart</span>
                  <div className="text-xs font-bold text-white">Displacement + FVG Limit Entry during Macro Window</div>
                </div>
                <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2 py-1 rounded font-bold border border-emerald-500/40">Sniper Entry</span>
              </div>
            </div>

            <div className="w-full md:w-2/5 space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                <h4 className="font-bold text-cyan-400">Why Top-Down Alignment Matters</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  "If you only look at the 1-minute chart, every candle looks like a massive breakout or breakdown. But when you step back and see that the 1-minute dip is simply testing the <strong className="text-white">Daily 50% Consequent Encroachment</strong>, you execute with total confidence while retail is terrified."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 8: PROP FIRM DRAWDOWN & LOT GEOMETRY */}
        {selectedType === 'prop_drawdown' && (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 my-auto">
            {/* Left: Interactive Risk & Lot Calculator */}
            <div className="w-full lg:w-3/5 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 font-bold block mb-1">ACCOUNT SIZE</label>
                  <select 
                    value={propAccountSize} 
                    onChange={(e) => setPropAccountSize(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg p-2 focus:outline-none focus:border-cyan-500 font-mono shadow-2xs"
                  >
                    <option value={50000}>$50,000</option>
                    <option value={100000}>$100,000</option>
                    <option value={200000}>$200,000</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 font-bold block mb-1">RISK % PER TRADE</label>
                  <div className="flex gap-1">
                    {[0.5, 1.0, 2.0].map(r => (
                      <button
                        key={r}
                        onClick={() => setPropRiskPct(r)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          propRiskPct === r 
                            ? (r === 0.5 ? 'bg-emerald-600 text-white font-bold shadow-xs' : r === 1.0 ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'bg-rose-600 text-white font-bold shadow-xs')
                            : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 font-bold block mb-1">STOP LOSS (PTS)</label>
                  <select 
                    value={propStopLossPoints} 
                    onChange={(e) => setPropStopLossPoints(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg p-2 focus:outline-none focus:border-cyan-500 font-mono shadow-2xs"
                  >
                    <option value={15}>15 Points</option>
                    <option value={25}>25 Points (Std)</option>
                    <option value={40}>40 Points (Wide)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Math Box */}
              {(() => {
                const dollarRisk = propAccountSize * (propRiskPct / 100);
                const mnqContracts = Math.max(1, Math.floor(dollarRisk / (propStopLossPoints * 2)));
                const nqContracts = (dollarRisk / (propStopLossPoints * 20)).toFixed(1);
                const maxLossesBefore4Pct = Math.floor(4 / propRiskPct);

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">MAX $ RISK</span>
                      <div className="text-base font-bold text-white font-mono mt-0.5">${dollarRisk.toLocaleString()}</div>
                      <span className="text-[10px] text-slate-400 font-mono">Per single setup</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/40 shadow-xs">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">MNQ MICROS ($2/PT)</span>
                      <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{mnqContracts} Contracts</div>
                      <span className="text-[10px] text-emerald-500 font-mono">Ideal precision size</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-500/40 shadow-xs">
                      <span className="text-[10px] font-mono text-amber-300 font-bold">NQ MINIS ($20/PT)</span>
                      <div className="text-base font-bold text-amber-300 font-mono mt-0.5">{nqContracts} Minis</div>
                      <span className="text-[10px] text-amber-400 font-mono">1 Mini = 10 Micros</span>
                    </div>

                    <div className={`p-3 rounded-xl border shadow-xs ${
                      propRiskPct <= 0.5 ? 'border-emerald-500/40 bg-emerald-950/40' : propRiskPct <= 1.0 ? 'border-amber-500/40 bg-amber-950/40' : 'border-rose-500/40 bg-rose-950/40'
                    }`}>
                      <span className="text-[10px] font-mono font-bold text-slate-300">4% DD SURVIVAL</span>
                      <div className={`text-base font-bold font-mono mt-0.5 ${
                        propRiskPct <= 0.5 ? 'text-emerald-400' : propRiskPct <= 1.0 ? 'text-amber-300' : 'text-rose-400 animate-pulse'
                      }`}>
                        {maxLossesBefore4Pct} Losses
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {propRiskPct <= 0.5 ? 'Institutional safe' : propRiskPct <= 1.0 ? 'Moderate buffer' : 'High blowup risk!'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Drawdown Comparison Bar */}
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Survival Margin Against 4% Daily Drawdown:</span>
                  <span className="text-emerald-400 font-bold">
                    {propRiskPct === 0.5 ? '8 Trade Buffer (98% Survival)' : propRiskPct === 1.0 ? '4 Trade Buffer (65% Survival)' : '2 Trade Buffer (15% Survival - Gambler Trap)'}
                  </span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      propRiskPct === 0.5 ? 'w-full bg-emerald-500' : propRiskPct === 1.0 ? 'w-1/2 bg-amber-500' : 'w-1/4 bg-rose-500'
                    }`} 
                  />
                </div>
              </div>
            </div>

            {/* Right: Master Rule Insight */}
            <div className="w-full lg:w-2/5 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <h4>Abdullah Masood’s Golden Prop Rule</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Prop firms know that 95% of retail traders risk 2% per trade. If you experience a normal 2-trade losing streak in the morning, you hit the 4% daily trailing drawdown and lose a $100k account in 45 minutes. When you risk <strong className="text-white">0.5% per trade</strong>, you can withstand 8 bad trades and live to conquer the market tomorrow."
                </p>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs space-y-1">
                <div className="font-bold text-emerald-300">The 2-Loss Daily Circuit Breaker:</div>
                <div className="text-slate-300">
                  If you take 2 losses in a single morning session (-1.0% total), your trading terminal must be locked. No exceptions.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 9: GOLD (XAUUSD) VS NASDAQ SMC DYNAMICS */}
        {selectedType === 'gold_smc' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveGoldTab('gold')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeGoldTab === 'gold' 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  Gold (XAUUSD) SMC Profile
                </button>
                <button
                  onClick={() => setActiveGoldTab('nasdaq')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeGoldTab === 'nasdaq' 
                      ? 'bg-cyan-600 text-white shadow-md font-black' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  NASDAQ (US100) Profile
                </button>
              </div>

              {activeGoldTab === 'gold' ? (
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-amber-500/40 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300">XAUUSD ALGORITHMIC TRAITS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">Deep Asian Sweeps</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">Asian High/Low Sweeps:</strong> Gold sweeps Asian range by 25–60 pips before the real move, hunting retail early breakout stops.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">London Fix Volume (10:30 AM NY):</strong> Major bullion institutions reprice physical allocations, creating rapid displacement FVGs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">DXY Inverse Mirror:</strong> When DXY taps a Daily Bearish FVG, Gold unleashes violent bullish expansion.</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-cyan-500/40 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">US100 (NQ) ALGORITHMIC TRAITS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">09:30 AM Cash Open</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">Opening Bell Auction:</strong> 09:30 AM delivers massive institutional quotation. Judas Swing tests 00:00 Midnight Open.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">Silver Bullet Window (10:00 - 11:00 AM):</strong> Cleanest 1M/5M FVGs for swift 20-50 handle runs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white">ES / NQ SMT Divergence:</strong> Failure of one index to confirm highs/lows signals immediate institutional turn.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xs space-y-3">
              <h4 className="font-bold text-white text-sm">Masood’s Cross-Asset Specialist Insight</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Do not trade Gold and NASDAQ with the same mindset. In NASDAQ, 1 point is $2 on Micros and $20 on Minis. In Gold, 1 standard lot moves $100 per dollar change. Furthermore, Gold loves to pierce liquidity levels deeper than retail expects. Always wait for the 5-minute candle to close back inside the range before taking your limit order."
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Gold Spread Buffer: 25-40 Cents</span>
                <span className="text-emerald-400 font-bold">Recommended: 0.5% Risk</span>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 10: SYNDICATE 09:30 AM LIVE TAPE READING DRILL */}
        {selectedType === 'tape_reading' && (
          <div className="space-y-4 my-auto">
            {/* Step Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { step: 1, time: '08:30 - 09:25 AM', label: '1. Pre-Market Mapping' },
                { step: 2, time: '09:30 - 09:35 AM', label: '2. Opening Bell Auction' },
                { step: 3, time: '09:35 - 09:45 AM', label: '3. Judas Swing Fakeout' },
                { step: 4, time: '09:45 - 10:00 AM', label: '4. MSS & Displacement' },
                { step: 5, time: '10:00 - 10:45 AM', label: '5. Silver Bullet TP' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setTapeStep(s.step)}
                  className={`p-2.5 rounded-xl text-left transition-all ${
                    tapeStep === s.step 
                      ? 'bg-cyan-600 text-white shadow-md border border-cyan-500 font-bold' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className={`text-[10px] font-mono ${tapeStep === s.step ? 'text-cyan-100' : 'text-slate-500'}`}>{s.time}</div>
                  <div className="text-xs font-bold mt-0.5">{s.label}</div>
                </button>
              ))}
            </div>

            {/* Visual Tape Display */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-3/5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold">
                    TAPE PHASE {tapeStep} OF 5
                  </span>
                  <span className="text-xs text-slate-300 font-mono font-medium">
                    {tapeStep === 1 && 'Pre-Market Preparation Routine'}
                    {tapeStep === 2 && 'Hands Off Keyboard! Initial Price Auction'}
                    {tapeStep === 3 && 'The Trap: Retail Breakout Traders Get Trapped'}
                    {tapeStep === 4 && 'The Shift: Energetic Candle Body Displacement'}
                    {tapeStep === 5 && 'Execution Window: Rebalance to Target'}
                  </span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {tapeStep === 1 && 'Mark 00:00 NY Midnight Open with horizontal ray. Identify Previous Day High (PDH) and Low (PDL). Mark Pre-Market High (PMH) and Low (PML). Check ForexFactory for red-folder news events.'}
                  {tapeStep === 2 && 'The 09:30 AM cash open releases pent-up algorithmic orders. SPREADS WIDEN. DO NOT TRADE. Let the first 5-minute candle establish its boundaries without gambling.'}
                  {tapeStep === 3 && 'If daily bias is bullish, algorithms plunge price DOWN below Midnight Open to sweep Sell-Side Liquidity (PML). Retail panics and sells. Smart money absorbs all selling at a discount.'}
                  {tapeStep === 4 && 'Price violently rejects the low. A large 1-minute or 5-minute candle closes with full body authority above the recent swing high, leaving a pristine Fair Value Gap (FVG).'}
                  {tapeStep === 5 && 'Place limit order at the FVG Consequent Encroachment (50%). Stop loss placed below the Judas swing low. Target resting Buy-Side Liquidity (PDH). Lock profit and shut down terminal.'}
                </div>
              </div>

              <div className="w-full md:w-2/5 p-3.5 bg-amber-950/40 rounded-xl border border-amber-500/40 space-y-2 text-xs">
                <div className="font-bold text-amber-300 font-mono flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  Masood’s Live Desk Commentary
                </div>
                <p className="text-slate-300 italic">
                  {tapeStep === 1 && '"A pilot does not board a plane without a pre-flight checklist. 80% of your trading success happens between 08:00 and 09:20 AM before you ever take a trade."'}
                  {tapeStep === 2 && '"The retail beginner clicks market order at 09:30:02 AM. They are donating their money to the algorithmic clearing houses. Be patient."'}
                  {tapeStep === 3 && '"See that dip below Midnight Open? That is not weakness. That is institutional discount accumulation. Watch the tape closely."'}
                  {tapeStep === 4 && '"Displacement confirmed! Candle body closed above the swing high. Now we wait for price to return to our FVG like a magnet."'}
                  {tapeStep === 5 && '"Target reached at Previous Day High. One clean trade, +2.8R banked. Shut down TradingView and go live your life. Discipline is freedom."'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ANIMATION 11: THE GODFATHER'S 10 IMMUTABLE LAWS */}
        {selectedType === 'godfather_laws' && (
          <div className="space-y-4 my-auto">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { num: 1, title: 'Capital Preservation' },
                { num: 2, title: 'HTF Draw on Liquidity' },
                { num: 3, title: '00:00 Midnight Open' },
                { num: 4, title: 'Killzone Exclusivity' },
                { num: 5, title: 'Max 2 Trades / Day' },
                { num: 6, title: 'Never Average Down' },
                { num: 7, title: 'Pay Yourself Weekly' },
                { num: 8, title: 'Log Every Error' },
                { num: 9, title: 'Fitness & Sleep' },
                { num: 10, title: 'Market Is Here Tomorrow' }
              ].map(law => (
                <button
                  key={law.num}
                  onClick={() => setSelectedLaw(law.num)}
                  className={`p-2 rounded-xl text-left transition-all ${
                    selectedLaw === law.num 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-mono block opacity-75">LAW #{law.num}</span>
                  <span className="text-xs leading-tight font-medium line-clamp-1">{law.title}</span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-amber-500/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-3/5 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300">
                    SANCTUM CHARTER — LAW #{selectedLaw}
                  </span>
                </div>

                <div className="text-sm font-bold text-white">
                  {selectedLaw === 1 && 'Capital Preservation is the Highest Directive'}
                  {selectedLaw === 2 && 'Never Trade Without a Higher-Timeframe Draw on Liquidity'}
                  {selectedLaw === 3 && '00:00 NY Midnight Open is the Institutional Fair Price Benchmark'}
                  {selectedLaw === 4 && 'Execute Strictly Within Proven Killzone Macro Windows'}
                  {selectedLaw === 5 && 'Enforce the 2-Trade Maximum Session Limit'}
                  {selectedLaw === 6 && 'Never Average Down on a Losing Position'}
                  {selectedLaw === 7 && 'Regularly Withdraw Prop Firm Profits'}
                  {selectedLaw === 8 && 'Log Every Mistake with Relentless Honesty'}
                  {selectedLaw === 9 && 'Physical Health and Sleep Sovereignty Come Before Charts'}
                  {selectedLaw === 10 && 'The Market Will Always Be Here Tomorrow; Never Rush'}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLaw === 1 && 'Trading is an intellectual game of risk defense. Without defense, offense is suicidal. Your balance is your weapon; protect every dollar like your life depends on it.'}
                  {selectedLaw === 2 && 'If you cannot identify where the algorithm wants to go on the 1-Hour or 4-Hour chart, you have zero business taking a 1-minute entry. Direction precedes timing.'}
                  {selectedLaw === 3 && 'Midnight Open divides the day into Premium and Discount. Institutional algorithms accumulate longs below Midnight Open and distribute shorts above it.'}
                  {selectedLaw === 4 && 'Outside of London Open (02:00-05:00 NY) and New York AM (08:30-11:00 NY), algorithmic participation drops. Trading lunch or off-hours is a gambler’s trap.'}
                  {selectedLaw === 5 && 'Over-trading destroys edge. Two high-probability trades per day are more than enough to compound multi-generational wealth. Win or lose, walk away.'}
                  {selectedLaw === 6 && 'Adding to a losing position is pure ego denial. When your thesis is invalidated, take the predetermined 0.5% stop immediately with zero emotional protest.'}
                  {selectedLaw === 7 && 'Prop firm numbers on a screen are not real until they hit your personal bank account. Request bi-weekly payouts and build your tangible physical assets.'}
                  {selectedLaw === 8 && 'An unreviewed trade provides zero compounding. A trading journal is the mirror that reveals your subconscious leaks. Review every setup weekly.'}
                  {selectedLaw === 9 && 'Mental sharpness requires high sleep quality, sunlight, and cardiovascular health. If your body is exhausted, your chart reading will be clouded by phantom setups.'}
                  {selectedLaw === 10 && 'There are 250 trading days every year. Missing a move today means nothing. Patience is the ultimate institutional superpower.'}
                </p>
              </div>

              <div className="w-full md:w-2/5 p-4 bg-amber-950/40 rounded-xl border border-amber-500/40 space-y-2 text-xs">
                <div className="text-amber-300 font-mono font-bold">The Operator’s Affirmation:</div>
                <p className="text-slate-200 italic leading-relaxed">
                  "I am an institutional market operator. I execute without fear, accept losses without anger, and close my desk without greed. My edge is patience and discipline."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar Bottom */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Animation Progress: {Math.round(progress)}%</span>
          <div className="w-48 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>Looping</span>
        </div>
      </div>
    </div>
  );
};
