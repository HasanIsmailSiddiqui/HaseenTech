/**
 * HaseenTech — Static Architecture & Link Integrity Verification Suite
 * Zero external dependencies. Runs directly with Node.js.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 4280;

let failures = [];
let passedCount = 0;

function assert(condition, testName) {
  if (!condition) {
    console.error(`  [FAIL] ${testName}`);
    failures.push(testName);
  } else {
    console.log(`  [PASS] ${testName}`);
    passedCount++;
  }
}

// All 17 HTML files
const PAGES = [
  'index.html',
  'about.html',
  'services.html',
  'portfolio.html',
  'pricing.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'services/service-ai-chatbots.html',
  'services/service-custom-web.html',
  'services/service-landing-pages.html',
  'services/service-maintenance.html',
  'services/service-redesign.html',
  'services/service-seo-speed.html',
  'services/service-whatsapp-automation.html',
  'services/service-woocommerce.html',
  'services/service-wordpress.html',
];

console.log('================================================================');
console.log(' HASEENTECH STATIC SITE AUDIT & LINK INTEGRITY TEST SUITE       ');
console.log('================================================================\n');

// 1. Check all 17 HTML files exist
console.log('--- SUITE 1: HTML Files Existence Check ---');
for (const page of PAGES) {
  const fullPath = path.join(ROOT_DIR, page);
  assert(fs.existsSync(fullPath), `Page exists on disk: ${page}`);
}

// 2. Check Static Assets & Stylesheets
console.log('\n--- SUITE 2: Stylesheets & Assets Check ---');
assert(fs.existsSync(path.join(ROOT_DIR, 'css', 'main.css')), 'Primary stylesheet css/main.css exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'css', 'style.css')), 'Legacy stylesheet alias css/style.css exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'js', 'main.js')), 'Main script js/main.js exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'js', 'pricing.js')), 'Pricing script js/pricing.js exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'brand', 'logo.png')), 'Brand logo exists: assets/brand/logo.png');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'brand', 'logo.svg')), 'Brand logo fallback exists: assets/brand/logo.svg');
assert(fs.existsSync(path.join(ROOT_DIR, 'favicon.png')), 'Root favicon exists: favicon.png');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'brand', 'favicon.svg')), 'Favicon exists: assets/brand/favicon.svg');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'images', 'studio-space.jpg')), 'Studio image exists: assets/images/studio-space.jpg');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'images', 'hasan-ismail.png')), 'Founder portrait exists: assets/images/hasan-ismail.png');
assert(fs.existsSync(path.join(ROOT_DIR, 'assets', 'images', 'hero-sculpture.jpg')), 'Hero artwork exists: assets/images/hero-sculpture.jpg');

// 3. Check All 8 Portfolio Screenshots
console.log('\n--- SUITE 3: Portfolio Live Screenshots Check ---');
const portfolioImages = [
  'atelier-rieber.png',
  'aquaseafood.png',
  'ifkkpakistan.png',
  'izak10.png',
  'giftspak.png',
  'synctechsol.png',
  'zobyconsulting.png',
  'kuzconsultancy.png',
];

for (const img of portfolioImages) {
  const p = path.join(ROOT_DIR, 'assets', 'portfolio', img);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 1000, `Portfolio screenshot valid: assets/portfolio/${img} (${Math.round(size / 1024)} KB)`);
}

// 4. Audit Links, Images, and Scripts in every HTML page
console.log('\n--- SUITE 4: On-Disk Link & Asset Reference Resolution ---');

function checkFileReferences(pageRelPath) {
  const pageFile = path.join(ROOT_DIR, pageRelPath);
  const pageDir = path.dirname(pageFile);
  const content = fs.readFileSync(pageFile, 'utf8');

  // Check no Next.js / React / _next references
  const hasReact = /_next|react-dom|react\.development|next\/dist/i.test(content);
  assert(!hasReact, `${pageRelPath} has NO React/Next.js runtime references`);

  // Extract <link rel="stylesheet" href="...">
  const cssMatches = [...content.matchAll(/<link\s+[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)];
  for (const match of cssMatches) {
    const relHref = match[1];
    if (relHref.startsWith('http://') || relHref.startsWith('https://')) continue;
    const targetFile = path.resolve(pageDir, relHref);
    assert(fs.existsSync(targetFile), `${pageRelPath} -> Stylesheet exists: ${relHref}`);
  }

  // Extract <script src="...">
  const scriptMatches = [...content.matchAll(/<script\s+[^>]*src="([^"]+)"/gi)];
  for (const match of scriptMatches) {
    const relSrc = match[1];
    if (relSrc.startsWith('http://') || relSrc.startsWith('https://')) continue;
    const targetFile = path.resolve(pageDir, relSrc);
    assert(fs.existsSync(targetFile), `${pageRelPath} -> Script exists: ${relSrc}`);
  }

  // Extract <img src="...">
  const imgMatches = [...content.matchAll(/<img\s+[^>]*src="([^"]+)"/gi)];
  for (const match of imgMatches) {
    const relSrc = match[1];
    if (relSrc.startsWith('http://') || relSrc.startsWith('https://') || relSrc.startsWith('data:')) continue;
    const targetFile = path.resolve(pageDir, relSrc);
    assert(fs.existsSync(targetFile), `${pageRelPath} -> Image exists: ${relSrc}`);
  }

  // Extract internal <a href="...">
  const aMatches = [...content.matchAll(/<a\s+[^>]*href="([^"#\?]+)(?:[#\?][^"]*)?"/gi)];
  for (const match of aMatches) {
    const relHref = match[1];
    if (
      relHref.startsWith('http://') ||
      relHref.startsWith('https://') ||
      relHref.startsWith('mailto:') ||
      relHref.startsWith('tel:') ||
      relHref.startsWith('javascript:') ||
      relHref === ''
    ) {
      continue;
    }
    const targetFile = path.resolve(pageDir, relHref);
    assert(fs.existsSync(targetFile), `${pageRelPath} -> Internal link resolves: ${relHref}`);
  }
}

for (const page of PAGES) {
  checkFileReferences(page);
}

// 5. Test Live HTTP Server Resolution (Status 200 for all pages and assets)
console.log('\n--- SUITE 5: Live HTTP Server 200 Responses ---');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      const dirIndex = path.join(filePath, 'index.html');
      if (fs.existsSync(dirIndex)) {
        filePath = dirIndex;
      } else if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      }
    } else if (err && !path.extname(filePath)) {
      const htmlCandidate = filePath + '.html';
      if (fs.existsSync(htmlCandidate)) {
        filePath = htmlCandidate;
        err = null;
      }
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not Found');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
});

async function runHttpTests() {
  await new Promise(resolve => server.listen(PORT, resolve));

  async function fetchUrl(urlPath) {
    return new Promise(resolve => {
      http.get(`http://localhost:${PORT}${urlPath}`, res => {
        resolve(res.statusCode);
      }).on('error', () => resolve(500));
    });
  }

  for (const page of PAGES) {
    const status = await fetchUrl('/' + page);
    assert(status === 200, `HTTP GET /${page} returns 200`);
  }

  // Clean URLs test: /services, /about, /portfolio, etc.
  const cleanUrls = ['/about', '/services', '/portfolio', '/pricing', '/contact', '/privacy', '/terms'];
  for (const u of cleanUrls) {
    const status = await fetchUrl(u);
    assert(status === 200, `Clean URL HTTP GET ${u} returns 200`);
  }

  // Static assets HTTP check
  const assets = [
    '/css/main.css',
    '/js/main.js',
    '/assets/brand/logo.png',
    '/favicon.png',
    '/assets/images/studio-space.jpg',
    '/assets/images/hasan-ismail.png',
    '/assets/portfolio/atelier-rieber.png',
    '/assets/portfolio/aquaseafood.png',
    '/assets/portfolio/ifkkpakistan.png',
  ];

  for (const asset of assets) {
    const status = await fetchUrl(asset);
    assert(status === 200, `HTTP GET ${asset} returns 200`);
  }

  server.close();

  console.log('\n================================================================');
  console.log(` AUDIT COMPLETE: ${passedCount} CHECKS PASSED, ${failures.length} FAILURES`);
  console.log('================================================================\n');

  if (failures.length > 0) {
    console.error('FAILURES SUMMARY:');
    failures.forEach(f => console.error(' - ' + f));
    process.exit(1);
  } else {
    console.log('SUCCESS: All 17 static pages and references are 100% verified with 0 errors!\n');
    process.exit(0);
  }
}

runHttpTests();
