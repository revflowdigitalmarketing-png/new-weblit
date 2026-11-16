import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { leadMagnet } from "@/content/copy";

export function LeadMagnet() {
  return (
    <section aria-labelledby="blueprint-heading" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-fill p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            <div>
              <h2 id="blueprint-heading" className="text-display-lg">
                {leadMagnet.heading}
              </h2>
              <p className="text-display-md mt-5 max-w-[22ch] font-display tracking-[-0.045em] text-brand">
                {leadMagnet.subheading}
              </p>
              <p className="mt-6 max-w-[32rem] text-lg leading-relaxed text-muted-foreground">
                {leadMagnet.description}
              </p>
              <ButtonLink to={leadMagnet.href} className="mt-10 w-full sm:w-auto sm:min-w-[260px]">
                {leadMagnet.cta}
              </ButtonLink>
            </div>
            <BlueprintStack />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Decorative stack of guide pages. No text, purely visual. */
function BlueprintStack() {
  const page =
    "absolute inset-0 rounded-[1.25rem] bg-white shadow-[0_30px_60px_-35px_oklch(0.148_0.003_145.4/0.35)]";
  return (
    <div
      aria-hidden
      className="group relative mx-auto aspect-[4/5] w-full max-w-[340px] lg:max-w-[380px]"
    >
      <div
        className={`${page} -rotate-6 opacity-60 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-rotate-9`}
      />
      <div
        className={`${page} rotate-3 opacity-80 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:rotate-6`}
      />
      <div className={`${page} flex flex-col gap-4 p-7`}>
        <div className="h-2.5 w-16 rounded-full bg-brand" />
        <div className="mt-2 h-4 w-[85%] rounded-md bg-ink/[0.08]" />
        <div className="h-4 w-[60%] rounded-md bg-ink/[0.08]" />
        <div className="mt-3 grid flex-1 grid-cols-2 gap-3">
          <div className="rounded-lg bg-brand-soft" />
          <div className="rounded-lg bg-ink/[0.05]" />
          <div className="rounded-lg bg-ink/[0.05]" />
          <div className="rounded-lg bg-brand-soft" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-ink/[0.06]" />
          <div className="h-2 w-[80%] rounded-full bg-ink/[0.06]" />
        </div>
      </div>
    </div>
  );
}
