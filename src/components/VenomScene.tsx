import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Camera, Ruler } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { getVenomSceneCandles, type VenomBranch } from '../utils/venomModelMath';
import type { VenomCameraMode } from '../utils/venomSceneRenderer';

interface VenomSceneProps {
  staticOnly?: boolean;
}

interface BranchMeta {
  id: VenomBranch;
  label: string;
  badge: string;
  stepNotes: string[];
}

const BRANCHES: BranchMeta[] = [
  {
    id: 'deferred-fill',
    label: 'Branch A: Deferred Fill (111 -> 104)',
    badge: 'Double-Pass · Deferred Open Filled',
    stepNotes: [
      'Stage 1: 08:00–09:29 NY extended-hours candles carve the frozen 100.0–110.0 opening reference range.',
      'Stage 2: Post-09:30 Fang 1 expands above 110.0, reaching 113.0 and closing at 112.0 above buy-side liquidity.',
      'Stage 3: Fang 2 reverses sharply from 111.0 back inside the range (closing 108.0), declaring Deferred Open 111.0 and Invalidation 114.0.',
      'Stage 4: Retracement tags 111.2 to fill the resting 111.0 short limit, respects 114.0, and delivers cleanly to the 104.0 objective (2.33R pre-cost).',
    ],
  },
  {
    id: 'unfilled-runaway',
    label: 'Branch B: Unfilled Runaway (Straight to 104)',
    badge: 'Single-Pass · Direction Right, Limit Unfilled',
    stepNotes: [
      'Stage 1: 08:00–09:29 NY establishes the identical 100.0–110.0 reference boundaries.',
      'Stage 2: Fang 1 sweeps buy-side liquidity above 110.0, peaking at 113.0 and closing at 112.0.',
      'Stage 3: Fang 2 drops back inside the box (closing 108.0), anchoring the resting 111.0 deferred limit order.',
      'Stage 4: Price stalls at 108.9 and falls straight through 104.0 to 102.2. Direction works, but the 111.0 deferred order legitimately remains unfilled (0R).',
    ],
  },
  {
    id: 'closing-failure',
    label: 'Branch C: Closing Failure (> 114)',
    badge: 'Invalidated · Acceptance Above High',
    stepNotes: [
      'Stage 1: 08:00–09:29 NY locks the 100.0–110.0 opening reference boundaries.',
      'Stage 2: Fang 1 expands above 110.0 to 113.0 and closes at 112.0.',
      'Stage 3: Fang 2 dips back beneath 110.0 to 108.0, setting up the 111.0 deferred short and 114.0 invalidation level.',
      'Stage 4: Buyers reclaim 111.4 and close decisively at 114.4 above invalidation, ending the bearish Venom thesis cleanly at the pre-declared stop.',
    ],
  },
];

const STAGE_LABELS = ['Frozen 08:00–09:30', 'Fang 1 Sweep', 'Fang 2 Reversal', 'Outcome Branch'];

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

