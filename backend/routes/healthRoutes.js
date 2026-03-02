import express from "express";

const createHealthRouter = (prisma) => {
  const healthRouter = express.Router();

  healthRouter.get("/health", async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      const scannerId = req.query.scannerId;

      if (!scannerId) {
        return res.status(400).json({
          status: "error",
          database: "ok",
          error: "scannerId query parameter is required",
        });
      }

      const scanner = await prisma.scanner.findUnique({
        where: {
          deviceId: scannerId,
        },
        select: {
          deviceId: true,
        },
      });

      return res.status(200).json({
        status: "ok",
        database: "ok",
        registered: scanner ? 1 : 0,
      });
    } catch {
      return res.status(503).json({ status: "error", database: "unavailable" });
    }
  });

  return healthRouter;
};

export default createHealthRouter;
