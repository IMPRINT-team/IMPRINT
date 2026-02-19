import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import homeRouter from "./routes/homeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoEnvPath = path.resolve(__dirname, "..", ".env");

dotenv.config({ path: repoEnvPath });

const app = express();
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set for backend runtime");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("PostgreSQL connection established");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
  }
}

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "ok" });
  } catch {
    res.status(503).json({ status: "degraded", database: "unavailable" });
  }
});

app.use("/api", homeRouter);
app.use("/", homeRouter);

app.listen(port, host, () => {
  console.log(`Backend listening on http://${host}:${port}`);
  connectToDatabase();
});
