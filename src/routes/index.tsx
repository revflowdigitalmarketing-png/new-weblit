import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WEBLIT" },
      { name: "description", content: "WEBLIT" },
      { property: "og:title", content: "WEBLIT" },
      { property: "og:description", content: "WEBLIT" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold text-foreground">WEBLIT</h1>
    </main>
  );
}
