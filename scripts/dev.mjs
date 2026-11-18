// Local test server: serves the pages and runs /api/* like Vercel does (npm run dev, then open http://localhost:3000).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT || 3000);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

function helpers(res) {
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(o)); return res; };
  return res;
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://local');
  try {
    if (url.pathname.startsWith('/api/')) {
      const name = url.pathname.slice(5).replace(/\/$/, '');
      if (!/^[a-z0-9/_-]+$/i.test(name) || name.includes('..')) return helpers(res).status(404).json({ message: 'Not found' });
      const file = join(root, 'api', name + '.js');
      try { await stat(file); } catch { return helpers(res).status(404).json({ message: 'Not found' }); }
      const chunks = []; for await (const c of req) chunks.push(c);
      const raw = Buffer.concat(chunks).toString();
      req.query = Object.fromEntries(url.searchParams);
      req.body = (req.headers['content-type'] || '').includes('json') && raw ? JSON.parse(raw) : raw || undefined;
      const mod = await import(pathToFileURL(file).href);
      return mod.default(req, helpers(res));
    }
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    if (path.endsWith('/')) path += 'index.html';
    const file = join(root, path);
    if (!file.startsWith(root) || /[/\\](lib|api|scripts|node_modules|\.git)([/\\]|$)/.test(path)) { res.statusCode = 404; return res.end('Not found'); }
    const body = await readFile(file);
    res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
    res.end(body);
  } catch (e) {
    if (e.code === 'ENOENT' || e.code === 'EISDIR') { res.statusCode = 404; return res.end('Not found'); }
    console.error(e); if (!res.headersSent) helpers(res).status(500).json({ message: 'Server error' });
  }
}).listen(port, () => console.log(`Guide on http://localhost:${port}  (admin: /admin/)`));
