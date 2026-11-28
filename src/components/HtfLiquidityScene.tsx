import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Layers, Pause, Play, RotateCcw } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type AtlasBranch = 'sweep' | 'lrlr' | 'chop';
type CameraMode = 'atlas' | 'ruler';

const branchMeta: Record<
  AtlasBranch,
  {
    label: string;
    badge: string;
    summary: string;
    pathY: number[];
    color: number;
  }
> = {
  sweep: {
    label: 'Sweep & Reversal',
    badge: 'PDL Swept → MSS → PWH',
    summary: 'Price pierces PDL (SSL) with a wick, closes back inside, shifts 5M structure, and expands toward PWH.',
    pathY: [0.4, -0.3, -1.05, -1.65, -1.15, -0.45, 0.25, 0.95, 1.55],
    color: 0x0ea5e9,
  },
  lrlr: {
    label: 'LRLR Continuation',
    badge: 'Unobstructed Path → PWH',
    summary: 'Clean displacement candles leave FVGs with minimal opposing swings, driving straight through PDH into PWH.',
    pathY: [-0.9, -0.45, 0.05, 0.55, 0.95, 1.35, 1.72, 1.92, 2.08],
    color: 0x10b981,
  },
  chop: {
    label: 'Mid-Range Chop',
    badge: '45%–55% Equilibrium Trap',
    summary: 'Price oscillates around 50% Equilibrium between un-swept PWH and PDL, producing overlapping HRLR wicks.',
    pathY: [0.1, -0.25, 0.3, -0.15, 0.22, -0.28, 0.18, -0.12, 0.08],
    color: 0xf59e0b,
  },
};

