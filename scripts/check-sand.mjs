import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transformWithEsbuild } from 'vite';

// Exercise the actual effect with browser/GPU boundaries mocked, without a DOM package.
const source = await readFile(new URL('../src/SandBackdrop.jsx', import.meta.url), 'utf8');
const { code } = await transformWithEsbuild(source, 'SandBackdrop.jsx', { loader: 'jsx' });
const runnable = code.replace(/^import .*;$/gm, '').replace('export function SandBackdrop', 'function SandBackdrop');
function mount({ reduced = false, webgl = true, compile = true } = {}) {
  const frames = new Map();
  const listeners = new Map();
  const resources = new Set();
  const values = {};
  let serial = 0, cleanup, resize;
  const gl = new Proxy({}, { get: (_, key) => {
    if (/^create/.test(key)) return () => { const id = ++serial; resources.add(id); return id; };
    if (/^delete/.test(key)) return (id) => resources.delete(id);
    if (key === 'getShaderParameter') return () => compile;
    if (key === 'getProgramParameter') return () => true;
    if (key === 'getUniformLocation') return (_, name) => name;
    if (key === 'uniform1f') return (name, value) => { values[name] = value; };
    return () => {};
  }});
  const listen = { addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) };
  const motion = { matches: reduced, ...listen };
  const canvas = { clientWidth: 400, clientHeight: 800, style: {}, getContext: () => webgl ? gl : null, ...listen };
  const document = { hidden: false, ...listen };
  const viewport = { scrollY: 560, innerHeight: 800 };
  const context = {
    React: { createElement: () => null },
    useRef: () => ({ current: canvas }), useEffect: (fn) => { cleanup = fn(); },
    matchMedia: () => motion, document, devicePixelRatio: 3, performance: { now: () => 100 },
    requestAnimationFrame: (fn) => { const id = ++serial; frames.set(id, fn); return id; },
    cancelAnimationFrame: (id) => frames.delete(id),
    ResizeObserver: class { constructor(fn) { resize = fn; } observe() { resize(); } disconnect() {} },
    window: viewport,
  };
  vm.runInNewContext(`${runnable}\nSandBackdrop();`, context);
  return { frames, listeners, resources, values, canvas, document, motion, viewport, cleanup: () => cleanup?.() };
}

const staticScene = mount({ reduced: true });
assert.equal(staticScene.frames.size, 0);
assert.equal(staticScene.values.time, 0);
assert.equal(staticScene.values.progress, 0);
assert.equal(staticScene.canvas.width, 600, 'DPR is capped at 1.5');
staticScene.motion.matches = false;
staticScene.listeners.get('change')();
assert.equal(staticScene.frames.size, 1);
assert.equal(staticScene.values.progress, 0.7);
staticScene.viewport.scrollY = 6400;
staticScene.listeners.get('visibilitychange')();
assert.equal(staticScene.values.progress, 8, 'Sand keeps moving eight screens past the hero');
assert.equal(staticScene.frames.size, 1, 'Only one render loop remains active');
staticScene.viewport.scrollY = 1200;
staticScene.listeners.get('visibilitychange')();
assert.equal(staticScene.values.progress, 1.5, 'Reverse scrolling reverses the sand progress');
staticScene.document.hidden = true;
staticScene.listeners.get('visibilitychange')();
assert.equal(staticScene.frames.size, 0);
staticScene.cleanup();
assert.equal(staticScene.resources.size, 0);
assert.equal(staticScene.listeners.size, 0);

const fallback = mount({ webgl: false });
assert.equal(fallback.frames.size, 0);
const failedShader = mount({ compile: false });
assert.equal(failedShader.resources.size, 0);
assert.equal(failedShader.canvas.style.opacity, '0');
const lost = mount();
lost.listeners.get('webglcontextlost')({ preventDefault() {} });
assert.equal(lost.frames.size, 0);
assert.equal(lost.canvas.style.opacity, '0');
lost.cleanup();
console.log('Sand checks passed: motion preference, DPR, visibility, cleanup, GPU fallbacks.');

// The page runtime must work independently of canvas/WebGL support.
const hookSource = await readFile(new URL('../src/useScrollMotion.js', import.meta.url), 'utf8');
const hookCode = hookSource.replace(/^import .*;$/gm, '').replace('export function useScrollMotion', 'function useScrollMotion');
let hookCleanup, changeMotion, active = 0, clears = 0;
const preference = { matches: false, addEventListener(_, fn) { changeMotion = fn; }, removeEventListener() {} };
const hookRoot = { querySelectorAll: () => [{ style: { removeProperty() { clears++; } } }] };
vm.runInNewContext(`${hookCode}\nuseScrollMotion({ current: root });`, {
  root: hookRoot, useEffect(fn) { hookCleanup = fn(); }, matchMedia: () => preference,
  ResizeObserver: class { observe() {} disconnect() {} },
  window: { ScrollCraft: { mount(root) {
    assert.equal(root, hookRoot);
    active++;
    return { layout() {}, destroy() { active--; } };
  } } },
});
assert.equal(active, 1, 'Page motion starts without any WebGL context');
changeMotion();
assert.equal(active, 1, 'Remount never duplicates the engine');
preference.matches = true;
changeMotion();
assert.equal(active, 0, 'Reduced motion stops page animation');
preference.matches = false;
changeMotion();
assert.equal(active, 1);
hookCleanup();
assert.equal(active, 0);
assert.ok(clears >= 4, 'Inline parallax styles are cleared on teardown/preferences');
console.log('Page motion checks passed: GPU independence, preferences, single engine, cleanup.');
