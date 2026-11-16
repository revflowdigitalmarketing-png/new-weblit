import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { hero } from "@/content/copy";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Black and green aurora backdrop, decorative only */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="/brand/bg-aurora-wide.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-70"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_42%,oklch(0.13_0.009_134.1/0.85),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-paper" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper/80 to-transparent" />
      </div>

      <Container className="relative flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-32 text-center sm:min-h-[92svh] sm:pb-24 sm:pt-36">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full bg-surface py-2 pl-3 pr-4 text-[0.8125rem] text-ink/85 backdrop-blur-md sm:text-sm">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {hero.badge}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 id="hero-heading" className="text-display-xl mx-auto mt-7 max-w-[17ch] text-ink">
            {hero.heading}
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-[34rem] text-base leading-relaxed text-ink/70 sm:text-lg">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-9 w-full sm:w-auto">
          <ButtonLink id="hero-cta" to="/contact" className="w-full sm:w-auto sm:min-w-[220px]">
            {hero.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