export function HtfLiquidityScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<AtlasBranch>('sweep');
  const [cameraMode, setCameraMode] = useState<CameraMode>('atlas');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.75);
  const progressRef = useRef(progress);
  const playingRef = useRef(playing);
  const branchRef = useRef(branch);
  const cameraModeRef = useRef(cameraMode);

  progressRef.current = progress;
  playingRef.current = playing;
  branchRef.current = branch;
  cameraModeRef.current = cameraMode;

  useEffect(() => {
    if (staticOnly || !mountRef.current) return;
    const container = mountRef.current;
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 680;
    const height = 340;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(5.4, 3.2, 6.8);
    camera.lookAt(0, 0.1, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(4, 8, 5);
    scene.add(dirLight);

    // Topographic HTF elevation planes: PWH (top), Equilibrium (mid), PDL (bottom)
    const planeSpecs = [
      { y: 1.65, color: 0x6366f1, opacity: 0.16 }, // PWH / BSL
      { y: 0.0, color: 0x64748b, opacity: 0.1 },   // 50% Equilibrium
      { y: -1.45, color: 0xf43f5e, opacity: 0.16 }, // PDL / SSL
    ];
    planeSpecs.forEach((spec) => {
      const geo = new THREE.PlaneGeometry(7.2, 2.8);
      const mat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = spec.y;
      scene.add(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: spec.color, transparent: true, opacity: 0.65 }),
      );
      line.rotation.x = Math.PI / 2;
      line.position.y = spec.y;
      scene.add(line);
    });

    // Trajectory bars & probe sphere
    const candleGroup = new THREE.Group();
    scene.add(candleGroup);

    const probe = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.4 }),
    );
    scene.add(probe);

    const buildCandles = (b: AtlasBranch) => {
      while (candleGroup.children.length) {
        candleGroup.remove(candleGroup.children[0]);
      }
      const ys = branchMeta[b].pathY;
      ys.forEach((yVal, i) => {
        const prev = i > 0 ? ys[i - 1] : yVal - 0.15;
        const h = Math.max(0.22, Math.abs(yVal - prev) + 0.14);
        const bull = yVal >= prev;
        const geo = new THREE.BoxGeometry(0.34, h, 0.34);
        const mat = new THREE.MeshStandardMaterial({
          color: bull ? 0x10b981 : 0xef4444,
          roughness: 0.35,
        });
        const bar = new THREE.Mesh(geo, mat);
        bar.position.set(-3.0 + i * 0.75, (yVal + prev) / 2, 0);
        candleGroup.add(bar);
      });
      (probe.material as THREE.MeshStandardMaterial).color.setHex(branchMeta[b].color);
    };

    let lastBranch: AtlasBranch = branchRef.current;
    buildCandles(lastBranch);

    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (branchRef.current !== lastBranch) {
        lastBranch = branchRef.current;
        buildCandles(lastBranch);
      }

      if (playingRef.current) {
        const next = progressRef.current + dt * 0.24;
        const wrapped = next >= 1 ? 0 : next;
        progressRef.current = wrapped;
        setProgress(wrapped);
      }

      const ys = branchMeta[lastBranch].pathY;
      const exactIdx = progressRef.current * (ys.length - 1);
      const lo = Math.floor(exactIdx);
      const hi = Math.min(ys.length - 1, lo + 1);
      const frac = exactIdx - lo;
      const py = ys[lo] * (1 - frac) + ys[hi] * frac;
      const px = -3.0 + exactIdx * 0.75;
      probe.position.set(px, py, 0.35);

      const targetCam =
        cameraModeRef.current === 'ruler'
          ? new THREE.Vector3(0, 0.15, 7.6)
          : new THREE.Vector3(5.2, 3.1, 6.6);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(0, 0.1, 0);

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

  const activeMeta = branchMeta[branch];

  return (
    <figure className="hlm-figure hlm-3d-wrap" data-hlm-figure="hlm-3d-atlas">
      <div className="hlm-figure-head">
        <span className="hlm-head-title">
          <Layers size={16} aria-hidden="true" />
          <span>{t('3D Topographic Multi-Timeframe Liquidity Atlas')}</span>
        </span>
        <span className="hlm-badge">{activeMeta.badge}</span>
      </div>

      <div className="hlm-controls-row" role="group" aria-label={t('3D Topographic Multi-Timeframe Liquidity Atlas')}>
        {(Object.keys(branchMeta) as AtlasBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`hlm-btn ${branch === key ? 'is-active' : ''}`}
            onClick={() => {
              setBranch(key);
              setProgress(0.75);
            }}
          >
            {t(branchMeta[key].label)}
          </button>
        ))}
        <button
          type="button"
          className="hlm-btn"
          onClick={() => setCameraMode((m) => (m === 'atlas' ? 'ruler' : 'atlas'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'atlas' ? t('Straight-On Map') : t('3D Atlas View')}</span>
        </button>
        <button type="button" className="hlm-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button
          type="button"
          className="hlm-btn"
          onClick={() => {
            setPlaying(false);
            setProgress(0);
          }}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 260" className="hlm-svg" role="img" aria-label={t('3D Topographic Multi-Timeframe Liquidity Atlas')}>
          <rect x="16" y="16" width="688" height="228" rx="10" fill="var(--hlm-surface)" stroke="var(--hlm-border)" />
          <line x1="48" y1="54" x2="672" y2="54" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="54" y="46" fontSize="11.5" fontWeight="700" fill="#6366f1">PWH / BSL Plane (Tier 2)</text>
          <line x1="48" y1="130" x2="672" y2="130" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="54" y="122" fontSize="11" fill="var(--hlm-muted)">50% Dealing Range Equilibrium</text>
          <line x1="48" y1="200" x2="672" y2="200" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="54" y="218" fontSize="11.5" fontWeight="700" fill="#f43f5e">PDL / SSL Plane (Tier 3)</text>
          <path d="M90 110 L170 165 L230 212 L290 155 L370 105 L460 72 L580 50" fill="none" stroke="#0ea5e9" strokeWidth="3" />
          <circle cx="230" cy="212" r="6" fill="#f43f5e" />
          <circle cx="580" cy="50" r="6" fill="#10b981" />
        </svg>
      ) : (
        <div ref={mountRef} className="hlm-canvas-host" />
      )}

      <figcaption className="hlm-caption">
        {activeMeta.summary} — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
