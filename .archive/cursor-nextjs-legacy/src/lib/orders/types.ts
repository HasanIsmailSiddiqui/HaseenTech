import type { CheckoutPackageId, CurrencyCode, MarketId } from "@/data/pricing/types";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded";

export type OrderKind = "package_checkout" | "custom_quote";

export interface OrderPriceSnapshot {
  packageId: CheckoutPackageId | "custom";
  packageName: string;
  marketId: MarketId;
  countryCode: string;
  currency: CurrencyCode;
  amountMajor: number;
  amountMinor: number;
  depositPercent: number;
  chargeMinor: number;
  priceSource: "market_table" | "admin_quote";
  policyVersion: string;
  quotedAt: string;
}

export interface OrderRecord {
  id: string;
  kind: OrderKind;
  status: OrderStatus;
  email?: string;
  customerName?: string;
  price: OrderPriceSnapshot;
  paymentProvider?: "stripe" | null;
  paymentSessionId?: string;
  paymentIntentId?: string;
  paymentReference?: string;
  webhookEvents: string[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  quoteValidUntil?: string;
  notes?: string;
}
