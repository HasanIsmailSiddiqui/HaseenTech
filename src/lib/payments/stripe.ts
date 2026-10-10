import Stripe from "stripe";
import type { PaymentProvider, CheckoutSessionResult } from "@/lib/payments/types";
import type { OrderRecord } from "@/lib/orders/types";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" });
}

export const stripeProvider: PaymentProvider = {
  id: "stripe",

  isConfigured() {
    return Boolean(process.env.STRIPE_SECRET_KEY?.trim() && process.env.STRIPE_WEBHOOK_SECRET?.trim());
  },

  async merchantEligible() {
    const stripe = getStripe();
    if (!stripe) {
      return { eligible: false, reason: "Stripe secret key is not configured." };
    }
    try {
      await stripe.accounts.retrieve();
      return { eligible: true };
    } catch {
      // Standard accounts may not have Connect — checkout still works on platform account.
      return { eligible: Boolean(process.env.STRIPE_SECRET_KEY?.trim()) };
    }
  },

  async createCheckoutSession(
    order: OrderRecord,
    successUrl: string,
    cancelUrl: string,
  ): Promise<CheckoutSessionResult> {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe is not configured.");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: order.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: order.price.currency.toLowerCase(),
            unit_amount: order.price.chargeMinor,
            product_data: {
              name: order.price.packageName,
              description: `HaseenTech — ${order.price.packageName} (${order.price.countryCode})`,
            },
          },
        },
      ],
      metadata: {
        orderId: order.id,
        packageId: order.price.packageId,
        marketId: order.price.marketId,
        currency: order.price.currency,
        amountMinor: String(order.price.chargeMinor),
      },
    });

    return { sessionId: session.id, url: session.url };
  },

  async verifyWebhook(request: Request) {
    const stripe = getStripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!stripe || !secret) return null;

    const signature = request.headers.get("stripe-signature");
    if (!signature) return null;

    const body = await request.text();
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret);
    } catch {
      return null;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const paid = session.payment_status === "paid";
      return { eventId: event.id, type: event.type, orderId, paid };
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      return {
        eventId: event.id,
        type: event.type,
        orderId: session.metadata?.orderId,
        paid: false,
      };
    }

    return { eventId: event.id, type: event.type, paid: false };
  },
};
