import type { OrderRecord } from "@/lib/orders/types";

export interface CheckoutSessionResult {
  sessionId: string;
  url: string | null;
}

export interface PaymentProvider {
  id: "stripe";
  isConfigured(): boolean;
  merchantEligible(): Promise<{ eligible: boolean; reason?: string }>;
  createCheckoutSession(order: OrderRecord, successUrl: string, cancelUrl: string): Promise<CheckoutSessionResult>;
  verifyWebhook(request: Request): Promise<{ eventId: string; type: string; orderId?: string; paid: boolean } | null>;
}
