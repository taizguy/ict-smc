import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { BreakerSceneScenario } from './breakerBlockMath';

export type BreakerCameraMode = 'iso' | 'ruler';

export interface BreakerSceneOverlayLabels {
  breakerTag: string;
  fvgTag?: string;
  sweepTag: string;
  mssTag: string;
}

export interface BreakerSceneRendererOptions {
  container: HTMLElement;
  overlay?: HTMLElement | null;
  scenario: BreakerSceneScenario;
  stepIndex: number;
  cameraMode: BreakerCameraMode;
  dark: boolean;
  reducedMotion: boolean;
  labels?: BreakerSceneOverlayLabels;
}

export function detectHardwareWebGL(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      if (/SwiftShader|llvmpipe|Software|Basic Render Driver/i.test(renderer)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

interface ProjectedTagSpec {
  id: string;
  text: string;
  tone: 'cobalt' | 'rose' | 'amber' | 'emerald';
  worldY: number;
  visible: boolean;
}

interface ProjectedTickSpec {
  text: string;
  worldY: number;
}

const _proj = new THREE.Vector3();

export class BreakerBlockSceneRenderer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private pmrem: THREE.PMREMGenerator;
  private envRT: THREE.WebGLRenderTarget;
  private rootGroup: THREE.Group;
  private overlay: HTMLElement | null;
  private zoneMesh: THREE.Mesh | null = null;
  private fvgMesh: THREE.Mesh | null = null;
  private rafId = 0;
  private disposed = false;
  private clock = new THREE.Clock();
  private targetPos = new THREE.Vector3(3.8, 1.9, 11.4);
  private targetLook = new THREE.Vector3(0.25, 0, 0);
  private currentLook = new THREE.Vector3(0.25, 0, 0);
  private reducedMotion = false;
  private dark = false;
  private resizeObserver: ResizeObserver | null = null;
  private tagElements = new Map<string, HTMLSpanElement>();
  private tickElements: HTMLSpanElement[] = [];
  private activeTags: ProjectedTagSpec[] = [];
  private activeTicks: ProjectedTickSpec[] = [];
  private startX = -3.5;

  constructor(private opts: BreakerSceneRendererOptions) {
    this.reducedMotion = opts.reducedMotion;
    this.dark = opts.dark;
    this.overlay = opts.overlay ?? null;

    const width = Math.max(320, opts.container.clientWidth || 720);
    const height = Math.max(260, opts.container.clientHeight || 360);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';
    opts.container.innerHTML = '';
    opts.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(opts.dark ? 0x0b1220 : 0xf1f5f9);
    this.camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    this.camera.position.set(3.8, 1.9, 11.4);

    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envRT = this.pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.envRT.texture;

    const hemi = new THREE.HemisphereLight(0xf8fafc, 0x334155, 0.95);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.45);
    key.position.set(6, 9, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x60a5fa, 0.72);
    rim.position.set(-7, 4, -5);
    this.scene.add(rim);

    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    this.initOverlayElements();
    this.updateScene(opts.scenario, opts.stepIndex, opts.cameraMode, opts.dark, opts.reducedMotion, opts.labels);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(opts.container);
    }

    this.animate();
  }

  private initOverlayElements(): void {
    if (!this.overlay) return;
    this.overlay.replaceChildren();
    this.tagElements.clear();
    this.tickElements = [];

    for (const id of ['breaker', 'fvg', 'sweep', 'mss']) {
      const span = document.createElement('span');
      span.className = 'bb-world-pill';
      span.hidden = true;
      this.overlay.appendChild(span);
      this.tagElements.set(id, span);
    }

    for (let i = 0; i < 6; i++) {
      const tick = document.createElement('span');
      tick.className = 'bb-world-tick';
      tick.hidden = true;
      this.overlay.appendChild(tick);
      this.tickElements.push(tick);
    }
  }

  private projectWorldYToScreenY(worldX: number, worldY: number, worldZ: number, height: number): number {
    _proj.set(worldX, worldY, worldZ).project(this.camera);
    return ((-_proj.y + 1) * height) / 2;
  }

  private updateOverlayPositions(): void {
    if (!this.overlay) return;
    const width = this.opts.container.clientWidth;
    const height = this.opts.container.clientHeight;
    if (width <= 0 || height <= 0) return;

    this.camera.updateMatrixWorld();

    const placedTickYs: number[] = [];
    this.tickElements.forEach((el, idx) => {
      const spec = this.activeTicks[idx];
      if (!spec) {
        el.hidden = true;
        return;
      }
      const rawY = this.projectWorldYToScreenY(this.startX - 0.85, spec.worldY, -0.4, height);
      const clampedY = Math.max(14, Math.min(height - 14, rawY));
      if (placedTickYs.some((y) => Math.abs(y - clampedY) < 22)) {
        el.hidden = true;
        return;
      }
      placedTickYs.push(clampedY);
      el.hidden = false;
      el.textContent = spec.text;
      el.style.transform = `translate3d(0, ${Math.round(clampedY)}px, 0) translateY(-50%)`;
    });

    const visibleTags = this.activeTags
      .filter((item) => item.visible)
      .map((item) => ({
        ...item,
        screenY: Math.max(
          18,
          Math.min(height - 18, this.projectWorldYToScreenY(-this.startX + 0.4, item.worldY, 0.3, height)),
        ),
      }))
      .sort((a, b) => a.screenY - b.screenY);

    const minGap = 28;
    for (let i = 1; i < visibleTags.length; i++) {
      if (visibleTags[i].screenY - visibleTags[i - 1].screenY < minGap) {
        visibleTags[i].screenY = visibleTags[i - 1].screenY + minGap;
      }
    }
    if (visibleTags.length > 0 && visibleTags[visibleTags.length - 1].screenY > height - 16) {
      const overflow = visibleTags[visibleTags.length - 1].screenY - (height - 16);
      for (let i = visibleTags.length - 1; i >= 0; i--) {
        visibleTags[i].screenY = Math.max(16 + i * minGap, visibleTags[i].screenY - overflow);
      }
    }

    const activeIds = new Set(visibleTags.map((v) => v.id));
    for (const [id, el] of this.tagElements.entries()) {
      if (!activeIds.has(id)) el.hidden = true;
    }
    for (const tag of visibleTags) {
      const el = this.tagElements.get(tag.id);
      if (!el) continue;
      el.hidden = false;
      el.className = `bb-world-pill tone-${tag.tone}`;
      el.textContent = tag.text;
      el.style.left = 'auto';
      el.style.right = '10px';
      el.style.transform = `translate3d(0, ${Math.round(tag.screenY)}px, 0) translateY(-50%)`;
    }
  }

  public handleResize(): void {
    if (this.disposed) return;
    const width = Math.max(320, this.opts.container.clientWidth || 720);
    const height = Math.max(260, this.opts.container.clientHeight || 360);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.renderer.render(this.scene, this.camera);
    this.updateOverlayPositions();
  }

  private clearGroup(): void {
    while (this.rootGroup.children.length > 0) {
      const child = this.rootGroup.children.pop()!;
      child.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => m.dispose());
        }
      });
    }
    this.zoneMesh = null;
    this.fvgMesh = null;
  }

  public updateScene(
    scenario: BreakerSceneScenario,
    stepIndex: number,
    cameraMode: BreakerCameraMode,
    dark: boolean,
    reducedMotion: boolean,
    labels?: BreakerSceneOverlayLabels,
  ): void {
    this.dark = dark;
    this.reducedMotion = reducedMotion;
    this.scene.background = new THREE.Color(dark ? 0x0b1220 : 0xf1f5f9);
    this.clearGroup();

    const step = scenario.steps[Math.min(stepIndex, scenario.steps.length - 1)] || scenario.steps[0];
    const total = scenario.candles.length;
    const spacing = 0.78;
    const startX = -((total - 1) * spacing) / 2;
    this.startX = startX;

    const priceSpan = Math.max(1, scenario.priceMax - scenario.priceMin);
    const mapY = (price: number) => ((price - scenario.priceMin) / priceSpan - 0.5) * 4.2;

    // Architectural studio plinth
    const floorGeo = new THREE.BoxGeometry(total * spacing + 2.6, 0.14, 3.2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: dark ? 0x1e293b : 0xe2e8f0,
      roughness: 0.72,
      metalness: 0.12,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -2.38, 0);
    floor.receiveShadow = true;
    this.rootGroup.add(floor);

    // Blueprint horizontal grid + price ruler ticks
    const gridMat = new THREE.LineBasicMaterial({
      color: dark ? 0x334155 : 0xcbd5e1,
      transparent: true,
      opacity: cameraMode === 'ruler' ? 0.9 : 0.65,
    });
    const nextTicks: ProjectedTickSpec[] = [];
    for (let i = 0; i <= 4; i++) {
      const frac = i / 4;
      const priceVal = scenario.priceMin + frac * priceSpan;
      const y = mapY(priceVal);
      const pts = [new THREE.Vector3(startX - 0.9, y, -0.85), new THREE.Vector3(-startX + 0.9, y, -0.85)];
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat);
      this.rootGroup.add(line);
      nextTicks.push({ text: priceVal.toFixed(0), worldY: y });
    }
    this.activeTicks = nextTicks;

    const nextTags: ProjectedTagSpec[] = [];

    // Breaker Block slab
    if (step.highlightZone) {
      const zLowY = mapY(scenario.zoneLow);
      const zHighY = mapY(scenario.zoneHigh);
      const zHeight = Math.max(0.16, zHighY - zLowY);
      const zWidth = total * spacing + 0.9;
      const zoneColor =
        scenario.direction === 'bullish'
          ? 0x2563eb
          : scenario.direction === 'bearish'
            ? 0xe11d48
            : 0xd97706;
      const zoneGeo = new THREE.BoxGeometry(zWidth, zHeight, 1.35);
      const zoneMat = new THREE.MeshPhysicalMaterial({
        color: zoneColor,
        transparent: true,
        opacity: dark ? 0.28 : 0.22,
        roughness: 0.24,
        metalness: 0.1,
      });
      this.zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
      this.zoneMesh.position.set(0.15, (zLowY + zHighY) / 2, -0.05);
      this.rootGroup.add(this.zoneMesh);

      // 50% Mean Threshold hairline
      const midY = mapY(scenario.zoneMid);
      const midPts = [new THREE.Vector3(startX - 0.3, midY, 0.68), new THREE.Vector3(-startX + 0.6, midY, 0.68)];
      const midMat = new THREE.LineBasicMaterial({ color: 0xf59e0b });
      this.rootGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(midPts), midMat));

      nextTags.push({
        id: 'breaker',
        text: labels?.breakerTag ?? `Breaker ${scenario.zoneLow}–${scenario.zoneHigh}`,
        tone:
          scenario.direction === 'bullish'
            ? 'cobalt'
            : scenario.direction === 'bearish'
              ? 'rose'
              : 'amber',
        worldY: (zLowY + zHighY) / 2,
        visible: true,
      });
    }

    // Optional FVG slab (Amber Unicorn intersection)
    if (step.highlightFvg && scenario.fvgLow !== undefined && scenario.fvgHigh !== undefined) {
      const fLowY = mapY(scenario.fvgLow);
      const fHighY = mapY(scenario.fvgHigh);
      const fHeight = Math.max(0.14, fHighY - fLowY);
      const fWidth = (total - 3.5) * spacing;
      const fGeo = new THREE.BoxGeometry(fWidth, fHeight, 1.05);
      const fMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: dark ? 0.36 : 0.3,
        roughness: 0.2,
        metalness: 0.18,
      });
      this.fvgMesh = new THREE.Mesh(fGeo, fMat);
      this.fvgMesh.position.set(1.15, (fLowY + fHighY) / 2, 0.12);
      this.rootGroup.add(this.fvgMesh);

      nextTags.push({
        id: 'fvg',
        text: labels?.fvgTag ?? `FVG ${scenario.fvgLow}–${scenario.fvgHigh}`,
        tone: 'amber',
        worldY: (fLowY + fHighY) / 2,
        visible: true,
      });
    }

    // Sweep Line (Point A)
    if (step.showSweepLine) {
      const sy = mapY(scenario.sweepLevel);
      const sPts = [new THREE.Vector3(startX - 0.4, sy, 0.55), new THREE.Vector3(-startX + 0.5, sy, 0.55)];
      const sMat = new THREE.LineBasicMaterial({ color: 0x059669 });
      this.rootGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sPts), sMat));

      nextTags.push({
        id: 'sweep',
        text: labels?.sweepTag ?? scenario.sweepLabel,
        tone: 'emerald',
        worldY: sy,
        visible: true,
      });
    }

    // MSS Line (Point B)
    if (step.showMssLine) {
      const my = mapY(scenario.mssLevel);
      const mPts = [new THREE.Vector3(startX - 0.4, my, 0.58), new THREE.Vector3(-startX + 0.5, my, 0.58)];
      const mMat = new THREE.LineBasicMaterial({ color: 0x1d4ed8 });
      this.rootGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(mPts), mMat));

      nextTags.push({
        id: 'mss',
        text: labels?.mssTag ?? scenario.mssLabel,
        tone: 'cobalt',
        worldY: my,
        visible: true,
      });
    }

    this.activeTags = nextTags;

    // Physical 3D Candles
    const bullBodyColor = dark ? 0x3b82f6 : 0x1d4ed8;
    const bearBodyColor = dark ? 0xf43f5e : 0xbe123c;
    const originAccent = 0xd97706;
    const wickColor = dark ? 0x94a3b8 : 0x475569;

    const visibleCandles = scenario.candles.slice(0, step.visibleCount);
    for (const candle of visibleCandles) {
      const x = startX + candle.index * spacing;
      const isBull = candle.close >= candle.open;
      const bodyBottom = mapY(Math.min(candle.open, candle.close));
      const bodyTop = mapY(Math.max(candle.open, candle.close));
      const bodyHeight = Math.max(0.1, bodyTop - bodyBottom);
      const lowY = mapY(candle.low);
      const highY = mapY(candle.high);
      const wickHeight = Math.max(0.08, highY - lowY);

      const isOrigin = candle.role === 'origin-b';
      const bodyColor = isOrigin ? originAccent : isBull ? bullBodyColor : bearBodyColor;

      const bodyGeo = new THREE.BoxGeometry(0.42, bodyHeight, 0.42);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: isOrigin ? 0.28 : 0.36,
        metalness: isOrigin ? 0.35 : 0.18,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.set(x, (bodyBottom + bodyTop) / 2, 0);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      this.rootGroup.add(bodyMesh);

      const wickGeo = new THREE.CylinderGeometry(0.038, 0.038, wickHeight, 10);
      const wickMat = new THREE.MeshStandardMaterial({
        color: wickColor,
        roughness: 0.45,
        metalness: 0.4,
      });
      const wickMesh = new THREE.Mesh(wickGeo, wickMat);
      wickMesh.position.set(x, (lowY + highY) / 2, 0);
      this.rootGroup.add(wickMesh);
    }

    if (cameraMode === 'ruler') {
      this.targetPos.set(0.35, 0.1, 11.8);
      this.targetLook.set(0.35, 0, 0);
    } else {
      this.targetPos.set(3.8, 1.9, 11.4);
      this.targetLook.set(0.35, -0.05, 0);
    }

    if (reducedMotion) {
      this.camera.position.copy(this.targetPos);
      this.currentLook.copy(this.targetLook);
      this.camera.lookAt(this.currentLook);
    }
    this.renderer.render(this.scene, this.camera);
    this.updateOverlayPositions();
  }

  private animate = (): void => {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this.animate);
    const dt = Math.min(0.05, this.clock.getDelta());

    if (!this.reducedMotion) {
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.targetPos.x, 5.5, dt);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetPos.y, 5.5, dt);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.targetPos.z, 5.5, dt);

      this.currentLook.x = THREE.MathUtils.damp(this.currentLook.x, this.targetLook.x, 5.5, dt);
      this.currentLook.y = THREE.MathUtils.damp(this.currentLook.y, this.targetLook.y, 5.5, dt);
      this.currentLook.z = THREE.MathUtils.damp(this.currentLook.z, this.targetLook.z, 5.5, dt);
      this.camera.lookAt(this.currentLook);

      if (this.zoneMesh) {
        const pulse = 0.025 * Math.sin(this.clock.elapsedTime * 1.8);
        const mat = this.zoneMesh.material as THREE.MeshPhysicalMaterial;
        mat.opacity = (this.dark ? 0.28 : 0.22) + pulse;
      }
      if (this.fvgMesh) {
        const pulse = 0.03 * Math.cos(this.clock.elapsedTime * 2.1);
        const mat = this.fvgMesh.material as THREE.MeshPhysicalMaterial;
        mat.opacity = (this.dark ? 0.36 : 0.3) + pulse;
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.updateOverlayPositions();
  };

  public dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.clearGroup();
    if (this.overlay) this.overlay.replaceChildren();
    this.envRT.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }
}
