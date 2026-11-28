import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type MssBranch = 'bull-mss' | 'bear-mss' | 'pullback';
type CameraMode = 'orbit' | 'profile';

const branchConfig: Record<
  MssBranch,
  { label: string; badge: string; summary: string; pathY: number[]; color: number }
> = {
  'bull-mss': {
    label: 'Bullish Sweep + MSS + FVG',
    badge: 'SSL Sweep -> Shift Up',
    summary: 'Price sweeps SSL, displaces through the prior swing high, and leaves an FVG.',
    pathY: [-0.2, -0.95, -1.65, -0.45, 0.75, 1.45, 0.45, 1.25, 1.85],
    color: 0x059669,
  },
  'bear-mss': {
    label: 'Bearish Sweep + MSS',
    badge: 'BSL Sweep -> Shift Down',
    summary: 'Price sweeps BSL, displaces lower through the prior swing low, and expands.',
    pathY: [0.25, 0.95, 1.65, 0.45, -0.75, -1.45, -0.45, -1.25, -1.85],
    color: 0xe11d48,
  },
  pullback: {
    label: 'Intraday Pullback Only',
    badge: 'Local Shift Inside HTF',
    summary: 'A 5m MSS can occur as a brief pullback inside an intact 4H trend.',
    pathY: [-1.1, 0.55, 1.25, 0.75, 0.25, 0.85, 1.35, 1.65, 1.9],
    color: 0x2563eb,
  },
};

export function MssScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<MssBranch>('bull-mss');
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

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x059669 }),
      );
      scene.add(node);
      nodes.push(node);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x059669 });
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
    <figure className="mss-figure" data-mss-figure="mss-3d-engine">
      <div className="mss-figure-head">
        <span className="mss-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Sweep-to-MSS Displacement Engine')}</span>
        </span>
        <span className="mss-badge">{t(active.badge)}</span>
      </div>

      <div className="mss-controls-row">
        {(Object.keys(branchConfig) as MssBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`mss-btn ${branch === key ? 'is-active' : ''}`}
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
          className="mss-btn"
          onClick={() => setCameraMode((m) => (m === 'orbit' ? 'profile' : 'orbit'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'orbit' ? t('Side Profile') : t('Engine Orbit')}</span>
        </button>
        <button type="button" className="mss-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button type="button" className="mss-btn" onClick={() => { setPlaying(false); setProgress(0.12); }}>
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 200" className="mss-svg" role="img" aria-label={t('3D Sweep-to-MSS Displacement Engine')}>
          <rect x="14" y="14" width="692" height="172" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <path d="M60 118 L155 156 L265 82 L380 44 L470 96 L615 36" fill="none" stroke="#059669" strokeWidth="3" />
        </svg>
      ) : (
        <div ref={mountRef} className="mss-canvas-host" />
      )}

      <figcaption className="mss-caption">
        <span>{t(active.summary)}</span> — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
