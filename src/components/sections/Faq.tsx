import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { faq } from "@/content/copy";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 sm:py-32">
      <Container className="mx-auto max-w-[860px]">
        <Reveal className="text-center">
          <h2 id="faq-heading" className="text-display-lg mx-auto max-w-[16ch]">
            {faq.heading}
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <Accordion.Root type="single" collapsible className="flex flex-col gap-2.5">
            {faq.items.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`q${i}`}
                className="group overflow-hidden rounded-[1.5rem] bg-fill transition-colors duration-300 data-[state=open]:bg-fill-strong"
              >
                <Accordion.Header asChild>
                  <h3>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left font-sans text-base font-medium tracking-[-0.01em] text-ink sm:px-6 sm:py-5 sm:text-[1.0625rem]">
                      {item.q}
                      <span
                        aria-hidden
                        className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-ink transition-transform duration-500 ease-[var(--ease-out-soft)] group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand group-data-[state=open]:text-paper"
                      >
                        <Plus className="size-4" strokeWidth={1.75} />
                      </span>
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[40rem] px-5 pb-5 text-[0.9375rem] leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
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
