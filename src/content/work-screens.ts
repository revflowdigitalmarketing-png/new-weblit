/**
 * Website shown in the Our Work mockup for each industry (same order as
 * work.industries in copy.ts). Leave `image` empty to show the neutral
 * placeholder; `url` empty shows the [website URL] placeholder in the address bar.
 */
export const workScreens = [
  { image: "/work/real-estate.webp", url: "nirvishikhara.com", placeholder: "" },
  { image: "/work/healthcare.webp", url: "lalithaclinics.org", placeholder: "" },
  { image: "/work/education.webp", url: "", placeholder: "" },
  { image: "/work/b2b-agency.webp", url: "revflowmarketing.in", placeholder: "" },
  { image: "/work/construction.webp", url: "", placeholder: "" },
  { image: "", url: "", placeholder: "[Car Retailer website screenshot]" },
] as const;

export const workUrlPlaceholder = "[website URL]";
