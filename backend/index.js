const http = require("http");
const path = require("path");
const { prisma } = require("./db/prisma");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const port = process.env.PORT || 8080;

async function connectToDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("PostgreSQL connection established");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", service: "imprint-backend" }));
});

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  void connectToDatabase();
});
