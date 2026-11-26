import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Compass,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  classifyOteSlider,
  computeOteLevels,
  evaluateOteConfluence,
  oteMtfProfiles,
  syntheticOteBearishBars,
  syntheticOteBearishFailBars,
  syntheticOteBullishBars,
  syntheticOteDeepSweepBars,
  syntheticOteFailureBars,
  syntheticOteShallowBars,
  type OteCinemaBranch,
  type OtePolarity,
  type OteSyntheticBar,
} from '../utils/oteMath';
import { OteScene } from './OteScene';
import { useTranslation } from '../i18n/TranslationProvider';

export type OteVisualKind =
  | 'ote-comic-intro'
  | 'ote-anatomy-animated'
  | 'ote-calculator-sandbox'
  | 'ote-pd-confluence'
  | 'ote-anchor-comparison'
  | 'ote-bearish-cinema'
  | 'ote-extension-targets'
  | 'ote-mtf-alignment'
  | 'ote-mistakes-comic';

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

/** Shared horizontal-level 2D SVG candlestick chart for OTE fallback & static SSR */
function OteFallbackChart({
  bars,
  count,
  bear = false,
}: {
  bars: OteSyntheticBar[];
  count: number;
  bear?: boolean;
}) {
  const lo = bear ? 1.073 : 20380;
  const hi = bear ? 1.0915 : 20572;
  const scaleY = (p: number) => 255 - ((p - lo) / (hi - lo)) * 225;
  const start = Math.max(0, count - 11);
  const shown = bars.slice(start, count);
  const fibReady = count >= 4;

  const p0 = bear ? 1.08 : 20500;
  const p50 = bear ? 1.085 : 20450;
  const p62 = bear ? 1.0862 : 20438;
  const p705 = bear ? 1.08705 : 20429.5;
  const p79 = bear ? 1.0879 : 20421;
  const p100 = bear ? 1.09 : 20400;
  const pTp1 = bear ? 1.0773 : 20527;
  const pTp2 = bear ? 1.0738 : 20562;

  const bandTop = Math.min(scaleY(p62), scaleY(p79));
  const bandH = Math.max(6, Math.abs(scaleY(p62) - scaleY(p79)));

  return (
    <svg viewBox="0 0 760 275" className="ote-svg" role="img" aria-label={bear ? 'Bearish OTE Chart' : 'Bullish OTE Chart'}>
      {fibReady && (
        <>
          <rect x={42} y={bandTop} width={585} height={bandH} fill="var(--ote-accent-soft)" stroke="var(--ote-accent)" strokeOpacity={0.4} strokeDasharray="3 3" />
          <line x1={42} y1={scaleY(p705)} x2={627} y2={scaleY(p705)} stroke="var(--ote-bid)" strokeWidth={1.8} />
          <text x={635} y={scaleY(p705) + 4} fontSize={11} fontWeight={700} fill="var(--ote-bid)">
            0.705 ({bear ? '1.08705' : '20,429.5'})
          </text>
          <line x1={42} y1={scaleY(p50)} x2={627} y2={scaleY(p50)} stroke="var(--ote-amber)" strokeDasharray="4 4" />
          <text x={635} y={scaleY(p50) + 4} fontSize={10.5} fontWeight={600} fill="var(--ote-amber)">
            0.50 ({bear ? '1.0850' : '20,450'})
          </text>
          <line x1={42} y1={scaleY(p0)} x2={627} y2={scaleY(p0)} stroke="var(--ote-accent)" strokeDasharray="4 4" />
          <text x={635} y={scaleY(p0) + 4} fontSize={10.5} fontWeight={600} fill="var(--ote-accent)">
            0.0 ({bear ? '1.0800' : '20,500'})
          </text>
        </>
      )}
      <line x1={42} y1={scaleY(p100)} x2={627} y2={scaleY(p100)} stroke="var(--ote-ask)" strokeWidth={1.6} strokeDasharray="5 3" />
      <text x={635} y={scaleY(p100) + 4} fontSize={10.5} fontWeight={700} fill="var(--ote-ask)">
        1.0 ({bear ? '1.0900' : '20,400'})
      </text>
      {count >= 9 && (
        <>
          <line x1={42} y1={scaleY(pTp1)} x2={627} y2={scaleY(pTp1)} stroke="var(--ote-bid)" strokeDasharray="3 3" />
          <text x={635} y={scaleY(pTp1) + 4} fontSize={10.5} fontWeight={600} fill="var(--ote-bid)">
            -0.27 ({bear ? '1.0773' : '20,527'})
          </text>
          <line x1={42} y1={scaleY(pTp2)} x2={627} y2={scaleY(pTp2)} stroke="var(--ote-bid)" strokeDasharray="3 3" />
          <text x={635} y={scaleY(pTp2) + 4} fontSize={10.5} fontWeight={600} fill="var(--ote-bid)">
            -0.62 ({bear ? '1.0738' : '20,562'})
          </text>
        </>
      )}
      {shown.map((bar, i) => {
        const cx = 74 + i * 50;
        const up = bar.close >= bar.open;
        const color = up ? 'var(--ote-bid)' : 'var(--ote-ask)';
        const yH = scaleY(bar.high);
        const yL = scaleY(bar.low);
        const yT = scaleY(Math.max(bar.open, bar.close));
        const yB = scaleY(Math.min(bar.open, bar.close));
        return (
          <g key={bar.label}>
            <line x1={cx} y1={yH} x2={cx} y2={yL} stroke={color} strokeWidth={2.2} />
            <rect x={cx - 10} y={yT} width={20} height={Math.max(5, yB - yT)} rx={2} fill={color} />
            {bar.tag && (
              <text x={cx} y={up ? yH - 7 : yL + 13} textAnchor="middle" fontSize={10} fontWeight={700} fill={color}>
                {bar.tag}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* Visual 1: Split Colour-Block Comic — Retail Chaser vs. Patient OTE Planner */
function ComicIntro({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(staticOnly ? 2 : 0);

  const labels = [
    t('1. Impulse Breakout'),
    t('2. Chasing 0.0 Top'),
    t('3. 0.705 Sweet Spot'),
    t('4. Outcome Contrast'),
  ];

  return (
    <figure className="ote-figure" data-ote-figure="ote-comic-intro">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <Users size={16} aria-hidden="true" />
          <span>{t('Retail Chaser vs. Patient OTE Planner')}</span>
        </span>
        <span>{t('Story Comic · Synthetic NQ Illustration')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls" role="group" aria-label={t('Retail Chaser vs. Patient OTE Planner')}>
          {labels.map((label, idx) => (
            <button key={label} type="button" className={step === idx ? 'is-active' : undefined} onClick={() => setStep(idx)}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 278" className="ote-svg" role="img" aria-label={t('Retail Chaser vs. Patient OTE Planner')}>
          <rect x={8} y={10} width={362} height={258} rx={10} fill="var(--ote-ask-soft)" stroke="var(--ote-ask)" strokeOpacity={0.35} />
          <text x={24} y={35} fontSize={12.5} fontWeight={700} fill="var(--ote-ask)">
            {step === 0 ? 'Impulse: 20,400 -> 20,500' : step === 1 ? 'Buys Peak 20,500 (0.0)' : step === 2 ? 'Drawn Back Down to 0.705' : 'Tiny 0.26R or Panicked Cut'}
          </text>
          <path d="M 30 162 L 100 162 L 170 68 L 245 138 L 330 148" fill="none" stroke="var(--ote-ask)" strokeWidth={2.5} />
          <line x1={26} y1={68} x2={346} y2={68} stroke="var(--ote-ask)" strokeDasharray="4 4" strokeOpacity={0.7} />
          <text x={265} y={61} fontSize={10.5} fill="var(--ote-ask)">0.0 (20,500)</text>
          {step >= 1 && <circle cx={170} cy={68} r={6} fill="var(--ote-ask)" />}

          <g className="ote-char-group">
            <StickPerson x={76} y={224} color="var(--ote-ask)" pose={step === 1 ? 'panic' : step >= 2 ? 'slump' : 'point'} />
          </g>
          <rect x={115} y={184} width={235} height={36} rx={8} fill="var(--ote-paper)" stroke="var(--ote-ask)" />
          <text x={232} y={206} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--ote-ink)">
            {step <= 1 ? t('Buy 0.0! FOMO!') : t('Ouch! Stopped!')}
          </text>
          <rect x={115} y={232} width={45} height={14} rx={4} fill="var(--ote-ask)" />
          <text x={170} y={243} fontSize={11} fontWeight={700} fill="var(--ote-ask)">0.26R (105 pts risk)</text>

          <rect x={390} y={10} width={362} height={258} rx={10} fill="var(--ote-bid-soft)" stroke="var(--ote-bid)" strokeOpacity={0.35} />
          <text x={406} y={35} fontSize={12.5} fontWeight={700} fill="var(--ote-bid)">
            {step === 0 ? 'Marks 1.0 (20,400) -> 0.0 (20,500)' : step === 1 ? 'Skips 0.50 Premium (20,450)' : step === 2 ? 'Fills Inside 0.705 + FVG' : 'Targets -0.27 (20,527) = 2.83R'}
          </text>
          <rect x={410} y={118} width={322} height={36} rx={4} fill="var(--ote-bid)" fillOpacity={0.18} stroke="var(--ote-bid)" strokeDasharray="3 3" />
          <text x={630} y={140} fontSize={10.5} fontWeight={600} fill="var(--ote-bid)">0.62–0.79 OTE</text>
          <path
            d={
              step === 0
                ? 'M 418 162 L 490 162 L 560 68'
                : step === 1
                  ? 'M 418 162 L 490 162 L 560 68 L 598 104'
                  : step === 2
                    ? 'M 418 162 L 490 162 L 560 68 L 624 136'
                    : 'M 418 162 L 490 162 L 560 68 L 624 136 L 722 46'
            }
            fill="none"
            stroke="var(--ote-bid)"
            strokeWidth={2.7}
          />
          {step >= 2 && <circle cx={624} cy={136} r={6} fill="var(--ote-bid)" />}
          {step === 3 && <circle cx={722} cy={46} r={6} fill="var(--ote-accent)" />}

          <g className="ote-char-group">
            <StickPerson x={456} y={224} color="var(--ote-bid)" pose={step === 3 ? 'cheer' : step === 2 ? 'point' : 'wait'} />
          </g>
          <rect x={496} y={184} width={235} height={36} rx={8} fill="var(--ote-paper)" stroke="var(--ote-bid)" />
          <text x={614} y={206} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--ote-ink)">
            {step <= 2 ? t('Wait for 0.705') : t('Calm 2.83R plan')}
          </text>
          <rect x={496} y={232} width={175} height={14} rx={4} fill="var(--ote-bid)" />
          <text x={678} y={243} fontSize={11} fontWeight={700} fill="var(--ote-bid)">2.83R</text>
        </svg>
      </div>

      <figcaption className="ote-caption">
        {step <= 1
          ? t('Retail Chaser: buys 20,500 top (0.0) -> huge risk, tight drawdown panic.')
          : t('OTE Planner: skips 0.50 Premium, waits inside 0.62–0.79 + FVG at 20,429.50.')}
      </figcaption>
    </figure>
  );
}

/* Visual 2: 3D Three.js Motion Study 02 Cinema — Bullish NQ OTE + 4 Outcome Branches */
function BullishOteCinema({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const visible = useRef(true);
  const [branch, setBranch] = useState<OteCinemaBranch>('target');
  const [count, setCount] = useState(staticOnly ? 11 : 4);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [reduced, setReduced] = useState(false);

  const bars =
    branch === 'invalidation'
      ? syntheticOteFailureBars
      : branch === 'shallow-miss'
        ? syntheticOteShallowBars
        : branch === 'deep-sweep'
          ? syntheticOteDeepSweepBars
          : syntheticOteBullishBars;

  const shown = staticOnly ? bars.length : Math.min(count, bars.length);

  useEffect(() => {
    if (staticOnly) return;
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(q.matches);
      if (q.matches) setPlaying(false);
    };
    sync();
    q.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      q.removeEventListener('change', sync);
      io.disconnect();
    };
  }, [staticOnly]);

  useEffect(() => {
    if (!playing || staticOnly || reduced) return;
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setCount((c) => {
        if (c >= bars.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 1150 / speed);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, reduced, bars.length, speed]);

  const branchButtons: { id: OteCinemaBranch; label: string }[] = [
    { id: 'target', label: t('Target (-0.62 Expansion)') },
    { id: 'invalidation', label: t('Invalidation (1.0 Break)') },
    { id: 'shallow-miss', label: t('Shallow Miss (0.50 Bounce)') },
    { id: 'deep-sweep', label: t('Deep Sweep (0.87 Wick)') },
  ];

  const statusText =
    shown < 4
      ? t('Impulse leg forming from 1.0 (20,400.00) toward 0.0 (20,500.00).')
      : branch === 'invalidation' && shown >= 8
        ? t('Failure Branch: Clean break below 1.0 (20,400) -> Thesis Invalidated')
        : branch === 'shallow-miss' && shown >= 6
          ? t('Shallow Miss: Rebounds at 0.50 (20,450) without entering 0.62–0.79 — setup skipped cleanly.')
          : branch === 'deep-sweep' && shown >= 7
            ? t('Deep Sweep: Wicks to 20,413 (0.87) past 0.79 while holding 1.0 (20,400) — shows why stops belong outside 1.0.')
            : shown >= 9
              ? t('Success Path: Hold above 1.0 -> Expand to -0.27 & -0.62')
              : t('Retracement inside 0.62–0.79 Discount OTE & FVG 50% CE.');

  return (
    <figure ref={rootRef} className="ote-figure" data-ote-figure="ote-anatomy-animated">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <Activity size={16} aria-hidden="true" />
          <span>{t('3D OTE Range Lifecycle & Outcome Branches')}</span>
        </span>
        <span>{t('3D Motion Study · Synthetic NQ')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls" role="group" aria-label={t('Outcome Branch Selector')}>
          {branchButtons.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={branch === b.id}
              onClick={() => {
                setBranch(b.id);
                setCount(4);
                setPlaying(false);
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      <div className="ote-time-head">
        <div>
          <span>{t('NY Session Bar')}</span>
          <bdi>{bars[shown - 1]?.timeNy} NY</bdi>
          <small>America/New_York · {bars[shown - 1]?.tag || `Bar ${shown}`}</small>
        </div>
        <ol>
          <li data-active={shown >= 1}>{t('1.0 Origin')}</li>
          <li data-active={shown >= 4}>{t('0.0 Extreme')}</li>
          <li data-active={shown >= 7}>{t('0.705 Sweet Spot')}</li>
          <li data-active={shown >= 9}>{t('Outcome')}</li>
        </ol>
      </div>

      <OteScene bars={bars} count={shown} bear={false} reduced={reduced} staticOnly={staticOnly} mark="NQ / M5 · OTE 3D">
        <OteFallbackChart bars={bars} count={shown} bear={false} />
      </OteScene>

      {!staticOnly && (
        <>
          <div className="ote-controls">
            <button type="button" onClick={() => { setCount(1); setPlaying(false); }}>
              <RotateCcw size={14} aria-hidden="true" />
              <span>{t('Restart')}</span>
            </button>
            <button type="button" disabled={shown <= 1} onClick={() => { setCount((c) => Math.max(1, c - 1)); setPlaying(false); }}>
              <SkipBack size={14} aria-hidden="true" />
              <span>{t('Back')}</span>
            </button>
            <button
              type="button"
              disabled={reduced}
              aria-pressed={playing}
              onClick={() => {
                if (shown >= bars.length) setCount(1);
                setPlaying((p) => !p);
              }}
            >
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              <span>{playing ? t('Pause') : t('Play')}</span>
            </button>
            <button type="button" disabled={shown >= bars.length} onClick={() => { setCount((c) => Math.min(bars.length, c + 1)); setPlaying(false); }}>
              <SkipForward size={14} aria-hidden="true" />
              <span>{t('Step Forward')}</span>
            </button>
            <button type="button" onClick={() => { setCount(bars.length); setPlaying(false); }}>
              {t('Reveal All')}
            </button>
            <label>
              <span>{t('Speed')}</span>
              <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                <option value={0.5}>0.5×</option>
                <option value={1}>1×</option>
                <option value={2}>2×</option>
              </select>
            </label>
          </div>

          <label className="ote-scrubber">
            <span>{t('Animation Progress')} <bdi className="ote-num">{shown} / {bars.length}</bdi></span>
            <input type="range" min={1} max={bars.length} value={shown} onChange={(e) => { setCount(Number(e.target.value)); setPlaying(false); }} />
          </label>
        </>
      )}

      <div className="ote-readout-bar" role="status" aria-live="polite">
        {statusText}
      </div>
    </figure>
  );
}

/* Visual 3: FIXED Horizontal-Level Y-Axis OTE Range & Polarity Calculator */
function CalculatorSandbox({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [polarity, setPolarity] = useState<OtePolarity>('bullish');
  const [ratioPct, setRatioPct] = useState(70.5);

  const isBull = polarity === 'bullish';
  const origin = isBull ? 20400 : 1.09;
  const end = isBull ? 20500 : 1.08;
  const decimals = isBull ? 2 : 4;
  const readout = classifyOteSlider(polarity, origin, end, ratioPct, decimals)!;
  const levels = readout.levels;

  // Vertical Y-axis mapping: Top (y=28) = High Price, Bottom (y=252) = Low Price
  const minP = isBull ? levels.stopPrice - levels.rangeSpan * 0.08 : levels.anchorEnd - levels.rangeSpan * 0.08;
  const maxP = isBull ? levels.anchorEnd + levels.rangeSpan * 0.08 : levels.stopPrice + levels.rangeSpan * 0.08;
  const priceToY = (p: number) => 254 - ((p - minP) / (maxP - minP)) * 224;

  const y0 = priceToY(levels.anchorEnd);
  const y50 = priceToY(levels.equilibrium50);
  const y62 = priceToY(levels.ote62);
  const y705 = priceToY(levels.ote705);
  const y79 = priceToY(levels.ote79);
  const y100 = priceToY(levels.anchorOrigin);
  const yStop = priceToY(levels.stopPrice);
  const yCursor = priceToY(readout.price);

  const oteTopY = Math.min(y62, y79);
  const oteHeight = Math.max(10, Math.abs(y79 - y62));

  return (
    <figure className="ote-figure" data-ote-figure="ote-calculator-sandbox">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>{t('Interactive OTE Range & Polarity Calculator')}</span>
        </span>
        <span>{t('Horizontal Price Grid · Switch Bullish / Bearish')}</span>
      </div>

      {!staticOnly && (
        <>
          <div className="ote-controls">
            <button type="button" className={isBull ? 'is-active' : undefined} onClick={() => setPolarity('bullish')}>
              {t('Bullish Discount (NQ 20,400 -> 20,500)')}
            </button>
            <button type="button" className={!isBull ? 'is-active' : undefined} onClick={() => setPolarity('bearish')}>
              {t('Bearish Premium (EUR/USD 1.0900 -> 1.0800)')}
            </button>
          </div>
          <div className="ote-slider-row">
            <label htmlFor="ote-ratio-slider">{t('Retracement Depth')}:</label>
            <input
              id="ote-ratio-slider"
              type="range"
              min={25}
              max={105}
              step={0.5}
              value={ratioPct}
              onChange={(e) => setRatioPct(Number(e.target.value))}
            />
            <strong className="ote-num">{(ratioPct / 100).toFixed(3)}</strong>
          </div>
        </>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 280" className="ote-svg" role="img" aria-label={t('Interactive OTE Range & Polarity Calculator')}>
          <rect x={24} y={12} width={712} height={256} rx={10} fill="var(--ote-paper)" stroke="var(--ote-line)" />

          {/* Premium / Discount background halves */}
          <rect
            x={40}
            y={Math.min(y0, y50)}
            width={510}
            height={Math.abs(y50 - y0)}
            fill={isBull ? 'var(--ote-ask-soft)' : 'var(--ote-bid-soft)'}
            fillOpacity={0.38}
          />
          <rect
            x={40}
            y={Math.min(y50, y100)}
            width={510}
            height={Math.abs(y100 - y50)}
            fill={isBull ? 'var(--ote-bid-soft)' : 'var(--ote-ask-soft)'}
            fillOpacity={0.32}
          />

          {/* Horizontal OTE 0.62 - 0.79 Shaded Pocket */}
          <rect x={40} y={oteTopY} width={510} height={oteHeight} fill="var(--ote-bid-soft)" stroke="var(--ote-bid)" strokeDasharray="4 3" />

          {/* Horizontal Fib Lines + Right-Axis Labels */}
          <line x1={40} y1={y0} x2={550} y2={y0} stroke="var(--ote-accent)" strokeWidth={1.6} />
          <text x={562} y={y0 + 4} fontSize={11.5} fontWeight={700} fill="var(--ote-accent)">
            0.00 Extreme ({levels.anchorEnd.toFixed(decimals)})
          </text>

          <line x1={40} y1={y50} x2={550} y2={y50} stroke="var(--ote-amber)" strokeWidth={1.6} strokeDasharray="5 4" />
          <text x={562} y={y50 + 4} fontSize={11.5} fontWeight={700} fill="var(--ote-amber)">
            0.50 Eq ({levels.equilibrium50.toFixed(decimals)})
          </text>

          <line x1={40} y1={y705} x2={550} y2={y705} stroke="var(--ote-bid)" strokeWidth={2} />
          <text x={562} y={y705 + 4} fontSize={11.5} fontWeight={700} fill="var(--ote-bid)">
            0.705 OTE ({levels.ote705.toFixed(decimals)})
          </text>

          <line x1={40} y1={y100} x2={550} y2={y100} stroke="var(--ote-ask)" strokeWidth={1.8} />
          <text x={562} y={y100 + 4} fontSize={11.5} fontWeight={700} fill="var(--ote-ask)">
            1.00 Origin ({levels.anchorOrigin.toFixed(decimals)})
          </text>

          <line x1={40} y1={yStop} x2={550} y2={yStop} stroke="var(--ote-ask)" strokeWidth={1.2} strokeDasharray="2 3" />
          <text x={562} y={yStop + 4} fontSize={10.5} fontWeight={600} fill="var(--ote-ask)">
            5% Buffer Stop ({levels.stopPrice.toFixed(decimals)})
          </text>

          {/* Left Impulse Leg Candlesticks */}
          {[0, 0.34, 0.68, 1].map((prog, idx) => {
            const cx = 86 + idx * 44;
            const prevP = levels.anchorOrigin + (levels.anchorEnd - levels.anchorOrigin) * (idx === 0 ? 0 : [0, 0.34, 0.68][idx - 1]);
            const curP = levels.anchorOrigin + (levels.anchorEnd - levels.anchorOrigin) * prog;
            const yA = priceToY(prevP);
            const yB = priceToY(curP);
            const top = Math.min(yA, yB);
            const h = Math.max(8, Math.abs(yB - yA));
            const col = isBull ? 'var(--ote-bid)' : 'var(--ote-ask)';
            return (
              <g key={idx}>
                <line x1={cx} y1={top - 5} x2={cx} y2={top + h + 5} stroke={col} strokeWidth={2} />
                <rect x={cx - 10} y={top} width={20} height={h} rx={2} fill={col} />
              </g>
            );
          })}

          {/* Path from 0.0 extreme to Interactive Horizontal Retracement Cursor */}
          <path
            d={`M 218 ${y0} L 360 ${yCursor} L 495 ${yCursor}`}
            fill="none"
            stroke="var(--ote-accent)"
            strokeWidth={2.4}
            strokeDasharray="5 3"
          />
          <circle cx={360} cy={yCursor} r={8} fill="var(--ote-accent)" />
          <rect x={378} y={Math.max(16, Math.min(242, yCursor - 12))} width={154} height={24} rx={6} fill="var(--ote-accent)" />
          <text
            x={455}
            y={Math.max(32, Math.min(258, yCursor + 4))}
            textAnchor="middle"
            fontSize={11.5}
            fontWeight={700}
            fill="#ffffff"
          >
            {readout.ratio.toFixed(3)} · {readout.price.toFixed(decimals)}
          </text>
        </svg>
      </div>

      <div className="ote-readout-grid">
        <div className="ote-readout">
          <span>{t('Calculated Price')}</span>
          <strong className="ote-num">{readout.price.toFixed(decimals)}</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Zone Reading')}</span>
          <strong className={readout.zoneStatus === 'sweet-spot' || readout.zoneStatus === 'ote-band' ? 'is-ok' : 'is-warn'}>
            {t(readout.zoneLabel)}
          </strong>
        </div>
        <div className="ote-readout">
          <span>{t('0.705 Sweet Spot')}</span>
          <strong className="ote-num">{levels.ote705.toFixed(decimals)}</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Reward to -0.27 / -0.62')}</span>
          <strong className="ote-num">{readout.rNeg27}R / {readout.rNeg62}R</strong>
        </div>
      </div>
    </figure>
  );
}

/* Visual 4: Colour-Block Atlas Confluence Matrix */
function PdConfluenceInspector({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [inOteBand, setInOteBand] = useState(true);
  const [hasFvgCe, setHasFvgCe] = useState(true);
  const [hasOrderBlock, setHasOrderBlock] = useState(true);
  const [inKillzone, setInKillzone] = useState(true);

  const verdict = evaluateOteConfluence({ inOteBand, hasFvgCe, hasOrderBlock, inKillzone });
  const verdictClass =
    verdict.grade === 'qualified-ote'
      ? 'ote-verdict ote-verdict-qualified'
      : verdict.grade === 'partial-ote'
        ? 'ote-verdict ote-verdict-partial'
        : 'ote-verdict ote-verdict-invalid';

  return (
    <figure className="ote-figure" data-ote-figure="ote-pd-confluence">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <Layers size={16} aria-hidden="true" />
          <span>{t('OTE + PD Array Confluence Inspector')}</span>
        </span>
        <span>{t('Toggle structural filters inside 0.62–0.79')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-detector-grid">
          <label className="ote-detector-toggle">
            <input type="checkbox" checked={inOteBand} onChange={(e) => setInOteBand(e.target.checked)} />
            <span>{t('Price inside 0.62–0.79 OTE Band')}</span>
          </label>
          <label className="ote-detector-toggle">
            <input type="checkbox" checked={hasFvgCe} onChange={(e) => setHasFvgCe(e.target.checked)} />
            <span>{t('Overlapping Fair Value Gap (50% CE)')}</span>
          </label>
          <label className="ote-detector-toggle">
            <input type="checkbox" checked={hasOrderBlock} onChange={(e) => setHasOrderBlock(e.target.checked)} />
            <span>{t('Overlapping Order Block / Breaker')}</span>
          </label>
          <label className="ote-detector-toggle">
            <input type="checkbox" checked={inKillzone} onChange={(e) => setInKillzone(e.target.checked)} />
            <span>{t('Active Killzone Window (NY Time)')}</span>
          </label>
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 220" className="ote-svg" role="img" aria-label={t('OTE + PD Array Confluence Inspector')}>
          <rect x={16} y={14} width={185} height={192} rx={10} fill="var(--ote-accent)" />
          <text x={32} y={70} fontSize={44} fontWeight={700} fill="#ffffff">{verdict.score}/4</text>
          <text x={32} y={98} fontSize={13} fontWeight={600} fill="#dbe4ff">CONFLUENCE STACK</text>
          <text x={32} y={146} fontSize={12} fill="#eef1ff">{inKillzone ? '09:30–10:30 NY Active' : 'Low-Volume Window'}</text>
          <text x={32} y={172} fontSize={11.5} fill="#eef1ff">0.62–0.79 Zone</text>

          <rect x={214} y={14} width={530} height={192} rx={10} fill="var(--ote-paper)" stroke="var(--ote-line)" />
          <rect
            x={236}
            y={74}
            width={486}
            height={70}
            fill={inOteBand ? 'var(--ote-bid-soft)' : 'var(--ote-ask-soft)'}
            stroke={inOteBand ? 'var(--ote-bid)' : 'var(--ote-ask)'}
            strokeDasharray="4 4"
          />
          <text x={248} y={92} fontSize={11.5} fontWeight={700} fill={inOteBand ? 'var(--ote-bid)' : 'var(--ote-ask)'}>
            0.62–0.79 OTE (20,438 – 20,421)
          </text>

          {hasFvgCe && (
            <>
              <rect x={350} y={84} width={250} height={36} rx={4} fill="var(--ote-accent-soft)" stroke="var(--ote-accent)" />
              <line x1={350} y1={102} x2={600} y2={102} stroke="var(--ote-accent)" strokeDasharray="3 3" />
              <text x={475} y={106} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--ote-accent)">
                FVG 50% CE (20,433.00)
              </text>
            </>
          )}

          {hasOrderBlock && (
            <>
              <rect x={390} y={122} width={210} height={20} rx={4} fill="var(--ote-wash)" stroke="var(--ote-amber)" />
              <text x={495} y={136} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--ote-amber)">
                Order Block (20,424 – 20,430)
              </text>
            </>
          )}

          <path
            d={inOteBand ? 'M 248 172 L 325 36 L 420 108 L 535 108 L 702 32' : 'M 248 172 L 325 36 L 420 56 L 535 60 L 702 52'}
            fill="none"
            stroke={inOteBand ? 'var(--ote-bid)' : 'var(--ote-ask)'}
            strokeWidth={2.7}
          />
        </svg>
      </div>

      <div className={verdictClass}>
        {t(verdict.label)} ({t('Active Filters')}: <span className="ote-num">{verdict.score}/4</span>) — {t(verdict.summary)}
      </div>
    </figure>
  );
}

/* Visual 5: Wick-to-Wick vs. Body-to-Body Anchor Blueprint */
function AnchorComparison({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'wick' | 'body' | 'micro'>('wick');

  return (
    <figure className="ote-figure" data-ote-figure="ote-anchor-comparison">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <Compass size={16} aria-hidden="true" />
          <span>{t('Anchor Selection & Wick vs. Body Lab')}</span>
        </span>
        <span>{t('Compare valid ranges vs. micro-chop')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls">
          <button type="button" className={mode === 'wick' ? 'is-active' : undefined} onClick={() => setMode('wick')}>
            {t('Valid Displacement (Wick-to-Wick)')}
          </button>
          <button type="button" className={mode === 'body' ? 'is-active' : undefined} onClick={() => setMode('body')}>
            {t('Body-to-Body Anchor')}
          </button>
          <button type="button" className={mode === 'micro' ? 'is-active' : undefined} onClick={() => setMode('micro')}>
            {t('Invalid Micro-Swing Chop')}
          </button>
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 220" className="ote-svg" role="img" aria-label={t('Anchor Selection & Wick vs. Body Lab')}>
          <rect x={16} y={14} width={728} height={192} rx={10} fill="var(--ote-paper)" stroke="var(--ote-line)" />
          <line x1={120} y1={174} x2={120} y2={132} stroke="var(--ote-bid)" strokeWidth={2.4} />
          <rect x={109} y={144} width={22} height={18} fill="var(--ote-bid)" rx={2} />
          <line x1={210} y1={148} x2={210} y2={76} stroke="var(--ote-bid)" strokeWidth={2.4} />
          <rect x={199} y={84} width={22} height={54} fill="var(--ote-bid)" rx={2} />
          <line x1={300} y1={90} x2={300} y2={34} stroke="var(--ote-bid)" strokeWidth={2.4} />
          <rect x={289} y={46} width={22} height={38} fill="var(--ote-bid)" rx={2} />

          {mode === 'wick' && (
            <>
              <line x1={76} y1={174} x2={710} y2={174} stroke="var(--ote-ask)" strokeWidth={2} />
              <text x={550} y={166} fontSize={11} fontWeight={700} fill="var(--ote-ask)">1.0 Wick Low (20,400.00)</text>
              <line x1={76} y1={34} x2={710} y2={34} stroke="var(--ote-accent)" strokeWidth={2} />
              <text x={550} y={50} fontSize={11} fontWeight={700} fill="var(--ote-accent)">0.0 Wick High (20,500.00)</text>
              <rect x={355} y={118} width={335} height={28} fill="var(--ote-bid-soft)" stroke="var(--ote-bid)" />
              <text x={522} y={136} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--ote-bid)">
                0.62–0.79 OTE (20,438 – 20,421)
              </text>
            </>
          )}

          {mode === 'body' && (
            <>
              <line x1={76} y1={162} x2={710} y2={162} stroke="var(--ote-amber)" strokeWidth={2} />
              <text x={540} y={154} fontSize={11} fontWeight={700} fill="var(--ote-amber)">1.0 Open/Close Body (20,408)</text>
              <line x1={76} y1={46} x2={710} y2={46} stroke="var(--ote-accent)" strokeWidth={2} />
              <text x={540} y={62} fontSize={11} fontWeight={700} fill="var(--ote-accent)">0.0 Close Body (20,492)</text>
              <rect x={355} y={114} width={335} height={24} fill="var(--ote-wash)" stroke="var(--ote-amber)" />
              <text x={522} y={130} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--ote-amber)">
                Body OTE (20,440 – 20,425.6)
              </text>
            </>
          )}

          {mode === 'micro' && (
            <>
              <line x1={260} y1={90} x2={700} y2={90} stroke="var(--ote-ask)" strokeDasharray="4 4" strokeWidth={2} />
              <line x1={260} y1={46} x2={700} y2={46} stroke="var(--ote-ask)" strokeDasharray="4 4" strokeWidth={2} />
              <rect x={355} y={66} width={335} height={22} fill="var(--ote-ask-soft)" stroke="var(--ote-ask)" />
              <text x={522} y={81} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--ote-ask)">
                Micro Trap (20,470 — Still in Premium!)
              </text>
            </>
          )}
        </svg>
      </div>

      <figcaption className="ote-caption">
        {mode === 'wick'
          ? t('Wick-to-wick snaps 1.0 and 0.0 to extreme highs/lows—protecting exact sweep invalidation at 20,400.00.')
          : mode === 'body'
            ? t('Body-to-body trims extreme news spike wicks, shifting 0.705 slightly inward while keeping open/close bulk intact.')
            : t('Anchoring tiny pause candles mid-chop creates false 0.705 triggers inside expensive Premium territory.')}
      </figcaption>
    </figure>
  );
}

/* Visual 6: 2nd 3D Three.js Motion Study 02 Cinema — Bearish EUR/USD Premium OTE */
function BearishOteCinema({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const visible = useRef(true);
  const [fail, setFail] = useState(false);
  const [count, setCount] = useState(staticOnly ? 11 : 4);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const bars = fail ? syntheticOteBearishFailBars : syntheticOteBearishBars;
  const shown = staticOnly ? bars.length : Math.min(count, bars.length);

  useEffect(() => {
    if (staticOnly) return;
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(q.matches);
      if (q.matches) setPlaying(false);
    };
    sync();
    q.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      q.removeEventListener('change', sync);
      io.disconnect();
    };
  }, [staticOnly]);

  useEffect(() => {
    if (!playing || staticOnly || reduced) return;
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setCount((c) => {
        if (c >= bars.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 1150);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, reduced, bars.length]);

  return (
    <figure ref={rootRef} className="ote-figure" data-ote-figure="ote-bearish-cinema">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <TrendingDown size={16} aria-hidden="true" />
          <span>{t('3D Bearish Premium OTE Cinema (EUR/USD 1.0900 -> 1.0800)')}</span>
        </span>
        <span>{t('3D Motion Study · Synthetic EUR/USD')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls">
          <button type="button" aria-pressed={!fail} onClick={() => { setFail(false); setCount(4); setPlaying(false); }}>
            {t('Valid Bearish Expansion (-0.62)')}
          </button>
          <button type="button" aria-pressed={fail} onClick={() => { setFail(true); setCount(4); setPlaying(false); }}>
            {t('Bearish Invalidation (1.0900 Break)')}
          </button>
          <button
            type="button"
            disabled={reduced}
            aria-pressed={playing}
            onClick={() => {
              if (shown >= bars.length) setCount(1);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{playing ? t('Pause') : t('Play')}</span>
          </button>
          <button type="button" onClick={() => { setCount(bars.length); setPlaying(false); }}>
            {t('Reveal All')}
          </button>
        </div>
      )}

      <OteScene bars={bars} count={shown} bear reduced={reduced} staticOnly={staticOnly} mark="EUR/USD M15 · BEARISH 3D">
        <OteFallbackChart bars={bars} count={shown} bear />
      </OteScene>

      <div className="ote-readout-bar">
        {fail && shown >= 8
          ? t('Bearish Invalidation: Price closes decisively above 1.0 (1.0900), voiding the downward displacement range.')
          : t('Bearish Premium OTE pulls up past 1.0850 (0.50) into 1.0862–1.0879 before continuing to 1.0773 (-0.27) and 1.0738 (-0.62).')}
      </div>
    </figure>
  );
}

/* Visual 7: Extended Symmetrical Target Ladder (-0.27, -0.62, -1.0, -1.27, -1.62) */
function ExtensionTargets({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [target, setTarget] = useState<'tp1' | 'tp2' | 'tp3' | 'tp4'>('tp2');
  const levels = computeOteLevels('bullish', 20400, 20500, 2)!;

  const activeInfo =
    target === 'tp1'
      ? { price: levels.targetNeg27, points: 97.5, rMult: '2.83R', y: 120 }
      : target === 'tp2'
        ? { price: levels.targetNeg62, points: 132.5, rMult: '3.84R', y: 92 }
        : target === 'tp3'
          ? { price: levels.targetNeg100, points: 170.5, rMult: '4.94R', y: 64 }
          : { price: levels.targetNeg162, points: 232.3, rMult: '6.73R', y: 34 };

  return (
    <figure className="ote-figure" data-ote-figure="ote-extension-targets">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <TrendingUp size={16} aria-hidden="true" />
          <span>{t('Symmetrical Target Ladder (-0.27 to -1.62)')}</span>
        </span>
        <span>{t('Inspect scaling levels past 0.0')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls">
          <button type="button" className={target === 'tp1' ? 'is-active' : undefined} onClick={() => setTarget('tp1')}>
            {t('TP1: -0.27 (20,527.00)')}
          </button>
          <button type="button" className={target === 'tp2' ? 'is-active' : undefined} onClick={() => setTarget('tp2')}>
            {t('TP2: -0.62 (20,562.00)')}
          </button>
          <button type="button" className={target === 'tp3' ? 'is-active' : undefined} onClick={() => setTarget('tp3')}>
            {t('TP3: -1.00 (20,600.00)')}
          </button>
          <button type="button" className={target === 'tp4' ? 'is-active' : undefined} onClick={() => setTarget('tp4')}>
            {t('TP4: -1.62 (20,661.80)')}
          </button>
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 235" className="ote-svg" role="img" aria-label={t('Symmetrical Target Ladder (-0.27 to -1.62)')}>
          <rect x={16} y={14} width={728} height={206} rx={10} fill="var(--ote-paper)" stroke="var(--ote-line)" />
          <line x1={54} y1={34} x2={704} y2={34} stroke="var(--ote-bid)" strokeOpacity={target === 'tp4' ? 1 : 0.35} strokeWidth={target === 'tp4' ? 2.4 : 1.2} strokeDasharray="4 3" />
          <text x={545} y={28} fontSize={11} fontWeight={700} fill="var(--ote-bid)">-1.62 (20,661.80)</text>

          <line x1={54} y1={64} x2={704} y2={64} stroke="var(--ote-bid)" strokeOpacity={target === 'tp3' ? 1 : 0.35} strokeWidth={target === 'tp3' ? 2.4 : 1.2} strokeDasharray="4 3" />
          <text x={545} y={58} fontSize={11} fontWeight={700} fill="var(--ote-bid)">-1.00 (20,600.00)</text>

          <line x1={54} y1={92} x2={704} y2={92} stroke="var(--ote-bid)" strokeOpacity={target === 'tp2' ? 1 : 0.35} strokeWidth={target === 'tp2' ? 2.4 : 1.2} strokeDasharray="4 3" />
          <text x={545} y={86} fontSize={11} fontWeight={700} fill="var(--ote-bid)">-0.62 (20,562.00)</text>

          <line x1={54} y1={120} x2={704} y2={120} stroke="var(--ote-bid)" strokeOpacity={target === 'tp1' ? 1 : 0.35} strokeWidth={target === 'tp1' ? 2.4 : 1.2} strokeDasharray="4 3" />
          <text x={545} y={114} fontSize={11} fontWeight={700} fill="var(--ote-bid)">-0.27 (20,527.00)</text>

          <line x1={54} y1={148} x2={704} y2={148} stroke="var(--ote-accent)" strokeWidth={1.6} />
          <text x={66} y={142} fontSize={11} fontWeight={600} fill="var(--ote-accent)">0.0 (20,500.00)</text>

          <line x1={54} y1={194} x2={704} y2={194} stroke="var(--ote-bid)" strokeWidth={1.8} />
          <text x={66} y={188} fontSize={11} fontWeight={700} fill="var(--ote-bid)">0.705 Entry (20,429.50)</text>

          <path d={`M 96 208 L 176 148 L 260 194 L 505 ${activeInfo.y}`} fill="none" stroke="var(--ote-bid)" strokeWidth={2.8} />
          <circle cx={260} cy={194} r={6} fill="var(--ote-bid)" />
          <circle cx={505} cy={activeInfo.y} r={7} fill="var(--ote-accent)" />
        </svg>
      </div>

      <div className="ote-readout-grid">
        <div className="ote-readout">
          <span>{t('From 0.705 Entry (20,429.50)')}</span>
          <strong className="ote-num">{activeInfo.price.toFixed(2)}</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Points Gain')}</span>
          <strong className="ote-num is-ok">+{activeInfo.points.toFixed(2)} pts</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Multiple vs. 5% Stop')}</span>
          <strong className="ote-num is-ok">{activeInfo.rMult}</strong>
        </div>
      </div>
    </figure>
  );
}

/* Visual 8: Multi-Timeframe Nested OTE Matrix */
function MtfAlignment({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<'htf' | 'mtf' | 'ltf'>('mtf');
  const active = oteMtfProfiles.find((p) => p.id === selected)!;

  return (
    <figure className="ote-figure" data-ote-figure="ote-mtf-alignment">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('Multi-Timeframe Nested OTE Matrix')}</span>
        </span>
        <span>{t('HTF Narrative -> MTF Zone -> LTF Entry')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls">
          {oteMtfProfiles.map((tier) => (
            <button key={tier.id} type="button" className={selected === tier.id ? 'is-active' : undefined} onClick={() => setSelected(tier.id)}>
              {t(tier.timeframe)}
            </button>
          ))}
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 205" className="ote-svg" role="img" aria-label={t('Multi-Timeframe Nested OTE Matrix')}>
          <rect
            x={20}
            y={14}
            width={720}
            height={176}
            rx={12}
            fill={selected === 'htf' ? 'var(--ote-bid-soft)' : 'var(--ote-paper)'}
            stroke={selected === 'htf' ? 'var(--ote-bid)' : 'var(--ote-line)'}
            strokeWidth={selected === 'htf' ? 2.4 : 1.3}
          />
          <text x={38} y={38} fontSize={12} fontWeight={700} fill="var(--ote-ink)">
            HTF (Daily / 4H) · 0.62–0.79 Macro Discount
          </text>

          <rect
            x={105}
            y={56}
            width={550}
            height={112}
            rx={10}
            fill={selected === 'mtf' ? 'var(--ote-accent-soft)' : 'var(--ote-paper)'}
            stroke={selected === 'mtf' ? 'var(--ote-accent)' : 'var(--ote-line)'}
            strokeWidth={selected === 'mtf' ? 2.4 : 1.3}
          />
          <text x={125} y={80} fontSize={11.5} fontWeight={700} fill="var(--ote-accent)">
            MTF (1H / 15M) · Session OTE + FVG Overlap
          </text>

          <rect
            x={225}
            y={98}
            width={310}
            height={52}
            rx={8}
            fill={selected === 'ltf' ? 'var(--ote-bid-soft)' : 'var(--ote-wash)'}
            stroke={selected === 'ltf' ? 'var(--ote-bid)' : 'var(--ote-amber)'}
            strokeWidth={selected === 'ltf' ? 2.4 : 1.3}
          />
          <text x={380} y={128} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--ote-bid)">
            LTF (5M / 1M) · Micro-MSS + Tight Trigger
          </text>
        </svg>
      </div>

      <div className="ote-readout-grid">
        <div className="ote-readout">
          <span>{t('Primary Role')}</span>
          <strong>{t(active.role)}</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Sample Range')}</span>
          <strong>{t(active.rangeExample)}</strong>
        </div>
        <div className="ote-readout">
          <span>{t('Verification Focus')}</span>
          <strong>{t(active.focus)}</strong>
        </div>
      </div>
    </figure>
  );
}

/* Visual 9: 6-Trap Interactive Stick-Figure Diagnostic Board */
function MistakesComic({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [trap, setTrap] = useState(0);

  const traps = [
    {
      label: t('Trap 1: Bare Fib Limit'),
      speech: t('No FVG or MSS! Price slices right through.'),
      fix: t('Fix: Require overlapping FVG CE or Order Block + LTF structure.'),
    },
    {
      label: t('Trap 2: Buying Above 0.50'),
      speech: t('Paying retail markup inside Premium.'),
      fix: t('Fix: Never buy above 0.50; let price cross into Discount.'),
    },
    {
      label: t('Trap 3: Micro Stop at 0.79'),
      speech: t('Wicked out at 0.85 right before reversal.'),
      fix: t('Fix: Place structural stop beyond 1.0 origin (not 0.79).'),
    },
    {
      label: t('Trap 4: Drawn 0.0 -> 1.0 Backward'),
      speech: t('0.62 plotted near top! Completely inverted.'),
      fix: t('Fix: Anchor 1.0 at start of impulse, 0.0 at termination.'),
    },
    {
      label: t('Trap 5: Micro Chop Anchor'),
      speech: t('Pulled on tiny 2-candle chop mid-range.'),
      fix: t('Fix: Only anchor after liquidity sweep + displacement FVG.'),
    },
    {
      label: t('Trap 6: News Spread Trap'),
      speech: t('Static limit filled during CPI spike slippage.'),
      fix: t('Fix: Cancel resting limits ahead of CPI, NFP, and FOMC.'),
    },
  ];

  const active = traps[trap];

  return (
    <figure className="ote-figure" data-ote-figure="ote-mistakes-comic">
      <div className="ote-figure-head">
        <span className="ote-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('6 Recurring OTE Mistakes (Stick-Figure Gallery)')}</span>
        </span>
        <span>{t('Click a trap to see why it fails')}</span>
      </div>

      {!staticOnly && (
        <div className="ote-controls">
          {traps.map((item, idx) => (
            <button key={item.label} type="button" className={trap === idx ? 'is-active' : undefined} onClick={() => setTrap(idx)}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="ote-figure-body">
        <svg viewBox="0 0 760 205" className="ote-svg" role="img" aria-label={active.label}>
          <rect x={12} y={10} width={736} height={184} rx={10} fill="var(--ote-ask-soft)" stroke="var(--ote-ask)" strokeOpacity={0.35} />
          <g className="ote-char-group">
            <StickPerson x={78} y={128} color="var(--ote-ask)" pose="panic" scale={1.15} />
          </g>

          <rect x={136} y={26} width={590} height={56} rx={8} fill="var(--ote-paper)" stroke="var(--ote-ask)" />
          <text x={156} y={59} fontSize={13} fontWeight={700} fill="var(--ote-ask)">
            {active.speech}
          </text>

          <rect x={136} y={104} width={590} height={66} rx={8} fill="var(--ote-paper)" stroke="var(--ote-bid)" />
          <text x={156} y={141} fontSize={13} fontWeight={700} fill="var(--ote-bid)">
            {active.fix}
          </text>
        </svg>
      </div>
    </figure>
  );
}

export function OteVisual({ kind, staticOnly = false }: { kind: OteVisualKind; staticOnly?: boolean }) {
  switch (kind) {
    case 'ote-comic-intro':
      return <ComicIntro staticOnly={staticOnly} />;
    case 'ote-anatomy-animated':
      return <BullishOteCinema staticOnly={staticOnly} />;
    case 'ote-calculator-sandbox':
      return <CalculatorSandbox staticOnly={staticOnly} />;
    case 'ote-pd-confluence':
      return <PdConfluenceInspector staticOnly={staticOnly} />;
    case 'ote-anchor-comparison':
      return <AnchorComparison staticOnly={staticOnly} />;
    case 'ote-bearish-cinema':
      return <BearishOteCinema staticOnly={staticOnly} />;
    case 'ote-extension-targets':
      return <ExtensionTargets staticOnly={staticOnly} />;
    case 'ote-mtf-alignment':
      return <MtfAlignment staticOnly={staticOnly} />;
    case 'ote-mistakes-comic':
      return <MistakesComic staticOnly={staticOnly} />;
  }
}
