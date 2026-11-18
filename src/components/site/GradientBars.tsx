/**
 * Hero background scene: thin, tightly packed vertical lines along the bottom.
 * The lines never move; a soft band of visibility sweeps from left to right,
 * so they seem to rise and fall. The WebGL background (FluidBars) draws the
 * same scene from these settings; this CSS version is the fallback.
 */
export const LINES = {
  /** px from one line to the next */
  pitch: 36,
  /** px line thickness */
  width: 30,
  /** share of the hero height the tallest lines reach */
  reach: 0.62,
  /** share of the tallest height the lines never drop below */
  floor: 0.16,
  /** width of the visible band, as a share of the hero width */
  band: 0.32,
  /** seconds for the band to travel across */
  duration: 9,
  colorTip: "#0d3a1d", // where a line fades out
  colorBase: "#2fa35c", // bright green at the bottom
  backgroundColor: "#040805",
} as const;

const KEYFRAMES = `
@keyframes linesSweep {
  from { -webkit-mask-position: -60vw 100%, 0 0; mask-position: -60vw 100%, 0 0; }
  to { -webkit-mask-position: 100vw 100%, 0 0; mask-position: 100vw 100%, 0 0; }
}`;

/** CSS version: first paint, touch devices (sweeping) and reduced motion (still). */
export function GradientBars({ animate = true }: { animate?: boolean }) {
  const L = LINES;
  const band = `${Math.round(L.band * 190)}vw`;
  const mask = [
    `radial-gradient(ellipse 50% 100% at 50% 100%, #000 0%, rgba(0,0,0,.6) 50%, transparent 85%)`,
    `linear-gradient(to top, #000 0%, transparent ${Math.round(L.floor * 100 + 6)}%)`,
  ].join(", ");
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: L.backgroundColor }}
    >
      <style>{KEYFRAMES}</style>
      <div
        className="absolute inset-x-0 bottom-0"
        style={
          {
            height: `${L.reach * 100}%`,
            maskImage: mask,
            WebkitMaskImage: mask,
            maskSize: `${band} 100%, 100% 100%`,
            WebkitMaskSize: `${band} 100%, 100% 100%`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "10vw 100%, 0 0",
            WebkitMaskPosition: "10vw 100%, 0 0",
            animation: animate ? `linesSweep ${L.duration}s linear infinite` : "none",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(90deg, currentColor 0 ${L.width}px, transparent ${L.width}px ${L.pitch}px)`,
            color: L.colorBase,
            maskImage: "linear-gradient(to top, #000 0%, rgba(0,0,0,.45) 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, #000 0%, rgba(0,0,0,.45) 45%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
