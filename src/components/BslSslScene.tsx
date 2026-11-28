import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type TowerBranch = 'bsl-sweep' | 'ssl-sweep' | 'two-sided';
type CameraMode = 'orbit' | 'profile';

const branchConfig: Record<
  TowerBranch,
  {
    label: string;
    badge: string;
    summary: string;
    pathY: number[];
    color: number;
  }
> = {
  'bsl-sweep': {
    label: 'BSL Overhead Sweep',
    badge: 'BSL (Buy-Stops) Tagged',
    summary: 'Price pierces overhead BSL shelf, absorbs short stops, and reverses lower.',
    pathY: [-0.2, 0.35, 0.9, 1.42, 1.82, 0.95, 0.15, -0.55, -1.15],
    color: 0x0284c7,
  },
  'ssl-sweep': {
    label: 'SSL Underneath Sweep',
    badge: 'SSL (Sell-Stops) Tagged',
    summary: 'Price pierces underneath SSL shelf, absorbs long stops, and reverses higher.',
    pathY: [0.25, -0.35, -0.92, -1.45, -1.82, -0.95, -0.1, 0.65, 1.2],
    color: 0xe11d48,
  },
  'two-sided': {
    label: 'Balanced Range Tags',
    badge: 'BSL -> SSL Rotation',
    summary: 'Price sweeps upper BSL first, then rotates down to tag lower SSL.',
    pathY: [0.0, 0.8, 1.65, 1.1, 0.25, -0.45, -1.15, -1.68, -0.85],
    color: 0x059669,
  },
};

export function BslSslScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<TowerBranch>('bsl-sweep');
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
    camera.position.set(4.5, 1.9, 6.8);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const bslShelf = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.14, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.65 }),
    );
    bslShelf.position.set(0, 1.45, 0);
    scene.add(bslShelf);

    const sslShelf = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.14, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, transparent: true, opacity: 0.65 }),
    );
    sslShelf.position.set(0, -1.45, 0);
    scene.add(sslShelf);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 }),
      );
      scene.add(node);
      nodes.push(node);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x0284c7 });
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
          : new THREE.Vector3(4.5, 1.9, 6.8);
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
    <figure className="bsl-figure" data-bsl-figure="bsl-3d-tower">
      <div className="bsl-figure-head">
        <span className="bsl-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Order-Cluster Liquidity Tower')}</span>
        </span>
        <span className="bsl-badge">{t(active.badge)}</span>
      </div>

      <div className="bsl-controls-row" role="group" aria-label={t('3D Order-Cluster Liquidity Tower')}>
        {(Object.keys(branchConfig) as TowerBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`bsl-btn ${branch === key ? 'is-active' : ''}`}
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
          className="bsl-btn"
          onClick={() => setCameraMode((m) => (m === 'orbit' ? 'profile' : 'orbit'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'orbit' ? t('Side Profile') : t('Tower Orbit')}</span>
        </button>
        <button type="button" className="bsl-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button
          type="button"
          className="bsl-btn"
          onClick={() => {
            setPlaying(false);
            setProgress(0.12);
          }}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 230" className="bsl-svg" role="img" aria-label={t('3D Order-Cluster Liquidity Tower')}>
          <rect x="14" y="14" width="692" height="202" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          <line x1="48" y1="64" x2="672" y2="64" stroke="#0284c7" strokeWidth="2.4" strokeDasharray="6 4" />
          <line x1="48" y1="168" x2="672" y2="168" stroke="#e11d48" strokeWidth="2.4" strokeDasharray="6 4" />
          <text x="56" y="54" fontSize="11" fontWeight="700" fill="#0284c7">BSL Shelf (Above Highs)</text>
          <text x="56" y="186" fontSize="11" fontWeight="700" fill="#e11d48">SSL Shelf (Below Lows)</text>
          <path d="M80 124 L190 92 L295 44 L420 120 L565 154" fill="none" stroke="#0284c7" strokeWidth="3" />
        </svg>
      ) : (
        <div ref={mountRef} className="bsl-canvas-host" />
      )}

      <figcaption className="bsl-caption">
        <span>{t(active.summary)}</span> — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
