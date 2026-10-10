import { stripeProvider } from "@/lib/payments/stripe";
import type { PaymentProvider } from "@/lib/payments/types";

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER?.trim() ?? "stripe";
  if (provider === "stripe") return stripeProvider;
  throw new Error(`Unsupported payment provider: ${provider}`);
}

export async function getPaymentStatus() {
  const provider = getPaymentProvider();
  const configured = provider.isConfigured();
  let eligible = false;
  let reason: string | undefined;
  if (configured) {
    const check = await provider.merchantEligible();
    eligible = check.eligible;
    reason = check.reason;
  } else {
    reason = "Payment provider credentials are not configured (server-side env).";
  }
  return { provider: provider.id, configured, eligible, reason };
}
