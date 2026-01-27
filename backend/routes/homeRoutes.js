import express from "express";
import { getScannerById, getScannersByName, getScanners, getScannersByLocation, firstTimeScan, setUpUser } from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);
homeRouter.get("/search/name/:name", getScannersByName);
homeRouter.get("/search/id/:id", getScannerById);
homeRouter.get("/search/location/:location", getScannersByLocation);
homeRouter.post("/user/scan", firstTimeScan);
homeRouter.put("/user/register", setUpUser);

export default homeRouter;