import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { faq } from "@/content/copy";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:h-fit">
          <h2 id="faq-heading" className="text-display-lg max-w-[12ch]">
            {faq.heading}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <Accordion.Root type="single" collapsible className="flex flex-col gap-2.5">
            {faq.items.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`q${i}`}
                className="group overflow-hidden rounded-[1.5rem] bg-fill transition-colors duration-300 data-[state=open]:bg-fill-strong"
              >
                <Accordion.Header asChild>
                  <h3>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-sans text-lg font-medium tracking-[-0.015em] text-ink sm:px-7 sm:py-6 sm:text-xl">
                      {item.q}
                      <span
                        aria-hidden
                        className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 ease-[var(--ease-out-soft)] group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand group-data-[state=open]:text-white"
                      >
                        <Plus className="size-4" strokeWidth={1.75} />
                      </span>
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[40rem] px-6 pb-6 text-base leading-relaxed text-muted-foreground sm:px-7 sm:pb-7 sm:text-lg">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </Container>
    </section>
  );
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
