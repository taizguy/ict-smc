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
  syntheticBearishReaperBars,
  syntheticBearishSuspensionBars,
  syntheticBullishSuspensionBars,
  syntheticInvalidatedSuspensionBars,
} from '../utils/suspensionReaperMath';
import {
  createSuspensionReaperScene,
  type SrCinemaScenario,
  type SrScenarioSpec,
  type SrSceneController,
} from '../utils/suspensionReaperSceneRenderer';
import { useTranslation } from '../i18n/TranslationProvider';

const SCENARIOS: Record<SrCinemaScenario, SrScenarioSpec> = {
  'bullish-suspension': {
    title: 'Bullish Suspension Block',
    bars: syntheticBullishSuspensionBars,
    low: 20396,
    high: 20480,
    primaryBandLow: 20416,
    primaryBandHigh: 20420,
    secondaryBandLow: 20430,
    secondaryBandHigh: 20435,
    coreLow: 20420,
    coreHigh: 20430,
    bandSummary: 'VI-1 (20,416–20,420) · C2 Core (20,420–20,430) · VI-2 (20,430–20,435)',
    mode: 'suspension-bull',
  },
  'bearish-suspension': {
    title: 'Bearish Suspension Block',
    bars: syntheticBearishSuspensionBars,
    low: 20438,
    high: 20528,
    primaryBandLow: 20491,
    primaryBandHigh: 20501,
    secondaryBandLow: 20486,
    secondaryBandHigh: 20491,
    coreLow: 20491,
    coreHigh: 20501,
    bandSummary: 'VI-1 (20,501–20,506) · C2 Core (20,491–20,501) · VI-2 (20,486–20,491)',
    mode: 'suspension-bear',
  },
  'reaper-breaker': {
    title: 'Bearish Reaper IFVG + Breaker',
    bars: syntheticBearishReaperBars,
    low: 20474,
    high: 20550,
    primaryBandLow: 20512,
    primaryBandHigh: 20524,
    secondaryBandLow: 20514,
    secondaryBandHigh: 20526,
    coreLow: 20514,
    coreHigh: 20524,
    bandSummary: 'IFVG1 (20,512–20,524) + Bearish FVG2 (20,514–20,526) -> Overlap 20,514–20,524',
    mode: 'reaper-bear',
  },
  'contract-failure': {
    title: 'Contract Drift & Invalidation',
    bars: syntheticInvalidatedSuspensionBars,
    low: 20388,
    high: 20458,
    primaryBandLow: 20415,
    primaryBandHigh: 20419,
    secondaryBandLow: 20429,
    secondaryBandHigh: 20433,
    coreLow: 20419,
    coreHigh: 20429,
    bandSummary: 'Close below VI-1 bottom (20,415) invalidates continuous Suspension thesis',
    mode: 'failure',
  },
};

