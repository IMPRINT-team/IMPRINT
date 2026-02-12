import express from "express";
// 1. Add 'login' to the imports
import { 
    getScannerByStatus, 
    getScannersByLocation, 
    getScanners, 
    getScannersBySpecLocation, 
    getScannersByAuthLevel,
    scan, 
    addUser, 
    getEvents, 
    getUsers, 
    getUserByEmail,
    deleteScanner,
    login // New
} from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);
homeRouter.get("/search/location/:location", getScannersByLocation);
homeRouter.get("/search/status/:status", getScannerByStatus);
homeRouter.get("/search/specificLocation/:specificLocation", getScannersBySpecLocation);
homeRouter.get("/search/authorization/:authorization", getScannersByAuthLevel);
homeRouter.delete("/admin/scanners/:id", deleteScanner);
homeRouter.get("/event", getEvents);
homeRouter.post("/event/scan", scan);
homeRouter.post("/login", login); //Updated
homeRouter.post("/user/register", addUser);// New
homeRouter.get("/user", getUsers);
homeRouter.get("/user/:email", getUserByEmail);

export default homeRouter;