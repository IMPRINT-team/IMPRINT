// run with node backend/seeds/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  await prisma.event.create({
    data: {
      uid: "BE:00:28:AF",
      result: "ACCEPTED",
      scanner: {
        connect: { deviceId: scanner.deviceId },
      },
    },
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
