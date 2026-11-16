import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionIntro } from "@/components/site/SectionIntro";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { differentiator } from "@/content/copy";
import { cn } from "@/lib/utils";

const { owners, offer } = differentiator;

export function Differentiator() {
  return (
    <section aria-labelledby="diff-heading" className="relative overflow-x-clip py-24 sm:py-32">
      <div
        aria-hidden
        className="glow glow-soft left-1/2 top-1/3 h-[40vh] w-[70vw] -translate-x-1/2"
      />
      <Container className="relative">
        <SectionIntro
          id="diff-heading"
          heading={differentiator.heading}
          description={differentiator.description}
        />

        {/* Three vertical blocks, together in one row on desktop */}
        <div className="mx-auto mt-12 grid max-w-[960px] gap-3 sm:mt-14 lg:grid-cols-3">
          <Reveal className="h-full">
            <OwnersCard />
          </Reveal>
          <Reveal className="h-full" delay={80}>
            <PriceCalculator />
          </Reveal>
          <Reveal className="h-full" delay={160}>
            <OfferCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const card = "flex h-full flex-col rounded-[1.5rem] p-4 text-center sm:p-5";
const cardHeading = "font-display text-lg leading-tight tracking-[-0.035em] sm:text-[1.1875rem]";

/** "Dr. Rajeshwar Prasad" -> "RP", "Vinay & Vijay" -> "VV" */
function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/* Block 1 */
function OwnersCard() {
  return (
    <div className={cn(card, "bg-fill")}>
      <h3 className={cardHeading}>{owners.heading}</h3>
      <ul className="mt-5 flex flex-col gap-2 text-left">
        {owners.clients.map((c, i) => {
          const body = (
            <div className="flex items-center gap-3">
              {/* Plain white avatar until client photos are supplied */}
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[11px] font-semibold tracking-wide text-paper"
              >
                {initials(c.name)}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-xs text-ink/65">
                  {c.role ? `${c.name}, ${c.role}` : c.name}
                </p>
                <p className="mt-0.5 text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] text-ink">
                  {c.business}
                </p>
                <p className="mt-0.5 truncate text-xs text-ink/50">
                  {c.url.replace(/^https?:\/\//, "")}
                </p>
              </div>
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <ArrowUpRight className="size-3.5" strokeWidth={2} />
              </span>
            </div>
          );
          const cls = "group block rounded-[1.1rem] bg-surface p-2.5 pr-3";
          return (
            <li key={i}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.business} website (opens in a new tab)`}
                className={cls}
              >
                {body}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Block 3 */
function OfferCard() {
  return (
    <div className={cn(card, "aurora-card relative overflow-hidden text-ink")}>
      <h3 className={cardHeading}>{offer.heading}</h3>
      <ol className="mt-5 flex flex-col gap-2 text-left">
        {offer.steps.map((s, i) => (
          <li
            key={s}
            className="flex gap-3 rounded-[1.1rem] bg-paper/35 p-2.5 text-sm leading-snug backdrop-blur-sm"
          >
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-full bg-white font-display text-xs text-paper"
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-auto pt-6">
        <ButtonLink to="/contact" variant="inverse" size="md" className="w-full">
          {offer.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
