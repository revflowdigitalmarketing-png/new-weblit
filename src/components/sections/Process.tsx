import { BriefCard } from "@/components/site/BriefCard";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionIntro } from "@/components/site/SectionIntro";
import { differentiator } from "@/content/copy";
import { cn } from "@/lib/utils";

const [one, two, three] = differentiator.steps;

const card = "flex h-full flex-col rounded-[1.5rem] p-5 text-left sm:p-6";
const label = "text-xs font-medium uppercase tracking-[0.14em] text-ink/45";
const title = "mt-2 text-lg font-medium leading-snug tracking-[-0.03em] sm:text-xl";

/** How it works, in three steps. Step 1 is where the visitor starts. */
export function Process() {
  return (
    <section id="start" aria-labelledby="process-heading" className="py-24 sm:py-32">
      <Container>
        <SectionIntro
          id="process-heading"
          heading={differentiator.heading}
          description={differentiator.description}
        />

        <ol className="mx-auto mt-12 grid max-w-[1080px] gap-3 sm:mt-14 lg:grid-cols-3">
          {/* Step 1: describe your business */}
          <Reveal as="li" className="h-full min-w-0">
            <div className={cn(card, "bg-fill")}>
              <p className={label}>{one?.label}</p>
              <h3 className={title}>{one?.title}</h3>
              <div className="mt-5 min-w-0 flex-1 [&>form]:h-full">
                <BriefCard stacked />
              </div>
            </div>
          </Reveal>

          {/* Step 2: 72 hours */}
          <Reveal as="li" className="h-full min-w-0" delay={80}>
            <div className={cn(card, "bg-fill")}>
              <p className={label}>{two?.label}</p>
              <h3 className={title}>{two?.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">{two?.body}</p>
              <div className="mt-auto pt-8">
                <p className="whitespace-nowrap text-[clamp(3rem,2.2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-brand">
                  {two?.big}
                </p>
                <p className="mt-2 text-sm text-ink/55">{two?.bigNote}</p>
              </div>
            </div>
          </Reveal>

          {/* Step 3: see it, then pay */}
          <Reveal as="li" className="h-full min-w-0" delay={160}>
            <div className={cn(card, "aurora-card")}>
              <p className={label}>{three?.label}</p>
              <h3 className={title}>{three?.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/80">{three?.body}</p>
              <div className="mt-auto pt-8">
                <ButtonLink to="/contact" variant="inverse" size="md" className="w-full">
                  {three?.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </ol>
      </Container>
    </section>
  );
}
