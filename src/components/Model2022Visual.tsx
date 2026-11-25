import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  Compass,
  GitCompare,
  Pause,
  Play,
  RotateCcw,
  Scale,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  evaluate2022Sequence,
  evaluateFvgOteConfluence,
  killzoneTimelineSpecs,
  mtf2022Tiers,
  synthetic2022BullishSeries,
  synthetic2022FailureBranch,
} from '../utils/model2022Math';
import { useTranslation } from '../i18n/TranslationProvider';

export type Model2022VisualKind =
  | 'model2022-comic-intro'
  | 'animated-2022-lifecycle'
  | 'killzone-clock-timeline'
  | 'displacement-mss-inspector'
  | 'fvg-ote-confluence-sandbox'
  | 'midnight-open-po3-lab'
  | 'mtf-2022-matrix'
  | 'mistakes-stick-comic';

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
  pose?: 'stand' | 'panic' | 'wait' | 'cheer' | 'point' | 'slump';
  scale?: number;
}) {
  const arms =
    pose === 'panic'
      ? 'M -12 -16 L 0 -8 L 12 -19'
      : pose === 'cheer'
        ? 'M -13 -22 L 0 -10 L 13 -22'
        : pose === 'point'
          ? 'M -10 -8 L 0 -11 L 15 -14'
          : pose === 'slump'
            ? 'M -10 -4 L 0 -10 L 10 -3'
            : pose === 'wait'
              ? 'M -9 -6 L 0 -10 L 9 -6'
              : 'M -10 -10 L 0 -12 L 10 -10';

  const legs =
    pose === 'slump'
      ? 'M -9 17 L -2 5 L 9 17'
      : pose === 'panic'
        ? 'M -11 17 L 0 4 L 11 17'
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

/* Visual 1: 4-Stage Stick-Figure Story */
function ComicIntro({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(staticOnly ? 2 : 0);

  const stepLabels = [
    t('1. 09:30 Open'),
    t('2. Sweep Trap'),
    t('3. MSS + FVG'),
    t('4. Target Hit'),
  ];

  const captions = [
    t('Stage 1: At 09:30 AM NY Open, price consolidates inside a tight morning box while the Planner marks resting SSL below.'),
    t('Stage 2: Price plunges below the morning low sweeping Sell-Side stops; the Impulsive Chaser sells right into the trap.'),
    t('Stage 3: Strong upward displacement snaps past the prior high (MSS) and leaves a clean Bullish FVG; the Planner awaits retest.'),
    t('Stage 4: Returning calmly to the FVG launches price straight into Buy-Side Liquidity while chasing shorts are unwound.'),
  ];

  const chaser =
    step === 0
      ? { x: 165, y: 175, pose: 'stand' as const, bx: 68, by: 202, msg: t('Chaser: Watching every bar!') }
      : step === 1
        ? { x: 245, y: 170, pose: 'panic' as const, bx: 145, by: 96, msg: t('Chaser: Selling the breakdown!') }
        : step === 2
          ? { x: 150, y: 172, pose: 'panic' as const, bx: 52, by: 198, msg: t('Chaser trapped short!') }
          : { x: 180, y: 172, pose: 'slump' as const, bx: 82, by: 198, msg: t('Chaser stopped out') };

  const planner =
    step === 0
      ? { x: 565, y: 178, pose: 'wait' as const, bx: 465, by: 204, msg: t('Planner: Awaiting 09:30 sweep') }
      : step === 1
        ? { x: 565, y: 178, pose: 'wait' as const, bx: 465, by: 204, msg: t('Planner: Sweep — awaiting MSS') }
        : step === 2
          ? { x: 565, y: 154, pose: 'point' as const, bx: 465, by: 180, msg: t('Planner marks trailing FVG') }
          : { x: 645, y: 112, pose: 'cheer' as const, bx: 540, by: 138, msg: t('BSL Target Delivered!') };

  const pathD =
    step === 0
      ? 'M 58 112 L 105 98 L 145 120 L 195 104'
      : step === 1
        ? 'M 58 112 L 105 98 L 145 120 L 195 104 L 258 228 L 285 206'
        : step === 2
          ? 'M 58 112 L 105 98 L 145 120 L 195 104 L 258 228 L 315 178 L 385 96 L 452 152'
          : 'M 58 112 L 105 98 L 145 120 L 195 104 L 258 228 L 315 178 L 385 96 L 452 152 L 545 100 L 668 56';

  return (
    <figure className="m22-figure" data-model-2022-figure="model2022-comic-intro">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Users size={16} aria-hidden="true" />
          {t('Chaser vs. Planner: Animated 2022 Stick-Figure Story')}
        </span>
        <span>{t('Synthetic 09:30 AM scene · Click steps to trace why MSS precedes entry')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('Chaser vs. Planner: Animated 2022 Stick-Figure Story')}>
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

      <svg className="m22-svg" viewBox="0 0 760 285" role="img" aria-label={t('Chaser vs. Planner: Animated 2022 Stick-Figure Story')}>
        {/* Morning Consolidation Box */}
        <rect x="44" y="84" width="160" height="44" rx="5" fill="var(--m22-wash)" stroke="var(--m22-amber)" strokeDasharray="4 4" />
        <text x="124" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--m22-amber)">
          {t('Morning Range (09:30)')}
        </text>

        {/* SSL Pool Below */}
        <line x1="44" y1="128" x2="335" y2="128" stroke="var(--m22-ask)" strokeDasharray="3 4" />
        <text x="124" y="144" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
          {t('Sell-Side Liquidity (SSL)')}
        </text>

        {/* BSL Target Overhead */}
        <line x1="420" y1="56" x2="715" y2="56" stroke="var(--m22-bid)" strokeDasharray="5 4" />
        <text x="645" y="46" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
          {t('BSL Objective')}
        </text>

        {/* MSS Line & Trailing FVG from step 2+ */}
        {step >= 2 && (
          <>
            <line x1="160" y1="98" x2="510" y2="98" stroke="var(--m22-accent)" strokeDasharray="4 3" />
            <text x="385" y="84" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-accent)">
              {t('Displacement MSS')}
            </text>
            <rect x="330" y="138" width="165" height="28" rx="4" fill="var(--m22-bid-soft)" stroke="var(--m22-bid)" />
            <text x="412" y="156" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
              {t('Bullish FVG Entry')}
            </text>
          </>
        )}

        {/* Price Path */}
        <path d={pathD} fill="none" stroke="var(--m22-ink)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Impulsive Chaser Stick Figure */}
        <g className="m22-char-group">
          <StickPerson x={chaser.x} y={chaser.y} color="var(--m22-ask)" pose={chaser.pose} scale={0.92} />
          <rect x={chaser.bx} y={chaser.by} width="196" height="24" rx="6" fill="var(--m22-paper)" stroke="var(--m22-ask)" />
          <text x={chaser.bx + 98} y={chaser.by + 16} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
            {chaser.msg}
          </text>
        </g>

        {/* Time-Based Planner Stick Figure */}
        <g className="m22-char-group">
          <StickPerson x={planner.x} y={planner.y} color="var(--m22-bid)" pose={planner.pose} scale={0.94} />
          <rect x={planner.bx} y={planner.by} width="198" height="24" rx="6" fill="var(--m22-paper)" stroke="var(--m22-bid)" />
          <text x={planner.bx + 99} y={planner.by + 16} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
            {planner.msg}
          </text>
        </g>
      </svg>

      <figcaption className="m22-caption">{captions[step]}</figcaption>
    </figure>
  );
}

