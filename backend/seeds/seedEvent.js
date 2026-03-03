import { PrismaClient } from "@prisma/client";
import { upsertSeen } from "../services/unregisteredScannerPresence.js";
import { runTestNewEmulation } from "./testNewEmulation.js";

const prisma = new PrismaClient();

async function seedEvent() {
  const { status, body } = await runTestNewEmulation(prisma, {}, upsertSeen);

  if (status !== 200) {
    throw new Error(body.error ?? "Unable to seed test event.");
  }

  console.log("Seeded test event using TestNew emulation helper", {
    scannerId: body.registeredScannerId,
    eventId: body.createdEvent?.id,
    unregisteredScannerId: body.emulatedHealthCheck?.scannerId,
  });
}

seedEvent()
  .finally(async () => {
    await prisma.$disconnect();
  });
