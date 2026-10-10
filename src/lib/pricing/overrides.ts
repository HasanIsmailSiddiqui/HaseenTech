import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { defaultMarkets, defaultPricingPolicy } from "@/data/pricing/markets";
import type { MarketDefinition, MarketId, PricingPolicy } from "@/data/pricing/types";

export interface PricingOverridesFile {
  markets?: Partial<
    Record<
      MarketId,
      {
        prices?: Partial<MarketDefinition["prices"]>;
        label?: string;
      }
    >
  >;
  policy?: Partial<PricingPolicy>;
  updatedAt?: string;
}

function overridesPath() {
  const dir = process.env.PRICING_OVERRIDES_DIR ?? path.join(process.cwd(), ".data");
  return path.join(dir, "pricing-overrides.json");
}

export async function readPricingOverrides(): Promise<PricingOverridesFile | null> {
  try {
    const raw = await readFile(overridesPath(), "utf8");
    return JSON.parse(raw) as PricingOverridesFile;
  } catch {
    return null;
  }
}

export async function writePricingOverrides(data: PricingOverridesFile): Promise<void> {
  const file = overridesPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(
    file,
    JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2),
    "utf8",
  );
}

export async function getEffectiveMarkets(): Promise<MarketDefinition[]> {
  const overrides = await readPricingOverrides();
  if (!overrides?.markets) return [...defaultMarkets];

  return defaultMarkets.map((market) => {
    const patch = overrides.markets?.[market.id];
    if (!patch) return market;
    return {
      ...market,
      label: patch.label ?? market.label,
      prices: { ...market.prices, ...patch.prices },
    };
  });
}

export async function getEffectivePolicy(): Promise<PricingPolicy> {
  const overrides = await readPricingOverrides();
  const depositEnv = process.env.CHECKOUT_DEPOSIT_PERCENT;
  const depositFromEnv = depositEnv ? Number(depositEnv) : undefined;
  return {
    ...defaultPricingPolicy,
    ...overrides?.policy,
    checkoutDepositPercent:
      depositFromEnv && !Number.isNaN(depositFromEnv)
        ? depositFromEnv
        : (overrides?.policy?.checkoutDepositPercent ?? defaultPricingPolicy.checkoutDepositPercent),
  };
}
