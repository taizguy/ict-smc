import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowLeftRight,
  Compass,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Scale,
  SkipForward,
  SlidersHorizontal,
  Users,
  Zap,
} from 'lucide-react';
import {
  evaluateCurveSymmetry,
  evaluateDealingRange,
  evaluateSmrTrigger,
  mtfPairingProfiles,
  syntheticMmbmFailureBranch,
  syntheticMmbmSeries,
} from '../utils/marketMakerMath';
import { useTranslation } from '../i18n/TranslationProvider';

export type MarketMakerVisualKind =
  | 'mmbm-comic-intro'
  | 'animated-mmbm-lifecycle'
  | 'mmbm-mmsm-symmetry'
  | 'model6-equilibrium-gauge'
  | 'lrlr-vs-hrlr-characters'
  | 'cisd-vs-smr-detector'
  | 'left-to-right-flip'
  | 'mtf-alignment-matrix';

function StickPerson({
  x,
  y,
  color,
  pose = 'stand',
  scale = 1,
}: {
  x: number;
  y: number;
  color: string;
  pose?: 'stand' | 'panic' | 'wait' | 'sprint' | 'hurdle' | 'cheer';
  scale?: number;
}) {
  const arms =
    pose === 'panic'
      ? 'M -12 -14 L 0 -8 L 12 -18'
      : pose === 'cheer'
        ? 'M -13 -22 L 0 -10 L 13 -22'
        : pose === 'sprint'
          ? 'M -13 -8 L 0 -12 L 13 -16'
          : pose === 'hurdle'
            ? 'M -12 -16 L 0 -10 L 12 -4'
            : pose === 'wait'
              ? 'M -9 -6 L 0 -10 L 9 -6'
              : 'M -10 -10 L 0 -12 L 10 -10';

  const legs =
    pose === 'sprint'
      ? 'M -11 18 L 0 4 L 14 14'
      : pose === 'hurdle'
        ? 'M -14 10 L 0 4 L 15 6'
        : pose === 'panic'
          ? 'M -10 17 L 0 4 L 10 17'
          : 'M -8 18 L 0 4 L 8 18';

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} aria-hidden="true">
      <circle cx={0} cy={-24} r={7} fill="none" stroke={color} strokeWidth={2.4} />
      <path d="M 0 -17 L 0 4" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <path d={arms} fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={legs} fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function ComicIntro({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(staticOnly ? 2 : 0);

  const captions = [
    t('Stage 1: Sideways Original Consolidation sits quietly before any breakout chase begins.'),
    t('Stage 2: As price steps lower in two shelves, impatient sellers short every drop and stack buy stops overhead.'),
    t('Stage 3: Price sweeps the low into HTF Discount, snaps upward with displacement (SMR), and enters Low-Risk Buy.'),
    t('Stage 4: Climbing across the same shelves, price clears the upper box (Terminus) where late shorts unwind.'),
  ];

  const stepLabels = [
    t('1. Upper Box'),
    t('2. Panic Shorts'),
    t('3. SMR Sweep'),
    t('4. Return Home'),
  ];

  const chaserPos =
    step === 0 ? { x: 268, y: 132, pose: 'stand' as const }
    : step === 1 ? { x: 268, y: 178, pose: 'panic' as const }
    : step === 2 ? { x: 328, y: 214, pose: 'panic' as const }
    : { x: 472, y: 185, pose: 'panic' as const };

  const plannerPos =
    step === 0 ? { x: 485, y: 222, pose: 'wait' as const }
    : step === 1 ? { x: 485, y: 222, pose: 'wait' as const }
    : step === 2 ? { x: 495, y: 210, pose: 'stand' as const }
    : { x: 645, y: 108, pose: 'cheer' as const };

  const pathD =
    step === 0
      ? 'M 65 95 L 135 90 L 175 102 L 210 92'
      : step === 1
        ? 'M 65 95 L 135 90 L 175 102 L 210 92 L 245 142 L 275 135 L 305 182 L 330 175'
        : step === 2
          ? 'M 65 95 L 135 90 L 175 102 L 210 92 L 245 142 L 275 135 L 305 182 L 330 175 L 380 250 L 425 205 L 448 222'
          : 'M 65 95 L 135 90 L 175 102 L 210 92 L 245 142 L 275 135 L 305 182 L 330 175 L 380 250 L 425 205 L 448 222 L 505 170 L 535 182 L 590 128 L 625 135 L 685 78';

  return (
    <figure className="mm-figure" data-market-maker-figure="mmbm-comic-intro">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Users size={16} aria-hidden="true" />
          {t('Why Curves Trap Chasers: Stick-Figure Story')}
        </span>
        <span>{t('Synthetic story · Click step to see why patience waits for SMR')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Why Curves Trap Chasers: Stick-Figure Story')}>
          {stepLabels.map((lbl, idx) => (
            <button
              key={lbl}
              type="button"
              className={step === idx ? 'is-active' : undefined}
              onClick={() => setStep(idx)}
            >
              {lbl}
            </button>
          ))}
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 295" role="img" aria-label={t('Why Curves Trap Chasers: Stick-Figure Story')}>
        {/* Background Zones */}
        <rect x="45" y="75" width="175" height="40" rx="6" fill="var(--mm-wash)" stroke="var(--mm-amber)" strokeDasharray="4 4" />
        <text x="132" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-amber)">
          {t('Orig. Consol.')}
        </text>

        <rect x="330" y="238" width="130" height="30" rx="5" fill="var(--mm-bid-soft)" stroke="var(--mm-bid)" />
        <text x="395" y="257" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-bid)">
          {t('HTF Discount')}
        </text>

        {step >= 1 && (
          <g>
            <line x1="255" y1="128" x2="345" y2="128" stroke="var(--mm-ask)" strokeDasharray="3 3" />
            <text x="300" y="120" textAnchor="middle" fontSize="10.5" fill="var(--mm-ask)">
              {t('Stops stacked above!')}
            </text>
          </g>
        )}

        {/* Curve Path */}
        <path d={pathD} fill="none" stroke="var(--mm-ink)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Stick-Figure Characters */}
        <g className="mm-char-group">
          <StickPerson x={chaserPos.x} y={chaserPos.y} color="var(--mm-ask)" pose={chaserPos.pose} scale={0.92} />
          <rect
            x={Math.min(545, Math.max(20, chaserPos.x - 95))}
            y={Math.max(12, chaserPos.y - 68)}
            width="190"
            height="24"
            rx="6"
            fill="var(--mm-paper)"
            stroke="var(--mm-ask)"
          />
          <text
            x={Math.min(640, Math.max(115, chaserPos.x))}
            y={Math.max(28, chaserPos.y - 52)}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--mm-ask)"
          >
            {step <= 1 ? t('Chaser: Selling every dip!') : step === 2 ? t('Chaser trapped below!') : t('Chasers stopped out')}
          </text>
        </g>

        <g className="mm-char-group">
          <StickPerson x={plannerPos.x} y={plannerPos.y} color="var(--mm-bid)" pose={plannerPos.pose} scale={0.95} />
          <rect
            x={Math.min(545, Math.max(20, plannerPos.x - 95))}
            y={Math.min(266, plannerPos.y + 24)}
            width="190"
            height="24"
            rx="6"
            fill="var(--mm-paper)"
            stroke="var(--mm-bid)"
          />
          <text
            x={Math.min(640, Math.max(115, plannerPos.x))}
            y={Math.min(282, plannerPos.y + 40)}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--mm-bid)"
          >
            {step <= 1 ? t('Planner: Waiting at Discount...') : step === 2 ? t('Planner enters LRB') : t('Terminus Reached!')}
          </text>
        </g>
      </svg>

      <figcaption className="mm-caption">{captions[step]}</figcaption>
    </figure>
  );
}

