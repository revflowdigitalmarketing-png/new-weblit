import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { nav } from "@/content/copy";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
        scrolled || open
          ? "bg-paper/70 shadow-[0_1px_0_0_oklch(1_0_0/0.06)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="WEBLIT home" className="-m-2 p-2">
          <Logo className="w-[96px] sm:w-[108px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-9">
            {nav.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[0.9375rem] text-ink/70 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink to="/contact" size="md">
            {nav.cta}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6" aria-hidden>
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-300",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-transform duration-300",
                open && "-translate-y-[5.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-ink/5 bg-paper/95 backdrop-blur-xl md:hidden"
      >
        <Container className="pb-8 pt-4">
          <ul className="flex flex-col">
            {nav.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-3xl tracking-[-0.035em] text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}

/**
 * Mobile-only CTA pinned to the bottom of the screen, within thumb reach.
 * Appears whenever the hero CTA is off screen; hidden on the contact page.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Show whenever the hero CTA is off screen (including below the fold on
    // short phones). Pages without one fall back to a scroll threshold.
    const heroCta = document.getElementById("hero-cta");
    if (heroCta && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(([entry]) => setShow(!entry?.isIntersecting), {
        threshold: 1,
      });
      io.observe(heroCta);
      return () => io.disconnect();
    }
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] md:hidden",
        "bg-gradient-to-t from-paper via-paper/80 to-paper/0",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <ButtonLink
        to="/contact"
        className="w-full shadow-[0_10px_30px_-10px_oklch(0.718_0.16_153/0.6)]"
      >
        {nav.cta}
      </ButtonLink>
    </div>
  );
}
