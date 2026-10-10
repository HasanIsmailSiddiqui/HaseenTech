import type { PackageId } from "./types";

export interface PackageCatalogItem {
  id: PackageId;
  name: string;
  summary: string;
  highlights: string[];
  timeline: string;
  revisions: string;
  exclusions: string[];
  clientResponsibilities: string[];
  ctaLabel: string;
  /** Fixed-price checkout allowed when scope is predefined. */
  checkoutEnabled: boolean;
  maintenanceOptions: string;
}

export const packageCatalog: PackageCatalogItem[] = [
  {
    id: "starter",
    name: "Starter Website",
    summary: "A focused WordPress site for small businesses getting online.",
    highlights: [
      "Up to 5 pages",
      "Responsive WordPress website",
      "Basic contact form",
      "Two revision rounds",
    ],
    timeline: "Typically 1–2 weeks after content is received",
    revisions: "2 structured revision rounds",
    exclusions: [
      "Domain and hosting fees",
      "Premium plugins or themes (unless agreed)",
      "Copywriting and professional photography",
      "Ongoing maintenance (available separately)",
    ],
    clientResponsibilities: [
      "Provide page content, logo, and brand assets",
      "Review and approve milestones on time",
      "Purchase hosting/domain or grant access when needed",
    ],
    ctaLabel: "Get Starter",
    checkoutEnabled: true,
    maintenanceOptions: "Optional monthly maintenance after launch",
  },
  {
    id: "business",
    name: "Business Website",
    summary: "A polished business presence with Elementor and essential integrations.",
    highlights: [
      "Up to 10 pages",
      "Elementor design",
      "Contact and WhatsApp integration",
      "Basic on-page SEO setup",
      "Three revision rounds",
    ],
    timeline: "Typically 2–4 weeks depending on scope",
    revisions: "3 structured revision rounds",
    exclusions: [
      "Advanced custom plugin development",
      "Guaranteed search rankings",
      "Multilingual setup unless quoted",
    ],
    clientResponsibilities: [
      "Share sitemap, content, and reference sites",
      "Provide access to hosting and DNS when required",
      "Confirm integrations (email, analytics, chat)",
    ],
    ctaLabel: "Get Business",
    checkoutEnabled: true,
    maintenanceOptions: "Optional monthly maintenance after launch",
  },
  {
    id: "woocommerce",
    name: "WooCommerce Store",
    summary: "Launch a WooCommerce store with products, checkout, and training.",
    highlights: [
      "WooCommerce setup",
      "Product and category configuration",
      "Cart and checkout flow",
      "Payment and shipping setup where supported",
      "Basic store training",
    ],
    timeline: "Typically 3–5 weeks depending on catalog size",
    revisions: "3 structured revision rounds",
    exclusions: [
      "Product photography and bulk data entry beyond agreed limits",
      "Complex ERP or inventory integrations",
      "Marketplace-specific compliance beyond standard checkout",
    ],
    clientResponsibilities: [
      "Provide product details, pricing, and policies",
      "Confirm payment gateway accounts",
      "Test orders before launch",
    ],
    ctaLabel: "Get WooCommerce",
    checkoutEnabled: true,
    maintenanceOptions: "Optional store care plans after launch",
  },
  {
    id: "custom",
    name: "Custom Project",
    summary: "Tailored builds for integrations, redesigns, and ongoing support.",
    highlights: [
      "Custom integrations",
      "Complex redesigns",
      "Additional functionality",
      "Ongoing support options",
    ],
    timeline: "Defined after discovery call",
    revisions: "Agreed in project proposal",
    exclusions: [
      "Scope not documented in the signed proposal",
      "Third-party SaaS fees",
    ],
    clientResponsibilities: [
      "Join a discovery call to define requirements",
      "Provide technical access and stakeholders for approvals",
    ],
    ctaLabel: "Request Custom Quote",
    checkoutEnabled: false,
    maintenanceOptions: "Scoped in proposal",
  },
];

export interface PackageFeature {
  label: string;
  starter: boolean | string;
  business: boolean | string;
  woocommerce: boolean | string;
  custom: boolean | string;
}

export const comparisonFeatures: PackageFeature[] = [
  {
    label: "Pages included",
    starter: "Up to 5",
    business: "Up to 10",
    woocommerce: "Store + core pages",
    custom: "Scoped in proposal",
  },
  {
    label: "WordPress setup",
    starter: true,
    business: true,
    woocommerce: true,
    custom: true,
  },
  {
    label: "Elementor design",
    starter: false,
    business: true,
    woocommerce: true,
    custom: "As needed",
  },
  {
    label: "WooCommerce",
    starter: false,
    business: false,
    woocommerce: true,
    custom: "As needed",
  },
  {
    label: "Contact form",
    starter: true,
    business: true,
    woocommerce: true,
    custom: true,
  },
  {
    label: "WhatsApp integration",
    starter: false,
    business: true,
    woocommerce: true,
    custom: "As needed",
  },
  {
    label: "Basic on-page SEO",
    starter: false,
    business: true,
    woocommerce: true,
    custom: "As needed",
  },
  {
    label: "Revision rounds",
    starter: "2",
    business: "3",
    woocommerce: "3",
    custom: "Agreed",
  },
  {
    label: "Maintenance add-on",
    starter: "Optional",
    business: "Optional",
    woocommerce: "Optional",
    custom: "Optional",
  },
];

export function getCatalogPackage(id: PackageId) {
  return packageCatalog.find((p) => p.id === id);
}
