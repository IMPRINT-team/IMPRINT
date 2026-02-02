import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
<<<<<<< HEAD
<<<<<<< HEAD
import cors from "cors";
import bcrypt from "bcrypt";           //For login
import jwt from "jsonwebtoken";        // For login
import homeRouter from "./routes/homeRoutes.js";
=======
>>>>>>> 7f642ec (Added get all scanners routes)
=======
import cors from "cors";
import homeRouter from "./routes/homeRoutes.js";
>>>>>>> b65cdbb (Added get all scanner route)

dotenv.config({ path: "../.env" });

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;

app.use(express.json());
<<<<<<< HEAD
<<<<<<< HEAD
app.use(cors());
=======
>>>>>>> 7f642ec (Added get all scanners routes)
=======
app.use(cors());
>>>>>>> b65cdbb (Added get all scanner route)

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

<<<<<<< HEAD
<<<<<<< HEAD
app.use("/", homeRouter);
=======

app.get("/", async (req, res) => {
    try {
        const scanners = await prisma.scanner.findMany();
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
})
>>>>>>> 7f642ec (Added get all scanners routes)
=======
app.use("/", homeRouter);
>>>>>>> b65cdbb (Added get all scanner route)
