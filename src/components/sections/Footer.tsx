import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { Nap } from "@/components/site/Nap";
import { Placeholder } from "@/components/site/Placeholder";
import { BUSINESS, whatsappHref } from "@/config/business";
import { footer } from "@/content/copy";

const label = "mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/40";
const link = "transition-colors duration-300 hover:text-brand";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Details */}
      <Container className="relative z-10 pt-16 sm:pt-20">
        <div className="grid gap-12 border-t border-ink/[0.08] pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="max-w-[14ch] font-display text-2xl leading-[1.1] tracking-[-0.035em] text-ink sm:text-[1.75rem]">
              {BUSINESS.tagline}
            </p>
          </div>

          <div className="text-[0.9375rem] leading-relaxed text-ink/70 md:col-span-3">
            <p className={label}>{footer.labels.contact}</p>
            <Nap />
            <a href={`mailto:${BUSINESS.email}`} className={`${link} mt-3 block break-all`}>
              {BUSINESS.email}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} mt-1 block`}
            >
              WhatsApp ↗
            </a>
          </div>

          <nav aria-label="Footer" className="text-[0.9375rem] text-ink/70 md:col-span-2">
            <p className={label}>{footer.labels.pages}</p>
            <ul className="flex flex-col gap-1.5">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className={label}>{footer.labels.location}</p>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
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
                <div className="placeholder-surface absolute inset-0 grid place-items-center p-3">
                  <Placeholder className="text-[11px]">[Google Maps embed]</Placeholder>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Green crest with the logo, after the reference */}
      <div className="relative mt-10 pt-[150px] sm:mt-14 sm:pt-[220px] lg:pt-[280px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* soft halo above the crest */}
          <div className="absolute -left-[10%] top-[8%] h-[70%] w-[120%] rotate-[-4deg] rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.718_0.16_153/0.35),transparent)] blur-2xl" />
          {/* the crest: a wide hill, bright edge fading into deep green and black */}
          <div className="absolute -left-[25%] top-[26%] h-[160%] w-[150%] rotate-[-5deg] rounded-[50%] bg-[linear-gradient(180deg,oklch(0.97_0.03_140)_0%,oklch(0.86_0.12_150)_3%,oklch(0.718_0.16_153)_8%,oklch(0.45_0.11_150)_18%,oklch(0.299_0.076_144.7)_28%,oklch(0.13_0.009_134.1)_48%)] blur-[10px]" />
          {/* fine bright rim */}
          <div className="absolute -left-[25%] top-[26%] h-[160%] w-[150%] rotate-[-5deg] rounded-[50%] shadow-[0_-2px_24px_0_oklch(0.95_0.05_145/0.55)] blur-[2px]" />
        </div>

        <Container className="relative flex items-end justify-between gap-6 pb-5 sm:pb-10">
          <Logo className="w-[min(68vw,560px)]" />
          <p className="hidden shrink-0 pb-2 text-right text-xs leading-relaxed text-ink/60 sm:block">
            {footer.copyright}{" "}
            <a href={BUSINESS.url} className={link}>
              {BUSINESS.displayUrl}
            </a>
          </p>
        </Container>
        <p className="relative pb-28 text-center text-xs text-ink/60 sm:hidden">
          {footer.copyright}{" "}
          <a href={BUSINESS.url} className={link}>
            {BUSINESS.displayUrl}
          </a>
        </p>
      </div>
    </footer>
  );
}
