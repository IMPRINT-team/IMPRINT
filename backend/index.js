const http = require("http");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", service: "imprint-backend" }));
});

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
