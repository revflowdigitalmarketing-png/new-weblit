/**
 * Price calculator settings (Differentiator, block 2).
 *
 * Only `base` is a confirmed price ("from INR 22,000 onwards"). Every other
 * rate below is a PLACEHOLDER until real rates are supplied: the card shows a
 * "[placeholder rates]" marker while `ratesArePlaceholders` is true.
 * Replace the numbers, then set ratesArePlaceholders to false. See docs/todo.md.
 */
export const pricing = {
  ratesArePlaceholders: true,
  currency: "₹",
  base: 22000,
  includedPages: 5, // placeholder
  perExtraPage: 2500, // placeholder
  minPages: 1,
  maxPages: 15,
  defaultPages: 5,
  addOns: [
    { id: "booking", label: "Booking system", price: 6000 }, // placeholder
    { id: "whatsapp", label: "WhatsApp chat", price: 2000 }, // placeholder
    { id: "blog", label: "Blog", price: 4000 }, // placeholder
    { id: "payments", label: "Online payments", price: 5000 }, // placeholder
  ],
} as const;

export function priceFor(pages: number, addOnIds: readonly string[]) {
  const extraPages = Math.max(0, pages - pricing.includedPages) * pricing.perExtraPage;
  const addOns = pricing.addOns
    .filter((a) => addOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return { total: pricing.base + extraPages + addOns, extras: extraPages + addOns };
}
