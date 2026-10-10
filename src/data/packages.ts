/**
 * Package catalog (editable deliverables). Regional prices live in `src/data/pricing/markets.ts`
 * and optional `.data/pricing-overrides.json` (via admin).
 */
export type { PackageId, CheckoutPackageId } from "@/data/pricing/types";
export {
  packageCatalog as packages,
  comparisonFeatures,
  getCatalogPackage as getPackageById,
} from "@/data/pricing/catalog";
export type { PackageCatalogItem as PricingPackage, PackageFeature } from "@/data/pricing/catalog";
