import express from "express";
// 1. Add 'login' to the imports
import { 
    getScannerById, 
    getScannersByName, 
    getScanners, 
    getScannersByLocation, 
    scan, 
    addUser, 
    getEvents, 
    getUsers, 
    getUserByEmail,
    login // New
} from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);
homeRouter.get("/search/name/:name", getScannersByName);
homeRouter.get("/search/id/:id", getScannerById);
homeRouter.get("/search/location/:location", getScannersByLocation);
homeRouter.get("/event", getEvents)
homeRouter.post("/event/scan", scan);
homeRouter.post("/login", login); //Updated
homeRouter.post("/user/register", addUser);// New
homeRouter.post("/user/login", addUser);
homeRouter.get("/user", getUsers)
homeRouter.get("/user/:email", getUserByEmail)

export default homeRouter;