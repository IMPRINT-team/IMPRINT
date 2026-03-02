import express from "express";

const createHealthRouter = (prisma) => {
  const healthRouter = express.Router();

  healthRouter.get("/health", async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ status: "ok", database: "ok" });
    } catch {
      res.status(503).json({ status: "degraded", database: "unavailable" });
    }
  });

  return healthRouter;
};

export default createHealthRouter;
