// run with node backend/seeds/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const RECENT_WEEKS = 4;
const EVENT_COUNT = 24;

function getRandomTimestampWithinLastWeeks(weeks) {
  const now = Date.now();
  const earliest = now - weeks * 7 * 24 * 60 * 60 * 1000;
  const randomTime = earliest + Math.random() * (now - earliest);

  return new Date(randomTime);
}

function createRandomizedEvents(deviceId, count) {
  const uids = ["BE:00:28:AF", "D4:F9:9A:10", "7C:AA:55:2E", "91:22:CD:FE"];
  const results = ["ACCEPTED", "DENIED"];

  return Array.from({ length: count }, () => ({
    uid: uids[Math.floor(Math.random() * uids.length)],
    result: results[Math.floor(Math.random() * results.length)],
    occurredAt: getRandomTimestampWithinLastWeeks(RECENT_WEEKS),
    deviceId,
  }));
}

async function seedDB() {
  await prisma.scanner.createMany({
    data: [
      {
        location: "North Gate",
        specificLocation: "Building A",
        status: "OFFLINE",
        authorization: "BASIC",
      },
      {
        location: "Lab Door",
        specificLocation: "Room 302",
        status: "DEGRADED",
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

  const scanner = await prisma.scanner.findFirst();

  await prisma.event.createMany({
    data: createRandomizedEvents(scanner.deviceId, EVENT_COUNT),
  });

  console.log("Database seeded successfully!");
}

// TO SEED SCANNER DATABASE WITH NEW INFO WHILE RUNNING
// Also always change this! Scanner specific locations must be unique
// async function whileActiveSeed() {
//   await prisma.scanner.create({
//     data: {
//       location: "Foundation Hall",
//       specificLocation: "Room 237",
//       authorization: "ELITE",
//     },
//   });
// }

// whileActiveSeed();

// comment out if running whileActiveSeed()
seedDB();
