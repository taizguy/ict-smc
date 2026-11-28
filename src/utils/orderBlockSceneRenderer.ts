import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type OrderBlockBranch = 'opening-bounce' | 'mean-threshold' | 'closing-failure';
export type OrderBlockCameraMode = 'cinema' | 'ruler';

export interface ObSceneCandle {
  index: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  role: 'approach' | 'ob-run' | 'departure' | 'return' | 'outcome';
}

export interface ObSceneLabels {
  obOpen: string;
  mt50: string;
  distalLow: string;
  swingRef: string;
}

export interface ObSceneConfig {
  branch: OrderBlockBranch;
  stepIndex: number;
  cameraMode: OrderBlockCameraMode;
  darkTheme: boolean;
  reducedMotion: boolean;
  labels?: ObSceneLabels;
}

const BASE_CANDLES: ObSceneCandle[] = [
  { index: 0, time: '09:15', open: 108.0, high: 109.0, low: 105.6, close: 106.0, role: 'approach' },
  { index: 1, time: '09:20', open: 106.0, high: 107.0, low: 103.6, close: 104.0, role: 'ob-run' },
  { index: 2, time: '09:25', open: 104.0, high: 104.6, low: 101.6, close: 102.0, role: 'ob-run' },
  { index: 3, time: '09:30', open: 102.0, high: 102.5, low: 99.0, close: 101.0, role: 'ob-run' },
  { index: 4, time: '09:35', open: 101.0, high: 108.6, low: 100.8, close: 108.0, role: 'departure' },
  { index: 5, time: '09:40', open: 108.0, high: 112.0, low: 107.5, close: 111.0, role: 'departure' },
  { index: 6, time: '09:45', open: 111.0, high: 111.4, low: 107.8, close: 108.4, role: 'return' },
];

const BRANCH_TAILS: Record<OrderBlockBranch, ObSceneCandle[]> = {
  'opening-bounce': [
    { index: 7, time: '09:50', open: 108.4, high: 108.6, low: 105.8, close: 107.4, role: 'return' },
    { index: 8, time: '09:55', open: 107.4, high: 112.6, low: 107.1, close: 112.2, role: 'outcome' },
    { index: 9, time: '10:00', open: 112.2, high: 115.6, low: 111.8, close: 115.0, role: 'outcome' },
  ],
  'mean-threshold': [
    { index: 7, time: '09:50', open: 108.4, high: 108.5, low: 103.5, close: 105.6, role: 'return' },
    { index: 8, time: '09:55', open: 105.6, high: 111.5, low: 105.0, close: 110.8, role: 'outcome' },
    { index: 9, time: '10:00', open: 110.8, high: 115.2, low: 110.4, close: 114.6, role: 'outcome' },
  ],
  'closing-failure': [
    { index: 7, time: '09:50', open: 108.4, high: 108.5, low: 102.2, close: 102.8, role: 'return' },
    { index: 8, time: '09:55', open: 102.8, high: 103.2, low: 97.8, close: 98.4, role: 'outcome' },
    { index: 9, time: '10:00', open: 98.4, high: 101.2, low: 95.8, close: 96.2, role: 'outcome' },
  ],
};

export function getObSceneCandles(branch: OrderBlockBranch): ObSceneCandle[] {
  return [...BASE_CANDLES, ...BRANCH_TAILS[branch]];
}

const PRICE_MIN = 94;
const PRICE_MAX = 117;
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
  tone: 'emerald' | 'ochre' | 'rose' | 'indigo';
  worldY: number;
  visible: boolean;
}

export class OrderBlockSceneRenderer {
  private container: HTMLElement;
  private overlay: HTMLElement | null;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private dynamicGroup: THREE.Group;
  private envTex: THREE.Texture | null = null;
  private targetPos = new THREE.Vector3(0.4, 0.7, 11.8);
  private targetLook = new THREE.Vector3(0, 0, 0);
  private currentLook = new THREE.Vector3(0, 0, 0);
  private clock = new THREE.Clock();
  private rafId = 0;
  private isSoftwareGl = false;
  private disposed = false;
  private reducedMotion = false;
  private currentConfig: ObSceneConfig | null = null;
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

