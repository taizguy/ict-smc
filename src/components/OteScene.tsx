import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import type { OteSyntheticBar } from '../utils/oteMath';
import type { OteSceneApi } from './oteSceneRenderer';

/** Progressive Three.js 3D Motion Study 02 stage with complete static SVG fallback in HTML. */
export function OteScene({
  bars,
  count,
  bear = false,
  reduced = false,
  staticOnly = false,
  mark,
  children,
}: {
  bars: OteSyntheticBar[];
  count: number;
  bear?: boolean;
  reduced?: boolean;
  staticOnly?: boolean;
  mark: string;
  children: ReactNode;
}) {
  const { t, locale } = useTranslation();
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const api = useRef<OteSceneApi | null>(null);
  const [ready, setReady] = useState(false);

  const state = useRef({ bars, count, bear, reduced });
  state.current = { bars, count, bear, reduced };

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
        const mod = await import('./oteSceneRenderer').catch(() => null);
        pending = false;
        if (!mod || disposed || !active || !host.current || !canvas.current || !labels.current) {
          return;
        }
        try {
          const scene = mod.createOteScene(canvas.current, labels.current, {
            ...state.current,
            labels: {
              origin: bear ? '1.0 (1.0900)' : '1.0 (20,400)',
              eq: bear ? '0.50 (1.0850)' : '0.50 (20,450)',
              sweet: bear ? '0.705 OTE (1.08705)' : '0.705 OTE (20,429.5)',
              extreme: bear ? '0.0 (1.0800)' : '0.0 (20,500)',
              tp1: bear ? '-0.27 (1.0773)' : '-0.27 (20,527)',
              tp2: bear ? '-0.62 (1.0738)' : '-0.62 (20,562)',
            },
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
  }, [staticOnly, locale, bear]);

  useEffect(() => {
    api.current?.update({ bars, count, bear, reduced });
  }, [bars, count, bear, reduced]);

  return (
    <div className="ote-cinema" ref={host} data-scene-ready={ready} data-scene-polarity={bear ? 'bearish' : 'bullish'}>
      <div className="ote-cinema-fallback" aria-hidden={ready ? true : undefined}>
        {children}
      </div>
      {!staticOnly && (
        <>
          <canvas
            ref={canvas}
            role="img"
            aria-label={t(bear ? '3D Bearish Premium OTE Cinema (EUR/USD)' : '3D Bullish Discount OTE Cinema (NQ)')}
            hidden={!ready}
          />
          <div className="ote-scene-labels" ref={labels} aria-hidden="true" hidden={!ready} />
          <span className="ote-cinema-mark" aria-hidden="true">
            {mark}
          </span>
        </>
      )}
    </div>
  );
}
