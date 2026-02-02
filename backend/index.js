import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";           //For login
import jwt from "jsonwebtoken";        // For login
import homeRouter from "./routes/homeRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
  connectToDatabase();
});

app.use("/", homeRouter);
