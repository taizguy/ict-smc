import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Eye,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import {
  syntheticPdBearishBars,
  syntheticPdBullishBars,
  syntheticPdContinuumBars,
  syntheticPdFailureBars,
  type PdSyntheticBar,
} from '../utils/pdArrayMath';
import {
  createPdArrayScene,
  type PdCinemaScenario,
  type PdSceneController,
} from '../utils/pdArraySceneRenderer';
import { useTranslation } from '../i18n/TranslationProvider';

const SCENARIOS: Record<
  PdCinemaScenario,
  {
    title: string;
    bars: PdSyntheticBar[];
    low: number;
    high: number;
    eq: number;
    q75: number;
    q25: number;
    zoneLow: number;
    zoneHigh: number;
    zoneLabel: string;
    isBullishZone: boolean;
    decimals: number;
  }
> = {
  bullish: {
    title: 'Bullish Discount Ladder',
    bars: syntheticPdBullishBars,
    low: 20200,
    high: 20600,
    eq: 20400,
    q75: 20500,
    q25: 20300,
    zoneLow: 20260,
    zoneHigh: 20305,
    zoneLabel: 'Discount OB + FVG (20,260–20,305)',
    isBullishZone: true,
    decimals: 0,
  },
  bearish: {
    title: 'Bearish Premium Cascade',
    bars: syntheticPdBearishBars,
    low: 1.08,
    high: 1.09,
    eq: 1.085,
    q75: 1.0875,
    q25: 1.0825,
    zoneLow: 1.087,
    zoneHigh: 1.0884,
    zoneLabel: 'Premium Breaker + FVG (1.0870–1.0884)',
    isBullishZone: false,
    decimals: 4,
  },
  continuum: {
    title: 'IRL -> ERL Continuum',
    bars: syntheticPdContinuumBars,
    low: 100,
    high: 140,
    eq: 120,
    q75: 130,
    q25: 110,
    zoneLow: 108,
    zoneHigh: 112,
    zoneLabel: 'Discount IRL FVG (108–112)',
    isBullishZone: true,
    decimals: 0,
  },
  failure: {
    title: 'Invalidated Range Break',
    bars: syntheticPdFailureBars,
    low: 20200,
    high: 20600,
    eq: 20400,
    q75: 20500,
    q25: 20300,
    zoneLow: 20255,
    zoneHigh: 20295,
    zoneLabel: 'Failed Discount OB (<20,200 invalid)',
    isBullishZone: true,
    decimals: 0,
  },
};

