import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { getVenomSceneCandles, type VenomBranch } from './venomModelMath';

export type VenomCameraMode = 'cinema' | 'ruler';

export interface VenomSceneLabels {
  invalidation: string;
  venomOpen: string;
  rangeHigh: string;
  target: string;
  rangeLow: string;
}

export interface VenomSceneConfig {
  branch: VenomBranch;
  stepIndex: number;
  cameraMode: VenomCameraMode;
  darkTheme: boolean;
  reducedMotion: boolean;
  labels?: VenomSceneLabels;
}

const PRICE_MIN = 98;
const PRICE_MAX = 117.5;
const WORLD_Y_SPAN = 6.0;

function priceToY(price: number): number {
  return ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) - 0.5) * WORLD_Y_SPAN;
}

function indexToX(idx: number): number {
  return (idx - 4.5) * 0.88;
}

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();
const _proj = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

interface ProjectedTagSpec {
  id: string;
  text: string;
  tone: 'violet' | 'crimson' | 'amber' | 'teal';
  worldY: number;
  visible: boolean;
}

export class VenomSceneRenderer {
  private container: HTMLElement;
  private overlay: HTMLElement | null;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private dynamicGroup: THREE.Group;
  private envTex: THREE.Texture | null = null;
  private targetPos = new THREE.Vector3(0.4, 0.75, 11.9);
  private targetLook = new THREE.Vector3(0.15, 0, 0);
  private currentLook = new THREE.Vector3(0.15, 0, 0);
  private clock = new THREE.Clock();
  private rafId = 0;
  private isSoftwareGl = false;
  private disposed = false;
  private reducedMotion = false;
  private resizeObserver: ResizeObserver;
  private tagElements = new Map<string, HTMLSpanElement>();
  private tickElements = new Map<number, HTMLSpanElement>();
  private activeTags: ProjectedTagSpec[] = [];
  private activeRulerPrices: number[] = [];

