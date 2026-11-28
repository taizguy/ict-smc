import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type CorridorBranch = 'lrlr-highway' | 'hrlr-jam' | 'sweep-reclaim';
type CameraMode = 'corridor' | 'profile';

const branchConfig: Record<
  CorridorBranch,
  {
    label: string;
    badge: string;
    summary: string;
    pathY: number[];
    obstacleCount: number;
    lineColor: number;
  }
> = {
  'lrlr-highway': {
    label: 'LRLR Open Highway',
    badge: '0–1 Opposing Swings · Clean FVG',
    summary: 'Wide displacement expands smoothly through an unobstructed corridor toward the resting Equal Highs pool.',
    pathY: [-1.45, -1.05, -0.55, 0.05, 0.55, 0.95, 1.35, 1.65, 1.85],
    obstacleCount: 1,
    lineColor: 0x059669,
  },
  'hrlr-jam': {
    label: 'HRLR Traffic Jam',
    badge: '4+ Opposing Swings · Overlap',
    summary: 'Dense opposing swing barriers force repeated stalls, wick overlap, and sluggish progress toward the pool.',
    pathY: [-1.1, -0.55, -0.9, -0.25, -0.65, 0.05, -0.35, 0.35, 0.1],
    obstacleCount: 6,
    lineColor: 0xd97706,
  },
  'sweep-reclaim': {
    label: 'Sweep-and-Reclaim Trap',
    badge: 'Pierce → Reclaim Inside → Reverse',
    summary: 'Price pierces the Equal Highs pool by a shallow margin, fails to hold acceptance, and snaps back inside.',
    pathY: [-0.85, -0.2, 0.55, 1.35, 1.92, 1.1, 0.35, -0.45, -1.25],
    obstacleCount: 3,
    lineColor: 0xe11d48,
  },
};

export function LiquidityRunScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<CorridorBranch>('lrlr-highway');
  const [cameraMode, setCameraMode] = useState<CameraMode>('corridor');
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
    camera.position.set(4.6, 2.2, 6.8);
    camera.lookAt(0, 0.15, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    // Base grid & target EQH liquidity beam at y = +1.55
    const grid = new THREE.GridHelper(10, 12, 0x94a3b8, 0xcbd5e1);
    grid.position.y = -1.75;
    scene.add(grid);

    const poolBeam = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.08, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.72 }),
    );
    poolBeam.position.set(0, 1.55, 0);
    scene.add(poolBeam);

    // 6 opposing structural barrier blocks (visibility toggled by obstacleCount)
    const barriers: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.65, 1.15),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 }),
      );
      bar.position.set(-2.3 + i * 0.9, -0.55 + (i % 2) * 0.55, 0);
      scene.add(bar);
      barriers.push(bar);
    }

    // Dynamic trajectory markers along corridor
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
    const trajLine = new THREE.Line(lineGeo, lineMat);
    scene.add(trajLine);

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
      lineMat.color.setHex(cfg.lineColor);

      barriers.forEach((b, idx) => {
        b.visible = idx < cfg.obstacleCount;
      });

      const activeCount = Math.max(1, Math.min(9, Math.round(progRef.current * 9)));
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < 9; i++) {
        const x = -3.2 + i * 0.8;
        const y = cfg.pathY[i];
        const mat = nodes[i].material as THREE.MeshStandardMaterial;
        mat.color.setHex(cfg.lineColor);
        nodes[i].visible = i < activeCount;
        nodes[i].position.set(x, y, 0);
        pts.push(new THREE.Vector3(x, i < activeCount ? y : cfg.pathY[activeCount - 1], 0));
      }
      lineGeo.setFromPoints(pts);

      const targetCam =
        camRef.current === 'profile'
          ? new THREE.Vector3(0, 0.25, 7.6)
          : new THREE.Vector3(4.6, 2.2, 6.8);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(0, 0.15, 0);

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
    <figure className="lr-figure" data-lr-figure="lr-3d-corridor">
      <div className="lr-figure-head">
        <span className="lr-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Hydraulic Liquidity Corridor')}</span>
        </span>
        <span className="lr-badge">{active.badge}</span>
      </div>

      <div className="lr-controls-row" role="group" aria-label={t('3D Hydraulic Liquidity Corridor')}>
        {(Object.keys(branchConfig) as CorridorBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`lr-btn ${branch === key ? 'is-active' : ''}`}
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
          className="lr-btn"
          onClick={() => setCameraMode((m) => (m === 'corridor' ? 'profile' : 'corridor'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'corridor' ? t('Side Profile') : t('3D Corridor View')}</span>
        </button>
        <button type="button" className="lr-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button
          type="button"
          className="lr-btn"
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
        <svg viewBox="0 0 720 240" className="lr-svg" role="img" aria-label={t('3D Hydraulic Liquidity Corridor')}>
          <rect x="14" y="14" width="692" height="212" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          <line x1="40" y1="68" x2="680" y2="68" stroke="#0284c7" strokeWidth="2.2" strokeDasharray="6 4" />
          <text x="48" y="56" fontSize="11.5" fontWeight="700" fill="#0284c7">Resting Equal Highs (BSL Pool)</text>
          <path d="M60 185 L165 150 L275 110 L395 85 L520 68 L630 52" fill="none" stroke="#059669" strokeWidth="3" />
          <path d="M60 185 L145 148 L195 168 L265 135 L315 158 L395 122 L450 144 L540 112" fill="none" stroke="#d97706" strokeWidth="2.2" strokeDasharray="4 4" />
          <text x="390" y="182" fontSize="10.5" fontWeight="700" fill="#d97706">HRLR Opposing Barriers</text>
          <text x="480" y="46" fontSize="10.5" fontWeight="700" fill="#059669">LRLR Clean Expansion</text>
        </svg>
      ) : (
        <div ref={mountRef} className="lr-canvas-host" />
      )}

      <figcaption className="lr-caption">
        <span>{t(active.summary)}</span> — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
