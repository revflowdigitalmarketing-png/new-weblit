import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { hero, work } from "@/content/copy";
import { cn } from "@/lib/utils";

/** Split the heading after its first comma so it always sets in two lines. */
const [line1, line2] = (() => {
  const i = hero.heading.indexOf(", ");
  return i === -1 ? [hero.heading, ""] : [hero.heading.slice(0, i + 1), hero.heading.slice(i + 2)];
})();

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <AuroraBackdrop />

      <Container className="relative flex min-h-[100svh] flex-col items-center justify-center pb-24 pt-28 text-center sm:pb-28 sm:pt-32">
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
          <p className="mx-auto mt-4 max-w-[30rem] text-[0.8125rem] leading-relaxed text-ink/65 sm:text-[0.9375rem]">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-9 w-full max-w-[560px]">
          <BriefCard />
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-8 inline-flex items-center gap-2 text-xs text-ink/75">
            <span aria-hidden className="size-1 rounded-full bg-ink/80" />
            {hero.badge}
          </p>
        </Reveal>
      </Container>
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
      className="rounded-[1.5rem] bg-[oklch(0.96_0.02_150/0.78)] p-3.5 text-left text-[oklch(0.16_0.01_150)] shadow-[0_30px_80px_-30px_oklch(0.718_0.16_153/0.55),inset_0_1px_0_0_oklch(1_0_0/0.8)] backdrop-blur-xl sm:p-4"
    >
      <label htmlFor={`${id}-brief`} className="sr-only">
        {hero.brief.label}
      </label>
      <textarea
        id={`${id}-brief`}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        rows={3}
        placeholder={hero.brief.placeholder}
        className="w-full resize-none bg-transparent px-1.5 pt-1 text-base leading-relaxed sm:text-sm outline-none placeholder:text-black/40"
      />
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={hero.brief.industryLabel}>
          {work.industries.map((it) => {
            const on = industry === it.name;
            return (
              <button
                key={it.name}
                type="button"
                aria-pressed={on}
                onClick={() => setIndustry(on ? null : it.name)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-200",
                  on
                    ? "bg-[oklch(0.299_0.076_144.7)] text-white"
                    : "bg-white/70 text-black/60 hover:bg-white",
                )}
              >
                {it.name}
              </button>
            );
          })}
        </div>
        <button
          type="submit"
          className="group ml-auto inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[oklch(0.13_0.009_134.1)] pl-4 pr-1.5 text-[0.8125rem] font-medium text-white transition-transform active:scale-[0.98]"
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

/** Black sky with a slowly flowing green aurora and drifting wave lines. Decorative only. */
function AuroraBackdrop() {
  // One wave period is 720 units; the path spans two copies so a -50% drift loops seamlessly.
  const wave = (amp: number, y: number, phase: number) => {
    let d = `M0,${y}`;
    for (let x = 0; x <= 2880; x += 360) {
      const dir = (x / 360 + phase) % 2 === 0 ? -1 : 1;
      d += ` Q${x + 180},${y + dir * amp} ${x + 360},${y}`;
    }
    return d;
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-paper">
      {/* flowing glows */}
      <div className="flow-a absolute -bottom-[35%] left-1/2 h-[95%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.718_0.16_153/0.95),oklch(0.45_0.11_150/0.7)_45%,transparent_75%)] blur-3xl will-change-transform" />
      <div className="flow-b absolute -bottom-[20%] -left-[15%] h-[70%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.299_0.076_144.7/0.95),transparent_70%)] blur-3xl will-change-transform" />
      <div className="flow-c absolute -bottom-[25%] -right-[10%] h-[70%] w-[65%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.634_0.147_152.1/0.8),transparent_70%)] blur-3xl will-change-transform" />
      {/* pale mint wash along the bottom, after the reference */}
      <div className="flow-a absolute -bottom-[18%] left-1/2 h-[38%] w-[110%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.95_0.05_150/0.85),transparent_75%)] blur-2xl" />

      {/* faint vertical lines */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_119px,oklch(1_0_0/0.05)_119px,oklch(1_0_0/0.05)_120px)] [mask-image:linear-gradient(to_top,black,transparent)]" />

      {/* drifting wave lines */}
      <svg
        className="wave-drift absolute bottom-[9%] left-0 h-[22%] w-[200%]"
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
      >
        <path d={wave(46, 100, 0)} fill="none" stroke="oklch(1 0 0 / 0.35)" strokeWidth="1.2" />
        <path d={wave(30, 120, 1)} fill="none" stroke="oklch(1 0 0 / 0.22)" strokeWidth="1" />
      </svg>
      <svg
        className="wave-drift-slow absolute bottom-[7%] left-0 h-[18%] w-[200%]"
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
      >
        <path
          d={wave(38, 90, 1)}
          fill="none"
          stroke="oklch(0.86 0.12 150 / 0.35)"
          strokeWidth="1"
        />
      </svg>

      {/* top darkness and a soft hand-off into the next section */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-paper via-paper/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
