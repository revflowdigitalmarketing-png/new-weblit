import { useEffect, useRef, useState } from "react";
import { BrowserMockup } from "@/components/site/BrowserMockup";
import { Container } from "@/components/site/Container";
import { SectionIntro } from "@/components/site/SectionIntro";
import { work } from "@/content/copy";
import { workScreens } from "@/content/work-screens";
import { cn } from "@/lib/utils";

/** One frame shape for every site, tall enough for the tallest screenshot, so nothing is cropped. */
const FRAME_RATIO = Math.max(...workScreens.map((s) => s.h / s.w));

/** Scroll distance (in viewport heights) each industry holds the stage. */
const STEP_VH = 70;

const swapIn = (delay: number) =>
  ({ animation: `swap-in 0.8s var(--ease-out-soft) ${delay}s both` }) as const;

/**
 * Pinned stage: the mockup and text stay in place while the visitor scrolls.
 * Each step crossfades the mockup, the old text softly blurs away, and the
 * next industry settles into the same spot (heading, then description).
 */
export function OurWork() {
  const n = work.industries.length;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0;
      setActive(Math.min(n - 1, Math.floor(progress * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [n]);

  const screen = workScreens[active] ?? workScreens[0];
  const href = `https://${screen.url}`;
  const name = work.industries[active]?.name ?? "";

  return (
    <section id="work" aria-labelledby="work-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionIntro id="work-heading" heading={work.heading} description={work.description} />
      </Container>

      <div ref={trackRef} style={{ height: `${n * STEP_VH + 30}svh` }} className="relative mt-6">
        <div className="sticky top-0 flex h-[100svh] items-center pt-[72px]">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
              {/* Mockup: the whole frame opens the live site in a new tab */}
              <div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${name} website we built, ${screen.url} (new tab)`}
                  className="block transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1"
                >
                  <BrowserMockup address={screen.url} ratio={FRAME_RATIO}>
                    {workScreens.map((s, i) => (
                      <div
                        key={i}
                        aria-hidden={i !== active}
                        className={cn(
                          "absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                          i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                        )}
                      >
                        {/* blurred copy fills any space around a shorter screenshot */}
                        <img
                          src={s.image}
                          alt=""
                          aria-hidden
                          className="absolute inset-0 size-full scale-110 object-cover opacity-60 blur-2xl"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                        <img
                          src={s.image}
                          alt={`${work.industries[i]?.name} website we built`}
                          className="relative size-full object-contain"
                          width={s.w}
                          height={s.h}
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </BrowserMockup>
                </a>
                <div className="mt-4 flex justify-center gap-1.5 lg:mt-5" aria-hidden>
                  {work.industries.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === active ? "w-6 bg-brand" : "w-1.5 bg-ink/15",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Text: every industry occupies the same spot; only the active one shows */}
              <div className="relative min-h-[11.5rem] sm:min-h-[12.5rem]">
                {work.industries.map((item, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={item.name}
                      aria-hidden={!on}
                      className={cn(
                        "absolute inset-x-0 top-0 transition-[opacity,filter] duration-300",
                        on ? "opacity-100" : "pointer-events-none opacity-0 blur-sm",
                      )}
                    >
                      <h3
                        key={on ? "on" : "off"}
                        style={on ? swapIn(0.15) : undefined}
                        className="text-[clamp(1.6rem,1.25rem+1.4vw,2.5rem)] font-medium leading-[1.08]"
                      >
                        {item.name}
                      </h3>
                      <p
                        key={on ? "p-on" : "p-off"}
                        style={on ? swapIn(0.3) : undefined}
                        className="mt-4 max-w-[27rem] text-[0.875rem] leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
                      >
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
