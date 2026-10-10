import type { CurrencyCode } from "@/data/pricing/types";

export function toMinorUnits(amountMajor: number, currency: CurrencyCode): number {
  if (currency === "PKR") return Math.round(amountMajor);
  return Math.round(amountMajor * 100);
}

export function fromMinorUnits(amountMinor: number, currency: CurrencyCode): number {
  if (currency === "PKR") return amountMinor;
  return amountMinor / 100;
}

export function formatMoney(
  amountMajor: number,
  currency: CurrencyCode,
  locale?: string,
): string {
  const loc = locale ?? currencyLocale(currency);
  const fractionDigits = currency === "PKR" ? 0 : 0;
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amountMajor);
}

function currencyLocale(currency: CurrencyCode): string {
  switch (currency) {
    case "GBP":
      return "en-GB";
    case "EUR":
      return "en-IE";
    case "AED":
      return "en-AE";
    case "SAR":
      return "en-SA";
    case "CAD":
      return "en-CA";
    case "AUD":
      return "en-AU";
    case "PKR":
      return "en-PK";
    default:
      return "en-US";
  }
}

export function formatMoneyFromMinor(
  amountMinor: number,
  currency: CurrencyCode,
  locale?: string,
): string {
  return formatMoney(fromMinorUnits(amountMinor, currency), currency, locale);
}
