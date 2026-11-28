import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Camera, Ruler } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import {
  getObSceneCandles,
  type OrderBlockBranch,
  type OrderBlockCameraMode,
} from '../utils/orderBlockSceneRenderer';

interface OrderBlockSceneProps {
  staticOnly?: boolean;
}

interface BranchMeta {
  id: OrderBlockBranch;
  label: string;
  badge: string;
  stepNotes: string[];
}

const BRANCHES: BranchMeta[] = [
  {
    id: 'opening-bounce',
    label: 'Branch A: Opening Bounce (106.0)',
    badge: 'Bullish OB · Shallow Mitigation',
    stepNotes: [
      'Stage 1: Three consecutive down-close candles (106->101) sweep the resting low at 99.0.',
      'Stage 2: Displacement closes back above 106.0 (CISD) and clears the 109.0 swing reference (MSS).',
      'Stage 3: Price returns to the proximal opening reference (106.0) and rejects immediately upward.',
      'Stage 4: Continuation rallies to 115.0 within the 3-candle response window while keeping 103.5 untouched.',
    ],
  },
  {
    id: 'mean-threshold',
    label: 'Branch B: 50% Mean Threshold (103.5)',
    badge: 'Bullish OB · Midpoint Rebalance',
    stepNotes: [
      'Stage 1: Three consecutive down-close candles form a body band of 101.0–106.0 and full range 99.0–107.0.',
      'Stage 2: Strong upward departure leaves the OB unmitigated and prints a clean swing break above 109.0.',
      'Stage 3: Pullback dips deeper into the body, tagging the exact 50% Body Mean Threshold at 103.5 before closing back at 105.6.',
      'Stage 4: Demand responds from the midpoint and expands to 114.6 without closing below 99.0.',
    ],
  },
  {
    id: 'closing-failure',
    label: 'Branch C: Closing Failure (< 99.0)',
    badge: 'Invalidated OB -> Breaker Candidate',
    stepNotes: [
      'Stage 1: Initial down-close run establishes the bullish OB boundaries (Open 106.0, MT 103.5, Distal Low 99.0).',
      'Stage 2: Departure lifts past 109.0, inviting buyers to anchor stops below the 99.0 distal extreme.',
      'Stage 3: Selling pressure slices straight through 106.0 and 103.5 without a bullish response candle.',
      'Stage 4: A decisive candle close at 98.4 (< 99.0) invalidates the bullish OB and promotes it to a bearish Breaker candidate.',
    ],
  },
];

const STAGE_LABELS = ['Origin Run', 'Departure + MSS', 'Mitigation Test', 'Outcome Branch'];

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

