import { Link } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { differentiator } from "@/content/copy";
import { priceFor, pricing, type PriceInputs } from "@/content/pricing";
import { cn } from "@/lib/utils";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const digits = (v: string, max = 12) => v.replace(/[^\d]/g, "").slice(0, max);

type Key = keyof PriceInputs;
const ORDER: Key[] = ["visitors", "enquiries", "clientsPer10", "value"];

/** Block 2: live price calculator from four required answers. */
export function PriceCalculator() {
  const id = useId();
  const t = differentiator.price;
  const [vals, setVals] = useState<Record<Key, string>>({
    visitors: "",
    enquiries: "",
    clientsPer10: "",
    value: "",
  });

  const nums = {
    visitors: Number(vals.visitors) || 0,
    enquiries: Number(vals.enquiries) || 0,
    clientsPer10: Math.min(10, Number(vals.clientsPer10) || 0),
    value: Number(vals.value) || 0,
  };
  const complete =
    nums.visitors > 0 && vals.enquiries !== "" && vals.clientsPer10 !== "" && nums.value > 0;
  const { price } = priceFor(nums);
  const shown = useCountUp(complete ? price : pricing.minPrice);

  const set = (k: Key, v: string) =>
    setVals((cur) => ({ ...cur, [k]: k === "clientsPer10" ? digits(v, 2) : digits(v) }));

  return (
    <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-4 text-left text-[oklch(0.16_0.01_150)] shadow-[0_30px_80px_-40px_oklch(0.718_0.16_153/0.45)] sm:p-5">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium tracking-[-0.035em] sm:text-[1.1875rem]">{t.heading}</h3>
        <span title={t.note} className="text-black/35">
          <Info className="size-4" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">{t.note}</span>
        </span>
      </div>

      {/* Four required answers */}
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3.5">
        {ORDER.map((k) => (
          <div key={k} className="flex flex-col gap-1.5">
            <label
              htmlFor={`${id}-${k}`}
              className="text-xs font-medium leading-tight text-black/65"
            >
              {t.fields[k]}
            </label>
            <div className="relative">
              {k === "value" ? (
                <span
                  aria-hidden
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-black/45"
                >
                  {pricing.currency}
                </span>
              ) : null}
              <input
                id={`${id}-${k}`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required
                value={
                  vals[k] ? (k === "clientsPer10" ? vals[k] : inr.format(Number(vals[k]))) : ""
                }
                onChange={(e) => set(k, e.target.value)}
                placeholder={k === "clientsPer10" ? "0 to 10" : "0"}
                className={cn(
                  "h-9 w-full rounded-[10px] bg-[oklch(0.93_0.003_150)] px-3 text-sm font-medium tabular-nums text-black outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-black/30 hover:bg-[oklch(0.9_0.004_150)] focus:bg-[oklch(0.88_0.005_150)] focus-visible:outline-none",
                  k === "value" && "pl-7",
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Price */}
      <p
        aria-live="polite"
        className={cn(
          "mt-5 text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums transition-colors duration-300",
          complete ? "text-black" : "text-black/20",
        )}
      >
        {pricing.currency}
        {inr.format(shown)}
      </p>

      {/* Summary pill */}
      <div className="mt-auto pt-6">
        <Link
          to="/contact"
          className="group flex items-center justify-between gap-3 rounded-full bg-black/[0.05] py-3 pl-4 pr-3 text-[0.8125rem] text-black/75 transition-colors hover:bg-black/[0.08]"
        >
          <span>{t.cta}</span>
          <ChevronRight
            className="size-4 shrink-0 text-black/50 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}

/**
 * Smoothly counts the shown price to its new value (ease-out, ~0.7s).
 * Jumps straight there for reduced-motion users.
 */
function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (target - from) * eased);
      fromRef.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
