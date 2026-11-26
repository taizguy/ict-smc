import * as T from 'three';
import type { RdrbCinemaScenario, RdrbSyntheticBar } from '../utils/rdrbMath';

export interface RdrbSceneState {
  bars: RdrbSyntheticBar[];
  count: number;
  scenario: RdrbCinemaScenario;
  reduced: boolean;
}

export interface RdrbSceneLabels {
  fvg1: string;
  fvg2: string;
  bprCore: string;
  mid50: string;
  farEdge: string;
  target: string;
}

export interface RdrbSceneConfig extends RdrbSceneState {
  labels: RdrbSceneLabels;
}

export interface RdrbSceneApi {
  update: (next: RdrbSceneState, labels?: RdrbSceneLabels) => void;
  dispose: () => void;
}

interface ScenarioBounds {
  lo: number;
  hi: number;
  fvg1Low: number;
  fvg1High: number;
  fvg2Low: number;
  fvg2High: number;
  bprLow: number;
  bprHigh: number;
  mid50: number;
  farEdge: number;
  target: number;
  fvg1ShowAt: number;
  bprShowAt: number;
  targetShowAt: number;
}

function getScenarioBounds(scenario: RdrbCinemaScenario): ScenarioBounds {
  if (scenario === 'bearish-bpr') {
    return {
      lo: 1.0808,
      hi: 1.0888,
      fvg1Low: 1.0842,
      fvg1High: 1.0862,
      fvg2Low: 1.0846,
      fvg2High: 1.0868,
      bprLow: 1.0846,
      bprHigh: 1.0862,
      mid50: 1.0854,
      farEdge: 1.0862,
      target: 1.0815,
      fvg1ShowAt: 3,
      bprShowAt: 6,
      targetShowAt: 10,
    };
  }
  if (scenario === 'rdrb-redelivery') {
    return {
      lo: 20420,
      hi: 20500,
      fvg1Low: 20440,
      fvg1High: 20460,
      fvg2Low: 20432,
      fvg2High: 20454,
      bprLow: 20440,
      bprHigh: 20454,
      mid50: 20447,
      farEdge: 20440,
      target: 20494,
      fvg1ShowAt: 3,
      bprShowAt: 5,
      targetShowAt: 9,
    };
  }
  if (scenario === 'bpr-invalidation') {
    return {
      lo: 20416,
      hi: 20476,
      fvg1Low: 20440,
      fvg1High: 20460,
      fvg2Low: 20432,
      fvg2High: 20454,
      bprLow: 20440,
      bprHigh: 20454,
      mid50: 20447,
      farEdge: 20440,
      target: 20422,
      fvg1ShowAt: 3,
      bprShowAt: 5,
      targetShowAt: 8,
    };
  }
  return {
    lo: 20414,
    hi: 20496,
    fvg1Low: 20440,
    fvg1High: 20460,
    fvg2Low: 20432,
    fvg2High: 20454,
    bprLow: 20440,
    bprHigh: 20454,
    mid50: 20447,
    farEdge: 20440,
    target: 20489,
    fvg1ShowAt: 3,
    bprShowAt: 6,
    targetShowAt: 10,
  };
}

/**
 * Motion Study 02 Three.js 3D renderer bespoke to Balanced Price Range (BPR), RDRB & Invalidation:
 * Beveled 3D candlesticks + Leg 1 FVG slab + Leg 2 opposing FVG slab + illuminated BPR intersection core.
 */
