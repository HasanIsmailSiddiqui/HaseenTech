import { headers, cookies } from "next/headers";
import { readPricingPreference } from "@/lib/cookies/pricing-preference";
import { detectCountryFromRequest } from "@/lib/geo/detect-country";
import { countryName } from "@/lib/geo/countries";
import { listPackagesForCountry } from "@/lib/pricing/resolve";
import { formatMoney } from "@/lib/pricing/format";

export async function getServerPricingContext() {
  const headerStore = await headers();
  const request = new Request("http://local", { headers: headerStore });
  const detected = detectCountryFromRequest(request);
  const pref = await readPricingPreference();

  const countryCode = pref?.countryCode ?? detected ?? null;
  const source = pref ? "preference" : detected ? "geo" : "fallback";

  const listing = await listPackagesForCountry(countryCode);

  return {
    detectedCountry: detected,
    selectedCountry: listing.countryCode,
    selectedCountryName: countryName(listing.countryCode),
    source,
    rememberPreference: Boolean(pref?.remember),
    market: {
      id: listing.market.id,
      label: listing.market.label,
      currency: listing.market.currency,
      locale: listing.market.locale,
    },
    policy: listing.policy,
    packages: listing.packages,
    displayNote: `Prices shown for ${listing.market.label} (${listing.market.currency}). Starting prices; final quote may vary after scope review.`,
    formattedExample: formatMoney(
      listing.market.prices.starter,
      listing.market.currency,
      listing.market.locale,
    ),
  };
}

export type ServerPricingContext = Awaited<ReturnType<typeof getServerPricingContext>>;