const FallbackVenomBlueprintSvg: React.FC<{
  branch: VenomBranch;
  stepIndex: number;
  cameraMode: VenomCameraMode;
  t: (text: string) => string;
}> = ({ branch, stepIndex, cameraMode, t }) => {
  const candles = useMemo(() => getVenomSceneCandles(branch), [branch]);
  const visibleCount = Math.min(candles.length, [3, 5, 7, 10][stepIndex] ?? candles.length);
  const visible = candles.slice(0, visibleCount);

  const width = 740;
  const height = 325;
  const padL = 62;
  const padR = 192;
  const padT = 26;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const pMin = 98.5;
  const pMax = 117.5;
  const mapY = (p: number) => padT + ((pMax - p) / (pMax - pMin)) * innerH;
  const colW = innerW / candles.length;
  const plotRight = width - padR;

  const ticks = cameraMode === 'ruler' ? [100, 104, 108, 110, 111, 114, 116] : [100, 104, 110, 114];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="vm-svg-stage"
      role="img"
      aria-label={t('Interactive Venom Model Blueprint Stage')}
    >
      <rect x="0" y="0" width={width} height={height} fill="var(--vm-stage-bg)" rx="8" />
      {ticks.map((price) => {
        const y = mapY(price);
        return (
          <g key={price}>
            <line
              x1={padL}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="var(--vm-grid)"
              strokeDasharray={cameraMode === 'ruler' ? '2 2' : '3 4'}
            />
            <rect
              x="8"
              y={y - 9}
              width="46"
              height="18"
              rx="4"
              fill="var(--vm-surface)"
              stroke="var(--vm-border)"
            />
            <text
              x="31"
              y={y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--vm-ink)"
            >
              {price.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Frozen 08:00-09:30 Box (candles 0..2, 100-110) */}
      <rect
        x={padL + 2}
        y={mapY(110)}
        width={colW * 3 - 4}
        height={Math.max(8, mapY(100) - mapY(110))}
        fill="var(--vm-violet-soft)"
        stroke="var(--vm-violet)"
        strokeWidth="1.4"
      />
      {/* Extended 110 High & 100 Low rails */}
      <line
        x1={padL + colW * 3}
        y1={mapY(110)}
        x2={plotRight}
        y2={mapY(110)}
        stroke="var(--vm-violet)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      <line
        x1={padL + colW * 3}
        y1={mapY(100)}
        x2={plotRight}
        y2={mapY(100)}
        stroke="var(--vm-violet)"
        strokeWidth="1.3"
        strokeDasharray="5 3"
      />

      {visibleCount >= 7 && (
        <>
          <line
            x1={padL + colW * 5}
            y1={mapY(111)}
            x2={plotRight}
            y2={mapY(111)}
            stroke="var(--vm-amber)"
            strokeWidth="1.8"
          />
          <line
            x1={padL + colW * 5}
            y1={mapY(114)}
            x2={plotRight}
            y2={mapY(114)}
            stroke="var(--vm-crimson)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1={padL + colW * 5}
            y1={mapY(104)}
            x2={plotRight}
            y2={mapY(104)}
            stroke="var(--vm-teal)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </>
      )}

      {visible.map((c) => {
        const cx = padL + c.index * colW + colW / 2;
        const isUp = c.close >= c.open;
        const bodyTop = mapY(Math.max(c.open, c.close));
        const bodyBot = mapY(Math.min(c.open, c.close));
        const fill =
          c.role === 'range'
            ? 'var(--vm-violet)'
            : c.role === 'fang1'
              ? 'var(--vm-amber)'
              : isUp
                ? 'var(--vm-teal)'
                : 'var(--vm-crimson)';
        return (
          <g key={c.index}>
            <line
              x1={cx}
              y1={mapY(c.high)}
              x2={cx}
              y2={mapY(c.low)}
              stroke="var(--vm-wick)"
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
              <text x={cx} y={mapY(c.high) - 5} textAnchor="middle" className="vm-svg-axis">
                {c.close.toFixed(1)}
              </text>
            )}
            <text x={cx} y={height - 12} textAnchor="middle" className="vm-svg-axis">
              {c.time}
            </text>
          </g>
        );
      })}

      {/* Crisp non-overlapping right-margin rail badges */}
      {visibleCount >= 7 && (
        <g>
          <line x1={plotRight} y1={mapY(114)} x2={plotRight + 10} y2={mapY(114)} stroke="#be123c" strokeWidth="1.4" />
          <rect x={plotRight + 10} y={mapY(114) - 12} width="174" height="24" rx="5" fill="#be123c" />
          <text x={plotRight + 97} y={mapY(114) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
            {t('Invalidation 114.0')}
          </text>
        </g>
      )}
      {visibleCount >= 7 && (
        <g>
          <line x1={plotRight} y1={mapY(111)} x2={plotRight + 10} y2={mapY(111) - 6} stroke="#b45309" strokeWidth="1.4" />
          <rect x={plotRight + 10} y={mapY(111) - 18} width="174" height="24" rx="5" fill="#b45309" />
          <text x={plotRight + 97} y={mapY(111) - 2} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
            {t('Deferred Open 111.0')}
          </text>
        </g>
      )}
      <g>
        <line x1={plotRight} y1={mapY(110)} x2={plotRight + 10} y2={mapY(110) + 12} stroke="#5b21b6" strokeWidth="1.4" />
        <rect x={plotRight + 10} y={mapY(110)} width="174" height="24" rx="5" fill="#5b21b6" />
        <text x={plotRight + 97} y={mapY(110) + 16} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('08:00–09:30 High 110.0')}
        </text>
      </g>
      {visibleCount >= 7 && (
        <g>
          <line x1={plotRight} y1={mapY(104)} x2={plotRight + 10} y2={mapY(104)} stroke="#0f766e" strokeWidth="1.4" />
          <rect x={plotRight + 10} y={mapY(104) - 12} width="174" height="24" rx="5" fill="#0f766e" />
          <text x={plotRight + 97} y={mapY(104) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
            {t('Objective 104.0')}
          </text>
        </g>
      )}
      <g>
        <line x1={plotRight} y1={mapY(100)} x2={plotRight + 10} y2={mapY(100)} stroke="#5b21b6" strokeWidth="1.4" />
        <rect x={plotRight + 10} y={mapY(100) - 12} width="174" height="24" rx="5" fill="#5b21b6" />
        <text x={plotRight + 97} y={mapY(100) + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('08:00–09:30 Low 100.0')}
        </text>
      </g>
    </svg>
  );
};

export const VenomScene: React.FC<VenomSceneProps> = ({ staticOnly = false }) => {
  const { t, locale } = useTranslation();
  const [branch, setBranch] = useState<VenomBranch>('deferred-fill');
  const [stepIndex, setStepIndex] = useState<number>(3);
  const [cameraMode, setCameraMode] = useState<VenomCameraMode>('cinema');
  const [playing, setPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1700);
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<import('../utils/venomSceneRenderer').VenomSceneRenderer | null>(null);

  const activeBranch = useMemo(
    () => BRANCHES.find((b) => b.id === branch) || BRANCHES[0],
    [branch],
  );

  const localizedLabels = useMemo(
    () => ({
      invalidation: t('Invalidation 114.0'),
      venomOpen: t('Deferred Open 111.0'),
      rangeHigh: t('08:00–09:30 High 110.0'),
      target: t('Objective 104.0'),
      rangeLow: t('08:00–09:30 Low 100.0'),
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
    import('../utils/venomSceneRenderer')
      .then((mod) => {
        if (!active || !mountRef.current) return;
        if (!detectHardwareWebGL()) {
          setWebglReady(false);
          return;
        }
        try {
          const instance = new mod.VenomSceneRenderer(mountRef.current, labelsRef.current);
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
      className="vm-cinema-shell"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={t('Interactive 3D Venom Model Motion Study')}
    >
      <div className="vm-tab-row" role="tablist" aria-label={t('Venom Model outcome branches')}>
        {BRANCHES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={branch === item.id}
            className={`vm-tab-btn${branch === item.id ? ' is-active' : ''}`}
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

      <div className="vm-cinema-stage-wrap">
        {!staticOnly && (
          <div
            className="vm-webgl-canvas-box"
            style={{ display: webglReady ? 'block' : 'none' }}
          >
            <div
              ref={mountRef}
              className="vm-webgl-host"
              aria-label={t(activeBranch.label)}
            />
            <div ref={labelsRef} className="vm-scene-labels" aria-hidden="true" />
          </div>
        )}
        {(staticOnly || !webglReady) && (
          <FallbackVenomBlueprintSvg
            branch={branch}
            stepIndex={stepIndex}
            cameraMode={cameraMode}
            t={t}
          />
        )}
        <div className="vm-cinema-hud">
          <span className="vm-hud-label">{t(activeBranch.badge)}</span>
          <span className="vm-hud-step vm-num">
            {t(STAGE_LABELS[stepIndex])} ({stepIndex + 1}/4)
          </span>
        </div>
      </div>

      <div className="vm-toolbar-split">
        <div className="vm-control-group">
          <button
            type="button"
            className="vm-ctrl-btn"
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
            className="vm-ctrl-btn is-primary"
            onClick={togglePlay}
            aria-label={t(playing ? 'Pause animation' : 'Play animation')}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="vm-ctrl-btn"
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
            className="vm-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex(0);
            }}
            aria-label={t('Reset scene')}
          >
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="vm-control-group">
          <button
            type="button"
            className={`vm-ctrl-btn${cameraMode === 'cinema' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('cinema')}
          >
            <Camera size={14} />
            <span>{t('3D Studio')}</span>
          </button>
          <button
            type="button"
            className={`vm-ctrl-btn${cameraMode === 'ruler' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('ruler')}
          >
            <Ruler size={14} />
            <span>{t('Ruler View')}</span>
          </button>
          <button
            type="button"
            className="vm-ctrl-btn vm-num"
            onClick={() => setSpeedMs((s) => (s === 1700 ? 950 : 1700))}
            aria-label={t('Toggle playback speed')}
          >
            {speedMs === 1700 ? '1x' : '1.8x'}
          </button>
        </div>
      </div>

      <div className="vm-cinema-caption">
        <p>{t(activeBranch.stepNotes[stepIndex])}</p>
        <p className="vm-cinema-meta">
          {t('Synthetic teaching candles — not live market prices or intrabar tick playback. Use Left/Right arrows, Space, or R to control stages.')}
        </p>
      </div>
    </div>
  );
};
