import React from 'react';
import { DiagramType } from '../types';

interface MasterclassDiagramProps {
  type: DiagramType;
  step: number;
}

export const isMasterclassDiagram = (type: DiagramType): boolean => {
  return [
    'unicorn_model',
    'cisd_masterclass',
    'ifvg_inversion',
    'org_octant_grid',
    'mmxm_stage2',
    'five_opening_ranges',
    'propulsion_block',
    'implied_fvg',
    'rejection_block',
    'mitigation_block',
    'standard_deviations',
    'ny_continuation_reversal',
    'first_presentation_fvg',
    'ote_model',
    'three_day_rule'
  ].includes(type);
};

export const MasterclassDiagrams: React.FC<MasterclassDiagramProps> = ({ type, step }) => {
  switch (type) {
    case 'unicorn_model':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* Background Grid */}
          <line x1="40" y1="90" x2="580" y2="90" stroke="rgba(34,59,53,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="45" y="82" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">PREVIOUS DAILY HIGH (PDH / BSL POOL)</text>

          {/* Swing Low before Stop Raid */}
          <line x1="120" y1="160" x2="170" y2="210" stroke="#52645b" strokeWidth="2.5" />
          <line x1="170" y1="210" x2="260" y2="60" stroke="#166534" strokeWidth="2.5" />
          
          {/* Swing Low Label (Origin of Breaker) */}
          <circle cx="170" cy="210" r="4.5" fill="#345f9e" />
          <text x="110" y="232" fill="#345f9e" fontSize="10" fontFamily="monospace" fontWeight="900">1. Swing Low (Future Breaker)</text>

          {/* Stop Raid at High */}
          <circle cx="260" cy="60" r="5" fill="#b13c3e" />
          <rect x="235" y="32" width="105" height="22" fill="rgba(255, 107, 122, 0.25)" stroke="#b13c3e" strokeWidth="1.5" />
          <text x="240" y="47" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">2. STOP RAID (PDH)</text>

          {/* Step 1: Displacement through Swing Low creating Breaker + FVG */}
          <g className={step >= 1 ? 'opacity-100 transition-opacity duration-300' : 'opacity-30'}>
            <line x1="260" y1="60" x2="350" y2="250" stroke="#b13c3e" strokeWidth="3.5" />
            
            {/* Breaker Zone Horizontal */}
            <rect x="170" y="195" width="310" height="28" fill="rgba(37,101,82, 0.25)" stroke="#705692" strokeWidth="2" strokeDasharray="3 3" />
            <text x="400" y="213" fill="#705692" fontSize="10" fontFamily="monospace" fontWeight="900">-BREAKER BLOCK</text>

            {/* FVG Corridor overlapping Breaker */}
            <rect x="290" y="180" width="190" height="40" fill="rgba(240, 179, 91, 0.25)" stroke="#CA8A04" strokeWidth="2" opacity="0.8" />
            <text x="300" y="195" fill="#A16207" fontSize="10" fontFamily="monospace" fontWeight="900">DISPLACEMENT FVG</text>

            {/* Unicorn Convergence Label */}
            <rect x="330" y="150" width="160" height="24" fill="#F0C020" stroke="#52645b" strokeWidth="1.5" />
            <text x="338" y="166" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">🦄 UNICORN ZONE (OVERLAP)</text>
          </g>

          {/* Step 2: Retracement tap into Unicorn Zone */}
          <g className={step >= 2 ? 'opacity-100 transition-opacity duration-300' : 'opacity-20'}>
            <path d="M 350 250 Q 385 240 410 195" fill="none" stroke="#52645b" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="410" cy="195" r="6" fill="#b13c3e" stroke="#52645b" strokeWidth="2" />
            <text x="420" y="190" fill="#b13c3e" fontSize="11" fontFamily="monospace" fontWeight="900">3. EXECUTE SHORT ENTRY</text>
            <text x="420" y="176" fill="#223b35" fontSize="9" fontFamily="monospace">Stop above Breaker &amp; FVG High</text>
          </g>

          {/* Step 3: Explosive sell-side expansion into DOL */}
          <g className={step >= 3 ? 'opacity-100 transition-opacity duration-300' : 'opacity-10'}>
            <line x1="410" y1="195" x2="520" y2="280" stroke="#b13c3e" strokeWidth="4" />
            <line x1="100" y1="280" x2="560" y2="280" stroke="#345f9e" strokeWidth="2" strokeDasharray="4 4" />
            <text x="110" y="272" fill="#345f9e" fontSize="11" fontFamily="monospace" fontWeight="900">4. DRAW ON LIQUIDITY (ENGINEERED SSL / STDV -2.0)</text>
          </g>
        </svg>
      );

    case 'cisd_masterclass':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* HTF Key Level Line */}
          <line x1="40" y1="70" x2="580" y2="70" stroke="#345f9e" strokeWidth="2" strokeDasharray="4 4" />
          <text x="45" y="60" fill="#345f9e" fontSize="11" fontFamily="monospace" fontWeight="900">
            HIGHER TIMEFRAME KEY LEVEL (HTF FVG / OLD HIGH)
          </text>

          {/* Bullish candles approaching and tapping HTF level */}
          <g>
            {/* Candle 1 */}
            <line x1="120" y1="140" x2="120" y2="220" stroke="#166534" strokeWidth="2" />
            <rect x="110" y="150" width="20" height="55" fill="#166534" stroke="#52645b" strokeWidth="1" />

            {/* Candle 2 (The Bullish Delivery Candle that taps HTF Level) */}
            <line x1="170" y1="70" x2="170" y2="170" stroke="#166534" strokeWidth="2" />
            <rect x="160" y="90" width="20" height="70" fill="#166534" stroke="#52645b" strokeWidth="1.5" />
            <circle cx="170" cy="70" r="4" fill="#b13c3e" />

            {/* Open Price Anchor Line of Bullish Candle */}
            <line x1="160" y1="160" x2="550" y2="160" stroke="#b13c3e" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="360" y="142" width="190" height="18" fill="rgba(255, 107, 122, 0.25)" stroke="#b13c3e" strokeWidth="1" />
            <text x="368" y="155" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">
              C.I.S.D OPEN PRICE REF LEVEL
            </text>
          </g>

          {/* Step 1 & 2: Bearish Displacement closing BELOW the bullish body */}
          <g className={step >= 1 ? 'opacity-100 transition-opacity duration-300' : 'opacity-25'}>
            <line x1="220" y1="80" x2="220" y2="195" stroke="#b13c3e" strokeWidth="2.5" />
            <rect x="210" y="95" width="20" height="90" fill="#b13c3e" stroke="#52645b" strokeWidth="1.5" />

            {/* Close confirms CISD */}
            <circle cx="220" cy="185" r="5" fill="#b13c3e" />
            <rect x="235" y="180" width="130" height="26" fill="#ffffff" stroke="#b13c3e" strokeWidth="1.5" />
            <text x="242" y="197" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">
              BODY CLOSE = CISD!
            </text>
          </g>

          {/* Step 3: Retest of CISD Open Price & Continuation */}
          <g className={step >= 2 ? 'opacity-100 transition-opacity duration-300' : 'opacity-20'}>
            <line x1="310" y1="150" x2="310" y2="215" stroke="#166534" strokeWidth="2" />
            <rect x="300" y="160" width="20" height="40" fill="#166534" stroke="#52645b" strokeWidth="1" />

            <circle cx="310" cy="160" r="5" fill="#b13c3e" stroke="#52645b" strokeWidth="2" />
            <text x="280" y="132" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">
              Tap +OB CISD Sensitive Level
            </text>
          </g>

          {/* Step 4: Liquidity Delivery */}
          <g className={step >= 3 ? 'opacity-100 transition-opacity duration-300' : 'opacity-10'}>
            <line x1="380" y1="165" x2="380" y2="275" stroke="#b13c3e" strokeWidth="3.5" />
            <rect x="370" y="170" width="20" height="95" fill="#b13c3e" stroke="#52645b" strokeWidth="1.5" />
            <text x="405" y="270" fill="#345f9e" fontSize="11" fontFamily="monospace" fontWeight="900">
              Delivery to Relative Equal Lows (REQLs) ↓
            </text>
          </g>
        </svg>
      );

    case 'ifvg_inversion':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* Key Reference High Swept */}
          <line x1="40" y1="70" x2="580" y2="70" stroke="#52645b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
          <text x="45" y="62" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">
            LIQUIDITY RAID (PDH / BSL SWEPT)
          </text>

          {/* Initial Bullish FVG (BISI) that was formed on way up */}
          <rect x="150" y="130" width="380" height="45" fill="rgba(37,101,82, 0.25)" stroke="#345f9e" strokeWidth="2" strokeDasharray="3 3" />
          <text x="160" y="122" fill="#345f9e" fontSize="10" fontFamily="monospace" fontWeight="900">
            ORIGINAL BULLISH FVG (BISI)
          </text>

          {/* Up Candles into High */}
          <line x1="120" y1="110" x2="120" y2="230" stroke="#166534" strokeWidth="2" />
          <rect x="110" y="140" width="20" height="70" fill="#166534" stroke="#52645b" strokeWidth="1" />

          {/* Sweep at the peak */}
          <circle cx="220" cy="55" r="5" fill="#b13c3e" />
          <text x="230" y="55" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">
            Stop Hunt (Turtle Soup)
          </text>

          {/* Step 1: Displacement candle body closing THROUGH the FVG */}
          <g className={step >= 1 ? 'opacity-100 transition-opacity duration-300' : 'opacity-25'}>
            <line x1="280" y1="65" x2="280" y2="210" stroke="#b13c3e" strokeWidth="3" />
            <rect x="270" y="80" width="20" height="120" fill="#b13c3e" stroke="#52645b" strokeWidth="1.5" />

            {/* Violation tag */}
            <circle cx="280" cy="200" r="5" fill="#b13c3e" />
            <rect x="300" y="178" width="165" height="26" fill="rgba(255, 107, 122, 0.25)" stroke="#b13c3e" strokeWidth="1.5" />
            <text x="306" y="195" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">
              BODY CLOSED BELOW → IFVG!
            </text>
          </g>

          {/* Step 2: Role Reversal Retest */}
          <g className={step >= 2 ? 'opacity-100 transition-opacity duration-300' : 'opacity-20'}>
            {/* Retest candle into IFVG (now acts as resistance) */}
            <line x1="390" y1="125" x2="390" y2="210" stroke="#166534" strokeWidth="2" />
            <rect x="380" y="135" width="20" height="60" fill="#166534" stroke="#52645b" strokeWidth="1" />

            <circle cx="390" cy="135" r="6" fill="#b13c3e" stroke="#52645b" strokeWidth="2" />
            <text x="405" y="130" fill="#b13c3e" fontSize="11" fontFamily="monospace" fontWeight="900">
              Short on Retest of IFVG
            </text>
          </g>

          {/* Step 3: Bearish Delivery to Sell-Side Target */}
          <g className={step >= 3 ? 'opacity-100 transition-opacity duration-300' : 'opacity-10'}>
            <path d="M 400 145 L 480 270" fill="none" stroke="#b13c3e" strokeWidth="4" />
            <line x1="100" y1="270" x2="560" y2="270" stroke="#345f9e" strokeWidth="2" strokeDasharray="4 4" />
            <text x="110" y="262" fill="#345f9e" fontSize="11" fontFamily="monospace" fontWeight="900">
              SELLSIDE LIQUIDITY DRAW (REQLs / PRE-MARKET LOWS)
            </text>
          </g>
        </svg>
      );

    case 'org_octant_grid':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* ORG Grid Lines */}
          <g className="font-mono text-[9px] font-bold">
            {/* 1.0 High */}
            <line x1="70" y1="60" x2="550" y2="60" stroke="#52645b" strokeWidth="2" />
            <text x="80" y="55" fill="#223b35" fontWeight="900">1.0 HIGH (9:30 AM Open: $28,576.75)</text>

            {/* 0.875 Upper Octant */}
            <line x1="70" y1="80" x2="550" y2="80" stroke="#b13c3e" strokeWidth="1" strokeDasharray="2 2" />
            <text x="80" y="77" fill="#b13c3e">0.875 Upper Octant</text>

            {/* 0.75 Upper Quadrant */}
            <line x1="70" y1="100" x2="550" y2="100" stroke="#345f9e" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="80" y="97" fill="#345f9e">0.75 Upper Quadrant</text>

            {/* 0.625 Octant */}
            <line x1="70" y1="120" x2="550" y2="120" stroke="#52645b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            <text x="80" y="117" fill="#223b35">0.625 Octant</text>

            {/* 0.50 Consequent Encroachment (CE) */}
            <line x1="70" y1="140" x2="550" y2="140" stroke="#b13c3e" strokeWidth="2.5" />
            <rect x="360" y="128" width="190" height="22" fill="rgba(240, 179, 91, 0.25)" stroke="#52645b" strokeWidth="1" />
            <text x="368" y="143" fill="#223b35" fontWeight="900">0.50 C.E. (~70% Hit by 10:00 AM)</text>

            {/* 0.375 Octant */}
            <line x1="70" y1="160" x2="550" y2="160" stroke="#52645b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            <text x="80" y="157" fill="#223b35">0.375 Octant</text>

            {/* 0.25 Lower Quadrant */}
            <line x1="70" y1="180" x2="550" y2="180" stroke="#345f9e" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="80" y="177" fill="#345f9e">0.25 Lower Quadrant</text>

            {/* 0.125 Lower Octant */}
            <line x1="70" y1="200" x2="550" y2="200" stroke="#b13c3e" strokeWidth="1" strokeDasharray="2 2" />
            <text x="80" y="197" fill="#b13c3e">0.125 Lower Octant</text>

            {/* 0.0 Low */}
            <line x1="70" y1="220" x2="550" y2="220" stroke="#52645b" strokeWidth="2" />
            <text x="80" y="215" fill="#223b35" fontWeight="900">0.0 LOW (selected prior-session reference close: $28,324.75)</text>

            {/* Standard Deviation Extensions Below */}
            <g className={step >= 2 ? 'opacity-100' : 'opacity-20'}>
              <line x1="70" y1="250" x2="550" y2="250" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="80" y="246" fill="#166534" fontWeight="900">-0.5 Standard Deviation Target</text>

              <line x1="70" y1="280" x2="550" y2="280" stroke="#166534" strokeWidth="2" strokeDasharray="4 4" />
              <text x="80" y="276" fill="#166534" fontWeight="900">-1.0 Final Expansion Objective</text>
            </g>
          </g>

          {/* Interactive Price Path Traversing the Grid */}
          <path 
            d={
              step === 0 ? "M 150 60 L 190 100" :
              step === 1 ? "M 150 60 L 190 100 L 250 80 L 300 140" :
              step === 2 ? "M 150 60 L 190 100 L 250 80 L 300 140 L 340 120 L 400 220" :
              "M 150 60 L 190 100 L 250 80 L 300 140 L 340 120 L 400 220 L 440 200 L 500 280"
            } 
            fill="none" 
            stroke="#b13c3e"
            strokeWidth="3.5" 
          />
        </svg>
      );

    case 'mmxm_stage2':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* Phase 1: Original Consolidation Box */}
          <rect x="50" y="70" width="100" height="50" fill="#F3F4F6" stroke="#52645b" strokeWidth="1.5" />
          <path d="M 55 95 Q 75 80 95 105 T 145 90" fill="none" stroke="#52645b" strokeWidth="2" />
          <text x="55" y="62" fill="#223b35" fontSize="9" fontFamily="monospace" fontWeight="900">
            1. ORIGINAL CONSOLIDATION
          </text>

          {/* Phase 2: Sell-Side Curve (Accumulation in Stages) */}
          <path d="M 145 90 L 190 160 L 170 140 L 220 220 L 200 200 L 270 270" fill="none" stroke="#b13c3e" strokeWidth="2.5" />
          <text x="140" y="190" fill="#b13c3e" fontSize="10" fontFamily="monospace" fontWeight="900">
            Sell-Side Curve (Stages)
          </text>

          {/* Phase 3: Smart Money Reversal (SMR) at HTF Key Level */}
          <line x1="180" y1="280" x2="360" y2="280" stroke="#345f9e" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="270" cy="270" r="6" fill="#345f9e" stroke="#52645b" strokeWidth="2" />
          <text x="240" y="295" fill="#345f9e" fontSize="10" fontFamily="monospace" fontWeight="900">
            SMR (SMART MONEY REVERSAL)
          </text>

          {/* Phase 4: Buy-Side Curve with STAGE 2 HIGHLIGHT */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-25'}>
            {/* Stage 1 Re-accumulation */}
            <path d="M 270 270 L 330 180" fill="none" stroke="#166534" strokeWidth="2.5" />
            <text x="340" y="195" fill="#166534" fontSize="9" fontFamily="monospace">Stage 1 Leg</text>

            {/* Stage 2 Re-accumulation (THE HOLY GRAIL SETUP) */}
            <g className={step >= 2 ? 'opacity-100' : 'opacity-20'}>
              <rect x="340" y="130" width="160" height="35" fill="rgba(240, 179, 91, 0.25)" stroke="#52645b" strokeWidth="2" />
              <text x="348" y="152" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">
                ★ STAGE-2 RE-ACCUMULATION
              </text>
              <text x="348" y="162" fill="#b13c3e" fontSize="8" fontFamily="monospace">
                Requires 50% distance from SMR
              </text>
            </g>

            {/* Explosive acceleration to Original Consolidation */}
            <g className={step >= 3 ? 'opacity-100' : 'opacity-10'}>
              <path d="M 370 160 L 480 80" fill="none" stroke="#166534" strokeWidth="4" />
              <circle cx="480" cy="80" r="6" fill="#166534" />
              <text x="440" y="65" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
                VIOLENT DELIVERY TO BSL ↑
              </text>
            </g>
          </g>
        </svg>
      );

    case 'five_opening_ranges':
      return (
        <div className="w-full h-full flex flex-col justify-center px-2 font-mono">
          <div className="text-center font-black text-xs uppercase mb-3 text-ink">
            THE 5 ALGORITHMIC OPENING RANGES (NEW YORK LOCAL TIME)
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
            {/* 1. Midnight */}
            <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-2 flex flex-col justify-between">
              <div>
                <span className="bg-ink/[0.08] text-ink-secondary px-1 py-0.5 text-[8px] font-mono uppercase rounded">Range 1</span>
                <p className="font-black text-[11px] mt-1 text-[#345f9e]">MIDNIGHT</p>
                <p className="font-bold text-[9px] text-ink-secondary">12:00 – 12:30 AM</p>
              </div>
              <p className="text-[8px] bg-surface-raised border border-ink/[0.1] rounded-lg p-1 mt-2">
                PO3 daily anchor; standard deviation projections (-1 to -3).
              </p>
            </div>

            {/* 2. London */}
            <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-2 flex flex-col justify-between">
              <div>
                <span className="bg-[#345f9e] text-on-brand px-1 py-0.5 text-[8px] font-black uppercase on-accent">Range 2</span>
                <p className="font-black text-[11px] mt-1 text-ink">LONDON</p>
                <p className="font-bold text-[9px] text-ink-secondary">1:30 – 2:00 AM</p>
              </div>
              <p className="text-[8px] bg-surface-raised border border-ink/[0.1] rounded-lg p-1 mt-2">
                First directional impulse; 3:30 AM delivery sweet spot.
              </p>
            </div>

            {/* 3. NY Killzone */}
            <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-2 flex flex-col justify-between">
              <div>
                <span className="bg-[#b13c3e] text-on-brand px-1 py-0.5 text-[8px] font-black uppercase on-accent">Range 3</span>
                <p className="font-black text-[11px] mt-1 text-[#b13c3e]">NY KILLZONE</p>
                <p className="font-bold text-[9px] text-ink-secondary">7:00 – 7:30 AM</p>
              </div>
              <p className="text-[8px] bg-surface-raised border border-ink/[0.1] rounded-lg p-1 mt-2">
                Universal for all instruments (Forex, indices, metals).
              </p>
            </div>

            {/* 4. AM Session */}
            <div className="bg-[#1A2234] border border-ink/[0.1] rounded-xl p-2 flex flex-col justify-between ">
              <div>
                <span className="bg-[#b13c3e] text-on-brand px-1 py-0.5 text-[8px] font-black uppercase on-accent">Master</span>
                <p className="font-black text-[11px] mt-1 text-ink">AM SESSION</p>
                <p className="font-bold text-[9px] text-[#b13c3e]">9:30 – 10:00 AM</p>
              </div>
              <p className="text-[8px] bg-surface-raised border border-ink/[0.1] rounded-lg p-1 mt-2 font-bold">
                Most powerful! Equities open; 0.5 to 2.5 SD targets.
              </p>
            </div>

            {/* 5. PM Session */}
            <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-2 flex flex-col justify-between">
              <div>
                <span className="bg-[#166534] text-on-brand px-1 py-0.5 text-[8px] font-black uppercase on-accent">Range 5</span>
                <p className="font-black text-[11px] mt-1 text-[#166534]">PM SESSION</p>
                <p className="font-bold text-[9px] text-ink-secondary">1:30 – 2:00 PM</p>
              </div>
              <p className="text-[8px] bg-surface-raised border border-ink/[0.1] rounded-lg p-1 mt-2">
                End of lunch; drives 2:50/3:15 macros and 3:50 MOC run.
              </p>
            </div>
          </div>
        </div>
      );

    case 'propulsion_block':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none">
          {/* Order Block Base */}
          <g>
            <rect x="80" y="160" width="80" height="60" fill="rgba(37,101,82, 0.25)" stroke="#345f9e" strokeWidth="2" strokeDasharray="3 3" />
            <text x="85" y="152" fill="#345f9e" fontSize="10" fontFamily="monospace" fontWeight="900">ORIGINAL ORDER BLOCK</text>
            
            {/* 50% Mean Threshold */}
            <line x1="80" y1="190" x2="350" y2="190" stroke="#b13c3e" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="210" y="184" fill="#b13c3e" fontSize="9" fontFamily="monospace" fontWeight="900">50% MEAN THRESHOLD (MT)</text>
          </g>

          {/* Displacement Away */}
          <line x1="170" y1="100" x2="170" y2="200" stroke="#166534" strokeWidth="2.5" />
          <rect x="160" y="110" width="20" height="70" fill="#166534" stroke="#52645b" strokeWidth="1" />

          {/* Retracement Candle tapping OB */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-30'}>
            <line x1="240" y1="130" x2="240" y2="185" stroke="#b13c3e" strokeWidth="2.5" />
            <rect x="230" y="140" width="20" height="35" fill="#b13c3e" stroke="#52645b" strokeWidth="1" />
            <circle cx="240" cy="185" r="4.5" fill="#166534" />
            <text x="255" y="160" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">
              Touches MT (Body Respects)
            </text>
          </g>

          {/* Propulsion Candle Activation */}
          <g className={step >= 2 ? 'opacity-100' : 'opacity-20'}>
            <rect x="225" y="125" width="160" height="28" fill="rgba(240, 179, 91, 0.25)" stroke="#52645b" strokeWidth="2" />
            <text x="232" y="143" fill="#223b35" fontSize="10" fontFamily="monospace" fontWeight="900">
              ⚡ PROPULSION BLOCK (PB)
            </text>
            <path d="M 270 170 L 400 60" fill="none" stroke="#166534" strokeWidth="4" />
            <text x="410" y="65" fill="#166534" fontSize="11" fontFamily="monospace" fontWeight="900">
              VIOLENT PROPULSION EXPANSION ↑
            </text>
          </g>
        </svg>
      );

    case 'implied_fvg':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono">
          {/* Candle 1 with long lower wick */}
          <line x1="140" y1="80" x2="140" y2="240" stroke="#166534" strokeWidth="2" />
          <rect x="130" y="100" width="20" height="50" fill="#166534" stroke="#52645b" strokeWidth="1" />
          <text x="110" y="260" fill="#223b35" fontSize="10">Candle 1</text>
          {/* Candle 1 wick CE */}
          <circle cx="140" cy="195" r="4" fill="#b13c3e" />
          <text x="50" y="198" fill="#b13c3e" fontSize="9" fontWeight="900">C.E. Lower Wick</text>

          {/* Candle 2 displacement without body void */}
          <line x1="220" y1="50" x2="220" y2="180" stroke="#166534" strokeWidth="3" />
          <rect x="208" y="60" width="24" height="100" fill="#166534" stroke="#52645b" strokeWidth="1.5" />
          <text x="200" y="260" fill="#223b35" fontSize="10">Candle 2</text>

          {/* Candle 3 with long upper wick overlapping */}
          <line x1="300" y1="90" x2="300" y2="220" stroke="#166534" strokeWidth="2" />
          <rect x="290" y="150" width="20" height="50" fill="#166534" stroke="#52645b" strokeWidth="1" />
          <text x="280" y="260" fill="#223b35" fontSize="10">Candle 3</text>
          {/* Candle 3 wick CE */}
          <circle cx="300" cy="120" r="4" fill="#345f9e" />
          <text x="320" y="125" fill="#345f9e" fontSize="9" fontWeight="900">C.E. Upper Wick</text>

          {/* The Implied FVG Corridor */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-20'}>
            <rect x="140" y="120" width="360" height="75" fill="rgba(37,101,82, 0.25)" stroke="#345f9e" strokeWidth="2" strokeDasharray="3 3" />
            <text x="350" y="160" fill="#345f9e" fontSize="11" fontWeight="900">
              IMPLIED FAIR VALUE GAP (Wick CE Space)
            </text>
          </g>

          {/* Retracement and precision reaction */}
          <g className={step >= 2 ? 'opacity-100' : 'opacity-10'}>
            <path d="M 330 170 Q 380 150 420 155" fill="none" stroke="#b13c3e" strokeWidth="2" strokeDasharray="2 2" />
            <circle cx="420" cy="155" r="5" fill="#166534" stroke="#52645b" strokeWidth="2" />
            <path d="M 420 155 L 500 50" fill="none" stroke="#166534" strokeWidth="3.5" />
            <text x="440" y="70" fill="#166534" fontSize="11" fontWeight="900">
              Expansion from Implied FVG ↑
            </text>
          </g>
        </svg>
      );

    case 'rejection_block':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono">
          {/* Series of candles testing highs with long wicks */}
          <g>
            <line x1="120" y1="80" x2="120" y2="220" stroke="#52645b" strokeWidth="2" />
            <rect x="110" y="120" width="20" height="70" fill="#166534" stroke="#52645b" strokeWidth="1" />

            <line x1="170" y1="50" x2="170" y2="210" stroke="#52645b" strokeWidth="2" />
            <rect x="160" y="110" width="20" height="60" fill="#b13c3e" stroke="#52645b" strokeWidth="1" />

            <line x1="220" y1="60" x2="220" y2="200" stroke="#52645b" strokeWidth="2" />
            <rect x="210" y="115" width="20" height="50" fill="#b13c3e" stroke="#52645b" strokeWidth="1" />
          </g>

          {/* Rejection Block Zone: from highest body close to wick extreme */}
          <rect x="160" y="50" width="380" height="60" fill="rgba(255, 107, 122, 0.25)" stroke="#b13c3e" strokeWidth="2" strokeDasharray="3 3" />
          <text x="260" y="42" fill="#b13c3e" fontSize="11" fontWeight="900">
            REJECTION BLOCK (Wick Extr. to Highest Body Close)
          </text>
          <line x1="160" y1="110" x2="540" y2="110" stroke="#52645b" strokeWidth="1.5" />
          <text x="400" y="125" fill="#223b35" fontSize="9" fontWeight="bold">
            Highest Body Close Line
          </text>

          {/* Retest & Rejection */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-20'}>
            <path d="M 280 180 Q 330 90 370 85" fill="none" stroke="#52645b" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="370" cy="85" r="5" fill="#b13c3e" />
            <path d="M 370 85 L 470 240" fill="none" stroke="#b13c3e" strokeWidth="3.5" />
            <text x="410" y="220" fill="#b13c3e" fontSize="11" fontWeight="900">
              Algorithmic Delimiter Rejection ↓
            </text>
          </g>
        </svg>
      );

    case 'mitigation_block':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono">
          {/* Swing High 1 */}
          <path d="M 80 180 L 160 80 L 220 160" fill="none" stroke="#52645b" strokeWidth="2.5" />
          <text x="130" y="70" fill="#223b35" fontSize="10" fontWeight="900">1. Swing High A</text>

          {/* Failure Swing (Swing High 2 fails to reach A) */}
          <path d="M 220 160 L 290 110 L 370 240" fill="none" stroke="#b13c3e" strokeWidth="2.5" />
          <circle cx="290" cy="110" r="4.5" fill="#CA8A04" />
          <text x="250" y="100" fill="#CA8A04" fontSize="10" fontWeight="900">
            2. FAILURE SWING (No Stop Raid)
          </text>

          {/* Mitigation Block horizontal corridor */}
          <rect x="220" y="150" width="300" height="30" fill="rgba(37,101,82, 0.25)" stroke="#705692" strokeWidth="2" strokeDasharray="3 3" />
          <text x="360" y="142" fill="#705692" fontSize="10" fontWeight="900">
            MITIGATION BLOCK (Unhedged Positions at Break-even)
          </text>

          {/* Retest and breakdown */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-25'}>
            <path d="M 370 240 Q 420 180 440 165" fill="none" stroke="#52645b" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="440" cy="165" r="5" fill="#b13c3e" />
            <path d="M 440 165 L 520 270" fill="none" stroke="#b13c3e" strokeWidth="3.5" />
            <text x="440" y="260" fill="#b13c3e" fontSize="10" fontWeight="900">
              Mitigation Selloff ↓
            </text>
          </g>
        </svg>
      );

    case 'standard_deviations':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono text-[9px]">
          {/* Anchor Range */}
          <line x1="60" y1="80" x2="560" y2="80" stroke="#52645b" strokeWidth="2" />
          <text x="70" y="75" fill="#223b35" fontWeight="900">0.0 (Manipulation Anchor High)</text>

          <line x1="60" y1="120" x2="560" y2="120" stroke="#52645b" strokeWidth="2" />
          <text x="70" y="115" fill="#223b35" fontWeight="900">-1.0 Dealing Range Anchor Low</text>

          {/* Projected Standard Deviations */}
          <line x1="60" y1="150" x2="560" y2="150" stroke="#345f9e" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="70" y="145" fill="#345f9e" fontWeight="bold">-1.5 SD (First Extension Zone)</text>

          <line x1="60" y1="180" x2="560" y2="180" stroke="#b13c3e" strokeWidth="2" strokeDasharray="4 4" />
          <text x="70" y="175" fill="#b13c3e" fontWeight="900">-2.0 SD (model-based Target / Previous Daily Low)</text>

          <line x1="60" y1="220" x2="560" y2="220" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="70" y="215" fill="#166534" fontWeight="bold">-2.5 SD (Extended Expansion)</text>

          <line x1="60" y1="270" x2="560" y2="270" stroke="#705692" strokeWidth="2" strokeDasharray="4 4" />
          <text x="70" y="265" fill="#705692" fontWeight="900">-4.0 SD (Macro Terminus Target)</text>

          {/* Replay Step Price Progression */}
          <path 
            d={
              step === 0 ? "M 120 80 L 180 120" :
              step === 1 ? "M 120 80 L 180 120 L 220 100 L 290 150" :
              step === 2 ? "M 120 80 L 180 120 L 220 100 L 290 150 L 330 135 L 420 180" :
              "M 120 80 L 180 120 L 220 100 L 290 150 L 330 135 L 420 180 L 460 170 L 530 270"
            }
            fill="none" 
            stroke="#b13c3e"
            strokeWidth="3.5" 
          />
        </svg>
      );

    case 'ny_continuation_reversal':
      return (
        <div className="w-full h-full flex items-center justify-around gap-4 p-2 font-mono text-xs">
          {/* Question node */}
          <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-3 text-center  flex-1">
            <span className="text-[#345f9e] font-black text-xs uppercase block mb-1">Key Question (2-5 AM)</span>
            <p className="font-bold text-[11px] text-ink">
              Did London tap a Higher Timeframe PD Array?
            </p>
          </div>

          {/* Branch A: Continuation */}
          <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-3 text-center  flex-1">
            <span className="bg-[#166534] text-on-brand px-2 py-0.5 font-black text-[10px] uppercase on-accent">NO → CONTINUATION</span>
            <p className="font-bold text-[10px] mt-2 text-ink">
              London generated directional engine.
            </p>
            <p className="text-[9px] text-ink-secondary mt-1">
              NY 8:30/9:30 retraces into London OB/PB, then expands toward HTF DOL.
            </p>
          </div>

          {/* Branch B: Reversal */}
          <div className="bg-surface-raised border border-ink/[0.1] rounded-xl p-3 text-center  flex-1">
            <span className="bg-[#b13c3e] text-on-brand px-2 py-0.5 font-black text-[10px] uppercase on-accent">YES → REVERSAL</span>
            <p className="font-bold text-[10px] mt-2 text-ink">
              London overextended into HTF array.
            </p>
            <p className="text-[9px] text-ink-secondary mt-1">
              NY prints 9:30 Judas sweep, forms CISD/MSS, and delivers reverse move into Asia/London lows.
            </p>
          </div>
        </div>
      );

    case 'first_presentation_fvg':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono">
          {/* 9:30 Open Line */}
          <line x1="40" y1="130" x2="580" y2="130" stroke="#52645b" strokeWidth="2" strokeDasharray="3 3" />
          <text x="45" y="122" fill="#223b35" fontSize="10" fontWeight="900">9:30 AM OPEN LINE</text>

          {/* Pre-Market Engineered SSL Swept after Open */}
          <line x1="120" y1="210" x2="260" y2="210" stroke="#345f9e" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="120" y="225" fill="#345f9e" fontSize="9" fontWeight="bold">Pre-Market Engineered SSL</text>

          {/* 9:30 AM Open Judas Raid below SSL */}
          <path d="M 160 130 L 210 230" fill="none" stroke="#b13c3e" strokeWidth="2.5" />
          <circle cx="210" cy="230" r="5" fill="#b13c3e" />
          <text x="160" y="248" fill="#b13c3e" fontSize="10" fontWeight="900">1. Stop Raid on SSL</text>

          {/* Real displacement after 9:31 AM */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-25'}>
            <path d="M 210 230 L 320 80" fill="none" stroke="#166534" strokeWidth="3.5" />
            <text x="240" y="70" fill="#166534" fontSize="10" fontWeight="900">2. Real Displacement (Post-9:31)</text>

            {/* 1st Presented FVG Box */}
            <rect x="250" y="110" width="160" height="35" fill="rgba(240, 179, 91, 0.25)" stroke="#CA8A04" strokeWidth="2" />
            <text x="260" y="132" fill="#223b35" fontSize="10" fontWeight="900">★ 1st PRESENTED FVG</text>
          </g>

          {/* Retest & Execution */}
          <g className={step >= 2 ? 'opacity-100' : 'opacity-20'}>
            <path d="M 320 80 Q 360 120 380 125" fill="none" stroke="#52645b" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="380" cy="125" r="5" fill="#166534" stroke="#52645b" strokeWidth="2" />
            <text x="390" y="125" fill="#166534" fontSize="10" fontWeight="900">3. Execution on 1st FVG Retest</text>
          </g>

          {/* Delivery to REQHs */}
          <g className={step >= 3 ? 'opacity-100' : 'opacity-10'}>
            <path d="M 380 125 L 480 40" fill="none" stroke="#166534" strokeWidth="4" />
            <line x1="200" y1="40" x2="560" y2="40" stroke="#345f9e" strokeWidth="2" strokeDasharray="4 4" />
            <text x="440" y="32" fill="#345f9e" fontSize="11" fontWeight="900">4. Delivery into REQHs / PSH ↑</text>
          </g>
        </svg>
      );

    case 'ote_model':
      return (
        <svg viewBox="0 0 620 300" className="w-full h-full max-h-72 select-none font-mono">
          {/* Swing Low to High Leg */}
          <path d="M 80 230 L 260 50" fill="none" stroke="#166534" strokeWidth="2.5" />
          <text x="70" y="245" fill="#223b35" fontSize="10" fontWeight="900">0.0 (Swing Low)</text>
          <text x="250" y="42" fill="#223b35" fontSize="10" fontWeight="900">1.0 (Swing High)</text>

          {/* OTE Zone Fibs */}
          <line x1="260" y1="140" x2="550" y2="140" stroke="#52645b" strokeWidth="1" strokeDasharray="3 3" />
          <text x="460" y="136" fill="#223b35" fontSize="9">0.50 Equilibrium</text>

          {/* OTE Shaded Corridor */}
          <rect x="260" y="160" width="280" height="32" fill="rgba(85, 230, 209, 0.25)" stroke="#166534" strokeWidth="1.5" />
          <line x1="260" y1="160" x2="540" y2="160" stroke="#166534" strokeWidth="1" />
          <text x="460" y="156" fill="#166534" fontSize="9" fontWeight="bold">0.62 Level</text>

          <line x1="260" y1="176" x2="540" y2="176" stroke="#b13c3e" strokeWidth="1.5" />
          <text x="440" y="172" fill="#b13c3e" fontSize="10" fontWeight="900">★ 0.705 SWEET SPOT</text>

          <line x1="260" y1="192" x2="540" y2="192" stroke="#166534" strokeWidth="1" />
          <text x="460" y="202" fill="#166534" fontSize="9" fontWeight="bold">0.79 Level</text>

          {/* Pullback into OTE */}
          <g className={step >= 1 ? 'opacity-100' : 'opacity-25'}>
            <path d="M 260 50 L 370 176" fill="none" stroke="#b13c3e" strokeWidth="2.5" />
            <circle cx="370" cy="176" r="6" fill="#166534" stroke="#52645b" strokeWidth="2" />
            <text x="320" y="220" fill="#166534" fontSize="10" fontWeight="900">
              Optimal Trade Entry (Aligned with SIBI/BISI)
            </text>
          </g>

          {/* Rally to Terminus */}
          <g className={step >= 2 ? 'opacity-100' : 'opacity-10'}>
            <path d="M 370 176 L 500 25" fill="none" stroke="#166534" strokeWidth="4" />
            <text x="460" y="20" fill="#345f9e" fontSize="11" fontWeight="900">
              Terminus Target (-0.27 / -0.62) ↑
            </text>
          </g>
        </svg>
      );

    case 'three_day_rule':
      return (
        <div className="w-full h-full flex items-center justify-around gap-3 p-2 font-mono text-xs">
          {/* Day 1 */}
          <div className="flex-1 bg-surface-raised border border-ink/[0.1] rounded-xl p-3 text-center ">
            <span className="text-[#345f9e] font-black uppercase text-[11px] block">Day -2 (Wednesday)</span>
            <p className="text-[10px] text-ink mt-1 font-bold">Wick Grade Reference</p>
            <div className="mt-2 bg-surface-raised border border-ink/[0.1] rounded-lg p-1.5 text-[9px] text-left">
              <p>• Upper Quad: 0.25</p>
              <p>• Premium Wick Grade</p>
              <p>• Implied C.E.</p>
            </div>
          </div>

          <span className="font-black text-base text-[#b13c3e]">+</span>

          {/* Day 2 */}
          <div className="flex-1 bg-surface-raised border border-ink/[0.1] rounded-xl p-3 text-center ">
            <span className="text-[#705692] font-black uppercase text-[11px] block">Day -1 (Thursday)</span>
            <p className="text-[10px] text-ink mt-1 font-bold">Previous Daily Range</p>
            <div className="mt-2 bg-surface-raised border border-ink/[0.1] rounded-lg p-1.5 text-[9px] text-left">
              <p>• Divide into Octants</p>
              <p>• Confluence at 0.375</p>
              <p>• Anchors LOD Target</p>
            </div>
          </div>

          <span className="font-black text-base text-[#166534]">=</span>

          {/* Today */}
          <div className="flex-1 bg-[#1A2234] border border-ink/[0.1] rounded-xl p-3 text-center ">
            <span className="text-ink font-black uppercase text-[11px] block">Today (Friday)</span>
            <p className="text-[10px] text-[#b13c3e] mt-1 font-black">Projected High/Low of Day</p>
            <div className="mt-2 bg-surface-raised border border-ink/[0.1] rounded-lg p-1.5 text-[9px] text-left font-bold">
              <p className="text-[#166534]">✓ Clustered Fib Nodes</p>
              <p className="text-[#345f9e]">✓ 3-Day Lookback Bound</p>
              <p className="text-[#b13c3e]">✓ LOD Anticipated Exactly</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