function AnimatedMmbmLifecycle({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [stage, setStage] = useState(staticOnly ? 6 : 3);
  const [playing, setPlaying] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    if (!playing || staticOnly || showFailure) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const timer = window.setInterval(() => {
      setStage((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 1450);
    return () => window.clearInterval(timer);
  }, [playing, staticOnly, showFailure]);

  const bars = showFailure
    ? [...syntheticMmbmSeries.slice(0, 9), ...syntheticMmbmFailureBranch]
    : syntheticMmbmSeries;

  const minP = 1.0780;
  const maxP = 1.0935;
  const yOf = (p: number) => 242 - ((p - minP) / (maxP - minP)) * 204;
  const xOf = (idx: number) => 52 + idx * 46;

  const visibleCount = showFailure
    ? bars.length
    : stage === 1 ? 2
    : stage === 2 ? 7
    : stage === 3 ? 9
    : stage === 4 ? 10
    : stage === 5 ? 14
    : bars.length;

  const stageLabels = [
    t('1. Original Consolidation (1.0900–1.0924)'),
    t('2. Sell-Side Delivery Curve (SS-1 & SS-2)'),
    t('3. Smart Money Reversal at 1.0800'),
    t('4. Low-Risk Buy Retest (LRB at 1.0835)'),
    t('5. Re-Accumulation Flip & 50% Gate'),
    t('6. Terminus Liquidity Target (1.0920)'),
  ];

  return (
    <figure className="mm-figure" data-market-maker-figure="animated-mmbm-lifecycle">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Activity size={16} aria-hidden="true" />
          {t('Animated 6-Stage Market Maker Buy Model (MMBM)')}
        </span>
        <span>{t('Synthetic EUR/USD-style curve · Toggle playback or failure branch')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Animated 6-Stage Market Maker Buy Model (MMBM)')}>
          <button
            type="button"
            onClick={() => {
              setShowFailure(false);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
            {playing ? t('Pause') : t('Play')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setShowFailure(false);
              setStage((s) => (s >= 6 ? 1 : s + 1));
            }}
          >
            <SkipForward size={13} aria-hidden="true" />
            {t('Step')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setShowFailure(false);
              setStage(1);
            }}
          >
            <RotateCcw size={13} aria-hidden="true" />
            {t('Reset')}
          </button>
          <button
            type="button"
            className={!showFailure ? 'is-active' : undefined}
            onClick={() => {
              setShowFailure(false);
              setStage(6);
            }}
          >
            {t('Valid Curve')}
          </button>
          <button
            type="button"
            className={showFailure ? 'is-active' : undefined}
            onClick={() => {
              setPlaying(false);
              setShowFailure(true);
            }}
          >
            {t('Failure Branch')}
          </button>
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 285" role="img" aria-label={t('Animated 6-Stage Market Maker Buy Model (MMBM)')}>
        {/* Original Consolidation Band */}
        <rect x="34" y={yOf(1.0924)} width="98" height={yOf(1.0895) - yOf(1.0924)} rx="4" fill="var(--mm-wash)" stroke="var(--mm-amber)" />
        <text x="83" y={yOf(1.0924) - 8} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-amber)">
          {t('Orig. Consol.')}
        </text>

        {/* Terminus Target Line */}
        <line x1="34" y1={yOf(1.0920)} x2="725" y2={yOf(1.0920)} stroke="var(--mm-amber)" strokeDasharray="5 4" />
        <text x="655" y={yOf(1.0920) - 7} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-amber)">
          {t('Terminus 1.0920')}
        </text>

        {/* 50% SMR Symmetry Gate */}
        <line x1="34" y1={yOf(1.0860)} x2="725" y2={yOf(1.0860)} stroke="var(--mm-accent)" strokeDasharray="3 4" />
        <text x="648" y={yOf(1.0860) - 6} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-accent)">
          {t('50% Gate 1.0860')}
        </text>

        {/* HTF Discount Zone */}
        <rect x="330" y={yOf(1.0816)} width="128" height={yOf(1.0796) - yOf(1.0816)} rx="4" fill="var(--mm-bid-soft)" stroke="var(--mm-bid)" />
        <text x="394" y={yOf(1.0796) + 15} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-bid)">
          {t('SMR 1.0800')} · {t('HTF Discount')}
        </text>

        {/* Left Side Shelves */}
        {(showFailure || stage >= 2) && (
          <>
            <rect x="132" y={yOf(1.0888)} width="98" height={yOf(1.0866) - yOf(1.0888)} fill="var(--mm-ask-soft)" stroke="var(--mm-ask)" strokeDasharray="3 3" />
            <text x="181" y={yOf(1.0888) - 6} textAnchor="middle" fontSize="10" fill="var(--mm-ask)">{t('SS-1 Shelf')}</text>
            <rect x="266" y={yOf(1.0856)} width="88" height={yOf(1.0840) - yOf(1.0856)} fill="var(--mm-ask-soft)" stroke="var(--mm-ask)" strokeDasharray="3 3" />
            <text x="310" y={yOf(1.0856) - 6} textAnchor="middle" fontSize="10" fill="var(--mm-ask)">{t('SS-2 Shelf')}</text>
          </>
        )}

        {/* Right Side Re-Acc Annotations */}
        {!showFailure && stage >= 4 && (
          <text x={xOf(9)} y={yOf(1.0820) + 15} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-bid)">
            {t('LRB Entry')}
          </text>
        )}
        {!showFailure && stage >= 5 && (
          <>
            <text x={xOf(11)} y={yOf(1.0864) - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-bid)">
              {t('Re-Acc 1')}
            </text>
            <text x={xOf(13)} y={yOf(1.0894) - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-bid)">
              {t('Re-Acc 2')}
            </text>
          </>
        )}
        {showFailure && (
          <text x={xOf(11)} y={yOf(1.0785) + 16} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-ask)">
            {t('Failed 50% Reclaim')}
          </text>
        )}

        {/* Synthetic Candlesticks */}
        {bars.slice(0, visibleCount).map((bar) => {
          const x = xOf(bar.index);
          const bull = bar.close >= bar.open;
          const color =
            bar.stage === 'fail' ? 'var(--mm-ask)' : bull ? 'var(--mm-bid)' : 'var(--mm-ask)';
          const top = yOf(Math.max(bar.open, bar.close));
          const bot = yOf(Math.min(bar.open, bar.close));
          const bodyH = Math.max(4, bot - top);
          return (
            <g key={bar.label} className="mm-candle">
              <line x1={x} y1={yOf(bar.high)} x2={x} y2={yOf(bar.low)} stroke={color} strokeWidth="2" />
              <rect x={x - 9} y={top} width="18" height={bodyH} rx="2" fill={color} />
            </g>
          );
        })}
      </svg>

      <figcaption className="mm-caption">
        <strong>{t('Viewing Stage')}:</strong>{' '}
        {showFailure ? t('Invalidation: Fails Below 1.0860 & Breaks 1.0800') : stageLabels[stage - 1]}
      </figcaption>
    </figure>
  );
}

