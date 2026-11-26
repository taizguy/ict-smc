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
  Scale,
  SkipForward,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  computeBprZone,
  computeEnigmaProjection,
  evaluateBprConfluence,
  rdrbMtfProfiles,
  syntheticBearishBprBars,
  syntheticBprInvalidationBars,
  syntheticBullishBprBars,
  syntheticRdrbSecondVisitBars,
  type RdrbCinemaScenario,
  type RdrbSyntheticBar,
} from '../utils/rdrbMath';
import { RdrbScene } from './RdrbScene';
import { useTranslation } from '../i18n/TranslationProvider';

export type RdrbVisualKind =
  | 'rdrb-comic-intro'
  | 'rdrb-overlap-3d-cinema'
  | 'rdrb-calculator-sandbox'
  | 'rdrb-vs-ifvg-comparison'
  | 'rdrb-rdrb-timeline'
  | 'rdrb-enigma-dissection'
  | 'rdrb-confluence-lab'
  | 'rdrb-mtf-matrix'
  | 'rdrb-mistakes-comic';

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

/** Shared horizontal-level 2D SVG candlestick chart for BPR/RDRB fallback & static SSR */
function RdrbFallbackChart({
  bars,
  count,
  scenario,
}: {
  bars: RdrbSyntheticBar[];
  count: number;
  scenario: RdrbCinemaScenario;
}) {
  const isBear = scenario === 'bearish-bpr';
  const lo = isBear ? 1.0808 : scenario === 'bpr-invalidation' ? 20416 : 20414;
  const hi = isBear ? 1.0888 : scenario === 'bpr-invalidation' ? 20476 : 20500;
  const scaleY = (p: number) => 255 - ((p - lo) / (hi - lo)) * 225;
  const shown = bars.slice(0, count);

  const fvg1Low = isBear ? 1.0842 : 20440;
  const fvg1High = isBear ? 1.0862 : 20460;
  const fvg2Low = isBear ? 1.0846 : 20432;
  const fvg2High = isBear ? 1.0868 : 20454;
  const bprLow = isBear ? 1.0846 : 20440;
  const bprHigh = isBear ? 1.0862 : 20454;
  const mid50 = isBear ? 1.0854 : 20447;
  const farEdge = isBear ? 1.0862 : 20440;

  const yF1Top = Math.min(scaleY(fvg1High), scaleY(fvg1Low));
  const yF1H = Math.abs(scaleY(fvg1High) - scaleY(fvg1Low));
  const yF2Top = Math.min(scaleY(fvg2High), scaleY(fvg2Low));
  const yF2H = Math.abs(scaleY(fvg2High) - scaleY(fvg2Low));
  const yBprTop = Math.min(scaleY(bprHigh), scaleY(bprLow));
  const yBprH = Math.max(6, Math.abs(scaleY(bprHigh) - scaleY(bprLow)));

  return (
    <svg viewBox="0 0 760 275" className="rdrb-svg" role="img" aria-label="Balanced Price Range Candlestick Chart">
      {count >= 3 && (
        <rect x={44} y={yF1Top} width={575} height={yF1H} fill="var(--rdrb-copper-soft)" stroke="var(--rdrb-copper)" strokeOpacity={0.45} strokeDasharray="3 3" />
      )}
      {count >= 5 && (
        <>
          <rect x={230} y={yF2Top} width={389} height={yF2H} fill="var(--rdrb-cobalt-soft)" stroke="var(--rdrb-cobalt)" strokeOpacity={0.45} strokeDasharray="3 3" />
          <rect x={230} y={yBprTop} width={389} height={yBprH} fill="var(--rdrb-accent-soft)" stroke="var(--rdrb-accent)" strokeWidth={1.6} />
          <line x1={230} y1={scaleY(mid50)} x2={619} y2={scaleY(mid50)} stroke="var(--rdrb-accent)" strokeWidth={2} />
          <text x={626} y={scaleY(mid50) + 4} fontSize={10.5} fontWeight={700} fill="var(--rdrb-accent)">
            50% ({isBear ? '1.0854' : '20,447'})
          </text>
          <line x1={230} y1={scaleY(farEdge)} x2={619} y2={scaleY(farEdge)} stroke="var(--rdrb-ask)" strokeWidth={1.4} strokeDasharray="4 3" />
          <text x={626} y={scaleY(farEdge) + 4} fontSize={10} fontWeight={600} fill="var(--rdrb-ask)">
            Far ({isBear ? '1.0862' : '20,440'})
          </text>
        </>
      )}
      {shown.map((bar, i) => {
        const cx = 74 + i * 50;
        const up = bar.close >= bar.open;
        const color = up ? 'var(--rdrb-accent)' : 'var(--rdrb-ask)';
        const yH = scaleY(bar.high);
        const yL = scaleY(bar.low);
        const yT = scaleY(Math.max(bar.open, bar.close));
        const yB = scaleY(Math.min(bar.open, bar.close));
        return (
          <g key={bar.label}>
            <line x1={cx} y1={yH} x2={cx} y2={yL} stroke={color} strokeWidth={2.2} />
            <rect x={cx - 10} y={yT} width={20} height={Math.max(5, yB - yT)} rx={2} fill={color} />
            {bar.tag && (
              <text x={cx} y={up ? yH - 7 : yL + 13} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={color}>
                {bar.tag}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* Visual 1: Split Stick-Figure Story Comic — Impatient Single-Gap Seller vs. Patient BPR Planner */
function ComicIntro({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(staticOnly ? 2 : 0);

  const labels = [
    t('1. Leg 1 SIBI Drop'),
    t('2. Blind Short vs. Sweep'),
    t('3. Overlapping BPR Core'),
    t('4. 50% BPR Hold'),
  ];

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-comic-intro">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <Users size={16} aria-hidden="true" />
          <span>{t('Impatient Single-Gap Seller vs. Patient BPR Planner')}</span>
        </span>
        <span>{t('Story Comic · Synthetic NQ Illustration')}</span>
      </div>

      {!staticOnly && (
        <div className="rdrb-controls" role="group" aria-label={t('Impatient Single-Gap Seller vs. Patient BPR Planner')}>
          {labels.map((label, idx) => (
            <button key={label} type="button" className={step === idx ? 'is-active' : undefined} onClick={() => setStep(idx)}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 278" className="rdrb-svg" role="img" aria-label={t('Impatient Single-Gap Seller vs. Patient BPR Planner')}>
          <rect x={8} y={10} width={362} height={258} rx={10} fill="var(--rdrb-ask-soft)" stroke="var(--rdrb-ask)" strokeOpacity={0.35} />
          <text x={24} y={35} fontSize={12} fontWeight={700} fill="var(--rdrb-ask)">
            {step === 0
              ? 'Leg 1 Drops: 20,470 -> 20,426 (SIBI 20,440–20,460)'
              : step === 1
                ? 'Trader A Places Blind Sell at 20,450'
                : step === 2
                  ? 'Bullish Counter-Displacement Slices Up'
                  : 'Single-Gap Seller Stopped Out!'}
          </text>
          <rect x={28} y={76} width={322} height={38} rx={4} fill="var(--rdrb-copper-soft)" stroke="var(--rdrb-copper)" strokeDasharray="3 3" />
          <text x={245} y={99} fontSize={10} fill="var(--rdrb-copper)" fontWeight={600}>SIBI 20,440–20,460</text>
          <path
            d={
              step === 0
                ? 'M 32 54 L 110 150 L 160 150'
                : step === 1
                  ? 'M 32 54 L 110 150 L 175 162 L 210 95'
                  : 'M 32 54 L 110 150 L 175 162 L 245 50'
            }
            fill="none"
            stroke="var(--rdrb-ask)"
            strokeWidth={2.5}
          />
          {step >= 1 && <circle cx={210} cy={95} r={5.5} fill="var(--rdrb-ask)" />}

          <g className="rdrb-char-group">
            <StickPerson x={76} y={224} color="var(--rdrb-ask)" pose={step >= 2 ? 'panic' : 'point'} />
          </g>
          <rect x={115} y={184} width={235} height={36} rx={8} fill="var(--rdrb-paper)" stroke="var(--rdrb-ask)" />
          <text x={232} y={206} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--rdrb-ink)">
            {step <= 1 ? 'Blind Short 20,450!' : 'BPR Flipped Bullish!'}
          </text>
          <text x={115} y={244} fontSize={10.5} fontWeight={600} fill="var(--rdrb-ask)">
            Ignored SSL sweep &amp; Leg 2 BISI
          </text>

          <rect x={390} y={10} width={362} height={258} rx={10} fill="var(--rdrb-accent-soft)" stroke="var(--rdrb-accent)" strokeOpacity={0.35} />
          <text x={406} y={35} fontSize={12} fontWeight={700} fill="var(--rdrb-accent)">
            {step === 0
              ? 'Waits After SIBI Forms'
              : step === 1
                ? 'Spots SSL Sweep (20,418) + Counter BISI'
                : step === 2
                  ? 'Boxes Overlap Core: 20,440–20,454'
                  : 'Enters 50% Midpoint (20,447) -> 20,489'}
          </text>
          <rect x={410} y={76} width={322} height={38} rx={4} fill="var(--rdrb-copper-soft)" stroke="var(--rdrb-copper)" strokeDasharray="3 3" />
          {step >= 2 && (
            <>
              <rect x={485} y={88} width={247} height={42} rx={4} fill="var(--rdrb-cobalt-soft)" stroke="var(--rdrb-cobalt)" strokeDasharray="3 3" />
              <rect x={485} y={88} width={247} height={26} rx={3} fill="var(--rdrb-accent)" fillOpacity={0.28} stroke="var(--rdrb-accent)" strokeWidth={1.6} />
              <text x={645} y={105} fontSize={10} fontWeight={700} fill="var(--rdrb-accent)">BPR 20,440–20,454</text>
            </>
          )}
          <path
            d={
              step === 0
                ? 'M 418 54 L 490 150'
                : step === 1
                  ? 'M 418 54 L 490 150 L 545 162 L 605 56'
                  : step === 2
                    ? 'M 418 54 L 490 150 L 545 162 L 605 56 L 650 101'
                    : 'M 418 54 L 490 150 L 545 162 L 605 56 L 650 101 L 722 44'
            }
            fill="none"
            stroke="var(--rdrb-accent)"
            strokeWidth={2.7}
          />
          {step >= 2 && <circle cx={650} cy={101} r={5.5} fill="var(--rdrb-accent)" />}

          <g className="rdrb-char-group">
            <StickPerson x={456} y={224} color="var(--rdrb-accent)" pose={step === 3 ? 'cheer' : step === 2 ? 'point' : 'wait'} />
          </g>
          <rect x={496} y={184} width={235} height={36} rx={8} fill="var(--rdrb-paper)" stroke="var(--rdrb-accent)" />
          <text x={614} y={206} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--rdrb-ink)">
            {step <= 1 ? 'Measure both legs first' : '50% BPR = 20,447'}
          </text>
          <text x={496} y={244} fontSize={10.5} fontWeight={600} fill="var(--rdrb-accent)">
            {t('Calm two-sided plan with fixed far-edge stop')}
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* Visual 2: Motion Study 02 Three.js 3D Cinema — BPR, RDRB & Invalidation */
function RdrbCinemaStage({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<RdrbCinemaScenario>('bullish-bpr');
  const bars =
    scenario === 'bearish-bpr'
      ? syntheticBearishBprBars
      : scenario === 'rdrb-redelivery'
        ? syntheticRdrbSecondVisitBars
        : scenario === 'bpr-invalidation'
          ? syntheticBprInvalidationBars
          : syntheticBullishBprBars;

  const [count, setCount] = useState(staticOnly ? bars.length : 6);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timer.current) window.clearInterval(timer.current);
      return;
    }
    const ms = Math.round(920 / speed);
    timer.current = window.setInterval(() => {
      setCount((c) => {
        if (c >= bars.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, ms);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, speed, bars.length]);

  const switchScenario = (next: RdrbCinemaScenario) => {
    setPlaying(false);
    setScenario(next);
    setCount(next === 'bpr-invalidation' ? 9 : 11);
  };

  const activeStage = count <= 3 ? 0 : count <= 6 ? 1 : count <= 9 ? 2 : 3;
  const stageLabels = ['Leg 1 FVG', 'Leg 2 Overlap (BPR)', 'Test / RDRB', 'Outcome'];

  const readoutText =
    scenario === 'bearish-bpr'
      ? 'Bearish BPR (EUR/USD): Leg 1 BISI (1.0842–1.0862) overlapped downward by Leg 2 SIBI (1.0846–1.0868) -> BPR 1.0846–1.0862, 50% = 1.0854.'
      : scenario === 'rdrb-redelivery'
        ? 'RDRB 2nd Visit (NQ): Visit 1 bounces off 20,449 to 20,476 (clearing interim swing), then Visit 2 redelivers cleanly to 50% BPR (20,447).'
        : scenario === 'bpr-invalidation'
          ? 'Far-Edge Invalidation (NQ): Candle 8 closes cleanly at 20,435 below BPR_Low (20,440), invalidating bullish support immediately.'
          : 'Bullish BPR (NQ): Leg 1 SIBI (20,440–20,460) overlapped upward by Leg 2 BISI (20,432–20,454) -> BPR 20,440–20,454, 50% = 20,447.';

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-overlap-3d-cinema">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <Layers size={16} aria-hidden="true" />
          <span>{t('3D Three.js BPR, RDRB & Invalidation Cinema')}</span>
        </span>
        <span>{t('Motion Study 02 · Interactive WebGL')}</span>
      </div>

      <div className="rdrb-time-head">
        <div>
          <span>{t('Scenario:')}</span>
          <bdi>
            {scenario === 'bearish-bpr'
              ? '1.0846 – 1.0862'
              : '20,440 – 20,454'}
          </bdi>
          <small>
            50% BPR: <bdi>{scenario === 'bearish-bpr' ? '1.0854' : '20,447.00'}</bdi>
          </small>
        </div>
        <ol>
          {stageLabels.map((lbl, idx) => (
            <li key={lbl} data-active={activeStage === idx ? 'true' : undefined}>
              {lbl}
            </li>
          ))}
        </ol>
      </div>

      {!staticOnly && (
        <div className="rdrb-controls" role="group" aria-label={t('Scenario:')}>
          <button type="button" className={scenario === 'bullish-bpr' ? 'is-active' : undefined} onClick={() => switchScenario('bullish-bpr')}>
            {t('Bullish BPR (NQ)')}
          </button>
          <button type="button" className={scenario === 'bearish-bpr' ? 'is-active' : undefined} onClick={() => switchScenario('bearish-bpr')}>
            {t('Bearish BPR (EUR/USD)')}
          </button>
          <button type="button" className={scenario === 'rdrb-redelivery' ? 'is-active' : undefined} onClick={() => switchScenario('rdrb-redelivery')}>
            {t('RDRB 2nd Visit')}
          </button>
          <button type="button" className={scenario === 'bpr-invalidation' ? 'is-active' : undefined} onClick={() => switchScenario('bpr-invalidation')}>
            {t('Far-Edge Invalidation')}
          </button>
        </div>
      )}

      <RdrbScene
        bars={bars}
        count={count}
        scenario={scenario}
        reduced={reduced}
        staticOnly={staticOnly}
        mark="MOTION STUDY 02 · BPR / RDRB 3D"
      >
        <RdrbFallbackChart bars={bars} count={count} scenario={scenario} />
      </RdrbScene>

      {!staticOnly && (
        <>
          <div className="rdrb-controls">
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              <span>{playing ? t('Pause') : t('Play')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setCount((c) => Math.min(bars.length, c + 1));
              }}
              disabled={count >= bars.length}
            >
              <SkipForward size={14} aria-hidden="true" />
              <span>{t('Step Forward')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setCount(3);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>{t('Reset')}</span>
            </button>
            <label>
              <span>{t('Speed:')}</span>
              <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                <option value={0.75}>0.75x</option>
                <option value={1}>1.0x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </label>
          </div>
          <div className="rdrb-scrubber">
            <label htmlFor="rdrb-cinema-scrub">{t('Animation Progress')}</label>
            <span className="rdrb-num">
              {count}/{bars.length}
            </span>
            <input
              id="rdrb-cinema-scrub"
              type="range"
              min={1}
              max={bars.length}
              value={count}
              onChange={(e) => {
                setPlaying(false);
                setCount(Number(e.target.value));
              }}
            />
          </div>
        </>
      )}

      <div className="rdrb-readout-bar">{readoutText}</div>
    </figure>
  );
}

/* Visual 3: Interactive Horizontal Y-Axis BPR Overlap & 50% Equilibrium Calculator */
function BprCalculator({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [f1Low, setF1Low] = useState(20440);
  const [f1High, setF1High] = useState(20460);
  const [f2Low, setF2Low] = useState(20432);
  const [f2High, setF2High] = useState(20454);

  const bpr = computeBprZone('bullish', f1Low, f1High, f2Low, f2High, 2);

  const minAxis = 20420;
  const maxAxis = 20480;
  const scaleY = (p: number) => 226 - ((p - minAxis) / (maxAxis - minAxis)) * 188;

  const applyPreset = (preset: 'partial' | 'nested' | 'kiss' | 'void') => {
    if (preset === 'partial') {
      setF1Low(20440);
      setF1High(20460);
      setF2Low(20432);
      setF2High(20454);
    } else if (preset === 'nested') {
      setF1Low(20432);
      setF1High(20466);
      setF2Low(20442);
      setF2High(20456);
    } else if (preset === 'kiss') {
      setF1Low(20448);
      setF1High(20464);
      setF2Low(20432);
      setF2High(20448);
    } else {
      setF1Low(20454);
      setF1High(20470);
      setF2Low(20428);
      setF2High(20444);
    }
  };

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-calculator-sandbox">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>{t('Interactive BPR Overlap & 50% Equilibrium Calculator')}</span>
        </span>
        <span>{t('Horizontal Price Geometry')}</span>
      </div>

      {!staticOnly && (
        <>
          <div className="rdrb-controls" role="group" aria-label={t('Preset:')}>
            <button type="button" onClick={() => applyPreset('partial')}>
              {t('Partial Bullish Overlap')}
            </button>
            <button type="button" onClick={() => applyPreset('nested')}>
              {t('Contained Nested Overlap Preset')}
            </button>
            <button type="button" onClick={() => applyPreset('kiss')}>
              {t('Touch-Point Kiss (Zero Span)')}
            </button>
            <button type="button" onClick={() => applyPreset('void')}>
              {t('Non-Overlapping Void')}
            </button>
          </div>
          <div className="rdrb-slider-row">
            <label htmlFor="f1-lo">{t('FVG 1 Low')}: {f1Low}</label>
            <input id="f1-lo" type="range" min={20424} max={20464} step={2} value={f1Low} onChange={(e) => setF1Low(Math.min(Number(e.target.value), f1High - 4))} />
            <label htmlFor="f1-hi">{t('FVG 1 High')}: {f1High}</label>
            <input id="f1-hi" type="range" min={20432} max={20476} step={2} value={f1High} onChange={(e) => setF1High(Math.max(Number(e.target.value), f1Low + 4))} />
          </div>
          <div className="rdrb-slider-row">
            <label htmlFor="f2-lo">{t('FVG 2 Low')}: {f2Low}</label>
            <input id="f2-lo" type="range" min={20424} max={20464} step={2} value={f2Low} onChange={(e) => setF2Low(Math.min(Number(e.target.value), f2High - 4))} />
            <label htmlFor="f2-hi">{t('FVG 2 High')}: {f2High}</label>
            <input id="f2-hi" type="range" min={20432} max={20476} step={2} value={f2High} onChange={(e) => setF2High(Math.max(Number(e.target.value), f2Low + 4))} />
          </div>
        </>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 250" className="rdrb-svg" role="img" aria-label={t('Interactive BPR Overlap & 50% Equilibrium Calculator')}>
          {[20420, 20435, 20450, 20465, 20480].map((tick) => (
            <g key={tick}>
              <line x1={68} y1={scaleY(tick)} x2={710} y2={scaleY(tick)} stroke="var(--rdrb-line)" strokeDasharray="3 4" />
              <text x={58} y={scaleY(tick) + 4} textAnchor="end" fontSize={10.5} fill="var(--rdrb-secondary)" className="rdrb-num">
                {tick}
              </text>
            </g>
          ))}

          {/* Leg 1 Bearish FVG */}
          <rect
            x={96}
            y={scaleY(bpr.fvg1High)}
            width={190}
            height={Math.max(6, scaleY(bpr.fvg1Low) - scaleY(bpr.fvg1High))}
            rx={6}
            fill="var(--rdrb-copper-soft)"
            stroke="var(--rdrb-copper)"
            strokeWidth={1.6}
          />
          <text x={191} y={scaleY(bpr.fvg1High) - 6} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--rdrb-copper)">
            FVG 1 ({bpr.fvg1Low}–{bpr.fvg1High})
          </text>

          {/* Leg 2 Bullish FVG */}
          <rect
            x={250}
            y={scaleY(bpr.fvg2High)}
            width={190}
            height={Math.max(6, scaleY(bpr.fvg2Low) - scaleY(bpr.fvg2High))}
            rx={6}
            fill="var(--rdrb-cobalt-soft)"
            stroke="var(--rdrb-cobalt)"
            strokeWidth={1.6}
          />
          <text x={345} y={scaleY(bpr.fvg2Low) + 15} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--rdrb-cobalt)">
            FVG 2 ({bpr.fvg2Low}–{bpr.fvg2High})
          </text>

          {/* Shared BPR Intersection Band Projected Right */}
          {bpr.validOverlap ? (
            <>
              <rect
                x={250}
                y={scaleY(bpr.bprHigh)}
                width={450}
                height={Math.max(6, scaleY(bpr.bprLow) - scaleY(bpr.bprHigh))}
                rx={4}
                fill="var(--rdrb-accent)"
                fillOpacity={0.26}
                stroke="var(--rdrb-accent)"
                strokeWidth={2}
              />
              <line x1={250} y1={scaleY(bpr.bprMid50)} x2={700} y2={scaleY(bpr.bprMid50)} stroke="var(--rdrb-accent)" strokeWidth={2.2} strokeDasharray="5 3" />
              <text x={580} y={scaleY(bpr.bprMid50) - 6} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--rdrb-accent)">
                BPR {bpr.bprLow}–{bpr.bprHigh} · 50% = {bpr.bprMid50}
              </text>
            </>
          ) : (
            <text x={575} y={128} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--rdrb-ask)">
              {bpr.touchOnly ? 'Touch-Point Kiss: 0.00 Span (No BPR Zone)' : 'No Intersection: Separate Sequential Gaps'}
            </text>
          )}
        </svg>
      </div>

      <div className="rdrb-readout-grid">
        <div className="rdrb-readout">
          <span>{t('BPR Span')}</span>
          <strong className={`rdrb-num ${bpr.validOverlap ? 'is-ok' : 'is-warn'}`}>
            {bpr.validOverlap ? `${bpr.bprLow} – ${bpr.bprHigh} (${bpr.bprSpan} pts)` : '0.00 pts (No Overlap)'}
          </strong>
        </div>
        <div className="rdrb-readout">
          <span>{t('50% Midpoint')}</span>
          <strong className="rdrb-num">{bpr.validOverlap ? bpr.bprMid50.toFixed(2) : 'N/A'}</strong>
        </div>
        <div className="rdrb-readout">
          <span>{t('Overlap % (Leg 1 / Leg 2)')}</span>
          <strong className="rdrb-num">{bpr.overlapPctFvg1}% / {bpr.overlapPctFvg2}%</strong>
        </div>
        <div className="rdrb-readout">
          <span>{t('Invalidation Edge')}</span>
          <strong className="rdrb-num is-warn">{bpr.validOverlap ? `< ${bpr.invalidationEdge}` : 'None'}</strong>
        </div>
      </div>
    </figure>
  );
}

/* Visual 4: 3-Structure Side-by-Side Comparison — BPR vs Sequential vs IFVG */
function BprVsIfvgComparison() {
  const { t } = useTranslation();
  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-vs-ifvg-comparison">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <GitCompare size={16} aria-hidden="true" />
          <span>{t('True BPR vs. Sequential Rebalance vs. Single IFVG')}</span>
        </span>
        <span>{t('3-Structure Visual Comparison')}</span>
      </div>

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 250" className="rdrb-svg" role="img" aria-label={t('True BPR vs. Sequential Rebalance vs. Single IFVG')}>
          {/* Panel 1: True BPR */}
          <rect x={10} y={12} width={236} height={224} rx={10} fill="var(--rdrb-fill)" stroke="var(--rdrb-accent)" />
          <text x={128} y={36} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-accent)">
            1. True BPR Overlap
          </text>
          <rect x={40} y={64} width={95} height={74} fill="var(--rdrb-copper-soft)" stroke="var(--rdrb-copper)" strokeDasharray="3 3" />
          <rect x={105} y={96} width={105} height={76} fill="var(--rdrb-cobalt-soft)" stroke="var(--rdrb-cobalt)" strokeDasharray="3 3" />
          <rect x={105} y={96} width={115} height={42} fill="var(--rdrb-accent)" fillOpacity={0.28} stroke="var(--rdrb-accent)" strokeWidth={1.8} />
          <line x1={105} y1={117} x2={220} y2={117} stroke="var(--rdrb-accent)" strokeWidth={1.8} />
          <text x={128} y={200} textAnchor="middle" fontSize={10.5} fill="var(--rdrb-ink)">
            max(L1,L2) &lt; min(H1,H2)
          </text>
          <text x={128} y={218} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--rdrb-accent)">
            2 opposing FVGs intersect
          </text>

          {/* Panel 2: Sequential Rebalance */}
          <rect x={262} y={12} width={236} height={224} rx={10} fill="var(--rdrb-fill)" stroke="var(--rdrb-line)" />
          <text x={380} y={36} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-copper)">
            2. Sequential Non-Overlap
          </text>
          <rect x={288} y={56} width={120} height={48} fill="var(--rdrb-copper-soft)" stroke="var(--rdrb-copper)" />
          <rect x={360} y={128} width={112} height={48} fill="var(--rdrb-cobalt-soft)" stroke="var(--rdrb-cobalt)" />
          <path d="M 380 104 L 380 128" stroke="var(--rdrb-ask)" strokeWidth={1.8} strokeDasharray="3 3" />
          <text x={380} y={120} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--rdrb-ask)">EMPTY GAP SEPARATION</text>
          <text x={380} y={200} textAnchor="middle" fontSize={10.5} fill="var(--rdrb-ink)">
            max(L1,L2) &gt; min(H1,H2)
          </text>
          <text x={380} y={218} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--rdrb-ask)">
            Zero shared BPR slice
          </text>

          {/* Panel 3: Single IFVG */}
          <rect x={514} y={12} width={236} height={224} rx={10} fill="var(--rdrb-fill)" stroke="var(--rdrb-cobalt)" />
          <text x={632} y={36} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-cobalt)">
            3. Single Inverse FVG (IFVG)
          </text>
          <rect x={540} y={90} width={180} height={54} fill="var(--rdrb-cobalt-soft)" stroke="var(--rdrb-cobalt)" strokeDasharray="4 3" />
          <path d="M 552 152 L 575 128 L 598 112 L 622 96 L 646 70" fill="none" stroke="var(--rdrb-ink)" strokeWidth={2.3} />
          {[568, 588, 608, 628].map((cx, i) => (
            <rect key={cx} x={cx} y={124 - i * 14} width={11} height={18} rx={2} fill="var(--rdrb-accent)" />
          ))}
          <text x={632} y={200} textAnchor="middle" fontSize={10.5} fill="var(--rdrb-ink)">
            Slow close across 1 FVG
          </text>
          <text x={632} y={218} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--rdrb-cobalt)">
            Only 1 gap — no opposing FVG
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* Visual 5: RDRB Multi-Visit Redelivery Explorer */
function RdrbVisitExplorer({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'valid-rdrb' | 'hover-noise' | 'invalidated'>('valid-rdrb');

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-rdrb-timeline">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <TrendingUp size={16} aria-hidden="true" />
          <span>{t('RDRB Multi-Visit Redelivery Explorer')}</span>
        </span>
        <span>{t('Visit 0 -> Visit 1 -> Visit 2 (RDRB)')}</span>
      </div>

      {!staticOnly && (
        <div className="rdrb-controls">
          <button type="button" className={mode === 'valid-rdrb' ? 'is-active' : undefined} onClick={() => setMode('valid-rdrb')}>
            Valid RDRB (Swing Separation)
          </button>
          <button type="button" className={mode === 'hover-noise' ? 'is-active' : undefined} onClick={() => setMode('hover-noise')}>
            False Count (Continuous Hover)
          </button>
          <button type="button" className={mode === 'invalidated' ? 'is-active' : undefined} onClick={() => setMode('invalidated')}>
            Failed First/Second Test
          </button>
        </div>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 220" className="rdrb-svg" role="img" aria-label={t('RDRB Multi-Visit Redelivery Explorer')}>
          <rect x={44} y={110} width={670} height={46} rx={4} fill="var(--rdrb-accent-soft)" stroke="var(--rdrb-accent)" />
          <line x1={44} y1={133} x2={714} y2={133} stroke="var(--rdrb-accent)" strokeDasharray="4 4" strokeWidth={1.6} />
          <text x={54} y={126} fontSize={10.5} fontWeight={700} fill="var(--rdrb-accent)">BPR Band (Near Edge 20,454 / 50% = 20,447)</text>
          <line x1={44} y1={156} x2={714} y2={156} stroke="var(--rdrb-ask)" strokeWidth={1.5} strokeDasharray="5 3" />
          <text x={54} y={171} fontSize={10} fontWeight={600} fill="var(--rdrb-ask)">Far Edge Invalidation (20,440)</text>

          {mode === 'valid-rdrb' && (
            <>
              <path d="M 70 175 L 155 78 L 245 124 L 365 56 L 470 133 L 660 26" fill="none" stroke="var(--rdrb-accent)" strokeWidth={2.8} />
              <circle cx={155} cy={78} r={5} fill="var(--rdrb-cobalt)" />
              <text x={155} y={66} textAnchor="middle" fontSize={10.5} fontWeight={700}>Visit 0 (BPR Formed)</text>
              <circle cx={245} cy={124} r={6} fill="var(--rdrb-copper)" />
              <text x={245} y={194} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--rdrb-copper)">Visit 1 Initial Reaction</text>
              <circle cx={365} cy={56} r={5.5} fill="var(--rdrb-accent)" />
              <text x={365} y={42} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--rdrb-accent)">Interim Swing Cleared</text>
              <circle cx={470} cy={133} r={7} fill="var(--rdrb-accent)" />
              <text x={470} y={194} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--rdrb-accent)">Visit 2 (RDRB Redelivery)</text>
            </>
          )}

          {mode === 'hover-noise' && (
            <>
              <path d="M 70 175 L 160 78 L 240 128 L 295 118 L 350 138 L 415 116 L 475 135 L 555 122" fill="none" stroke="var(--rdrb-copper)" strokeWidth={2.6} />
              <text x={380} y={56} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-copper)">
                Never cleared an interim swing outside near edge = STILL Visit 1 Chop!
              </text>
            </>
          )}

          {mode === 'invalidated' && (
            <>
              <path d="M 70 175 L 155 78 L 245 124 L 330 88 L 420 144 L 495 186 L 610 202" fill="none" stroke="var(--rdrb-ask)" strokeWidth={2.8} />
              <circle cx={495} cy={186} r={6.5} fill="var(--rdrb-ask)" />
              <text x={505} y={198} fontSize={11} fontWeight={700} fill="var(--rdrb-ask)">
                Clean body close &lt; 20,440: Record as failed zone in sample!
              </text>
            </>
          )}
        </svg>
      </div>
    </figure>
  );
}

/* Visual 6: Enigma FVG Wick-vs-Body & 1.25 Projection Sensitivity Lab */
function EnigmaDissectionLab({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [anchorMode, setAnchorMode] = useState<'wick' | 'body'>('wick');
  const proj = computeEnigmaProjection(100, anchorMode === 'wick' ? 108 : 107.75, 1.25, 4);

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-enigma-dissection">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <Scale size={16} aria-hidden="true" />
          <span>{t('Enigma Anchor & Boundary Sensitivity Lab')}</span>
        </span>
        <span>{t('Wick vs. Body-Gap Comparison')}</span>
      </div>

      {!staticOnly && (
        <div className="rdrb-controls">
          <button type="button" className={anchorMode === 'wick' ? 'is-active' : undefined} onClick={() => setAnchorMode('wick')}>
            Wick Anchor (100.00 -&gt; 108.00)
          </button>
          <button type="button" className={anchorMode === 'body' ? 'is-active' : undefined} onClick={() => setAnchorMode('body')}>
            Body-Adjusted Anchor (100.00 -&gt; 107.75)
          </button>
        </div>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 218" className="rdrb-svg" role="img" aria-label={t('Enigma Anchor & Boundary Sensitivity Lab')}>
          {/* 3-candle Enigma FVG + adjacent VI */}
          <line x1={115} y1={134} x2={115} y2={194} stroke="var(--rdrb-accent)" strokeWidth={2.2} />
          <rect x={101} y={146} width={28} height={36} rx={2} fill="var(--rdrb-accent)" />
          <text x={115} y={209} textAnchor="middle" fontSize={10}>C1 Wick 104.00</text>

          <line x1={195} y1={42} x2={195} y2={166} stroke="var(--rdrb-accent)" strokeWidth={2.2} />
          <rect x={181} y={58} width={28} height={96} rx={2} fill="var(--rdrb-accent)" />
          <text x={195} y={209} textAnchor="middle" fontSize={10}>C2 Open 100.00</text>

          <line x1={275} y1={34} x2={275} y2={88} stroke="var(--rdrb-accent)" strokeWidth={2.2} />
          <rect x={261} y={48} width={28} height={32} rx={2} fill="var(--rdrb-accent)" />
          <text x={275} y={102} textAnchor="middle" fontSize={10}>C3 Body Seam 107.75 vs Wick 108.00</text>

          <rect x={140} y={88} width={160} height={46} fill="var(--rdrb-accent-soft)" stroke="var(--rdrb-accent)" strokeDasharray="3 3" />
          <text x={220} y={115} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--rdrb-accent)">FVG 104.00–108.00</text>

          {/* Horizontal Projection Lines */}
          <line x1={340} y1={182} x2={720} y2={182} stroke="var(--rdrb-ink)" strokeWidth={1.6} />
          <text x={350} y={175} fontSize={10.5} fontWeight={600}>Origin Open: 100.00</text>

          <line
            x1={340}
            y1={anchorMode === 'wick' ? 76 : 84}
            x2={720}
            y2={anchorMode === 'wick' ? 76 : 84}
            stroke="var(--rdrb-copper)"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <text x={350} y={anchorMode === 'wick' ? 69 : 98} fontSize={10.5} fontWeight={700} fill="var(--rdrb-copper)">
            Selected Endpoint: {proj.endpoint.toFixed(2)} (Leg = {proj.legLength.toFixed(2)} pts)
          </text>

          <line
            x1={340}
            y1={anchorMode === 'wick' ? 32 : 42}
            x2={720}
            y2={anchorMode === 'wick' ? 32 : 42}
            stroke="var(--rdrb-cobalt)"
            strokeWidth={2.4}
          />
          <text x={350} y={anchorMode === 'wick' ? 24 : 34} fontSize={11.5} fontWeight={700} fill="var(--rdrb-cobalt)">
            1.25x Projection Target = {proj.target.toFixed(4)} ({anchorMode === 'wick' ? '110.00' : '109.75 tick-rounded'})
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* Visual 7: 5-Gate PD Confluence & Qualification Evaluator */
function BprConfluenceEvaluator({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [hasOverlap, setHasOverlap] = useState(true);
  const [hasSweepOrigin, setHasSweepOrigin] = useState(true);
  const [hasDisplacementMss, setHasDisplacementMss] = useState(true);
  const [inPdDiscountOrPremium, setInPdDiscountOrPremium] = useState(true);
  const [hasActiveSession, setHasActiveSession] = useState(true);

  const verdict = evaluateBprConfluence({
    hasOverlap,
    hasSweepOrigin,
    hasDisplacementMss,
    inPdDiscountOrPremium,
    hasActiveSession,
  });

  const gates = [
    { key: 'overlap', label: '1. True FVG1 / FVG2 Overlap (BPR_Low < BPR_High)', val: hasOverlap, set: setHasOverlap },
    { key: 'sweep', label: '2. Preceding BSL/SSL Liquidity Sweep Origin', val: hasSweepOrigin, set: setHasSweepOrigin },
    { key: 'mss', label: '3. Energetic Counter-Displacement + MSS Close', val: hasDisplacementMss, set: setHasDisplacementMss },
    { key: 'pd', label: '4. Inside Discount (<50%) or Premium (>50%) PD Context', val: inPdDiscountOrPremium, set: setInPdDiscountOrPremium },
    { key: 'session', label: '5. Active London / NY Killzone (America/New_York)', val: hasActiveSession, set: setHasActiveSession },
  ];

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-confluence-lab">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <Activity size={16} aria-hidden="true" />
          <span>{t('BPR Qualification & PD Confluence Evaluator')}</span>
        </span>
        <span>{t('5-Gate Filter Matrix')}</span>
      </div>

      {!staticOnly && (
        <div className="rdrb-detector-grid">
          {gates.map((g) => (
            <label key={g.key} className="rdrb-detector-toggle">
              <input type="checkbox" checked={g.val} onChange={() => g.set((prev) => !prev)} />
              <span>{g.label}</span>
            </label>
          ))}
        </div>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 112" className="rdrb-svg" role="img" aria-label={t('BPR Qualification & PD Confluence Evaluator')}>
          {gates.map((g, i) => {
            const x0 = 12 + i * 150;
            const active = g.val;
            return (
              <g key={g.key}>
                <rect
                  x={x0}
                  y={16}
                  width={136}
                  height={76}
                  rx={8}
                  fill={active ? 'var(--rdrb-accent-soft)' : 'var(--rdrb-ask-soft)'}
                  stroke={active ? 'var(--rdrb-accent)' : 'var(--rdrb-ask)'}
                />
                <text x={x0 + 68} y={44} textAnchor="middle" fontSize={11} fontWeight={700} fill={active ? 'var(--rdrb-accent)' : 'var(--rdrb-ask)'}>
                  Gate {i + 1}: {active ? 'PASS' : 'FAIL'}
                </text>
                <text x={x0 + 68} y={66} textAnchor="middle" fontSize={10} fill="var(--rdrb-ink)">
                  {g.key.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        className={`rdrb-verdict ${
          verdict.grade === 'qualified-bpr'
            ? 'rdrb-verdict-qualified'
            : verdict.grade === 'partial-bpr'
              ? 'rdrb-verdict-partial'
              : 'rdrb-verdict-invalid'
        }`}
      >
        Score {verdict.score}/5 — {verdict.summary}
      </div>
    </figure>
  );
}

/* Visual 8: Multi-Timeframe Nested BPR Matrix */
function MtfNestedMatrix({ staticOnly }: { staticOnly: boolean }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<'htf-aligned' | 'rdrb-nested' | 'counter-htf'>('htf-aligned');
  const active = rdrbMtfProfiles.find((p) => p.id === selectedId) || rdrbMtfProfiles[0];
  const isWarn = active.id === 'counter-htf';

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-mtf-matrix">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <Compass size={16} aria-hidden="true" />
          <span>{t('Multi-Timeframe Nested BPR Alignment')}</span>
        </span>
        <span>{t('HTF -> MTF -> LTF Framework')}</span>
      </div>

      {!staticOnly && (
        <div className="rdrb-controls">
          {rdrbMtfProfiles.map((p) => (
            <button key={p.id} type="button" className={selectedId === p.id ? 'is-active' : undefined} onClick={() => setSelectedId(p.id)}>
              {p.title}
            </button>
          ))}
        </div>
      )}

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 170" className="rdrb-svg" role="img" aria-label={t('Multi-Timeframe Nested BPR Alignment')}>
          <rect x={14} y={14} width={230} height={140} rx={10} fill="var(--rdrb-fill)" stroke="var(--rdrb-line)" />
          <text x={129} y={40} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-accent)">1. Higher Timeframe (Daily / 4H)</text>
          <text x={129} y={84} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--rdrb-ink)">{active.htfBias}</text>

          <rect x={265} y={14} width={230} height={140} rx={10} fill="var(--rdrb-fill)" stroke="var(--rdrb-line)" />
          <text x={380} y={40} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--rdrb-cobalt)">2. Setup Structure (1H / 15M)</text>
          <text x={380} y={84} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--rdrb-ink)">{active.mtfZone}</text>

          <rect
            x={516}
            y={14}
            width={230}
            height={140}
            rx={10}
            fill={isWarn ? 'var(--rdrb-ask-soft)' : 'var(--rdrb-accent-soft)'}
            stroke={isWarn ? 'var(--rdrb-ask)' : 'var(--rdrb-accent)'}
          />
          <text x={631} y={40} textAnchor="middle" fontSize={12} fontWeight={700} fill={isWarn ? 'var(--rdrb-ask)' : 'var(--rdrb-accent)'}>
            3. Execution Trigger (5M / 1M)
          </text>
          <text x={631} y={80} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="var(--rdrb-ink)">{active.ltfTrigger}</text>
          <text x={631} y={120} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={isWarn ? 'var(--rdrb-ask)' : 'var(--rdrb-accent)'}>
            {active.alignmentStatus}
          </text>
        </svg>
      </div>
      <div className="rdrb-readout-bar">{active.note}</div>
    </figure>
  );
}

/* Visual 9: Stick-Figure Mistakes Gallery — 4 Recurring Traps */
function MistakesGallery() {
  const { t } = useTranslation();
  const traps = [
    {
      title: 'Trap 1: Non-Overlapping Gaps',
      desc: 'max(L1,L2) > min(H1,H2) = No BPR',
      pose: 'panic' as const,
    },
    {
      title: 'Trap 2: Full-Swing Oversized Box',
      desc: 'Inflates stop by boxing non-shared wings',
      pose: 'slump' as const,
    },
    {
      title: 'Trap 3: Lunch Chop Counter-HTF',
      desc: 'Buys 5M overlap beneath 4H resistance',
      pose: 'panic' as const,
    },
    {
      title: 'Trap 4: Fake RDRB Hover Count',
      desc: 'Counts 3 candles in 1 chop as Visit 2',
      pose: 'slump' as const,
    },
  ];

  return (
    <figure className="rdrb-figure" data-rdrb-figure="rdrb-mistakes-comic">
      <div className="rdrb-figure-head">
        <span className="rdrb-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('Four Recurring BPR & RDRB Traps')}</span>
        </span>
        <span>{t('Stick-Figure Error Gallery')}</span>
      </div>

      <div className="rdrb-figure-body">
        <svg viewBox="0 0 760 210" className="rdrb-svg" role="img" aria-label={t('Four Recurring BPR & RDRB Traps')}>
          {traps.map((trap, i) => {
            const x0 = 10 + i * 188;
            return (
              <g key={trap.title}>
                <rect x={x0} y={10} width={178} height={188} rx={10} fill="var(--rdrb-ask-soft)" stroke="var(--rdrb-ask)" strokeOpacity={0.4} />
                <text x={x0 + 89} y={34} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--rdrb-ask)">
                  {trap.title}
                </text>
                <g className="rdrb-char-group">
                  <StickPerson x={x0 + 89} y={108} color="var(--rdrb-ask)" pose={trap.pose} scale={1.08} />
                </g>
                <rect x={x0 + 10} y={142} width={158} height={42} rx={6} fill="var(--rdrb-paper)" stroke="var(--rdrb-ask)" strokeOpacity={0.5} />
                <text x={x0 + 89} y={166} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="var(--rdrb-ink)">
                  {trap.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

export function RdrbVisual({ kind, staticOnly = false }: { kind: RdrbVisualKind; staticOnly?: boolean }) {
  switch (kind) {
    case 'rdrb-comic-intro':
      return <ComicIntro staticOnly={staticOnly} />;
    case 'rdrb-overlap-3d-cinema':
      return <RdrbCinemaStage staticOnly={staticOnly} />;
    case 'rdrb-calculator-sandbox':
      return <BprCalculator staticOnly={staticOnly} />;
    case 'rdrb-vs-ifvg-comparison':
      return <BprVsIfvgComparison />;
    case 'rdrb-rdrb-timeline':
      return <RdrbVisitExplorer staticOnly={staticOnly} />;
    case 'rdrb-enigma-dissection':
      return <EnigmaDissectionLab staticOnly={staticOnly} />;
    case 'rdrb-confluence-lab':
      return <BprConfluenceEvaluator staticOnly={staticOnly} />;
    case 'rdrb-mtf-matrix':
      return <MtfNestedMatrix staticOnly={staticOnly} />;
    case 'rdrb-mistakes-comic':
      return <MistakesGallery />;
  }
}
