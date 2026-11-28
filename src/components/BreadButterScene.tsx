import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Pause, Play, RotateCcw, Ruler, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { getBreadButterSceneCandles, type BreadButterBranch } from '../utils/breadButterMath';

interface BreadButterSceneProps {
  staticOnly?: boolean;
}

interface BranchMeta {
  id: BreadButterBranch;
  label: string;
  badge: string;
  stepNotes: string[];
}

const BRANCHES: BranchMeta[] = [
  {
    id: 'completed',
    label: 'Branch A: Completed Fill (106 -> 136)',
    badge: 'Sweep + Displacement · Retest Filled (+1.50R gross)',
    stepNotes: [
      'Stage 1: Pre-open candles lock the 100.0–130.0 consolidation box (midpoint 115.0) before London begins.',
      'Stage 2: At 03:05, a London sweep dips beneath the 100.0 floor to 92.0 and snaps back toward 98.0.',
      'Stage 3: At 03:10, bullish displacement closes at 116.0 inside the box, printing a clean FVG around 106.0 with stop at 86.0.',
      'Stage 4: The 03:15 retracement fills the resting 106.0 buy limit, holds above 100.0, and delivers cleanly to the 136.0 objective.',
    ],
  },
  {
    id: 'unfilled',
    label: 'Branch B: Unfilled Runaway (Straight to 136)',
    badge: 'Single-Pass Expansion · Limit Unfilled (0R)',
    stepNotes: [
      'Stage 1: Pre-open candles carve the identical 100.0–130.0 consolidation box and 115.0 midpoint.',
      'Stage 2: The 03:05 sweep raids sell-side stops down to 92.0 before rejecting upward.',
      'Stage 3: Bullish displacement at 03:10 anchors the resting 106.0 FVG buy limit and 86.0 invalidation stop.',
      'Stage 4: Price stalls briefly at 113.0 and accelerates straight past 136.0 to 140.0. Direction works, yet the 106.0 limit legitimately stays unfilled (0R).',
    ],
  },
  {
    id: 'failure',
    label: 'Branch C: Breakdown Failure (< 86)',
    badge: 'Invalidated · Stop Triggered (-1.00R)',
    stepNotes: [
      'Stage 1: Pre-open candles define the identical 100.0–130.0 horizontal consolidation range.',
      'Stage 2: At 03:05, price sweeps below 100.0 down to 92.0 and closes near 98.0.',
      'Stage 3: Bullish displacement closes at 116.0, placing our resting buy limit at 106.0 and stop invalidation at 86.0.',
      'Stage 4: Retracement fills 106.0, but sellers crush the 100.0 floor and close down at 80.0—ending the trade cleanly at the pre-declared 86.0 stop.',
    ],
  },
];

const STAGE_LABELS = ['Pre-Open Box', 'London Sweep', 'Displacement + FVG', 'Outcome Branch'];

function detectHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

