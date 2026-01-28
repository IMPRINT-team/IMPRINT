import express from "express";
import { getScannerById, getScannersByName, getScanners, getScannersByLocation, scan, setUpUser, getEvents } from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);
homeRouter.get("/search/name/:name", getScannersByName);
homeRouter.get("/search/id/:id", getScannerById);
homeRouter.get("/search/location/:location", getScannersByLocation);
homeRouter.get("/event", getEvents)
homeRouter.post("/event/scan", scan);
homeRouter.put("/user/register", setUpUser);

export default homeRouter;