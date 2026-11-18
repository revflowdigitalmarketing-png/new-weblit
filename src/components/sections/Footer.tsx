import { FluidWordmark } from "@/components/site/FluidWordmark";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { BUSINESS, telHref, whatsappHref } from "@/config/business";
import { footer } from "@/content/copy";

const heading = "mb-3 text-[0.8125rem] font-medium text-ink sm:mb-4";
const link = "text-ink/55 transition-colors duration-300 hover:text-ink";

/** Footer after the reference: quiet details up top, the wordmark large at the bottom. */
export function Footer() {
  const legal = footer.links.filter((l) => l.label === "Privacy" || l.label === "Terms");
  const pages = footer.links.filter((l) => !legal.includes(l));

  return (
    <footer className="relative mt-12 overflow-hidden sm:mt-16">
      <Container>
        <div className="grid gap-8 border-t border-ink/[0.08] pt-8 text-[0.8125rem] sm:pt-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="flex items-start gap-4 md:col-span-6">
            <Logo className="mt-0.5 w-[84px] shrink-0" />
            <span aria-hidden className="h-6 w-px shrink-0 bg-ink/15" />
            <p className="max-w-[17rem] leading-relaxed text-ink/55">
              {BUSINESS.tagline.replace(/\.$/, "")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-[1fr_1.4fr]">
            <nav aria-label="Footer">
              <p className={heading}>{footer.labels.pages}</p>
              <ul className="flex flex-col gap-2">
                {pages.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="not-italic">
              <p className={heading}>{footer.labels.contact}</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href={`mailto:${BUSINESS.email}`} className={`${link} break-all`}>
                    {BUSINESS.email}
                  </a>
                </li>
                {BUSINESS.phones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} className={link}>
                      {p}
                    </a>
                  </li>
                ))}
                <li className="text-ink/55">
                  {BUSINESS.name}, {BUSINESS.address}
                </li>
                <li>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                    WhatsApp ↗
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/[0.08] py-5 text-xs text-ink/45 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footer.copyright}{" "}
            <a href={BUSINESS.url} className="transition-colors hover:text-ink">
              {BUSINESS.displayUrl}
            </a>
          </p>
          <ul className="flex gap-6">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-ink/70 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <FluidWordmark />
    </footer>
  );
}
