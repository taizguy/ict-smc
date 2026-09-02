import React, { useState } from 'react';
import { Play, RotateCcw, Eye, Info, CheckCircle2, ChevronRight, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface InteractiveDiagramProps {
  type?: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  diagramType?: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  title?: string;
  isInteractive?: boolean;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type: rawType, diagramType, title, isInteractive = true }) => {
  const type = rawType || diagramType || 'liquidity_sweep';
  const [step, setStep] = useState<number>(0);
  const [cePercentage, setCePercentage] = useState<number>(50);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const handleReset = () => setStep(0);
  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : 0));

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 my-6 backdrop-blur-md shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-cyan-400 font-semibold">
            {type.replace('_', ' ')} • Interactive Diagram
          </span>
          {title && <span className="text-slate-400 text-xs hidden sm:inline">| {title}</span>}
        </div>

        {isInteractive && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-2.5 py-1 text-xs rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700/50"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              {showExplanation ? 'Hide Notes' : 'Show Notes'}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50"
              title="Reset Animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1 text-xs font-medium rounded bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white flex items-center gap-1.5 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5" />
              Step {step + 1} / 4
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full h-72 sm:h-80 bg-slate-900/60 rounded-lg my-4 overflow-hidden border border-slate-800/50 flex items-center justify-center p-2 select-none">
        {/* Background Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Dynamic Diagram Views based on Type */}
        {type === 'liquidity_sweep' && (
          <svg viewBox="0 0 600 300" className="w-full h-full max-h-72">
            {/* Old High Line (BSL) */}
            <line x1="50" y1="100" x2="550" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <text x="60" y="90" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">
              PREVIOUS HIGH / EQUAL HIGHS (BSL POOL)
            </text>

            {/* Candle 1 (Approach) */}
            <line x1="120" y1="130" x2="120" y2="210" stroke="#10b981" strokeWidth="2" />
            <rect x="112" y="145" width="16" height="50" fill="#10b981" rx="2" />

            {/* Candle 2 (Approach 2) */}
            <line x1="180" y1="110" x2="180" y2="190" stroke="#10b981" strokeWidth="2" />
            <rect x="172" y="125" width="16" height="45" fill="#10b981" rx="2" />

            {/* Candle 3 (The Liquidity Sweep Wick) */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-30'}>
              <line x1="260" y1="65" x2="260" y2="175" stroke="#ef4444" strokeWidth="2" />
              <rect x="252" y="105" width="16" height="55" fill="#ef4444" rx="2" />
              {/* Highlight the sweep zone */}
              <circle cx="260" cy="65" r="5" fill="#ef4444" className="animate-ping" />
              <rect x="235" y="70" width="50" height="28" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" rx="4" />
              <text x="240" y="88" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">SWEEP</text>
            </g>

            {/* Candle 4 & 5 (Violent Bearish Displacement & MSS) */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-10'}>
              <line x1="330" y1="115" x2="330" y2="240" stroke="#ef4444" strokeWidth="2" />
              <rect x="320" y="120" width="20" height="100" fill="#ef4444" rx="2" />

              <line x1="400" y1="210" x2="400" y2="280" stroke="#ef4444" strokeWidth="2" />
              <rect x="390" y="215" width="20" height="55" fill="#ef4444" rx="2" />

              {/* MSS Break Line */}
              <line x1="170" y1="190" x2="440" y2="190" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
              <text x="340" y="182" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                BEARISH MSS (PROTECTED LOW BROKEN)
              </text>
            </g>

            {/* Candle 6 & 7 (Retracement into FVG & Continuation) */}
            <g className={step >= 3 ? 'opacity-100 transition-opacity duration-500' : 'opacity-10'}>
              {/* FVG Box */}
              <rect x="320" y="145" width="160" height="40" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" rx="4" />
              <text x="410" y="168" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">BEARISH FVG</text>

              {/* Retracement Candle */}
              <line x1="470" y1="140" x2="470" y2="230" stroke="#10b981" strokeWidth="2" />
              <rect x="462" y="155" width="16" height="55" fill="#10b981" rx="2" />

              {/* Rejection Arrow */}
              <path d="M 490 170 L 530 250" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
              <text x="490" y="275" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold">EXPANSION TO SSL ↓</text>
            </g>
          </svg>
        )}

        {type === 'fvg_formation' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
              {/* Three Candles */}
              {/* Candle 1 (Bullish Base) */}
              <line x1="150" y1="180" x2="150" y2="260" stroke="#10b981" strokeWidth="2" />
              <rect x="138" y="195" width="24" height="45" fill="#10b981" rx="2" />
              <text x="125" y="275" fill="#94a3b8" fontSize="11" fontFamily="monospace">Candle 1</text>
              {/* Candle 1 High Line */}
              <line x1="150" y1="180" x2="450" y2="180" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="455" y="184" fill="#38bdf8" fontSize="10" fontFamily="monospace">Candle 1 High ($100,000)</text>

              {/* Candle 2 (Displacement Candle) */}
              <line x1="250" y1="60" x2="250" y2="220" stroke="#10b981" strokeWidth="2.5" />
              <rect x="236" y="70" width="28" height="135" fill="#10b981" rx="2" />
              <text x="225" y="275" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">Candle 2 (Displacement)</text>

              {/* Candle 3 (Continuation with Gap) */}
              <line x1="350" y1="40" x2="350" y2="120" stroke="#10b981" strokeWidth="2" />
              <rect x="338" y="55" width="24" height="45" fill="#10b981" rx="2" />
              <text x="325" y="275" fill="#94a3b8" fontSize="11" fontFamily="monospace">Candle 3</text>
              {/* Candle 3 Low Line */}
              <line x1="150" y1="120" x2="450" y2="120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="455" y="124" fill="#38bdf8" fontSize="10" fontFamily="monospace">Candle 3 Low ($101,200)</text>

              {/* FVG Box Zone */}
              <rect x="150" y="120" width="200" height="60" fill="#06b6d4" fillOpacity="0.25" stroke="#06b6d4" strokeWidth="1.5" rx="4" />
              
              {/* Consequent Encroachment (50% CE) Line */}
              <line x1="150" y1="150" x2="400" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
              <text x="405" y="154" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                50% CE (Midpoint: $100,600)
              </text>

              {/* Interactive Retracement Reaction */}
              {step >= 2 && (
                <g className="animate-pulse">
                  {/* Retracement Path */}
                  <path d="M 360 80 Q 420 120 440 150" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
                  <circle cx="440" cy="150" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="455" y="148" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    CE Entry Fill
                  </text>
                  <path d="M 440 150 L 520 40" fill="none" stroke="#10b981" strokeWidth="3" />
                  <text x="525" y="45" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    Expansion ↑
                  </text>
                </g>
              )}
            </svg>
          </div>
        )}

        {type === 'order_block' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
            {/* Bullish OB origin candle (Bearish Red) */}
            <g>
              <line x1="140" y1="150" x2="140" y2="230" stroke="#ef4444" strokeWidth="2" />
              <rect x="128" y="160" width="24" height="50" fill="#ef4444" rx="2" />
              {/* OB Zone Rectangle */}
              <rect x="128" y="150" width="280" height="80" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" rx="4" />
              <text x="130" y="140" fill="#60a5fa" fontSize="11" fontFamily="monospace" fontWeight="bold">
                BULLISH ORDER BLOCK ORIGIN
              </text>
            </g>

            {/* Displacement Green Candles launching away */}
            <line x1="200" y1="100" x2="200" y2="200" stroke="#10b981" strokeWidth="2.5" />
            <rect x="188" y="110" width="24" height="80" fill="#10b981" rx="2" />

            <line x1="260" y1="50" x2="260" y2="140" stroke="#10b981" strokeWidth="2.5" />
            <rect x="248" y="60" width="24" height="70" fill="#10b981" rx="2" />

            {/* Structure Break BOS */}
            <line x1="90" y1="90" x2="330" y2="90" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="280" y="82" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">BOS CONFIRMED</text>

            {/* Mitigation Phase */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              {/* Retrace candle into OB */}
              <line x1="340" y1="80" x2="340" y2="180" stroke="#ef4444" strokeWidth="2" />
              <rect x="330" y="95" width="20" height="65" fill="#ef4444" rx="2" />

              <line x1="390" y1="140" x2="390" y2="210" stroke="#ef4444" strokeWidth="2" />
              <rect x="380" y="150" width="20" height="40" fill="#ef4444" rx="2" />

              {/* Mitigation touch label */}
              <circle cx="390" cy="190" r="5" fill="#10b981" className="animate-ping" />
              <text x="350" y="245" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                MITIGATION (TEST OF OB)
              </text>
            </g>

            {/* Continuation launch */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-10'}>
              <path d="M 400 190 Q 450 140 500 60" fill="none" stroke="#10b981" strokeWidth="3.5" />
              <text x="490" y="50" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                EXPANSION TO BSL ↑
              </text>
            </g>
          </svg>
        )}

        {type === 'breaker_block' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
            {/* Bullish OB formed at higher low */}
            <rect x="110" y="140" width="360" height="45" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" rx="4" />
            <text x="115" y="132" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ORIGINAL BULLISH OB (SUPPORT)
            </text>

            {/* Rally to sweep BSL */}
            <path d="M 120 160 L 220 50" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="220" cy="50" r="5" fill="#ef4444" />
            <text x="210" y="38" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              SWEEPS BSL (PEAK)
            </text>

            {/* Violent collapse smashing through OB */}
            <path d="M 220 50 L 320 230" fill="none" stroke="#ef4444" strokeWidth="3.5" />
            <text x="260" y="200" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
              SMASHES OB (MSS)
            </text>

            {/* Role Reversal Retest */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 320 230 Q 380 180 410 145" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="410" cy="145" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <rect x="360" y="95" width="160" height="30" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" rx="4" />
              <text x="368" y="115" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                BEARISH BREAKER RETEST
              </text>
            </g>

            {/* Bearish expansion */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-10'}>
              <path d="M 410 145 L 520 250" fill="none" stroke="#ef4444" strokeWidth="3.5" />
              <text x="470" y="270" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                DELIVERY TO SSL ↓
              </text>
            </g>
          </svg>
        )}

        {type === 'po3_amd' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
            {/* Daily Open Line */}
            <line x1="40" y1="140" x2="560" y2="140" stroke="#f59e0b" strokeWidth="2" />
            <text x="50" y="132" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              DAILY OPEN (00:00 NY)
            </text>

            {/* Phase 1: Accumulation (Asia) */}
            <rect x="80" y="120" width="110" height="40" fill="#64748b" fillOpacity="0.2" stroke="#64748b" strokeWidth="1" rx="4" />
            <path d="M 85 140 Q 110 125 130 145 T 180 135" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <text x="90" y="112" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              1. ACCUMULATION
            </text>

            {/* Phase 2: Manipulation (London Judas Sweep below Open) */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 180 135 L 240 240" fill="none" stroke="#ef4444" strokeWidth="3" />
              <circle cx="240" cy="240" r="5" fill="#ef4444" className="animate-ping" />
              <text x="210" y="265" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                2. MANIPULATION (LOW OF DAY)
              </text>
              <text x="250" y="225" fill="#ef4444" fontSize="9" fontFamily="monospace">
                Sweeps Asian Low into Discount
              </text>
            </g>

            {/* Phase 3: Distribution (New York Expansion) */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-10'}>
              <path d="M 240 240 Q 300 220 360 120 T 480 40" fill="none" stroke="#10b981" strokeWidth="3.5" />
              <text x="360" y="55" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                3. DISTRIBUTION (TRUE EXPANSION)
              </text>
              {/* High of day / Close */}
              <circle cx="480" cy="40" r="5" fill="#10b981" />
              <text x="495" y="45" fill="#10b981" fontSize="10" fontFamily="monospace">High of Day</text>
              <line x1="480" y1="40" x2="520" y2="70" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="520" cy="70" r="4" fill="#38bdf8" />
              <text x="530" y="75" fill="#38bdf8" fontSize="10" fontFamily="monospace">Close</text>
            </g>
          </svg>
        )}

        {type === 'top_down_matrix' && (
          <div className="w-full h-full flex items-center justify-around gap-2 text-xs font-mono">
            <div className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-lg p-3 text-center">
              <div className="text-amber-400 font-bold text-sm mb-1">1. WEEKLY / DAILY</div>
              <div className="text-slate-400 text-[11px] mb-2">Macro Context & Draw</div>
              <div className="bg-slate-800/80 p-2 rounded text-left space-y-1 text-[10px] text-slate-300">
                <p>• Premium vs Discount</p>
                <p>• External BSL / SSL</p>
                <p>• Weekly Open & PDH/PDL</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-600 shrink-0" />

            <div className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-lg p-3 text-center">
              <div className="text-cyan-400 font-bold text-sm mb-1">2. 4H / 1H / 15M</div>
              <div className="text-slate-400 text-[11px] mb-2">Location & Liquidity Event</div>
              <div className="bg-slate-800/80 p-2 rounded text-left space-y-1 text-[10px] text-slate-300">
                <p>• Session Highs / Lows</p>
                <p>• Liquidity Sweep</p>
                <p>• HTF PD Arrays (FVG/OB)</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-600 shrink-0" />

            <div className="flex-1 bg-slate-900/90 border border-emerald-700/80 rounded-lg p-3 text-center shadow-lg shadow-emerald-950/40">
              <div className="text-emerald-400 font-bold text-sm mb-1">3. 5M / 1M</div>
              <div className="text-slate-400 text-[11px] mb-2">Displacement & Execution</div>
              <div className="bg-slate-800/80 p-2 rounded text-left space-y-1 text-[10px] text-slate-300">
                <p>• Bullish / Bearish MSS</p>
                <p>• FVG Retracement (CE)</p>
                <p>• Stop at Invalidation</p>
              </div>
            </div>
          </div>
        )}

        {type === 'session_timeline' && (
          <div className="w-full h-full flex flex-col justify-center px-4">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span>00:00 UTC (8:00 PM NY)</span>
              <span className="text-cyan-400 font-semibold">New York Time Base</span>
              <span>24:00 UTC (8:00 PM NY)</span>
            </div>
            {/* Session Timeline Bar */}
            <div className="w-full h-12 bg-slate-800 rounded-lg flex overflow-hidden border border-slate-700 relative">
              <div className="w-1/3 bg-blue-950/70 border-r border-blue-600/40 flex flex-col justify-center items-center text-[11px] font-mono text-blue-300">
                <span className="font-bold">ASIAN SESSION</span>
                <span className="text-[9px] text-blue-400">8:00 PM - Midnight NY</span>
                <span className="text-[8px] text-slate-400">Consolidation / Range</span>
              </div>
              <div className="w-1/3 bg-amber-950/70 border-r border-amber-600/40 flex flex-col justify-center items-center text-[11px] font-mono text-amber-300">
                <span className="font-bold">LONDON KILLZONE</span>
                <span className="text-[9px] text-amber-400">2:00 AM - 5:00 AM NY</span>
                <span className="text-[8px] text-slate-400">Judas Swing / Manipulation</span>
              </div>
              <div className="w-1/3 bg-emerald-950/70 flex flex-col justify-center items-center text-[11px] font-mono text-emerald-300">
                <span className="font-bold">NEW YORK KILLZONE</span>
                <span className="text-[9px] text-emerald-400">7:00 AM - 10:00 AM NY</span>
                <span className="text-[8px] text-slate-400">8:30 News • 9:30 Open • Distribution</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 px-1">
              <span>Asian Range Established</span>
              <span>London Raids Asian High/Low</span>
              <span>NY Expands to Macro Target</span>
            </div>
          </div>
        )}

        {type === 'nested_structure' && (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 600 260" className="w-full h-full max-h-64">
              {/* Daily Structure */}
              <path d="M 80 200 L 300 40 L 520 200" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
              <text x="300" y="30" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                DAILY BULLISH LEG (SWING HIGH)
              </text>

              {/* 15M Internal Swings */}
              <path d="M 80 200 L 140 130 L 170 160 L 230 90 L 260 120 L 300 40" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <text x="140" y="115" fill="#06b6d4" fontSize="10" fontFamily="monospace">15M BOS</text>
              <text x="230" y="75" fill="#06b6d4" fontSize="10" fontFamily="monospace">15M BOS</text>

              {/* 15M Pullback with 5M execution */}
              <path d="M 300 40 L 360 120 L 390 90 L 440 180" fill="none" stroke="#ef4444" strokeWidth="2" />
              <text x="380" y="150" fill="#ef4444" fontSize="10" fontFamily="monospace">15M Pullback (Discount)</text>

              {/* 5M Reversal */}
              <path d="M 440 180 Q 470 140 520 70" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle cx="440" cy="180" r="5" fill="#10b981" />
              <text x="445" y="200" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                5M MSS Reversal in Daily Discount
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Explanation Footer Box */}
      {showExplanation && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 text-xs text-slate-300 font-mono space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Methodological Rule:</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {type === 'liquidity_sweep' && 'A sweep is an observation event, not an automatic entry. You must wait for displacement and a Market Structure Shift (MSS) before considering an entry.'}
            {type === 'fvg_formation' && 'Consequent Encroachment (50%) serves as a balanced institutional reference point inside the displacement corridor. If price closes beyond the FVG, it inverts into an IFVG.'}
            {type === 'order_block' && 'An Order Block is valid only because of the displacement and structural consequence that followed it. Fresh unmitigated Order Blocks provide superior odds.'}
            {type === 'breaker_block' && 'A Breaker Block is created when an Order Block that swept liquidity fails and flips role to become opposing support or resistance.'}
            {type === 'po3_amd' && 'Power of Three frames the Daily candle: Open -> Manipulation below Open -> Distribution expansion -> Close near the high.'}
            {type === 'top_down_matrix' && 'Higher timeframes dictate the narrative and location; lower timeframes provide the precision execution entry.'}
            {type === 'session_timeline' && 'All ICT timing is calibrated to New York local time. Never trade without knowing what liquidity was created in prior sessions.'}
            {type === 'nested_structure' && 'Every timeframe contains trends within trends. A 5-minute downtrend can simply be a healthy pullback delivering price into a Daily FVG.'}
          </p>
        </div>
      )}
    </div>
  );
};
