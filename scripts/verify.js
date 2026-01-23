const path = require("path");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const prisma = new PrismaClient();

async function verifyConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("PostgreSQL connection verified");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

verifyConnection();
