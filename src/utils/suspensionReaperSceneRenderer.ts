import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { SrSyntheticBar } from './suspensionReaperMath';

export type SrCinemaScenario =
  | 'bullish-suspension'
  | 'bearish-suspension'
  | 'reaper-breaker'
  | 'contract-failure';

export interface SrScenarioSpec {
  title: string;
  bars: SrSyntheticBar[];
  low: number;
  high: number;
  primaryBandLow: number;
  primaryBandHigh: number;
  secondaryBandLow?: number;
  secondaryBandHigh?: number;
  coreLow?: number;
  coreHigh?: number;
  bandSummary: string;
  mode: 'suspension-bull' | 'suspension-bear' | 'reaper-bear' | 'failure';
}

export interface SrSceneController {
  setScenario: (scenario: SrCinemaScenario) => void;
  setVisibleCount: (count: number) => void;
  setCameraMode: (straightOn: boolean) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

export function canUseSrHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (dbg) {
      const renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
      if (/swiftshader|llvmpipe|software/.test(renderer)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function createSuspensionReaperScene(
  container: HTMLElement,
  specs: Record<SrCinemaScenario, SrScenarioSpec>,
  initialScenario: SrCinemaScenario,
  initialCount: number,
): SrSceneController | null {
  if (!canUseSrHardwareWebGL()) return null;

  const width = Math.max(320, container.clientWidth || 680);
  const height = Math.max(250, container.clientHeight || 340);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  const targetPos = new THREE.Vector3(0, 0, 0);
  const isoCam = new THREE.Vector3(4.6, 2.35, 10.8);
  const frontCam = new THREE.Vector3(0, 0.1, 11.4);
  let desiredCam = isoCam.clone();
  camera.position.copy(isoCam);
  camera.lookAt(targetPos);

  const hemi = new THREE.HemisphereLight(0xfff1f2, 0x0f172a, 0.92);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xfff7ed, 1.35);
  key.position.set(5, 8, 9);
  scene.add(key);

  const root = new THREE.Group();
  scene.add(root);

  let currentScenario = initialScenario;
  let currentCount = initialCount;
  let disposed = false;
  let rafId = 0;

  const addSlab = (
    yLow: number,
    yHigh: number,
    colorHex: number,
    emissiveHex: number,
    opacity: number,
    depth: number,
    zPos: number,
  ) => {
    const h = Math.max(0.1, Math.abs(yHigh - yLow));
    const geo = new THREE.BoxGeometry(8.5, h, depth);
    const mat = new THREE.MeshPhysicalMaterial({
      color: colorHex,
      emissive: emissiveHex,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity,
      roughness: 0.2,
      metalness: 0.08,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, (yLow + yHigh) / 2, zPos);
    root.add(mesh);
  };

  const clearRoot = () => {
    while (root.children.length > 0) {
      const child = root.children[0];
      root.remove(child);
      child.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
    }
  };

  const rebuild = () => {
    clearRoot();

    const spec = specs[currentScenario];
    const span = Math.max(0.0001, spec.high - spec.low);
    const mapY = (price: number) => ((price - spec.low) / span - 0.5) * 4.1;

    // Base ledger plinth
    const floorGeo = new THREE.BoxGeometry(9.0, 0.05, 2.2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.45,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -2.28, 0);
    root.add(floorMesh);

    if (spec.mode === 'reaper-bear') {
      // Bullish IFVG slab (crimson-tinted inverted gap)
      addSlab(
        mapY(spec.primaryBandLow),
        mapY(spec.primaryBandHigh),
        0x9f1239,
        0x881337,
        0.22,
        1.25,
        -0.32,
      );
      // Opposing Bearish FVG slab (copper)
      if (spec.secondaryBandLow !== undefined && spec.secondaryBandHigh !== undefined) {
        addSlab(
          mapY(spec.secondaryBandLow),
          mapY(spec.secondaryBandHigh),
          0xb45309,
          0x92400e,
          0.24,
          1.05,
          -0.1,
        );
      }
      // Nested Reaper Intersection Prism
      if (spec.coreLow !== undefined && spec.coreHigh !== undefined) {
        addSlab(
          mapY(spec.coreLow),
          mapY(spec.coreHigh),
          0xf43f5e,
          0x9f1239,
          0.42,
          0.7,
          0.08,
        );
      }
    } else {
      const isBull = spec.mode === 'suspension-bull';
      const viColor = isBull ? 0x047857 : spec.mode === 'failure' ? 0xd97706 : 0x9f1239;
      const viEmissive = isBull ? 0x065f46 : spec.mode === 'failure' ? 0x92400e : 0x881337;
      // Lower & Upper Volume Imbalance glass slabs
      addSlab(
        mapY(spec.primaryBandLow),
        mapY(spec.primaryBandHigh),
        viColor,
        viEmissive,
        0.3,
        1.2,
        -0.24,
      );
      if (spec.secondaryBandLow !== undefined && spec.secondaryBandHigh !== undefined) {
        addSlab(
          mapY(spec.secondaryBandLow),
          mapY(spec.secondaryBandHigh),
          viColor,
          viEmissive,
          0.3,
          1.2,
          -0.24,
        );
      }
      // Suspended Core Shelf around C2 Body
      if (spec.coreLow !== undefined && spec.coreHigh !== undefined) {
        addSlab(
          mapY(spec.coreLow),
          mapY(spec.coreHigh),
          0x64748b,
          0x334155,
          0.18,
          0.85,
          -0.12,
        );
      }
    }

    const shown = spec.bars.slice(0, Math.max(1, Math.min(currentCount, spec.bars.length)));
    const stepX = 7.4 / Math.max(1, spec.bars.length - 1);

    const bullMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.25, metalness: 0.14 });
    const bearMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.28, metalness: 0.14 });
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.28,
      emissive: 0x92400e,
      emissiveIntensity: 0.22,
    });
    const wickMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.35, metalness: 0.35 });

    shown.forEach((bar, i) => {
      const x = -3.7 + i * stepX;
      const up = bar.close >= bar.open;
      const yOpen = mapY(bar.open);
      const yClose = mapY(bar.close);
      const yHigh = mapY(bar.high);
      const yLow = mapY(bar.low);
      const bodyH = Math.max(0.08, Math.abs(yClose - yOpen));
      const wickH = Math.max(0.12, yHigh - yLow);

      const isSuspendedCore = spec.mode !== 'reaper-bear' && i === 1;
      const isReaperRetest = spec.mode === 'reaper-bear' && i === 5;
      const mat = isSuspendedCore || isReaperRetest ? coreMat : up ? bullMat : bearMat;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.46, bodyH, 0.46), mat);
      body.position.set(x, (yOpen + yClose) / 2, 0.18);
      root.add(body);

      const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, wickH, 10), wickMat);
      wick.position.set(x, (yHigh + yLow) / 2, 0.18);
      root.add(wick);
    });
  };

  rebuild();

  const tick = (t: number) => {
    if (disposed) return;
    camera.position.lerp(desiredCam, 0.09);
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      desiredCam.equals(frontCam) ? 0 : Math.sin(t * 0.00045) * 0.065,
      0.06,
    );
    camera.lookAt(targetPos);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return {
    setScenario(scenario) {
      currentScenario = scenario;
      rebuild();
    },
    setVisibleCount(count) {
      currentCount = count;
      rebuild();
    },
    setCameraMode(straightOn) {
      desiredCam = straightOn ? frontCam.clone() : isoCam.clone();
    },
    resize(w, h) {
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearRoot();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
