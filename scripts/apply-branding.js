const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERVICES_DIR = path.join(ROOT_DIR, 'services');

const rootPages = [
  'index.html',
  'about.html',
  'services.html',
  'portfolio.html',
  'pricing.html',
  'contact.html',
  'privacy.html',
  'terms.html',
];

const servicePages = [
  'service-ai-chatbots.html',
  'service-custom-web.html',
  'service-landing-pages.html',
  'service-maintenance.html',
  'service-redesign.html',
  'service-seo-speed.html',
  'service-whatsapp-automation.html',
  'service-woocommerce.html',
  'service-wordpress.html',
];

// Exact brand logo markup for root-level pages
const rootBrandLogoHtml = `<a href="index.html"
   aria-label="HaseenTech Home"
   style="display:inline-flex; align-items:center; gap:10px; text-decoration:none; white-space:nowrap;">

    <img
        src="assets/brand/logo.png"
        alt="HaseenTech Logo"
        style="display:block; width:42px; height:42px; object-fit:contain; flex-shrink:0;"
    >

    <span style="display:inline; margin:0; padding:0; font-family:'Space Grotesk',sans-serif; font-size:25px; font-weight:700; line-height:1; letter-spacing:-1px;">
        <span style="color:#F4EFEA;">Haseen</span><span style="color:#FF6B35;">Tech</span>
    </span>

</a>`;

// Exact brand logo markup for nested services pages
const serviceBrandLogoHtml = `<a href="../index.html"
   aria-label="HaseenTech Home"
   style="display:inline-flex; align-items:center; gap:10px; text-decoration:none; white-space:nowrap;">

    <img
        src="../assets/brand/logo.png"
        alt="HaseenTech Logo"
        style="display:block; width:42px; height:42px; object-fit:contain; flex-shrink:0;"
    >

    <span style="display:inline; margin:0; padding:0; font-family:'Space Grotesk',sans-serif; font-size:25px; font-weight:700; line-height:1; letter-spacing:-1px;">
        <span style="color:#F4EFEA;">Haseen</span><span style="color:#FF6B35;">Tech</span>
    </span>

</a>`;

const rootFaviconHtml = `<link rel="icon" type="image/png" href="assets/brand/logo.png">
  <link rel="apple-touch-icon" href="assets/brand/logo.png">`;

const serviceFaviconHtml = `<link rel="icon" type="image/png" href="../assets/brand/logo.png">
  <link rel="apple-touch-icon" href="../assets/brand/logo.png">`;

// Copy logo.png to root favicon.png for maximum browser compatibility
fs.copyFileSync(
  path.join(ROOT_DIR, 'assets', 'brand', 'logo.png'),
  path.join(ROOT_DIR, 'favicon.png')
);
console.log('Copied assets/brand/logo.png to root favicon.png');

// 1. Process Root Pages
for (const filename of rootPages) {
  const filePath = path.join(ROOT_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace outdated favicon
  content = content.replace(
    /<link\s+[^>]*rel="icon"[^>]*href="assets\/brand\/favicon\.svg"[^>]*>/gi,
    rootFaviconHtml
  );

  // In index.html, if the desktop header logo was already updated, ensure it matches formatting
  // Replace old <a ... class="brand-logo" ...><img src="assets/brand/logo.svg" ...></a> in all places
  const oldLogoRegex = /<a\s+href="index\.html"\s+class="brand-logo"\s+aria-label="HaseenTech Home">\s*<img\s+src="assets\/brand\/logo\.svg"[^>]*>\s*<\/a>/gi;
  content = content.replace(oldLogoRegex, rootBrandLogoHtml);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated branding in root: ${filename}`);
}

// 2. Process Service Pages in services/
for (const filename of servicePages) {
  const filePath = path.join(SERVICES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace outdated favicon
  content = content.replace(
    /<link\s+[^>]*rel="icon"[^>]*href="\.\.\/assets\/brand\/favicon\.svg"[^>]*>/gi,
    serviceFaviconHtml
  );

  // Replace old <a ... class="brand-logo" ...><img src="../assets/brand/logo.svg" ...></a> in all places
  const oldLogoRegex = /<a\s+href="\.\.\/index\.html"\s+class="brand-logo"\s+aria-label="HaseenTech Home">\s*<img\s+src="\.\.\/assets\/brand\/logo\.svg"[^>]*>\s*<\/a>/gi;
  content = content.replace(oldLogoRegex, serviceBrandLogoHtml);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated branding in service: services/${filename}`);
}

console.log('Branding replacement complete across all 17 HTML files!');
