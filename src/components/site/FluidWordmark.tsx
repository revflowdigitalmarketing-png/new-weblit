import { useEffect, useRef, useState } from "react";
import { Texture } from "ogl";
import {
  FLUID_DEFAULTS,
  hexToRgb,
  startFluid,
  type FluidScene,
  type FluidSettings,
} from "@/components/site/FluidBars";

const MARK = {
  text: "WEBLIT",
  font: '600 400px "Inter Tight"',
  /** letter spacing as a share of the font size */
  tracking: -0.045,
  /** share of the footer width the word spans */
  span: 0.94,
  /** share of the word's height left visible (the rest is cropped by the bottom edge) */
  visible: 0.84,
  green: "#3dc072",
  black: "#030503",
  bg: "#060805",
};

/** Fallback aspect (width / cap height) until the real one is measured in the browser. */
export const WORDMARK_DEFAULT_ASPECT = 4.25;

/** Draws WEBLIT in Inter Tight onto a canvas, tightly cropped to the glyphs. */
async function drawWordmark(): Promise<{ canvas: HTMLCanvasElement; aspect: number }> {
  try {
    await document.fonts.load(MARK.font, MARK.text);
  } catch {
    /* fall back to whatever font is available */
  }
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  const setup = () => {
    ctx.font = MARK.font;
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${MARK.tracking * 400}px`;
    ctx.textBaseline = "alphabetic";
  };
  setup();
  const m = ctx.measureText(MARK.text);
  const w = Math.ceil(m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
  const h = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
  c.width = w + 4;
  c.height = h + 4;
  setup();
  ctx.fillStyle = "#fff";
  ctx.fillText(
    MARK.text,
    Math.ceil(m.actualBoundingBoxLeft) + 2,
    Math.ceil(m.actualBoundingBoxAscent) + 2,
  );
  return { canvas: c, aspect: c.width / c.height };
}

/**
 * Whole-footer scene: dark background with the wordmark at the bottom, black
 * at the left and right ends with green through the centre letters, blurring toward the
 * cropped bottom edge. The fluid ripples across the whole footer.
 */
const footerScene = /* glsl */ `
uniform sampler2D uMark;
uniform float uAspect, uSpan, uVisible;
uniform vec3 uGreen, uBlack, uBg;

float markAt(vec2 px, vec2 o, vec2 sz) {
  vec2 q = (px - o) / sz;
  if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0) return 0.0;
  return texture2D(uMark, vec2(q.x, 1.0 - q.y)).a;
}

vec3 scene(vec2 uv) {
  vec2 px = vec2(uv.x * uRes.x, (1.0 - uv.y) * uRes.y);
  vec2 sz = vec2(uRes.x * uSpan, uRes.x * uSpan / uAspect);
  vec2 o = vec2((uRes.x - sz.x) * 0.5, uRes.y - sz.y * uVisible);
  if (px.y < o.y - sz.y * 0.2) return uBg;
  float k = clamp((px.y - o.y) / sz.y, 0.0, 1.0);
  float r = smoothstep(0.3, 1.0, k) * sz.y * 0.16;
  float a = 0.0;
  float wsum = 0.0;
  for (int i = -10; i <= 10; i++) {
    float t = float(i) / 10.0;
    float w = exp(-t * t * 2.5);
    a += markAt(px + vec2(0.0, t * r), o, sz) * w;
    a += markAt(px + vec2(t * r * 0.45, t * r * 0.6), o, sz) * w * 0.5;
    a += markAt(px + vec2(-t * r * 0.45, t * r * 0.6), o, sz) * w * 0.5;
    wsum += w * 2.0;
  }
  a /= wsum;
  // black at the left and right ends (W, T), green through the centre letters (E B L)
  float kx = clamp((px.x - o.x) / sz.x, 0.0, 1.0);
  float g = exp(-pow((kx - 0.5) / 0.24, 2.0));
  vec3 ink = mix(uBlack, uGreen, g);
  return mix(uBg, ink, a);
}
`;

function makeScene(onAspect: (a: number) => void): FluidScene {
  return {
    code: footerScene,
    uniforms: (gl) => {
      const tex = new Texture(gl, { generateMipmaps: false });
      const u = {
        uMark: { value: tex },
        uAspect: { value: WORDMARK_DEFAULT_ASPECT },
        uSpan: { value: MARK.span },
        uVisible: { value: MARK.visible },
        uGreen: { value: hexToRgb(MARK.green) },
        uBlack: { value: hexToRgb(MARK.black) },
        uBg: { value: hexToRgb(MARK.bg) },
      };
      void drawWordmark().then(({ canvas, aspect }) => {
        tex.image = canvas;
        u.uAspect.value = aspect;
        onAspect(aspect);
      });
      return u;
    },
  };
}

/** Space the wordmark occupies at the bottom of the footer. */
export function WordmarkSpacer({ aspect }: { aspect: number }) {
  return <div aria-hidden style={{ aspectRatio: `${aspect / MARK.span / MARK.visible}` }} />;
}

/** CSS fallback (touch, reduced motion, no WebGL): same word, gradient and blur. */
function StaticWordmark({ aspect }: { aspect: number }) {
  const word =
    "absolute left-[3%] top-0 w-[94%] select-none whitespace-nowrap text-center font-semibold leading-none tracking-[-0.045em] text-transparent bg-[linear-gradient(90deg,#030503_3%,#3dc072_50%,#030503_97%)] bg-clip-text";
  // cap height of Inter Tight is ~0.73em; size the word so it spans 94% of the width
  const fontSize = `${(94 / aspect / 0.73).toFixed(2)}vw`;
  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden">
      <WordmarkSpacer aspect={aspect} />
      {[0, 1].map((i) => (
        <span
          key={i}
          className={`${word} ${i ? "blur-[8px] sm:blur-[16px]" : ""}`}
          style={{
            fontSize,
            marginTop: "-0.13em",
            maskImage: i
              ? "linear-gradient(transparent 30%, #000 70%)"
              : "linear-gradient(#000 35%, transparent 75%)",
          }}
        >
          {MARK.text}
        </span>
      ))}
    </div>
  );
}

/**
 * Footer background: the liquid-glass cursor effect across the whole footer,
 * with the big wordmark at the bottom. Content sits on top and stays crisp.
 */
export function FooterFluid({
  settings,
  aspect,
  onAspect,
}: {
  settings?: Partial<FluidSettings>;
  aspect: number;
  onAspect: (a: number) => void;
}) {
  const [webgl, setWebgl] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfgRef = useRef({ ...FLUID_DEFAULTS, ...settings });
  cfgRef.current = { ...FLUID_DEFAULTS, ...settings };
  const onAspectRef = useRef(onAspect);
  onAspectRef.current = onAspect;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const el = ref.current;
    if (reduce || !fine || !el) {
      void drawWordmark().then(({ aspect }) => onAspectRef.current(aspect));
      return;
    }
    const stop = startFluid(
      el,
      cfgRef,
      makeScene((a) => onAspectRef.current(a)),
    );
    if (!stop) return;
    setWebgl(true);
    return stop;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundColor: MARK.bg }}
    >
      {webgl ? null : <StaticWordmark aspect={aspect} />}
    </div>
  );
}
