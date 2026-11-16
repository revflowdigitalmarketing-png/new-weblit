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
    <section aria-labelledby="diff-heading" className="py-24 sm:py-32">
      <Container>
        <SectionIntro
          id="diff-heading"
          heading={differentiator.heading}
          description={differentiator.description}
        />

        <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-5">
            <OwnersCard />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={80}>
            <MathsCard />
          </Reveal>
          <Reveal className="lg:col-span-12" delay={120}>
            <OfferCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const card = "h-full rounded-[2rem] p-6 sm:p-9 lg:p-10";

/* Block 1 */
function OwnersCard() {
  return (
    <div className={cn(card, "bg-fill")}>
      <h3 className="text-display-md">{owners.heading}</h3>
      <ul className="mt-8 flex flex-col gap-3">
        {owners.clients.map((c, i) => {
          const body = (
            <>
              <div className="flex items-center gap-3.5">
                <span
                  role="img"
                  aria-label="[Client photo]"
                  title="[Client photo]"
                  data-placeholder=""
                  className="placeholder-chip size-12 shrink-0 rounded-full !p-0"
                />
                <div className="min-w-0 leading-tight">
                  <p className="font-medium text-ink">
                    <CopyText text={c.name} />
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    <CopyText text={c.industry} />
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-3.5">
                <span className="truncate text-sm text-ink/70">
                  <CopyText text={c.url ? c.url.replace(/^https?:\/\//, "") : c.urlLabel} />
                </span>
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <ArrowUpRight className="size-4" strokeWidth={1.75} />
                </span>
              </div>
            </>
          );
          const cls = "group block rounded-[1.5rem] bg-white p-3 pb-3 pl-3 pr-3 sm:p-4";
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
    <div className={cn(card, "flex flex-col bg-fill")}>
      <h3 className="text-display-md">{maths.heading}</h3>

      <ul className="mt-8 flex flex-col gap-4 text-lg leading-[1.9] text-ink sm:gap-5 sm:text-xl sm:leading-[2.1]">
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

      <div className="mt-auto pt-10">
        <div className="rounded-[1.5rem] bg-white p-6 sm:p-7" aria-live="polite">
          <p
            className={cn(
              "font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none tracking-[-0.03em] transition-colors duration-500",
              ready ? "text-brand" : "text-ink/20",
            )}
          >
            ₹{ready ? inr.format(total) : "____"}
          </p>
          <p className="mt-3 text-muted-foreground">{maths.total}</p>
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
      className="inline-field rounded-lg bg-white px-2 py-0.5 text-center font-display font-medium tracking-[-0.02em] text-brand outline-none ring-brand/30 transition-shadow placeholder:text-ink/25 focus:ring-2"
    />
  );
}

function Slot({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block min-w-[4ch] rounded-lg px-2 py-0.5 text-center font-display font-medium tracking-[-0.02em] transition-colors duration-300",
        children ? "bg-brand-soft text-brand" : "bg-ink/[0.04] text-ink/25",
      )}
    >
      {children ?? "____"}
    </span>
  );
}

/* Block 3 */
function OfferCard() {
  return (
    <div className={cn(card, "bg-brand text-white lg:p-14")}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <h3 className="text-display-lg max-w-[12ch]">{offer.heading}</h3>
        <div>
          <ol className="flex flex-col">
            {offer.steps.map((s, i) => (
              <li
                key={s}
                className="flex gap-5 border-b border-white/10 py-5 text-lg leading-snug first:pt-0 sm:text-xl"
              >
                <span className="font-display text-white/45" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[30rem] text-lg leading-relaxed text-white/70">
            {offer.closing}
          </p>
          <ButtonLink
            to="/contact"
            variant="inverse"
            className="mt-10 w-full sm:w-auto sm:min-w-[240px]"
          >
            {offer.cta}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
