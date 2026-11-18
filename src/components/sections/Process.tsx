import { BriefCard } from "@/components/site/BriefCard";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionIntro } from "@/components/site/SectionIntro";
import { differentiator } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
                <CountUpBig text={two?.big ?? ""} />
                <p className="mt-2 text-sm text-ink/55">{two?.bigNote}</p>
              </div>
            </div>
          </Reveal>

          {/* Step 3: see it, then pay (ribbed green glass card, after the reference) */}
          <Reveal as="li" className="h-full min-w-0" delay={160}>
            <div className={cn(card, "relative isolate overflow-hidden bg-[#050906]")}>
              <RibbedGlass />
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                <span>{three?.label}</span>
                <span>{three?.tag}</span>
              </div>
              <h3 className={title}>{three?.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">{three?.body}</p>

              <div className="mt-auto pt-10">
                <p className="flex items-baseline gap-2">
                  <span className="text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-ink">
                    {three?.figure}
                  </span>
                  <span className="text-sm text-ink/55">{three?.figureNote}</span>
                </p>
                <div className="mt-4 h-px bg-ink/15">
                  <div className="h-px w-1/3 bg-ink/70" />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <ul className="flex gap-4 whitespace-nowrap font-mono text-[11px] text-ink/50">
                    {three?.stages?.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    aria-label={three?.cta}
                    title={three?.cta}
                    className="group flex shrink-0 items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-white text-paper transition-transform duration-300 group-hover:scale-105">
                      <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </ol>
      </Container>
    </section>
  );
}

/**
 * "72 hours" in a green-to-black gradient. The number counts up from 0
 * every time the card scrolls into view (instant under reduced motion).
 */
function CountUpBig({ text }: { text: string }) {
  const match = /^(\d+)(.*)$/.exec(text);
  const target = match ? Number(match[1]) : 0;
  const rest = match ? match[2] : text;
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) run();
        else {
          cancelAnimationFrame(raf);
          setN(0);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <p
      ref={ref}
      aria-label={text}
      className="whitespace-nowrap bg-[linear-gradient(160deg,#3dc072_0%,#2a8f50_45%,#0c2414_100%)] bg-clip-text pb-1 text-[clamp(3rem,2.2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-transparent"
    >
      <span aria-hidden className="inline-block min-w-[1.7ch] tracking-[-0.085em] tabular-nums">
        {match ? n : ""}
      </span>
      <span aria-hidden>{rest}</span>
    </p>
  );
}

/** Dark ribbed glass with a diagonal streak of green light, decorative only. */
function RibbedGlass() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* diagonal light band */}
      <div className="absolute -inset-[20%] rotate-[-28deg] bg-[linear-gradient(90deg,transparent_30%,oklch(0.45_0.13_152/0.55)_44%,oklch(0.78_0.16_153/0.9)_50%,oklch(0.45_0.13_152/0.55)_56%,transparent_70%)] blur-xl" />
      <div className="absolute -inset-[20%] translate-x-[18%] rotate-[-28deg] bg-[linear-gradient(90deg,transparent_42%,oklch(0.6_0.15_153/0.35)_50%,transparent_58%)] blur-lg" />
      {/* vertical ribs of the glass */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,oklch(1_0_0/0.07)_0px,oklch(1_0_0/0)_2px,oklch(0_0_0/0.35)_5px,oklch(1_0_0/0)_8px)] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_6px,oklch(0_0_0/0.25)_7px,transparent_8px)]" />
      {/* keep text areas readable */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.1_0.008_150/0.75)_0%,transparent_40%,transparent_60%,oklch(0.1_0.008_150/0.8)_100%)]" />
    </div>
  );
}
