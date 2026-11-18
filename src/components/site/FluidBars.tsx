import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, RenderTarget, Triangle, type Texture } from "ogl";
import { GradientBars, LINES } from "@/components/site/GradientBars";

/**
 * Hero background: the thin-lines scene drawn in WebGL, distorted by a
 * fluid velocity field the cursor stirs (water / glass refraction with ripple
 * rings). Only this background distorts; text and UI sit on top untouched.
 *
 * Falls back to the CSS bars on touch devices, with reduced motion (still),
 * and wherever WebGL with float render targets isn't available.
 */
export type FluidSettings = {
  /** how far the image is pushed by the fluid (0..1+) */
  strength: number;
  /** cursor brush size (0..1, fraction of the short side) */
  radius: number;
  /** how quickly the distortion settles back (higher = faster) */
  dissipation: number;
  /** vorticity confinement: how much the fluid curls into swirls */
  swirl: number;
};

export const FLUID_DEFAULTS: FluidSettings = {
  strength: 0.6,
  radius: 0.25,
  dissipation: 1.6,
  swirl: 12,
};

type Mode = "css" | "css-still" | "webgl";

export function FluidBars({ settings }: { settings?: Partial<FluidSettings> }) {
  const [mode, setMode] = useState<Mode>("css");
  const wrapRef = useRef<HTMLDivElement>(null);
  const cfg = { ...FLUID_DEFAULTS, ...settings };
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce) return setMode("css-still");
    if (touch) return; // animated CSS bars, no distortion
    const wrap = wrapRef.current;
    if (!wrap) return;
    const stop = startFluid(wrap, cfgRef);
    if (stop) {
      setMode("webgl");
      return stop;
    }
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {mode !== "webgl" ? <GradientBars animate={mode === "css"} /> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- shaders */

const baseVertex = /* glsl */ `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main () {
  vUv = uv;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const clearShader = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`;

const splatShader = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + splat, 1.0);
}`;

const advectionShader = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = texture2D(uSource, coord) / (1.0 + dissipation * dt);
  gl_FragColor.a = 1.0;
}`;

const divergenceShader = /* glsl */ `
precision mediump float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const curlShader = /* glsl */ `
precision mediump float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;

const vorticityShader = /* glsl */ `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture2D(uVelocity, vUv).xy + force * dt;
  vel = clamp(vel, -1000.0, 1000.0);
  gl_FragColor = vec4(vel, 0.0, 1.0);
}`;

const pressureShader = /* glsl */ `
precision mediump float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`;

const gradientSubtractShader = /* glsl */ `
precision mediump float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

/** Draws the bars scene (same maths as the CSS port) at distorted UVs. */
const displayShader = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
uniform vec2 uRes;          // CSS px
uniform float uTime;
uniform float uStrength;
uniform float uPitch, uLineW, uReach, uFloor, uBand, uDur;
uniform vec3 uTip, uBase, uBg;

// Thin static lines along the bottom; a band of visibility sweeps left to right.
vec3 scene(vec2 uv) {
  vec2 px = vec2(uv.x * uRes.x, (1.0 - uv.y) * uRes.y);
  float lx = mod(px.x, uPitch);
  float cov = clamp(min(lx, uLineW - lx) + 0.5, 0.0, 1.0);
  float yb = uRes.y - px.y;              // px up from the bottom edge
  float area = uRes.y * uReach;

  float c = fract(uTime / uDur) * 1.6 - 0.3; // band centre: -0.3 -> 1.3 of the width
  float d = (uv.x - c) / uBand;
  float bump = exp(-d * d);
  float h = area * (uFloor + (1.0 - uFloor) * bump);

  float v = clamp(1.0 - yb / h, 0.0, 1.0);
  float a = pow(v, 1.6) * cov;
  vec3 line = mix(uTip, uBase, v);
  // faint light behind the tallest lines
  float glow = exp(-d * d * 0.8) * clamp(1.0 - yb / area, 0.0, 1.0) * 0.08;
  return uBg + uBase * glow + line * a;
}

void main () {
  // soft 5-tap sample so the surface reads as water, not noise
  vec2 t = texelSize * 1.5;
  vec2 vel = texture2D(uVelocity, vUv).xy * 0.4
    + texture2D(uVelocity, vUv + vec2(t.x, 0.0)).xy * 0.15
    + texture2D(uVelocity, vUv - vec2(t.x, 0.0)).xy * 0.15
    + texture2D(uVelocity, vUv + vec2(0.0, t.y)).xy * 0.15
    + texture2D(uVelocity, vUv - vec2(0.0, t.y)).xy * 0.15;
  // let the last tiny eddies fade out completely, back to the clean image
  vel *= smoothstep(6.0, 40.0, length(vel));
  vec2 off = vel * uStrength * 0.00045;
  // refraction: split channels slightly, like light through water / glass
  float r = scene(vUv - off * 1.12).r;
  float g = scene(vUv - off).g;
  float b = scene(vUv - off * 0.88).b;
  vec3 col = vec3(r, g, b);
  // ripple rings where the fluid moves
  float m = length(vel);
  float ring = pow(0.5 + 0.5 * sin(m * 0.045), 8.0) * clamp(m * 0.0025, 0.0, 1.0);
  col += ring * 0.22 * vec3(0.75, 1.0, 0.85);
  gl_FragColor = vec4(col, 1.0);
}`;

