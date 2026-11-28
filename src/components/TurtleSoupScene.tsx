import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type SoupBranch = 'bearish-sweep' | 'bullish-sweep' | 'true-breakout';
type CameraMode = 'trap' | 'ruler';

const branchConfig: Record<
  SoupBranch,
  {
    label: string;
    badge: string;
    summary: string;
    pathY: number[];
    lineColor: number;
  }
> = {
  'bearish-sweep': {
    label: 'Bearish Sweep + Rejection Block',
    badge: '110 → 112 Wick → 107 → 110.5',
    summary: 'Price pokes above 110.0 to 112.0, closes body at 110–111, departs to 107, and retests 110.5.',
    pathY: [-0.3, 0.25, 0.85, 1.55, 0.55, -0.45, -1.25, 0.15, -0.85],
    lineColor: 0xe11d48,
  },
  'bullish-sweep': {
    label: 'Bullish SSL Turtle Soup',
    badge: 'PDL Swept → Reclaim → Expansion',
    summary: 'Price pierces Sell-Side Liquidity below PDL, leaves a lower Rejection Block wick, and shifts upward.',
    pathY: [0.4, -0.2, -0.85, -1.55, -0.55, 0.35, 1.15, 0.15, 1.35],
    lineColor: 0x059669,
  },
  'true-breakout': {
    label: 'Sustained Acceptance (No Soup)',
    badge: 'Body Holds > 110 (Not a Sweep)',
    summary: 'Candle bodies close and hold above 110.0—confirming acceptance rather than a Turtle Soup reversal.',
    pathY: [-0.5, 0.0, 0.45, 0.85, 1.1, 1.35, 1.55, 1.75, 1.95],
    lineColor: 0xd97706,
  },
};

export function TurtleSoupScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<SoupBranch>('bearish-sweep');
  const [cameraMode, setCameraMode] = useState<CameraMode>('trap');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.75);

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
    camera.position.set(4.8, 2.4, 6.6);
    camera.lookAt(0, 0.1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.88));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.92);
    dirLight.position.set(4, 7, 5);
    scene.add(dirLight);

    // 110.0 Reference Trap Cage Plane
    const trapGeo = new THREE.PlaneGeometry(7.2, 2.4);
    const trapMesh = new THREE.Mesh(
      trapGeo,
      new THREE.MeshBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.14, side: THREE.DoubleSide }),
    );
    trapMesh.rotation.x = Math.PI / 2;
    trapMesh.position.y = 0.55;
    scene.add(trapMesh);
    const trapEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(trapGeo),
      new THREE.LineBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.75 }),
    );
    trapEdges.rotation.x = Math.PI / 2;
    trapEdges.position.y = 0.55;
    scene.add(trapEdges);

    // Rejection Block 110-111 Body Zone
    const bodyGeo = new THREE.BoxGeometry(1.3, 0.45, 1.3);
    const bodyMesh = new THREE.Mesh(
      bodyGeo,
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.35 }),
    );
    bodyMesh.position.set(-0.75, 0.8, 0);
    scene.add(bodyMesh);

    const barGroup = new THREE.Group();
    scene.add(barGroup);

    const probe = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 18, 18),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, emissive: 0x9f1239, emissiveIntensity: 0.35 }),
    );
    scene.add(probe);

    const buildBars = (b: SoupBranch) => {
      while (barGroup.children.length) barGroup.remove(barGroup.children[0]);
      const ys = branchConfig[b].pathY;
      ys.forEach((yVal, i) => {
        const prev = i > 0 ? ys[i - 1] : yVal - 0.12;
        const h = Math.max(0.2, Math.abs(yVal - prev) + 0.12);
        const bull = yVal >= prev;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, h, 0.32),
          new THREE.MeshStandardMaterial({ color: bull ? 0x10b981 : 0xe11d48, roughness: 0.35 }),
        );
        box.position.set(-3.0 + i * 0.75, (yVal + prev) / 2, 0);
        barGroup.add(box);
      });
      (probe.material as THREE.MeshStandardMaterial).color.setHex(branchConfig[b].lineColor);
    };

    let lastBranch: SoupBranch = branchRef.current;
    buildBars(lastBranch);

    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (branchRef.current !== lastBranch) {
        lastBranch = branchRef.current;
        buildBars(lastBranch);
      }

      if (playingRef.current) {
        const next = progRef.current + dt * 0.25;
        const wrapped = next >= 1 ? 0 : next;
        progRef.current = wrapped;
        setProgress(wrapped);
      }

      const ys = branchConfig[lastBranch].pathY;
      const exactIdx = progRef.current * (ys.length - 1);
      const lo = Math.floor(exactIdx);
      const hi = Math.min(ys.length - 1, lo + 1);
      const frac = exactIdx - lo;
      const py = ys[lo] * (1 - frac) + ys[hi] * frac;
      probe.position.set(-3.0 + exactIdx * 0.75, py, 0.32);

      const targetCam =
        camRef.current === 'ruler'
          ? new THREE.Vector3(0, 0.25, 7.6)
          : new THREE.Vector3(4.8, 2.4, 6.6);
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

  const active = branchConfig[branch];

  return (
    <figure className="ts-figure" data-ts-figure="ts-3d-trap">
      <div className="ts-figure-head">
        <span className="ts-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('3D Rejection-Wick & Trap Cage')}</span>
        </span>
        <span className="ts-badge">{active.badge}</span>
      </div>

      <div className="ts-controls-row" role="group" aria-label={t('3D Rejection-Wick & Trap Cage')}>
        {(Object.keys(branchConfig) as SoupBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`ts-btn ${branch === key ? 'is-active' : ''}`}
            onClick={() => {
              setBranch(key);
              setProgress(0.75);
            }}
          >
            {t(branchConfig[key].label)}
          </button>
        ))}
        <button
          type="button"
          className="ts-btn"
          onClick={() => setCameraMode((m) => (m === 'trap' ? 'ruler' : 'trap'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'trap' ? t('Straight-On Ruler') : t('3D Trap View')}</span>
        </button>
        <button type="button" className="ts-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button
          type="button"
          className="ts-btn"
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
        <svg viewBox="0 0 720 240" className="ts-svg" role="img" aria-label={t('3D Rejection-Wick & Trap Cage')}>
          <rect x="14" y="14" width="692" height="212" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <line x1="40" y1="88" x2="680" y2="88" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="6 4" />
          <text x="48" y="80" fontSize="11.5" fontWeight="700" fill="#e11d48">110.0 Reference Trap Line</text>
          <rect x="230" y="64" width="120" height="24" rx="4" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" />
          <text x="242" y="80" fontSize="10.5" fontWeight="700" fill="#0ea5e9">Body 110–111 (Mid 110.5)</text>
          <path d="M80 130 L170 105 L285 38 L370 180 L470 76 L610 190" fill="none" stroke="#e11d48" strokeWidth="3" />
          <circle cx="285" cy="38" r="5.5" fill="#e11d48" />
          <text x="296" y="42" fontSize="10.5" fontWeight="700" fill="#e11d48">112.0 Wick Sweep</text>
        </svg>
      ) : (
        <div ref={mountRef} className="ts-canvas-host" />
      )}

      <figcaption className="ts-caption">
        {active.summary} — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
