import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { getBreadButterSceneCandles, type BreadButterBranch } from './breadButterMath';

export interface BreadButterSceneLabel {
  id: string;
  text: string;
  tone: 'cerulean' | 'pine' | 'terra' | 'ochre';
  worldPos: THREE.Vector3;
  kind: 'pill' | 'tick';
}

export interface BreadButterSceneOptions {
  host: HTMLElement;
  labelsLayer: HTMLElement;
  branch: BreadButterBranch;
  stage: number; // 0..3
  rulerMode: boolean;
  labelTexts: {
    target: string;
    boxHigh: string;
    midpoint: string;
    entry: string;
    boxLow: string;
    stop: string;
  };
}

const _proj = new THREE.Vector3();

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererStr);
  } catch {
    return true;
  }
}

function priceToY(price: number): number {
  return (price - 110) * 0.14;
}

export class BreadButterSceneRenderer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private host: HTMLElement;
  private labelsLayer: HTMLElement;
  private isSoftwareGl: boolean;
  private candleGroup = new THREE.Group();
  private railGroup = new THREE.Group();
  private labelElements = new Map<string, HTMLDivElement>();
  private labels: BreadButterSceneLabel[] = [];
  private branch: BreadButterBranch;
  private stage: number;
  private rulerMode: boolean;
  private labelTexts: BreadButterSceneOptions['labelTexts'];

  private targetCamPos = new THREE.Vector3(0.4, 2.2, 13.8);
  private targetLookAt = new THREE.Vector3(0.2, 0.2, 0);
  private userInteracting = false;
  private disposed = false;
  private frameId = 0;
  private resizeObserver: ResizeObserver;
  private envRT: THREE.WebGLRenderTarget | null = null;

  constructor(opts: BreadButterSceneOptions) {
    this.host = opts.host;
    this.labelsLayer = opts.labelsLayer;
    this.branch = opts.branch;
    this.stage = opts.stage;
    this.rulerMode = opts.rulerMode;
    this.labelTexts = opts.labelTexts;
    this.isSoftwareGl = detectSoftwareGl();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d1624);
    this.scene.fog = new THREE.Fog(0x0d1624, 18, 42);

    const w = Math.max(300, this.host.clientWidth || 640);
    const h = Math.max(260, this.host.clientHeight || 410);

    this.camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
    this.camera.position.copy(this.targetCamPos);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.host.appendChild(this.renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.envRT.texture;
    pmrem.dispose();

    // Warm key + cool hemisphere + subtle rim light
    const hemi = new THREE.HemisphereLight(0xbae6fd, 0x1e293b, 0.9);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.55);
    keyLight.position.set(7, 11, 9);
    keyLight.castShadow = !this.isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -10;
      keyLight.shadow.camera.right = 10;
      keyLight.shadow.camera.top = 10;
      keyLight.shadow.camera.bottom = -10;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.65);
    rimLight.position.set(-8, 4, -6);
    this.scene.add(rimLight);

    // Subtle studio floor plinth
    const floorGeo = new THREE.PlaneGeometry(26, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111c2e,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, priceToY(74), 0);
    floor.receiveShadow = !this.isSoftwareGl;
    this.scene.add(floor);

    this.scene.add(this.railGroup);
    this.scene.add(this.candleGroup);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.08;
    this.controls.maxDistance = 24;
    this.controls.minDistance = 6;
    this.controls.maxPolarAngle = Math.PI * 0.62;
    this.controls.target.copy(this.targetLookAt);
    this.controls.addEventListener('start', () => {
      this.userInteracting = true;
    });
    this.controls.addEventListener('change', () => {
      this.syncProjectedLabels();
    });

    this.buildRails();
    this.rebuildCandles();
    this.applyCameraPreset(true);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.host);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }
    this.startLoop();
  }

  private buildRails(): void {
    this.clearGroup(this.railGroup);

    // Translucent pre-breakout consolidation box (100.0 to 130.0 across bars 0..4)
    const boxHeight = priceToY(130) - priceToY(100);
    const boxWidth = 5.1;
    const boxGeo = new THREE.BoxGeometry(boxWidth, boxHeight, 1.35);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.15,
      roughness: 0.4,
      metalness: 0.15,
      depthWrite: false,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.set(-2.9, (priceToY(130) + priceToY(100)) / 2, -0.05);
    this.railGroup.add(boxMesh);

    const railConfigs: Array<{
      id: string;
      price: number;
      color: number;
      tone: 'cerulean' | 'pine' | 'terra' | 'ochre';
      text: string;
    }> = [
      { id: 'target', price: 136, color: 0x4ade80, tone: 'pine', text: this.labelTexts.target },
      { id: 'boxHigh', price: 130, color: 0x38bdf8, tone: 'cerulean', text: this.labelTexts.boxHigh },
      { id: 'midpoint', price: 115, color: 0xfacc15, tone: 'ochre', text: this.labelTexts.midpoint },
      { id: 'entry', price: 106, color: 0x22c55e, tone: 'pine', text: this.labelTexts.entry },
      { id: 'boxLow', price: 100, color: 0x38bdf8, tone: 'cerulean', text: this.labelTexts.boxLow },
      { id: 'stop', price: 86, color: 0xfb923c, tone: 'terra', text: this.labelTexts.stop },
    ];

    this.labels = [];
    for (const rc of railConfigs) {
      const y = priceToY(rc.price);
      const pts = [new THREE.Vector3(-5.8, y, 0), new THREE.Vector3(6.2, y, 0)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({
        color: rc.color,
        transparent: true,
        opacity: rc.id === 'midpoint' ? 0.48 : 0.78,
      });
      this.railGroup.add(new THREE.Line(lineGeo, lineMat));

      this.labels.push({
        id: rc.id,
        text: rc.text,
        tone: rc.tone,
        worldPos: new THREE.Vector3(6.35, y, 0),
        kind: 'pill',
      });
    }

    // FVG entry corridor ribbon (104 to 112 across post-displacement bars)
    const fvgH = priceToY(112) - priceToY(104);
    const fvgGeo = new THREE.BoxGeometry(5.8, fvgH, 0.72);
    const fvgMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      transparent: true,
      opacity: 0.18,
      roughness: 0.35,
      metalness: 0.1,
      depthWrite: false,
    });
    const fvgMesh = new THREE.Mesh(fvgGeo, fvgMat);
    fvgMesh.position.set(2.85, (priceToY(112) + priceToY(104)) / 2, -0.02);
    this.railGroup.add(fvgMesh);

    this.rebuildLabelElements();
  }

  private rebuildCandles(): void {
    this.clearGroup(this.candleGroup);
    const candles = getBreadButterSceneCandles(this.branch);
    const maxIndex = this.stage === 0 ? 4 : this.stage === 1 ? 5 : this.stage === 2 ? 6 : candles.length - 1;

    // Remove previous tick labels and keep rail labels
    this.labels = this.labels.filter((l) => l.kind === 'pill');

    for (let i = 0; i <= maxIndex && i < candles.length; i++) {
      const c = candles[i];
      const x = -5.0 + i * 1.05;
      const isBull = c.close >= c.open;

      let bodyHex = isBull ? 0x16a34a : 0xd97706;
      if (c.role === 'range') bodyHex = isBull ? 0x0284c7 : 0x475569;
      if (c.role === 'sweep') bodyHex = 0xea580c;
      if (c.role === 'displacement' || c.role === 'delivery') bodyHex = 0x15803d;
      if (c.role === 'unfilled') bodyHex = 0x0ea5e9;
      if (c.role === 'failure') bodyHex = 0xc2410c;

      const candleAssembly = new THREE.Group();
      candleAssembly.position.set(x, 0, 0);

      // Part 1: Main 3D Candle Body
      const bodyLow = priceToY(Math.min(c.open, c.close));
      const bodyHigh = priceToY(Math.max(c.open, c.close));
      const bodyH = Math.max(0.14, bodyHigh - bodyLow);
      const bodyGeo = new THREE.BoxGeometry(0.56, bodyH, 0.56);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: bodyHex,
        roughness: 0.34,
        metalness: 0.16,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = (bodyLow + bodyHigh) / 2;
      bodyMesh.castShadow = !this.isSoftwareGl;
      bodyMesh.receiveShadow = !this.isSoftwareGl;
      candleAssembly.add(bodyMesh);

      // Part 2: Metallic Upper & Lower Cap Trim (composite 3-part silhouette)
      const capGeo = new THREE.BoxGeometry(0.6, 0.04, 0.6);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.22,
        metalness: 0.72,
      });
      const topCap = new THREE.Mesh(capGeo, capMat);
      topCap.position.y = bodyHigh;
      candleAssembly.add(topCap);

      // Part 3: Cylindrical High/Low Wick
      const wickLow = priceToY(c.low);
      const wickHigh = priceToY(c.high);
      const wickH = Math.max(0.1, wickHigh - wickLow);
      const wickGeo = new THREE.CylinderGeometry(0.045, 0.045, wickH, 10);
      const wickMat = new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        roughness: 0.65,
        metalness: 0.35,
      });
      const wickMesh = new THREE.Mesh(wickGeo, wickMat);
      wickMesh.position.y = (wickLow + wickHigh) / 2;
      candleAssembly.add(wickMesh);

      this.candleGroup.add(candleAssembly);

      if (i % 2 === 0 || i === 5 || i === 6 || i === maxIndex) {
        this.labels.push({
          id: `tick-${i}`,
          text: c.label,
          tone: 'cerulean',
          worldPos: new THREE.Vector3(x, priceToY(76.5), 0),
          kind: 'tick',
        });
      }
    }

    this.rebuildLabelElements();
  }

  private rebuildLabelElements(): void {
    this.labelsLayer.innerHTML = '';
    this.labelElements.clear();
    for (const lbl of this.labels) {
      const el = document.createElement('div');
      el.className = lbl.kind === 'pill' ? 'bb70-world-pill' : 'bb70-world-tick';
      el.dataset.tone = lbl.tone;
      el.textContent = lbl.text;
      this.labelsLayer.appendChild(el);
      this.labelElements.set(lbl.id, el);
    }
    this.syncProjectedLabels();
  }

  private syncProjectedLabels(): void {
    const w = this.host.clientWidth || 640;
    const h = this.host.clientHeight || 410;
    this.camera.updateMatrixWorld();

    for (const lbl of this.labels) {
      const el = this.labelElements.get(lbl.id);
      if (!el) continue;
      _proj.copy(lbl.worldPos).project(this.camera);
      if (_proj.z > 1) {
        el.style.opacity = '0';
        continue;
      }
      const x = (_proj.x * 0.5 + 0.5) * w;
      const y = (-_proj.y * 0.5 + 0.5) * h;
      const clampedX = lbl.kind === 'pill' ? Math.min(w - 76, Math.max(76, x)) : Math.min(w - 28, Math.max(28, x));
      const clampedY = Math.min(h - 14, Math.max(16, y));
      el.style.opacity = '1';
      el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) translate(-50%, -50%)`;
    }
  }

  private applyCameraPreset(immediate: boolean): void {
    this.userInteracting = false;
    if (this.rulerMode) {
      this.targetCamPos.set(0.6, 0.2, 14.8);
      this.targetLookAt.set(0.6, 0.2, 0);
    } else if (this.stage === 0) {
      this.targetCamPos.set(-3.2, 1.9, 12.6);
      this.targetLookAt.set(-2.2, 0.5, 0);
    } else if (this.stage === 1) {
      this.targetCamPos.set(-0.2, 1.3, 12.2);
      this.targetLookAt.set(0.0, -0.5, 0);
    } else if (this.stage === 2) {
      this.targetCamPos.set(1.2, 1.8, 12.6);
      this.targetLookAt.set(0.8, 0.1, 0);
    } else {
      this.targetCamPos.set(1.8, 2.3, 14.2);
      this.targetLookAt.set(0.6, 0.2, 0);
    }

    if (immediate) {
      this.camera.position.copy(this.targetCamPos);
      this.controls.target.copy(this.targetLookAt);
      this.controls.update();
      this.syncProjectedLabels();
    }
  }

  public updateState(next: {
    branch: BreadButterBranch;
    stage: number;
    rulerMode: boolean;
    labelTexts: BreadButterSceneOptions['labelTexts'];
  }): void {
    const labelsChanged =
      next.labelTexts.target !== this.labelTexts.target ||
      next.labelTexts.boxHigh !== this.labelTexts.boxHigh;
    const candlesChanged = next.branch !== this.branch || next.stage !== this.stage;
    const camChanged = next.rulerMode !== this.rulerMode || next.stage !== this.stage;

    this.branch = next.branch;
    this.stage = next.stage;
    this.rulerMode = next.rulerMode;
    this.labelTexts = next.labelTexts;

    if (labelsChanged) this.buildRails();
    if (candlesChanged) this.rebuildCandles();
    if (camChanged) this.applyCameraPreset(false);
    this.syncProjectedLabels();
  }

  private handleResize(): void {
    if (this.disposed) return;
    const w = Math.max(300, this.host.clientWidth || 640);
    const h = Math.max(260, this.host.clientHeight || 410);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.syncProjectedLabels();
  }

  private startLoop(): void {
    let last = performance.now();
    const tick = () => {
      if (this.disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!this.userInteracting) {
        const alpha = 1 - Math.exp(-5.5 * dt);
        this.camera.position.lerp(this.targetCamPos, alpha);
        this.controls.target.lerp(this.targetLookAt, alpha);
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.syncProjectedLabels();

      if (this.isSoftwareGl) {
        this.frameId = window.setTimeout(tick, 90);
      } else {
        this.frameId = requestAnimationFrame(tick);
      }
    };
    tick();
  }

  private clearGroup(group: THREE.Group): void {
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
    }
  }

  public dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.clearGroup(this.candleGroup);
    this.clearGroup(this.railGroup);
    if (this.envRT) this.envRT.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.host) {
      this.host.removeChild(this.renderer.domElement);
    }
    this.labelsLayer.innerHTML = '';
  }
}
