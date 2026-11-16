import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { finalCta } from "@/content/copy";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="pb-6 pt-6 sm:pb-10">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 pb-8 pt-20 text-white sm:px-12 sm:pb-12 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[10%] -top-[40%] h-[120%] w-[70%] rounded-full bg-[radial-gradient(closest-side,oklch(1_0_0/0.08),transparent)]"
          />
          <Reveal>
            <h2 id="final-cta-heading" className="text-display-xl relative max-w-[14ch]">
              {finalCta.heading}
            </h2>
          </Reveal>
          <div className="relative mt-12 flex flex-col gap-8 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <Reveal delay={80}>
              <p className="max-w-[30rem] text-lg leading-relaxed text-white/70 sm:text-xl">
                {finalCta.description}
              </p>
            </Reveal>
            <Reveal delay={160} className="shrink-0">
              <ButtonLink to="/contact" variant="inverse" className="w-full sm:w-auto sm:min-w-[240px]">
                {finalCta.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
