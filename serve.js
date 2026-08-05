const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const target = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
  const file = path.join(__dirname, target);
  if (!file.startsWith(__dirname) || !fs.existsSync(file)) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8', '.svg': 'image/svg+xml' };
  res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Panel running at http://127.0.0.1:4173'));
