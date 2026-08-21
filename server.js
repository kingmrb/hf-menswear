// HF Men's Wear — static site server (zero dependencies; Node built-ins only).
// Works on Railway or any Node host. No `npm install` needed.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8",
};

function send(res, status, body, headers = {}) { res.writeHead(status, headers); res.end(body); }

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = { "Content-Type": TYPES[ext] || "application/octet-stream" };
  if ([".jpg",".jpeg",".png",".webp",".svg",".ico",".woff2"].includes(ext))
    headers["Cache-Control"] = "public, max-age=604800";
  else headers["Cache-Control"] = "no-cache";
  const stream = fs.createReadStream(filePath);
  stream.on("open", () => { res.writeHead(200, headers); stream.pipe(res); });
  stream.on("error", () => send(res, 500, "Server error"));
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath.includes("..")) return send(res, 400, "Bad request");
  if (urlPath === "/") urlPath = "/index.html";
  let filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) return send(res, 400, "Bad request");

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) return serveFile(res, filePath);
    if (!err && stat && stat.isDirectory()) {
      const idx = path.join(filePath, "index.html");
      if (fs.existsSync(idx)) return serveFile(res, idx);
    }
    const asHtml = filePath + ".html";
    if (fs.existsSync(asHtml)) return serveFile(res, asHtml);
    return serveFile(res, path.join(ROOT, "index.html"));
  });
});

server.listen(PORT, () => console.log(`HF Men's Wear site running on port ${PORT}`));
