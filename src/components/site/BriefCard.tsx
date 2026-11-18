import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { hero } from "@/content/copy";
import { cn } from "@/lib/utils";

/** Frosted card: describe your business, pick an industry, go to the contact form prefilled. */
export function BriefCard({ stacked = false }: { stacked?: boolean }) {
  const id = useId();
  const navigate = useNavigate();
  const [brief, setBrief] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const search: { brief?: string; industry?: string } = {};
    if (brief.trim()) search.brief = brief.trim();
    if (industry) search.industry = industry;
    void navigate({ to: "/contact", search });
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[1.25rem] bg-[oklch(0.97_0.015_150/0.8)] p-3 text-left text-[oklch(0.16_0.01_150)] shadow-[0_30px_80px_-30px_oklch(0.718_0.16_153/0.55),inset_0_1px_0_0_oklch(1_0_0/0.8)] backdrop-blur-xl sm:p-4"
    >
      <label htmlFor={`${id}-brief`} className="sr-only">
        {hero.brief.label}
      </label>
      <textarea
        id={`${id}-brief`}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        rows={stacked ? 4 : 2}
        placeholder={hero.brief.placeholder}
        className="w-full resize-none bg-transparent px-1.5 pt-1 text-base leading-relaxed sm:text-sm outline-none placeholder:text-black/40"
      />
      <div
        className={cn(
          "mt-1 flex flex-col gap-2.5",
          !stacked && "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div
          className={cn(
            "-mx-1 flex gap-1.5 overflow-x-auto px-1 pr-6 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            !stacked && "sm:pr-1 sm:[mask-image:none]",
          )}
          role="group"
          aria-label={hero.brief.industryLabel}
        >
          {hero.brief.industries.map((name) => {
            const on = industry === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={on}
                onClick={() => setIndustry(on ? null : name)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-200",
                  on
                    ? "bg-[oklch(0.299_0.076_144.7)] text-white"
                    : "bg-white/70 text-black/60 hover:bg-white",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
        <button
          type="submit"
          className={cn(
            "group inline-flex h-9 shrink-0 items-center justify-between gap-2 self-stretch rounded-full bg-[oklch(0.13_0.009_134.1)] pl-4 pr-1.5 text-[0.8125rem] font-medium text-white transition-transform active:scale-[0.98]",
            !stacked && "sm:self-auto",
          )}
        >
          {hero.brief.cta}
          <span className="grid size-6 place-items-center rounded-full bg-brand text-[oklch(0.13_0.009_134.1)] transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
          </span>
        </button>
      </div>
    </form>
  );
}