function SymmetrySwitcher({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'mmbm' | 'mmsm'>('mmbm');
  const isBuy = mode === 'mmbm';

  return (
    <figure className="mm-figure" data-market-maker-figure="mmbm-mmsm-symmetry">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <ArrowLeftRight size={16} aria-hidden="true" />
          {t('Interactive Symmetry: MMBM (U-Curve) vs. MMSM (Inverted-U)')}
        </span>
        <span>{t('Switch direction to compare left-to-right mirror roles')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Interactive Symmetry: MMBM (U-Curve) vs. MMSM (Inverted-U)')}>
          <button type="button" className={isBuy ? 'is-active' : undefined} onClick={() => setMode('mmbm')}>
            {t('MMBM (Buy Model)')}
          </button>
          <button type="button" className={!isBuy ? 'is-active' : undefined} onClick={() => setMode('mmsm')}>
            {t('MMSM (Sell Model)')}
          </button>
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 250" role="img" aria-label={t('Interactive Symmetry: MMBM (U-Curve) vs. MMSM (Inverted-U)')}>
        {/* Symmetry Axis */}
        <line x1="380" y1="24" x2="380" y2="232" stroke="var(--mm-accent)" strokeDasharray="4 4" />
        <text x="380" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-accent)">
          {t('Symmetry Axis')}
        </text>

        {isBuy ? (
          <>
            <rect x="42" y="48" width="115" height="32" rx="5" fill="var(--mm-wash)" stroke="var(--mm-amber)" />
            <text x="100" y="38" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-amber)">
              {t('Original Consol. (BSL Target)')}
            </text>
            <line x1="42" y1="48" x2="710" y2="48" stroke="var(--mm-amber)" strokeDasharray="5 4" />
            <path
              d="M 50 64 L 145 64 L 185 112 L 225 104 L 275 154 L 312 146 L 380 212 L 430 170 L 455 182 L 525 116 L 560 126 L 670 36"
              fill="none"
              stroke="var(--mm-bid)"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <text x="195" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-ask)">
              {t('Left: Sell-Side Curve')}
            </text>
            <text x="565" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-bid)">
              {t('Right: Buy-Side Curve')}
            </text>
            <text x="380" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-bid)">
              {t('HTF Discount SMR')}
            </text>
            <text x="458" y="198" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-bid)">
              {t('LRB')}
            </text>
            <text x="555" y="142" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-bid)">
              {t('Re-Accumulation Flip')}
            </text>
          </>
        ) : (
          <>
            <rect x="42" y="176" width="115" height="32" rx="5" fill="var(--mm-wash)" stroke="var(--mm-amber)" />
            <text x="100" y="226" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-amber)">
              {t('Original Consol. (SSL Target)')}
            </text>
            <line x1="42" y1="208" x2="710" y2="208" stroke="var(--mm-amber)" strokeDasharray="5 4" />
            <path
              d="M 50 192 L 145 192 L 185 144 L 225 152 L 275 102 L 312 110 L 380 42 L 430 84 L 455 72 L 525 138 L 560 128 L 670 220"
              fill="none"
              stroke="var(--mm-ask)"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <text x="195" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-bid)">
              {t('Left: Buy-Side Curve')}
            </text>
            <text x="565" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-ask)">
              {t('Right: Sell-Side Curve')}
            </text>
            <text x="380" y="34" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-ask)">
              {t('HTF Premium SMR')}
            </text>
            <text x="458" y="64" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-ask)">
              {t('LRS')}
            </text>
            <text x="555" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--mm-ask)">
              {t('Re-Distribution Flip')}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}

