import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Compass,
  Crosshair,
  GitCompare,
  Layers,
  Scale,
  Users,
} from 'lucide-react';
import {
  analyzeSuspensionTriad,
  calibrateContractLevel,
  computeReaperOverlap,
  evaluateSuspensionReaperConfluence,
  suspensionReaperMtfProfiles,
  type SuspensionCalcInput,
} from '../utils/suspensionReaperMath';
import { useTranslation } from '../i18n/TranslationProvider';
import { SuspensionReaperScene } from './SuspensionReaperScene';

export type SuspensionReaperVisualKind =
  | 'sr-comic-intro'
  | 'sr-3d-motion-cinema'
  | 'sr-dual-vi-calculator'
  | 'sr-reaper-sequence-lab'
  | 'sr-contract-calibration-lab'
  | 'sr-taxonomy-matrix'
  | 'sr-confluence-grader'
  | 'sr-mtf-nesting'
  | 'sr-mistakes-comic';

const SUSPENSION_PRESETS: Record<
  'bull-true' | 'bear-true' | 'single-vi' | 'outer-fvg',
  { label: string; input: SuspensionCalcInput }
> = {
  'bull-true': {
    label: 'Bullish Suspension (Overlapping Wicks)',
    input: {
      c1Open: 20404,
      c1High: 20422,
      c1Low: 20400,
      c1Close: 20416,
      c2Open: 20420,
      c2High: 20438,
      c2Low: 20415,
      c2Close: 20430,
      c3Open: 20435,
      c3High: 20462,
      c3Low: 20421,
      c3Close: 20456,
    },
  },
  'bear-true': {
    label: 'Bearish Suspension (Dual Body Gaps)',
    input: {
      c1Open: 20520,
      c1High: 20524,
      c1Low: 20502,
      c1Close: 20506,
      c2Open: 20501,
      c2High: 20507,
      c2Low: 20486,
      c2Close: 20491,
      c3Open: 20486,
      c3High: 20503,
      c3Low: 20464,
      c3Close: 20468,
    },
  },
  'single-vi': {
    label: 'Single Volume Imbalance (Not Suspended)',
    input: {
      c1Open: 20404,
      c1High: 20420,
      c1Low: 20400,
      c1Close: 20416,
      c2Open: 20421,
      c2High: 20434,
      c2Low: 20414,
      c2Close: 20431,
      c3Open: 20431,
      c3High: 20458,
      c3Low: 20426,
      c3Close: 20452,
    },
  },
  'outer-fvg': {
    label: 'Classic Outer-Wick FVG + Dual VI',
    input: {
      c1Open: 20400,
      c1High: 20414,
      c1Low: 20396,
      c1Close: 20410,
      c2Open: 20416,
      c2High: 20432,
      c2Low: 20415,
      c2Close: 20428,
      c3Open: 20434,
      c3High: 20460,
      c3Low: 20432,
      c3Close: 20456,
    },
  },
};

const REAPER_STAGES = [
  {
    step: 'Stage 1',
    title: 'Initial Leg 1 Bullish FVG',
    headline: 'A pre-sweep up-move creates Bullish FVG1 (20,512–20,524) directly beneath resistance.',
    detail: 'Learners record the exact FVG1 Low (20,512) and High (20,524) prior to any reversal claim.',
    candlesUpTo: 2,
  },
  {
    step: 'Stage 2',
    title: 'Sweep Extreme & Breaker Pivot',
    headline: 'Price sweeps above prior Buy-Side Liquidity to 20,546 and fails sharply downward.',
    detail: 'The up-close sweep cluster forms the structural origin of the upcoming Bearish Breaker Block.',
    candlesUpTo: 3,
  },
  {
    step: 'Stage 3',
    title: 'Decisive Close Validates Bearish IFVG',
    headline: 'A displacement candle closes cleanly at 20,506—below the entire FVG1 bottom (20,512).',
    detail: 'By closing beneath FVG1, old support flips into a Bearish Inverse Fair Value Gap (IFVG1).',
    candlesUpTo: 4,
  },
  {
    step: 'Stage 4',
    title: 'Opposing FVG2 Nests Inside IFVG1',
    headline: 'The breaking impulse leaves Bearish FVG2 (20,514–20,526) overlapping IFVG1 (20,512–20,524).',
    detail: 'Intersecting both intervals isolates the tight 10-point Bearish Reaper FVG overlap (20,514–20,524).',
    candlesUpTo: 5,
  },
  {
    step: 'Stage 5',
    title: 'First-Utilization Retest & Rejection',
    headline: 'Retracement wick taps 20,521 inside the nested overlap while bodies stay capped below 20,526.',
    detail: 'Closing above 20,526 invalidates the nested Reaper hypothesis; holding below supports downward continuation.',
    candlesUpTo: 7,
  },
];

