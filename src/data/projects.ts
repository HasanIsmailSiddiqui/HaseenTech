export type ProjectCategory =
  | "business"
  | "ecommerce"
  | "redesign"
  | "consulting"
  | "other";

export interface PortfolioProject {
  slug: string;
  name: string;
  category: ProjectCategory;
  url: string;
  urlStatus: "verified" | "unverified" | "dns_issue";
  urlNote?: string;
  screenshot: string | null;
  screenshotPlaceholder?: boolean;
  summary: string;
  role: string;
  technologies: string[];
  challenges: string;
  solution: string;
  featured?: boolean;
}

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "business", label: "Business Websites" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "redesign", label: "Redesigns" },
    { id: "consulting", label: "Consulting" },
    { id: "other", label: "Other" },
  ];

export const projects: PortfolioProject[] = [
  {
    slug: "izak10",
    name: "Izak10",
    category: "business",
    url: "https://izak10.com",
    urlStatus: "verified",
    screenshot: "/portfolio/izak10.svg",
    summary:
      "Business website focused on clear service presentation and responsive layout.",
    role: "Web development and design implementation",
    technologies: ["WordPress", "Elementor", "HTML", "CSS"],
    challenges: "Balancing visual sections with fast navigation on mobile.",
    solution:
      "Structured Elementor sections with consistent spacing and optimized imagery guidance.",
    featured: true,
  },
  {
    slug: "gunsandaccessories",
    name: "Guns and Accessories",
    category: "ecommerce",
    url: "https://gunsandaccessories.com",
    urlStatus: "dns_issue",
    urlNote:
      "Domain did not resolve at last verification (Oct 2025). Confirm URL before sharing publicly.",
    screenshot: "/portfolio/gunsandaccessories.svg",
    screenshotPlaceholder: true,
    summary:
      "E-commerce oriented web presence—details to be confirmed with updated access.",
    role: "Web development (scope per project agreement)",
    technologies: ["WordPress", "WooCommerce"],
    challenges: "Placeholder pending client-approved project summary.",
    solution: "Update this entry when live URL and assets are confirmed.",
    featured: false,
  },
  {
    slug: "giftspak",
    name: "GiftsPak",
    category: "ecommerce",
    url: "http://giftspak.com",
    urlStatus: "verified",
    urlNote: "Responds over HTTP; HTTPS may need configuration on hosting.",
    screenshot: "/portfolio/giftspak.svg",
    summary: "Gift and retail focused storefront experience.",
    role: "WooCommerce setup and storefront customization",
    technologies: ["WordPress", "WooCommerce", "Elementor"],
    challenges: "Organizing product categories for seasonal inventory.",
    solution: "Category structure and checkout flow aligned with catalog size.",
    featured: true,
  },
  {
    slug: "synctechsol",
    name: "SyncTech Solutions",
    category: "business",
    url: "https://synctechsol.com",
    urlStatus: "verified",
    screenshot: "/portfolio/synctechsol.svg",
    summary: "Technology services company website with service-led navigation.",
    role: "WordPress development and customization",
    technologies: ["WordPress", "Elementor", "CSS"],
    challenges: "Communicating technical services to non-technical visitors.",
    solution: "Clear service blocks, FAQs, and contact paths.",
    featured: true,
  },
  {
    slug: "zobyconsulting",
    name: "Zoby Consulting",
    category: "consulting",
    url: "https://zobyconsulting.com",
    urlStatus: "verified",
    screenshot: "/portfolio/zobyconsulting.svg",
    summary: "Consulting brand site emphasizing credibility and contact conversion.",
    role: "Design and WordPress implementation",
    technologies: ["WordPress", "Elementor"],
    challenges: "Professional tone without corporate template feel.",
    solution: "Custom section layouts and restrained typography.",
    featured: true,
  },
  {
    slug: "manddroyalty",
    name: "M&D Royalty",
    category: "redesign",
    url: "https://manddroyalty.com",
    urlStatus: "dns_issue",
    urlNote:
      "Domain did not resolve at last verification (Oct 2025). Confirm URL before sharing publicly.",
    screenshot: "/portfolio/manddroyalty.svg",
    screenshotPlaceholder: true,
    summary: "Redesign project—summary placeholder until live site is confirmed.",
    role: "Web design and development",
    technologies: ["WordPress", "Elementor"],
    challenges: "Pending updated project notes.",
    solution: "Update when deployment is verified.",
    featured: false,
  },
  {
    slug: "kuzconsultancy",
    name: "KUZ Consultancy",
    category: "consulting",
    url: "https://kuzconsultancy.co.uk",
    urlStatus: "verified",
    screenshot: "/portfolio/kuzconsultancy.svg",
    summary: "UK-facing consultancy site with international audience considerations.",
    role: "WordPress development and on-page SEO basics",
    technologies: ["WordPress", "Elementor", "SEO basics"],
    challenges: "Trust signals for UK clients with clear service positioning.",
    solution: "Structured service pages and contact workflow.",
    featured: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
