import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
import homeRouter from "./routes/homeRoutes.js";


dotenv.config({ path: "../.env" });

const app = express();
const prisma = new PrismaClient();
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
