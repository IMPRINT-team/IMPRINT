import express from "express";
import { getScanners } from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);

export default homeRouter;