function Sr2DFallbackSvg({
  scenario,
  count,
}: {
  scenario: SrCinemaScenario;
  count: number;
}) {
  const { t } = useTranslation();
  const s = SCENARIOS[scenario];
  const span = Math.max(0.0001, s.high - s.low);
  const scaleY = (p: number) => 246 - ((p - s.low) / span) * 204;

  const pTop = Math.min(scaleY(s.primaryBandLow), scaleY(s.primaryBandHigh));
  const pH = Math.max(8, Math.abs(scaleY(s.primaryBandHigh) - scaleY(s.primaryBandLow)));

  const secTop =
    s.secondaryBandLow !== undefined && s.secondaryBandHigh !== undefined
      ? Math.min(scaleY(s.secondaryBandLow), scaleY(s.secondaryBandHigh))
      : undefined;
  const secH =
    s.secondaryBandLow !== undefined && s.secondaryBandHigh !== undefined
      ? Math.max(8, Math.abs(scaleY(s.secondaryBandHigh) - scaleY(s.secondaryBandLow)))
      : undefined;

  const coreTop =
    s.coreLow !== undefined && s.coreHigh !== undefined
      ? Math.min(scaleY(s.coreLow), scaleY(s.coreHigh))
      : undefined;
  const coreH =
    s.coreLow !== undefined && s.coreHigh !== undefined
      ? Math.max(8, Math.abs(scaleY(s.coreHigh) - scaleY(s.coreLow)))
      : undefined;

  const shown = s.bars.slice(0, count);

  return (
    <svg viewBox="0 0 760 278" className="sr-svg" role="img" aria-label={t(s.title)}>
      <rect x={44} y={24} width={520} height={228} rx={8} fill="var(--sr-surface-alt)" stroke="var(--sr-border)" />

      {coreTop !== undefined && coreH !== undefined && (
        <rect
          x={48}
          y={coreTop}
          width={512}
          height={coreH}
          fill={s.mode === 'reaper-bear' ? 'var(--sr-crimson)' : 'var(--sr-copper)'}
          fillOpacity={s.mode === 'reaper-bear' ? 0.24 : 0.14}
          stroke={s.mode === 'reaper-bear' ? 'var(--sr-crimson)' : 'var(--sr-copper)'}
          strokeDasharray="3 3"
        />
      )}

      <rect
        x={48}
        y={pTop}
        width={512}
        height={pH}
        fill={s.mode === 'suspension-bull' ? 'var(--sr-emerald)' : 'var(--sr-crimson)'}
        fillOpacity={0.22}
        stroke={s.mode === 'suspension-bull' ? 'var(--sr-emerald)' : 'var(--sr-crimson)'}
      />

      {secTop !== undefined && secH !== undefined && (
        <rect
          x={48}
          y={secTop}
          width={512}
          height={secH}
          fill={s.mode === 'reaper-bear' ? 'var(--sr-copper)' : s.mode === 'suspension-bull' ? 'var(--sr-emerald)' : 'var(--sr-crimson)'}
          fillOpacity={0.2}
          stroke={s.mode === 'reaper-bear' ? 'var(--sr-copper)' : s.mode === 'suspension-bull' ? 'var(--sr-emerald)' : 'var(--sr-crimson)'}
        />
      )}

      <text x={576} y={pTop + 10} fontSize={10.5} fontWeight={700} fill="var(--sr-crimson)">
        {s.mode === 'reaper-bear' ? t('Validated IFVG-1') : t('Initiation VI-1')}
      </text>
      {secTop !== undefined && (
        <text x={576} y={secTop + 10} fontSize={10.5} fontWeight={700} fill="var(--sr-copper)">
          {s.mode === 'reaper-bear' ? t('Nested Bearish FVG-2') : t('Upper / Second VI-2')}
        </text>
      )}
      {coreTop !== undefined && (
        <text x={576} y={coreTop + 14} fontSize={10.5} fontWeight={700} fill="var(--sr-emerald)">
          {s.mode === 'reaper-bear' ? t('Reaper Overlap Zone') : t('Suspended C2 Core')}
        </text>
      )}

      {shown.map((bar, i) => {
        const cx = 82 + i * (450 / Math.max(1, s.bars.length - 1));
        const up = bar.close >= bar.open;
        const isHighlight = (s.mode !== 'reaper-bear' && i === 1) || (s.mode === 'reaper-bear' && i === 5);
        const color = isHighlight
          ? 'var(--sr-copper)'
          : up
            ? 'var(--sr-emerald)'
            : 'var(--sr-crimson)';
        const top = Math.min(scaleY(bar.open), scaleY(bar.close));
        const h = Math.max(6, Math.abs(scaleY(bar.open) - scaleY(bar.close)));
        return (
          <g key={bar.label}>
            <line x1={cx} y1={scaleY(bar.high)} x2={cx} y2={scaleY(bar.low)} stroke={color} strokeWidth={1.9} />
            <rect x={cx - 11} y={top} width={22} height={h} rx={2.5} fill={color} />
            <text x={cx} y={268} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--sr-muted)">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SuspensionReaperScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<SrCinemaScenario>('bullish-suspension');
  const [count, setCount] = useState<number>(SCENARIOS['bullish-suspension'].bars.length);
  const [playing, setPlaying] = useState<boolean>(false);
  const [straightOn, setStraightOn] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(850);
  const [webglReady, setWebglReady] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<SrSceneController | null>(null);

  const spec = SCENARIOS[scenario];

  useEffect(() => {
    if (staticOnly || !stageRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const ctrl = createSuspensionReaperScene(stageRef.current, SCENARIOS, scenario, count);
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

  const handleScenario = (next: SrCinemaScenario) => {
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
      className="sr-figure sr-cinema-figure"
      data-sr-figure="sr-3d-motion-cinema"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <div className="sr-figure-head">
        <span className="sr-head-title">
          <Camera size={16} aria-hidden="true" />
          <span>{t('Interactive 3D Suspension & Reaper Cinema (Motion Study)')}</span>
        </span>
        <div className="sr-controls" role="group" aria-label={t('Select 3D Motion Study scenario')}>
          {(
            [
              'bullish-suspension',
              'bearish-suspension',
              'reaper-breaker',
              'contract-failure',
            ] as SrCinemaScenario[]
          ).map((key) => (
            <button
              key={key}
              type="button"
              className={`sr-btn ${scenario === key ? 'is-active' : ''}`}
              onClick={() => handleScenario(key)}
            >
              {t(SCENARIOS[key].title)}
            </button>
          ))}
        </div>
      </div>

      <div className="sr-cinema-stage-wrap">
        <div className="sr-cinema-banner">
          <span className="sr-banner-title">{t(spec.title)}</span>
          <span className="sr-banner-meta sr-num">{t(spec.bandSummary)}</span>
        </div>

        {!staticOnly && (
          <div
            ref={stageRef}
            className="sr-webgl-canvas"
            style={{ display: webglReady ? 'block' : 'none' }}
          />
        )}

        {(staticOnly || !webglReady) && <Sr2DFallbackSvg scenario={scenario} count={count} />}
      </div>

      <div className="sr-cinema-dock">
        <div className="sr-controls">
          <button
            type="button"
            className="sr-btn is-primary"
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
            className="sr-btn"
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
            className="sr-btn"
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
            className="sr-btn"
            onClick={() => {
              setPlaying(false);
              setCount(spec.bars.length);
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>

        <div className="sr-controls">
          {webglReady && (
            <button
              type="button"
              className={`sr-btn ${straightOn ? 'is-active' : ''}`}
              onClick={() => setStraightOn((v) => !v)}
            >
              <Eye size={14} aria-hidden="true" />
              <span>{t(straightOn ? '3D Iso View' : 'Straight-On Ruler')}</span>
            </button>
          )}
          <button
            type="button"
            className="sr-btn"
            onClick={() => setSpeedMs((ms) => (ms === 850 ? 450 : 850))}
          >
            <span>{speedMs === 450 ? '2x' : '1x'}</span>
          </button>
        </div>
      </div>

      <figcaption className="sr-figcaption">
        <strong>
          {t('Bar')} <bdi>{count}/{spec.bars.length}</bdi> ({activeBar.label}):
        </strong>{' '}
        {t(activeBar.annotation || '')} ·{' '}
        {t('Original synthetic study candles (Close:')} <bdi>{activeBar.close.toFixed(0)}</bdi>
        {t(') — not live quotes.')}
      </figcaption>
    </figure>
  );
}
