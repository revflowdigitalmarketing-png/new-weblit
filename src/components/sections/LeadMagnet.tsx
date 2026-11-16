import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { leadMagnet } from "@/content/copy";

/**
 * Lead magnet: the Converting Site Blueprint PDF, centred on a full-width
 * green streaked-glass background. The cover is page 1 of the PDF.
 */
export function LeadMagnet() {
  return (
    <section
      aria-labelledby="blueprint-heading"
      className="relative isolate overflow-hidden py-20 text-center sm:py-28"
    >
      <GlassBackdrop />

      <Container>
        <Reveal>
          <h2 id="blueprint-heading" className="text-display-lg">
            {leadMagnet.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[34ch] text-base leading-relaxed text-white sm:text-lg">
            {leadMagnet.subheading}
          </p>
        </Reveal>

        {/* The PDF, centred, in a glass frame */}
        <Reveal delay={100}>
          <a
            href={leadMagnet.href}
            target="_blank"
            rel="noopener"
            aria-label={`${leadMagnet.cta} (PDF)`}
            className="group mx-auto mt-10 block w-full max-w-[580px] rounded-[1.25rem] border border-white/25 bg-white/[0.06] p-2 backdrop-blur-md transition-colors duration-500 hover:border-white/40 sm:mt-12 sm:p-2.5"
          >
            <picture>
              <source srcSet="/brand/blueprint-cover.webp" type="image/webp" />
              <img
                src="/brand/blueprint-cover.jpg"
                width={1400}
                height={922}
                loading="lazy"
                alt="The Converting Site Blueprint by WEBLIT, cover"
                className="block w-full rounded-xl"
              />
            </picture>
          </a>
        </Reveal>

        <Reveal delay={160}>
          <a
            href={leadMagnet.href}
            target="_blank"
            rel="noopener"
            className="group mt-10 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-white sm:w-auto"
          >
            {leadMagnet.cta}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Static green glass as the section background: glows in the corners behind a
 * field of vertical frosted streaks, kept dark through the middle so the
 * green lines read at the corners.
 */
function GlassBackdrop() {
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
