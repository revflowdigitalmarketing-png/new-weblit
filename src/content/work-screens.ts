/**
 * Website shown in the Our Work mockup for each industry (same order as
 * work.industries in copy.ts). Clicking the frame opens `url` in a new tab.
 * `w`/`h` are the screenshot's pixel size; the frame takes that shape so nothing is cropped.
 */
export const workScreens = [
  { image: "/work/real-estate.webp", w: 1366, h: 768, url: "nirvishikhara.com" },
  { image: "/work/healthcare.webp", w: 1351, h: 768, url: "lalithaclinics.org" },
  { image: "/work/education.webp", w: 1366, h: 641, url: "dollardreams.lovable.app" },
  { image: "/work/b2b-agency.webp", w: 1366, h: 641, url: "revflowmarketing.in" },
  { image: "/work/construction.webp", w: 1345, h: 768, url: "araconstructions.com" },
  { image: "/work/car-retailer.webp", w: 1366, h: 641, url: "carzspa.lovable.app" },
] as const;