const TAXONOMY_CARDS = [
  {
    id: 'suspension',
    name: 'Suspension Block',
    badge: 'Dual Body VIs',
    prerequisite: 'BodyLow(C2) > BodyHigh(C1) AND BodyLow(C3) > BodyHigh(C2) (or bearish mirror).',
    wickRule: 'Wicks can touch or overlap completely; focus strictly on Open/Close body voids.',
    stopAnchor: 'Outside outer edge of Initiation VI-1 plus tick buffer.',
  },
  {
    id: 'reaper',
    name: 'Reaper FVG (Reaper IFVG)',
    badge: 'Nested Breaker + 2 Gaps',
    prerequisite: 'Sweep + closing flip of FVG-1 into IFVG overlapped directly by opposing FVG-2.',
    wickRule: 'Evaluates IFVG/FVG-2 overlap alongside wick excursions around Breaker body.',
    stopAnchor: 'Above/below swept Breaker extreme or outer edge of nested overlap.',
  },
  {
    id: 'fvg',
    name: 'Classic 3-Candle FVG',
    badge: 'Outer-Wick Gap',
    prerequisite: 'Strict vertical space between C1 outer wick and C3 outer wick across C2.',
    wickRule: 'Zero overlap allowed between C1 High and C3 Low (bullish).',
    stopAnchor: 'Beyond C1 wick extreme or 50% CE depending on timeframe.',
  },
  {
    id: 'ob',
    name: 'Order Block (OB)',
    badge: 'Opposing Candle',
    prerequisite: 'Last down-close (bullish) or up-close (bearish) candle before structural displacement.',
    wickRule: 'Can overlap seamlessly with adjacent bodies—no body separation needed.',
    stopAnchor: 'Beyond OB full High/Low extreme or 50% Mean Threshold.',
  },
  {
    id: 'propulsion',
    name: 'Propulsion Block',
    badge: 'Secondary Re-Test OB',
    prerequisite: 'Secondary opposing candle dipping into 50% Mean Threshold of an active prior OB.',
    wickRule: 'Does not require dual Volume Imbalances; depends on prior OB mitigation.',
    stopAnchor: 'Immediate invalidation close beneath parent OB 50% Mean Threshold.',
  },
  {
    id: 'failed-ifvg',
    name: 'Ordinary Failed IFVG',
    badge: 'Separate Outcome',
    prerequisite: 'An IFVG that breaks back through on retest without Breaker + opposing FVG nesting.',
    wickRule: 'Tracks single gap break, test, and invalidation—do not auto-label as Reaper.',
    stopAnchor: 'Exit upon closing invalidation; do not assume automatic reversal entry.',
  },
];

const MISTAKES = [
  {
    tab: '1. Plain OB Mistaken for Suspension',
    wrongQuote: 'A red candle before an up-move! That must be a Suspension Block!',
    rightQuote: 'Zero body gaps exist here. Both Open and Close touch neighbors—this is just an Order Block.',
    fix: 'Always verify both VI-1 and VI-2 body separations numerically before marking a Suspension Block.',
  },
  {
    tab: '2. Every Failed IFVG Called Reaper',
    wrongQuote: 'My 1M IFVG broke! It is automatically a Reaper FVG—flip short at market!',
    rightQuote: 'No Breaker sweep and no nested opposing FVG overlap exist here—log it simply as a failed IFVG.',
    fix: 'Separate failed inversions from documented two-gap Breaker Reaper geometry.',
  },
  {
    tab: '3. Unadjusted Continuous Feed Copy',
    wrongQuote: 'NQ1! shows a Suspension gap at 20,420, so I placed my NQZ limit order right at 20,420.',
    rightQuote: 'Roll basis shifted NQ1! by +18 points—your active contract never even traded that number!',
    fix: 'Calibrate every execution boundary directly on the active front-month delivery contract.',
  },
  {
    tab: '4. Blind Midpoint Stop Inside Dual VIs',
    wrongQuote: 'I set a tiny 3-point stop right inside C2 Core so my first touch wins huge!',
    rightQuote: 'Price routinely fills Upper VI-2 and dips to test Lower VI-1 before deciding direction.',
    fix: 'Anchor invalidation past the outer edge of VI-1 or await lower-timeframe Reaper confirmation.',
  },
];

