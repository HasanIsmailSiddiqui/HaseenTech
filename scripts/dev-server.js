/**
 * HaseenTech Local Development Server
 * Pure Node.js zero-dependency static server with clean URL support.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');

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
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  // Parse URL pathname
  let reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Normalize path and prevent directory traversal
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  // Check if file exists directly
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (err && !path.extname(filePath)) {
      // Clean URL support: e.g. /about -> /about.html
      const htmlCandidate = filePath + '.html';
      if (fs.existsSync(htmlCandidate)) {
        filePath = htmlCandidate;
        err = null;
      }
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        // Fallback for public/ assets if requested without public prefix
        const publicFallback = path.join(ROOT, 'public', safePath);
        if (fs.existsSync(publicFallback) && fs.statSync(publicFallback).isFile()) {
          const ext = path.extname(publicFallback).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
            'Cache-Control': 'no-cache',
          });
          return res.end(fs.readFileSync(publicFallback));
        }

        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="utf-8"><title>404 Not Found — HaseenTech</title>
          <style>body{font-family:sans-serif;padding:3rem;background:#F7F7F2;color:#171717;}</style></head>
          <body>
            <h1>404 — Page Not Found</h1>
            <p>The path <code>${pathname}</code> was not found.</p>
            <p><a href="/" style="color:#FF6B35;">Return to Home</a></p>
          </body>
          </html>
        `);
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=====================================================`);
  console.log(` HASEENTECH DEVELOPMENT SERVER ACTIVE                `);
  console.log(` Local URL:   http://localhost:${PORT}                `);
  console.log(` Serving:     ${ROOT}                                `);
  console.log(` Architecture: Pure HTML5 / CSS3 / Vanilla JavaScript `);
  console.log(`=====================================================`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
