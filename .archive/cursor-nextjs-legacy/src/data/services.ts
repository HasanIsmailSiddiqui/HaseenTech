export type ServiceSlug =
  | "wordpress-development"
  | "elementor-design"
  | "woocommerce"
  | "website-redesign"
  | "landing-pages"
  | "website-maintenance"
  | "seo"
  | "speed-optimization";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  excerpt: string;
  startingPrice: string;
  problems: string[];
  deliverables: string[];
  idealFor: string[];
  process: { step: string; detail: string }[];
  timeline: string;
  faqs: { question: string; answer: string }[];
  relatedProjectSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    shortTitle: "WordPress",
    excerpt:
      "Custom WordPress websites built for clarity, performance, and easy updates.",
    startingPrice: "From PKR 15,000+ (package dependent)",
    problems: [
      "Outdated or hard-to-manage website",
      "Need a professional site without starting from scratch",
      "Want WordPress you can update yourself",
    ],
    deliverables: [
      "WordPress installation and configuration",
      "Responsive page templates",
      "Navigation and core page structure",
      "Contact form integration",
      "Basic security and backup guidance",
    ],
    idealFor: [
      "Small businesses and consultants",
      "Local and international service providers",
      "Teams replacing an old brochure site",
    ],
    process: [
      { step: "Discovery", detail: "Goals, pages, and content checklist" },
      { step: "Design", detail: "Layout direction and component styling" },
      { step: "Build", detail: "WordPress setup and page implementation" },
      { step: "Review", detail: "Revisions within agreed rounds" },
      { step: "Launch", detail: "Go-live support and handover notes" },
    ],
    timeline: "Often 1–3 weeks for standard brochure sites",
    faqs: [
      {
        question: "Do you provide hosting?",
        answer:
          "Hosting is billed separately. I can recommend providers and deploy to your account.",
      },
      {
        question: "Can I edit content myself?",
        answer:
          "Yes. WordPress is set up so you can update pages and posts within the agreed scope.",
      },
    ],
    relatedProjectSlugs: ["synctechsol", "zobyconsulting", "kuzconsultancy"],
  },
  {
    slug: "elementor-design",
    title: "Elementor Design",
    shortTitle: "Elementor",
    excerpt:
      "Visual, flexible layouts with Elementor—balanced design and maintainability.",
    startingPrice: "From PKR 30,000+ (Business package)",
    problems: [
      "Generic theme look that does not match your brand",
      "Need marketing sections without custom code for every change",
      "Want a designer-led layout with WordPress flexibility",
    ],
    deliverables: [
      "Elementor templates for key page types",
      "Responsive styling and spacing system",
      "Reusable sections (hero, services, CTA)",
      "Global styles aligned with brand colors",
      "Handover on how to edit sections safely",
    ],
    idealFor: [
      "Growing businesses refreshing their web presence",
      "Agencies needing reliable Elementor implementation",
      "Brands prioritizing visual polish",
    ],
    process: [
      { step: "Wireframe", detail: "Section plan and content hierarchy" },
      { step: "Visual design", detail: "Typography, color, and component pass" },
      { step: "Elementor build", detail: "Templates and global settings" },
      { step: "QA", detail: "Cross-device checks and form tests" },
      { step: "Training", detail: "Short walkthrough for your team" },
    ],
    timeline: "Typically 2–4 weeks depending on page count",
    faqs: [
      {
        question: "Which Elementor version do you use?",
        answer:
          "Projects use the stable Elementor release compatible with your theme and hosting.",
      },
    ],
    relatedProjectSlugs: ["izak10", "zobyconsulting"],
  },
  {
    slug: "woocommerce",
    title: "WooCommerce E-Commerce",
    shortTitle: "WooCommerce",
    excerpt:
      "Online stores with products, checkout, and practical store management training.",
    startingPrice: "From PKR 45,000+ (WooCommerce package)",
    problems: [
      "Need to sell products online with a familiar WordPress stack",
      "Checkout or catalog feels confusing to customers",
      "Payment or shipping setup is unclear",
    ],
    deliverables: [
      "WooCommerce installation and store pages",
      "Product and category structure",
      "Cart and checkout configuration",
      "Payment gateway setup where supported",
      "Shipping rules within platform capabilities",
      "Basic admin training session",
    ],
    idealFor: [
      "Retailers moving online",
      "Brands with a focused product catalog",
      "Businesses already on WordPress",
    ],
    process: [
      { step: "Store plan", detail: "Catalog, shipping, and payment requirements" },
      { step: "Design", detail: "Shop, product, and checkout styling" },
      { step: "Configuration", detail: "Products, taxes, and gateways" },
      { step: "Testing", detail: "Test orders and email notifications" },
      { step: "Launch", detail: "Go-live checklist and training" },
    ],
    timeline: "Often 3–5 weeks depending on catalog complexity",
    faqs: [
      {
        question: "Do you guarantee sales?",
        answer:
          "No. I deliver a working store experience; marketing and conversion are separate efforts.",
      },
    ],
    relatedProjectSlugs: ["giftspak"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    shortTitle: "Redesign",
    excerpt:
      "Modernize structure, visuals, and usability while preserving what already works.",
    startingPrice: "Custom quotation after review",
    problems: [
      "Site looks dated or inconsistent on mobile",
      "Visitors struggle to find services or contact you",
      "Rebrand requires updated layout and messaging",
    ],
    deliverables: [
      "Audit of current site and goals",
      "Updated information architecture",
      "New visual direction and page layouts",
      "Migration plan for content and URLs where needed",
      "Launch support",
    ],
    idealFor: [
      "Established businesses outgrowing an old site",
      "Companies after a rebrand",
      "Sites with strong traffic that need better UX",
    ],
    process: [
      { step: "Audit", detail: "Review content, analytics context you provide, and UX" },
      { step: "Plan", detail: "Sitemap and priority pages" },
      { step: "Design & build", detail: "Implement new layouts" },
      { step: "Migrate", detail: "Move content and set redirects when applicable" },
      { step: "Launch", detail: "Final QA and monitoring period" },
    ],
    timeline: "Varies widely; quoted after discovery",
    faqs: [
      {
        question: "Will SEO be affected?",
        answer:
          "URL changes are handled carefully with redirects when needed. Rankings are never guaranteed.",
      },
    ],
    relatedProjectSlugs: ["kuzconsultancy", "manddroyalty"],
  },
  {
    slug: "landing-pages",
    title: "Landing Page Development",
    shortTitle: "Landing Pages",
    excerpt:
      "Focused pages for campaigns, lead capture, and clear calls to action.",
    startingPrice: "From PKR 15,000+ depending on scope",
    problems: [
      "Campaign traffic lands on a generic homepage",
      "Need one clear offer and conversion path",
      "Want fast turnaround for a promotion",
    ],
    deliverables: [
      "Single-purpose landing page design",
      "Mobile-first layout",
      "Form or CTA integration",
      "Basic performance-conscious asset handling",
      "Connection to analytics if you provide tags",
    ],
    idealFor: [
      "Product launches",
      "Lead generation campaigns",
      "Event or consultation sign-ups",
    ],
    process: [
      { step: "Brief", detail: "Offer, audience, and success metric" },
      { step: "Layout", detail: "Section order and copy placement" },
      { step: "Build", detail: "Implementation and form hookup" },
      { step: "Test", detail: "Devices, forms, and load sanity check" },
    ],
    timeline: "Often 3–10 days for a single page",
    faqs: [
      {
        question: "Can this connect to my CRM?",
        answer:
          "Simple form integrations are possible; complex CRM work is quoted separately.",
      },
    ],
    relatedProjectSlugs: ["zobyconsulting"],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance & Bug Fixes",
    shortTitle: "Maintenance",
    excerpt:
      "Updates, fixes, and small improvements to keep your WordPress site reliable.",
    startingPrice: "Hourly or monthly plans—quoted after review",
    problems: [
      "Plugin conflicts or broken layouts after updates",
      "Need someone to apply security updates safely",
      "Small changes backlog with no in-house developer",
    ],
    deliverables: [
      "WordPress core, theme, and plugin updates (agreed scope)",
      "Bug investigation and fixes",
      "Backup verification guidance",
      "Minor content or layout tweaks within retainer",
    ],
    idealFor: [
      "Businesses without a dedicated developer",
      "Store owners needing dependable support",
      "Sites built by HaseenTech or other developers",
    ],
    process: [
      { step: "Access review", detail: "Staging/production access and backups" },
      { step: "Ticket", detail: "Prioritized task list" },
      { step: "Fix & test", detail: "Changes on staging when available" },
      { step: "Deploy", detail: "Production update with rollback plan" },
    ],
    timeline: "Ongoing; urgent fixes prioritized by agreement",
    faqs: [
      {
        question: "Do you take over sites you did not build?",
        answer:
          "Yes, after a short technical review to confirm scope and access.",
      },
    ],
    relatedProjectSlugs: ["synctechsol"],
  },
  {
    slug: "seo",
    title: "Basic On-Page SEO",
    shortTitle: "SEO",
    excerpt:
      "Foundational on-page SEO setup—structure and metadata without ranking guarantees.",
    startingPrice: "Included in Business package or quoted add-on",
    problems: [
      "Pages missing titles and descriptions",
      "Unclear heading structure",
      "Need baseline SEO before content marketing",
    ],
    deliverables: [
      "Title and meta description templates for key pages",
      "Heading hierarchy review",
      "XML sitemap and robots guidance",
      "Image alt text patterns where content exists",
      "Google Search Console setup assistance if access provided",
    ],
    idealFor: [
      "New sites preparing for launch",
      "Business sites with minimal SEO setup",
      "Redesigns requiring metadata refresh",
    ],
    process: [
      { step: "Page list", detail: "Priority URLs and target keywords you provide" },
      { step: "On-page pass", detail: "Titles, descriptions, and structure" },
      { step: "Technical basics", detail: "Sitemap, indexing settings" },
      { step: "Handoff", detail: "Simple checklist for future pages" },
    ],
    timeline: "Usually bundled with build; 3–5 days as standalone add-on",
    faqs: [
      {
        question: "Do you guarantee Google rankings?",
        answer:
          "No. I implement on-page best practices; rankings depend on many external factors.",
      },
    ],
    relatedProjectSlugs: ["kuzconsultancy"],
  },
  {
    slug: "speed-optimization",
    title: "Website Speed Optimization",
    shortTitle: "Speed",
    excerpt:
      "Practical performance improvements for WordPress—without promising perfect scores.",
    startingPrice: "Quoted after performance review",
    problems: [
      "Slow mobile experience",
      "Heavy images or unused plugins",
      "Poor caching configuration",
    ],
    deliverables: [
      "Performance baseline (before metrics you can reproduce)",
      "Image optimization guidance or implementation",
      "Caching plugin configuration where appropriate",
      "Plugin and script cleanup within safe limits",
      "After report with next steps",
    ],
    idealFor: [
      "WordPress sites with noticeable lag",
      "Businesses preparing for ad traffic",
      "Sites after a redesign audit",
    ],
    process: [
      { step: "Audit", detail: "Measure with agreed tools (e.g. PageSpeed, WebPageTest)" },
      { step: "Plan", detail: "Quick wins vs. structural changes" },
      { step: "Implement", detail: "Caching, assets, and plugin tuning" },
      { step: "Verify", detail: "Re-test and document changes" },
    ],
    timeline: "Often 3–7 days for standard WordPress sites",
    faqs: [
      {
        question: "Will you guarantee a 100 PageSpeed score?",
        answer:
          "No. I aim for meaningful improvements; exact scores depend on hosting, theme, and third-party scripts.",
      },
    ],
    relatedProjectSlugs: ["izak10"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
