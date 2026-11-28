import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type RangeBranch = 'external' | 'internal' | 'breakout';
type CameraMode = 'orbit' | 'profile';

const branchConfig: Record<
  RangeBranch,
  { label: string; badge: string; summary: string; pathY: number[]; color: number }
> = {
  external: {
    label: 'External Bullish Range',
    badge: '0% -> 100% -> 50% EQ',
    summary: 'Price displaces from 0% SSL to 100% BSL, pulls back below 50% EQ, and expands.',
    pathY: [-1.5, -0.4, 0.75, 1.5, 0.65, -0.35, -0.6, 0.75, 1.65],
    color: 0x0891b2,
  },
  internal: {
    label: 'Internal Sub-Range',
    badge: 'Nested Inside 4H',
    summary: 'A smaller internal dealing range rotates inside the larger 4H external range.',
    pathY: [-0.8, 0.45, -0.25, 0.55, -0.15, 0.65, 0.05, 0.75, 0.2],
    color: 0x059669,
  },
  breakout: {
    label: 'Range Expansion Break',
    badge: 'Re-Anchor Required',
    summary: 'Candle bodies close above 100%, requiring a fresh dealing-range anchor.',
    pathY: [-1.2, -0.2, 0.85, 0.15, 1.15, 1.45, 1.68, 1.88, 2.05],
    color: 0xd97706,
  },
};

export function DealingRangeScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<RangeBranch>('external');
  const [cameraMode, setCameraMode] = useState<CameraMode>('orbit');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.78);

  const branchRef = useRef(branch);
  const camRef = useRef(cameraMode);
  const playingRef = useRef(playing);
  const progRef = useRef(progress);

  branchRef.current = branch;
  camRef.current = cameraMode;
  playingRef.current = playing;
  progRef.current = progress;

  useEffect(() => {
    if (staticOnly || !mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 680;
    const height = 270;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.5, 2.0, 6.8);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const eqPlane = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.06, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x0891b2, transparent: true, opacity: 0.6 }),
    );
    scene.add(eqPlane);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x0891b2 }),
      );
      scene.add(node);
      nodes.push(node);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x0891b2 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints(
      new Array(9).fill(0).map((_, i) => new THREE.Vector3(-3.2 + i * 0.8, 0, 0)),
    );
    scene.add(new THREE.Line(lineGeo, lineMat));

    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (playingRef.current) {
        const next = (progRef.current + dt * 0.28) % 1.05;
        progRef.current = next;
        setProgress(next);
      }
      const cfg = branchConfig[branchRef.current];
      lineMat.color.setHex(cfg.color);

      const activeCount = Math.max(1, Math.min(9, Math.round(progRef.current * 9)));
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < 9; i++) {
        const x = -3.2 + i * 0.8;
        const y = cfg.pathY[i];
        (nodes[i].material as THREE.MeshStandardMaterial).color.setHex(cfg.color);
        nodes[i].visible = i < activeCount;
        nodes[i].position.set(x, y, 0);
        pts.push(new THREE.Vector3(x, i < activeCount ? y : cfg.pathY[activeCount - 1], 0));
      }
      lineGeo.setFromPoints(pts);

      const targetCam =
        camRef.current === 'profile'
          ? new THREE.Vector3(0, 0.1, 7.6)
          : new THREE.Vector3(4.5, 2.0, 6.8);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(0, 0, 0);

      renderer!.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 680;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer?.dispose();
    };
  }, [staticOnly]);

  const active = branchConfig[branch];

  return (
    <figure className="dr-figure" data-dr-figure="dr-3d-cube">
      <div className="dr-figure-head">
        <span className="dr-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Dealing-Range Equilibrium Cube')}</span>
        </span>
        <span className="dr-badge">{t(active.badge)}</span>
      </div>

      <div className="dr-controls-row">
        {(Object.keys(branchConfig) as RangeBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`dr-btn ${branch === key ? 'is-active' : ''}`}
            onClick={() => {
              setBranch(key);
              setProgress(0.78);
            }}
          >
            {t(branchConfig[key].label)}
          </button>
        ))}
        <button
          type="button"
          className="dr-btn"
          onClick={() => setCameraMode((m) => (m === 'orbit' ? 'profile' : 'orbit'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'orbit' ? t('Side Profile') : t('Cube Orbit')}</span>
        </button>
        <button type="button" className="dr-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button type="button" className="dr-btn" onClick={() => { setPlaying(false); setProgress(0.12); }}>
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 200" className="dr-svg" role="img" aria-label={t('3D Dealing-Range Equilibrium Cube')}>
          <rect x="14" y="14" width="692" height="172" rx="10" fill="var(--rr-paper)" stroke="var(--dr-border)" />
          <line x1="48" y1="100" x2="672" y2="100" stroke="#0891b2" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M65 156 L220 44 L390 124 L595 36" fill="none" stroke="#059669" strokeWidth="3" />
        </svg>
      ) : (
        <div ref={mountRef} className="dr-canvas-host" />
      )}

      <figcaption className="dr-caption">
        <span>{t(active.summary)}</span> — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
