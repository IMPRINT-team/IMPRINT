import { getScannerHealthResponse } from "../services/healthResponse.js";

export const DEFAULT_TEST_NEW_PAYLOAD = {
  rfidUid: "BE:00:28:AF",
  result: "ACCEPTED",
};

export async function runTestNewEmulation(prisma, payload, upsertSeen, logger = console) {
  const {
    emulationType = "event-and-health-check",
    registeredScannerId,
    rfidUid = DEFAULT_TEST_NEW_PAYLOAD.rfidUid,
    result = DEFAULT_TEST_NEW_PAYLOAD.result,
    unregisteredScannerId = `UNREGISTERED-${Date.now()}`,
  } = payload ?? {};

  const healthResult = await getScannerHealthResponse(prisma, unregisteredScannerId, upsertSeen);
  const healthResponse = healthResult.body;

  if (emulationType === "health-check") {
    logger.log("[TestNew] Emulated unregistered scanner health response", {
      scannerId: unregisteredScannerId,
      response: healthResponse,
    });

    return {
      status: 200,
      body: {
        success: true,
        emulationType,
        emulatedHealthCheck: {
          scannerId: unregisteredScannerId,
          response: healthResponse,
        },
      },
    };
  }

  const scanner = registeredScannerId
    ? await prisma.scanner.findUnique({ where: { deviceId: registeredScannerId } })
    : await prisma.scanner.findFirst({ orderBy: { createdAt: "asc" } });

  if (!scanner) {
    return {
      status: 404,
      body: {
        success: false,
        error: "No registered scanners found. Seed scanner records before calling /TestNew.",
      },
    };
  }

  const event = await prisma.event.create({
    data: {
      userRfid: rfidUid,
      deviceId: scanner.deviceId,
      result,
    },
    include: {
      scanner: true,
      user: true,
    },
  });

  logger.log("[TestNew] Emulated unregistered scanner health response", {
    scannerId: unregisteredScannerId,
    response: healthResponse,
  });

  return {
    status: 200,
    body: {
      success: true,
      emulationType,
      registeredScannerId: scanner.deviceId,
      createdEvent: event,
      emulatedHealthCheck: {
        scannerId: unregisteredScannerId,
        response: healthResponse,
      },
    },
  };
}
