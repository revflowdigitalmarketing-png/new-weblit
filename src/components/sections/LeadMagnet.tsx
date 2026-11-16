import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { leadMagnet } from "@/content/copy";

/**
 * Lead magnet: the Converting Site Blueprint PDF, centred on a static green
 * streaked-glass panel. The cover is page 1 of the PDF.
 */
export function LeadMagnet() {
  return (
    <section aria-labelledby="blueprint-heading" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate mx-auto max-w-[1180px] overflow-hidden rounded-[2rem] px-5 py-14 text-center sm:px-12 sm:py-20">
            <GlassBackdrop />

            <h2 id="blueprint-heading" className="text-display-lg">
              {leadMagnet.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-[30ch] text-lg font-medium leading-snug tracking-[-0.03em] text-brand sm:text-xl">
              {leadMagnet.subheading}
            </p>
            <p className="mx-auto mt-4 max-w-[32rem] text-sm leading-relaxed text-ink/70 sm:text-base">
              {leadMagnet.description}
            </p>

            {/* The PDF, centred */}
            <a
              href={leadMagnet.href}
              target="_blank"
              rel="noopener"
              aria-label={`${leadMagnet.cta} (PDF)`}
              className="group relative mx-auto mt-10 block w-full max-w-[560px] sm:mt-12"
            >
              {/* page stack behind the cover */}
              <span
                aria-hidden
                className="absolute inset-x-[4%] -bottom-3 top-3 rounded-xl bg-white/[0.08] backdrop-blur-sm"
              />
              <span
                aria-hidden
                className="absolute inset-x-[8%] -bottom-6 top-6 rounded-xl bg-white/[0.05]"
              />
              <picture>
                <source srcSet="/brand/blueprint-cover.webp" type="image/webp" />
                <img
                  src="/brand/blueprint-cover.jpg"
                  width={1400}
                  height={922}
                  loading="lazy"
                  alt="The Converting Site Blueprint by WEBLIT, cover"
                  className="relative w-full rounded-xl shadow-[0_40px_80px_-30px_oklch(0_0_0/0.8)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5"
                />
              </picture>
            </a>

            <a
              href={leadMagnet.href}
              target="_blank"
              rel="noopener"
              className="group mt-14 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-white sm:w-auto"
            >
              {leadMagnet.cta}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Static green glass: soft glows behind a field of vertical frosted streaks. */
function GlassBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[oklch(0.12_0.015_160)]"
    >
      {/* glows */}
      <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[55%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.55_0.12_165/0.85),transparent)] blur-3xl" />
      <div className="absolute -bottom-[25%] -right-[10%] h-[75%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.75_0.15_158/0.75),transparent)] blur-3xl" />
      <div className="absolute bottom-[-30%] left-[20%] h-[55%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.45_0.11_150/0.7),transparent)] blur-3xl" />
      {/* vertical frosted streaks: three stripe rhythms layered so they never repeat evenly */}
      <div className="absolute inset-0 opacity-90 mix-blend-overlay blur-[1.5px] [background:repeating-linear-gradient(90deg,oklch(1_0_0/0)_0px,oklch(1_0_0/0.16)_5px,oklch(1_0_0/0)_11px,oklch(1_0_0/0)_23px),repeating-linear-gradient(90deg,oklch(0_0_0/0)_0px,oklch(0_0_0/0.35)_9px,oklch(0_0_0/0)_17px,oklch(0_0_0/0)_37px),repeating-linear-gradient(90deg,oklch(1_0_0/0)_0px,oklch(1_0_0/0.1)_14px,oklch(1_0_0/0)_29px,oklch(1_0_0/0)_61px)]" />
      {/* darken the centre slightly so the cover and text sit clearly */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,oklch(0.1_0.01_160/0.55),transparent)]" />
    </div>
  );
}
