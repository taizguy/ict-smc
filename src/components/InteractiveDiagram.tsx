import React, { useState } from 'react';
import { Play, RotateCcw, Info, CheckCircle2, ChevronRight } from 'lucide-react';

interface InteractiveDiagramProps {
  type?: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  diagramType?: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  title?: string;
  isInteractive?: boolean;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type: rawType, diagramType, title, isInteractive = true }) => {
  const type = rawType || diagramType || 'liquidity_sweep';
  const [step, setStep] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const handleReset = () => setStep(0);
  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : 0));

  return (
    <div className="p-5 sm:p-6 my-4 border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] bg-white text-[#121212]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#121212]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono tracking-wider uppercase text-white font-black bg-[#D02020] px-3 py-1 border border-[#121212] shadow-[1px_1px_0px_0px_#121212]">
            {type.replace('_', ' ')} • Interactive Diagram
          </span>
          {title && <span className="text-[#121212] text-xs font-bold hidden sm:inline font-mono">| {title}</span>}
        </div>

        {isInteractive && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase bg-white hover:bg-[#F0C020] text-[#121212] flex items-center gap-1.5 transition-colors border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <Info className="w-3.5 h-3.5 text-[#1040C0] stroke-[2.5]" />
              {showExplanation ? 'Hide Notes' : 'Show Notes'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 bg-white hover:bg-[#F0C020] text-[#121212] transition-colors border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              title="Reset Animation"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-1.5 text-xs font-mono font-black uppercase bg-[#F0C020] hover:bg-yellow-400 text-[#121212] flex items-center gap-1.5 transition-all border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <Play className="w-3.5 h-3.5 fill-[#121212]" />
              Step {step + 1} / 4
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full h-72 sm:h-80 bg-[#FAF9F5] border-2 border-[#121212] my-4 overflow-hidden flex items-center justify-center p-2 select-none">
        {/* Background Subtle Technical Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#121212 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Dynamic Diagram Views based on Type */}
        {type === 'liquidity_sweep' && (
          <svg viewBox="0 0 600 300" className="w-full h-full max-h-72">
            {/* Old High Line (BSL) */}
            <line x1="50" y1="100" x2="550" y2="100" stroke="#121212" strokeWidth="2" strokeDasharray="4 4" />
            <text x="60" y="90" fill="#121212" fontSize="12" fontFamily="monospace" fontWeight="900">
              PREVIOUS HIGH / EQUAL HIGHS (BSL POOL)
            </text>

            {/* Candle 1 (Approach) */}
            <line x1="120" y1="130" x2="120" y2="210" stroke="#166534" strokeWidth="2" />
            <rect x="112" y="145" width="16" height="50" fill="#166534" stroke="#121212" strokeWidth="1" />

            {/* Candle 2 (Approach 2) */}
            <line x1="180" y1="110" x2="180" y2="190" stroke="#166534" strokeWidth="2" />
            <rect x="172" y="125" width="16" height="45" fill="#166534" stroke="#121212" strokeWidth="1" />

            {/* Candle 3 (The Liquidity Sweep Wick) */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-40'}>
              <line x1="260" y1="65" x2="260" y2="175" stroke="#D02020" strokeWidth="2.5" />
              <rect x="252" y="105" width="16" height="55" fill="#D02020" stroke="#121212" strokeWidth="1" />
              {/* Highlight the sweep zone */}
              <circle cx="260" cy="65" r="5" fill="#D02020" />
              <rect x="235" y="70" width="50" height="28" fill="#FEE2E2" stroke="#D02020" strokeWidth="1.5" />
              <text x="240" y="88" fill="#D02020" fontSize="10" fontFamily="monospace" fontWeight="900">SWEEP</text>
            </g>

            {/* Candle 4 & 5 (Violent Bearish Displacement & MSS) */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <line x1="330" y1="115" x2="330" y2="240" stroke="#D02020" strokeWidth="2" />
              <rect x="320" y="120" width="20" height="100" fill="#D02020" stroke="#121212" strokeWidth="1" />

              <line x1="400" y1="210" x2="400" y2="280" stroke="#D02020" strokeWidth="2" />
              <rect x="390" y="215" width="20" height="55" fill="#D02020" stroke="#121212" strokeWidth="1" />

              {/* MSS Break Line */}
              <line x1="170" y1="190" x2="440" y2="190" stroke="#1040C0" strokeWidth="2" strokeDasharray="3 3" />
              <text x="310" y="182" fill="#1040C0" fontSize="11" fontFamily="monospace" fontWeight="900">
                BEARISH MSS (PROTECTED LOW BROKEN)
              </text>
            </g>

            {/* Candle 6 & 7 (Retracement into FVG & Continuation) */}
            <g className={step >= 3 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              {/* FVG Box */}
              <rect x="320" y="145" width="160" height="40" fill="#E0E7FF" stroke="#1040C0" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="405" y="168" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">BEARISH FVG</text>

              {/* Retracement Candle */}
              <line x1="470" y1="140" x2="470" y2="230" stroke="#166534" strokeWidth="2" />
              <rect x="462" y="155" width="16" height="55" fill="#166534" stroke="#121212" strokeWidth="1" />

              {/* Rejection Arrow */}
              <path d="M 490 170 L 530 250" fill="none" stroke="#D02020" strokeWidth="3" />
              <text x="450" y="275" fill="#D02020" fontSize="12" fontFamily="monospace" fontWeight="900">EXPANSION TO SSL ↓</text>
            </g>
          </svg>
        )}

        {type === 'fvg_formation' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
              {/* Three Candles */}
              {/* Candle 1 (Bullish Base) */}
              <line x1="150" y1="180" x2="150" y2="260" stroke="#166534" strokeWidth="2" />
              <rect x="138" y="195" width="24" height="45" fill="#166534" stroke="#121212" strokeWidth="1" />
              <text x="125" y="275" fill="#121212" fontSize="11" fontFamily="monospace" fontWeight="900">Candle 1</text>
              {/* Candle 1 High Line */}
              <line x1="150" y1="180" x2="450" y2="180" stroke="#1040C0" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="455" y="184" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">Candle 1 High ($100,000)</text>

              {/* Candle 2 (Displacement Candle) */}
              <line x1="250" y1="60" x2="250" y2="220" stroke="#166534" strokeWidth="2.5" />
              <rect x="236" y="70" width="28" height="135" fill="#166534" stroke="#121212" strokeWidth="1" />
              <text x="210" y="275" fill="#1040C0" fontSize="11" fontFamily="monospace" fontWeight="900">Candle 2 (Displacement)</text>

              {/* Candle 3 (Continuation with Gap) */}
              <line x1="350" y1="40" x2="350" y2="120" stroke="#166534" strokeWidth="2" />
              <rect x="338" y="55" width="24" height="45" fill="#166534" stroke="#121212" strokeWidth="1" />
              <text x="325" y="275" fill="#121212" fontSize="11" fontFamily="monospace" fontWeight="900">Candle 3</text>
              {/* Candle 3 Low Line */}
              <line x1="150" y1="120" x2="450" y2="120" stroke="#1040C0" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="455" y="124" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">Candle 3 Low ($101,200)</text>

              {/* FVG Box Zone */}
              <rect x="150" y="120" width="200" height="60" fill="#E0E7FF" stroke="#1040C0" strokeWidth="2" />
              
              {/* Consequent Encroachment (50% CE) Line */}
              <line x1="150" y1="150" x2="400" y2="150" stroke="#D02020" strokeWidth="2" strokeDasharray="4 4" />
              <text x="405" y="154" fill="#D02020" fontSize="11" fontFamily="monospace" fontWeight="900">
                50% CE (Midpoint: $100,600)
              </text>

              {/* Interactive Retracement Reaction */}
              {step >= 2 && (
                <g>
                  {/* Retracement Path */}
                  <path d="M 360 80 Q 420 120 440 150" fill="none" stroke="#D02020" strokeWidth="2" strokeDasharray="2 2" />
                  <circle cx="440" cy="150" r="6" fill="#166534" stroke="#121212" strokeWidth="2" />
                  <text x="455" y="148" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
                    CE Entry Fill
                  </text>
                  <path d="M 440 150 L 520 40" fill="none" stroke="#166534" strokeWidth="3" />
                  <text x="525" y="45" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
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
              <line x1="140" y1="150" x2="140" y2="230" stroke="#D02020" strokeWidth="2" />
              <rect x="128" y="160" width="24" height="50" fill="#D02020" stroke="#121212" strokeWidth="1" />
              {/* OB Zone Rectangle */}
              <rect x="128" y="150" width="280" height="80" fill="#E0E7FF" stroke="#1040C0" strokeWidth="2" strokeDasharray="3 3" />
              <text x="130" y="140" fill="#1040C0" fontSize="11" fontFamily="monospace" fontWeight="900">
                BULLISH ORDER BLOCK ORIGIN
              </text>
            </g>

            {/* Displacement Green Candles launching away */}
            <line x1="200" y1="100" x2="200" y2="200" stroke="#166534" strokeWidth="2.5" />
            <rect x="188" y="110" width="24" height="80" fill="#166534" stroke="#121212" strokeWidth="1" />

            <line x1="260" y1="50" x2="260" y2="140" stroke="#166534" strokeWidth="2.5" />
            <rect x="248" y="60" width="24" height="70" fill="#166534" stroke="#121212" strokeWidth="1" />

            {/* Structure Break BOS */}
            <line x1="90" y1="90" x2="330" y2="90" stroke="#121212" strokeWidth="2" strokeDasharray="4 4" />
            <text x="280" y="82" fill="#121212" fontSize="10" fontFamily="monospace" fontWeight="900">BOS CONFIRMED</text>

            {/* Mitigation Phase */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              {/* Retrace candle into OB */}
              <line x1="340" y1="80" x2="340" y2="180" stroke="#D02020" strokeWidth="2" />
              <rect x="330" y="95" width="20" height="65" fill="#D02020" stroke="#121212" strokeWidth="1" />

              <line x1="390" y1="140" x2="390" y2="210" stroke="#D02020" strokeWidth="2" />
              <rect x="380" y="150" width="20" height="40" fill="#D02020" stroke="#121212" strokeWidth="1" />

              {/* Mitigation touch label */}
              <circle cx="390" cy="190" r="5" fill="#166534" />
              <text x="350" y="245" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
                MITIGATION (TEST OF OB)
              </text>
            </g>

            {/* Continuation launch */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 400 190 Q 450 140 500 60" fill="none" stroke="#166534" strokeWidth="3.5" />
              <text x="485" y="50" fill="#166534" fontSize="12" fontFamily="monospace" fontWeight="900">
                EXPANSION TO BSL ↑
              </text>
            </g>
          </svg>
        )}

        {type === 'breaker_block' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
            {/* Bullish OB formed at higher low */}
            <rect x="110" y="140" width="360" height="45" fill="#E0E7FF" stroke="#1040C0" strokeWidth="2" strokeDasharray="3 3" />
            <text x="115" y="132" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">
              ORIGINAL BULLISH OB (SUPPORT)
            </text>

            {/* Rally to sweep BSL */}
            <path d="M 120 160 L 220 50" fill="none" stroke="#166534" strokeWidth="2.5" />
            <circle cx="220" cy="50" r="5" fill="#D02020" />
            <text x="210" y="38" fill="#D02020" fontSize="11" fontFamily="monospace" fontWeight="900">
              SWEEPS BSL (PEAK)
            </text>

            {/* Violent collapse smashing through OB */}
            <path d="M 220 50 L 320 230" fill="none" stroke="#D02020" strokeWidth="3.5" />
            <text x="260" y="200" fill="#D02020" fontSize="10" fontFamily="monospace" fontWeight="900">
              SMASHES OB (MSS)
            </text>

            {/* Role Reversal Retest */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <path d="M 320 230 Q 380 180 410 145" fill="none" stroke="#121212" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="410" cy="145" r="6" fill="#D02020" stroke="#121212" strokeWidth="2" />
              <rect x="360" y="95" width="160" height="30" fill="#FEE2E2" stroke="#D02020" strokeWidth="1.5" />
              <text x="368" y="115" fill="#D02020" fontSize="10" fontFamily="monospace" fontWeight="900">
                BEARISH BREAKER RETEST
              </text>
            </g>

            {/* Bearish expansion */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 410 145 L 520 250" fill="none" stroke="#D02020" strokeWidth="3.5" />
              <text x="470" y="270" fill="#D02020" fontSize="11" fontFamily="monospace" fontWeight="900">
                DELIVERY TO SSL ↓
              </text>
            </g>
          </svg>
        )}

        {type === 'po3_amd' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-68">
            {/* Daily Open Line */}
            <line x1="40" y1="140" x2="560" y2="140" stroke="#121212" strokeWidth="2" strokeDasharray="3 3" />
            <text x="50" y="132" fill="#121212" fontSize="11" fontFamily="monospace" fontWeight="900">
              DAILY OPEN (00:00 NY)
            </text>

            {/* Phase 1: Accumulation (Asia) */}
            <rect x="80" y="120" width="110" height="40" fill="#F0F0F0" stroke="#121212" strokeWidth="1.5" />
            <path d="M 85 140 Q 110 125 130 145 T 180 135" fill="none" stroke="#121212" strokeWidth="2" />
            <text x="90" y="112" fill="#121212" fontSize="11" fontFamily="monospace" fontWeight="900">
              1. ACCUMULATION
            </text>

            {/* Phase 2: Manipulation (London Judas Sweep below Open) */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <path d="M 180 135 L 240 240" fill="none" stroke="#D02020" strokeWidth="3" />
              <circle cx="240" cy="240" r="5" fill="#D02020" />
              <text x="210" y="265" fill="#D02020" fontSize="11" fontFamily="monospace" fontWeight="900">
                2. MANIPULATION (LOW OF DAY)
              </text>
              <text x="250" y="225" fill="#D02020" fontSize="9" fontFamily="monospace" fontWeight="bold">
                Sweeps Asian Low into Discount
              </text>
            </g>

            {/* Phase 3: Distribution (New York Expansion) */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 240 240 Q 300 220 360 120 T 480 40" fill="none" stroke="#166534" strokeWidth="3.5" />
              <text x="360" y="55" fill="#166534" fontSize="12" fontFamily="monospace" fontWeight="900">
                3. DISTRIBUTION (TRUE EXPANSION)
              </text>
              {/* High of day / Close */}
              <circle cx="480" cy="40" r="5" fill="#166534" />
              <text x="495" y="45" fill="#166534" fontSize="10" fontFamily="monospace" fontWeight="900">High of Day</text>
              <line x1="480" y1="40" x2="520" y2="70" stroke="#121212" strokeWidth="2" />
              <circle cx="520" cy="70" r="4" fill="#1040C0" />
              <text x="530" y="75" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">Close</text>
            </g>
          </svg>
        )}

        {type === 'top_down_matrix' && (
          <div className="w-full h-full flex items-center justify-around gap-3 text-xs font-mono p-2">
            <div className="flex-1 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] p-3.5 text-center">
              <div className="text-[#D02020] font-black text-sm mb-1 uppercase">1. WEEKLY / DAILY</div>
              <div className="text-[#121212]/70 text-[11px] mb-2 font-bold uppercase">Macro Context &amp; Draw</div>
              <div className="bg-[#FAF9F5] border border-[#121212] p-2 text-left space-y-1 text-[10px] text-[#121212] font-medium">
                <p>• Premium vs Discount</p>
                <p>• External BSL / SSL</p>
                <p>• Weekly Open &amp; PDH/PDL</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-[#121212] shrink-0 stroke-[3]" />

            <div className="flex-1 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] p-3.5 text-center">
              <div className="text-[#1040C0] font-black text-sm mb-1 uppercase">2. 4H / 1H / 15M</div>
              <div className="text-[#121212]/70 text-[11px] mb-2 font-bold uppercase">Location &amp; Liquidity Event</div>
              <div className="bg-[#FAF9F5] border border-[#121212] p-2 text-left space-y-1 text-[10px] text-[#121212] font-medium">
                <p>• Session Highs / Lows</p>
                <p>• Liquidity Sweep</p>
                <p>• HTF PD Arrays (FVG/OB)</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-[#121212] shrink-0 stroke-[3]" />

            <div className="flex-1 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] p-3.5 text-center">
              <div className="text-[#166534] font-black text-sm mb-1 uppercase">3. 5M / 1M</div>
              <div className="text-[#121212]/70 text-[11px] mb-2 font-bold uppercase">Displacement &amp; Execution</div>
              <div className="bg-[#FAF9F5] border border-[#121212] p-2 text-left space-y-1 text-[10px] text-[#121212] font-medium">
                <p>• Bullish / Bearish MSS</p>
                <p>• FVG Retracement (CE)</p>
                <p>• Stop at Invalidation</p>
              </div>
            </div>
          </div>
        )}

        {type === 'session_timeline' && (
          <div className="w-full h-full flex flex-col justify-center px-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#121212] mb-2 font-black uppercase">
              <span>00:00 UTC (8:00 PM NY)</span>
              <span className="text-white font-black bg-[#1040C0] px-2.5 py-0.5 border border-[#121212]">New York Time Base</span>
              <span>24:00 UTC (8:00 PM NY)</span>
            </div>
            {/* Session Timeline Bar */}
            <div className="w-full h-14 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex overflow-hidden relative">
              <div className="w-1/3 bg-[#E0E7FF] border-r-2 border-[#121212] flex flex-col justify-center items-center text-[11px] font-mono text-[#1040C0]">
                <span className="font-black uppercase">ASIAN SESSION</span>
                <span className="text-[10px] font-bold">8:00 PM - Midnight NY</span>
                <span className="text-[9px] text-[#121212]/70">Consolidation / Range</span>
              </div>
              <div className="w-1/3 bg-[#FFF9C4] border-r-2 border-[#121212] flex flex-col justify-center items-center text-[11px] font-mono text-[#121212]">
                <span className="font-black uppercase">LONDON KILLZONE</span>
                <span className="text-[10px] font-bold">2:00 AM - 5:00 AM NY</span>
                <span className="text-[9px] text-[#121212]/70">Judas Swing / Manipulation</span>
              </div>
              <div className="w-1/3 bg-[#DCFCE7] flex flex-col justify-center items-center text-[11px] font-mono text-[#166534]">
                <span className="font-black uppercase">NEW YORK KILLZONE</span>
                <span className="text-[10px] font-bold">7:00 AM - 10:00 AM NY</span>
                <span className="text-[9px] text-[#121212]/70">8:30 News • 9:30 Open</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#121212] font-black uppercase mt-2 px-1">
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
              <path d="M 80 200 L 300 40 L 520 200" fill="none" stroke="#121212" strokeWidth="2" strokeDasharray="4 4" />
              <text x="300" y="30" fill="#121212" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                DAILY BULLISH LEG (SWING HIGH)
              </text>

              {/* 15M Internal Swings */}
              <path d="M 80 200 L 140 130 L 170 160 L 230 90 L 260 120 L 300 40" fill="none" stroke="#1040C0" strokeWidth="2.5" />
              <text x="140" y="115" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">15M BOS</text>
              <text x="230" y="75" fill="#1040C0" fontSize="10" fontFamily="monospace" fontWeight="900">15M BOS</text>

              {/* 15M Pullback with 5M execution */}
              <path d="M 300 40 L 360 120 L 390 90 L 440 180" fill="none" stroke="#D02020" strokeWidth="2" />
              <text x="380" y="150" fill="#D02020" fontSize="10" fontFamily="monospace" fontWeight="900">15M Pullback (Discount)</text>

              {/* 5M Reversal */}
              <path d="M 440 180 Q 470 140 520 70" fill="none" stroke="#166534" strokeWidth="3" />
              <circle cx="440" cy="180" r="5" fill="#166534" />
              <text x="445" y="200" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
                5M MSS Reversal in Daily Discount
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Explanation Footer Box */}
      {showExplanation && (
        <div className="bg-[#FFF9C4] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] p-4 text-xs text-[#121212] font-mono space-y-1.5">
          <div className="flex items-center gap-2 text-[#121212] font-black uppercase">
            <CheckCircle2 className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
            <span>Key Methodological Rule:</span>
          </div>
          <p className="text-[#121212] leading-relaxed font-medium">
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

export default InteractiveDiagram;
