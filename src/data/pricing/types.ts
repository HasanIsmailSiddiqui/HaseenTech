/** ISO 4217 currency codes used on the site. */
export type CurrencyCode = "USD" | "GBP" | "EUR" | "AED" | "SAR" | "CAD" | "AUD" | "PKR";

export type MarketId = "US" | "GB" | "EU" | "AE" | "SA" | "CA" | "AU" | "PK";

export type CheckoutPackageId = "starter" | "business" | "woocommerce";

export type PackageId = CheckoutPackageId | "custom";

export interface MarketPackagePrices {
  starter: number;
  business: number;
  woocommerce: number;
}

export interface MarketDefinition {
  id: MarketId;
  label: string;
  currency: CurrencyCode;
  /** ISO 3166-1 alpha-2 country codes served by this market. */
  countries: readonly string[];
  /** Starting prices in major units (e.g. dollars, not cents). */
  prices: MarketPackagePrices;
  locale: string;
}

export interface PricingPolicy {
  /** Market used when country is unknown or unmapped. */
  fallbackMarketId: MarketId;
  /** When true, optional FX may apply — explicit market prices always win. */
  fxConversionEnabled: boolean;
  /** Hours between FX cache refresh when enabled. */
  fxRefreshHours: number;
  quoteValidityDays: number;
  /** Percent of package price charged at checkout (100 = full payment). */
  checkoutDepositPercent: number;
  taxDisplayMode: "exclusive" | "inclusive" | "provider";
}
