// run with: node backend/seeds/seed.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RECENT_DAYS = 90;
const EVENT_COUNT = 1000;
const DENIAL_PROBABILITY = 0.05;

function getRandomTimestampWithinLastDays(days) {
  const now = Date.now();
  const earliest = now - days * 24 * 60 * 60 * 1000;
  const randomTime = earliest + Math.random() * (now - earliest);
  return new Date(randomTime);
}

function getRandomResult() {
  return Math.random() < DENIAL_PROBABILITY ? "DENIED" : "ACCEPTED";
}

function createRandomizedEvents(scannerIds, userRfids, count) {
  return Array.from({ length: count }, () => ({
    userRfid: userRfids[Math.floor(Math.random() * userRfids.length)],
    result: getRandomResult(),
    occurredAt: getRandomTimestampWithinLastDays(RECENT_DAYS),
    deviceId: scannerIds[Math.floor(Math.random() * scannerIds.length)],
  }));
}

async function seedDB() {
  console.log("Seeding database...");

  // Clear tables (safe order due to relations)
  await prisma.event.deleteMany();
  await prisma.scanner.deleteMany();
  await prisma.user.deleteMany();

  // 1️⃣ Create Users FIRST
  await prisma.user.createMany({
    data: [
      {
        rfidUid: "BE:00:28:AF",
        name: "Trey Gannod",
        accessLevel: "BASIC",
      },
      {
        rfidUid: "D4:F9:9A:10",
        name: "Scrum Lord",
        accessLevel: "ADMIN",
      },
      {
        rfidUid: "7C:AA:55:2E",
        name: "Guest User",
        accessLevel: "BASIC",
      },
      {
        rfidUid: "91:22:CD:FE",
        name: "Lab Assistant",
        accessLevel: "BASIC",
      },
    ],
  });

  // 2️⃣ Create Scanners
  await prisma.scanner.createMany({
    data: [
      {
        location: "North Gate",
        specificLocation: "Building A",
        status: "ONLINE",
        authorization: "BASIC",
      },
      {
        location: "Lab Door",
        specificLocation: "Room 302",
        status: "ONLINE",
        authorization: "BASIC",
      },
      {
        location: "Agile Lab",
        specificLocation: "Room 255",
        status: "ONLINE",
        authorization: "BASIC",
      },
    ],
  });

  // 3️⃣ Fetch IDs for relations
  const scanners = await prisma.scanner.findMany({
    select: { deviceId: true },
  });

  const users = await prisma.user.findMany({
    select: { rfidUid: true },
  });

  const scannerIds = scanners.map((s) => s.deviceId);
  const userRfids = users.map((u) => u.rfidUid);

  // 4️⃣ Create Events
  await prisma.event.createMany({
    data: createRandomizedEvents(scannerIds, userRfids, EVENT_COUNT),
  });

  console.log("Database seeded successfully!");
}

seedDB()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });