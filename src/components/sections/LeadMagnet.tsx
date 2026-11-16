import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/site/Container";
import { GlassBackdrop } from "@/components/site/GlassBackdrop";
import { IconTile, Pill } from "@/components/site/LeadParts";
import { Reveal } from "@/components/site/Reveal";
import { leadMagnet } from "@/content/copy";

/** Lead magnet teaser, after the reference: icon, pill, headline, line, one button. */
export function LeadMagnet() {
  return (
    <section
      aria-labelledby="blueprint-heading"
      className="relative isolate overflow-hidden py-24 text-center sm:py-32"
    >
      <GlassBackdrop />
      <Container className="flex flex-col items-center">
        <Reveal>
          <IconTile icon={BookOpen} />
        </Reveal>
        <Reveal delay={60} className="mt-8">
          <Pill>{leadMagnet.heading}</Pill>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="blueprint-heading" className="text-display-lg mx-auto mt-5 max-w-[18ch] text-ink">
            {leadMagnet.subheading}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-5 max-w-[30rem] text-base leading-relaxed text-white sm:text-lg">
            {leadMagnet.line}
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-9 w-full sm:w-auto">
          <Link
            to="/blueprint"
            className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-white sm:w-auto"
          >
            {leadMagnet.cta}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
