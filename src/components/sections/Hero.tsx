import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { hero } from "@/content/copy";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Soft brand wash, decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-[30%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(closest-side,oklch(0.925_0.011_136.6/0.9),transparent)] blur-2xl"
      />
      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 sm:min-h-[88svh] sm:pb-24 sm:pt-36 lg:min-h-[92svh] lg:pb-28">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full bg-fill py-2 pl-3 pr-4 text-sm text-ink/80">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/40 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {hero.badge}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 id="hero-heading" className="text-display-xl mt-6 max-w-[15ch] text-ink">
            {hero.heading}
          </h1>
        </Reveal>

        <div className="mt-6 flex flex-col gap-7 sm:mt-14 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={180}>
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-xl">
              {hero.description}
            </p>
          </Reveal>
          <Reveal delay={260} className="shrink-0">
            <ButtonLink id="hero-cta" to="/contact" className="w-full sm:w-auto sm:min-w-[220px]">
              {hero.cta}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
