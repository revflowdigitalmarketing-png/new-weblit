import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { Nap } from "@/components/site/Nap";
import { Placeholder } from "@/components/site/Placeholder";
import { BUSINESS } from "@/config/business";
import { footer } from "@/content/copy";

export function Footer() {
  return (
    <footer className="pb-28 pt-6 md:pb-10">
      <Container>
        <div className="rounded-[2rem] bg-fill p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr_1.1fr] lg:gap-10">
            <div>
              <Logo className="w-[132px]" />
              <p className="mt-5 max-w-[16rem] font-display text-2xl leading-tight tracking-[-0.03em] text-ink">
                {BUSINESS.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-[0.9375rem] text-ink/75">
              <Nap />
              <div className="flex flex-col gap-6">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="break-all transition-colors hover:text-brand"
                >
                  {BUSINESS.email}
                </a>
                <nav aria-label="Footer">
                  <ul className="flex flex-col gap-1.5">
                    {footer.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="transition-colors hover:text-brand">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] lg:aspect-auto lg:min-h-[240px]">
              {BUSINESS.mapEmbedSrc ? (
                <iframe
                  src={BUSINESS.mapEmbedSrc}
                  title={`${BUSINESS.name} on Google Maps`}
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="placeholder-surface absolute inset-0 grid place-items-center p-4">
                  <Placeholder>[Google Maps embed]</Placeholder>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-ink/[0.07] pt-6 text-sm text-ink/55 sm:flex-row sm:justify-between">
            <p>
              {footer.copyright}{" "}
              <a href={BUSINESS.url} className="transition-colors hover:text-brand">
                {BUSINESS.displayUrl}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