function EquilibriumGauge({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [price, setPrice] = useState(1.0835);
  const analysis = evaluateDealingRange(1.0920, 1.0800, price)!;
  const sym = evaluateCurveSymmetry('mmbm', 1.0800, 1.0920, price, 1.0796)!;

  const zoneText =
    analysis.zone === 'extreme-premium' ? t('Extreme Premium')
    : analysis.zone === 'premium' ? t('Premium (> 50%)')
    : analysis.zone === 'equilibrium' ? t('Equilibrium (50%)')
    : analysis.zone === 'extreme-discount' ? t('Extreme Discount')
    : t('Discount (< 50%)');

  const yPos = 225 - (analysis.pricePositionPct / 100) * 180;

  return (
    <figure className="mm-figure" data-market-maker-figure="model6-equilibrium-gauge">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Scale size={16} aria-hidden="true" />
          {t('Dealing Range Equilibrium & 50% SMR Symmetry Sandbox')}
        </span>
        <span>{t('Slide synthetic price to test Discount eligibility across 1.0800–1.0920')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-slider-row">
          <label htmlFor="mm-eq-slider">
            {t('Synthetic Price')}: <strong className="mm-num">{price.toFixed(4)}</strong>
          </label>
          <input
            id="mm-eq-slider"
            type="range"
            min={1.0800}
            max={1.0920}
            step={0.0005}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 250" role="img" aria-label={t('Dealing Range Equilibrium & 50% SMR Symmetry Sandbox')}>
        {/* Premium Half */}
        <rect x="65" y="45" width="380" height="90" fill="var(--mm-ask-soft)" stroke="var(--mm-ask)" />
        <text x="255" y="72" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--mm-ask)">
          {t('PREMIUM — Avoid Discount Longs')}
        </text>

        {/* Discount Half */}
        <rect x="65" y="135" width="380" height="90" fill="var(--mm-bid-soft)" stroke="var(--mm-bid)" />
        <text x="255" y="205" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--mm-bid)">
          {t('DISCOUNT — Longs Permitted')}
        </text>

        {/* Equilibrium Line */}
        <line x1="55" y1="135" x2="455" y2="135" stroke="var(--mm-accent)" strokeWidth="2" strokeDasharray="5 3" />
        <text x="470" y="139" fontSize="11" fontWeight="600" fill="var(--mm-accent)">
          {t('50% Eq / SMR Gate: 1.0860')}
        </text>

        {/* OTE Line */}
        <line x1="65" y1="172" x2="445" y2="172" stroke="var(--mm-amber)" strokeDasharray="3 3" />
        <text x="470" y="176" fontSize="10.5" fill="var(--mm-amber)">
          {t('OTE 70.5%: 1.0835')}
        </text>

        {/* Live Price Marker */}
        <line x1="55" y1={yPos} x2="455" y2={yPos} stroke="var(--mm-ink)" strokeWidth="2.2" />
        <rect
          x="185"
          y={yPos - 12}
          width="140"
          height="24"
          rx="12"
          fill="var(--mm-paper)"
          stroke={analysis.model6EligibleLong ? 'var(--mm-bid)' : 'var(--mm-ask)'}
          strokeWidth="2"
        />
        <text x="255" y={yPos + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--mm-ink)">
          {price.toFixed(4)} ({analysis.pricePositionPct}%)
        </text>
      </svg>

      <div className="mm-readout-grid">
        <div className="mm-readout">
          <span>{t('Range Position')}</span>
          <strong className="mm-num">{analysis.pricePositionPct}%</strong>
        </div>
        <div className="mm-readout">
          <span>{t('Market Zone')}</span>
          <strong>{zoneText}</strong>
        </div>
        <div className="mm-readout">
          <span>{t('Discount Buy Rule')}</span>
          <strong className={analysis.model6EligibleLong ? 'is-ok' : 'is-warn'}>
            {analysis.model6EligibleLong ? t('Permitted (Below Equilibrium)') : t('Blocked (Premium Zone)')}
          </strong>
        </div>
        <div className="mm-readout">
          <span>{t('50% SMR Symmetry')}</span>
          <strong>
            {price >= sym.midpoint50 ? t('Cleared >= 1.0860') : t('Not Yet Reclaimed')}
          </strong>
        </div>
      </div>
    </figure>
  );
}

