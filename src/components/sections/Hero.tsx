import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { hero } from "@/content/copy";

/** Split the heading after its first comma so it always sets in two lines. */
const [line1, line2] = (() => {
  const i = hero.heading.indexOf(", ");
  return i === -1 ? [hero.heading, ""] : [hero.heading.slice(0, i + 1), hero.heading.slice(i + 2)];
})();

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="p-2 sm:p-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
        <AuroraBackdrop />

        <Container className="relative flex min-h-[calc(100svh-1rem)] flex-col items-center justify-center pb-28 pt-28 text-center sm:min-h-[calc(100svh-1.5rem)] sm:pb-32 sm:pt-32">
          <Reveal>
            <h1
              id="hero-heading"
              className="mx-auto text-[clamp(0.95rem,5.1vw,2.5rem)] font-medium leading-[1.15] text-ink"
            >
              <span className="block whitespace-nowrap">{line1}</span>
              {line2 ? <span className="block whitespace-nowrap">{line2}</span> : null}
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mx-auto mt-4 max-w-[30rem] text-[0.8125rem] leading-relaxed text-ink/70 sm:text-[0.9375rem]">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8 w-full sm:w-auto">
            <ButtonLink
              to="/#start"
              variant="inverse"
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              {hero.cta}
            </ButtonLink>
          </Reveal>
        </Container>

        {/* badge sits in the white finish, after the reference */}
        <p className="absolute inset-x-0 bottom-6 z-10 px-4 text-center text-sm font-medium tracking-[-0.01em] text-paper/80 sm:bottom-8 sm:text-base">
          {hero.badge}
        </p>
      </div>
    </section>
  );
}

/**
 * Black sky with a slowly flowing green aurora that finishes clean into
 * bright white at the bottom edge, after the reference. Decorative only.
 */
function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-paper">
      {/* the glowing hill: deep emerald on the left, electric green through the middle, bright mint on the right */}
      <div className="flow-a absolute -bottom-[58%] left-1/2 h-[112%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,oklch(0.36_0.1_153)_0%,oklch(0.55_0.14_153)_26%,oklch(0.718_0.16_153)_52%,oklch(0.78_0.15_153)_74%,oklch(0.6_0.15_153)_100%)] blur-[42px] will-change-transform" />

      {/* saturated depth at the left edge, like the reference's indigo */}
      <div className="flow-b absolute -bottom-[10%] -left-[18%] h-[70%] w-[55%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.36_0.1_153/0.95),transparent_72%)] blur-3xl will-change-transform" />

      {/* electric highlight on the right */}
      <div className="flow-c absolute -right-[10%] bottom-[5%] h-[55%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.718_0.16_153/0.9),transparent_70%)] blur-3xl will-change-transform" />

      {/* white light core rising from the bottom */}
      <div className="flow-b absolute -bottom-[22%] left-1/2 h-[55%] w-[85%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,oklch(1_0_0/0.95),oklch(0.86_0.1_153/0.8)_38%,transparent_75%)] blur-2xl will-change-transform" />

      {/* clean bright finish along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[linear-gradient(to_top,oklch(1_0_0)_0%,oklch(0.97_0.04_150/0.92)_22%,transparent_100%)]" />

      {/* black sky behind the heading, short so the glow stays bright */}
      <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-paper to-transparent" />
    </div>
  );
}
