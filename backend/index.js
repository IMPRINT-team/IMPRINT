const http = require("http");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 8080;

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

const mongoAuthSegment =
  mongoUser && mongoPassword
    ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(
        mongoPassword
      )}@`
    : "";
const mongoAuthSource = mongoAuthSegment ? "?authSource=admin" : "";
const mongoUri = `mongodb://${mongoAuthSegment}${mongoHost}:${mongoPort}/${mongoAuthSource}`;

async function connectToMongo() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection established at", mongoUri);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", service: "imprint-backend" }));
});

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  void connectToMongo();
});
