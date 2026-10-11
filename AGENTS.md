# HaseenTech — Developer & Agent Guidelines

## Architecture: Pure Static HTML, CSS & Vanilla JavaScript

This project is a traditional static website.
- **NO React, NO Next.js, NO TypeScript, NO JSX/TSX.**
- **NO build step or bundler is required.**
- All pages are standalone HTML5 files in the project root and `services/` directory.
- Stylesheets are located in `css/main.css`.
- Client-side scripts are located in `js/main.js` and `js/pricing.js`.
- Assets and photography are located in `assets/`.

## Directory Structure

```text
haseentech/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── pricing.html
├── contact.html
├── privacy.html
├── terms.html
├── favicon.svg
├── css/
│   ├── main.css
│   └── style.css (compatibility alias)
├── js/
│   ├── main.js
│   └── pricing.js
├── services/
│   ├── service-ai-chatbots.html
│   ├── service-custom-web.html
│   ├── service-landing-pages.html
│   ├── service-maintenance.html
│   ├── service-redesign.html
│   ├── service-seo-speed.html
│   ├── service-whatsapp-automation.html
│   ├── service-woocommerce.html
│   └── service-wordpress.html
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── images/
│   └── portfolio/
└── scripts/
    ├── dev-server.js
    └── verify-static-site.js
```

## Running & Testing

- **Dev server:** `npm start` or `node scripts/dev-server.js` (starts zero-dependency static server on `http://localhost:3000`).
- **Audit & link verification:** `npm test` or `node scripts/verify-static-site.js` (validates all 17 HTML files, internal links, images, and HTTP 200 responses).
