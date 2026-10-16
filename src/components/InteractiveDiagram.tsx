import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { DiagramType } from '../types';
import { MasterclassDiagrams, isMasterclassDiagram } from './MasterclassDiagrams';

interface InteractiveDiagramProps {
  type?: DiagramType;
  diagramType?: DiagramType;
  title?: string;
  isInteractive?: boolean;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type: rawType, diagramType, title, isInteractive = true }) => {
  const type = rawType || diagramType || 'liquidity_sweep';
  const [step, setStep] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const animated = !['top_down_matrix', 'session_timeline', 'nested_structure', 'org_octant_grid', 'five_opening_ranges', 'standard_deviations', 'three_day_rule'].includes(type);
  useEffect(() => setStep(0), [type]);
  const handleReset = () => setStep(0);
  const handleNext = () => setStep((prev) => (prev < 3 ? prev + 1 : 0));

  return (
    <div className="p-5 sm:p-6 my-4 rounded-2xl border border-ink/[0.08] bg-surface text-ink">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink/[0.07]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-wider uppercase text-teal bg-teal/10 px-2.5 py-1 rounded border border-teal/20">
            {type.replace(/_/g, ' ')}
          </span>
          {title && <span className="text-ink-secondary text-xs hidden sm:inline font-mono">| {title}</span>}
        </div>

        {isInteractive && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-ink/[0.03] hover:bg-ink/[0.08] border border-ink/[0.08] text-ink-secondary hover:text-ink flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-brand" />
              {showExplanation ? 'Hide Notes' : 'Show Notes'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.08] border border-ink/[0.08] text-ink-secondary hover:text-ink transition-colors cursor-pointer"
              title="Reset animation" aria-label="Reset animation" disabled={!animated}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext} disabled={!animated}
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-brand hover:bg-brand-hover text-on-brand flex items-center gap-1.5 transition-all cursor-pointer on-accent"
            >
              <Play className="w-3 h-3 fill-ink" />
              <span>{animated ? `Step ${step + 1} / 4` : 'Static reference'}</span>
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas Stage - Predikt Dark Surface */}
      <div className="relative w-full min-h-[300px] h-76 sm:h-84 bg-surface-muted border border-ink/[0.06] rounded-xl my-4 overflow-hidden flex items-center justify-center p-3 select-none">
        
        {/* Dynamic Diagram Views based on Type */}
        {type === 'mss_sequence' && (
          <svg viewBox="0 0 600 300" role="img" aria-label="Illustrative swing break and displacement; not a forecast" className="w-full h-full">
            <title>Structure confirmation sequence</title>
            <path d="M 50 220 L 120 100 L 190 180 L 270 80 L 340 150" fill="none" stroke="#52645b" strokeWidth="3" />
            <line x1="120" x2="550" y1="180" y2="180" stroke="#23796d" strokeDasharray="5 5" />
            <text x="50" y="265" fill="#223b35" fontSize="14">Mark a significant swing before judging a break.</text>
            {step >= 1 && <path d="M 340 150 L 390 240" stroke="#b44746" strokeWidth="5" />}
            {step >= 2 && <text x="300" y="285" fill="#b44746" fontSize="13">Close beyond selected swing</text>}
            {step >= 3 && <path d="M 390 240 L 450 185 L 530 250" fill="none" stroke="#F0D788" strokeWidth="3" />}
          </svg>
        )}

        {type === 'liquidity_sweep' && (
          <svg viewBox="0 0 600 300" className="w-full h-full max-h-76">
            {/* Old High Line (BSL) */}
            <line x1="50" y1="100" x2="550" y2="100" stroke="#23796d" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="60" y="90" fill="#23796d" fontSize="11" fontFamily="monospace" fontWeight="600">
              PREVIOUS HIGH / EQUAL HIGHS (BSL POOL)
            </text>

            {/* Candle 1 (Approach) */}
            <line x1="120" y1="130" x2="120" y2="210" stroke="#25734f" strokeWidth="2" />
            <rect x="112" y="145" width="16" height="50" fill="#25734f" rx="1" />

            {/* Candle 2 (Approach 2) */}
            <line x1="180" y1="110" x2="180" y2="190" stroke="#25734f" strokeWidth="2" />
            <rect x="172" y="125" width="16" height="45" fill="#25734f" rx="1" />

            {/* Candle 3 (The Liquidity Sweep Wick) */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-30'}>
              <line x1="260" y1="65" x2="260" y2="175" stroke="#b44746" strokeWidth="2" />
              <rect x="252" y="105" width="16" height="55" fill="#b44746" rx="1" />
              {/* Highlight sweep */}
              <circle cx="260" cy="65" r="4" fill="#23796d" />
              <rect x="235" y="70" width="50" height="24" rx="4" fill="#23796d" fillOpacity="0.15" stroke="#23796d" strokeWidth="1" />
              <text x="242" y="86" fill="#23796d" fontSize="10" fontFamily="monospace" fontWeight="600">SWEEP</text>
            </g>

            {/* Candle 4 & 5 (Displacement & MSS) */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <line x1="330" y1="115" x2="330" y2="240" stroke="#b44746" strokeWidth="2" />
              <rect x="320" y="120" width="20" height="100" fill="#b44746" rx="1" />

              <line x1="400" y1="210" x2="400" y2="280" stroke="#b44746" strokeWidth="2" />
              <rect x="390" y="215" width="20" height="55" fill="#b44746" rx="1" />

              {/* MSS Break Line */}
              <line x1="170" y1="190" x2="440" y2="190" stroke="#223b35" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="310" y="182" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="600">
                BEARISH MSS (STRUCTURE BROKEN)
              </text>
            </g>

            {/* Candle 6 & 7 (Retracement into FVG & Continuation) */}
            <g className={step >= 3 ? 'opacity-100 transition-opacity duration-500' : 'opacity-15'}>
              {/* FVG Box */}
              <rect x="320" y="145" width="160" height="40" rx="3" fill="#405a98" fillOpacity="0.16" stroke="#405a98" strokeWidth="1" strokeDasharray="3 3" />
              <text x="380" y="168" fill="#405a98" fontSize="10" fontFamily="monospace" fontWeight="600">BEARISH FVG</text>

              {/* Retracement Candle */}
              <line x1="470" y1="140" x2="470" y2="230" stroke="#25734f" strokeWidth="2" />
              <rect x="462" y="155" width="16" height="55" fill="#25734f" rx="1" />

              {/* Rejection Arrow */}
              <path d="M 490 170 L 530 250" fill="none" stroke="#b44746" strokeWidth="2.5" />
              <text x="445" y="275" fill="#b44746" fontSize="11" fontFamily="monospace" fontWeight="600">EXPANSION TO SSL ↓</text>
            </g>
          </svg>
        )}

        {type === 'fvg_formation' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-76">
            {/* Candle 1 */}
            <line x1="150" y1="180" x2="150" y2="260" stroke="#25734f" strokeWidth="2" />
            <rect x="138" y="195" width="24" height="45" fill="#25734f" rx="1" />
            <text x="125" y="275" fill="#52645b" fontSize="10" fontFamily="monospace">Candle 1</text>
            {/* Candle 1 High Line */}
            <line x1="150" y1="180" x2="450" y2="180" stroke="#405a98" strokeWidth="1" strokeDasharray="3 3" />
            <text x="455" y="184" fill="#405a98" fontSize="10" fontFamily="monospace">Candle 1 High ($100,000)</text>

            {/* Candle 2 (Displacement) */}
            <line x1="250" y1="60" x2="250" y2="220" stroke="#25734f" strokeWidth="2.5" />
            <rect x="236" y="70" width="28" height="135" fill="#25734f" rx="1" />
            <text x="210" y="275" fill="#25734f" fontSize="10" fontFamily="monospace">Candle 2 (Displacement)</text>

            {/* Candle 3 (Continuation) */}
            <line x1="350" y1="40" x2="350" y2="120" stroke="#25734f" strokeWidth="2" />
            <rect x="338" y="55" width="24" height="45" fill="#25734f" rx="1" />
            <text x="325" y="275" fill="#52645b" fontSize="10" fontFamily="monospace">Candle 3</text>
            {/* Candle 3 Low Line */}
            <line x1="150" y1="120" x2="450" y2="120" stroke="#405a98" strokeWidth="1" strokeDasharray="3 3" />
            <text x="455" y="124" fill="#405a98" fontSize="10" fontFamily="monospace">Candle 3 Low ($101,200)</text>

            {/* FVG Box Zone */}
            <rect x="150" y="120" width="200" height="60" rx="3" fill="#405a98" fillOpacity="0.18" stroke="#405a98" strokeWidth="1.5" />
            
            {/* 50% Consequent Encroachment */}
            <line x1="150" y1="150" x2="400" y2="150" stroke="#705692" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="405" y="154" fill="#705692" fontSize="10" fontFamily="monospace">
              50% CE ($100,600)
            </text>

            {step >= 2 && (
              <g>
                <path d="M 360 80 Q 420 120 440 150" fill="none" stroke="#52645b" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="440" cy="150" r="5" fill="#25734f" />
                <text x="455" y="148" fill="#25734f" fontSize="10" fontFamily="monospace">
                  CE Entry Fill
                </text>
                <path d="M 440 150 L 520 40" fill="none" stroke="#25734f" strokeWidth="2.5" />
                <text x="525" y="45" fill="#25734f" fontSize="10" fontFamily="monospace">
                  Expansion ↑
                </text>
              </g>
            )}
          </svg>
        )}

        {type === 'order_block' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-76">
            {/* Bullish OB origin candle (Bearish Red) */}
            <g>
              <line x1="140" y1="150" x2="140" y2="230" stroke="#b44746" strokeWidth="2" />
              <rect x="128" y="160" width="24" height="50" fill="#b44746" rx="1" />
              {/* OB Zone Rectangle */}
              <rect x="128" y="150" width="280" height="80" rx="3" fill="#94631f" fillOpacity="0.15" stroke="#94631f" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="130" y="140" fill="#94631f" fontSize="10" fontFamily="monospace" fontWeight="600">
                BULLISH ORDER BLOCK ORIGIN
              </text>
            </g>

            {/* Displacement Candles */}
            <line x1="200" y1="100" x2="200" y2="200" stroke="#25734f" strokeWidth="2" />
            <rect x="188" y="110" width="24" height="80" fill="#25734f" rx="1" />

            <line x1="260" y1="50" x2="260" y2="140" stroke="#25734f" strokeWidth="2" />
            <rect x="248" y="60" width="24" height="70" fill="#25734f" rx="1" />

            {/* BOS */}
            <line x1="90" y1="90" x2="330" y2="90" stroke="#223b35" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="260" y="82" fill="#223b35" fontSize="10" fontFamily="monospace">BOS CONFIRMED</text>

            {/* Mitigation Phase */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <line x1="340" y1="80" x2="340" y2="180" stroke="#b44746" strokeWidth="2" />
              <rect x="330" y="95" width="20" height="65" fill="#b44746" rx="1" />

              <line x1="390" y1="140" x2="390" y2="210" stroke="#b44746" strokeWidth="2" />
              <rect x="380" y="150" width="20" height="40" fill="#b44746" rx="1" />

              <circle cx="390" cy="190" r="4" fill="#25734f" />
              <text x="350" y="245" fill="#25734f" fontSize="10" fontFamily="monospace">
                MITIGATION (TEST OF OB)
              </text>
            </g>

            {/* Continuation */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 400 190 Q 450 140 500 60" fill="none" stroke="#25734f" strokeWidth="3" />
              <text x="475" y="50" fill="#25734f" fontSize="11" fontFamily="monospace" fontWeight="600">
                EXPANSION TO BSL ↑
              </text>
            </g>
          </svg>
        )}

        {type === 'breaker_block' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-76">
            {/* Bullish OB formed */}
            <rect x="110" y="140" width="360" height="45" rx="3" fill="#80518b" fillOpacity="0.14" stroke="#80518b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="115" y="132" fill="#80518b" fontSize="10" fontFamily="monospace">
              ORIGINAL BULLISH OB (SUPPORT)
            </text>

            {/* Rally to sweep BSL */}
            <path d="M 120 160 L 220 50" fill="none" stroke="#25734f" strokeWidth="2" />
            <circle cx="220" cy="50" r="4" fill="#23796d" />
            <text x="210" y="38" fill="#23796d" fontSize="10" fontFamily="monospace">
              SWEEPS BSL (PEAK)
            </text>

            {/* Collapse smashing OB */}
            <path d="M 220 50 L 320 230" fill="none" stroke="#b44746" strokeWidth="2.5" />
            <text x="260" y="200" fill="#b44746" fontSize="10" fontFamily="monospace">
              SMASHES OB (MSS)
            </text>

            {/* Role Reversal Retest */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <path d="M 320 230 Q 380 180 410 145" fill="none" stroke="#52645b" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="410" cy="145" r="5" fill="#b44746" />
              <rect x="360" y="95" width="160" height="30" rx="3" fill="#80518b" fillOpacity="0.18" stroke="#80518b" strokeWidth="1" />
              <text x="368" y="115" fill="#80518b" fontSize="10" fontFamily="monospace" fontWeight="600">
                BEARISH BREAKER RETEST
              </text>
            </g>

            {/* Bearish expansion */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 410 145 L 520 250" fill="none" stroke="#b44746" strokeWidth="3" />
              <text x="470" y="270" fill="#b44746" fontSize="11" fontFamily="monospace" fontWeight="600">
                DELIVERY TO SSL ↓
              </text>
            </g>
          </svg>
        )}

        {type === 'po3_amd' && (
          <svg viewBox="0 0 600 280" className="w-full h-full max-h-76">
            {/* Daily Open Line */}
            <line x1="40" y1="140" x2="560" y2="140" stroke="#52645b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="50" y="132" fill="#52645b" fontSize="10" fontFamily="monospace">
              DAILY OPEN (00:00 NY)
            </text>

            {/* 1. Accumulation */}
            <rect x="80" y="120" width="110" height="40" rx="3" fill="#223b35" fillOpacity="0.04" stroke="#223b35" strokeOpacity="0.1" strokeWidth="1" />
            <path d="M 85 140 Q 110 125 130 145 T 180 135" fill="none" stroke="#52645b" strokeWidth="1.5" />
            <text x="90" y="112" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="600">
              1. ACCUMULATION
            </text>

            {/* 2. Manipulation */}
            <g className={step >= 1 ? 'opacity-100 transition-opacity duration-500' : 'opacity-25'}>
              <path d="M 180 135 L 240 240" fill="none" stroke="#b44746" strokeWidth="2.5" />
              <circle cx="240" cy="240" r="4" fill="#b44746" />
              <text x="190" y="260" fill="#b44746" fontSize="10" fontFamily="monospace" fontWeight="600">
                2. MANIPULATION (LOW OF DAY)
              </text>
            </g>

            {/* 3. Distribution */}
            <g className={step >= 2 ? 'opacity-100 transition-opacity duration-500' : 'opacity-20'}>
              <path d="M 240 240 Q 300 220 360 120 T 480 40" fill="none" stroke="#25734f" strokeWidth="3" />
              <text x="350" y="55" fill="#25734f" fontSize="11" fontFamily="monospace" fontWeight="600">
                3. DISTRIBUTION (TRUE EXPANSION)
              </text>
              <circle cx="480" cy="40" r="4" fill="#25734f" />
              <text x="495" y="45" fill="#25734f" fontSize="10" fontFamily="monospace">High of Day</text>
              <line x1="480" y1="40" x2="520" y2="70" stroke="#52645b" strokeWidth="1.5" />
              <circle cx="520" cy="70" r="3" fill="#256552" />
              <text x="530" y="75" fill="#256552" fontSize="10" fontFamily="monospace">Close</text>
            </g>
          </svg>
        )}

        {type === 'top_down_matrix' && (
          <div className="w-full h-full flex items-center justify-around gap-3 text-xs font-mono p-2">
            <div className="flex-1 bg-ink/[0.02] border border-ink/[0.08] rounded-xl p-3.5 text-center">
              <div className="text-negative font-semibold text-xs mb-1 uppercase tracking-wider">1. WEEKLY / DAILY</div>
              <div className="text-ink-muted text-[10px] mb-2 uppercase">Macro Context &amp; Draw</div>
              <div className="bg-ink/[0.02] border border-ink/[0.06] rounded-lg p-2.5 text-left space-y-1 text-[11px] text-ink-secondary">
                <p>• Premium vs Discount</p>
                <p>• External BSL / SSL</p>
                <p>• Weekly Open &amp; PDH/PDL</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />

            <div className="flex-1 bg-ink/[0.02] border border-ink/[0.08] rounded-xl p-3.5 text-center">
              <div className="text-brand font-semibold text-xs mb-1 uppercase tracking-wider">2. 4H / 1H / 15M</div>
              <div className="text-ink-muted text-[10px] mb-2 uppercase">Location &amp; Liquidity Event</div>
              <div className="bg-ink/[0.02] border border-ink/[0.06] rounded-lg p-2.5 text-left space-y-1 text-[11px] text-ink-secondary">
                <p>• Session Highs / Lows</p>
                <p>• Liquidity Sweep</p>
                <p>• HTF PD Arrays (FVG/OB)</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />

            <div className="flex-1 bg-ink/[0.02] border border-ink/[0.08] rounded-xl p-3.5 text-center">
              <div className="text-positive font-semibold text-xs mb-1 uppercase tracking-wider">3. 5M / 1M</div>
              <div className="text-ink-muted text-[10px] mb-2 uppercase">Displacement &amp; Entry</div>
              <div className="bg-ink/[0.02] border border-ink/[0.06] rounded-lg p-2.5 text-left space-y-1 text-[11px] text-ink-secondary">
                <p>• Bullish / Bearish MSS</p>
                <p>• FVG Retracement (CE)</p>
                <p>• Stop at Invalidation</p>
              </div>
            </div>
          </div>
        )}

        {type === 'session_timeline' && (
          <div className="w-full h-full flex flex-col justify-center px-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-ink-secondary uppercase">
              <span>20:00 New York (UTC varies with DST)</span>
              <span className="text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20 text-[10px]">
                New York Base
              </span>
              <span>Next 20:00 New York</span>
            </div>
            
            <div className="w-full h-14 bg-ink/[0.02] border border-ink/[0.08] rounded-xl flex overflow-hidden">
              <div className="w-1/3 bg-brand/10 border-r border-ink/[0.08] flex flex-col justify-center items-center text-[11px] font-mono text-brand">
                <span className="font-semibold uppercase">ASIAN SESSION</span>
                <span className="text-[10px] text-ink-secondary">8:00 PM - Midnight NY</span>
              </div>
              <div className="w-1/3 bg-amber/10 border-r border-ink/[0.08] flex flex-col justify-center items-center text-[11px] font-mono text-amber">
                <span className="font-semibold uppercase">LONDON KILLZONE</span>
                <span className="text-[10px] text-ink-secondary">2:00 AM - 5:00 AM NY</span>
              </div>
              <div className="w-1/3 bg-positive/10 flex flex-col justify-center items-center text-[11px] font-mono text-positive">
                <span className="font-semibold uppercase">NEW YORK KILLZONE</span>
                <span className="text-[10px] text-ink-secondary">7:00 AM - 10:00 AM NY</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted uppercase px-1">
              <span>Asian Range Established</span>
              <span>London Raids Asian Liquidity</span>
              <span>NY Expands to Macro Target</span>
            </div>
          </div>
        )}

        {type === 'nested_structure' && (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 600 260" className="w-full h-full max-h-64">
              <path d="M 80 200 L 300 40 L 520 200" fill="none" stroke="#52645b" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="300" y="30" fill="#223b35" fontSize="11" fontFamily="monospace" textAnchor="middle">
                DAILY BULLISH LEG (SWING HIGH)
              </text>

              <path d="M 80 200 L 140 130 L 170 160 L 230 90 L 260 120 L 300 40" fill="none" stroke="#256552" strokeWidth="2" />
              <text x="140" y="115" fill="#256552" fontSize="10" fontFamily="monospace">15M BOS</text>
              <text x="230" y="75" fill="#256552" fontSize="10" fontFamily="monospace">15M BOS</text>

              <path d="M 300 40 L 360 120 L 390 90 L 440 180" fill="none" stroke="#b44746" strokeWidth="1.5" />
              <text x="375" y="150" fill="#b44746" fontSize="10" fontFamily="monospace">15M Pullback</text>

              <path d="M 440 180 Q 470 140 520 70" fill="none" stroke="#25734f" strokeWidth="2.5" />
              <circle cx="440" cy="180" r="4" fill="#25734f" />
              <text x="445" y="200" fill="#25734f" fontSize="10" fontFamily="monospace">
                5M MSS Reversal in Daily Discount
              </text>
            </svg>
          </div>
        )}

        {isMasterclassDiagram(type) && (
          <MasterclassDiagrams type={type} step={step} />
        )}
      </div>

      {/* Explanation Footer Box */}
      {showExplanation && (
        <div className="bg-ink/[0.02] border border-ink/[0.07] rounded-xl p-4 text-xs text-ink-secondary font-mono space-y-1.5">
          <div className="flex items-center gap-2 text-ink uppercase">
            <CheckCircle2 className="w-4 h-4 text-teal" />
            <span className="font-medium">Key Methodological Rule:</span>
          </div>
          <p className="leading-relaxed font-light text-ink-secondary">
            {type === 'mss_sequence' && 'BOS describes a continuation break; CHoCH describes an early character change; MSS requires the selected structural pivot and displacement confirmation. Definitions depend on the stated timeframe and convention.'}
            {type === 'liquidity_sweep' && 'A sweep is an observation event, not an automatic entry. You must wait for displacement and a Market Structure Shift (MSS) before considering an entry.'}
            {type === 'fvg_formation' && 'Consequent Encroachment (50%) serves as a balanced institutional reference point inside the displacement corridor. If price closes beyond the FVG, it inverts into an IFVG.'}
            {type === 'order_block' && 'An Order Block is valid only because of the displacement and structural consequence that followed it. Freshness is a framework condition, not a measured probability here.'}
            {type === 'breaker_block' && 'A Breaker Block is created when an Order Block that swept liquidity fails and flips role to become opposing support or resistance.'}
            {type === 'po3_amd' && 'Power of Three frames the Daily candle: Open -> Manipulation below Open -> Distribution expansion -> Close near the high.'}
            {type === 'top_down_matrix' && 'Higher timeframes dictate the narrative and location; lower timeframes provide the precision execution entry.'}
            {type === 'session_timeline' && 'All ICT timing is calibrated to New York local time. Never trade without knowing what liquidity was created in prior sessions.'}
            {type === 'nested_structure' && 'Every timeframe contains trends within trends. A 5-minute downtrend can simply be a healthy pullback delivering price into a Daily FVG.'}
            {type === 'unicorn_model' && 'Unicorn Model: Breaker Block + overlapping Fair Value Gap. Requires a prior liquidity raid (Stop Hunt). Stop loss is placed above the Breaker & FVG high.'}
            {type === 'cisd_masterclass' && 'Change In State of Delivery (CISD): An Order Block is a Change in the State of Delivery. Validated when price body closes through the delivery candles into HTF level.'}
            {type === 'ifvg_inversion' && 'Inversion FVG (IFVG): A failed auction signature. When price decisively closes through an FVG with full body, it flips into opposing support or resistance.'}
            {type === 'org_octant_grid' && 'Opening Range Gap (ORG): 09:30 cash open versus selected prior-session reference close. Divided into Octant/Quadrant grid. The 50% midpoint is a reference, with no hit rate established here.'}
            {type === 'mmxm_stage2' && 'Stage-2 Re-accumulation / Re-distribution: The named framework of MMXM. The first leg from SMR must reach 50% of the distance to the target; Stage 2 accelerates violently.'}
            {type === 'five_opening_ranges' && 'The 5 Algorithmic Opening Ranges: Midnight (12:00 AM), London (1:30 AM), NY Killzone (7:00 AM), AM Session (9:30 AM - King), and PM Session (1:30 PM).'}
            {type === 'propulsion_block' && 'Propulsion Block: Retraces into a pre-existing Order Block, respects its 50% Mean Threshold, and violently propels price. An execution tool, not analysis tool.'}
            {type === 'implied_fvg' && 'Implied FVG: Forms when consecutive candles have overlapping long wicks without a traditional body void. Consequent encroachment of both wicks defines the implied gap.'}
            {type === 'rejection_block' && 'Rejection Block: Defined from the highest/lowest candle body close to the wick extreme. Acts as an algorithmic price delimiter and deferred entry zone.'}
            {type === 'mitigation_block' && 'Mitigation Block: A failed breaker that forms after a failure swing (no stop raid). Institutions use it to mitigate underwater positions at breakeven.'}
            {type === 'standard_deviations' && 'Standard Deviations (STDV): Anchor to the manipulation range (0.0 to -1.0). model-based extensions form at -1.5, -2.0 (PDL/PDH target), -2.5, and -4.0 (macro terminus).'}
            {type === 'ny_continuation_reversal' && 'New York Framework: Did London tap a HTF PD Array? If NO -> NY Continuation (retrace to London OB at 8:30/9:30). If YES -> NY Reversal with Judas sweep.'}
            {type === 'first_presentation_fvg' && '1st Presented FVG: Only forms after 9:31 AM and after a stop raid. Must break away from balance with real displacement. framework-selected execution anchor.'}
            {type === 'ote_model' && 'Optimal Trade Entry (OTE): 62% to 79% Fibonacci retracement with 70.5% sweet spot. Must align with displacement, SIBI/BISI rebalance, and time of day.'}
            {type === 'three_day_rule' && '3-Day Rule: "Your entire universe of liquidity and inefficiencies can be summed up in the last 3 days." Cluster previous daily range octants with wick grades.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveDiagram;