export function createRdrbScene(
  canvas: HTMLCanvasElement,
  overlay: HTMLDivElement,
  config: RdrbSceneConfig,
): RdrbSceneApi {
  let state: RdrbSceneState = config;
  let activeLabels: RdrbSceneLabels = config.labels;
  let dead = false;
  let frame = 0;
  let last = 0;
  let transition = 1;
  let dark = document.documentElement.dataset.theme === 'dark';
  let width = 0;
  let height = 0;
  const focus = new T.Vector3();
  const goalVec = new T.Vector3();
  const projVec = new T.Vector3();
  let zoom = 1;
  let orbit = 0.44;

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const gl = renderer.getContext();
  const debugExt = gl.getExtension('WEBGL_debug_renderer_info');
  const gpuName = debugExt ? String(gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL) || '') : '';
  const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpuName);

  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;

  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-7, 7, 4.5, -4.5, 0.1, 100);
  const group = new T.Group();
  scene.add(group);

  scene.add(new T.HemisphereLight(0xeef6f6, 0x162426, 2.0));
  const key = new T.DirectionalLight(0xfff5e8, 3.0);
  key.position.set(-5, 8, 10);
  scene.add(key);
  if (!isSoftwareGl) {
    const rim = new T.DirectionalLight(0x2dd4bf, 1.85);
    rim.position.set(6, 3, -4);
    scene.add(rim);
  }

  const geometries: T.BufferGeometry[] = [];
  const materials: T.Material[] = [];
  const objects: { g: T.Group; index: number }[] = [];

  const meshMat = (color: number) => {
    const m = new T.MeshPhysicalMaterial({
      color,
      roughness: 0.28,
      metalness: 0.22,
      clearcoat: isSoftwareGl ? 0.15 : 0.52,
      transparent: true,
    });
    materials.push(m);
    return m;
  };

  const upMat = meshMat(0x0f766e);
  const downMat = meshMat(0xbe3e36);
  const wickMat = meshMat(0x485e63);

  const fvg1Mat = new T.MeshPhysicalMaterial({
    color: 0xb45309,
    roughness: 0.42,
    metalness: 0.04,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const fvg2Mat = new T.MeshPhysicalMaterial({
    color: 0x1d4ed8,
    roughness: 0.42,
    metalness: 0.04,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const bprCoreMat = new T.MeshPhysicalMaterial({
    color: 0x0f766e,
    roughness: 0.28,
    metalness: 0.1,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const fvg1EdgeMat = new T.LineBasicMaterial({ color: 0xb45309, transparent: true, opacity: 0.45 });
  const fvg2EdgeMat = new T.LineBasicMaterial({ color: 0x1d4ed8, transparent: true, opacity: 0.45 });
  const bprEdgeMat = new T.LineBasicMaterial({ color: 0x0f766e, transparent: true, opacity: 0.92 });
  const mid50Mat = new T.LineBasicMaterial({ color: 0x0f766e, transparent: true, opacity: 0.96 });
  const farEdgeMat = new T.LineBasicMaterial({ color: 0xbe3e36, transparent: true, opacity: 0.88 });
  const targetMat = new T.LineBasicMaterial({ color: 0x1d4ed8, transparent: true, opacity: 0.72 });
  const timeMat = new T.MeshPhysicalMaterial({
    color: 0x0f766e,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    roughness: 0.5,
  });

  materials.push(
    fvg1Mat,
    fvg2Mat,
    bprCoreMat,
    fvg1EdgeMat,
    fvg2EdgeMat,
    bprEdgeMat,
    mid50Mat,
    farEdgeMat,
    targetMat,
    timeMat,
  );

  const roundRectShape = (w: number, h: number) => {
    const s = new T.Shape();
    const r = 0.035;
    const a = -w / 2;
    const b = -h / 2;
    s.moveTo(a + r, b);
    s.lineTo(a + w - r, b);
    s.quadraticCurveTo(a + w, b, a + w, b + r);
    s.lineTo(a + w, b + h - r);
    s.quadraticCurveTo(a + w, b + h, a + w - r, b + h);
    s.lineTo(a + r, b + h);
    s.quadraticCurveTo(a, b + h, a, b + h - r);
    s.lineTo(a, b + r);
    s.quadraticCurveTo(a, b, a + r, b);
    return s;
  };

  let bounds = getScenarioBounds(state.scenario);
  const y = (price: number) => ((price - bounds.lo) / (bounds.hi - bounds.lo) - 0.5) * 6.4;
  const x = (i: number) => i * 1.08;

  let fvg1Slab: T.Mesh;
  let fvg2Slab: T.Mesh;
  let bprCoreSlab: T.Mesh;
  let mid50Line: T.Line;
  let farEdgeLine: T.Line;
  let targetLine: T.Line;
  let timePane: T.Mesh;

  const makeLine = (points: number[][], mat: T.LineBasicMaterial) => {
    const geo = new T.BufferGeometry().setFromPoints(points.map((p) => new T.Vector3(...p)));
    geometries.push(geo);
    const line = new T.Line(geo, mat);
    group.add(line);
    return line;
  };

  const tags = new Map<keyof RdrbSceneLabels, HTMLSpanElement>();
  (['fvg1', 'fvg2', 'bprCore', 'mid50', 'farEdge', 'target'] as const).forEach((name) => {
    const tag = document.createElement('span');
    tag.className =
      'rdrb-world-label ' +
      (name === 'bprCore' ? 'rdrb-world-core' : name === 'farEdge' ? 'rdrb-world-stop' : '');
    overlay.appendChild(tag);
    tags.set(name, tag);
  });

  function clearGeometry() {
    while (group.children.length) group.remove(group.children[0]);
    geometries.splice(0).forEach((g) => g.dispose());
    objects.length = 0;
  }

  function rebuild() {
    clearGeometry();
    bounds = getScenarioBounds(state.scenario);
    const series = state.bars;

    series.forEach((b, index) => {
      const g = new T.Group();
      const h = Math.max(0.08, Math.abs(y(b.open) - y(b.close)));
      const geo = new T.ExtrudeGeometry(roundRectShape(0.42, h), {
        depth: 0.34,
        bevelEnabled: !isSoftwareGl,
        bevelThickness: 0.025,
        bevelSize: 0.022,
        bevelSegments: 2,
        curveSegments: 3,
        steps: 1,
      });
      geometries.push(geo);
      const body = new T.Mesh(geo, b.close >= b.open ? upMat : downMat);
      body.position.set(0, (y(b.open) + y(b.close)) / 2, -0.17);

      const wg = new T.CylinderGeometry(0.015, 0.015, Math.max(0.03, y(b.high) - y(b.low)), 6);
      geometries.push(wg);
      const wick = new T.Mesh(wg, wickMat);
      wick.position.y = (y(b.high) + y(b.low)) / 2;

      g.position.x = x(index);
      g.add(body, wick);
      group.add(g);
      objects.push({ g, index });
    });

    const f1H = Math.max(0.14, Math.abs(y(bounds.fvg1High) - y(bounds.fvg1Low)));
    const f1Geo = new T.BoxGeometry(9.2, f1H, 0.24);
    geometries.push(f1Geo);
    fvg1Slab = new T.Mesh(f1Geo, fvg1Mat);
    fvg1Slab.position.set(x(5.2), (y(bounds.fvg1High) + y(bounds.fvg1Low)) / 2, -0.14);
    const e1 = new T.EdgesGeometry(f1Geo);
    geometries.push(e1);
    fvg1Slab.add(new T.LineSegments(e1, fvg1EdgeMat));
    group.add(fvg1Slab);

    const f2H = Math.max(0.14, Math.abs(y(bounds.fvg2High) - y(bounds.fvg2Low)));
    const f2Geo = new T.BoxGeometry(6.2, f2H, 0.28);
    geometries.push(f2Geo);
    fvg2Slab = new T.Mesh(f2Geo, fvg2Mat);
    fvg2Slab.position.set(x(6.8), (y(bounds.fvg2High) + y(bounds.fvg2Low)) / 2, 0.08);
    const e2 = new T.EdgesGeometry(f2Geo);
    geometries.push(e2);
    fvg2Slab.add(new T.LineSegments(e2, fvg2EdgeMat));
    group.add(fvg2Slab);

    const cH = Math.max(0.12, Math.abs(y(bounds.bprHigh) - y(bounds.bprLow)));
    const cGeo = new T.BoxGeometry(6.8, cH, 0.42);
    geometries.push(cGeo);
    bprCoreSlab = new T.Mesh(cGeo, bprCoreMat);
    bprCoreSlab.position.set(x(6.2), (y(bounds.bprHigh) + y(bounds.bprLow)) / 2, 0.26);
    const ec = new T.EdgesGeometry(cGeo);
    geometries.push(ec);
    bprCoreSlab.add(new T.LineSegments(ec, bprEdgeMat));
    group.add(bprCoreSlab);

    const rightX = x(series.length - 1) + 0.6;
    mid50Line = makeLine([[x(0) - 0.3, y(bounds.mid50), 0.52], [rightX, y(bounds.mid50), 0.52]], mid50Mat);
    farEdgeLine = makeLine([[x(0) - 0.3, y(bounds.farEdge), 0.3], [rightX, y(bounds.farEdge), 0.3]], farEdgeMat);
    targetLine = makeLine([[x(0) - 0.3, y(bounds.target), -0.1], [rightX, y(bounds.target), -0.1]], targetMat);

    const tg = new T.BoxGeometry(0.04, 8.2, 1.2);
    geometries.push(tg);
    timePane = new T.Mesh(tg, timeMat);
    group.add(timePane);
  }

  function palette() {
    dark = document.documentElement.dataset.theme === 'dark';
    upMat.color.setHex(dark ? 0x2dd4bf : 0x0f766e);
    downMat.color.setHex(dark ? 0xf3766d : 0xbe3e36);
    wickMat.color.setHex(dark ? 0x9eb7bb : 0x485e63);
    fvg1Mat.color.setHex(dark ? 0xfbbf24 : 0xb45309);
    fvg1EdgeMat.color.setHex(dark ? 0xfbbf24 : 0xb45309);
    fvg2Mat.color.setHex(dark ? 0x60a5fa : 0x1d4ed8);
    fvg2EdgeMat.color.setHex(dark ? 0x60a5fa : 0x1d4ed8);
    bprCoreMat.color.setHex(dark ? 0x2dd4bf : 0x0f766e);
    bprEdgeMat.color.setHex(dark ? 0x2dd4bf : 0x0f766e);
    mid50Mat.color.setHex(dark ? 0x2dd4bf : 0x0f766e);
    farEdgeMat.color.setHex(dark ? 0xf3766d : 0xbe3e36);
    targetMat.color.setHex(dark ? 0x60a5fa : 0x1d4ed8);
    renderOnce();
  }

  function positionTag(
    name: keyof RdrbSceneLabels,
    pxWorld: number,
    pyWorld: number,
    pzWorld: number,
    label: string,
    show: boolean,
    dx = 0,
    dy = 0,
  ) {
    const el = tags.get(name)!;
    el.hidden = !show;
    if (!show) return;
    projVec.set(pxWorld, pyWorld, pzWorld).project(camera);
    el.textContent = label;
    const px = ((projVec.x + 1) * width) / 2 + dx;
    const py = ((-projVec.y + 1) * height) / 2 + dy;
    el.style.transform = `translate(${Math.max(54, Math.min(width - 56, px))}px,${Math.max(18, Math.min(height - 18, py))}px) translate(-50%,-50%)`;
  }

  function renderOnce() {
    if (dead || !width) return;
    const n = Math.max(1, Math.min(state.count, state.bars.length));
    const fvg1Ready = n >= bounds.fvg1ShowAt;
    const bprReady = n >= bounds.bprShowAt;
    const inCoreCloseUp =
      (state.scenario === 'rdrb-redelivery' && n === 9) ||
      (state.scenario !== 'rdrb-redelivery' && n === Math.min(state.bars.length - 1, bounds.bprShowAt + 2));
    const outcomeReady = n >= bounds.targetShowAt;

    objects.forEach((o) => {
      o.g.visible = o.index < n;
      if (o.index < n) o.g.position.z = (1 - transition) * -0.45;
    });

    goalVec.set(
      inCoreCloseUp ? x(Math.min(n - 1, 7)) : x((n - 1) / 2),
      inCoreCloseUp ? y(bounds.mid50) : 0,
      0,
    );
    const mobile = width < 480;
    const targetZoom = inCoreCloseUp ? (mobile ? 1.12 : 1.32) : mobile ? 0.8 : 0.96;
    const targetOrbit = inCoreCloseUp ? 0.04 : bprReady ? 0.22 : 0.46;

    focus.lerp(goalVec, state.reduced ? 1 : 0.14);
    zoom = T.MathUtils.lerp(zoom, targetZoom, state.reduced ? 1 : 0.14);
    orbit = T.MathUtils.lerp(orbit, targetOrbit, state.reduced ? 1 : 0.12);

    camera.zoom = zoom;
    camera.position.set(
      focus.x + Math.sin(orbit) * 16,
      focus.y + Math.sin(orbit * 0.35) * 4.8,
      Math.cos(orbit) * 16,
    );
    camera.lookAt(focus);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    fvg1Slab.visible = fvg1Ready;
    fvg2Slab.visible = bprReady;
    bprCoreSlab.visible = bprReady;
    mid50Line.visible = bprReady;
    farEdgeLine.visible = bprReady;
    targetLine.visible = outcomeReady;

    const maxIndex = Math.max(n - 1, 6);
    const spanEnd = x(maxIndex) + 0.5;
    const f1Start = x(0) - 0.2;
    fvg1Slab.position.x = (f1Start + spanEnd) / 2;
    fvg1Slab.scale.x = Math.max(0.2, (spanEnd - f1Start) / 9.2);

    const f2Start = x(3.8);
    fvg2Slab.position.x = (f2Start + spanEnd) / 2;
    fvg2Slab.scale.x = Math.max(0.2, (spanEnd - f2Start) / 6.2);

    bprCoreSlab.position.x = (f2Start + spanEnd) / 2;
    bprCoreSlab.scale.x = Math.max(0.2, (spanEnd - f2Start) / 6.8);
    bprCoreSlab.position.z = 0.26 + (1 - transition) * 0.22;

    timePane.visible = n >= 2;
    timePane.position.set(x(n - 1) + 0.22, 0, 0);

    scene.updateMatrixWorld();
    overlay.style.fontSize = `${mobile ? 9.5 : 11}px`;

    const rightEdge = x(Math.max(n - 1, 5)) + 0.25;
    positionTag('fvg1', x(1.2), y(bounds.fvg1High), 0.25, activeLabels.fvg1, fvg1Ready, 0, -14);
    positionTag('fvg2', x(5.2), y(bounds.fvg2Low), 0.35, activeLabels.fvg2, bprReady, 0, 14);
    positionTag('bprCore', x(Math.min(n - 1, 7.2)), y(bounds.bprHigh), 0.56, activeLabels.bprCore, bprReady, 0, -16);
    positionTag('mid50', rightEdge, y(bounds.mid50), 0.55, activeLabels.mid50, bprReady, -24, 0);
    positionTag('farEdge', x(Math.min(n - 1, 7.2)), y(bounds.farEdge), 0.4, activeLabels.farEdge, bprReady, 0, 18);
    positionTag('target', rightEdge, y(bounds.target), 0.25, activeLabels.target, outcomeReady, -24, -14);

    renderer.render(scene, camera);
  }

  function tick(now: number) {
    if (dead) return;
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    transition = Math.min(1, transition + delta * 2.1);
    renderOnce();
    if (transition < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function resize() {
    const box = canvas.parentElement!.getBoundingClientRect();
    width = box.width;
    height = box.height;
    renderer.setSize(width, height, false);
    const hh = 4.6;
    camera.left = (-hh * width) / height;
    camera.right = (hh * width) / height;
    camera.top = hh;
    camera.bottom = -hh;
    camera.updateProjectionMatrix();
    schedule();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement!);
  const themeObserver = new MutationObserver(palette);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  rebuild();
  palette();
  resize();

  return {
    update(next, nextLabels) {
      const changed = next.bars !== state.bars || next.scenario !== state.scenario;
      state = next;
      if (nextLabels) activeLabels = nextLabels;
      transition = state.reduced ? 1 : 0;
      last = 0;
      if (changed) rebuild();
      schedule();
    },
    dispose() {
      dead = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      clearGeometry();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      overlay.replaceChildren();
    },
  };
}
