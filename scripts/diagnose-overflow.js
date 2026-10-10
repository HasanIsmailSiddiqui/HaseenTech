const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 4160;
const ROOT_DIR = path.resolve(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end();
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/html' });
  fs.createReadStream(filePath).pipe(res);
});

async function diagnose() {
  await new Promise(resolve => server.listen(PORT, resolve));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });

  const pagesToCheck = ['index.html', 'services.html', 'service-woocommerce.html', 'service-redesign.html', 'contact.html'];
  for (const p of pagesToCheck) {
    await page.goto(`http://localhost:${PORT}/${p}`);
    const culprits = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const results = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1) {
          results.push({
            tag: el.tagName,
            class: el.className,
            text: (el.textContent || '').slice(0, 30).trim(),
            right: Math.round(r.right),
            docWidth: docW
          });
        }
      });
      return results;
    });
    console.log(`\nCulprits on ${p}:`);
    culprits.slice(0, 5).forEach(c => console.log(`  ${c.tag}.${c.class} -> right: ${c.right}px vs clientWidth: ${c.docWidth}px (text: "${c.text}")`));
  }

  await browser.close();
  server.close();
}

diagnose();
