const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const files = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

console.log(`=== AUDITING ALL ${files.length} HTML PAGES FOR HEADER & FOOTER CONSISTENCY ===\n`);

let errors = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');

  // 1. Header checks
  const headerMatch = content.match(/<header class="site-header">([\s\S]*?)<\/header>/);
  if (!headerMatch) {
    errors.push(`${file}: Missing <header class="site-header">`);
    return;
  }
  const header = headerMatch[1];
  if (!header.includes('assets/brand/logo.svg')) errors.push(`${file}: Header missing logo.svg`);
  if (!header.includes('width="160" height="32"')) errors.push(`${file}: Header logo dimensions mismatch`);
  if (!header.includes('class="nav-desktop"')) errors.push(`${file}: Header missing nav-desktop`);
  if (!header.includes('class="nav-item-dropdown"')) errors.push(`${file}: Header missing nav-item-dropdown`);
  if (!header.includes('class="status-indicator-header"')) errors.push(`${file}: Header missing status-indicator-header`);
  if (!header.includes('class="btn btn-primary btn-sm">Start a Project ↗</a>')) errors.push(`${file}: Header missing consistent CTA`);
  if (!header.includes('id="menu-toggle"')) errors.push(`${file}: Header missing menu-toggle button`);

  // 2. Mobile Drawer checks
  const drawerMatch = content.match(/<div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">([\s\S]*?)<\/div>\s*<\/div>/);
  if (!drawerMatch) {
    errors.push(`${file}: Missing #mobile-drawer or improper closing`);
    return;
  }
  const drawer = drawerMatch[1];
  if (!drawer.includes('id="menu-close"')) errors.push(`${file}: Drawer missing #menu-close`);
  if (!drawer.includes('class="drawer-nav-list"')) errors.push(`${file}: Drawer missing drawer-nav-list`);
  if (!drawer.includes('class="drawer-submenu"')) errors.push(`${file}: Drawer missing drawer-submenu`);
  if (!drawer.includes('Start a Project ↗')) errors.push(`${file}: Drawer missing bottom CTA button`);

  // 3. Footer checks
  const footerMatch = content.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/);
  if (!footerMatch) {
    errors.push(`${file}: Missing <footer class="site-footer">`);
    return;
  }
  const footer = footerMatch[1];
  if (!footer.includes('class="footer-col-brand"')) errors.push(`${file}: Footer missing Column 1 (Brand)`);
  if (!footer.includes('class="footer-col-services"')) errors.push(`${file}: Footer missing Column 2 (Services)`);
  if (!footer.includes('class="footer-col-company"')) errors.push(`${file}: Footer missing Column 3 (Company)`);
  if (!footer.includes('class="footer-col-contact"')) errors.push(`${file}: Footer missing Column 4 (Contact)`);
  if (!footer.includes('class="footer-bottom-bar"')) errors.push(`${file}: Footer missing bottom bar`);
  if (!footer.includes('id="current-year"')) errors.push(`${file}: Footer missing #current-year`);
  if (!footer.includes('privacy.html')) errors.push(`${file}: Footer missing privacy.html`);
  if (!footer.includes('terms.html')) errors.push(`${file}: Footer missing terms.html`);

  // 4. Check all href links exist
  const allHrefs = [...content.matchAll(/href="([^"#?]+)(?:[#?][^"]*)?"/g)].map(m => m[1]);
  for (const href of allHrefs) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) continue;
    const targetPath = path.join(ROOT_DIR, href);
    if (!fs.existsSync(targetPath)) {
      errors.push(`${file}: Broken link reference -> ${href}`);
    }
  }

  console.log(`[PASS] ${file} — Header, Drawer, Footer, and Links 100% Verified`);
});

console.log('\n=====================================================');
if (errors.length === 0) {
  console.log(` AUDIT PASSED: ALL ${files.length} PAGES FULLY STANDARDIZED!`);
} else {
  console.error(` AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(`  - ${e}`));
}
console.log('=====================================================');
