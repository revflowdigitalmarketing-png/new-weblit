import { useEffect, useRef, useState } from "react";
import { BrowserMockup, WireframeScreen } from "@/components/site/BrowserMockup";
import { Container } from "@/components/site/Container";
import { Placeholder } from "@/components/site/Placeholder";
import { SectionIntro } from "@/components/site/SectionIntro";
import { work } from "@/content/copy";
import { workScreens, workUrlPlaceholder } from "@/content/work-screens";
import { cn } from "@/lib/utils";

export function OurWork() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The active industry is the one whose centre is closest to a line just
  // below the middle of the screen (below the sticky mockup on phones).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * (window.innerWidth >= 1024 ? 0.5 : 0.68);
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
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
  }, []);

  const screen = workScreens[active] ?? workScreens[0];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative overflow-x-clip py-24 sm:py-32"
    >
      <div aria-hidden className="glow glow-soft -right-[15%] top-[20%] h-[50vh] w-[60vw]" />
      <Container className="relative">
        <SectionIntro id="work-heading" heading={work.heading} description={work.description} />

        <div className="mt-14 grid gap-x-16 sm:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Mockup: sticky on the right (desktop), sticky on top (mobile) */}
          <div className="sticky top-[72px] z-10 -mx-5 bg-paper px-5 pb-6 pt-2 sm:-mx-8 sm:px-8 lg:order-1 lg:top-[calc(50vh-min(22vw,300px))] lg:mx-0 lg:h-fit lg:bg-transparent lg:px-0 lg:pb-0">
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
                      alt={`${work.industries[i]?.name} website`}
                      className="size-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <WireframeScreen variant={i} label={s.placeholder} />
                  )}
                </div>
              ))}
            </BrowserMockup>
            <div className="mt-4 flex justify-center gap-1.5 lg:mt-6" aria-hidden>
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

          {/* Industries scroll on the left */}
          <ol className="lg:order-2">
            {work.industries.map((item, i) => (
              <li
                key={item.name}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn(
                  "flex min-h-[46svh] flex-col items-start justify-center py-10 text-left transition-opacity duration-500 lg:min-h-[72svh]",
                  i === active ? "opacity-100" : "opacity-25",
                )}
              >
                <h3 className="text-[clamp(1.6rem,1.25rem+1.4vw,2.5rem)] font-medium leading-[1.08]">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-[28rem] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
