# WEBLIT: open placeholders and to-dos

Everything on the site that renders as a striped amber `[placeholder]`, plus open items
found while building. Copy lives in `src/content/copy.ts` (mirrors `docs/copy.md`);
name, address and phone live in `src/config/business.ts`.

## Placeholders on the page

| Where | Placeholder | What to supply | File |
| --- | --- | --- | --- |
| Our Work: mockup, Real Estate | `[Real Estate website screenshot]` | Screenshot of the real estate site (16:10, ~1600px wide) | `src/content/work-screens.ts` |
| Our Work: mockup, Healthcare | `[Healthcare website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup, Education | `[Education website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup, B2B Agencies | `[B2B Agencies website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup, Construction Companies | `[Construction Companies website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup, Car Retailer | `[Car Retailer website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup address bar | `[website URL]` × 6 | Live URL of each industry site | `src/content/work-screens.ts` |
| Differentiator: Owners we've built for | `[Client photo]` × 3 | Client profile photo (square, 160px+) | `src/content/copy.ts` → `differentiator.owners.clients` |
| Differentiator: Owners we've built for | `[Client name]` × 3 | Client name | same |
| Differentiator: Owners we've built for | `[Industry]` × 3 | Client industry | same |
| Differentiator: Owners we've built for | `[website URL]` × 3 | Live website URL (set `url` too, so the arrow link goes live) | same |
| Footer: map | `[Google Maps embed]` | Google Maps "Embed a map" iframe `src` for the business location | `src/config/business.ts` → `mapEmbedSrc` |

## Price calculator rates (placeholders)

The calculator in the Differentiator section shows a `[placeholder rates]` marker until real
rates are in `src/content/pricing.ts`. Only the ₹22,000 base is confirmed. Supply:

- Pages included in the ₹22,000 base (placeholder: 5)
- Price per extra page (placeholder: ₹2,500)
- Maximum pages on the slider (currently 15)
- Add-ons and their prices (placeholders: Booking system ₹6,000, WhatsApp chat ₹2,000,
  Blog ₹4,000, Online payments ₹5,000)

Then set `ratesArePlaceholders: false`.

## Links to pages not built yet

- **Privacy** and **Terms** in the footer link to `/privacy` and `/terms`. No copy supplied yet.

## Check before launch

- **Blueprint PDF vs pricing:** the last page of the blueprint says "Get a free landing page or
  website… Free, with no obligation", while the site says pricing starts at INR 22,000. Make
  the PDF and the site say the same thing.

- **Second phone number** `+91 79820139` has 8 digits after +91. Indian mobiles have 10.
  Confirm it against the Google Business Profile and fix it in `src/config/business.ts`.
- **Address** is `Global Designing Agency`, as given. If the Google Business Profile shows a
  street address, put it in `BUSINESS.address` exactly as written there (it feeds the
  footer, the contact page and the LocalBusiness JSON-LD).
- **Contact form** has no backend yet. It validates and shows the success message, but the
  answers aren't sent anywhere. Wire `handleSubmit` in `src/routes/contact.tsx` to an
  email service, a Lovable Cloud function or a form endpoint.
