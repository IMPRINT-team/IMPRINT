import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";           //For login
import jwt from "jsonwebtoken";        // For login

// Ensure we load .env from the parent directory
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
const isProduction =
  process.env.IMPRINT_ENV === "production" ||
  process.env.NODE_ENV === "production";
let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && !isProduction) {
  jwtSecret = "dev-insecure-secret";
  console.warn(
    "JWT_SECRET is not configured; using a development-only fallback."
  );
}

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

// Routes

// New Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured for login.");
      return res.status(500).json({ error: "JWT secret is not configured" });
    }

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 2. Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Generate Token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.accessLevel },
      jwtSecret,
      { expiresIn: "8h" }
    );

    res.json({ token, user: { email: user.email, role: user.accessLevel } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/devices", async (req, res) => {
  try {
    const devices = await prisma.scanner.findMany({
      orderBy: { createdAt: "desc" },
    });
    const mappedDevices = devices.map((device) => ({
      id: device.id,
      deviceName: device.deviceName,
      location: device.location,
      status: device.status ? "ONLINE" : "OFFLINE",
      createdAt: device.createdAt.toISOString(),
      authorization: null,
    }));
    res.json(mappedDevices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { occurredAt: 'desc' },
      take: 20
    });
    // Map database 'occurredAt' to 'timestamp' string for UI
    const mappedEvents = events.map(e => ({
      ...e,
      timestamp: new Date(e.occurredAt).toLocaleTimeString(),
      latencyMs: 45 // Dummy value if not in DB
    }));
    res.json(mappedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
  connectToDatabase();
});
