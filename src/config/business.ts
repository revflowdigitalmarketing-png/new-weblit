/**
 * Single source of truth for the business name, address and phone (NAP).
 * Every visible mention and the LocalBusiness JSON-LD read from here, so they
 * always match the Google Business Profile. Edit here only.
 */
export const BUSINESS = {
  name: "WEBLIT",
  /** Written exactly as it appears on the Google Business Profile. */
  address: "Global Designing Agency",
  phones: ["+91 8074398610", "+91 79820139"],
  email: "weblitofficial@gmail.com",
  tagline: "Websites that pay you back.",
  url: "https://www.weblit.online",
  displayUrl: "www.weblit.online",
  /** WhatsApp number in international format, digits only. */
  whatsapp: "918074398610",
  /** Paste the Google Maps "Embed a map" iframe src here. Empty = placeholder shown. */
  mapEmbedSrc: "",
  logo: {
    green: "/brand/weblit-logo-green.png",
    white: "/brand/weblit-logo-white.png",
    width: 817,
    height: 185,
  },
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0],
    logo: `${BUSINESS.url}${BUSINESS.logo.green}`,
    image: `${BUSINESS.url}${BUSINESS.logo.green}`,
    slogan: BUSINESS.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address,
    },
    contactPoint: BUSINESS.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
    })),
  };
}