function LrlrVsHrlrCharacters({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'lrlr' | 'hrlr'>('lrlr');
  const isClean = mode === 'lrlr';

  return (
    <figure className="mm-figure" data-market-maker-figure="lrlr-vs-hrlr-characters">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Zap size={16} aria-hidden="true" />
          {t('Path Friction Lab: Sprinter (LRLR) vs. Hurdler (HRLR)')}
        </span>
        <span>{t('Animated stick-figure runner · Toggle target resistance profile')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Path Friction Lab: Sprinter (LRLR) vs. Hurdler (HRLR)')}>
          <button type="button" className={isClean ? 'is-active' : undefined} onClick={() => setMode('lrlr')}>
            {t('LRLR (Clean Track)')}
          </button>
          <button type="button" className={!isClean ? 'is-active' : undefined} onClick={() => setMode('hrlr')}>
            {t('HRLR (Hurdle Track)')}
          </button>
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 210" role="img" aria-label={t('Path Friction Lab: Sprinter (LRLR) vs. Hurdler (HRLR)')}>
        {/* Track Base */}
        <line x1="40" y1="158" x2="715" y2="158" stroke="var(--mm-grid)" strokeWidth="3" />

        {isClean ? (
          <>
            <rect x="130" y="62" width="490" height="84" rx="8" fill="var(--mm-bid-soft)" stroke="var(--mm-bid)" strokeDasharray="5 4" />
            <text x="375" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--mm-bid)">
              {t('Open Liquidity Corridor')} — {t('Fast Delivery')}
            </text>
            <line x1="635" y1="54" x2="705" y2="54" stroke="var(--mm-amber)" strokeWidth="2.5" />
            <text x="670" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-amber)">
              {t('Smooth EQH Target')}
            </text>
            <g className="mm-sprinter">
              <StickPerson x={115} y={136} color="var(--mm-bid)" pose="sprint" />
            </g>
          </>
        ) : (
          <>
            {[
              { x: 225, label: t('Breaker Hurdle 1') },
              { x: 390, label: t('Old OB Hurdle 2') },
              { x: 555, label: t('Swing Cap Hurdle 3') },
            ].map((h) => (
              <g key={h.label}>
                <rect x={h.x} y="92" width="22" height="66" rx="3" fill="var(--mm-ask-soft)" stroke="var(--mm-ask)" strokeWidth="2" />
                <text x={h.x + 11} y="80" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-ask)">
                  {h.label}
                </text>
              </g>
            ))}
            <text x="390" y="42" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--mm-ask)">
              {t('Slow Choppy Progress')}
            </text>
            <g className="mm-hurdler">
              <StickPerson x={145} y={130} color="var(--mm-ask)" pose="hurdle" />
            </g>
          </>
        )}
      </svg>
    </figure>
  );
}

