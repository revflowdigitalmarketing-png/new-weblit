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

      {/* Green globe crest with the logo */}
      <div className="relative mt-2 pt-[64px] sm:mt-10 sm:pt-[150px] lg:pt-[190px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* soft halo above the crest */}
          <div className="absolute -left-[10%] top-0 h-[80%] w-[120%] rotate-[-4deg] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.718_0.16_153/0.35),transparent)] blur-2xl" />
          {/* the crest: a wide globe edge, bright rim fading into deep green and black */}
          <div className="absolute -left-[25%] top-[22%] h-[220%] w-[150%] rotate-[-5deg] rounded-[50%] bg-[linear-gradient(180deg,oklch(0.97_0.03_140)_0%,oklch(0.86_0.12_150)_3%,oklch(0.718_0.16_153)_8%,oklch(0.45_0.11_150)_18%,oklch(0.299_0.076_144.7)_28%,oklch(0.13_0.009_134.1)_48%)] blur-[10px]" />
          {/* fine bright rim */}
          <div className="absolute -left-[25%] top-[22%] h-[220%] w-[150%] rotate-[-5deg] rounded-[50%] shadow-[0_-2px_24px_0_oklch(0.95_0.05_145/0.55)] blur-[2px]" />
        </div>
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
