import { ButtonLink } from "@/components/site/ButtonLink";
import { FluidBars } from "@/components/site/FluidBars";
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
        <FluidBars />

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
        <p className="absolute inset-x-0 bottom-6 z-10 px-4 text-center text-sm font-medium tracking-[-0.01em] text-white/80 sm:bottom-8 sm:text-base">
          {hero.badge}
        </p>
      </div>
    </section>
  );
}
