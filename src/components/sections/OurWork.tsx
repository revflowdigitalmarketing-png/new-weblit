import { useEffect, useRef, useState } from "react";
import { BrowserMockup, WireframeScreen } from "@/components/site/BrowserMockup";
import { Container } from "@/components/site/Container";
import { Placeholder } from "@/components/site/Placeholder";
import { SectionIntro } from "@/components/site/SectionIntro";
import { work } from "@/content/copy";
import { workScreens, workUrlPlaceholder } from "@/content/work-screens";
import { cn } from "@/lib/utils";

/** Scroll distance (in viewport heights) each industry holds the stage. */
const STEP_VH = 70;

/**
 * Pinned stage: the mockup and text stay in place while the visitor scrolls.
 * Each step swaps the mockup (crossfade) and reveals the next industry's text
 * in the same spot, rising from its bottom edge, instead of scrolling a list.
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

  return (
    <section id="work" aria-labelledby="work-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionIntro id="work-heading" heading={work.heading} description={work.description} />
      </Container>

      <div ref={trackRef} style={{ height: `${n * STEP_VH + 30}svh` }} className="relative mt-6">
        <div className="sticky top-0 flex h-[100svh] items-center pt-[72px]">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
              {/* Mockup */}
              <div>
                <BrowserMockup
                  address={
                    screen.url ? (
                      screen.url
                    ) : (
                      <Placeholder className="text-[10px] sm:text-[11px]">
                        {workUrlPlaceholder}
                      </Placeholder>
                    )
                  }
                >
                  {workScreens.map((s, i) => (
                    <div
                      key={i}
                      aria-hidden={i !== active}
                      className={cn(
                        "absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                        i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                      )}
                    >
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={`${work.industries[i]?.name} website we built`}
                          className="size-full object-cover object-top"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      ) : (
                        <WireframeScreen variant={i} label={s.placeholder} />
                      )}
                    </div>
                  ))}
                </BrowserMockup>
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
                        "absolute inset-x-0 top-0",
                        on
                          ? "translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)] [transition:clip-path_0.9s_var(--ease-out-soft)_0.2s,transform_0.9s_var(--ease-out-soft)_0.2s,opacity_0.4s_ease_0.2s]"
                          : "pointer-events-none translate-y-4 opacity-0 [clip-path:inset(100%_0_0_0)] [transition:opacity_0.3s_ease,clip-path_0s_linear_0.3s,transform_0s_linear_0.3s]",
                      )}
                    >
                      <h3 className="text-[clamp(1.6rem,1.25rem+1.4vw,2.5rem)] font-medium leading-[1.08]">
                        {item.name}
                      </h3>
                      <p className="mt-4 max-w-[27rem] text-[0.875rem] leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
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
