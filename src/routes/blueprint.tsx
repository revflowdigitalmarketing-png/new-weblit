import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Hammer } from "lucide-react";
import { Container } from "@/components/site/Container";
import { GlassBackdrop } from "@/components/site/GlassBackdrop";
import { BlueprintFrame, IconTile, Pill } from "@/components/site/LeadParts";
import { Reveal } from "@/components/site/Reveal";
import { blueprintPage, leadMagnet } from "@/content/copy";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blueprint")({
  head: () =>
    pageHead({
      title: `${blueprintPage.title} | WEBLIT`,
      description: `${leadMagnet.subheading}. ${blueprintPage.description}`,
      path: "/blueprint",
    }),
  component: BlueprintPage,
});

function BlueprintPage() {
  const t = blueprintPage;
  const skip = t.skip;
  return (
    <main id="main">
      {/* The blueprint, in place of the reference's video */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
        <GlassBackdrop />
        <Container className="text-center">
          <Reveal>
            <h1 className="mx-auto max-w-[24ch] text-[clamp(1.6rem,1.2rem+1.8vw,2.75rem)] font-medium leading-[1.12] text-ink">
              <span className="font-semibold">{t.titleLead}</span> {t.title}
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-4 max-w-[34rem] text-sm leading-relaxed text-ink/65 sm:text-base">
              {t.description}
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10 sm:mt-12">
            <BlueprintFrame href={leadMagnet.pdf} label={`${t.open}: ${t.title}`} />
          </Reveal>
          <Reveal delay={200}>
            <a
              href={leadMagnet.pdf}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-white sm:w-auto"
            >
              <Download className="size-4" strokeWidth={2} aria-hidden />
              {t.open}
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Skip the work */}
      <section aria-labelledby="skip-heading" className="pb-20 pt-10 sm:pb-28">
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-[880px] rounded-[1.75rem] bg-fill px-6 pb-12 pt-16 text-center sm:px-12 sm:pb-14 sm:pt-20">
              <IconTile
                icon={Hammer}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-paper/80"
              />
              <Pill>{skip.pill}</Pill>
              <h2 id="skip-heading" className="text-display-lg mx-auto mt-5 max-w-[16ch]">
                {skip.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink/65 sm:text-base">
                {skip.intro}
              </p>
              <ul className="mx-auto mt-6 flex max-w-[30rem] flex-col gap-2.5 text-left text-[0.9375rem] text-ink/85">
                {skip.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-6 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink/65 sm:text-base">
                {skip.closing}
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-[oklch(0.78_0.16_153)] sm:w-auto"
              >
                {skip.cta}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
