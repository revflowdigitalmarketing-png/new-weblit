import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { finalCta } from "@/content/copy";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="pb-6 pt-6 sm:pb-10">
      <Container>
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:px-12 sm:py-28 lg:py-32">
          {/* Aurora backdrop, decorative only */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/brand/bg-aurora.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full rotate-180 object-cover opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_78%)]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,oklch(0.13_0.009_134.1/0.75),transparent)]" />
          </div>
          <div className="relative">
            <Reveal>
              <h2 id="final-cta-heading" className="text-display-lg mx-auto max-w-[16ch]">
                {finalCta.heading}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mx-auto mt-6 max-w-[30rem] text-base leading-relaxed text-ink/75 sm:text-lg">
                {finalCta.description}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <ButtonLink to="/contact" className="mt-9 w-full sm:w-auto sm:min-w-[240px]">
                {finalCta.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
