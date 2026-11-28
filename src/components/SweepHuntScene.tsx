import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type EngineBranch = 'clean-sweep' | 'slippage-spike' | 'acceptance';
type CameraMode = 'orbit' | 'profile';

const branchConfig: Record<
  EngineBranch,
  { label: string; badge: string; summary: string; pathY: number[]; color: number }
> = {
  'clean-sweep': {
    label: 'Clean Wick Sweep',
    badge: 'Wick & Reclaim',
    summary: 'Price pierces resting liquidity cleanly and closes back inside the range.',
    pathY: [-0.5, 0.1, 0.75, 1.35, 1.65, 0.85, 0.15, -0.45, -1.0],
    color: 0xe11d48,
  },
  'slippage-spike': {
    label: 'Thin-Book Slippage Spike',
    badge: 'Stop-Market Cascade',
    summary: 'Stop-market cascade spikes sharply through thin depth before snapping back.',
    pathY: [-0.4, 0.25, 0.85, 1.98, 1.45, 0.65, -0.1, -0.65, -1.15],
    color: 0xd97706,
  },
  acceptance: {
    label: 'True Breakout Acceptance',
    badge: 'Close Beyond Level',
    summary: 'Price closes and holds outside the level without snapping back inside.',
    pathY: [-0.7, -0.15, 0.45, 1.1, 1.35, 1.55, 1.72, 1.9, 2.05],
    color: 0x059669,
  },
};

export function SweepHuntScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<EngineBranch>('clean-sweep');
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
    camera.lookAt(0, 0.2, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const levelPlane = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.08, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.7 }),
    );
    levelPlane.position.set(0, 1.15, 0);
    scene.add(levelPlane);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xe11d48 }),
      );
      scene.add(node);
      nodes.push(node);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0xe11d48 });
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
          ? new THREE.Vector3(0, 0.2, 7.6)
          : new THREE.Vector3(4.5, 2.0, 6.8);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(0, 0.2, 0);

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
    <figure className="sh-figure" data-sh-figure="sh-3d-engine">
      <div className="sh-figure-head">
        <span className="sh-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Order-Book Sweep & Slippage Engine')}</span>
        </span>
        <span className="sh-badge">{t(active.badge)}</span>
      </div>

      <div className="sh-controls-row">
        {(Object.keys(branchConfig) as EngineBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`sh-btn ${branch === key ? 'is-active' : ''}`}
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
          className="sh-btn"
          onClick={() => setCameraMode((m) => (m === 'orbit' ? 'profile' : 'orbit'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'orbit' ? t('Side Profile') : t('Engine Orbit')}</span>
        </button>
        <button type="button" className="sh-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button type="button" className="sh-btn" onClick={() => { setPlaying(false); setProgress(0.12); }}>
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 220" className="sh-svg" role="img" aria-label={t('3D Order-Book Sweep & Slippage Engine')}>
          <rect x="14" y="14" width="692" height="192" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          <line x1="48" y1="86" x2="672" y2="86" stroke="#0284c7" strokeWidth="2.4" strokeDasharray="6 4" />
          <path d="M80 156 L230 96 L360 36 L475 124 L615 162" fill="none" stroke="#e11d48" strokeWidth="3" />
        </svg>
      ) : (
        <div ref={mountRef} className="sh-canvas-host" />
      )}

      <figcaption className="sh-caption">
        <span>{t(active.summary)}</span> — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