function CisdVsSmrDetector({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [checks, setChecks] = useState({
    sweepOccurred: true,
    cisdBodyClosedBeyondOrigin: true,
    mssConfirmed: !staticOnly ? false : true,
    fvgFormed: !staticOnly ? false : true,
  });

  const result = evaluateSmrTrigger(checks);
  const verdict =
    result.grade === 'confirmed-smr'
      ? t('Grade: Confirmed SMR + LRB Anchor')
      : result.grade === 'early-cisd'
        ? t('Grade: Early CISD Watch (No Complete MSS/FVG)')
        : result.grade === 'unconfirmed-sweep'
          ? t('Grade: Unconfirmed Sweep — Do Not Catch Falling Knife')
          : t('Grade: Invalid — Missing Liquidity Sweep');

  const items: Array<{ key: keyof typeof checks; label: string }> = [
    { key: 'sweepOccurred', label: t('1. Swept Prior Low into HTF Discount') },
    { key: 'cisdBodyClosedBeyondOrigin', label: t('2. CISD Body Closed Above Run Open') },
    { key: 'mssConfirmed', label: t('3. MSS Body Closed Above Opposing Swing') },
    { key: 'fvgFormed', label: t('4. Clean 3-Candle FVG Formed') },
  ];

  return (
    <figure className="mm-figure" data-market-maker-figure="cisd-vs-smr-detector">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <SlidersHorizontal size={16} aria-hidden="true" />
          {t('SMR Trigger Inspector: Sweep → CISD → MSS + FVG')}
        </span>
        <span>{t('Toggle completed candle checks before calling a Smart Money Reversal')}</span>
      </div>

      <div className="mm-detector-grid">
        {items.map((item) => (
          <label key={item.key} className="mm-detector-toggle">
            <input
              type="checkbox"
              disabled={staticOnly}
              checked={checks[item.key]}
              onChange={() =>
                setChecks((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
              }
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <p className={`mm-verdict mm-verdict-${result.grade}`}>{verdict}</p>
    </figure>
  );
}

function LeftToRightFlip({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [step, setStep] = useState<'left' | 'flipped'>(staticOnly ? 'flipped' : 'flipped');

  return (
    <figure className="mm-figure" data-market-maker-figure="left-to-right-flip">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Layers size={16} aria-hidden="true" />
          {t('Left-to-Right Symmetry: Sell-Side Shelf Flips to Support')}
        </span>
        <span>{t('Stage-2 Re-Accumulation turns left-side resistance into right-side launchpads')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Left-to-Right Symmetry: Sell-Side Shelf Flips to Support')}>
          <button type="button" className={step === 'left' ? 'is-active' : undefined} onClick={() => setStep('left')}>
            {t('1. Left Drop Shelf')}
          </button>
          <button type="button" className={step === 'flipped' ? 'is-active' : undefined} onClick={() => setStep('flipped')}>
            {t('2. Flipped Breaker / IFVG')}
          </button>
        </div>
      )}

      <svg className="mm-svg" viewBox="0 0 760 220" role="img" aria-label={t('Left-to-Right Symmetry: Sell-Side Shelf Flips to Support')}>
        {/* Horizontal Symmetry Corridor */}
        <rect
          x="75"
          y="96"
          width="610"
          height="32"
          rx="4"
          fill={step === 'flipped' ? 'var(--mm-bid-soft)' : 'var(--mm-ask-soft)'}
          stroke={step === 'flipped' ? 'var(--mm-bid)' : 'var(--mm-ask)'}
          strokeDasharray="4 4"
        />
        <text x="190" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-ask)">
          {t('Left Bearish FVG / OB')}
        </text>
        <path d="M 85 52 L 155 102 L 195 96 L 265 186" fill="none" stroke="var(--mm-ask)" strokeWidth="2.8" />

        {step === 'flipped' && (
          <>
            <path d="M 265 186 L 340 165 L 445 78 L 495 112 L 645 36" fill="none" stroke="var(--mm-bid)" strokeWidth="3.2" />
            <circle cx="495" cy="112" r="6.5" fill="var(--mm-bid)" />
            <text x="415" y="66" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-bid)">
              {t('Right Body Break Through Shelf')}
            </text>
            <text x="530" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--mm-bid)">
              {t('Flipped Bullish IFVG / Breaker')} · {t('Re-Accumulation Entry')}
            </text>
            <text x="665" y="30" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--mm-amber)">
              {t('To Terminus')}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}

function MtfAlignmentMatrix({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<'swing' | 'short-term' | 'intraday'>('short-term');
  const active = mtfPairingProfiles.find((p) => p.id === selectedId) || mtfPairingProfiles[1];

  return (
    <figure className="mm-figure" data-market-maker-figure="mtf-alignment-matrix">
      <div className="mm-figure-head">
        <span className="mm-head-title">
          <Compass size={16} aria-hidden="true" />
          {t('Three-Timeframe Hierarchy Selector')}
        </span>
        <span>{t('Match Higher-Timeframe Anchor, Curve Chart & Execution Trigger')}</span>
      </div>

      {!staticOnly && (
        <div className="mm-controls" role="group" aria-label={t('Three-Timeframe Hierarchy Selector')}>
          {mtfPairingProfiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              className={selectedId === profile.id ? 'is-active' : undefined}
              onClick={() => setSelectedId(profile.id)}
            >
              {t(profile.label)}
            </button>
          ))}
        </div>
      )}

      <div className="mm-readout-grid">
        <div className="mm-readout">
          <span>{t('HTF Anchor')}</span>
          <strong>{t(active.htfContext)}</strong>
        </div>
        <div className="mm-readout">
          <span>{t('Curve Chart')}</span>
          <strong>{t(active.curveMap)}</strong>
        </div>
        <div className="mm-readout">
          <span>{t('Entry Trigger')}</span>
          <strong>{t(active.executionTrigger)}</strong>
        </div>
        <div className="mm-readout">
          <span>{t('Typical Hold')}</span>
          <strong>{t(active.typicalHold)}</strong>
        </div>
      </div>

      <figcaption className="mm-caption">
        <strong>{t('Key Filter')}:</strong> {t(active.keyFilter)}
      </figcaption>
    </figure>
  );
}

export function MarketMakerVisual({
  kind,
  staticOnly = false,
}: {
  kind: MarketMakerVisualKind;
  staticOnly?: boolean;
}) {
  switch (kind) {
    case 'mmbm-comic-intro':
      return <ComicIntro staticOnly={staticOnly} />;
    case 'animated-mmbm-lifecycle':
      return <AnimatedMmbmLifecycle staticOnly={staticOnly} />;
    case 'mmbm-mmsm-symmetry':
      return <SymmetrySwitcher staticOnly={staticOnly} />;
    case 'model6-equilibrium-gauge':
      return <EquilibriumGauge staticOnly={staticOnly} />;
    case 'lrlr-vs-hrlr-characters':
      return <LrlrVsHrlrCharacters staticOnly={staticOnly} />;
    case 'cisd-vs-smr-detector':
      return <CisdVsSmrDetector staticOnly={staticOnly} />;
    case 'left-to-right-flip':
      return <LeftToRightFlip staticOnly={staticOnly} />;
    case 'mtf-alignment-matrix':
      return <MtfAlignmentMatrix staticOnly={staticOnly} />;
  }
}
