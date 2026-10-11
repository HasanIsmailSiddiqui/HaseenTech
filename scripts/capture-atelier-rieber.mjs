import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function captureAtelierRieber() {
  console.log('Capturing Atelier Rieber live website...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('https://atelier-rieber.de/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait a brief moment for animations or images to settle
    await new Promise(r => setTimeout(r, 2000));

    // Ensure target directories exist
    const outDirs = [
      path.resolve('assets/portfolio'),
      path.resolve('public/portfolio')
    ];
    for (const d of outDirs) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    }

    // Capture desktop hero view
    const targetPath1 = path.resolve('assets/portfolio/atelier-rieber.png');
    const targetPath2 = path.resolve('public/portfolio/atelier-rieber.png');
    await page.screenshot({ path: targetPath1, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    fs.copyFileSync(targetPath1, targetPath2);

    console.log('Successfully saved Atelier Rieber screenshots to:');
    console.log(targetPath1);
    console.log(targetPath2);
  } catch (err) {
    console.error('Failed to capture:', err);
  } finally {
    await browser.close();
  }
}

captureAtelierRieber();
