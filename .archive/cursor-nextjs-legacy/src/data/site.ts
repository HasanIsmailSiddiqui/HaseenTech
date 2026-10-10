export const siteConfig = {
  name: "HaseenTech",
  legalName: "HaseenTech",
  tagline: "Modern Websites. Real Results.",
  description:
    "We design and build modern websites and digital experiences that help businesses grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://haseentech.com",
  locale: "en_US",
  founder: {
    name: "Hasan Ismail",
    title: "Web Developer & Designer",
    location: "Karachi, Pakistan",
    worksRemotely: true,
  },
  contact: {
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@haseentech.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
  currencies: ["PKR", "USD", "GBP", "AED", "EUR"] as const,
  defaultCurrency: "PKR" as const,
};

export type Currency = (typeof siteConfig.currencies)[number];

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "WordPress Development", href: "/services/wordpress-development" },
    { label: "Elementor Design", href: "/services/elementor-design" },
    { label: "WooCommerce", href: "/services/woocommerce" },
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "Landing Pages", href: "/services/landing-pages" },
    { label: "Website Maintenance", href: "/services/website-maintenance" },
    { label: "SEO", href: "/services/seo" },
    { label: "Speed Optimization", href: "/services/speed-optimization" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
