import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Camera, Ruler } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import {
  BREAKER_SCENE_SCENARIOS,
  type BreakerSceneScenario,
  type BreakerSceneScenarioId,
} from '../utils/breakerBlockMath';
import type { BreakerCameraMode } from '../utils/breakerBlockSceneRenderer';

interface BreakerBlockSceneProps {
  staticOnly?: boolean;
}

const FallbackBlueprintSvg: React.FC<{
  scenario: BreakerSceneScenario;
  stepIndex: number;
  cameraMode: BreakerCameraMode;
  t: (text: string) => string;
}> = ({ scenario, stepIndex, cameraMode, t }) => {
  const step = scenario.steps[Math.min(stepIndex, scenario.steps.length - 1)] || scenario.steps[0];
  const width = 680;
  const height = 292;
  const padL = 62;
  const padR = 28;
  const padT = 26;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const span = Math.max(1, scenario.priceMax - scenario.priceMin);
  const mapY = (p: number) => padT + ((scenario.priceMax - p) / span) * innerH;
  const count = scenario.candles.length;
  const colW = innerW / count;
  const visible = scenario.candles.slice(0, step.visibleCount);

  const zTop = mapY(scenario.zoneHigh);
  const zBot = mapY(scenario.zoneLow);
  const zMid = mapY(scenario.zoneMid);
  const sweepY = mapY(scenario.sweepLevel);
  const mssY = mapY(scenario.mssLevel);

  const zoneFill =
    scenario.direction === 'bullish'
      ? 'var(--bb-cobalt-soft)'
      : scenario.direction === 'bearish'
        ? 'var(--bb-rose-soft)'
        : 'var(--bb-amber-soft)';
  const zoneStroke =
    scenario.direction === 'bullish'
      ? 'var(--bb-cobalt)'
      : scenario.direction === 'bearish'
        ? 'var(--bb-rose)'
        : 'var(--bb-amber)';

  const tickFractions = cameraMode === 'ruler' ? [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] : [0, 0.25, 0.5, 0.75, 1];
  const ticks = tickFractions.map((f) => Number((scenario.priceMin + f * span).toFixed(1)));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="bb-svg-stage"
      role="img"
      aria-label={t(scenario.title)}
    >
      <rect x="0" y="0" width={width} height={height} fill="var(--bb-stage-bg)" rx="8" />
      {ticks.map((price, idx) => {
        const y = mapY(price);
        return (
          <g key={`${price}-${idx}`}>
            <line
              x1={padL}
              y1={y}
              x2={width - padR}
              y2={y}
              stroke="var(--bb-grid)"
              strokeDasharray={cameraMode === 'ruler' ? '2 2' : '3 4'}
            />
            <text x={padL - 8} y={y + 4} textAnchor="end" className="bb-svg-axis">
              {price.toFixed(0)}
            </text>
          </g>
        );
      })}

      {step.highlightZone && (
        <g>
          <rect
            x={padL}
            y={zTop}
            width={innerW}
            height={Math.max(6, zBot - zTop)}
            fill={zoneFill}
            stroke={zoneStroke}
            strokeWidth="1.3"
          />
          <line
            x1={padL}
            y1={zMid}
            x2={width - padR}
            y2={zMid}
            stroke="var(--bb-amber)"
            strokeWidth="1.3"
            strokeDasharray="5 4"
          />
          <text x={width - padR - 6} y={zTop + 13} textAnchor="end" className="bb-svg-tag">
            {t('Breaker')} {scenario.zoneLow}–{scenario.zoneHigh} (50%: {scenario.zoneMid})
          </text>
        </g>
      )}

      {step.highlightFvg && scenario.fvgLow !== undefined && scenario.fvgHigh !== undefined && (
        <g>
          <rect
            x={padL + colW * 4}
            y={mapY(scenario.fvgHigh)}
            width={innerW - colW * 4}
            height={Math.max(6, mapY(scenario.fvgLow) - mapY(scenario.fvgHigh))}
            fill="var(--bb-amber-soft)"
            stroke="var(--bb-amber)"
            strokeWidth="1.5"
          />
          <text x={padL + colW * 4 + 8} y={mapY(scenario.fvgLow) - 5} className="bb-svg-tag-amber">
            {t('FVG')} {scenario.fvgLow}–{scenario.fvgHigh}
          </text>
        </g>
      )}

      {step.showSweepLine && (
        <g>
          <line x1={padL} y1={sweepY} x2={width - padR} y2={sweepY} stroke="var(--bb-emerald)" strokeWidth="1.3" strokeDasharray="4 3" />
          <text x={padL + 6} y={sweepY - 5} className="bb-svg-tag-emerald">
            {t(scenario.sweepLabel)}
          </text>
        </g>
      )}

      {step.showMssLine && (
        <g>
          <line x1={padL} y1={mssY} x2={width - padR} y2={mssY} stroke="var(--bb-cobalt)" strokeWidth="1.3" strokeDasharray="6 3" />
          <text x={padL + 6} y={mssY - 5} className="bb-svg-tag">
            {t(scenario.mssLabel)}
          </text>
        </g>
      )}

      {visible.map((c) => {
        const cx = padL + c.index * colW + colW / 2;
        const isBull = c.close >= c.open;
        const isOrigin = c.role === 'origin-b';
        const bodyTop = mapY(Math.max(c.open, c.close));
        const bodyBot = mapY(Math.min(c.open, c.close));
        const fill = isOrigin
          ? 'var(--bb-amber)'
          : isBull
            ? 'var(--bb-cobalt)'
            : 'var(--bb-rose)';
        return (
          <g key={c.index}>
            <line
              x1={cx}
              y1={mapY(c.high)}
              x2={cx}
              y2={mapY(c.low)}
              stroke="var(--bb-wick)"
              strokeWidth="1.9"
            />
            <rect
              x={cx - 10}
              y={bodyTop}
              width="20"
              height={Math.max(5, bodyBot - bodyTop)}
              fill={fill}
              rx="2.5"
            />
            {cameraMode === 'ruler' && (
              <text x={cx} y={mapY(c.high) - 5} textAnchor="middle" className="bb-svg-axis">
                {c.close}
              </text>
            )}
            <text x={cx} y={height - 12} textAnchor="middle" className="bb-svg-axis">
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const BreakerBlockScene: React.FC<BreakerBlockSceneProps> = ({ staticOnly = false }) => {
  const { t } = useTranslation();
  const [scenarioId, setScenarioId] = useState<BreakerSceneScenarioId>('bullish-breaker');
  const [stepIndex, setStepIndex] = useState<number>(
    BREAKER_SCENE_SCENARIOS[0].steps.length - 1,
  );
  const [cameraMode, setCameraMode] = useState<BreakerCameraMode>('iso');
  const [playing, setPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1700);
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<import('../utils/breakerBlockSceneRenderer').BreakerBlockSceneRenderer | null>(null);

  const scenario = useMemo(
    () => BREAKER_SCENE_SCENARIOS.find((s) => s.id === scenarioId) || BREAKER_SCENE_SCENARIOS[0],
    [scenarioId],
  );
  const step = scenario.steps[Math.min(stepIndex, scenario.steps.length - 1)] || scenario.steps[0];
  const overlayLabels = useMemo(
    () => ({
      breakerTag: `${t('Breaker')} ${scenario.zoneLow}–${scenario.zoneHigh}`,
      fvgTag:
        scenario.fvgLow !== undefined && scenario.fvgHigh !== undefined
          ? `${t('FVG')} ${scenario.fvgLow}–${scenario.fvgHigh}`
          : undefined,
      sweepTag: t(scenario.sweepLabel),
      mssTag: t(scenario.mssLabel),
    }),
    [scenario, t],
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
    import('../utils/breakerBlockSceneRenderer')
      .then((mod) => {
        if (!active || !mountRef.current) return;
        const ok = mod.detectHardwareWebGL();
        if (!ok) {
          setWebglReady(false);
          return;
        }
        try {
          rendererRef.current = new mod.BreakerBlockSceneRenderer({
            container: mountRef.current,
            overlay: labelsRef.current,
            scenario,
            stepIndex,
            cameraMode,
            dark: document.documentElement.getAttribute('data-theme') === 'dark',
            reducedMotion: mq.matches,
            labels: overlayLabels,
          });
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
    // Mount WebGL context once on client hydration
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
      rendererRef.current.updateScene(
        scenario,
        stepIndex,
        cameraMode,
        isDark,
        reducedMotion,
        overlayLabels,
      );
    }
  }, [scenario, stepIndex, cameraMode, isDark, reducedMotion, overlayLabels]);

  useEffect(() => {
    if (!playing || reducedMotion || staticOnly) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= scenario.steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);
    return () => window.clearInterval(timer);
  }, [playing, speedMs, scenario.steps.length, reducedMotion, staticOnly]);

  const selectScenario = (id: BreakerSceneScenarioId) => {
    const next = BREAKER_SCENE_SCENARIOS.find((s) => s.id === id) || BREAKER_SCENE_SCENARIOS[0];
    setScenarioId(id);
    setStepIndex(next.steps.length - 1);
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!playing && stepIndex >= scenario.steps.length - 1) {
      setStepIndex(0);
    }
    setPlaying((p) => !p);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPlaying(false);
      setStepIndex((p) => (p + 1) % scenario.steps.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPlaying(false);
      setStepIndex((p) => (p - 1 + scenario.steps.length) % scenario.steps.length);
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div
      className="bb-cinema-shell"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={t('Interactive 3D Breaker Block Motion Study')}
    >
      <div className="bb-cinema-tabs" role="tablist" aria-label={t('Breaker scenarios')}>
        {BREAKER_SCENE_SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={scenarioId === item.id}
            className={`bb-tab-btn${scenarioId === item.id ? ' is-active' : ''}`}
            onClick={() => selectScenario(item.id)}
          >
            {t(item.title)}
          </button>
        ))}
      </div>

      <div className="bb-cinema-stage-wrap">
        {!staticOnly && (
          <div
            className="bb-webgl-canvas-box"
            style={{ display: webglReady ? 'block' : 'none' }}
          >
            <div
              ref={mountRef}
              className="bb-webgl-host"
              aria-label={t(scenario.title)}
            />
            <div ref={labelsRef} className="bb-scene-labels" aria-hidden="true" />
          </div>
        )}
        {(staticOnly || !webglReady) && (
          <FallbackBlueprintSvg
            scenario={scenario}
            stepIndex={stepIndex}
            cameraMode={cameraMode}
            t={t}
          />
        )}
        <div className="bb-cinema-hud">
          <span className="bb-hud-label">{t(scenario.badge)}</span>
          <span className="bb-hud-step bb-num">
            {t(step.phase)} ({stepIndex + 1}/{scenario.steps.length})
          </span>
        </div>
      </div>

      <div className="bb-cinema-controls">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex((p) => (p - 1 + scenario.steps.length) % scenario.steps.length);
            }}
            aria-label={t('Previous stage')}
          >
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={togglePlay}
            aria-label={t(playing ? 'Pause animation' : 'Play animation')}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="bb-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex((p) => (p + 1) % scenario.steps.length);
            }}
            aria-label={t('Next stage')}
          >
            <SkipForward size={15} />
          </button>
          <button
            type="button"
            className="bb-ctrl-btn"
            onClick={() => {
              setPlaying(false);
              setStepIndex(0);
            }}
            aria-label={t('Reset scene')}
          >
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="bb-control-group">
          <button
            type="button"
            className={`bb-ctrl-btn${cameraMode === 'iso' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('iso')}
          >
            <Camera size={14} />
            <span>{t('3D Cinema')}</span>
          </button>
          <button
            type="button"
            className={`bb-ctrl-btn${cameraMode === 'ruler' ? ' is-active' : ''}`}
            onClick={() => setCameraMode('ruler')}
          >
            <Ruler size={14} />
            <span>{t('Ruler View')}</span>
          </button>
          <button
            type="button"
            className="bb-ctrl-btn bb-num"
            onClick={() => setSpeedMs((s) => (s === 1700 ? 950 : 1700))}
            aria-label={t('Toggle playback speed')}
          >
            {speedMs === 1700 ? '1x' : '1.8x'}
          </button>
        </div>
      </div>

      <div className="bb-cinema-caption">
        <p>{t(step.caption)}</p>
        <p className="bb-cinema-meta">
          {t('Synthetic teaching candles — not live market prices or intrabar tick playback. Use Left/Right arrows or Space to control stages.')}
        </p>
      </div>
    </div>
  );
};
