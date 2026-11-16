import { ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { CopyText } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { SectionIntro } from "@/components/site/SectionIntro";
import { differentiator } from "@/content/copy";
import { cn } from "@/lib/utils";

const { owners, maths, offer } = differentiator;

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
        <div className="mx-auto mt-12 grid max-w-[1120px] gap-4 sm:mt-16 lg:grid-cols-3">
          <Reveal className="h-full">
            <OwnersCard />
          </Reveal>
          <Reveal className="h-full" delay={80}>
            <MathsCard />
          </Reveal>
          <Reveal className="h-full" delay={160}>
            <OfferCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const card = "flex h-full flex-col rounded-[1.75rem] p-5 text-center sm:p-6";
const cardHeading = "font-display text-xl leading-tight tracking-[-0.045em] sm:text-[1.375rem]";

/* Block 1 */
function OwnersCard() {
  return (
    <div className={cn(card, "bg-fill")}>
      <h3 className={cardHeading}>{owners.heading}</h3>
      <ul className="mt-6 flex flex-col gap-2.5 text-left">
        {owners.clients.map((c, i) => {
          const body = (
            <>
              <div className="flex items-center gap-3.5">
                <span
                  role="img"
                  aria-label="[Client photo]"
                  title="[Client photo]"
                  data-placeholder=""
                  className="placeholder-chip size-10 shrink-0 rounded-full !p-0"
                />
                <div className="min-w-0 leading-tight">
                  <p className="text-sm font-medium text-ink">
                    <CopyText text={c.name} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <CopyText text={c.industry} />
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-3">
                <span className="truncate text-xs text-ink/70">
                  <CopyText text={c.url ? c.url.replace(/^https?:\/\//, "") : c.urlLabel} />
                </span>
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </>
          );
          const cls = "group block rounded-[1.25rem] bg-surface p-3";
          return (
            <li key={i}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className={cls}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Block 2: live calculator */
const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const num1 = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });
const digits = (v: string) => v.replace(/[^\d]/g, "").slice(0, 12);

function MathsCard() {
  const id = useId();
  const [value, setValue] = useState("");
  const [visitors, setVisitors] = useState("");

  const v = Number(value) || 0;
  const n = Number(visitors) || 0;
  const enquiriesMonth = n / 100; // 1 more visitor in 100 enquires
  const clientsYear = (enquiriesMonth * 12) / 4; // close 1 in 4, over 12 months
  const total = clientsYear * v;
  const ready = v > 0 && n > 0;

  return (
    <div className={cn(card, "bg-fill")}>
      <h3 className={cardHeading}>{maths.heading}</h3>

      <ul className="mt-6 flex flex-col gap-3 text-[0.9375rem] leading-[1.9] text-ink/90">
        <li>
          <label htmlFor={`${id}-value`}>{maths.lines[0]![0]}</label>{" "}
          <span className="inline-flex items-baseline">
            <span className="mr-0.5 text-ink/50" aria-hidden>
              ₹
            </span>
            <SlotInput id={`${id}-value`} value={value} onChange={setValue} />
          </span>{" "}
          {maths.lines[0]![1]}
        </li>
        <li>
          <label htmlFor={`${id}-visitors`}>{maths.lines[1]![0]}</label>{" "}
          <SlotInput id={`${id}-visitors`} value={visitors} onChange={setVisitors} />{" "}
          {maths.lines[1]![1]}
        </li>
        <li>
          {maths.lines[2]![0]} <Slot>{n > 0 ? num1.format(enquiriesMonth) : null}</Slot>{" "}
          {maths.lines[2]![1]}
        </li>
        <li>
          {maths.lines[3]![0]} <Slot>{n > 0 ? num1.format(clientsYear) : null}</Slot>{" "}
          {maths.lines[3]![1]}
        </li>
      </ul>

      <div className="mt-auto pt-6">
        <div className="rounded-[1.25rem] bg-surface p-5" aria-live="polite">
          <p
            className={cn(
              "font-display text-[2rem] leading-none tracking-[-0.045em] transition-colors duration-500",
              ready ? "text-brand" : "text-ink/20",
            )}
          >
            ₹{ready ? inr.format(total) : "____"}
          </p>
          <p className="mt-2.5 text-sm text-muted-foreground">{maths.total}</p>
        </div>
      </div>
    </div>
  );
}

function SlotInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const shown = value ? inr.format(Number(value)) : "";
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      placeholder="____"
      value={shown}
      onChange={(e) => onChange(digits(e.target.value))}
      style={{ width: `${Math.max(4, shown.length + 1)}ch` }}
      className="inline-field rounded-md bg-surface px-1.5 py-0 text-center font-display font-medium tracking-[-0.02em] text-brand outline-none ring-brand/30 transition-shadow placeholder:text-ink/30 focus:ring-2"
    />
  );
}

function Slot({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block min-w-[4ch] rounded-md px-1.5 py-0 text-center font-display font-medium tracking-[-0.02em] transition-colors duration-300",
        children ? "bg-brand-soft text-brand" : "bg-surface text-ink/30",
      )}
    >
      {children ?? "____"}
    </span>
  );
}

/* Block 3 */
function OfferCard() {
  return (
    <div className={cn(card, "aurora-card relative overflow-hidden text-ink")}>
      <h3 className={cardHeading}>{offer.heading}</h3>
      <ol className="mt-6 flex flex-col gap-2.5 text-left">
        {offer.steps.map((s, i) => (
          <li
            key={s}
            className="flex gap-3 rounded-[1.25rem] bg-paper/35 p-3.5 text-[0.9375rem] leading-snug backdrop-blur-sm"
          >
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-full bg-brand font-display text-xs text-paper"
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm leading-relaxed text-ink/75">{offer.closing}</p>
      <div className="mt-auto pt-6">
        <ButtonLink to="/contact" variant="inverse" size="md" className="w-full">
          {offer.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
