import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { PdSyntheticBar } from './pdArrayMath';

export type PdCinemaScenario = 'bullish' | 'bearish' | 'continuum' | 'failure';

interface ScenarioSpec {
  bars: PdSyntheticBar[];
  low: number;
  high: number;
  zoneLow: number;
  zoneHigh: number;
  zoneLabel: string;
  isBullishZone: boolean;
}

export interface PdSceneController {
  setScenario: (scenario: PdCinemaScenario) => void;
  setVisibleCount: (count: number) => void;
  setCameraMode: (straightOn: boolean) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

export function canUseHardwareWebGL(): boolean {
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

export function createPdArrayScene(
  container: HTMLElement,
  specs: Record<PdCinemaScenario, ScenarioSpec>,
  initialScenario: PdCinemaScenario,
  initialCount: number,
): PdSceneController | null {
  if (!canUseHardwareWebGL()) return null;

  const width = Math.max(320, container.clientWidth || 680);
  const height = Math.max(240, container.clientHeight || 340);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  const targetPos = new THREE.Vector3(0, 0, 0);
  const isoCam = new THREE.Vector3(4.8, 2.2, 10.6);
  const frontCam = new THREE.Vector3(0, 0.15, 11.4);
  let desiredCam = isoCam.clone();
  camera.position.copy(isoCam);
  camera.lookAt(targetPos);

  const hemi = new THREE.HemisphereLight(0xfefcf8, 0x1e293b, 0.9);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xfff7ed, 1.35);
  key.position.set(6, 9, 8);
  scene.add(key);

  const root = new THREE.Group();
  scene.add(root);

  let currentScenario = initialScenario;
  let currentCount = initialCount;
  let disposed = false;
  let rafId = 0;

  const rebuild = () => {
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

    const spec = specs[currentScenario];
    const span = Math.max(0.0001, spec.high - spec.low);
    const mapY = (price: number) => ((price - spec.low) / span - 0.5) * 4.2;

    // 50% Equilibrium plane (Indigo ledger shelf)
    const eqGeo = new THREE.BoxGeometry(8.8, 0.035, 1.8);
    const eqMat = new THREE.MeshStandardMaterial({
      color: 0x4338ca,
      metalness: 0.35,
      roughness: 0.25,
      emissive: 0x312e81,
      emissiveIntensity: 0.35,
    });
    const eqMesh = new THREE.Mesh(eqGeo, eqMat);
    eqMesh.position.set(0, 0, -0.1);
    root.add(eqMesh);

    // Premium (>50%) Amber translucent slab
    const premGeo = new THREE.BoxGeometry(8.6, 2.05, 0.22);
    const premMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.14,
      roughness: 0.25,
      metalness: 0.05,
    });
    const premMesh = new THREE.Mesh(premGeo, premMat);
    premMesh.position.set(0, 1.05, -0.55);
    root.add(premMesh);

    // Discount (<50%) Emerald translucent slab
    const discGeo = new THREE.BoxGeometry(8.6, 2.05, 0.22);
    const discMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f766e,
      transparent: true,
      opacity: 0.14,
      roughness: 0.25,
      metalness: 0.05,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.position.set(0, -1.05, -0.55);
    root.add(discMesh);

    // Active PD Array Focus Ribbon inside range
    const zTop = mapY(spec.zoneHigh);
    const zBot = mapY(spec.zoneLow);
    const zH = Math.max(0.18, Math.abs(zTop - zBot));
    const zoneGeo = new THREE.BoxGeometry(8.6, zH, 1.15);
    const zoneMat = new THREE.MeshPhysicalMaterial({
      color: spec.isBullishZone ? 0x10b981 : 0xf59e0b,
      transparent: true,
      opacity: 0.24,
      roughness: 0.2,
      emissive: spec.isBullishZone ? 0x047857 : 0xb45309,
      emissiveIntensity: 0.25,
    });
    const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
    zoneMesh.position.set(0, (zTop + zBot) / 2, -0.15);
    root.add(zoneMesh);

    // Subtle 25% & 75% quadrant guide bars
    for (const yVal of [1.05, -1.05]) {
      const qGeo = new THREE.BoxGeometry(8.6, 0.018, 0.9);
      const qMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.4 });
      const qMesh = new THREE.Mesh(qGeo, qMat);
      qMesh.position.set(0, yVal, -0.3);
      root.add(qMesh);
    }

    // Physical 3D Candlesticks
    const shown = spec.bars.slice(0, Math.max(1, Math.min(currentCount, spec.bars.length)));
    const total = spec.bars.length;
    const stepX = 7.4 / Math.max(1, total - 1);

    const bullMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.28, metalness: 0.12 });
    const bearMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.32, metalness: 0.12 });
    const failMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.28, metalness: 0.15 });
    const wickMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.2 });

    shown.forEach((bar, i) => {
      const x = -3.7 + i * stepX;
      const up = bar.close >= bar.open;
      const yOpen = mapY(bar.open);
      const yClose = mapY(bar.close);
      const yHigh = mapY(bar.high);
      const yLow = mapY(bar.low);
      const bodyH = Math.max(0.08, Math.abs(yClose - yOpen));
      const wickH = Math.max(0.12, yHigh - yLow);

      const isFailureEnd = currentScenario === 'failure' && i >= shown.length - 2 && bar.close < spec.low;
      const mat = isFailureEnd ? failMat : up ? bullMat : bearMat;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.46, bodyH, 0.46), mat);
      body.position.set(x, (yOpen + yClose) / 2, 0.12);
      root.add(body);

      const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, wickH, 10), wickMat);
      wick.position.set(x, (yHigh + yLow) / 2, 0.12);
      root.add(wick);
    });
  };

  rebuild();

  const tick = (t: number) => {
    if (disposed) return;
    camera.position.lerp(desiredCam, 0.09);
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      desiredCam.equals(frontCam) ? 0 : Math.sin(t * 0.00045) * 0.07,
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
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