/* ------------------------------------------------------------- simulation */

const NO_TEX = null as Texture | null;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** Starts the WebGL background inside `wrap`. Returns a cleanup fn, or null if unsupported. */
function startFluid(wrap: HTMLDivElement, cfgRef: { current: FluidSettings }): (() => void) | null {
  let renderer: Renderer;
  try {
    renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      alpha: false,
      antialias: false,
      depth: false,
    });
  } catch {
    return null;
  }
  const gl = renderer.gl;
  const isWebgl2 = renderer.isWebgl2;
  const halfFloat = isWebgl2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : renderer.extensions["OES_texture_half_float"]?.HALF_FLOAT_OES;
  const linearOk = isWebgl2 || !!renderer.extensions["OES_texture_half_float_linear"];
  if (!halfFloat || !linearOk) return null;

  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  wrap.appendChild(canvas);

  const SIM_RES = 128;
  const PRESSURE_ITER = 20;
  const triangle = new Triangle(gl);

  const rtOpts = (w: number, h: number, single: boolean) => ({
    width: w,
    height: h,
    type: halfFloat,
    format: single && isWebgl2 ? (gl as WebGL2RenderingContext).RED : gl.RGBA,
    internalFormat: isWebgl2
      ? single
        ? (gl as WebGL2RenderingContext).R16F
        : (gl as WebGL2RenderingContext).RGBA16F
      : gl.RGBA,
    minFilter: gl.LINEAR,
    depth: false,
  });

  const makeDouble = (w: number, h: number, single: boolean) => {
    const fbo = {
      read: new RenderTarget(gl, rtOpts(w, h, single)),
      write: new RenderTarget(gl, rtOpts(w, h, single)),
      swap() {
        const t = fbo.read;
        fbo.read = fbo.write;
        fbo.write = t;
      },
    };
    return fbo;
  };

  let simW = SIM_RES;
  let simH = SIM_RES;
  let velocity = makeDouble(simW, simH, false);
  let pressure = makeDouble(simW, simH, true);
  let divergence = new RenderTarget(gl, rtOpts(simW, simH, true));
  let curl = new RenderTarget(gl, rtOpts(simW, simH, true));
  const texel = { value: [1 / simW, 1 / simH] };

  const prog = <T extends Record<string, { value: unknown }>>(fragment: string, u: T) => ({
    mesh: new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment,
        uniforms: { texelSize: texel, ...u },
        depthTest: false,
        depthWrite: false,
      }),
    }),
    u,
  });

  const clear = prog(clearShader, { uTexture: { value: NO_TEX }, value: { value: 0.8 } });
  const splat = prog(splatShader, {
    uTarget: { value: NO_TEX },
    aspectRatio: { value: 1 },
    color: { value: [0, 0, 0] },
    point: { value: [0, 0] },
    radius: { value: 0.002 },
  });
  const advection = prog(advectionShader, {
    uVelocity: { value: NO_TEX },
    uSource: { value: NO_TEX },
    dt: { value: 0.016 },
    dissipation: { value: 1 },
  });
  const divergenceMesh = prog(divergenceShader, { uVelocity: { value: NO_TEX } });
  const curlMesh = prog(curlShader, { uVelocity: { value: NO_TEX } });
  const vorticity = prog(vorticityShader, {
    uVelocity: { value: NO_TEX },
    uCurl: { value: NO_TEX },
    curl: { value: 20 },
    dt: { value: 0.016 },
  });
  const pressureMesh = prog(pressureShader, {
    uPressure: { value: NO_TEX },
    uDivergence: { value: NO_TEX },
  });
  const gradSub = prog(gradientSubtractShader, {
    uPressure: { value: NO_TEX },
    uVelocity: { value: NO_TEX },
  });

  const display = prog(displayShader, {
    uVelocity: { value: NO_TEX },
    uRes: { value: [1, 1] },
    uTime: { value: 0 },
    uStrength: { value: 1 },
    uPitch: { value: LINES.pitch as number },
    uLineW: { value: LINES.width as number },
    uReach: { value: LINES.reach },
    uFloor: { value: LINES.floor },
    uBand: { value: LINES.band },
    uDur: { value: LINES.duration },
    uTip: { value: hexToRgb(LINES.colorTip) },
    uBase: { value: hexToRgb(LINES.colorBase) },
    uBg: { value: hexToRgb(LINES.backgroundColor) },
  });

  const run = (p: { mesh: Mesh }, target: RenderTarget) =>
    renderer.render({ scene: p.mesh, target, clear: false });

  let cssW = 1;
  let cssH = 1;
  const resize = () => {
    const r = wrap.getBoundingClientRect();
    cssW = Math.max(1, r.width);
    cssH = Math.max(1, r.height);
    renderer.setSize(cssW, cssH);
    // sim grid keeps the aspect ratio, short side = SIM_RES
    const aspect = cssW / cssH;
    const w = aspect >= 1 ? Math.round(SIM_RES * aspect) : SIM_RES;
    const h = aspect >= 1 ? SIM_RES : Math.round(SIM_RES / aspect);
    if (w !== simW || h !== simH) {
      simW = w;
      simH = h;
      velocity = makeDouble(simW, simH, false);
      pressure = makeDouble(simW, simH, true);
      divergence = new RenderTarget(gl, rtOpts(simW, simH, true));
      curl = new RenderTarget(gl, rtOpts(simW, simH, true));
      texel.value = [1 / simW, 1 / simH];
    }
    display.u.uRes.value = [cssW, cssH];
    const desktop = window.innerWidth >= 768;
    display.u.uPitch.value = desktop ? LINES.pitchDesktop : LINES.pitch;
    display.u.uLineW.value = desktop ? LINES.widthDesktop : LINES.width;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(wrap);

  // pointer -> splats
  const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, has: false };
  const onMove = (e: PointerEvent) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      pointer.has = false;
      return;
    }
    if (pointer.has) {
      pointer.dx = (x - pointer.x) * 6000;
      pointer.dy = (y - pointer.y) * 6000;
      pointer.moved = true;
    }
    pointer.x = x;
    pointer.y = y;
    pointer.has = true;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const step = (dt: number) => {
    const cfg = cfgRef.current;
    const aspect = cssW / cssH;

    if (pointer.moved) {
      pointer.moved = false;
      const u = splat.u;
      u.uTarget.value = velocity.read.texture;
      u.aspectRatio.value = aspect;
      u.point.value = [pointer.x, pointer.y];
      u.color.value = [pointer.dx, pointer.dy, 0];
      const rr = cfg.radius / 100;
      u.radius.value = aspect > 1 ? rr * aspect : rr;
      run(splat, velocity.write);
      velocity.swap();
    }

    curlMesh.u.uVelocity.value = velocity.read.texture;
    run(curlMesh, curl);

    const v = vorticity.u;
    v.uVelocity.value = velocity.read.texture;
    v.uCurl.value = curl.texture;
    v.curl.value = cfg.swirl;
    v.dt.value = dt;
    run(vorticity, velocity.write);
    velocity.swap();

    divergenceMesh.u.uVelocity.value = velocity.read.texture;
    run(divergenceMesh, divergence);

    clear.u.uTexture.value = pressure.read.texture;
    run(clear, pressure.write);
    pressure.swap();

    pressureMesh.u.uDivergence.value = divergence.texture;
    for (let i = 0; i < PRESSURE_ITER; i++) {
      pressureMesh.u.uPressure.value = pressure.read.texture;
      run(pressureMesh, pressure.write);
      pressure.swap();
    }

    gradSub.u.uPressure.value = pressure.read.texture;
    gradSub.u.uVelocity.value = velocity.read.texture;
    run(gradSub, velocity.write);
    velocity.swap();

    const a = advection.u;
    a.uVelocity.value = velocity.read.texture;
    a.uSource.value = velocity.read.texture;
    a.dt.value = dt;
    a.dissipation.value = cfg.dissipation;
    run(advection, velocity.write);
    velocity.swap();
  };

  // only animate while the hero is on screen and the tab is visible
  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible) loop();
  });
  io.observe(wrap);
  const onVis = () => {
    if (!document.hidden) loop();
  };
  document.addEventListener("visibilitychange", onVis);

  const start = performance.now();
  let last = start;
  let raf = 0;
  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    step(dt);
    const u = display.u;
    u.uVelocity.value = velocity.read.texture;
    u.uTime.value = (now - start) / 1000;
    u.uStrength.value = cfgRef.current.strength;
    renderer.render({ scene: display.mesh });
    raf = requestAnimationFrame(frame);
  };
  function loop() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  loop();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVis);
    canvas.remove();
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
