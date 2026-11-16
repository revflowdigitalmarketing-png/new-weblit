import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Info } from "lucide-react";
import { useId, useState } from "react";
import { Placeholder } from "@/components/site/Placeholder";
import { differentiator } from "@/content/copy";
import { priceFor, pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const money = (n: number) => `${pricing.currency}${inr.format(n)}`;
const TICKS = 22;

/** Block 2: live price calculator (pages slider + add-on toggles). */
export function PriceCalculator() {
  const id = useId();
  const t = differentiator.price;
  const [pages, setPages] = useState<number>(pricing.defaultPages);
  const [addOns, setAddOns] = useState<string[]>([]);
  const { total, extras } = priceFor(pages, addOns);

  const span = pricing.maxPages - pricing.minPages;
  const pct = ((pages - pricing.minPages) / span) * 100;
  const toggle = (addOnId: string) =>
    setAddOns((cur) =>
      cur.includes(addOnId) ? cur.filter((x) => x !== addOnId) : [...cur, addOnId],
    );

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-5 text-left text-[oklch(0.16_0.01_150)] shadow-[0_30px_80px_-40px_oklch(0.718_0.16_153/0.45)] sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-lg font-medium tracking-[-0.035em] sm:text-xl">
          {t.heading}
          <span title={t.note} className="text-black/35">
            <Info className="size-4" strokeWidth={1.75} aria-hidden />
            <span className="sr-only">{t.note}</span>
          </span>
        </h3>
        {pricing.ratesArePlaceholders ? (
          <Placeholder className="shrink-0 text-[10px]">[placeholder rates]</Placeholder>
        ) : null}
      </div>

      {/* Big number */}
      <div className="mt-5 flex items-end gap-3" aria-live="polite">
        <p className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">
          {money(total)}
        </p>
        <div className="pb-0.5 text-xs leading-snug">
          <p className="font-medium text-[oklch(0.55_0.15_152)]">
            +{money(extras)} {t.extrasLabel}
          </p>
          <p className="text-black/50">
            {t.baseLabel} {money(pricing.base)}
          </p>
        </div>
      </div>

      {/* Pages slider, after the reference's progress bar with ticks */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <label htmlFor={`${id}-pages`} className="font-medium text-black/70">
            {t.pagesLabel}
          </label>
          <span className="text-black/45">
            {pricing.maxPages} {t.pagesUnit}
          </span>
        </div>
        <div className="relative h-9">
          {/* ticks across the full track */}
          <div className="absolute inset-0 flex items-stretch justify-between" aria-hidden>
            {Array.from({ length: TICKS }, (_, i) => (
              <span key={i} className="w-[3px] rounded-full bg-black/[0.09]" />
            ))}
          </div>
          {/* filled part */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 flex items-center justify-end overflow-hidden rounded-lg bg-[linear-gradient(90deg,oklch(0.299_0.076_144.7),oklch(0.634_0.147_152.1)_55%,oklch(0.718_0.16_153))] pr-2 transition-[width] duration-200 ease-out"
            style={{ width: `max(3.25rem, ${pct}%)` }}
          >
            <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[11px] font-medium text-white tabular-nums backdrop-blur-sm">
              {pages}
            </span>
          </div>
          {/* handle */}
          <span
            aria-hidden
            className="absolute -top-1.5 bottom-[-6px] w-[3px] -translate-x-1/2 rounded-full bg-[oklch(0.634_0.147_152.1)] transition-[left] duration-200 ease-out"
            style={{ left: `max(3.25rem, ${pct}%)` }}
          >
            <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[oklch(0.634_0.147_152.1)]" />
          </span>
          {/* accessible native slider on top */}
          <input
            id={`${id}-pages`}
            type="range"
            min={pricing.minPages}
            max={pricing.maxPages}
            step={1}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            aria-valuetext={`${pages} ${t.pagesUnit}`}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* Add-ons */}
      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-medium text-black/70">{t.addOnsLabel}</legend>
        <div className="flex flex-wrap gap-1.5">
          {pricing.addOns.map((a) => {
            const on = addOns.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(a.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                  on
                    ? "bg-[oklch(0.299_0.076_144.7)] text-white"
                    : "bg-black/[0.05] text-black/70 hover:bg-black/[0.08]",
                )}
              >
                {on ? <Check className="size-3" strokeWidth={2.5} aria-hidden /> : null}
                {a.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Summary pill */}
      <div className="mt-auto pt-6">
        <Link
          to="/contact"
          className="group flex items-center justify-between gap-3 rounded-full bg-black/[0.04] py-3 pl-4 pr-3 text-[0.8125rem] text-black/70 transition-colors hover:bg-black/[0.07]"
        >
          <span>
            {pages} {t.pagesUnit}, {addOns.length} {t.addOnsUnit}. {t.cta}
          </span>
          <ChevronRight
            className="size-4 shrink-0 text-black/50 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
