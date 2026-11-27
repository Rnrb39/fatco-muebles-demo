import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.jpg':'image/jpeg', '.webp':'image/webp', '.png':'image/png', '.mp4':'video/mp4', '.svg':'image/svg+xml', '.txt':'text/plain' };
http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'X-Robots-Tag':'noindex, nofollow, noarchive' }); res.end(await readFile(file)); }
  catch { res.writeHead(404).end('No encontrado'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