export function SuspensionReaperVisual({
  kind,
  staticOnly = false,
}: {
  kind: SuspensionReaperVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();

  // Visual 3: Dual-VI Suspension Lab state
  const [presetKey, setPresetKey] = useState<'bull-true' | 'bear-true' | 'single-vi' | 'outer-fvg'>('bull-true');
  const [c2OpenDelta, setC2OpenDelta] = useState<number>(0);

  // Visual 4: Reaper sequence stage
  const [reaperStageIdx, setReaperStageIdx] = useState<number>(3);

  // Visual 5: Contract drift calibration state
  const [contOffset, setContOffset] = useState<number>(18);
  const [contLow, setContLow] = useState<number>(20416);
  const [contHigh, setContHigh] = useState<number>(20435);

  // Visual 6: Taxonomy tab
  const [taxId, setTaxId] = useState<string>('suspension');

  // Visual 7: 6-gate confluence toggles
  const [gates, setGates] = useState({
    dualBodyGapVerified: true,
    breakerContextPresent: true,
    closeThroughIfvg: true,
    nestedOpposingFvg: true,
    contractFeedMatched: false,
    activeKillzoneWindow: true,
  });

  // Visual 8: MTF tier
  const [mtfIdx, setMtfIdx] = useState<number>(0);

  // Visual 9: Mistakes tab
  const [mistakeIdx, setMistakeIdx] = useState<number>(0);

  const activeInput = useMemo<SuspensionCalcInput>(() => {
    const base = { ...SUSPENSION_PRESETS[presetKey].input };
    base.c2Open = base.c2Open + c2OpenDelta;
    return base;
  }, [presetKey, c2OpenDelta]);

  const suspAnalysis = useMemo(() => analyzeSuspensionTriad(activeInput), [activeInput]);

  const contractResult = useMemo(
    () => calibrateContractLevel(contLow, contHigh, 20420, 20420 + contOffset, 0.25, 0.5),
    [contLow, contHigh, contOffset],
  );

  const confluenceResult = useMemo(() => evaluateSuspensionReaperConfluence(gates), [gates]);

  if (kind === 'sr-3d-motion-cinema') {
    return <SuspensionReaperScene staticOnly={staticOnly} />;
  }

  // Visual 1: Stick-Figure Comic Intro
  if (kind === 'sr-comic-intro') {
    return (
      <figure className="sr-figure" data-sr-figure="sr-comic-intro">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Users size={16} aria-hidden="true" />
            <span>{t('Illustrated Comparison: Why Overlapping Wicks Hide Dual Body Gaps')}</span>
          </span>
        </div>
        <svg viewBox="0 0 760 225" className="sr-svg" role="img" aria-label={t('Comic comparing overlapping wick perception with dual body Volume Imbalances')}>
          <rect x={14} y={14} width={356} height={196} rx={10} fill="var(--sr-surface-alt)" stroke="var(--sr-border)" />
          <rect x={390} y={14} width={356} height={196} rx={10} fill="var(--sr-surface-alt)" stroke="var(--sr-border)" />

          <text x={32} y={40} fontSize={12.5} fontWeight={700} fill="var(--sr-crimson)">
            {t('Wick-Only Scanner (Misses the Suspension)')}
          </text>
          <text x={408} y={40} fontSize={12.5} fontWeight={700} fill="var(--sr-emerald)">
            {t('Body-Gap Reader (Spots Dual Volume Imbalances)')}
          </text>

          {/* Left panel candles with overlapping wicks emphasized */}
          <line x1={92} y1={72} x2={92} y2={160} stroke="var(--sr-slate)" strokeWidth={2.2} />
          <rect x={80} y={108} width={24} height={42} rx={3} fill="var(--sr-emerald)" fillOpacity={0.45} />
          <line x1={142} y1={58} x2={142} y2={140} stroke="var(--sr-slate)" strokeWidth={2.2} />
          <rect x={130} y={78} width={24} height={32} rx={3} fill="var(--sr-copper)" fillOpacity={0.45} />
          <line x1={192} y1={44} x2={192} y2={118} stroke="var(--sr-slate)" strokeWidth={2.2} />
          <rect x={180} y={48} width={24} height={44} rx={3} fill="var(--sr-emerald)" fillOpacity={0.45} />
          <path d="M 92 74 L 142 138" stroke="var(--sr-crimson)" strokeWidth={2} strokeDasharray="4 3" />

          {/* Left stick figure */}
          <circle cx={292} cy={88} r={13} fill="none" stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <line x1={292} y1={101} x2={292} y2={144} stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <line x1={292} y1={115} x2={266} y2={104} stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <line x1={292} y1={115} x2={316} y2={128} stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <line x1={292} y1={144} x2={276} y2={176} stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <line x1={292} y1={144} x2={308} y2={176} stroke="var(--sr-crimson)" strokeWidth={2.2} />
          <rect x={218} y={142} width={140} height={54} rx={6} fill="var(--sr-surface)" stroke="var(--sr-crimson)" />
          <text x={228} y={162} fontSize={10.5} fontWeight={600} fill="var(--sr-ink)">
            {t('Wicks touch here!')}
          </text>
          <text x={228} y={180} fontSize={10} fill="var(--sr-muted)">
            {t('No classic FVG -> Ignore.')}
          </text>

          {/* Right panel candles with two bright VI bands */}
          <rect x={410} y={102} width={174} height={14} rx={2} fill="var(--sr-emerald)" fillOpacity={0.25} stroke="var(--sr-emerald)" />
          <rect x={410} y={66} width={174} height={14} rx={2} fill="var(--sr-emerald)" fillOpacity={0.25} stroke="var(--sr-emerald)" />
          <line x1={454} y1={86} x2={454} y2={160} stroke="var(--sr-slate)" strokeWidth={1.8} />
          <rect x={442} y={116} width={24} height={36} rx={3} fill="var(--sr-emerald)" />
          <line x1={504} y1={58} x2={504} y2={136} stroke="var(--sr-slate)" strokeWidth={1.8} />
          <rect x={492} y={80} width={24} height={22} rx={3} fill="var(--sr-copper)" />
          <line x1={554} y1={42} x2={554} y2={106} stroke="var(--sr-slate)" strokeWidth={1.8} />
          <rect x={542} y={44} width={24} height={22} rx={3} fill="var(--sr-emerald)" />

          {/* Right stick figure */}
          <circle cx={668} cy={86} r={13} fill="none" stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <line x1={668} y1={99} x2={668} y2={142} stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <line x1={668} y1={114} x2={638} y2={100} stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <line x1={668} y1={114} x2={694} y2={102} stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <line x1={668} y1={142} x2={652} y2={176} stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <line x1={668} y1={142} x2={684} y2={176} stroke="var(--sr-emerald)" strokeWidth={2.2} />
          <rect x={596} y={142} width={138} height={54} rx={6} fill="var(--sr-surface)" stroke="var(--sr-emerald)" />
          <text x={606} y={162} fontSize={10.5} fontWeight={600} fill="var(--sr-ink)">
            {t('VI-1 + VI-2 visible!')}
          </text>
          <text x={606} y={180} fontSize={10} fill="var(--sr-muted)">
            {t('C2 body sits suspended.')}
          </text>
        </svg>
        <figcaption className="sr-figcaption">
          {t('Synthetic illustration: overlapping shadows mask classic outer-wick FVGs while leaving two separated body-to-body Volume Imbalances intact.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 3: Dual-VI Suspension Block Calculator & FVG Comparator
  if (kind === 'sr-dual-vi-calculator') {
    const allPrices = [
      activeInput.c1High,
      activeInput.c1Low,
      activeInput.c2High,
      activeInput.c2Low,
      activeInput.c3High,
      activeInput.c3Low,
    ];
    const minP = Math.min(...allPrices) - 4;
    const maxP = Math.max(...allPrices) + 4;
    const span = Math.max(1, maxP - minP);
    const scaleY = (p: number) => 205 - ((p - minP) / span) * 172;
    const candles = [
      { id: 'C1', o: activeInput.c1Open, h: activeInput.c1High, l: activeInput.c1Low, c: activeInput.c1Close, x: 110 },
      { id: 'C2', o: activeInput.c2Open, h: activeInput.c2High, l: activeInput.c2Low, c: activeInput.c2Close, x: 240 },
      { id: 'C3', o: activeInput.c3Open, h: activeInput.c3High, l: activeInput.c3Low, c: activeInput.c3Close, x: 370 },
    ];

    return (
      <figure className="sr-figure" data-sr-figure="sr-dual-vi-calculator">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive Suspension Dual-VI Lab & Classic FVG Comparator')}</span>
          </span>
          <div className="sr-controls" role="group" aria-label={t('Choose candle preset')}>
            {(Object.keys(SUSPENSION_PRESETS) as Array<keyof typeof SUSPENSION_PRESETS>).map((key) => (
              <button
                key={key}
                type="button"
                className={`sr-btn ${presetKey === key ? 'is-active' : ''}`}
                onClick={() => {
                  setPresetKey(key);
                  setC2OpenDelta(0);
                }}
              >
                {t(SUSPENSION_PRESETS[key].label)}
              </button>
            ))}
          </div>
        </div>

        <div className="sr-grid-2">
          <div className="sr-svg-wrap">
            <svg viewBox="0 0 540 230" className="sr-svg" role="img" aria-label={t('Suspension Block OHLC coordinate inspection chart')}>
              <rect x={16} y={14} width={410} height={202} rx={8} fill="var(--sr-surface-alt)" stroke="var(--sr-border)" />

              {suspAnalysis.hasLowerBodyGap && (
                <rect
                  x={24}
                  y={Math.min(scaleY(suspAnalysis.lowerGapLow), scaleY(suspAnalysis.lowerGapHigh))}
                  width={394}
                  height={Math.max(4, Math.abs(scaleY(suspAnalysis.lowerGapHigh) - scaleY(suspAnalysis.lowerGapLow)))}
                  fill="var(--sr-emerald)"
                  fillOpacity={0.22}
                  stroke="var(--sr-emerald)"
                />
              )}

              {suspAnalysis.hasUpperBodyGap && (
                <rect
                  x={24}
                  y={Math.min(scaleY(suspAnalysis.upperGapLow), scaleY(suspAnalysis.upperGapHigh))}
                  width={394}
                  height={Math.max(4, Math.abs(scaleY(suspAnalysis.upperGapHigh) - scaleY(suspAnalysis.upperGapLow)))}
                  fill="var(--sr-crimson)"
                  fillOpacity={0.22}
                  stroke="var(--sr-crimson)"
                />
              )}

              {candles.map((bar, idx) => {
                const up = bar.c >= bar.o;
                const col = idx === 1 ? 'var(--sr-copper)' : up ? 'var(--sr-emerald)' : 'var(--sr-crimson)';
                const top = Math.min(scaleY(bar.o), scaleY(bar.c));
                const bh = Math.max(5, Math.abs(scaleY(bar.o) - scaleY(bar.c)));
                return (
                  <g key={bar.id}>
                    <line x1={bar.x} y1={scaleY(bar.h)} x2={bar.x} y2={scaleY(bar.l)} stroke={col} strokeWidth={2} />
                    <rect x={bar.x - 18} y={top} width={36} height={bh} rx={3} fill={col} />
                    <text x={bar.x} y={225} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--sr-muted)">
                      {bar.id}
                    </text>
                  </g>
                );
              })}

              <text x={436} y={48} fontSize={10.5} fontWeight={700} fill="var(--sr-ink)">
                {t('Dual VIs:')} {t(suspAnalysis.isTrueSuspensionBlock ? 'Yes' : 'No')}
              </text>
              <text x={436} y={76} fontSize={10} fill="var(--sr-muted)">
                {t('Classic FVG:')} {t(suspAnalysis.isClassicOuterWickFvg ? 'Open' : 'Wick Overlap')}
              </text>
              <text x={436} y={104} fontSize={10} fill="var(--sr-emerald)">
                {t('Lower VI:')} {suspAnalysis.lowerGapLow.toFixed(0)}–{suspAnalysis.lowerGapHigh.toFixed(0)}
              </text>
              <text x={436} y={132} fontSize={10} fill="var(--sr-crimson)">
                {t('Upper VI:')} {suspAnalysis.upperGapLow.toFixed(0)}–{suspAnalysis.upperGapHigh.toFixed(0)}
              </text>
              <text x={436} y={160} fontSize={10} fill="var(--sr-copper)">
                {t('Core 50%:')} {suspAnalysis.coreMidpoint.toFixed(1)}
              </text>
            </svg>
          </div>

          <div className="sr-metrics-panel">
            <div className="sr-slider-row">
              <label htmlFor="sr-c2-shift">
                {t('Shift Candle 2 Open Price (pts):')} <bdi className="sr-num">{c2OpenDelta >= 0 ? `+${c2OpenDelta}` : c2OpenDelta}</bdi>
              </label>
              <input
                id="sr-c2-shift"
                type="range"
                min={-12}
                max={12}
                step={1}
                value={c2OpenDelta}
                onChange={(e) => setC2OpenDelta(Number(e.target.value))}
              />
            </div>

            <div className="sr-stat-grid">
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Classification Verdict')}</span>
                <strong className="sr-stat-val">{t(suspAnalysis.statusLabel)}</strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Core C2 Body Range')}</span>
                <strong className="sr-stat-val sr-num">
                  {suspAnalysis.coreBodyLow.toFixed(0)} – {suspAnalysis.coreBodyHigh.toFixed(0)}
                </strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Total Envelope Midpoint')}</span>
                <strong className="sr-stat-val sr-num">{suspAnalysis.envelopeMidpoint.toFixed(1)}</strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Wicks Overlap?')}</span>
                <strong className="sr-stat-val">
                  {t(suspAnalysis.wicksOverlapBetweenBodies ? 'Yes (Classic FVG Hidden)' : 'Open Space Across Wicks')}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <figcaption className="sr-figcaption">
          {t('Synthetic NQ-style triad: shifting Candle 2 open shows how tiny body-gap adjustments change a Single VI into a True Suspension Block.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 4: Breaker-to-Reaper Nested IFVG Sequence Dissector
  if (kind === 'sr-reaper-sequence-lab') {
    const activeStage = REAPER_STAGES[reaperStageIdx];
    const overlap = computeReaperOverlap(20512, 20524, 20514, 20526);
    const bars = [
      { l: 'B1', o: 20500, h: 20512, lo: 20498, c: 20510 },
      { l: 'B2', o: 20510, h: 20536, lo: 20509, c: 20532 },
      { l: 'SW', o: 20532, h: 20546, lo: 20524, c: 20526 },
      { l: 'BRK', o: 20526, h: 20528, lo: 20504, c: 20506 },
      { l: 'SIBI', o: 20506, h: 20514, lo: 20490, c: 20492 },
      { l: 'RET', o: 20492, h: 20521, lo: 20491, c: 20509 },
      { l: 'DROP', o: 20509, h: 20511, lo: 20478, c: 20482 },
    ].slice(0, activeStage.candlesUpTo);

    const scaleY = (p: number) => 205 - ((p - 20472) / 80) * 176;

    return (
      <figure className="sr-figure" data-sr-figure="sr-reaper-sequence-lab">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Interactive Breaker-to-Reaper Sequence Dissector')}</span>
          </span>
          <div className="sr-controls" role="group" aria-label={t('Select Reaper formation step')}>
            {REAPER_STAGES.map((st, idx) => (
              <button
                key={st.step}
                type="button"
                className={`sr-btn ${reaperStageIdx === idx ? 'is-active' : ''}`}
                onClick={() => setReaperStageIdx(idx)}
              >
                {t(st.step)}
              </button>
            ))}
          </div>
        </div>

        <div className="sr-grid-2">
          <div className="sr-svg-wrap">
            <svg viewBox="0 0 540 226" className="sr-svg" role="img" aria-label={t('Step-by-step Reaper FVG nested overlap sequence')}>
              <rect x={16} y={12} width={410} height={198} rx={8} fill="var(--sr-surface-alt)" stroke="var(--sr-border)" />

              {/* Bullish FVG1 / IFVG1 */}
              <rect
                x={24}
                y={scaleY(20524)}
                width={394}
                height={Math.abs(scaleY(20512) - scaleY(20524))}
                fill={reaperStageIdx >= 2 ? 'var(--sr-crimson)' : 'var(--sr-emerald)'}
                fillOpacity={0.2}
                stroke={reaperStageIdx >= 2 ? 'var(--sr-crimson)' : 'var(--sr-emerald)'}
                strokeDasharray="4 3"
              />

              {/* Opposing Bearish FVG2 */}
              {reaperStageIdx >= 3 && (
                <rect
                  x={24}
                  y={scaleY(20526)}
                  width={394}
                  height={Math.abs(scaleY(20514) - scaleY(20526))}
                  fill="var(--sr-copper)"
                  fillOpacity={0.2}
                  stroke="var(--sr-copper)"
                />
              )}

              {/* Nested Reaper Overlap */}
              {reaperStageIdx >= 3 && (
                <rect
                  x={24}
                  y={scaleY(overlap.reaperHigh)}
                  width={394}
                  height={Math.abs(scaleY(overlap.reaperLow) - scaleY(overlap.reaperHigh))}
                  fill="var(--sr-crimson)"
                  fillOpacity={0.28}
                  stroke="var(--sr-crimson)"
                  strokeWidth={1.6}
                />
              )}

              {bars.map((b, i) => {
                const cx = 56 + i * 54;
                const up = b.c >= b.o;
                const col = up ? 'var(--sr-emerald)' : 'var(--sr-crimson)';
                const top = Math.min(scaleY(b.o), scaleY(b.c));
                const h = Math.max(5, Math.abs(scaleY(b.o) - scaleY(b.c)));
                return (
                  <g key={b.l}>
                    <line x1={cx} y1={scaleY(b.h)} x2={cx} y2={scaleY(b.lo)} stroke={col} strokeWidth={1.8} />
                    <rect x={cx - 11} y={top} width={22} height={h} rx={2.5} fill={col} />
                    <text x={cx} y={222} textAnchor="middle" fontSize={10} fill="var(--sr-muted)">
                      {b.l}
                    </text>
                  </g>
                );
              })}

              <text x={436} y={54} fontSize={10} fontWeight={700} fill="var(--sr-crimson)">
                {t('IFVG1')}: 20,512–20,524
              </text>
              <text x={436} y={84} fontSize={10} fontWeight={700} fill="var(--sr-copper)">
                {t('FVG2')}: 20,514–20,526
              </text>
              <text x={436} y={114} fontSize={10} fontWeight={700} fill="var(--sr-ink)">
                {t('Nested Window')}: {overlap.reaperLow}–{overlap.reaperHigh}
              </text>
            </svg>
          </div>

          <div className="sr-stage-card">
            <span className="sr-stage-tag">{t(activeStage.step)}</span>
            <h3>{t(activeStage.title)}</h3>
            <p className="sr-stage-lead">{t(activeStage.headline)}</p>
            <p>{t(activeStage.detail)}</p>
            <div className="sr-stat-grid">
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Reaper Overlap Interval')}</span>
                <strong className="sr-stat-val sr-num">
                  {overlap.reaperLow} – {overlap.reaperHigh}
                </strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('50% Nested Midpoint')}</span>
                <strong className="sr-stat-val sr-num">{overlap.reaperMidpoint.toFixed(1)}</strong>
              </div>
            </div>
          </div>
        </div>
        <figcaption className="sr-figcaption">
          {t('Chronological Reaper construction: notice how Bearish FVG2 only becomes a Reaper overlap after FVG1 suffers a closing breach inside the Breaker leg.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 5: Continuous vs. Front-Month Contract Basis Lab
  if (kind === 'sr-contract-calibration-lab') {
    return (
      <figure className="sr-figure" data-sr-figure="sr-contract-calibration-lab">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Continuous (NQ1!) vs. Front-Month Delivery Contract Calibrator')}</span>
          </span>
        </div>

        <div className="sr-grid-2">
          <div className="sr-metrics-panel">
            <div className="sr-slider-row">
              <label htmlFor="sr-basis-offset">
                {t('Continuous Roll Premium Offset (pts):')} <bdi className="sr-num">{contOffset >= 0 ? `+${contOffset}` : contOffset}</bdi>
              </label>
              <input
                id="sr-basis-offset"
                type="range"
                min={-30}
                max={45}
                step={1}
                value={contOffset}
                onChange={(e) => setContOffset(Number(e.target.value))}
              />
            </div>

            <div className="sr-slider-row">
              <label htmlFor="sr-cont-low">
                {t('Continuous Suspension Low (pts):')} <bdi className="sr-num">{contLow}</bdi>
              </label>
              <input
                id="sr-cont-low"
                type="range"
                min={20400}
                max={20428}
                step={1}
                value={contLow}
                onChange={(e) => setContLow(Math.min(contHigh - 2, Number(e.target.value)))}
              />
            </div>

            <div className="sr-slider-row">
              <label htmlFor="sr-cont-high">
                {t('Continuous Suspension High (pts):')} <bdi className="sr-num">{contHigh}</bdi>
              </label>
              <input
                id="sr-cont-high"
                type="range"
                min={20420}
                max={20455}
                step={1}
                value={contHigh}
                onChange={(e) => setContHigh(Math.max(contLow + 2, Number(e.target.value)))}
              />
            </div>
          </div>

          <div className="sr-metrics-panel">
            <div className="sr-stat-grid">
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Continuous Reference Span')}</span>
                <strong className="sr-stat-val sr-num">
                  {contLow.toFixed(2)} – {contHigh.toFixed(2)}
                </strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('Active Front-Month Target Span')}</span>
                <strong className="sr-stat-val sr-num">
                  {contractResult.frontLow.toFixed(2)} – {contractResult.frontHigh.toFixed(2)}
                </strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('MNQ Tick-Aligned Midpoint (0.25)')}</span>
                <strong className="sr-stat-val sr-num">{contractResult.alignedFrontMidpoint.toFixed(2)}</strong>
              </div>
              <div className="sr-stat-card">
                <span className="sr-stat-label">{t('MNQ Zone Depth (Ticks / USD per Contract)')}</span>
                <strong className="sr-stat-val sr-num">
                  <bdi>{contractResult.zoneTickDepth}</bdi> {t('ticks')} ($<bdi>{(contractResult.zoneTickDepth * 0.5).toFixed(2)}</bdi>)
                </strong>
              </div>
            </div>
            <p className="sr-callout-mini">
              {t('Always chart, measure, and trigger directly from the active delivery month rather than copying unadjusted continuous coordinates.')}
            </p>
          </div>
        </div>
        <figcaption className="sr-figcaption">
          {t('Synthetic MNQ calibration: a continuous roll basis shifts identical structural levels away from live execution ticks.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 6: 6-Card Structural Taxonomy Explorer
  if (kind === 'sr-taxonomy-matrix') {
    const active = TAXONOMY_CARDS.find((c) => c.id === taxId) || TAXONOMY_CARDS[0];
    return (
      <figure className="sr-figure" data-sr-figure="sr-taxonomy-matrix">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Scale size={16} aria-hidden="true" />
            <span>{t('Structural Taxonomy Explorer: Suspension vs. Reaper vs. Standard Blocks')}</span>
          </span>
          <div className="sr-controls" role="group" aria-label={t('Select block concept')}>
            {TAXONOMY_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`sr-btn ${taxId === card.id ? 'is-active' : ''}`}
                onClick={() => setTaxId(card.id)}
              >
                {t(card.name)}
              </button>
            ))}
          </div>
        </div>

        <div className="sr-taxonomy-detail">
          <div className="sr-taxonomy-header">
            <h3>{t(active.name)}</h3>
            <span className="sr-taxonomy-badge">{t(active.badge)}</span>
          </div>
          <div className="sr-stat-grid">
            <div className="sr-stat-card">
              <span className="sr-stat-label">{t('Mandatory OHLC Prerequisite')}</span>
              <p className="sr-stat-body">{t(active.prerequisite)}</p>
            </div>
            <div className="sr-stat-card">
              <span className="sr-stat-label">{t('Wick Overlap Rule')}</span>
              <p className="sr-stat-body">{t(active.wickRule)}</p>
            </div>
            <div className="sr-stat-card">
              <span className="sr-stat-label">{t('Invalidation / Stop Reference')}</span>
              <p className="sr-stat-body">{t(active.stopAnchor)}</p>
            </div>
          </div>
        </div>
        <figcaption className="sr-figcaption">
          {t('Comparing prerequisites prevents mislabeling plain Order Blocks as Suspension Blocks or ordinary failed IFVGs as Reapers.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 7: Interactive 6-Gate Confluence Grader
  if (kind === 'sr-confluence-grader') {
    const toggleList: Array<[keyof typeof gates, string]> = [
      ['dualBodyGapVerified', '1. Dual Body-Gap Suspension or Verified Nested Overlap'],
      ['breakerContextPresent', '2. Prior Swing Sweep & Opposing Breaker Context'],
      ['closeThroughIfvg', '3. Explicit Closing Breach Validating IFVG'],
      ['nestedOpposingFvg', '4. Opposing FVG Aligns Inside Inverted Zone'],
      ['contractFeedMatched', '5. Active Delivery Contract Matched (No Basis Drift)'],
      ['activeKillzoneWindow', '6. Inside Active NY or London Session Window'],
    ];
    return (
      <figure className="sr-figure" data-sr-figure="sr-confluence-grader">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Interactive 6-Gate Suspension & Reaper Confluence Grader')}</span>
          </span>
        </div>

        <div className="sr-grid-2">
          <div className="sr-gate-toggles">
            {toggleList.map(([key, label]) => (
              <label key={key} className="sr-gate-item">
                <input
                  type="checkbox"
                  checked={gates[key]}
                  onChange={() => setGates((prev) => ({ ...prev, [key]: !prev[key] }))}
                />
                <span>{t(label)}</span>
              </label>
            ))}
          </div>

          <div className="sr-score-panel">
            <div className="sr-score-head">
              <span className="sr-stat-label">{t('Confluence Score')}</span>
              <strong className="sr-score-number sr-num">{confluenceResult.score} / 6</strong>
            </div>
            <p className="sr-score-tier">{t(confluenceResult.tier)}</p>
            {confluenceResult.missing.length > 0 ? (
              <ul className="sr-missing-list">
                {confluenceResult.missing.map((m) => (
                  <li key={m}>{t(m)}</li>
                ))}
              </ul>
            ) : (
              <p className="sr-all-ok">
                <CheckCircle2 size={15} aria-hidden="true" />{' '}
                <span>{t('All six structural, feed, and session gates satisfied for controlled replay study.')}</span>
              </p>
            )}
          </div>
        </div>
        <figcaption className="sr-figcaption">
          {t('A scoring rubric helps filter weak Asian micro-gaps from high-conviction London/NY Breaker + Suspension setups.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 8: Multi-Timeframe Nesting Explorer
  if (kind === 'sr-mtf-nesting') {
    const profile = suspensionReaperMtfProfiles[mtfIdx];
    return (
      <figure className="sr-figure" data-sr-figure="sr-mtf-nesting">
        <div className="sr-figure-head">
          <span className="sr-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Multi-Timeframe Fractal Nesting (HTF Suspension -> LTF Reaper Trigger)')}</span>
          </span>
          <div className="sr-controls" role="group" aria-label={t('Choose trading horizon')}>
            {suspensionReaperMtfProfiles.map((p, idx) => (
              <button
                key={p.tier}
                type="button"
                className={`sr-btn ${mtfIdx === idx ? 'is-active' : ''}`}
                onClick={() => setMtfIdx(idx)}
              >
                {t(p.tier)}
              </button>
            ))}
          </div>
        </div>

        <div className="sr-mtf-chain">
          <div className="sr-mtf-node">
            <span className="sr-stat-label">{t('Narrative Bias TF')}</span>
            <strong className="sr-stat-val sr-num">{t(profile.narrativeTf)}</strong>
          </div>
          <ArrowRight size={18} className="sr-mtf-arrow" aria-hidden="true" />
          <div className="sr-mtf-node">
            <span className="sr-stat-label">{t('Suspension / Breaker Shelf')}</span>
            <strong className="sr-stat-val sr-num">{t(profile.zoneTf)}</strong>
          </div>
          <ArrowRight size={18} className="sr-mtf-arrow" aria-hidden="true" />
          <div className="sr-mtf-node">
            <span className="sr-stat-label">{t('Nested Reaper LTF Trigger')}</span>
            <strong className="sr-stat-val sr-num">{t(profile.triggerTf)}</strong>
          </div>
        </div>
        <div className="sr-mtf-notes">
          <p>
            <strong>{t('Operational Flow')}:</strong> {t(profile.primaryRole)}
          </p>
          <p>
            <strong>{t('Structural Invalidation')}:</strong> {t(profile.invalidationRule)}
          </p>
        </div>
        <figcaption className="sr-figcaption">
          {t('Nesting prevents stepping blindly in front of higher-timeframe momentum with isolated 1M candles.')}
        </figcaption>
      </figure>
    );
  }

  // Visual 9: 4-Tab Stick-Figure Mistakes Comic
  const m = MISTAKES[mistakeIdx];
  return (
    <figure className="sr-figure" data-sr-figure="sr-mistakes-comic">
      <div className="sr-figure-head">
        <span className="sr-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('Common Mistakes Comic: 4 Recurring Errors & Corrections')}</span>
        </span>
        <div className="sr-controls" role="group" aria-label={t('Select mistake scenario')}>
          {MISTAKES.map((item, idx) => (
            <button
              key={item.tab}
              type="button"
              className={`sr-btn ${mistakeIdx === idx ? 'is-active' : ''}`}
              onClick={() => setMistakeIdx(idx)}
            >
              {t(item.tab)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 760 198" className="sr-svg" role="img" aria-label={t(m.tab)}>
        <rect x={14} y={14} width={356} height={170} rx={10} fill="var(--sr-surface-alt)" stroke="var(--sr-crimson)" />
        <rect x={390} y={14} width={356} height={170} rx={10} fill="var(--sr-surface-alt)" stroke="var(--sr-emerald)" />

        <text x={30} y={38} fontSize={12} fontWeight={700} fill="var(--sr-crimson)">
          {t('Impulsive Trap')}
        </text>
        <text x={406} y={38} fontSize={12} fontWeight={700} fill="var(--sr-emerald)">
          {t('Disciplined Correction')}
        </text>

        {/* Left stick figure */}
        <circle cx={66} cy={84} r={12} fill="none" stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <line x1={66} y1={96} x2={66} y2={136} stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <line x1={66} y1={110} x2={46} y2={98} stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <line x1={66} y1={110} x2={88} y2={100} stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <line x1={66} y1={136} x2={52} y2={166} stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <line x1={66} y1={136} x2={80} y2={166} stroke="var(--sr-crimson)" strokeWidth={2.2} />
        <foreignObject x={98} y={54} width={256} height={116}>
          <div className="sr-comic-bubble sr-comic-wrong">{t(m.wrongQuote)}</div>
        </foreignObject>

        {/* Right stick figure */}
        <circle cx={442} cy={84} r={12} fill="none" stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <line x1={442} y1={96} x2={442} y2={136} stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <line x1={442} y1={110} x2={422} y2={122} stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <line x1={442} y1={110} x2={466} y2={98} stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <line x1={442} y1={136} x2={428} y2={166} stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <line x1={442} y1={136} x2={456} y2={166} stroke="var(--sr-emerald)" strokeWidth={2.2} />
        <foreignObject x={474} y={54} width={256} height={116}>
          <div className="sr-comic-bubble sr-comic-right">{t(m.rightQuote)}</div>
        </foreignObject>
      </svg>

      <figcaption className="sr-figcaption">
        <strong>{t('Fix')}:</strong> {t(m.fix)}
      </figcaption>
    </figure>
  );
}
