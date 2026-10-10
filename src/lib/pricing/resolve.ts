import type {
  CheckoutPackageId,
  CurrencyCode,
  MarketDefinition,
  MarketId,
  PackageId,
} from "@/data/pricing/types";
import { getCatalogPackage } from "@/data/pricing/catalog";
import { formatMoney } from "@/lib/pricing/format";
import { getEffectiveMarkets, getEffectivePolicy } from "@/lib/pricing/overrides";

const countryToMarketCache = new Map<string, MarketId>();

function buildCountryIndex(markets: MarketDefinition[]) {
  countryToMarketCache.clear();
  for (const market of markets) {
    for (const code of market.countries) {
      countryToMarketCache.set(code.toUpperCase(), market.id);
    }
  }
}

export async function resolveMarketForCountry(countryCode: string | null | undefined): Promise<{
  market: MarketDefinition;
  countryCode: string;
  source: "preference" | "geo" | "fallback";
}> {
  const markets = await getEffectiveMarkets();
  buildCountryIndex(markets);
  const policy = await getEffectivePolicy();

  const normalized = countryCode?.trim().toUpperCase();
  if (normalized && countryToMarketCache.has(normalized)) {
    const marketId = countryToMarketCache.get(normalized)!;
    const market = markets.find((m) => m.id === marketId)!;
    return { market, countryCode: normalized, source: "geo" };
  }

  const fallback = markets.find((m) => m.id === policy.fallbackMarketId) ?? markets[0];
  return {
    market: fallback,
    countryCode: normalized && normalized.length === 2 ? normalized : "US",
    source: "fallback",
  };
}

export interface ResolvedPackagePrice {
  packageId: CheckoutPackageId;
  packageName: string;
  currency: CurrencyCode;
  amountMajor: number;
  amountMinor: number;
  formatted: string;
  marketId: MarketId;
  marketLabel: string;
  countryCode: string;
  priceSource: "market_table";
  policyVersion: string;
}

export async function resolvePackagePrice(
  countryCode: string | null | undefined,
  packageId: CheckoutPackageId,
  source: "preference" | "geo" | "fallback" = "geo",
): Promise<ResolvedPackagePrice> {
  const catalog = getCatalogPackage(packageId);
  if (!catalog?.checkoutEnabled) {
    throw new Error("Package is not available for fixed checkout.");
  }

  const { market, countryCode: resolvedCountry } = await resolveMarketForCountry(countryCode);
  const amountMajor = market.prices[packageId];
  const currency = market.currency;

  return {
    packageId,
    packageName: catalog.name,
    currency,
    amountMajor,
    amountMinor: currency === "PKR" ? amountMajor : Math.round(amountMajor * 100),
    formatted: formatMoney(amountMajor, currency, market.locale),
    marketId: market.id,
    marketLabel: market.label,
    countryCode: resolvedCountry,
    priceSource: "market_table",
    policyVersion: "markets-v1",
  };
}

export function isCheckoutPackage(id: string): id is CheckoutPackageId {
  return id === "starter" || id === "business" || id === "woocommerce";
}

export function isPackageId(id: string): id is PackageId {
  return isCheckoutPackage(id) || id === "custom";
}

export async function listPackagesForCountry(countryCode: string | null | undefined) {
  const { market, countryCode: code, source } = await resolveMarketForCountry(countryCode);
  const policy = await getEffectivePolicy();

  return {
    market,
    countryCode: code,
    source,
    policy,
    packages: (["starter", "business", "woocommerce", "custom"] as PackageId[]).map((id) => {
      const catalog = getCatalogPackage(id);
      if (!catalog) return null;
      if (id === "custom") {
        return {
          ...catalog,
          priceLabel: "Quotation after consultation",
          currency: market.currency,
          checkoutEnabled: false,
        };
      }
      const amount = market.prices[id];
      return {
        ...catalog,
        priceLabel: `${formatMoney(amount, market.currency, market.locale)}+`,
        amountMajor: amount,
        currency: market.currency,
        checkoutEnabled: true,
      };
    }).filter(Boolean),
  };
}
