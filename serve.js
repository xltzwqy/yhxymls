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
  res.setHeader('Content-Type', target.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Panel running at http://127.0.0.1:4173'));
