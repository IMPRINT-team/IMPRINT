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

app.listen(8080, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}!`);
  connectToDatabase();
});

app.get("/", async (req, res) => {
    try {
        const scanners = await prisma.scanner.findMany();
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
})

app.use("/", homeRouter);