  constructor(container: HTMLElement, overlay: HTMLElement | null = null) {
    this.container = container;
    this.overlay = overlay;
    this.isSoftwareGl = detectSoftwareWebGL();
    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 260);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    this.camera.position.copy(this.targetPos);
    this.camera.lookAt(this.currentLook);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height, false);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';

    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.envTex;
    pmrem.dispose();

    const hemi = new THREE.HemisphereLight(0xf5f3ff, 0x1e1b4b, 0.92);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfffbeb, 1.3);
    key.position.set(5.5, 8.5, 9.5);
    if (!this.isSoftwareGl) {
      key.castShadow = true;
      key.shadow.bias = -0.0005;
      key.shadow.normalBias = 0.02;
    }
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x8b5cf6, 0.55);
    rim.position.set(-7, 3, -6);
    this.scene.add(rim);

    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.dynamicGroup);

    this.initOverlayElements();

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);
  }

  private initOverlayElements(): void {
    if (!this.overlay) return;
    this.overlay.replaceChildren();
    this.tagElements.clear();
    this.tickElements.clear();

    for (const id of ['invalidation', 'venomOpen', 'rangeHigh', 'target', 'rangeLow']) {
      const span = document.createElement('span');
      span.className = 'vm-world-pill';
      span.hidden = true;
      this.overlay.appendChild(span);
      this.tagElements.set(id, span);
    }

    for (const price of [100, 104, 108, 110, 111, 114, 116]) {
      const tick = document.createElement('span');
      tick.className = 'vm-world-tick';
      if (price === 110 || price === 100) tick.classList.add('is-key-violet');
      else if (price === 111) tick.classList.add('is-key-amber');
      else if (price === 114) tick.classList.add('is-key-crimson');
      else if (price === 104) tick.classList.add('is-key-teal');
      tick.textContent = price.toFixed(1);
      tick.hidden = true;
      this.overlay.appendChild(tick);
      this.tickElements.set(price, tick);
    }
  }

  public handleResize(): void {
    if (this.disposed) return;
    const width = Math.max(this.container.clientWidth, 320);
    const height = Math.max(this.container.clientHeight, 260);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.renderAndProject();
  }

  private clearDynamic(): void {
    while (this.dynamicGroup.children.length > 0) {
      const child = this.dynamicGroup.children[0];
      this.dynamicGroup.remove(child);
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
    }
  }

  private projectWorldYToScreenY(worldX: number, worldY: number, worldZ: number, height: number): number {
    _proj.set(worldX, worldY, worldZ).project(this.camera);
    return ((-_proj.y + 1) * height) / 2;
  }

  private updateOverlayPositions(): void {
    if (!this.overlay) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width <= 0 || height <= 0) return;

    this.camera.updateMatrixWorld();

    const rulerSet = new Set(this.activeRulerPrices);
    const placedTickYs: number[] = [];
    for (const [price, el] of this.tickElements.entries()) {
      if (!rulerSet.has(price)) {
        el.hidden = true;
        continue;
      }
      const rawY = this.projectWorldYToScreenY(-4.4, priceToY(price), -0.35, height);
      const clampedY = Math.max(14, Math.min(height - 14, rawY));
      if (placedTickYs.some((y) => Math.abs(y - clampedY) < 22)) {
        el.hidden = true;
        continue;
      }
      placedTickYs.push(clampedY);
      el.hidden = false;
      el.style.transform = `translate3d(0, ${Math.round(clampedY)}px, 0) translateY(-50%)`;
    }

    const visibleTags = this.activeTags
      .filter((item) => item.visible)
      .map((item) => ({
        ...item,
        screenY: Math.max(
          18,
          Math.min(height - 18, this.projectWorldYToScreenY(3.6, item.worldY, 0.25, height)),
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
      el.className = `vm-world-pill tone-${tag.tone}`;
      el.textContent = tag.text;
      el.style.left = 'auto';
      el.style.right = '10px';
      el.style.transform = `translate3d(0, ${Math.round(tag.screenY)}px, 0) translateY(-50%)`;
    }
  }

  private renderAndProject(): void {
    this.renderer.render(this.scene, this.camera);
    this.updateOverlayPositions();
  }

  public updateScene(config: VenomSceneConfig): void {
    if (this.disposed) return;
    this.reducedMotion = config.reducedMotion;
    this.clearDynamic();

    const bgHex = config.darkTheme ? 0x0c1020 : 0xf1eff7;
    this.scene.background = new THREE.Color(bgHex);
    this.scene.fog = new THREE.Fog(bgHex, 17, 32);

    const gridColor = config.darkTheme ? 0x232944 : 0xd6d0e8;
    const rulerPrices =
      config.cameraMode === 'ruler'
        ? [100, 104, 108, 110, 111, 114, 116]
        : [100, 104, 110, 111, 114];
    this.activeRulerPrices = rulerPrices;

    for (const p of rulerPrices) {
      const y = priceToY(p);
      const pts = [new THREE.Vector3(-4.6, y, -0.55), new THREE.Vector3(4.6, y, -0.55)];
      const isKey = p === 110 || p === 111 || p === 114 || p === 104 || p === 100;
      const lineMat = new THREE.LineBasicMaterial({
        color:
          p === 114
            ? 0xbe123c
            : p === 111
              ? 0xd97706
              : p === 110 || p === 100
                ? 0x5b21b6
                : p === 104
                  ? 0x0f766e
                  : gridColor,
        transparent: true,
        opacity: isKey ? 0.72 : 0.35,
      });
      this.dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    // Grounded contact plinth
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 0.08, 1.9),
      new THREE.MeshStandardMaterial({
        color: config.darkTheme ? 0x181c30 : 0xe4e0f0,
        roughness: 0.76,
        metalness: 0.08,
      }),
    );
    floor.position.set(0, -WORLD_Y_SPAN / 2 - 0.14, 0);
    floor.receiveShadow = true;
    this.dynamicGroup.add(floor);

    const candles = getVenomSceneCandles(config.branch);
    const visibleCount = Math.min(candles.length, [3, 5, 7, 10][config.stepIndex] ?? candles.length);

    const labels = config.labels ?? {
      invalidation: 'Invalidation 114.0',
      venomOpen: 'Deferred Open 111.0',
      rangeHigh: '08:00–09:30 High 110.0',
      target: 'Objective 104.0',
      rangeLow: '08:00–09:30 Low 100.0',
    };

    const nextTags: ProjectedTagSpec[] = [];

    // Frozen 08:00–09:30 Reference Box Slab (100–110)
    const boxTop = priceToY(110);
    const boxBot = priceToY(100);
    const boxH = Math.max(0.2, boxTop - boxBot);
    const boxStart = indexToX(0) - 0.35;
    const boxEnd = indexToX(2) + 0.38;
    const boxW = boxEnd - boxStart;
    const rangeSlab = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, boxH, 0.78),
      new THREE.MeshPhysicalMaterial({
        color: config.darkTheme ? 0x8b5cf6 : 0x5b21b6,
        transparent: true,
        opacity: config.darkTheme ? 0.16 : 0.12,
        roughness: 0.32,
        metalness: 0.06,
        depthWrite: false,
      }),
    );
    rangeSlab.position.set((boxStart + boxEnd) / 2, (boxTop + boxBot) / 2, -0.18);
    this.dynamicGroup.add(rangeSlab);

    // Extended 110 High and 100 Low rails across the post-09:30 session
    const railMat = new THREE.MeshStandardMaterial({
      color: config.darkTheme ? 0xa78bfa : 0x5b21b6,
      roughness: 0.35,
      metalness: 0.45,
    });
    const highRail = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.036, 0.14), railMat);
    highRail.position.set(0.1, boxTop, -0.22);
    this.dynamicGroup.add(highRail);

    const lowRail = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.032, 0.12), railMat);
    lowRail.position.set(0.1, boxBot, -0.22);
    this.dynamicGroup.add(lowRail);

    nextTags.push(
      { id: 'rangeHigh', text: labels.rangeHigh, tone: 'violet', worldY: boxTop, visible: true },
      { id: 'rangeLow', text: labels.rangeLow, tone: 'violet', worldY: boxBot, visible: true },
    );

    // Once Fang 2 appears (visibleCount >= 7), show Deferred Open 111.0 amber rail, Invalidation 114.0 crimson rail, Objective 104.0 teal rail
    if (visibleCount >= 7) {
      const openY = priceToY(111);
      const openRail = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 0.048, 0.62),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0xfbbf24 : 0xd97706,
          roughness: 0.25,
          metalness: 0.65,
        }),
      );
      openRail.position.set(1.55, openY, 0.04);
      this.dynamicGroup.add(openRail);

      const invY = priceToY(114);
      const invRail = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 0.036, 0.16),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0xfb7185 : 0xbe123c,
          roughness: 0.38,
        }),
      );
      invRail.position.set(1.55, invY, -0.15);
      this.dynamicGroup.add(invRail);

      const tgtY = priceToY(104);
      const tgtRail = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 0.036, 0.16),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0x2dd4bf : 0x0f766e,
          roughness: 0.38,
        }),
      );
      tgtRail.position.set(1.55, tgtY, -0.15);
      this.dynamicGroup.add(tgtRail);

      nextTags.push(
        { id: 'invalidation', text: labels.invalidation, tone: 'crimson', worldY: invY, visible: true },
        { id: 'venomOpen', text: labels.venomOpen, tone: 'amber', worldY: openY, visible: true },
        { id: 'target', text: labels.target, tone: 'teal', worldY: tgtY, visible: true },
      );
    }

    this.activeTags = nextTags;

    // Composite 3-part physical 3D candles (body + beveled metal collars + wick spindle)
    for (let i = 0; i < visibleCount; i++) {
      const c = candles[i];
      const x = indexToX(c.index);
      const isUp = c.close >= c.open;
      const bodyTop = priceToY(Math.max(c.open, c.close));
      const bodyBot = priceToY(Math.min(c.open, c.close));
      const highY = priceToY(c.high);
      const lowY = priceToY(c.low);
      const bodyH = Math.max(0.11, bodyTop - bodyBot);

      const candleGroup = new THREE.Group();
      candleGroup.position.set(x, 0, 0);

      let bodyHex = isUp
        ? config.darkTheme
          ? 0x2dd4bf
          : 0x0f766e
        : config.darkTheme
          ? 0xf43f5e
          : 0xbe123c;
      if (c.role === 'range') {
        bodyHex = config.darkTheme ? 0x8b5cf6 : 0x6d28d9;
      } else if (c.role === 'fang1') {
        bodyHex = config.darkTheme ? 0xfbbf24 : 0xd97706;
      }

      const bodyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, bodyH, 0.42),
        new THREE.MeshStandardMaterial({
          color: bodyHex,
          roughness: 0.32,
          metalness: 0.16,
        }),
      );
      bodyMesh.position.y = (bodyTop + bodyBot) / 2;
      bodyMesh.castShadow = !this.isSoftwareGl;
      candleGroup.add(bodyMesh);

      const collarMat = new THREE.MeshStandardMaterial({
        color: config.darkTheme ? 0xe2e8f0 : 0x1e293b,
        roughness: 0.18,
        metalness: 0.72,
      });
      const topCollar = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.034, 0.45), collarMat);
      topCollar.position.y = bodyTop;
      candleGroup.add(topCollar);

      const botCollar = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.034, 0.45), collarMat);
      botCollar.position.y = bodyBot;
      candleGroup.add(botCollar);

      const wickH = Math.max(0.08, highY - lowY);
      const wickMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.036, 0.036, wickH, 8),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0x94a3b8 : 0x334155,
          roughness: 0.45,
          metalness: 0.55,
        }),
      );
      wickMesh.position.y = (highY + lowY) / 2;
      candleGroup.add(wickMesh);

      this.dynamicGroup.add(candleGroup);
    }

    if (config.cameraMode === 'ruler') {
      this.targetPos.set(0.35, 0.05, 12.2);
      this.targetLook.set(0.35, 0.05, 0);
    } else {
      const presets: Array<[number, number, number, number, number, number]> = [
        [-1.6, 0.75, 10.8, -1.2, -0.1, 0],
        [-0.3, 0.95, 11.4, 0.0, 0.25, 0],
        [0.95, 0.85, 11.6, 0.45, 0.05, 0],
        [1.55, 1.0, 12.0, 0.55, 0.0, 0],
      ];
      const [px, py, pz, lx, ly, lz] = presets[config.stepIndex] ?? presets[3];
      this.targetPos.set(px, py, pz);
      this.targetLook.set(lx, ly, lz);
    }

    if (this.reducedMotion || this.isSoftwareGl) {
      this.camera.position.copy(this.targetPos);
      this.currentLook.copy(this.targetLook);
      this.camera.lookAt(this.currentLook);
      this.renderAndProject();
    } else {
      this.startTransition();
    }
  }

  private startTransition(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.clock.getDelta();
    const tick = () => {
      if (this.disposed) return;
      const dt = Math.min(this.clock.getDelta(), 0.05);
      const lambda = 7.5;
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.targetPos.x, lambda, dt);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetPos.y, lambda, dt);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.targetPos.z, lambda, dt);
      this.currentLook.x = THREE.MathUtils.damp(this.currentLook.x, this.targetLook.x, lambda, dt);
      this.currentLook.y = THREE.MathUtils.damp(this.currentLook.y, this.targetLook.y, lambda, dt);
      this.currentLook.z = THREE.MathUtils.damp(this.currentLook.z, this.targetLook.z, lambda, dt);
      _camPos.copy(this.camera.position);
      _camLook.copy(this.currentLook);
      this.camera.lookAt(_camLook);
      this.renderAndProject();

      if (_camPos.distanceToSquared(this.targetPos) > 0.0004 || _camLook.distanceToSquared(this.targetLook) > 0.0004) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.camera.position.copy(this.targetPos);
        this.currentLook.copy(this.targetLook);
        this.camera.lookAt(this.currentLook);
        this.renderAndProject();
        this.rafId = 0;
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  public dispose(): void {
    this.disposed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    this.clearDynamic();
    if (this.overlay) this.overlay.replaceChildren();
    if (this.envTex) this.envTex.dispose();
    this.renderer.dispose();
  }
}
