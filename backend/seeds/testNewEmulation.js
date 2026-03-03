export const DEFAULT_TEST_NEW_PAYLOAD = {
  rfidUid: "BE:00:28:AF",
  result: "ACCEPTED",
};

const getHealthStyleResponse = (scannerPresence) => ({
  status: "ok",
  database: "ok",
  registered: 0,
  targeted: scannerPresence?.targeted ? 1 : 0,
});

export async function runTestNewEmulation(prisma, payload, upsertSeen, logger = console) {
  const {
    registeredScannerId,
    rfidUid = DEFAULT_TEST_NEW_PAYLOAD.rfidUid,
    result = DEFAULT_TEST_NEW_PAYLOAD.result,
    unregisteredScannerId = `UNREGISTERED-${Date.now()}`,
  } = payload ?? {};

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
      uid: rfidUid,
      deviceId: scanner.deviceId,
      result,
    },
  });

  const scannerPresence = upsertSeen(unregisteredScannerId);
  const healthResponse = getHealthStyleResponse(scannerPresence);

  logger.log("[TestNew] Emulated unregistered scanner health response", {
    scannerId: unregisteredScannerId,
    response: healthResponse,
  });

  return {
    status: 200,
    body: {
      success: true,
      registeredScannerId: scanner.deviceId,
      createdEvent: event,
      emulatedHealthCheck: {
        scannerId: unregisteredScannerId,
        response: healthResponse,
      },
    },
  };
}
