import express from "express";
import { upsertSeen } from "../services/unregisteredScannerPresence.js";
import { getScannerHealthResponse } from "../services/healthResponse.js";

const createHealthRouter = (prisma) => {
  const healthRouter = express.Router();

  healthRouter.get("/health", async (req, res) => {
    try {
      const result = await getScannerHealthResponse(prisma, req.query.scannerId, upsertSeen);
      return res.status(result.statusCode).json(result.body);
    } catch {
      return res.status(503).json({ status: "error", database: "unavailable" });
    }
  });

  return healthRouter;
};

export default createHealthRouter;
