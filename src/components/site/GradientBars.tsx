import { useMemo } from "react";

/**
 * Port of the Framer "Gradient bars background" component (G_bars_background),
 * same layout, keyframes and timing, in WEBLIT's dark greens.
 * The WebGL hero background (FluidBars) draws the identical scene from these settings.
 */
export const BARS = {
  numBars: 16,
  /** Bar height in px; capped at the container height (min(100%, h)). */
  barHeight: 1000,
  gap: 4,
  padding: 6,
  gradientFrom: "#06150a", // top: near-black green
  gradientTo: "#1d6e3b", // bottom: dark green
  backgroundColor: "#040805",
  /** seconds per float cycle */
  duration: 5,
  /** 0..100, as in the original */
  intensity: 60,
  /** seconds between neighbouring bars, which makes the light sweep across */
  stagger: 0.08,
} as const;

export function barsDerived(b = BARS) {
  const f = Math.max(0, Math.min(100, b.intensity)) / 100;
  return {
    translatePercent: 4 + f * 26,
    minOpacity: 0.15 + (1 - f) * 0.35,
    maxOpacity: Math.min(1, 0.35 + f * 0.65),
  };
}

const KEYFRAMES = `
@keyframes gbFloatY {
  0% { transform: translateY(var(--gb-translate)); opacity: var(--gb-min-opacity); }
  50% { transform: translateY(calc(var(--gb-translate) * -1)); opacity: var(--gb-max-opacity); }
  100% { transform: translateY(var(--gb-translate)); opacity: var(--gb-min-opacity); }
}`;

/** CSS version: first paint, touch devices (animated) and reduced motion (still). */
export function GradientBars({ animate = true }: { animate?: boolean }) {
  const d = barsDerived();
  const bars = useMemo(
    () =>
      Array.from({ length: BARS.numBars }, (_, i) => {
        const base = 0.25 + (i / BARS.numBars) * 0.5;
        const still = Math.min(1, Math.max(base, (d.minOpacity + d.maxOpacity) / 2));
        return (
          <div
            key={i}
            style={
              {
                flex: "1 1 4px",
                minWidth: 4,
                height: `min(100%, ${BARS.barHeight}px)`,
                background: `linear-gradient(180deg, ${BARS.gradientFrom}, ${BARS.gradientTo})`,
                opacity: animate ? base : still,
                animation: animate
                  ? `gbFloatY ${BARS.duration}s ease-in-out ${BARS.stagger * i}s infinite`
                  : "none",
                willChange: animate ? "transform, opacity" : undefined,
                "--gb-translate": `${d.translatePercent}%`,
                "--gb-min-opacity": `${d.minOpacity}`,
                "--gb-max-opacity": `${d.maxOpacity}`,
              } as React.CSSProperties
            }
          />
        );
      }),
    [animate, d.maxOpacity, d.minOpacity, d.translatePercent],
  );

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: BARS.backgroundColor }}
    >
      <style>{KEYFRAMES}</style>
      <div
        className="absolute inset-0 flex flex-row items-center justify-center"
        style={{ gap: BARS.gap, padding: BARS.padding }}
      >
        {bars}
      </div>
    </div>
  );
}
