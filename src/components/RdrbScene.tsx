import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import type { RdrbCinemaScenario, RdrbSyntheticBar } from '../utils/rdrbMath';
import type { RdrbSceneApi, RdrbSceneLabels } from './rdrbSceneRenderer';

function labelsForScenario(scenario: RdrbCinemaScenario): RdrbSceneLabels {
  if (scenario === 'bearish-bpr') {
    return {
      fvg1: 'Leg 1 BISI (1.0842–1.0862)',
      fvg2: 'Leg 2 SIBI (1.0846–1.0868)',
      bprCore: 'Bearish BPR Core (1.0846–1.0862)',
      mid50: '50% BPR (1.0854)',
      farEdge: 'Far-Edge Stop (1.0862)',
      target: 'SSL Draw (1.0815)',
    };
  }
  if (scenario === 'rdrb-redelivery') {
    return {
      fvg1: 'Leg 1 SIBI (20,440–20,460)',
      fvg2: 'Leg 2 BISI (20,432–20,454)',
      bprCore: 'BPR Core (20,440–20,454)',
      mid50: '50% BPR (20,447)',
      farEdge: 'Far-Edge Stop (20,440)',
      target: 'RDRB Expansion (20,494)',
    };
  }
  if (scenario === 'bpr-invalidation') {
    return {
      fvg1: 'Leg 1 SIBI (20,440–20,460)',
      fvg2: 'Leg 2 BISI (20,432–20,454)',
      bprCore: 'Failed BPR (20,440–20,454)',
      mid50: '50% BPR (20,447)',
      farEdge: 'Invalidated < 20,440',
      target: 'Breakdown (20,422)',
    };
  }
  return {
    fvg1: 'Leg 1 SIBI (20,440–20,460)',
    fvg2: 'Leg 2 BISI (20,432–20,454)',
    bprCore: 'Bullish BPR Core (20,440–20,454)',
    mid50: '50% BPR (20,447)',
    farEdge: 'Far-Edge Stop (20,440)',
    target: 'BSL Draw (20,489)',
  };
}

function ariaForScenario(scenario: RdrbCinemaScenario): string {
  if (scenario === 'bearish-bpr') return '3D Bearish BPR Cinema (EUR/USD)';
  if (scenario === 'rdrb-redelivery') return '3D RDRB Second-Visit Cinema (NQ)';
  if (scenario === 'bpr-invalidation') return '3D BPR Far-Edge Invalidation Cinema (NQ)';
  return '3D Bullish BPR Cinema (NQ)';
}

/** Progressive Three.js 3D Motion Study 02 stage with complete static SVG fallback in HTML. */
export function RdrbScene({
  bars,
  count,
  scenario = 'bullish-bpr',
  reduced = false,
  staticOnly = false,
  mark,
  children,
}: {
  bars: RdrbSyntheticBar[];
  count: number;
  scenario?: RdrbCinemaScenario;
  reduced?: boolean;
  staticOnly?: boolean;
  mark: string;
  children: ReactNode;
}) {
  const { t, locale } = useTranslation();
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const api = useRef<RdrbSceneApi | null>(null);
  const [ready, setReady] = useState(false);

  const state = useRef({ bars, count, scenario, reduced });
  state.current = { bars, count, scenario, reduced };

  useEffect(() => {
    if (staticOnly) return;
    let disposed = false;
    let active = false;
    let pending = false;
    let unload: (() => void) | undefined;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        active = entry.isIntersecting;
        if (!active) {
          unload?.();
          unload = undefined;
          api.current = null;
          setReady(false);
          return;
        }
        if (pending || api.current || !canvas.current || !labels.current) return;
        pending = true;
        const mod = await import('./rdrbSceneRenderer').catch(() => null);
        pending = false;
        if (!mod || disposed || !active || !host.current || !canvas.current || !labels.current) {
          return;
        }
        try {
          const scene = mod.createRdrbScene(canvas.current, labels.current, {
            ...state.current,
            labels: labelsForScenario(state.current.scenario),
          });
          if (disposed) {
            scene.dispose();
            return;
          }
          api.current = scene;
          unload = () => scene.dispose();
          setReady(true);
        } catch {
          setReady(false);
        }
      },
      { rootMargin: '160px' },
    );

    if (host.current) observer.observe(host.current);
    return () => {
      disposed = true;
      observer.disconnect();
      unload?.();
      api.current = null;
    };
  }, [staticOnly, locale]);

  useEffect(() => {
    api.current?.update({ bars, count, scenario, reduced }, labelsForScenario(scenario));
  }, [bars, count, scenario, reduced]);

  return (
    <div className="rdrb-cinema" ref={host} data-scene-ready={ready} data-scene-scenario={scenario}>
      <div className="rdrb-cinema-fallback" aria-hidden={ready ? true : undefined}>
        {children}
      </div>
      {!staticOnly && (
        <>
          <canvas
            ref={canvas}
            role="img"
            aria-label={t(ariaForScenario(scenario))}
            hidden={!ready}
          />
          <div className="rdrb-scene-labels" ref={labels} aria-hidden="true" hidden={!ready} />
          <span className="rdrb-cinema-mark" aria-hidden="true">
            {mark}
          </span>
        </>
      )}
    </div>
  );
}