function Pd2DFallbackSvg({
  scenario,
  count,
}: {
  scenario: PdCinemaScenario;
  count: number;
}) {
  const { t } = useTranslation();
  const s = SCENARIOS[scenario];
  const minP = Math.min(s.low, ...s.bars.map((b) => b.low)) - (s.high - s.low) * 0.08;
  const maxP = Math.max(s.high, ...s.bars.map((b) => b.high)) + (s.high - s.low) * 0.08;
  const span = Math.max(0.0001, maxP - minP);
  const scaleY = (p: number) => 250 - ((p - minP) / span) * 212;
  const fmt = (n: number) => n.toFixed(s.decimals);

  const eqY = scaleY(s.eq);
  const hiY = scaleY(s.high);
  const loY = scaleY(s.low);
  const zTop = Math.min(scaleY(s.zoneLow), scaleY(s.zoneHigh));
  const zH = Math.max(8, Math.abs(scaleY(s.zoneLow) - scaleY(s.zoneHigh)));
  const shown = s.bars.slice(0, count);

  return (
    <svg viewBox="0 0 760 278" className="pd-svg" role="img" aria-label={t(s.title)}>
      <rect x={44} y={hiY} width={530} height={Math.max(4, eqY - hiY)} fill="var(--pd-prem-soft)" />
      <rect x={44} y={eqY} width={530} height={Math.max(4, loY - eqY)} fill="var(--pd-disc-soft)" />

      <line x1={44} y1={hiY} x2={574} y2={hiY} stroke="var(--pd-prem)" strokeWidth={1.3} strokeDasharray="4 3" />
      <text x={582} y={hiY + 4} fontSize={10.5} fontWeight={700} fill="var(--pd-prem)">
        {t('100% High')} ({fmt(s.high)})
      </text>

      <line x1={44} y1={eqY} x2={574} y2={eqY} stroke="var(--pd-indigo)" strokeWidth={2} />
      <text x={582} y={eqY + 4} fontSize={11} fontWeight={700} fill="var(--pd-indigo)">
        {t('50% Eq')} ({fmt(s.eq)})
      </text>

      <line x1={44} y1={loY} x2={574} y2={loY} stroke="var(--pd-disc)" strokeWidth={1.3} strokeDasharray="4 3" />
      <text x={582} y={loY + 4} fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">
        {t('0% Low')} ({fmt(s.low)})
      </text>

      <rect
        x={44}
        y={zTop}
        width={530}
        height={zH}
        fill={s.isBullishZone ? 'var(--pd-disc)' : 'var(--pd-prem)'}
        fillOpacity={0.22}
        stroke={s.isBullishZone ? 'var(--pd-disc)' : 'var(--pd-prem)'}
        strokeDasharray="3 3"
      />
      <text
        x={582}
        y={zTop + zH / 2 + 4}
        fontSize={10}
        fontWeight={600}
        fill={s.isBullishZone ? 'var(--pd-disc)' : 'var(--pd-prem)'}
      >
        {t('Active Array')} ({fmt(s.zoneLow)}–{fmt(s.zoneHigh)})
      </text>

      {shown.map((bar, i) => {
        const cx = 78 + i * (470 / Math.max(1, s.bars.length - 1));
        const up = bar.close >= bar.open;
        const color =
          scenario === 'failure' && i >= s.bars.length - 2 && bar.close < s.low
            ? 'var(--pd-danger)'
            : up
              ? 'var(--pd-disc)'
              : 'var(--pd-prem)';
        const top = Math.min(scaleY(bar.open), scaleY(bar.close));
        const h = Math.max(5, Math.abs(scaleY(bar.open) - scaleY(bar.close)));
        return (
          <g key={bar.label}>
            <line x1={cx} y1={scaleY(bar.high)} x2={cx} y2={scaleY(bar.low)} stroke={color} strokeWidth={1.8} />
            <rect x={cx - 10} y={top} width={20} height={h} rx={2.5} fill={color} />
            <text x={cx} y={268} textAnchor="middle" fontSize={9.5} fill="var(--pd-muted)">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PdArrayScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<PdCinemaScenario>('bullish');
  const [count, setCount] = useState<number>(SCENARIOS.bullish.bars.length);
  const [playing, setPlaying] = useState<boolean>(false);
  const [straightOn, setStraightOn] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(850);
  const [webglReady, setWebglReady] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<PdSceneController | null>(null);

  const spec = SCENARIOS[scenario];

  useEffect(() => {
    if (staticOnly || !stageRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const ctrl = createPdArrayScene(stageRef.current, SCENARIOS, scenario, count);
    if (!ctrl) {
      setWebglReady(false);
      return;
    }
    ctrlRef.current = ctrl;
    setWebglReady(true);

    const onResize = () => {
      if (stageRef.current && ctrlRef.current) {
        ctrlRef.current.resize(stageRef.current.clientWidth, stageRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      ctrl.dispose();
      ctrlRef.current = null;
    };
  }, [staticOnly]);

  useEffect(() => {
    ctrlRef.current?.setScenario(scenario);
    ctrlRef.current?.setVisibleCount(count);
  }, [scenario, count]);

  useEffect(() => {
    ctrlRef.current?.setCameraMode(straightOn);
  }, [straightOn]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setCount((c) => {
        if (c >= spec.bars.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, speedMs);
    return () => window.clearInterval(timer);
  }, [playing, speedMs, spec.bars.length]);

  const handleScenario = (next: PdCinemaScenario) => {
    setPlaying(false);
    setScenario(next);
    setCount(SCENARIOS[next].bars.length);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (count >= spec.bars.length) setCount(2);
      setPlaying((p) => !p);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPlaying(false);
      setCount((c) => Math.min(spec.bars.length, c + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPlaying(false);
      setCount((c) => Math.max(1, c - 1));
    } else if (e.key.toLowerCase() === 'r') {
      e.preventDefault();
      setPlaying(false);
      setCount(2);
    } else if (e.key.toLowerCase() === 'v') {
      e.preventDefault();
      setStraightOn((v) => !v);
    }
  };

  const activeBar = spec.bars[Math.max(0, count - 1)];

  return (
    <figure
      className="pd-figure pd-cinema-figure"
      data-pd-array-figure="pd-matrix-3d-cinema"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Camera size={16} aria-hidden="true" />
          <span>{t('Interactive 3D PD Matrix Cinema (Motion Study)')}</span>
        </span>
        <div className="pd-controls" role="group" aria-label={t('Select PD Array scenario')}>
          {(['bullish', 'bearish', 'continuum', 'failure'] as PdCinemaScenario[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`pd-btn ${scenario === key ? 'is-active' : ''}`}
              onClick={() => handleScenario(key)}
            >
              {t(SCENARIOS[key].title)}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-cinema-stage-wrap">
        <div className="pd-cinema-hud">
          <span className="pd-hud-pill pd-hud-prem">
            {t('Premium')} (&gt;50%): {spec.eq.toFixed(spec.decimals)}–{spec.high.toFixed(spec.decimals)}
          </span>
          <span className="pd-hud-pill pd-hud-eq">
            {t('50% Eq')}: {spec.eq.toFixed(spec.decimals)}
          </span>
          <span className="pd-hud-pill pd-hud-disc">
            {t('Discount')} (&lt;50%): {spec.low.toFixed(spec.decimals)}–{spec.eq.toFixed(spec.decimals)}
          </span>
          <span className="pd-hud-pill pd-hud-zone">{t(spec.zoneLabel)}</span>
        </div>

        {!staticOnly && (
          <div
            ref={stageRef}
            className="pd-webgl-canvas"
            style={{ display: webglReady ? 'block' : 'none' }}
          />
        )}

        {(staticOnly || !webglReady) && <Pd2DFallbackSvg scenario={scenario} count={count} />}
      </div>

      <div className="pd-cinema-dock">
        <div className="pd-controls">
          <button
            type="button"
            className="pd-btn is-primary"
            onClick={() => {
              if (count >= spec.bars.length) setCount(2);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="pd-btn"
            aria-label={t('Previous candle')}
            onClick={() => {
              setPlaying(false);
              setCount((c) => Math.max(1, c - 1));
            }}
          >
            <SkipBack size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="pd-btn"
            aria-label={t('Next candle')}
            onClick={() => {
              setPlaying(false);
              setCount((c) => Math.min(spec.bars.length, c + 1));
            }}
          >
            <SkipForward size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="pd-btn"
            onClick={() => {
              setPlaying(false);
              setCount(spec.bars.length);
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>

        <div className="pd-controls">
          {webglReady && (
            <button
              type="button"
              className={`pd-btn ${straightOn ? 'is-active' : ''}`}
              onClick={() => setStraightOn((v) => !v)}
            >
              <Eye size={14} aria-hidden="true" />
              <span>{t(straightOn ? '3D Iso View' : 'Straight-On Ruler')}</span>
            </button>
          )}
          <button
            type="button"
            className="pd-btn"
            onClick={() => setSpeedMs((ms) => (ms === 850 ? 450 : 850))}
          >
            <span>{speedMs === 450 ? '2x' : '1x'}</span>
          </button>
        </div>
      </div>

      <figcaption className="pd-figcaption">
        <strong>
          {t('Bar')} <bdi>{count}/{spec.bars.length}</bdi> ({activeBar.label}):
        </strong>{' '}
        {t(activeBar.annotation || '')} ·{' '}
        {t('Original synthetic study candles (Close:')} <bdi>{activeBar.close.toFixed(spec.decimals)}</bdi>
        {t(') — not live quotes.')}
      </figcaption>
    </figure>
  );
}
