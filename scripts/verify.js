const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:27017";

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
