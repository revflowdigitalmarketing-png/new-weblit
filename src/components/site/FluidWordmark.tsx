import { useEffect, useRef, useState } from "react";
import { Texture } from "ogl";
import {
  FLUID_DEFAULTS,
  hexToRgb,
  startFluid,
  type FluidScene,
  type FluidSettings,
} from "@/components/site/FluidBars";

const WORDMARK = {
  src: "/brand/weblit-wordmark-white.png",
  aspect: 1623 / 359,
  /** share of the band width the wordmark spans */
  span: 0.94,
  fg: "#f4f6f3",
  bg: "#060805",
};

/** Wordmark: sharp at the top, blurring more and more toward the cropped bottom edge. */
const wordmarkScene = /* glsl */ `
uniform sampler2D uLogo;
uniform float uAspect, uSpan;
uniform vec3 uFg, uBg;

float logoAt(vec2 px, vec2 o, vec2 sz) {
  vec2 q = (px - o) / sz;
  if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0) return 0.0;
  return texture2D(uLogo, vec2(q.x, 1.0 - q.y)).a;
}

vec3 scene(vec2 uv) {
  vec2 px = vec2(uv.x * uRes.x, (1.0 - uv.y) * uRes.y);
  vec2 sz = vec2(uRes.x * uSpan, uRes.x * uSpan / uAspect);
  vec2 o = vec2((uRes.x - sz.x) * 0.5, uRes.y * 0.1);
  float k = clamp((px.y - o.y) / sz.y, 0.0, 1.0);
  float r = smoothstep(0.3, 1.0, k) * sz.y * 0.16;   // blur radius in px
  float a = 0.0;
  float wsum = 0.0;
  // 2D gaussian-ish blur, taller than wide, so the bottom smears downward
  for (int i = -10; i <= 10; i++) {
    float t = float(i) / 10.0;
    float w = exp(-t * t * 2.5);
    a += logoAt(px + vec2(0.0, t * r), o, sz) * w;
    a += logoAt(px + vec2(t * r * 0.45, t * r * 0.6), o, sz) * w * 0.5;
    a += logoAt(px + vec2(-t * r * 0.45, t * r * 0.6), o, sz) * w * 0.5;
    wsum += w * 2.0;
  }
  a /= wsum;
  return mix(uBg, uFg, a);
}
`;

function makeScene(): FluidScene {
  return {
    code: wordmarkScene,
    uniforms: (gl) => {
      const tex = new Texture(gl, { generateMipmaps: false });
      const img = new Image();
      img.onload = () => {
        tex.image = img;
      };
      img.src = WORDMARK.src;
      return {
        uLogo: { value: tex },
        uAspect: { value: WORDMARK.aspect },
        uSpan: { value: WORDMARK.span },
        uFg: { value: hexToRgb(WORDMARK.fg) },
        uBg: { value: hexToRgb(WORDMARK.bg) },
      };
    },
  };
}

/** CSS fallback: a sharp copy masked to the top, a blurred copy masked to the bottom. */
function StaticWordmark() {
  const img = "absolute left-[3%] top-[10%] w-[94%] max-w-none select-none";
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: WORDMARK.bg }}>
      <img
        src={WORDMARK.src}
        alt=""
        draggable={false}
        className={img}
        style={{ maskImage: "linear-gradient(#000 35%, transparent 75%)" }}
      />
      <img
        src={WORDMARK.src}
        alt=""
        draggable={false}
        className={`${img} blur-[10px] sm:blur-[18px]`}
        style={{ maskImage: "linear-gradient(transparent 30%, #000 70%)" }}
      />
    </div>
  );
}

/**
 * Big footer wordmark with the same liquid-glass cursor effect as the hero.
 * Touch devices and reduced motion get the static version.
 */
export function FluidWordmark({ settings }: { settings?: Partial<FluidSettings> }) {
  const [webgl, setWebgl] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfgRef = useRef({ ...FLUID_DEFAULTS, ...settings });
  cfgRef.current = { ...FLUID_DEFAULTS, ...settings };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const el = ref.current;
    if (reduce || !fine || !el) return;
    const stop = startFluid(el, cfgRef, makeScene());
    if (!stop) return;
    setWebgl(true);
    return stop;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative w-full"
      style={{ aspectRatio: `${WORDMARK.aspect / WORDMARK.span / 0.86}` }}
    >
      {webgl ? null : <StaticWordmark />}
    </div>
  );
}
