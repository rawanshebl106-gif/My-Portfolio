/**
 * Zero-dependency Node.js Development Server
 * Serves static portfolio files with correct MIME types and security headers.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse URL safely
  let parsedUrl;
  let pathname;
  try {
    parsedUrl = new URL(req.url, 'http://localhost');
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  // Default to index.html for directories
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  } else if (!path.extname(pathname)) {
    // If path is a directory without trailing slash, redirect or append index.html
    const potentialDir = path.resolve(ROOT_DIR, `.${pathname}`);
    const relativeDir = path.relative(ROOT_DIR, potentialDir);
    if (!relativeDir.startsWith('..') && !path.isAbsolute(relativeDir) && fs.existsSync(potentialDir) && fs.statSync(potentialDir).isDirectory()) {
      pathname += '/index.html';
    }
  }

  // Prevent directory traversal attacks
  const safePath = path.resolve(ROOT_DIR, `.${pathname}`);
  const relativePath = path.relative(ROOT_DIR, safePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\nRawan Portfolio static preview: http://localhost:${PORT}`);
  console.log(`Serving frontend files from: ${ROOT_DIR}\n`);
});