const FallbackObBlueprintSvg: React.FC<{
  branch: OrderBlockBranch;
  stepIndex: number;
  cameraMode: OrderBlockCameraMode;
  t: (text: string) => string;
}> = ({ branch, stepIndex, cameraMode, t }) => {
  const candles = useMemo(() => getObSceneCandles(branch), [branch]);
  const visibleCount = Math.min(candles.length, [4, 6, 8, 10][stepIndex] ?? candles.length);
  const visible = candles.slice(0, visibleCount);

  const width = 720;
  const height = 310;
  const padL = 64;
  const padR = 178;
  const padT = 26;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const pMin = 94;
  const pMax = 117;
  const mapY = (p: number) => padT + ((pMax - p) / (pMax - pMin)) * innerH;
  const colW = innerW / candles.length;
  const plotRight = width - padR;

  const ticks = cameraMode === 'ruler' ? [96, 99, 101, 103.5, 106, 109, 112, 115] : [96, 99, 103.5, 106, 109, 115];
  const failed = branch === 'closing-failure' && visibleCount >= 9;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="ob-svg-stage"
      role="img"
      aria-label={t('Interactive Order Block Blueprint Stage')}
    >
      <rect x="0" y="0" width={width} height={height} fill="var(--ob-stage-bg)" rx="8" />
      {ticks.map((price) => {
        const y = mapY(price);
        return (
          <g key={price}>
            <line
              x1={padL}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="var(--ob-grid)"
              strokeDasharray={cameraMode === 'ruler' ? '2 2' : '3 4'}
            />
            <rect
              x="8"
              y={y - 9}
              width="48"
              height="18"
              rx="4"
              fill="var(--ob-surface)"
              stroke="var(--ob-border)"
            />
            <text
              x="32"
              y={y + 4}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--ob-ink)"
            >
              {price.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Full wick band (99-107) and Body band (101-106) */}
      <rect
        x={padL + colW * 1}
        y={mapY(107)}
        width={innerW - colW * 1}
        height={Math.max(6, mapY(99) - mapY(107))}
        fill="var(--ob-emerald-soft)"
        stroke="var(--ob-emerald)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <rect
        x={padL + colW * 1}
        y={mapY(106)}
        width={innerW - colW * 1}
        height={Math.max(6, mapY(101) - mapY(106))}
        fill={failed ? 'var(--ob-rose-soft)' : 'var(--ob-emerald-soft)'}
        stroke={failed ? 'var(--ob-rose)' : 'var(--ob-emerald)'}
        strokeWidth="1.4"
      />
      <line
        x1={padL + colW * 1}
        y1={mapY(103.5)}
        x2={plotRight}
        y2={mapY(103.5)}
        stroke="var(--ob-ochre)"
        strokeWidth="1.6"
        strokeDasharray="5 4"
      />

      {visibleCount >= 5 && (
        <line
          x1={padL}
          y1={mapY(109)}
          x2={plotRight}
          y2={mapY(109)}
          stroke="var(--ob-indigo)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />
      )}

      {visible.map((c) => {
        const cx = padL + c.index * colW + colW / 2;
        const isUp = c.close >= c.open;
        const bodyTop = mapY(Math.max(c.open, c.close));
        const bodyBot = mapY(Math.min(c.open, c.close));
        const fill =
          c.role === 'ob-run'
            ? 'var(--ob-ochre)'
            : isUp
              ? 'var(--ob-emerald-bright)'
              : 'var(--ob-rose)';
        return (
          <g key={c.index}>
            <line
              x1={cx}
              y1={mapY(c.high)}
              x2={cx}
              y2={mapY(c.low)}
              stroke="var(--ob-wick)"
              strokeWidth="1.8"
            />
            <rect
              x={cx - 9}
              y={bodyTop}
              width="18"
              height={Math.max(5, bodyBot - bodyTop)}
              fill={fill}
              rx="2.5"
            />
            {cameraMode === 'ruler' && (
              <text x={cx} y={mapY(c.high) - 5} textAnchor="middle" className="ob-svg-axis">
                {c.close.toFixed(1)}
              </text>
            )}
            <text x={cx} y={height - 12} textAnchor="middle" className="ob-svg-axis">
              {c.time}
            </text>
          </g>
        );
      })}

      {/* Dedicated right-margin crisp annotation badges so candles never overlap text */}
      {visibleCount >= 5 && (
        <g>
          <line x1={plotRight} y1={mapY(109)} x2={plotRight + 10} y2={mapY(109)} stroke="#1e40af" strokeWidth="1.4" />
          <rect x={plotRight + 10} y={mapY(109) - 12} width="158" height="24" rx="5" fill="#1e40af" />
          <text x={plotRight + 89} y={mapY(109) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
            {t('Swing Ref 109.0')}
          </text>
        </g>
      )}
      <g>
        <line x1={plotRight} y1={mapY(106)} x2={plotRight + 10} y2={mapY(106)} stroke="#065f46" strokeWidth="1.4" />
        <rect x={plotRight + 10} y={mapY(106) - 12} width="158" height="24" rx="5" fill="#065f46" />
        <text x={plotRight + 89} y={mapY(106) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('OB Open 106.0')}
        </text>
      </g>
      <g>
        <line x1={plotRight} y1={mapY(103.5)} x2={plotRight + 10} y2={mapY(103.5)} stroke="#92400e" strokeWidth="1.4" />
        <rect x={plotRight + 10} y={mapY(103.5) - 12} width="158" height="24" rx="5" fill="#92400e" />
        <text x={plotRight + 89} y={mapY(103.5) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('50% MT 103.5')}
        </text>
      </g>
      <g>
        <line x1={plotRight} y1={mapY(99)} x2={plotRight + 10} y2={mapY(99)} stroke="#9f1239" strokeWidth="1.4" />
        <rect x={plotRight + 10} y={mapY(99) - 12} width="158" height="24" rx="5" fill="#9f1239" />
        <text x={plotRight + 89} y={mapY(99) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('Distal Low 99.0')}
        </text>
      </g>
    </svg>
  );
};

export const OrderBlockScene: React.FC<OrderBlockSceneProps> = ({ staticOnly = false }) => {
  const { t, locale } = useTranslation();
  const [branch, setBranch] = useState<OrderBlockBranch>('opening-bounce');
  const [stepIndex, setStepIndex] = useState<number>(3);
  const [cameraMode, setCameraMode] = useState<OrderBlockCameraMode>('cinema');
  const [playing, setPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1700);
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<import('../utils/orderBlockSceneRenderer').OrderBlockSceneRenderer | null>(null);

  const activeBranch = useMemo(
    () => BRANCHES.find((b) => b.id === branch) || BRANCHES[0],
    [branch],
  );

  const localizedLabels = useMemo(
    () => ({
      obOpen: t('OB Open 106.0'),
      mt50: t('50% MT 103.5'),
      distalLow: t('Distal Low 99.0'),
      swingRef: t('Swing Ref 109.0'),
    }),
    [t, locale],
  );

  useEffect(() => {
    if (staticOnly || typeof window === 'undefined') return;
    const syncTheme = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onMq);

    let active = true;
    import('../utils/orderBlockSceneRenderer')
      .then((mod) => {
        if (!active || !mountRef.current) return;
        if (!detectHardwareWebGL()) {
          setWebglReady(false);
          return;
        }
        try {
          const instance = new mod.OrderBlockSceneRenderer(mountRef.current, labelsRef.current);
          instance.updateScene({
            branch,
            stepIndex,
            cameraMode,
            darkTheme: document.documentElement.getAttribute('data-theme') === 'dark',
            reducedMotion: mq.matches,
            labels: localizedLabels,
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
      obs.disconnect();
      mq.removeEventListener?.('change', onMq);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
    // Mount once on client hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticOnly]);

  useEffect(() => {
    if (!webglReady || !rendererRef.current) return;
    const raf = window.requestAnimationFrame(() => {
      rendererRef.current?.handleResize();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [webglReady]);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateScene({
        branch,
        stepIndex,
        cameraMode,
        darkTheme: isDark,
        reducedMotion,
        labels: localizedLabels,
      });
    }
  }, [branch, stepIndex, cameraMode, isDark, reducedMotion, localizedLabels]);

  useEffect(() => {
    if (!playing || reducedMotion || staticOnly) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= 3) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);
    return () => window.clearInterval(timer);
  }, [playing, speedMs, reducedMotion, staticOnly]);

  const togglePlay = () => {
    if (!playing && stepIndex >= 3) {
      setStepIndex(0);
    }
    setPlaying((p) => !p);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPlaying(false);
      setStepIndex((p) => (p + 1) % 4);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPlaying(false);
      setStepIndex((p) => (p + 3) % 4);
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      setPlaying(false);
      setStepIndex(0);
    }
  };

  return (
    <div
      className="ob-cinema-shell"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={t('Interactive 3D Order Block Motion Study')}
    >
      <div className="ob-tab-row" role="tablist" aria-label={t('Order block mitigation branches')}>
        {BRANCHES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={branch === item.id}
            className={`ob-tab-btn${branch === item.id ? ' is-active' : ''}`}
            onClick={() => {
              setBranch(item.id);
              setStepIndex(3);
              setPlaying(false);
            }}
          >
            {t(item.label)}
          </button>
        ))}
      </div>

      <div className="ob-cinema-stage-wrap">
        {!staticOnly && (
          <div
            className="ob-webgl-canvas-box"
            style={{ display: webglReady ? 'block' : 'none' }}
          >
            <div
              ref={mountRef}
              className="ob-webgl-host"
              aria-label={t(activeBranch.label)}
            />
            <div ref={labelsRef} className="ob-scene-labels" aria-hidden="true" />
          </div>
        )}
        {(staticOnly || !webglReady) && (
          <FallbackObBlueprintSvg
            branch={branch}
            stepIndex={stepIndex}
            cameraMode={cameraMode}
            t={t}
          />
        )}
        <div className="ob-cinema-hud">
          <span className="ob-hud-label">{t(activeBranch.badge)}</span>
          <span className="ob-hud-step ob-num">
            {t(STAGE_LABELS[stepIndex])} ({stepIndex + 1}/4)
          </span>
        </div>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-control-group">
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex((p) => (p + 3) % 4);
            }}
            aria-label={t('Previous stage')}
          >
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            className="ob-ctrl-btn is-primary"
            onClick={togglePlay}
            aria-label={t(playing ? 'Pause animation' : 'Play animation')}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex((p) => (p + 1) % 4);
            }}
            aria-label={t('Next stage')}
          >
            <SkipForward size={15} />
          </button>
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex(0);
            }}
            aria-label={t('Reset scene')}
          >
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="ob-control-group">
          <button
            type="button"
            className={`ob-ctrl-btn${cameraMode === 'cinema' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('cinema')}
          >
            <Camera size={14} />
            <span>{t('3D Studio')}</span>
          </button>
          <button
            type="button"
            className={`ob-ctrl-btn${cameraMode === 'ruler' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('ruler')}
          >
            <Ruler size={14} />
            <span>{t('Ruler View')}</span>
          </button>
          <button
            type="button"
            className="ob-ctrl-btn ob-num"
            onClick={() => setSpeedMs((s) => (s === 1700 ? 950 : 1700))}
            aria-label={t('Toggle playback speed')}
          >
            {speedMs === 1700 ? '1x' : '1.8x'}
          </button>
        </div>
      </div>

      <div className="ob-cinema-caption">
        <p>{t(activeBranch.stepNotes[stepIndex])}</p>
        <p className="ob-cinema-meta">
          {t('Synthetic teaching candles — not live market prices or intrabar tick playback. Use Left/Right arrows, Space, or R to control stages.')}
        </p>
      </div>
    </div>
  );
};
