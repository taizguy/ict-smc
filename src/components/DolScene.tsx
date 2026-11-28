import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Pause, Play, RotateCcw, Target } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type DolBranch = 'erl-pull' | 'irl-rebalance' | 'conflict';
type CameraMode = 'field' | 'topdown';

const branchConfig: Record<
  DolBranch,
  {
    label: string;
    badge: string;
    summary: string;
    targetPos: [number, number, number];
    beaconColor: number;
    needleAngle: number;
  }
> = {
  'erl-pull': {
    label: 'ERL Pull (IRL → EQH)',
    badge: 'Active Target: External EQH',
    summary: 'Price bounces from a 4H Discount FVG with displacement; the magnetic compass locks onto External Equal Highs.',
    targetPos: [2.4, 1.5, -0.8],
    beaconColor: 0x10b981,
    needleAngle: 0.42,
  },
  'irl-rebalance': {
    label: 'IRL Rebalance (Sweep → FVG)',
    badge: 'Active Target: Internal 4H FVG',
    summary: 'After sweeping External PDH, the pull shifts inward toward the unmitigated 4H Discount Fair Value Gap.',
    targetPos: [-2.1, -0.9, 0.7],
    beaconColor: 0x8b5cf6,
    needleAngle: -2.45,
  },
  conflict: {
    label: 'Conflicting Targets (Wait)',
    badge: 'Split Pull: No Clear Leader',
    summary: 'Weekly Bearish OB and 4H Bullish EQH pull in opposite directions—wait for displacement to resolve.',
    targetPos: [0, 0.2, 0],
    beaconColor: 0xf59e0b,
    needleAngle: 1.57,
  },
};

export function DolScene({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [branch, setBranch] = useState<DolBranch>('erl-pull');
  const [cameraMode, setCameraMode] = useState<CameraMode>('field');
  const [playing, setPlaying] = useState(false);
  const [pulse, setPulse] = useState(0);

  const branchRef = useRef(branch);
  const cameraModeRef = useRef(cameraMode);
  const playingRef = useRef(playing);
  const pulseRef = useRef(pulse);

  branchRef.current = branch;
  cameraModeRef.current = cameraMode;
  playingRef.current = playing;
  pulseRef.current = pulse;

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
    camera.position.set(0, 4.4, 6.4);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(4, 7, 5);
    scene.add(dirLight);

    // Compass ring base
    const ringGeo = new THREE.RingGeometry(2.1, 2.24, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x64748b, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // ERL Beacon (Green pillar) and IRL Beacon (Violet pillar)
    const erlBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.34, 1.8, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.35 }),
    );
    erlBeacon.position.set(2.4, 0.9, -0.8);
    scene.add(erlBeacon);

    const irlBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.32, 1.2, 20),
      new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.35 }),
    );
    irlBeacon.position.set(-2.1, 0.6, 0.7);
    scene.add(irlBeacon);

    // Central Compass Needle Group
    const needleGroup = new THREE.Group();
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 1.55, 16),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.4 }),
    );
    cone.rotation.z = -Math.PI / 2;
    cone.position.x = 0.85;
    needleGroup.add(cone);

    const hub = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 18, 18),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b }),
    );
    needleGroup.add(hub);
    needleGroup.position.y = 0.35;
    scene.add(needleGroup);

    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (playingRef.current) {
        const next = (pulseRef.current + dt * 2.2) % (Math.PI * 2);
        pulseRef.current = next;
        setPulse(next);
      }

      const cfg = branchConfig[branchRef.current];
      const wobble = branchRef.current === 'conflict' ? Math.sin(pulseRef.current * 2) * 0.65 : Math.sin(pulseRef.current) * 0.06;
      const targetAngle = cfg.needleAngle + wobble;
      needleGroup.rotation.y += (targetAngle - needleGroup.rotation.y) * 0.1;

      const scale = 1 + 0.08 * Math.sin(pulseRef.current * 2);
      if (branchRef.current === 'erl-pull') erlBeacon.scale.set(scale, 1, scale);
      else erlBeacon.scale.set(1, 1, 1);
      if (branchRef.current === 'irl-rebalance') irlBeacon.scale.set(scale, 1, scale);
      else irlBeacon.scale.set(1, 1, 1);

      const targetCam =
        cameraModeRef.current === 'topdown'
          ? new THREE.Vector3(0, 7.2, 0.2)
          : new THREE.Vector3(0, 4.4, 6.4);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(0, 0.3, 0);

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
    <figure className="dol-figure dol-3d-wrap" data-dol-figure="dol-3d-compass">
      <div className="dol-figure-head">
        <span className="dol-head-title">
          <Target size={16} aria-hidden="true" />
          <span>{t('3D Magnetic Target-Selection Field (IRL vs. ERL)')}</span>
        </span>
        <span className="dol-badge">{active.badge}</span>
      </div>

      <div className="dol-controls-row" role="group" aria-label={t('3D Magnetic Target-Selection Field (IRL vs. ERL)')}>
        {(Object.keys(branchConfig) as DolBranch[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`dol-btn ${branch === key ? 'is-active' : ''}`}
            onClick={() => setBranch(key)}
          >
            {t(branchConfig[key].label)}
          </button>
        ))}
        <button
          type="button"
          className="dol-btn"
          onClick={() => setCameraMode((m) => (m === 'field' ? 'topdown' : 'field'))}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{cameraMode === 'field' ? t('Top-Down Compass') : t('3D Field View')}</span>
        </button>
        <button type="button" className="dol-btn is-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? t('Pause') : t('Play')}</span>
        </button>
        <button
          type="button"
          className="dol-btn"
          onClick={() => {
            setPlaying(false);
            setPulse(0);
          }}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>{t('Reset')}</span>
        </button>
      </div>

      {staticOnly ? (
        <svg viewBox="0 0 720 250" className="dol-svg" role="img" aria-label={t('3D Magnetic Target-Selection Field (IRL vs. ERL)')}>
          <rect x="14" y="14" width="692" height="222" rx="10" fill="var(--dol-surface)" stroke="var(--dol-border)" />
          <circle cx="360" cy="125" r="78" fill="none" stroke="var(--dol-border)" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="170" cy="155" r="18" fill="#8b5cf6" opacity="0.25" stroke="#8b5cf6" strokeWidth="2" />
          <text x="118" y="192" fontSize="11.5" fontWeight="700" fill="#8b5cf6">IRL Target (4H FVG)</text>
          <circle cx="550" cy="82" r="22" fill="#10b981" opacity="0.25" stroke="#10b981" strokeWidth="2" />
          <text x="492" y="50" fontSize="11.5" fontWeight="700" fill="#10b981">ERL Target (EQH / PDH)</text>
          <line x1="360" y1="125" x2="526" y2="88" stroke="#0ea5e9" strokeWidth="4" />
          <circle cx="360" cy="125" r="8" fill="#f59e0b" />
        </svg>
      ) : (
        <div ref={mountRef} className="dol-canvas-host" />
      )}

      <figcaption className="dol-caption">
        {active.summary} — <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
