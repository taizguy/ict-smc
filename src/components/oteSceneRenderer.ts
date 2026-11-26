import * as T from 'three';
import type { OteSyntheticBar } from '../utils/oteMath';

export interface OteSceneState {
  bars: OteSyntheticBar[];
  count: number;
  bear: boolean;
  reduced: boolean;
}

export interface OteSceneConfig extends OteSceneState {
  labels: {
    origin: string;
    eq: string;
    sweet: string;
    extreme: string;
    tp1: string;
    tp2: string;
  };
}

export interface OteSceneApi {
  update: (next: OteSceneState) => void;
  dispose: () => void;
}

/**
 * Motion Study 02 Three.js 3D renderer bespoke to Optimal Trade Entry (OTE):
 * Physical 3D beveled candlesticks -> camera orbit to straight-on Fib plane measurement -> outcome paths.
 */
export function createOteScene(
  canvas: HTMLCanvasElement,
  overlay: HTMLDivElement,
  config: OteSceneConfig,
): OteSceneApi {
  let state: OteSceneState = config;
  let dead = false;
  let frame = 0;
  let last = 0;
  let transition = 1;
  let dark = document.documentElement.dataset.theme === 'dark';
  let width = 0;
  let height = 0;
  const focus = new T.Vector3();
  let zoom = 1;
  let orbit = 0.42;

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;

  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-7, 7, 4.5, -4.5, 0.1, 100);
  const group = new T.Group();
  scene.add(group);
  scene.add(new T.HemisphereLight(0xeef2ff, 0x1e2b3c, 2.0));
  const key = new T.DirectionalLight(0xfff4e6, 3.2);
  key.position.set(-5, 8, 10);
  scene.add(key);
  const rim = new T.DirectionalLight(0x90a4ff, 2.0);
  rim.position.set(6, 3, -4);
  scene.add(rim);

  const geometries: T.BufferGeometry[] = [];
  const materials: T.Material[] = [];
  const objects: { g: T.Group; index: number }[] = [];

  const meshMat = (color: number) => {
    const m = new T.MeshPhysicalMaterial({
      color,
      roughness: 0.28,
      metalness: 0.24,
      clearcoat: 0.55,
      transparent: true,
    });
    materials.push(m);
    return m;
  };

  const upMat = meshMat(0x0e7c66);
  const downMat = meshMat(0xbe3e36);
  const wickMat = meshMat(0x5b6c80);

  const oteZoneMat = new T.MeshPhysicalMaterial({
    color: 0x3949ab,
    roughness: 0.35,
    metalness: 0.05,
    transparent: true,
    opacity: 0.19,
    depthWrite: false,
  });
  const sweetMat = new T.LineBasicMaterial({ color: 0x0e7c66, transparent: true, opacity: 0.92 });
  const eqMat = new T.LineBasicMaterial({ color: 0x925f0c, transparent: true, opacity: 0.72 });
  const originMat = new T.LineBasicMaterial({ color: 0xbe3e36, transparent: true, opacity: 0.85 });
  const extremeMat = new T.LineBasicMaterial({ color: 0x3949ab, transparent: true, opacity: 0.78 });
  const tpMat = new T.LineBasicMaterial({ color: 0x0e7c66, transparent: true, opacity: 0.65 });
  const edgeMat = new T.LineBasicMaterial({ color: 0x3949ab, transparent: true, opacity: 0.45 });
  const timeMat = new T.MeshPhysicalMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    roughness: 0.5,
  });
  materials.push(oteZoneMat, sweetMat, eqMat, originMat, extremeMat, tpMat, edgeMat, timeMat);

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

  const y = (price: number) => {
    if (state.bear) {
      // Bearish EUR/USD range 1.0900 -> 1.0800 (extensions to 1.0738)
      return (price - 1.083) * 410;
    }
    // Bullish NQ range 20,400 -> 20,500 (extensions to 20,562)
    return (price - 20465) * 0.041;
  };
  const x = (i: number) => i * 1.08;

  let oteSlab: T.Mesh;
  let sweetLine: T.Line;
  let eqLine: T.Line;
  let originLine: T.Line;
  let extremeLine: T.Line;
  let tp1Line: T.Line;
  let tp2Line: T.Line;
  let timePane: T.Mesh;

  const makeLine = (points: number[][], mat: T.LineBasicMaterial) => {
    const geo = new T.BufferGeometry().setFromPoints(points.map((p) => new T.Vector3(...p)));
    geometries.push(geo);
    const line = new T.Line(geo, mat);
    group.add(line);
    return line;
  };

  const tags = new Map<string, HTMLSpanElement>();
  for (const name of ['origin', 'eq', 'sweet', 'extreme', 'tp1', 'tp2']) {
    const tag = document.createElement('span');
    tag.className =
      'ote-world-label ' +
      (name === 'sweet' ? 'ote-world-sweet' : name === 'origin' ? 'ote-world-stop' : '');
    overlay.appendChild(tag);
    tags.set(name, tag);
  }

  function clearGeometry() {
    while (group.children.length) group.remove(group.children[0]);
    geometries.splice(0).forEach((g) => g.dispose());
    objects.length = 0;
  }

  function rebuild() {
    clearGeometry();
    const series = state.bars;
    series.forEach((b, index) => {
      const g = new T.Group();
      const h = Math.max(0.08, Math.abs(y(b.open) - y(b.close)));
      const geo = new T.ExtrudeGeometry(roundRectShape(0.42, h), {
        depth: 0.34,
        bevelEnabled: true,
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

    const p62 = state.bear ? 1.0862 : 20438;
    const p79 = state.bear ? 1.0879 : 20421;
    const p705 = state.bear ? 1.08705 : 20429.5;
    const p50 = state.bear ? 1.085 : 20450;
    const p100 = state.bear ? 1.09 : 20400;
    const p0 = state.bear ? 1.08 : 20500;
    const pTp1 = state.bear ? 1.0773 : 20527;
    const pTp2 = state.bear ? 1.0738 : 20562;

    const slabH = Math.max(0.14, Math.abs(y(p62) - y(p79)));
    const slabGeo = new T.BoxGeometry(8.5, slabH, 0.45);
    geometries.push(slabGeo);
    oteSlab = new T.Mesh(slabGeo, oteZoneMat);
    oteSlab.position.set(x(4.5), (y(p62) + y(p79)) / 2, 0.24);
    const eg = new T.EdgesGeometry(slabGeo);
    geometries.push(eg);
    oteSlab.add(new T.LineSegments(eg, edgeMat));
    group.add(oteSlab);

    sweetLine = makeLine([[x(0) - 0.5, y(p705), 0.5], [x(10) + 0.5, y(p705), 0.5]], sweetMat);
    eqLine = makeLine([[x(0) - 0.5, y(p50), 0.35], [x(10) + 0.5, y(p50), 0.35]], eqMat);
    originLine = makeLine([[x(0) - 0.5, y(p100), -0.15], [x(10) + 0.5, y(p100), -0.15]], originMat);
    extremeLine = makeLine([[x(0) - 0.5, y(p0), -0.15], [x(10) + 0.5, y(p0), -0.15]], extremeMat);
    tp1Line = makeLine([[x(0) - 0.5, y(pTp1), -0.1], [x(10) + 0.5, y(pTp1), -0.1]], tpMat);
    tp2Line = makeLine([[x(0) - 0.5, y(pTp2), -0.1], [x(10) + 0.5, y(pTp2), -0.1]], tpMat);

    const tg = new T.BoxGeometry(0.04, 8.2, 1.2);
    geometries.push(tg);
    timePane = new T.Mesh(tg, timeMat);
    group.add(timePane);
  }

  function palette() {
    dark = document.documentElement.dataset.theme === 'dark';
    upMat.color.setHex(dark ? 0x36caa9 : 0x0e7c66);
    downMat.color.setHex(dark ? 0xf3766d : 0xbe3e36);
    wickMat.color.setHex(dark ? 0x9eb2c9 : 0x4b5d72);
    oteZoneMat.color.setHex(dark ? 0x90a4ff : 0x3949ab);
    edgeMat.color.setHex(dark ? 0x90a4ff : 0x3949ab);
    sweetMat.color.setHex(dark ? 0x36caa9 : 0x0e7c66);
    eqMat.color.setHex(dark ? 0xf3c45d : 0x925f0c);
    originMat.color.setHex(dark ? 0xf3766d : 0xbe3e36);
    extremeMat.color.setHex(dark ? 0x90a4ff : 0x3949ab);
    tpMat.color.setHex(dark ? 0x36caa9 : 0x0e7c66);
    renderOnce();
  }

  function positionTag(name: string, v: T.Vector3, label: string, show: boolean, dx = 0, dy = 0) {
    const el = tags.get(name)!;
    el.hidden = !show;
    if (!show) return;
    v.project(camera);
    el.textContent = label;
    const px = ((v.x + 1) * width) / 2 + dx;
    const py = ((-v.y + 1) * height) / 2 + dy;
    el.style.transform = `translate(${Math.max(46, Math.min(width - 48, px))}px,${Math.max(18, Math.min(height - 18, py))}px) translate(-50%,-50%)`;
  }

  function renderOnce() {
    if (dead || !width) return;
    const n = Math.max(1, Math.min(state.count, state.bars.length));
    const fibAnchored = n >= 4;
    const inOteCloseUp = n === 7;
    const expanded = n >= 9;

    objects.forEach((o) => {
      o.g.visible = o.index < n;
      if (o.index < n) o.g.position.z = (1 - transition) * -0.45;
    });

    const p705 = state.bear ? 1.08705 : 20429.5;
    const p50 = state.bear ? 1.085 : 20450;
    const p100 = state.bear ? 1.09 : 20400;
    const p0 = state.bear ? 1.08 : 20500;
    const pTp1 = state.bear ? 1.0773 : 20527;
    const pTp2 = state.bear ? 1.0738 : 20562;

    const goal = new T.Vector3(
      inOteCloseUp ? x(4.6) : x((n - 1) / 2),
      inOteCloseUp ? y(p705) : state.bear ? 0.15 : 0.2,
      0,
    );
    const mobile = width < 480;
    const targetZoom = inOteCloseUp ? (mobile ? 1.15 : 1.38) : mobile ? 0.8 : 0.96;
    const targetOrbit = inOteCloseUp ? 0.03 : fibAnchored ? 0.24 : 0.48;

    focus.lerp(goal, state.reduced ? 1 : 0.14);
    zoom = T.MathUtils.lerp(zoom, targetZoom, state.reduced ? 1 : 0.14);
    orbit = T.MathUtils.lerp(orbit, targetOrbit, state.reduced ? 1 : 0.12);

    camera.zoom = zoom;
    camera.position.set(
      focus.x + Math.sin(orbit) * 16,
      focus.y + Math.sin(orbit * 0.35) * 5,
      Math.cos(orbit) * 16,
    );
    camera.lookAt(focus);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    oteSlab.visible = fibAnchored;
    sweetLine.visible = fibAnchored;
    eqLine.visible = fibAnchored;
    originLine.visible = true;
    extremeLine.visible = fibAnchored;
    tp1Line.visible = expanded;
    tp2Line.visible = expanded;

    const spanStart = x(0) - 0.35;
    const spanEnd = x(Math.max(n - 1, 6)) + 0.55;
    oteSlab.position.x = (spanStart + spanEnd) / 2;
    oteSlab.scale.x = (spanEnd - spanStart) / 8.5;
    oteSlab.position.z = 0.24 + (1 - transition) * 0.25;

    timePane.visible = n >= 2;
    timePane.position.set(x(n - 1) + 0.22, 0.1, 0);

    scene.updateMatrixWorld();
    const mobileFont = mobile ? 9.5 : 11;
    overlay.style.fontSize = `${mobileFont}px`;

    const rightEdge = x(Math.max(n - 1, 5)) + 0.3;
    positionTag('origin', new T.Vector3(x(0) + 0.2, y(p100), 0.35), config.labels.origin, true, 10, state.bear ? -14 : 14);
    positionTag('extreme', new T.Vector3(x(3), y(p0), 0.35), config.labels.extreme, fibAnchored, 0, state.bear ? 16 : -16);
    positionTag('eq', new T.Vector3(rightEdge, y(p50), 0.45), config.labels.eq, fibAnchored, -16, 0);
    positionTag('sweet', new T.Vector3(x(Math.min(n - 1, 6)), y(p705), 0.55), config.labels.sweet, fibAnchored, 0, inOteCloseUp ? 22 : 18);
    positionTag('tp1', new T.Vector3(rightEdge, y(pTp1), 0.2), config.labels.tp1, expanded, -20, state.bear ? 14 : -14);
    positionTag('tp2', new T.Vector3(rightEdge, y(pTp2), 0.2), config.labels.tp2, expanded && n >= 10, -20, state.bear ? 14 : -14);

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
    update(next) {
      const changed = next.bars !== state.bars || next.bear !== state.bear;
      state = next;
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
