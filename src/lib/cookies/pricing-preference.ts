import { cookies } from "next/headers";

export const PRICING_PREF_COOKIE = "ht_pricing_pref";

export interface PricingPreference {
  countryCode: string;
  /** User opted in to remember selection. */
  remember: boolean;
  updatedAt: string;
}

export async function readPricingPreference(): Promise<PricingPreference | null> {
  const jar = await cookies();
  const raw = jar.get(PRICING_PREF_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as PricingPreference;
    if (!parsed.countryCode || parsed.countryCode.length !== 2) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function serializePricingPreference(pref: PricingPreference): string {
  return encodeURIComponent(JSON.stringify(pref));
}
