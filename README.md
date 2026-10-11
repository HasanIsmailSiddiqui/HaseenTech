# HaseenTech — Independent Digital Studio Website

Official production website for **HaseenTech** (Modern Websites. Real Results.) — an independent digital technology studio founded by Hasan Ismail in Karachi, Pakistan, serving businesses locally and globally.

The website is engineered with a **pure static HTML5, CSS3, and vanilla JavaScript architecture** — zero React, zero Next.js, and zero build step required.

---

## Architecture & Project Structure

The project follows a clean, organized, maintainable directory structure:

```text
haseentech/
├── index.html                           # Homepage (hero, principles, featured work, services, reviews, pricing, FAQ)
├── about.html                           # Studio story, philosophy & founder profile (Hasan Ismail)
├── services.html                        # All services overview (organized across 4 pillars)
├── portfolio.html                       # Selected client work with live production domain links
├── pricing.html                         # Transparent pricing with interactive PKR/USD country-aware switcher
├── contact.html                         # Project discovery brief form & direct contact channels
├── privacy.html                         # Privacy policy & client data protection statement
├── terms.html                           # Terms of service & intellectual property provisions
├── favicon.svg                          # Root browser favicon
│
├── css/
│   ├── main.css                         # Primary stylesheet (Obsidian/Charcoal design system, responsive typography)
│   └── style.css                        # Compatibility alias
│
├── js/
│   ├── main.js                          # Mobile navigation drawer, dropdown menus, active page indicators, brief generator
│   └── pricing.js                       # Country-aware currency switcher (PKR vs USD / GBP / EUR)
│
├── services/                            # Dedicated service detail pages
│   ├── service-ai-chatbots.html         # AI Chatbots & Custom AI Agents
│   ├── service-custom-web.html          # Custom Web Development (Full-Stack & APIs)
│   ├── service-landing-pages.html       # High-Converting Sales Landing Pages
│   ├── service-maintenance.html         # Website Maintenance, Security & Monthly Retainers
│   ├── service-redesign.html            # Website Modernization & Redesign
│   ├── service-seo-speed.html           # Technical SEO & Core Web Vitals Speed Optimization
│   ├── service-whatsapp-automation.html # WhatsApp Chatbots & Business Automations
│   ├── service-woocommerce.html         # Custom WooCommerce & E-Commerce Engineering
│   └── service-wordpress.html           # Custom WordPress CMS Development
│
├── assets/
│   ├── brand/                           # SVG studio logos (light, dark, gradient, primary) and favicon
│   ├── icons/                           # Apple touch icon, OpenGraph fallback, favicon
│   ├── images/                          # Studio environment photography, hero artwork, founder portrait
│   └── portfolio/                       # High-resolution production screenshots of delivered client websites
│
└── scripts/
    ├── dev-server.js                    # Pure Node.js zero-dependency static server with clean URL support
    └── verify-static-site.js            # Automated verification test suite (1,130+ assertions, link integrity audit)
```

---

## Local Development & Preview

Because the project is 100% static, you do **not** need to install build dependencies or run a bundler.

### Option 1: Built-in Node.js Dev Server (Recommended)

Using npm:
```bash
npm start
```

Or running Node directly (zero external packages required):
```bash
node scripts/dev-server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Clean URLs (e.g. `/about`, `/services`) are handled automatically.

### Option 2: Python Simple HTTP Server

```bash
# Python 3
python -m http.server 3000
```

### Option 3: Direct File Access

You can open `index.html` directly in any modern web browser.

---

## Quality & Link Integrity Verification

Run the comprehensive static audit suite:

```bash
npm test
# or
node scripts/verify-static-site.js
```

This automated suite tests:
- All 17 HTML pages exist and load with HTTP 200.
- All stylesheet (`css/main.css`) and script (`js/main.js`) links resolve.
- All internal cross-page links, breadcrumbs, dropdowns, and drawer links resolve on disk.
- All photography, logos, and portfolio screenshots exist and are non-empty.
- Zero references to React, Next.js, or `node_modules` exist.
- Clean URLs (`/about`, `/services`, `/portfolio`, etc.) resolve correctly.

---

## Contact Form & Email Dispatch

The contact form on `contact.html` operates client-side with complete transparency:
1. **Validation:** Checks all required fields (Name, Email, Service, and Brief message >= 15 characters) and provides clear visual feedback.
2. **Dispatch Options:** Prepares a structured project brief and provides three zero-tracking options:
   - **Send via Email Application** — Opens the client's mail app (`mailto:hello@haseentech.com`) with the structured brief prefilled.
   - **Chat on WhatsApp** — Opens WhatsApp with project parameters prefilled.
   - **Copy Brief to Clipboard** — One-click copy for pasting into any messaging client.

### Optional: Connecting a Backend or Third-Party Email Service

To receive direct form submissions into your inbox without opening the user's email client, you can connect the form to any static form provider:

- **Formspree:** Set `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`.
- **Web3Forms:** Add `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">`.
- **Serverless API / Cloudflare Worker:** Post the FormData payload to your API endpoint.

---

## Deployment Instructions

Because the site consists of standard static files, it can be deployed to any web hosting platform in seconds.

### 1. GitHub Pages
1. Push repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `master` (or `main`) and root `/`, then click **Save**.

### 2. Cloudflare Pages
1. In Cloudflare Dashboard, go to **Workers & Pages > Create application > Pages**.
2. Connect your Git repository.
3. Build command: Leave empty.
4. Output directory: Leave empty (or `/`).

### 3. Netlify
1. Drag and drop the `haseentech` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop), or connect your repository.
2. Build command: None.
3. Publish directory: `.` (repo root).

### 4. Vercel (Static Hosting)
1. Import repository in [Vercel](https://vercel.com).
2. Framework Preset: **Other**.
3. Root Directory: `./`.
4. Deploy.

### 5. Traditional Apache / Nginx / cPanel
Upload all files and folders (`index.html`, `css/`, `js/`, `services/`, `assets/`) to your `public_html` or web root directory via FTP or cPanel File Manager.

---

## Design System & Brand Identity

- **Obsidian:** `#0B0C0E` (Primary dark background)
- **Charcoal:** `#14171C` (Card and panel backgrounds)
- **Warm White:** `#F4EFEA` (Primary typography and high-contrast headings)
- **Electric Orange:** `#FF6B35` (Primary CTA accent, active indicators, highlights)
- **Typography:** Space Grotesk (Headings), Inter (Body & UI), JetBrains Mono (Technical badges)