const FallbackBreadButterBlueprintSvg: React.FC<{
  branch: BreadButterBranch;
  stage: number;
  rulerMode: boolean;
  t: (text: string) => string;
}> = ({ branch, stage, rulerMode, t }) => {
  const candles = useMemo(() => getBreadButterSceneCandles(branch), [branch]);
  const maxIdx = stage === 0 ? 4 : stage === 1 ? 5 : stage === 2 ? 6 : candles.length - 1;
  const visible = candles.slice(0, maxIdx + 1);

  const width = 760;
  const height = 340;
  const padL = 56;
  const padR = 186;
  const padT = 24;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const pMin = 75;
  const pMax = 144;
  const mapY = (p: number) => padT + ((pMax - p) / (pMax - pMin)) * innerH;
  const colW = innerW / candles.length;
  const plotRight = width - padR;
  const ticks = rulerMode ? [80, 86, 100, 106, 115, 130, 136] : [86, 100, 115, 130, 136];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="bb70-svg"
      role="img"
      aria-label={t('Interactive Bread-and-Butter Range Blueprint Stage')}
    >
      <rect x="0" y="0" width={width} height={height} fill="#0d1624" rx="10" />
      {ticks.map((price) => {
        const y = mapY(price);
        return (
          <g key={price}>
            <line
              x1={padL}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="rgba(148,163,184,0.2)"
              strokeDasharray={rulerMode ? '2 2' : '3 4'}
            />
            <rect
              x="6"
              y={y - 9}
              width="42"
              height="18"
              rx="4"
              fill="#131e33"
              stroke="rgba(148,163,184,0.3)"
            />
            <text
              x="27"
              y={y + 4}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="#e2e8f0"
            >
              {price}
            </text>
          </g>
        );
      })}

      {/* Pre-Open Consolidation Box (bars 0..4, 100 to 130) */}
      <rect
        x={padL + 2}
        y={mapY(130)}
        width={colW * 5 - 4}
        height={Math.max(10, mapY(100) - mapY(130))}
        fill="rgba(56,189,248,0.14)"
        stroke="#38bdf8"
        strokeWidth="1.4"
      />

      {/* Extended Range & Midpoint Rails */}
      <line x1={padL + colW * 5} y1={mapY(130)} x2={plotRight} y2={mapY(130)} stroke="#38bdf8" strokeDasharray="5 3" strokeWidth="1.3" />
      <line x1={padL} y1={mapY(115)} x2={plotRight} y2={mapY(115)} stroke="#facc15" strokeDasharray="4 4" strokeWidth="1.1" opacity="0.7" />
      <line x1={padL + colW * 5} y1={mapY(100)} x2={plotRight} y2={mapY(100)} stroke="#38bdf8" strokeDasharray="5 3" strokeWidth="1.3" />

      {/* FVG & Execution Rails from Stage 3 onwards */}
      {stage >= 2 && (
        <>
          <rect
            x={padL + colW * 6}
            y={mapY(112)}
            width={plotRight - (padL + colW * 6)}
            height={Math.max(8, mapY(104) - mapY(112))}
            fill="rgba(74,222,128,0.16)"
          />
          <line x1={padL + colW * 6} y1={mapY(136)} x2={plotRight} y2={mapY(136)} stroke="#4ade80" strokeDasharray="4 3" strokeWidth="1.4" />
          <line x1={padL + colW * 6} y1={mapY(106)} x2={plotRight} y2={mapY(106)} stroke="#22c55e" strokeWidth="1.7" />
          <line x1={padL + colW * 6} y1={mapY(86)} x2={plotRight} y2={mapY(86)} stroke="#fb923c" strokeDasharray="4 3" strokeWidth="1.5" />
        </>
      )}

      {visible.map((c) => {
        const cx = padL + c.index * colW + colW / 2;
        const isUp = c.close >= c.open;
        const bodyTop = mapY(Math.max(c.open, c.close));
        const bodyBot = mapY(Math.min(c.open, c.close));
        let fill = isUp ? '#16a34a' : '#d97706';
        if (c.role === 'range') fill = isUp ? '#0284c7' : '#64748b';
        if (c.role === 'sweep') fill = '#ea580c';
        if (c.role === 'displacement' || c.role === 'delivery') fill = '#22c55e';
        if (c.role === 'unfilled') fill = '#38bdf8';
        if (c.role === 'failure') fill = '#f97316';

        return (
          <g key={c.index}>
            <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke="#cbd5e1" strokeWidth="1.6" />
            <rect
              x={cx - 8}
              y={bodyTop}
              width="16"
              height={Math.max(5, bodyBot - bodyTop)}
              rx="2.5"
              fill={fill}
            />
            {rulerMode && (
              <text x={cx} y={mapY(c.high) - 5} textAnchor="middle" fontSize="9.5" fill="#cbd5e1">
                {c.close}
              </text>
            )}
            <text x={cx} y={height - 12} textAnchor="middle" fontSize="9.5" fill="#94a3b8">
              {c.label}
            </text>
          </g>
        );
      })}

      {/* Right-Margin Crisp Badges */}
      {stage >= 2 && (
        <g>
          <line x1={plotRight} y1={mapY(136)} x2={plotRight + 10} y2={mapY(136) - 4} stroke="#4ade80" strokeWidth="1.3" />
          <rect x={plotRight + 10} y={mapY(136) - 16} width="168" height="22" rx="5" fill="#15803d" />
          <text x={plotRight + 94} y={mapY(136) - 1} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
            {t('Objective 136.0')}
          </text>
        </g>
      )}
      <g>
        <line x1={plotRight} y1={mapY(130)} x2={plotRight + 10} y2={mapY(130) + 6} stroke="#38bdf8" strokeWidth="1.3" />
        <rect x={plotRight + 10} y={mapY(130) - 5} width="168" height="22" rx="5" fill="#0369a1" />
        <text x={plotRight + 94} y={mapY(130) + 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          {t('Box High 130.0 (BSL)')}
        </text>
      </g>
      <g>
        <line x1={plotRight} y1={mapY(115)} x2={plotRight + 10} y2={mapY(115)} stroke="#facc15" strokeWidth="1.3" />
        <rect x={plotRight + 10} y={mapY(115) - 11} width="168" height="22" rx="5" fill="#a16207" />
        <text x={plotRight + 94} y={mapY(115) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          {t('Midpoint 115.0 (50%)')}
        </text>
      </g>
      {stage >= 2 && (
        <g>
          <line x1={plotRight} y1={mapY(106)} x2={plotRight + 10} y2={mapY(106) - 5} stroke="#22c55e" strokeWidth="1.3" />
          <rect x={plotRight + 10} y={mapY(106) - 16} width="168" height="22" rx="5" fill="#15803d" />
          <text x={plotRight + 94} y={mapY(106) - 1} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
            {t('FVG Limit 106.0')}
          </text>
        </g>
      )}
      <g>
        <line x1={plotRight} y1={mapY(100)} x2={plotRight + 10} y2={mapY(100) + 7} stroke="#38bdf8" strokeWidth="1.3" />
        <rect x={plotRight + 10} y={mapY(100) - 4} width="168" height="22" rx="5" fill="#0369a1" />
        <text x={plotRight + 94} y={mapY(100) + 11} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          {t('Box Low 100.0 (SSL)')}
        </text>
      </g>
      {stage >= 2 && (
        <g>
          <line x1={plotRight} y1={mapY(86)} x2={plotRight + 10} y2={mapY(86)} stroke="#fb923c" strokeWidth="1.3" />
          <rect x={plotRight + 10} y={mapY(86) - 11} width="168" height="22" rx="5" fill="#c2410c" />
          <text x={plotRight + 94} y={mapY(86) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
            {t('Stop Loss 86.0')}
          </text>
        </g>
      )}
    </svg>
  );
};

export const BreadButterScene: React.FC<BreadButterSceneProps> = ({ staticOnly = false }) => {
  const { t, locale } = useTranslation();
  const [branch, setBranch] = useState<BreadButterBranch>('completed');
  const [stage, setStage] = useState<number>(3);
  const [rulerMode, setRulerMode] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1700);
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const hostRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<import('../utils/breadButterSceneRenderer').BreadButterSceneRenderer | null>(null);

  const activeBranch = useMemo(
    () => BRANCHES.find((b) => b.id === branch) || BRANCHES[0],
    [branch],
  );

  const labelTexts = useMemo(
    () => ({
      target: t('Objective 136.0'),
      boxHigh: t('Box High 130.0 (BSL)'),
      midpoint: t('Midpoint 115.0 (50%)'),
      entry: t('FVG Limit 106.0'),
      boxLow: t('Box Low 100.0 (SSL)'),
      stop: t('Stop Loss 86.0'),
    }),
    [t, locale],
  );

  useEffect(() => {
    if (staticOnly || typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onMq);

    let active = true;
    import('../utils/breadButterSceneRenderer')
      .then((mod) => {
        if (!active || !hostRef.current || !labelsRef.current) return;
        if (!detectHardwareWebGL()) {
          setWebglReady(false);
          return;
        }
        try {
          const instance = new mod.BreadButterSceneRenderer({
            host: hostRef.current,
            labelsLayer: labelsRef.current,
            branch,
            stage,
            rulerMode,
            labelTexts,
          });
          rendererRef.current = instance;
          setWebglReady(true);
        } catch {
          setWebglReady(false);
        }
      })
      .catch(() => {
        if (active) setWebglReady(false);
      });

    return () => {
      active = false;
      mq.removeEventListener?.('change', onMq);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
    // Mount WebGL canvas once on client hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticOnly]);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateState({
        branch,
        stage,
        rulerMode,
        labelTexts,
      });
    }
  }, [branch, stage, rulerMode, labelTexts]);

  useEffect(() => {
    if (!playing || reducedMotion || staticOnly) return;
    const id = window.setInterval(() => {
      setStage((prev) => {
        if (prev >= 3) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);
    return () => window.clearInterval(id);
  }, [playing, speedMs, reducedMotion, staticOnly]);

  const togglePlay = () => {
    if (!playing && stage >= 3) setStage(0);
    setPlaying((p) => !p);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPlaying(false);
      setStage((p) => (p + 1) % 4);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPlaying(false);
      setStage((p) => (p + 3) % 4);
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      setPlaying(false);
      setStage(0);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={t('Interactive 3D Bread-and-Butter Range Motion Study')}
    >
      <div className="bb70-controls" role="tablist" aria-label={t('Bread-and-Butter outcome branches')}>
        {BRANCHES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={branch === item.id}
            aria-pressed={branch === item.id}
            className="bb70-btn"
            onClick={() => {
              setBranch(item.id);
              setStage(3);
              setPlaying(false);
            }}
          >
            {t(item.label)}
          </button>
        ))}
      </div>

      <div className="bb70-3d-wrap">
        {!staticOnly && (
          <div style={{ display: webglReady ? 'block' : 'none', width: '100%', height: '100%' }}>
            <div ref={hostRef} className="bb70-3d-canvas-host" aria-label={t(activeBranch.label)} />
            <div ref={labelsRef} className="bb70-3d-labels-layer" aria-hidden="true" />
          </div>
        )}
        {(staticOnly || !webglReady) && (
          <div style={{ padding: '0.6rem' }}>
            <FallbackBreadButterBlueprintSvg
              branch={branch}
              stage={stage}
              rulerMode={rulerMode}
              t={t}
            />
          </div>
        )}
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Active Outcome')}</span>
          <span className="bb70-metric-value">{t(activeBranch.badge)}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Sequence Stage')}</span>
          <span className="bb70-metric-value">
            {t(STAGE_LABELS[stage])} ({stage + 1}/4)
          </span>
        </div>
      </div>

      <div className="bb70-controls">
        <button
          type="button"
          className="bb70-btn"
          onClick={() => {
            setPlaying(false);
            setStage((p) => (p + 3) % 4);
          }}
          aria-label={t('Previous stage')}
        >
          <SkipBack size={15} aria-hidden="true" />
          <span>{t('Prev')}</span>
        </button>
        <button
          type="button"
          className={`bb70-btn${playing ? ' is-active' : ''}`}
          onClick={togglePlay}
          aria-label={t(playing ? 'Pause animation' : 'Play animation')}
        >
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          <span>{t(playing ? 'Pause' : 'Play')}</span>
        </button>
        <button
          type="button"
          className="bb70-btn"
          onClick={() => {
            setPlaying(false);
            setStage((p) => (p + 1) % 4);
          }}
          aria-label={t('Next stage')}
        >
          <span>{t('Next')}</span>
          <SkipForward size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="bb70-btn"
          onClick={() => {
            setPlaying(false);
            setStage(0);
          }}
          aria-label={t('Reset scene')}
        >
          <RotateCcw size={15} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
        <button
          type="button"
          className={`bb70-btn${!rulerMode ? ' is-active' : ''}`}
          aria-pressed={!rulerMode}
          onClick={() => setRulerMode(false)}
        >
          <Camera size={14} aria-hidden="true" />
          <span>{t('3D Studio')}</span>
        </button>
        <button
          type="button"
          className={`bb70-btn${rulerMode ? ' is-active' : ''}`}
          aria-pressed={rulerMode}
          onClick={() => setRulerMode(true)}
        >
          <Ruler size={14} aria-hidden="true" />
          <span>{t('Ruler View')}</span>
        </button>
        <button
          type="button"
          className="bb70-btn"
          onClick={() => setSpeedMs((s) => (s === 1700 ? 950 : 1700))}
          aria-label={t('Toggle playback speed')}
        >
          {speedMs === 1700 ? '1x' : '1.8x'}
        </button>
      </div>

      <div className="bb70-extract" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        <p style={{ marginBottom: '0.35rem' }}>{t(activeBranch.stepNotes[stage])}</p>
        <p style={{ fontSize: '0.84rem', color: 'var(--bb70-muted)', marginBottom: 0 }}>
          {t('Synthetic teaching candles (100–130 scaled pip units) — not live market prices or intrabar tick playback. Use Left/Right arrows, Space, or R to control stages.')}
        </p>
      </div>
    </div>
  );
};
