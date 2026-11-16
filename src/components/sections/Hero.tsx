import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { hero } from "@/content/copy";
import { cn } from "@/lib/utils";

/** Split the heading after its first comma so it always sets in two lines. */
const [line1, line2] = (() => {
  const i = hero.heading.indexOf(", ");
  return i === -1 ? [hero.heading, ""] : [hero.heading.slice(0, i + 1), hero.heading.slice(i + 2)];
})();

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="p-2 sm:p-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
        <AuroraBackdrop />

        <Container className="relative flex min-h-[calc(100svh-1rem)] flex-col items-center justify-center pb-28 pt-28 text-center sm:min-h-[calc(100svh-1.5rem)] sm:pb-32 sm:pt-32">
          <Reveal>
            <h1
              id="hero-heading"
              className="mx-auto text-[clamp(0.95rem,5.1vw,2.5rem)] font-medium leading-[1.15] text-ink"
            >
              <span className="block whitespace-nowrap">{line1}</span>
              {line2 ? <span className="block whitespace-nowrap">{line2}</span> : null}
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mx-auto mt-4 max-w-[30rem] text-[0.8125rem] leading-relaxed text-ink/70 sm:text-[0.9375rem]">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8 w-full max-w-[600px]">
            <BriefCard />
          </Reveal>
        </Container>

        {/* badge sits in the white finish, after the reference */}
        <p className="absolute inset-x-0 bottom-6 z-10 px-4 text-center text-sm font-medium tracking-[-0.01em] text-paper/80 sm:bottom-8 sm:text-base">
          {hero.badge}
        </p>
      </div>
    </section>
  );
}

/** Frosted card: describe your business, pick an industry, go to the contact form prefilled. */
function BriefCard() {
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
        rows={2}
        placeholder={hero.brief.placeholder}
        className="w-full resize-none bg-transparent px-1.5 pt-1 text-base leading-relaxed sm:text-sm outline-none placeholder:text-black/40"
      />
      <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pr-6 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] sm:pr-1 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden"
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
          className="group inline-flex h-9 shrink-0 items-center justify-between gap-2 self-stretch sm:self-auto rounded-full bg-[oklch(0.13_0.009_134.1)] pl-4 pr-1.5 text-[0.8125rem] font-medium text-white transition-transform active:scale-[0.98]"
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

/**
 * Black sky with a slowly flowing green aurora that finishes clean into
 * bright white at the bottom edge, after the reference. Decorative only.
 */
function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-paper">
      {/* the glowing hill: deep emerald on the left, electric green through the middle, bright mint on the right */}
      <div className="flow-a absolute -bottom-[58%] left-1/2 h-[112%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,oklch(0.42_0.16_162)_0%,oklch(0.62_0.22_150)_28%,oklch(0.78_0.25_146)_52%,oklch(0.86_0.2_152)_74%,oklch(0.66_0.2_156)_100%)] blur-[42px] will-change-transform" />

      {/* saturated depth at the left edge, like the reference's indigo */}
      <div className="flow-b absolute -bottom-[10%] -left-[18%] h-[70%] w-[55%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.45_0.18_165/0.95),transparent_72%)] blur-3xl will-change-transform" />

      {/* electric highlight on the right */}
      <div className="flow-c absolute -right-[10%] bottom-[5%] h-[55%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.88_0.22_148/0.9),transparent_70%)] blur-3xl will-change-transform" />

      {/* white light core rising from the bottom */}
      <div className="flow-b absolute -bottom-[22%] left-1/2 h-[55%] w-[85%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,oklch(1_0_0),oklch(0.96_0.06_150/0.9)_40%,transparent_75%)] blur-2xl will-change-transform" />

      {/* clean bright finish along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[linear-gradient(to_top,oklch(1_0_0)_0%,oklch(0.97_0.04_150/0.92)_22%,transparent_100%)]" />

      {/* black sky behind the heading, short so the glow stays bright */}
      <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-paper to-transparent" />
    </div>
  );
}
