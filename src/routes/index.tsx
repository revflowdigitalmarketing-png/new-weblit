import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { OurWork } from "@/components/sections/OurWork";
import { Differentiator } from "@/components/sections/Differentiator";
import { hero } from "@/content/copy";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "WEBLIT | Websites built to get you more customers, published in 72 hours",
      description: hero.description,
      path: "/",
    }),
  component: Index,
});

function Index() {
  return (
    <main id="main">
      <Hero />
      <OurWork />
      <Differentiator />
    </main>
  );
}