/* Visual 2: Animated 5-Stage Lifecycle & Failure Branch */
function AnimatedLifecycle({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [stage, setStage] = useState(staticOnly ? 5 : 4);
  const [playing, setPlaying] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    if (!playing || staticOnly || showFailure) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStage((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, showFailure]);

  const bars = showFailure
    ? [...synthetic2022BullishSeries.slice(0, 5), ...synthetic2022FailureBranch]
    : synthetic2022BullishSeries;

  const minP = 20965;
  const maxP = 21098;
  const yOf = (p: number) => 250 - ((p - minP) / (maxP - minP)) * 212;
  const xOf = (idx: number) => 56 + idx * 51;

  const visibleCount = showFailure
    ? bars.length
    : stage === 1
      ? 4
      : stage === 2
        ? 5
        : stage === 3
          ? 8
          : stage === 4
            ? 10
            : bars.length;

  const stageDescriptions = [
    t('1. HTF Context & Asian SSL Pool marked at 21,000'),
    t('2. 09:40 NY Sweep drops below 21,000 to 20,986 wick'),
    t('3. Displacement MSS breaks 21,020 & prints FVG 21,012–21,032'),
    t('4. Calm Retracement fills limit entry inside FVG / 21,022 CE'),
    t('5. Delivery reaches opposing 21,085 PDH Buy-Side Liquidity'),
  ];

  return (
    <figure className="m22-figure" data-model-2022-figure="animated-2022-lifecycle">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Activity size={16} aria-hidden="true" />
          {t('Animated 5-Stage ICT 2022 Model Lifecycle & Failure Branch')}
        </span>
        <span>{t('Synthetic NQ-style 5m candles · Step through sequence or inspect invalidation')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('Animated 5-Stage ICT 2022 Model Lifecycle & Failure Branch')}>
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
              setStage((s) => (s >= 5 ? 1 : s + 1));
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
              setStage(5);
            }}
          >
            {t('Valid 2022 Setup')}
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

      <svg className="m22-svg" viewBox="0 0 760 288" role="img" aria-label={t('Animated 5-Stage ICT 2022 Model Lifecycle & Failure Branch')}>
        {/* 21,085 PDH BSL Target */}
        <line x1="40" y1={yOf(21085)} x2="720" y2={yOf(21085)} stroke="var(--m22-bid)" strokeDasharray="5 4" />
        <text x="716" y={yOf(21085) - 7} textAnchor="end" fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
          {t('Target BSL 21,085')}
        </text>

        {/* 21,020 MSS Short-Term High */}
        <line x1="150" y1={yOf(21020)} x2="720" y2={yOf(21020)} stroke="var(--m22-accent)" strokeDasharray="3 4" />
        <text x="716" y={yOf(21020) - 6} textAnchor="end" fontSize="10.5" fontWeight="600" fill="var(--m22-accent)">
          {t('MSS Level 21,020')}
        </text>

        {/* 21,000 Prior Asian SSL */}
        <line x1="40" y1={yOf(21000)} x2="340" y2={yOf(21000)} stroke="var(--m22-ask)" strokeDasharray="4 4" />
        <text x="44" y={yOf(21000) - 7} fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
          {t('Prior SSL 21,000')}
        </text>

        {/* Sweep Low Marker */}
        {(showFailure || stage >= 2) && (
          <text x={xOf(4)} y={yOf(20986) + 15} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
            {t('Sweep 20,986')}
          </text>
        )}

        {/* Bullish FVG Band 21,012 - 21,032 */}
        {!showFailure && stage >= 3 && (
          <>
            <rect
              x={xOf(5) - 10}
              y={yOf(21032)}
              width={xOf(10) - xOf(5) + 16}
              height={yOf(21012) - yOf(21032)}
              rx="3"
              fill="var(--m22-bid-soft)"
              stroke="var(--m22-bid)"
            />
            <line
              x1={xOf(5) - 10}
              y1={yOf(21022)}
              x2={xOf(10) + 6}
              y2={yOf(21022)}
              stroke="var(--m22-amber)"
              strokeDasharray="3 3"
            />
            <text x={xOf(9)} y={yOf(21012) + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--m22-bid)">
              {t('FVG 21,012–21,032 (50% CE)')}
            </text>
          </>
        )}

        {showFailure && (
          <text x={xOf(7)} y={yOf(20970) + 15} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
            {t('No Displacement / Breaks 20,986 Low')}
          </text>
        )}

        {/* Candlesticks */}
        {bars.slice(0, visibleCount).map((bar) => {
          const x = xOf(bar.index);
          const bull = bar.close >= bar.open;
          const color =
            bar.phase === 'fail' ? 'var(--m22-ask)' : bull ? 'var(--m22-bid)' : 'var(--m22-ask)';
          const top = yOf(Math.max(bar.open, bar.close));
          const bot = yOf(Math.min(bar.open, bar.close));
          const bodyH = Math.max(4, bot - top);
          return (
            <g key={bar.label} className="m22-candle">
              <line x1={x} y1={yOf(bar.high)} x2={x} y2={yOf(bar.low)} stroke={color} strokeWidth="2" />
              <rect x={x - 9} y={top} width="18" height={bodyH} rx="2" fill={color} />
              <text x={x} y="274" textAnchor="middle" fontSize="9.5" opacity="0.72">
                {bar.timeNy}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="m22-caption">
        <strong>{t('Active Step')}:</strong>{' '}
        {showFailure ? t('Failure Branch: weak push stalls below 21,020 MSS and sweeps down through 20,986.') : stageDescriptions[stage - 1]}
      </figcaption>
    </figure>
  );
}

/* Visual 3: Killzone & Macro Session Clock */
function KillzoneClockTimeline({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(killzoneTimelineSpecs[4].id);
  const active = killzoneTimelineSpecs.find((w) => w.id === selectedId) || killzoneTimelineSpecs[4];

  const barCoords: Record<string, { x: number; w: number }> = {
    midnight: { x: 45, w: 28 },
    london: { x: 105, w: 112 },
    'ny-am-fx': { x: 265, w: 112 },
    'macro-830': { x: 322, w: 30 },
    'equity-930': { x: 365, w: 68 },
    'sb-1000': { x: 392, w: 56 },
    'ny-pm': { x: 525, w: 112 },
  };

  return (
    <figure className="m22-figure" data-model-2022-figure="killzone-clock-timeline">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Clock size={16} aria-hidden="true" />
          {t('NY Local Time Window Explorer (DST-Aware Killzones)')}
        </span>
        <span>{t('America/New_York clock · Click any session to view UTC & Karachi equivalents')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('NY Local Time Window Explorer (DST-Aware Killzones)')}>
          {killzoneTimelineSpecs.map((w) => (
            <button
              key={w.id}
              type="button"
              className={selectedId === w.id ? 'is-active' : undefined}
              onClick={() => setSelectedId(w.id)}
            >
              {t(w.label)}
            </button>
          ))}
        </div>
      )}

      <svg className="m22-svg" viewBox="0 0 760 132" role="img" aria-label={t('NY Local Time Window Explorer (DST-Aware Killzones)')}>
        {/* Baseline */}
        <line x1="40" y1="74" x2="720" y2="74" stroke="var(--m22-grid)" strokeWidth="2.5" />
        {[
          { x: 55, lbl: '00:00' },
          { x: 160, lbl: '03:30' },
          { x: 265, lbl: '07:00' },
          { x: 365, lbl: '09:30' },
          { x: 465, lbl: '12:00' },
          { x: 575, lbl: '14:30' },
          { x: 675, lbl: '17:00' },
        ].map((tick) => (
          <g key={tick.lbl}>
            <line x1={tick.x} y1="68" x2={tick.x} y2="82" stroke="var(--m22-grid)" strokeWidth="1.8" />
            <text x={tick.x} y="102" textAnchor="middle" fontSize="10.5" opacity="0.82">
              {tick.lbl}
            </text>
          </g>
        ))}

        {/* Lunch Chop Marker */}
        <rect x="448" y="56" width="70" height="34" rx="4" fill="var(--m22-ask-soft)" stroke="var(--m22-ask)" strokeDasharray="3 3" />
        <text x="483" y="47" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--m22-ask)">
          {t('Lunch Chop')}
        </text>

        {/* Window Bands */}
        {killzoneTimelineSpecs.map((w) => {
          const box = barCoords[w.id];
          const isSel = w.id === active.id;
          return (
            <g
              key={w.id}
              style={{ cursor: staticOnly ? 'default' : 'pointer' }}
              onClick={() => !staticOnly && setSelectedId(w.id)}
            >
              <rect
                x={box.x}
                y={isSel ? 28 : 54}
                width={box.w}
                height={isSel ? 42 : 34}
                rx="5"
                fill={isSel ? 'var(--m22-bid-soft)' : 'var(--m22-wash)'}
                stroke={isSel ? 'var(--m22-bid)' : 'var(--m22-amber)'}
                strokeWidth={isSel ? '2' : '1.2'}
              />
              {isSel && (
                <text x={box.x + box.w / 2} y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--m22-bid)">
                  {t(w.label)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="m22-readout-grid">
        <div className="m22-readout">
          <span>{t('NY Local Window')}</span>
          <strong className="m22-num">{t(active.nyWindow)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('UTC (EST / EDT)')}</span>
          <strong className="m22-num">{t(active.utcEstEdt)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('Karachi (EST / EDT)')}</span>
          <strong className="m22-num">{t(active.karachiEstEdt)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('Primary Markets')}</span>
          <strong>{t(active.primaryMarkets)}</strong>
        </div>
      </div>

      <figcaption className="m22-caption">
        <strong>{t('2022 Model Role')}:</strong> {t(active.roleIn2022)}
      </figcaption>
    </figure>
  );
}

/* Visual 4: Interactive Displacement, CISD vs MSS Inspector */
function DisplacementMssInspector({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [checks, setChecks] = useState({
    inTimeWindow: true,
    liquiditySwept: true,
    strongDisplacement: true,
    structureShifted: !staticOnly ? false : true,
    cleanFvgFormed: !staticOnly ? false : true,
  });

  const result = evaluate2022Sequence(checks);

  const verdictText =
    result.grade === 'qualified-setup'
      ? t('Grade: Qualified ICT 2022 Setup — Await Limit Retest Into FVG')
      : result.grade === 'wait-fvg'
        ? t('Grade: No-FVG Rule — MSS Without Clean FVG; Stand Aside / Wait')
        : result.grade === 'unconfirmed-sweep'
          ? t('Grade: Unconfirmed Sweep — Do Not Buy or Sell Prior to MSS')
          : result.grade === 'no-sweep'
            ? t('Grade: Incomplete — No Liquidity Sweep Recorded Yet')
            : t('Grade: Out of Time Window — Avoid Low-Liquidity Chop');

  const items: Array<{ key: keyof typeof checks; label: string }> = [
    { key: 'inTimeWindow', label: t('1. Active America/New_York Killzone or Macro Window') },
    { key: 'liquiditySwept', label: t('2. Visible Prior High/Low Swept (BSL or SSL)') },
    { key: 'strongDisplacement', label: t('3. Energetic Full-Bodied Displacement Candles') },
    { key: 'structureShifted', label: t('4. Confirmed Opposing Swing Break (MSS)') },
    { key: 'cleanFvgFormed', label: t('5. Clean Unmitigated 3-Candle FVG Left Behind') },
  ];

  return (
    <figure className="m22-figure" data-model-2022-figure="displacement-mss-inspector">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <SlidersHorizontal size={16} aria-hidden="true" />
          {t('2022 Model Gate Inspector: Time -> Sweep -> MSS -> FVG')}
        </span>
        <span>{t('Toggle conditions to enforce strict chronological confirmation')}</span>
      </div>

      <div className="m22-detector-grid">
        {items.map((item) => (
          <label key={item.key} className="m22-detector-toggle">
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

      <p className={`m22-verdict m22-verdict-${result.grade}`}>{verdictText}</p>
    </figure>
  );
}

/* Visual 5: FVG + OTE Confluence Sandbox */
function FvgOteSandbox({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [depthPct, setDepthPct] = useState(50);
  const evalData = evaluateFvgOteConfluence(20986, 21060, 21012, 21032, depthPct, 21085)!;

  const yOf = (p: number) => 228 - ((p - 20980) / (21090 - 20980)) * 188;

  return (
    <figure className="m22-figure" data-model-2022-figure="fvg-ote-confluence-sandbox">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Scale size={16} aria-hidden="true" />
          {t('FVG Consequent Encroachment (50% CE) & OTE Confluence Sandbox')}
        </span>
        <span>{t('Slide entry depth from FVG proximal top to deep FVG low across 21,012–21,032')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-slider-row">
          <label htmlFor="m22-ote-slider">
            {t('FVG Entry Depth')}: <strong className="m22-num">{evalData.depthPct}%</strong>
          </label>
          <input
            id="m22-ote-slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={depthPct}
            onChange={(e) => setDepthPct(Number(e.target.value))}
          />
        </div>
      )}

      <svg className="m22-svg" viewBox="0 0 760 250" role="img" aria-label={t('FVG Consequent Encroachment (50% CE) & OTE Confluence Sandbox')}>
        {/* Target Line 21,085 */}
        <line x1="65" y1={yOf(21085)} x2="435" y2={yOf(21085)} stroke="var(--m22-bid)" strokeDasharray="4 4" />
        <text x="450" y={yOf(21085) + 4} fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
          {t('Target BSL: 21,085')}
        </text>

        {/* MSS High 21,060 */}
        <line x1="65" y1={yOf(21060)} x2="435" y2={yOf(21060)} stroke="var(--m22-accent)" strokeDasharray="3 3" />
        <text x="450" y={yOf(21060) + 4} fontSize="10.5" fontWeight="600" fill="var(--m22-accent)">
          {t('Impulse High: 21,060')}
        </text>

        {/* OTE Band 62%-79% */}
        <rect
          x="65"
          y={yOf(evalData.ote62)}
          width="370"
          height={yOf(evalData.ote79) - yOf(evalData.ote62)}
          fill="var(--m22-wash)"
          stroke="var(--m22-amber)"
          strokeDasharray="4 3"
        />
        <text x="450" y={yOf(evalData.ote705) + 4} fontSize="10.5" fontWeight="600" fill="var(--m22-amber)">
          {t('OTE 62%–79% Band (70.5% = 21,007.8)')}
        </text>

        {/* FVG Zone 21,012 - 21,032 */}
        <rect
          x="105"
          y={yOf(21032)}
          width="290"
          height={yOf(21012) - yOf(21032)}
          fill="var(--m22-bid-soft)"
          stroke="var(--m22-bid)"
          strokeWidth="1.6"
        />
        <text x="450" y={yOf(21022) + 4} fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
          {t('FVG 21,012–21,032 (50% CE = 21,022)')}
        </text>

        {/* Stop Line 20,984 */}
        <line x1="65" y1={yOf(20984)} x2="435" y2={yOf(20984)} stroke="var(--m22-ask)" strokeWidth="2" />
        <text x="450" y={yOf(20984) + 4} fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
          {t('Stop Beyond Sweep: 20,984')}
        </text>

        {/* Selected Entry Marker */}
        <line
          x1="60"
          y1={yOf(evalData.selectedEntryPrice)}
          x2="440"
          y2={yOf(evalData.selectedEntryPrice)}
          stroke="var(--m22-ink)"
          strokeWidth="2.2"
        />
        <rect
          x="170"
          y={yOf(evalData.selectedEntryPrice) - 12}
          width="160"
          height="24"
          rx="12"
          fill="var(--m22-paper)"
          stroke="var(--m22-bid)"
          strokeWidth="2"
        />
        <text
          x="250"
          y={yOf(evalData.selectedEntryPrice) + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="var(--m22-ink)"
        >
          {evalData.selectedEntryPrice.toFixed(1)} ({evalData.depthPct}%)
        </text>
      </svg>

      <div className="m22-readout-grid">
        <div className="m22-readout">
          <span>{t('Planned Entry Price')}</span>
          <strong className="m22-num">{evalData.selectedEntryPrice.toFixed(2)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('Discount / OTE Alignment')}</span>
          <strong className="is-ok">
            {evalData.inOteBand ? t('Inside Discount & OTE Band') : t('Inside Discount (< 50% Leg)')}
          </strong>
        </div>
        <div className="m22-readout">
          <span>{t('Stop Risk (1 MNQ = $2/pt)')}</span>
          <strong className="m22-num">{evalData.stopPoints} {t('pts')} (${(evalData.stopPoints * 2).toFixed(0)})</strong>
        </div>
        <div className="m22-readout">
          <span>{t('Reward-to-Risk (Before Costs)')}</span>
          <strong className="m22-num is-ok">{evalData.plannedR}R (+{evalData.targetPoints} {t('pts')})</strong>
        </div>
      </div>
    </figure>
  );
}

/* Visual 6: Midnight Open + Power of Three + Judas Swing */
function MidnightOpenPo3Lab({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<'acc' | 'manip' | 'dist'>(staticOnly ? 'dist' : 'dist');

  return (
    <figure className="m22-figure" data-model-2022-figure="midnight-open-po3-lab">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Sparkles size={16} aria-hidden="true" />
          {t('Power of Three (AMD), NY Midnight Open & Judas Swing Lab')}
        </span>
        <span>{t('See where the 2022 Model sits inside a bullish daily expansion profile')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('Power of Three (AMD), NY Midnight Open & Judas Swing Lab')}>
          <button type="button" className={phase === 'acc' ? 'is-active' : undefined} onClick={() => setPhase('acc')}>
            {t('1. Accumulation')}
          </button>
          <button type="button" className={phase === 'manip' ? 'is-active' : undefined} onClick={() => setPhase('manip')}>
            {t('2. Judas Swing')}
          </button>
          <button type="button" className={phase === 'dist' ? 'is-active' : undefined} onClick={() => setPhase('dist')}>
            {t('3. Distribution (2022 Entry)')}
          </button>
        </div>
      )}

      <svg className="m22-svg" viewBox="0 0 760 245" role="img" aria-label={t('Power of Three (AMD), NY Midnight Open & Judas Swing Lab')}>
        {/* Premium above Midnight Open */}
        <rect x="45" y="34" width="670" height="84" fill="var(--m22-ask-soft)" opacity="0.55" />
        <text x="695" y="54" textAnchor="end" fontSize="10.5" fontWeight="600" fill="var(--m22-ask)">
          {t('Above Midnight Open (Intraday Premium)')}
        </text>

        {/* Discount below Midnight Open */}
        <rect x="45" y="118" width="670" height="92" fill="var(--m22-bid-soft)" opacity="0.55" />
        <text x="695" y="198" textAnchor="end" fontSize="10.5" fontWeight="600" fill="var(--m22-bid)">
          {t('Below Midnight Open (Ideal Long Discount)')}
        </text>

        {/* Midnight Open Horizontal */}
        <line x1="45" y1="118" x2="715" y2="118" stroke="var(--m22-accent)" strokeWidth="2.2" strokeDasharray="5 4" />
        <text x="58" y="110" fontSize="11" fontWeight="700" fill="var(--m22-accent)">
          {t('00:00 NY Midnight Open')}
        </text>

        {/* Accumulation Box */}
        <rect x="70" y="96" width="145" height="44" rx="5" fill="var(--m22-wash)" stroke="var(--m22-amber)" />
        <text x="142" y="88" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--m22-amber)">
          {t('Asian Accumulation')}
        </text>
        <path d="M 80 118 L 110 108 L 145 128 L 180 112 L 210 122" fill="none" stroke="var(--m22-ink)" strokeWidth="2.5" />

        {/* Manipulation / Judas Swing */}
        {phase !== 'acc' && (
          <>
            <path d="M 210 122 L 265 186 L 295 168 L 325 202" fill="none" stroke="var(--m22-ask)" strokeWidth="3" />
            <text x="278" y="220" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--m22-ask)">
              {t('Judas Swing Sweeps Low (08:30 / 09:30)')}
            </text>
          </>
        )}

        {/* Distribution + 2022 FVG */}
        {phase === 'dist' && (
          <>
            <rect x="355" y="148" width="115" height="22" rx="3" fill="var(--m22-bid-soft)" stroke="var(--m22-bid)" />
            <text x="476" y="163" fontSize="10" fontWeight="600" fill="var(--m22-bid)">
              {t('2022 FVG Entry')}
            </text>
            <path d="M 325 202 L 405 130 L 435 158 L 545 86 L 675 46" fill="none" stroke="var(--m22-bid)" strokeWidth="3.2" />
            <text x="585" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--m22-bid)">
              {t('Distribution Toward PDH')}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}

/* Visual 7: Multi-Timeframe Hierarchy Matrix */
function Mtf2022Matrix({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [tierId, setTierId] = useState<'swing' | 'intraday' | 'scalp'>('intraday');
  const active = mtf2022Tiers.find((row) => row.id === tierId) || mtf2022Tiers[1];

  return (
    <figure className="m22-figure" data-model-2022-figure="mtf-2022-matrix">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <Compass size={16} aria-hidden="true" />
          {t('Multi-Timeframe Hierarchy Selector (HTF -> MSS -> FVG)')}
        </span>
        <span>{t('Scale chart roles proportionally rather than mixing distant horizons')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('Multi-Timeframe Hierarchy Selector (HTF -> MSS -> FVG)')}>
          {mtf2022Tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={tierId === tier.id ? 'is-active' : undefined}
              onClick={() => setTierId(tier.id)}
            >
              {t(tier.label)}
            </button>
          ))}
        </div>
      )}

      <div className="m22-readout-grid">
        <div className="m22-readout">
          <span>{t('1. HTF Draw Chart')}</span>
          <strong>{t(active.htfDrawChart)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('2. MSS Confirmation Chart')}</span>
          <strong>{t(active.mssConfirmChart)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('3. FVG Execution Chart')}</span>
          <strong>{t(active.entryFvgChart)}</strong>
        </div>
        <div className="m22-readout">
          <span>{t('4. Protective Stop Anchor')}</span>
          <strong>{t(active.typicalRiskStop)}</strong>
        </div>
      </div>

      <figcaption className="m22-caption">
        <strong>{t('Session Guidance')}:</strong> {t(active.guidanceNote)}
      </figcaption>
    </figure>
  );
}

/* Visual 8: 4-Trap Stick-Figure Mistake Gallery */
function MistakesStickComic({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [trap, setTrap] = useState(0);

  const traps = [
    {
      btn: t('1. Dead-Hour Chop'),
      title: t('Entering pretty 1m FVGs during 12:30 PM lunch chop'),
      fix: t('Fix: Only trigger 2022 entries inside active NY Killzones.'),
    },
    {
      btn: t('2. Buying Pre-MSS'),
      title: t('Buying immediately at a swept low before MSS confirms'),
      fix: t('Fix: Wait for full displacement closing past the opposing swing.'),
    },
    {
      btn: t('3. Weak Drift FVG'),
      title: t('Confusing tiny overlapping grind gaps for displacement'),
      fix: t('Fix: Require energetic Candle 2 body expansion and wide gap displacement.'),
    },
    {
      btn: t('4. Tight Inside Stop'),
      title: t('Hiding stops inside Candle 2 to force artificial 10R ratios'),
      fix: t('Fix: Place structural stops beyond the sweep extreme wick.'),
    },
  ];

  return (
    <figure className="m22-figure" data-model-2022-figure="mistakes-stick-comic">
      <div className="m22-figure-head">
        <span className="m22-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          {t('Four Common Mistakes That Break 2022 Model Setups')}
        </span>
        <span>{t('Animated stick-figure mistake cards · Click a trap to inspect the structural fix')}</span>
      </div>

      {!staticOnly && (
        <div className="m22-controls" role="group" aria-label={t('Four Common Mistakes That Break 2022 Model Setups')}>
          {traps.map((item, idx) => (
            <button
              key={item.btn}
              type="button"
              className={trap === idx ? 'is-active' : undefined}
              onClick={() => setTrap(idx)}
            >
              {item.btn}
            </button>
          ))}
        </div>
      )}

      <svg className="m22-svg" viewBox="0 0 760 205" role="img" aria-label={t('Four Common Mistakes That Break 2022 Model Setups')}>
        {/* Left: Mistake Stick Figure */}
        <rect x="28" y="18" width="335" height="168" rx="8" fill="var(--m22-ask-soft)" stroke="var(--m22-ask)" />
        <g className="m22-char-group">
          <StickPerson x={86} y={96} color="var(--m22-ask)" pose="panic" scale={0.95} />
        </g>
        {trap === 0 && (
          <path d="M 145 92 L 175 112 L 205 90 L 235 114 L 265 88 L 295 116 L 325 94" fill="none" stroke="var(--m22-ask)" strokeWidth="2.6" />
        )}
        {trap === 1 && (
          <path d="M 145 55 L 205 96 L 265 138 L 325 162" fill="none" stroke="var(--m22-ask)" strokeWidth="2.8" />
        )}
        {trap === 2 && (
          <path d="M 145 126 L 175 118 L 205 124 L 235 110 L 265 119 L 295 104 L 325 138" fill="none" stroke="var(--m22-ask)" strokeWidth="2.6" />
        )}
        {trap === 3 && (
          <>
            <path d="M 145 142 L 205 72 L 245 112 L 295 122 L 325 66" fill="none" stroke="var(--m22-ask)" strokeWidth="2.6" />
            <line x1="190" y1="108" x2="325" y2="108" stroke="var(--m22-ink)" strokeDasharray="3 3" />
          </>
        )}
        <text x="195" y="168" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--m22-ask)">
          {traps[trap].title}
        </text>

        {/* Right: Disciplined Stick Figure */}
        <rect x="396" y="18" width="336" height="168" rx="8" fill="var(--m22-bid-soft)" stroke="var(--m22-bid)" />
        <g className="m22-char-group">
          <StickPerson x={455} y={96} color="var(--m22-bid)" pose="cheer" scale={0.95} />
        </g>
        <path d="M 515 132 L 550 150 L 605 74 L 635 110 L 700 54" fill="none" stroke="var(--m22-bid)" strokeWidth="2.8" />
        <rect x="572" y="96" width="76" height="20" rx="3" fill="var(--m22-paper)" stroke="var(--m22-bid)" />
        <text x="564" y="168" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--m22-bid)">
          {traps[trap].fix}
        </text>
      </svg>
    </figure>
  );
}

export function Model2022Visual({
  kind,
  staticOnly = false,
}: {
  kind: Model2022VisualKind;
  staticOnly?: boolean;
}) {
  switch (kind) {
    case 'model2022-comic-intro':
      return <ComicIntro staticOnly={staticOnly} />;
    case 'animated-2022-lifecycle':
      return <AnimatedLifecycle staticOnly={staticOnly} />;
    case 'killzone-clock-timeline':
      return <KillzoneClockTimeline staticOnly={staticOnly} />;
    case 'displacement-mss-inspector':
      return <DisplacementMssInspector staticOnly={staticOnly} />;
    case 'fvg-ote-confluence-sandbox':
      return <FvgOteSandbox staticOnly={staticOnly} />;
    case 'midnight-open-po3-lab':
      return <MidnightOpenPo3Lab staticOnly={staticOnly} />;
    case 'mtf-2022-matrix':
      return <Mtf2022Matrix staticOnly={staticOnly} />;
    case 'mistakes-stick-comic':
      return <MistakesStickComic staticOnly={staticOnly} />;
  }
}
