// run with node backend/seeds/seed.js
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

function createRandomizedEvents(scannerIds, count) {
  const uids = ["BE:00:28:AF", "D4:F9:9A:10", "7C:AA:55:2E", "91:22:CD:FE"];

  return Array.from({ length: count }, () => ({
    uid: uids[Math.floor(Math.random() * uids.length)],
    result: getRandomResult(),
    occurredAt: getRandomTimestampWithinLastDays(RECENT_DAYS),
    deviceId: scannerIds[Math.floor(Math.random() * scannerIds.length)],
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
        status: "OFFLINE",
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

  const scanners = await prisma.scanner.findMany({ select: { deviceId: true } });
  const scannerIds = scanners.map((scanner) => scanner.deviceId);

  await prisma.event.createMany({
    data: createRandomizedEvents(scannerIds, EVENT_COUNT),
  });
  
  await prisma.user.createMany({
    data: [
      {
        rfidUid: "aasjndaiusndia",
        name: "Trey Gannod",
        accessLevel: "BASIC"
      },
      {
        rfidUid: "sufhbiubfiua",
        name: "Scrum Lord",
        accessLevel: "ADMIN"
      }
    ]
  })

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
