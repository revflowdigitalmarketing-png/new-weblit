# WEBLIT: open placeholders and to-dos

Everything on the site that renders as a striped amber `[placeholder]`, plus open items
found while building. Copy lives in `src/content/copy.ts` (mirrors `docs/copy.md`);
name, address and phone live in `src/config/business.ts`.

## Placeholders on the page

| Where | Placeholder | What to supply | File |
| --- | --- | --- | --- |
| Our Work: mockup, Car Retailer | `[Car Retailer website screenshot]` | Screenshot | `src/content/work-screens.ts` |
| Our Work: mockup address bar | `[website URL]` for Education, Construction Companies and Car Retailer | Live URL (Dollar Dreams and ARA Constructions sites) | `src/content/work-screens.ts` |
| Footer: map | `[Google Maps embed]` | Google Maps "Embed a map" iframe `src` for the business location | `src/config/business.ts` → `mapEmbedSrc` |

## Price calculator

Four required answers (monthly visitors, monthly enquiries, clients per 10 enquiries, value per
client). Price = 10% of the extra yearly return from lifting the enquiry rate toward 3%, at least
INR 22,000. Settings live in `src/content/pricing.ts`.

- **Set your maximum price:** `maxPrice` is `null` (no cap) until you give a number.

## Links to pages not built yet

- **Privacy** and **Terms** in the footer link to `/privacy` and `/terms`. No copy supplied yet.

## Check before launch

- **Blueprint email step** has no backend yet. It checks the email, starts the PDF download and
  shows the confirmation, but the email isn't saved or sent anywhere. Wire `handleSubmit` in
  `src/routes/blueprint.tsx` to your email list or CRM so the guide collects leads.

- **Blueprint PDF vs pricing:** the last page of the blueprint says "Get a free landing page or
  website… Free, with no obligation", while the site says pricing starts at INR 22,000. Make
  the PDF and the site say the same thing.

- **Second phone number** `+91 79820139` has 8 digits after +91. Indian mobiles have 10.
  Confirm it against the Google Business Profile and fix it in `src/config/business.ts`.
- **Address** is `Global Designing Agency`, as given. If the Google Business Profile shows a
  street address, put it in `BUSINESS.address` exactly as written there (it feeds the
  footer, the contact page and the LocalBusiness JSON-LD).
- **Client photos:** the three owner cards use plain white avatars with initials. Send photos to replace them.
- **Contact form** has no backend yet. It validates and shows the success message, but the
  answers aren't sent anywhere. Wire `handleSubmit` in `src/routes/contact.tsx` to an
  email service, a Lovable Cloud function or a form endpoint.
