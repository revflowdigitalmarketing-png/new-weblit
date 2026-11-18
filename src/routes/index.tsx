import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { OurWork } from "@/components/sections/OurWork";
import { Process } from "@/components/sections/Process";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { Faq, faqJsonLd } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { hero } from "@/content/copy";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({
      title: "WEBLIT | Design Agency",
      description: hero.description,
      path: "/",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd()) }],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="main">
      <Hero />
      <OurWork />
      <Process />
      <LeadMagnet />
      <Faq />
      <FinalCta />
    </main>
  );
}
