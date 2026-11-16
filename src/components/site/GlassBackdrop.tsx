/**
 * Static green glass as the section background: glows in the corners behind a
 * field of vertical frosted streaks, kept dark through the middle so the
 * green lines read at the corners.
 */
export function GlassBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-paper">
      {/* corner glows */}
      <div className="absolute -left-[12%] -top-[25%] h-[75%] w-[45%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.55_0.12_160/0.9),transparent)] blur-3xl" />
      <div className="absolute -right-[12%] -top-[25%] h-[65%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.45_0.11_152/0.85),transparent)] blur-3xl" />
      <div className="absolute -bottom-[25%] -left-[10%] h-[70%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.5_0.12_150/0.8),transparent)] blur-3xl" />
      <div className="absolute -bottom-[25%] -right-[12%] h-[80%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.75_0.15_156/0.8),transparent)] blur-3xl" />
      {/* vertical frosted streaks: three stripe rhythms layered so they never repeat evenly */}
      <div className="absolute inset-0 opacity-90 mix-blend-overlay blur-[1.5px] [background:repeating-linear-gradient(90deg,oklch(1_0_0/0)_0px,oklch(1_0_0/0.16)_5px,oklch(1_0_0/0)_11px,oklch(1_0_0/0)_23px),repeating-linear-gradient(90deg,oklch(0_0_0/0)_0px,oklch(0_0_0/0.35)_9px,oklch(0_0_0/0)_17px,oklch(0_0_0/0)_37px),repeating-linear-gradient(90deg,oklch(1_0_0/0)_0px,oklch(1_0_0/0.1)_14px,oklch(1_0_0/0)_29px,oklch(1_0_0/0)_61px)]" />
      {/* keep the middle dark so the lines sit at the corners */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_65%_at_50%_50%,oklch(0.13_0.009_134.1/0.95),oklch(0.13_0.009_134.1/0.6)_55%,transparent_85%)]" />
      {/* soft hand-off into the sections above and below */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-paper to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}