    const hemi = new THREE.HemisphereLight(0xf0fdf4, 0x1e293b, 0.9);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfffbeb, 1.25);
    key.position.set(5.5, 8.5, 9.5);
    if (!this.isSoftwareGl) {
      key.castShadow = true;
      key.shadow.bias = -0.0005;
      key.shadow.normalBias = 0.02;
    }
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x34d399, 0.5);
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

    for (const id of ['swing', 'open', 'mt', 'distal']) {
      const span = document.createElement('span');
      span.className = 'ob-world-pill';
      span.hidden = true;
      this.overlay.appendChild(span);
      this.tagElements.set(id, span);
    }

    for (const price of [96, 99, 101, 103.5, 106, 109, 112, 115]) {
      const tick = document.createElement('span');
      tick.className = 'ob-world-tick';
      if (price === 106) tick.classList.add('is-key-emerald');
      else if (price === 103.5) tick.classList.add('is-key-ochre');
      else if (price === 99) tick.classList.add('is-key-rose');
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
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
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

    // Position left-edge price ruler ticks cleanly without overlapping
    const rulerSet = new Set(this.activeRulerPrices);
    const placedTickYs: number[] = [];
    for (const [price, el] of this.tickElements.entries()) {
      if (!rulerSet.has(price)) {
        el.hidden = true;
        continue;
      }
      const rawY = this.projectWorldYToScreenY(-4.4, priceToY(price), -0.35, height);
      const clampedY = Math.max(14, Math.min(height - 14, rawY));
      if (placedTickYs.some((y) => Math.abs(y - clampedY) < 21)) {
        el.hidden = true;
        continue;
      }
      placedTickYs.push(clampedY);
      el.hidden = false;
      el.style.transform = `translate3d(0, ${Math.round(clampedY)}px, 0) translateY(-50%)`;
    }

    // Position right-edge crisp annotation pills with guaranteed non-overlapping vertical spacing
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
      let overflow = visibleTags[visibleTags.length - 1].screenY - (height - 16);
      for (let i = visibleTags.length - 1; i >= 0; i--) {
        visibleTags[i].screenY = Math.max(16 + i * minGap, visibleTags[i].screenY - overflow);
      }
    }

    const activeIds = new Set(visibleTags.map((v) => v.id));
    for (const [id, el] of this.tagElements.entries()) {
      if (!activeIds.has(id)) {
        el.hidden = true;
      }
    }
    for (const tag of visibleTags) {
      const el = this.tagElements.get(tag.id);
      if (!el) continue;
      el.hidden = false;
      el.className = `ob-world-pill tone-${tag.tone}`;
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

  public updateScene(config: ObSceneConfig): void {
    if (this.disposed) return;
    this.currentConfig = config;
    this.reducedMotion = config.reducedMotion;
    this.clearDynamic();

    const bgHex = config.darkTheme ? 0x0f172a : 0xf4f8f6;
    this.scene.background = new THREE.Color(bgHex);
    this.scene.fog = new THREE.Fog(bgHex, 17, 32);

    const gridColor = config.darkTheme ? 0x1e293b : 0xd3e0da;

    // Grounded backdrop ruler grid
    const rulerPrices =
      config.cameraMode === 'ruler'
        ? [96, 99, 101, 103.5, 106, 109, 112, 115]
        : [99, 103.5, 106, 109, 115];
    this.activeRulerPrices = rulerPrices;

    for (const p of rulerPrices) {
      const y = priceToY(p);
      const pts = [new THREE.Vector3(-4.6, y, -0.55), new THREE.Vector3(4.6, y, -0.55)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const isKey = p === 106 || p === 103.5 || p === 99;
      const lineMat = new THREE.LineBasicMaterial({
        color: p === 106 ? 0x065f46 : p === 103.5 ? 0xd97706 : p === 99 ? 0xbe123c : gridColor,
        transparent: true,
        opacity: isKey ? 0.72 : 0.35,
      });
      this.dynamicGroup.add(new THREE.Line(lineGeo, lineMat));
    }

    // Contact floor rail
    const floorGeo = new THREE.BoxGeometry(9.8, 0.08, 1.9);
    const floorMat = new THREE.MeshStandardMaterial({
      color: config.darkTheme ? 0x162234 : 0xe2ece7,
      roughness: 0.75,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -WORLD_Y_SPAN / 2 - 0.14, 0);
    floor.receiveShadow = true;
    this.dynamicGroup.add(floor);

    const candles = getObSceneCandles(config.branch);
    const visibleCount = Math.min(candles.length, [4, 6, 8, 10][config.stepIndex] ?? candles.length);

    const labels = config.labels ?? {
      obOpen: 'OB Open 106.0',
      mt50: '50% MT 103.5',
      distalLow: 'Distal Low 99.0',
      swingRef: 'Swing Ref 109.0',
    };

    const nextTags: ProjectedTagSpec[] = [];

    // Order Block outer full-range slab (99–107) and inner body-range slab (101–106)
    if (visibleCount >= 4) {
      const xStart = indexToX(1) - 0.32;
      const xEnd = indexToX(Math.max(visibleCount - 1, 5)) + 0.36;
      const slabW = Math.max(2.2, xEnd - xStart);
      const slabCx = (xStart + xEnd) / 2;

      const fullTop = priceToY(107);
      const fullBot = priceToY(99);
      const fullH = Math.max(0.12, fullTop - fullBot);
      const outerSlab = new THREE.Mesh(
        new THREE.BoxGeometry(slabW, fullH, 0.78),
        new THREE.MeshPhysicalMaterial({
          color: config.darkTheme ? 0x10b981 : 0x065f46,
          transparent: true,
          opacity: config.darkTheme ? 0.12 : 0.09,
          roughness: 0.35,
          metalness: 0.05,
          depthWrite: false,
        }),
      );
      outerSlab.position.set(slabCx, (fullTop + fullBot) / 2, -0.18);
      this.dynamicGroup.add(outerSlab);

      const bodyTop = priceToY(106);
      const bodyBot = priceToY(101);
      const bodyH = Math.max(0.12, bodyTop - bodyBot);
      const failed = config.branch === 'closing-failure' && visibleCount >= 9;
      const bodySlab = new THREE.Mesh(
        new THREE.BoxGeometry(slabW, bodyH, 0.56),
        new THREE.MeshPhysicalMaterial({
          color: failed
            ? config.darkTheme
              ? 0xfb7185
              : 0xbe123c
            : config.darkTheme
              ? 0x34d399
              : 0x047857,
          transparent: true,
          opacity: config.darkTheme ? 0.24 : 0.18,
          roughness: 0.22,
          metalness: 0.12,
          depthWrite: false,
        }),
      );
      bodySlab.position.set(slabCx, (bodyTop + bodyBot) / 2, -0.05);
      this.dynamicGroup.add(bodySlab);

      // Mean threshold ochre rail (103.5)
      const mtY = priceToY(103.5);
      const mtRail = new THREE.Mesh(
        new THREE.BoxGeometry(slabW, 0.045, 0.64),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0xfbbf24 : 0xb45309,
          roughness: 0.28,
          metalness: 0.65,
        }),
      );
      mtRail.position.set(slabCx, mtY, 0.06);
      this.dynamicGroup.add(mtRail);

      nextTags.push(
        { id: 'open', text: labels.obOpen, tone: 'emerald', worldY: bodyTop, visible: true },
        { id: 'mt', text: labels.mt50, tone: 'ochre', worldY: mtY, visible: true },
        { id: 'distal', text: labels.distalLow, tone: 'rose', worldY: fullBot, visible: true },
      );
    }

    // Swing reference line (109.0) once departure appears
    if (visibleCount >= 5) {
      const ySwing = priceToY(109);
      const swingBar = new THREE.Mesh(
        new THREE.BoxGeometry(8.4, 0.032, 0.12),
        new THREE.MeshStandardMaterial({
          color: config.darkTheme ? 0x60a5fa : 0x1d4ed8,
          roughness: 0.4,
        }),
      );
      swingBar.position.set(0.1, ySwing, -0.25);
      this.dynamicGroup.add(swingBar);

      nextTags.push({
        id: 'swing',
        text: labels.swingRef,
        tone: 'indigo',
        worldY: ySwing,
        visible: true,
      });
    }

    this.activeTags = nextTags;

    // Render composite 3-part physical 3D candles (body + metallic trim collars + wick spindle)
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
          ? 0x10b981
          : 0x059669
        : config.darkTheme
          ? 0xf43f5e
          : 0xbe123c;
      if (c.role === 'ob-run') {
        bodyHex = config.darkTheme ? 0xf59e0b : 0xb45309;
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

    // Directed camera presets with generous framing so labels & candles never collide
    if (config.cameraMode === 'ruler') {
      this.targetPos.set(0.35, 0.05, 12.2);
      this.targetLook.set(0.35, 0.05, 0);
    } else {
      const presets: Array<[number, number, number, number, number, number]> = [
        [-1.4, 0.75, 10.6, -1.1, -0.25, 0],
        [-0.2, 0.9, 11.4, 0.0, 0.1, 0],
        [1.0, 0.85, 11.4, 0.55, 0.0, 0],
        [1.55, 1.0, 12.0, 0.6, 0.05, 0],
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
