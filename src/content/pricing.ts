/**
 * Price calculator (Differentiator, block 2).
 *
 * 1. Current rate        = enquiries / visitors
 * 2. Gap                 = targetRate - current rate (minimum 0)
 * 3. Extra enquiries/mo  = visitors x gap x captureShare
 * 4. Extra clients/mo    = extra enquiries x (clients per 10 / 10)
 * 5. Extra return/year   = extra clients x value x 12
 * 6. Price               = feeShare of extra return, at least minPrice, at most maxPrice
 */
export const pricing = {
  currency: "₹",
  targetRate: 0.03,
  captureShare: 0.25,
  feeShare: 0.1,
  minPrice: 22000,
  /** Highest price the calculator will show. null = no cap (set your max here). */
  maxPrice: null as number | null,
};

export type PriceInputs = {
  visitors: number;
  enquiries: number;
  clientsPer10: number;
  value: number;
};

export function priceFor({ visitors, enquiries, clientsPer10, value }: PriceInputs) {
  const currentRate = visitors > 0 ? enquiries / visitors : 0;
  const gap = Math.max(0, pricing.targetRate - currentRate);
  const extraEnquiries = visitors * gap * pricing.captureShare;
  const extraClients = extraEnquiries * (clientsPer10 / 10);
  const extraReturnYear = extraClients * value * 12;
  let price = Math.max(pricing.minPrice, extraReturnYear * pricing.feeShare);
  if (pricing.maxPrice !== null) price = Math.min(price, pricing.maxPrice);
  return { price: Math.round(price), extraEnquiries, extraClients, extraReturnYear };
}
