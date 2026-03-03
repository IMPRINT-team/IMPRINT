export const getScannerHealthResponse = async (prisma, scannerId, upsertSeen) => {
  await prisma.$queryRaw`SELECT 1`;

  if (!scannerId) {
    return {
      statusCode: 400,
      body: {
        status: "error",
        database: "ok",
        error: "scannerId query parameter is required",
      },
    };
  }

  const scanner = await prisma.scanner.findUnique({
    where: {
      deviceId: scannerId,
    },
    select: {
      deviceId: true,
    },
  });

  let targeted = 0;

  if (!scanner) {
    const scannerPresence = upsertSeen(scannerId);
    targeted = scannerPresence?.targeted ? 1 : 0;
  }

  return {
    statusCode: 200,
    body: {
      status: "ok",
      database: "ok",
      registered: scanner ? 1 : 0,
      targeted,
    },
  };
};
