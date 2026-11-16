import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { Nap } from "@/components/site/Nap";
import { Placeholder } from "@/components/site/Placeholder";
import { BUSINESS, whatsappHref } from "@/config/business";
import { footer } from "@/content/copy";

const label = "mb-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/40 sm:mb-3.5";
const link = "transition-colors duration-300 hover:text-brand";

export function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden sm:mt-16">
      {/* Details */}
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/[0.08] pt-5 text-[0.8125rem] leading-relaxed text-ink/70 sm:pt-10 md:grid-cols-12 md:gap-8 md:text-sm">
          <p className="col-span-2 max-w-[22ch] font-display text-base leading-snug tracking-[-0.03em] text-ink sm:text-xl md:col-span-4 md:max-w-[14ch]">
            {BUSINESS.tagline}
          </p>

          <div className="md:col-span-3">
            <p className={label}>{footer.labels.contact}</p>
            <Nap />
            <a href={`mailto:${BUSINESS.email}`} className={`${link} mt-2 block break-all`}>
              {BUSINESS.email}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} block`}
            >
              WhatsApp ↗
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className={label}>{footer.labels.pages}</p>
            <ul className="flex flex-col gap-0.5 md:gap-1">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className={label}>{footer.labels.location}</p>
            <div className="relative h-14 overflow-hidden rounded-lg sm:h-28 md:aspect-[16/10] md:h-auto">
              {BUSINESS.mapEmbedSrc ? (
                <iframe
                  src={BUSINESS.mapEmbedSrc}
                  title={`${BUSINESS.name} on Google Maps`}
                  className="absolute inset-0 size-full border-0 grayscale-[0.6] invert-[0.9] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="placeholder-surface absolute inset-0 grid place-items-center p-2">
                  <Placeholder className="text-[10px]">[Google Maps embed]</Placeholder>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Irregular green ridge with the logo, after the reference */}
      <div className="relative mt-2 pt-[64px] sm:mt-10 sm:pt-[150px] lg:pt-[190px]">
        <Ridge />
        <Container className="relative flex items-end justify-between gap-4 pb-4 sm:pb-8">
          <Logo className="w-[min(46vw,340px)]" />
          <p className="shrink-0 pb-0.5 text-right text-[10px] leading-relaxed text-ink/60 sm:text-xs">
            {footer.copyright}{" "}
            <a href={BUSINESS.url} className={link}>
              {BUSINESS.displayUrl}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

/**
 * Irregular hill: low on the left, peaking left of centre, easing down to the
 * right. Stacked blurred copies of the same edge, each shifted down and darker,
 * so the bright rim follows the curve (cream > bright green > logo green > black).
 * Stretches to any width, so phones keep the same silhouette.
 */
const RIDGE =
  "M0,250 C120,232 230,170 330,118 C420,72 480,46 560,50 C660,56 720,112 820,140 C930,170 1040,160 1160,168 C1280,176 1360,158 1440,150 L1440,900 L0,900 Z";

const LAYERS = [
  { dy: -18, fill: "#3dc072", opacity: 0.22, blur: 26 },
  { dy: 0, fill: "#f2f6e6", opacity: 0.95, blur: 5 },
  { dy: 7, fill: "#a6e6b6", opacity: 1, blur: 8 },
  { dy: 20, fill: "#3dc072", opacity: 1, blur: 14 },
  { dy: 55, fill: "#1f7a3f", opacity: 1, blur: 22 },
  { dy: 105, fill: "#103713", opacity: 1, blur: 28 },
  { dy: 175, fill: "#060805", opacity: 1, blur: 30 },
] as const;

function Ridge() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
    >
      <defs>
        {LAYERS.map((l, i) => (
          <filter key={i} id={`ridge-blur-${i}`} x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation={l.blur} />
          </filter>
        ))}
      </defs>
      {LAYERS.map((l, i) => (
        <path
          key={i}
          d={RIDGE}
          fill={l.fill}
          opacity={l.opacity}
          transform={`translate(0 ${l.dy})`}
          filter={`url(#ridge-blur-${i})`}
        />
      ))}
    </svg>
  );
}
