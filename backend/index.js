import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
<<<<<<< HEAD
import cors from "cors";
import homeRouter from "./routes/homeRoutes.js";
=======
>>>>>>> 7f642ec (Added get all scanners routes)

dotenv.config({ path: "../.env" });

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;

app.use(express.json());
<<<<<<< HEAD
app.use(cors());
=======
>>>>>>> 7f642ec (Added get all scanners routes)

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
