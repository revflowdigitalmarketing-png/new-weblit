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
        <div className="mx-auto max-w-[1120px] rounded-[2rem] bg-fill p-6 text-center sm:p-10 lg:p-12">
          <Logo className="mx-auto w-[120px]" />
          <p className="mt-4 font-display text-xl leading-tight tracking-[-0.045em] text-ink sm:text-2xl">
            {BUSINESS.tagline}
          </p>

          <nav aria-label="Footer" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[0.9375rem] text-ink/75">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mx-auto mt-10 grid max-w-[880px] items-stretch gap-6 text-sm text-ink/70 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4 rounded-[1.25rem] bg-surface p-6">
              <Nap />
              <a
                href={`mailto:${BUSINESS.email}`}
                className="break-all transition-colors hover:text-brand"
              >
                {BUSINESS.email}
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] md:aspect-auto md:min-h-[200px]">
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

          <p className="mt-10 border-t border-ink/[0.07] pt-6 text-sm text-ink/50">
            {footer.copyright}{" "}
            <a href={BUSINESS.url} className="transition-colors hover:text-brand">
              {BUSINESS.displayUrl}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
