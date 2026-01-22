const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

const authSegment =
  mongoUser && mongoPassword
    ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(
        mongoPassword
      )}@`
    : "";
const authSource = authSegment ? "?authSource=admin" : "";
const uri = `mongodb://${authSegment}${mongoHost}:${mongoPort}/${authSource}`;

async function verifyConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection verified at", uri);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

verifyConnection();
