import { BUSINESS } from "@/config/business";

/** Per-page title, description, canonical and Open Graph tags. */
export function pageHead({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${BUSINESS.url}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
