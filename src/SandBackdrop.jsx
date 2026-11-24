import React, { useEffect, useRef } from "react";

const vertex = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Stable grain identities and slow wind follow SalatBuddy's GlassBlobShader.
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float progress;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float swell = 0.5 - 0.5 * cos(progress * 0.65);
  float wind = time * 0.08 + progress * 1.8;
  float aspect = resolution.x / resolution.y;
  float x = uv.x * min(aspect, 2.0);
  float ridge = 0.07 + swell * 0.06 + 0.03 * sin(x * 4.0 + wind)
    + 0.015 * sin(x * 8.0 - wind * 0.6);
  float back = 0.12 + swell * 0.08 + 0.04 * sin(x * 3.4 - wind * 0.5 + 2.0);
  float farSand = 1.0 - smoothstep(back - 0.015, back + 0.035, uv.y);
  float nearSand = 1.0 - smoothstep(ridge - 0.01, ridge + 0.025, uv.y);
  float ripples = sin(uv.y * 160.0 + noise(vec2(x * 4.0, uv.y * 8.0)) * 8.0 - wind);
  vec2 field = vec2(gl_FragCoord.x - wind * 28.0, gl_FragCoord.y + wind * 5.0);
  vec2 cell = floor(field / 3.0);
  vec2 jitter = vec2(hash(cell), hash(cell + 17.0));
  float grain = 1.0 - smoothstep(0.10, 0.30, length(fract(field / 3.0) - jitter));
  float texture = noise(field * 0.3) * 0.10 + ripples * 0.025 + grain * 0.12;
  vec3 paper = vec3(0.992, 0.988, 0.996);
  vec3 color = mix(paper, vec3(0.86, 0.81, 0.93), farSand * 0.60);
  color = mix(color, vec3(0.72, 0.63, 0.85) + texture, nearSand * 0.62);
  // Keep a quiet reading area; sand is strongest along the lower edges.
  float edges = 0.35 + 0.65 * pow(abs(uv.x - 0.5) * 2.0, 1.5);
  color = mix(paper, color, edges);
  gl_FragColor = vec4(color, 1.0);
}
`;

export function SandBackdrop() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) return; // The CSS sand silhouette remains when WebGL is unavailable.
    const shaders = [];
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    let frame = 0;
    let lost = false;
    let lastFrame = 0;
    let elapsed = 0;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const dispose = () => {
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
    for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]]) {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        canvas.style.opacity = "0";
        dispose();
        return;
      }
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.opacity = "0";
      dispose();
      return;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(["resolution", "time", "progress"].map((key) => [key, gl.getUniformLocation(program, key)]));
    const draw = () => {
      if (lost) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, motion.matches ? 0 : elapsed);
      // Viewport units keep the wind moving throughout the page, including the footer.
      gl.uniform1f(uniforms.progress, motion.matches ? 0 : window.scrollY / Math.max(window.innerHeight, 1));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now) => {
      if (now - lastFrame >= 1000 / 30) {
        elapsed += Math.min((now - lastFrame) / 1000, 0.05);
        lastFrame = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (!motion.matches && !document.hidden && !lost) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(tick);
      }
      draw();
    };
    const resize = new ResizeObserver(() => {
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      draw();
    });
    const contextLost = (event) => {
      event.preventDefault();
      lost = true;
      canvas.style.opacity = "0";
      sync();
    };
    resize.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    canvas.addEventListener("webglcontextlost", contextLost);
    sync();
    return () => {
      resize.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", contextLost);
      dispose();
    };
  }, []);
  return <canvas ref={canvasRef} className="sand-backdrop" aria-hidden="true" />;
}
