import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { leadMagnet } from "@/content/copy";

export function LeadMagnet() {
  return (
    <section aria-labelledby="blueprint-heading" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[2rem] bg-fill px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="glow -bottom-1/2 left-1/2 h-[80%] w-[70%] -translate-x-1/2 opacity-70"
            />
            <div className="relative">
              <h2 id="blueprint-heading" className="text-display-lg">
                {leadMagnet.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-[26ch] font-display text-xl leading-tight tracking-[-0.035em] text-brand sm:text-2xl">
                {leadMagnet.subheading}
              </p>
              <p className="mx-auto mt-5 max-w-[32rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {leadMagnet.description}
              </p>
              <ButtonLink to={leadMagnet.href} className="mt-9 w-full sm:w-auto sm:min-w-[260px]">
                {leadMagnet.cta}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
