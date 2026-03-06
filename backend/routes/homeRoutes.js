import express from "express";
// 1. Add 'login' to the imports
import { 
    getScannerByStatus, 
    getScannersByLocation, 
    getScanners, 
    getScannersBySpecLocation, 
    getScannersByAuthLevel,
    scan, 
    createScanner,
    updateScanner,
    addUser, 
    getEvents, 
    getUsers, 
    getUserByRfid,
    deleteScanner,
    getEventBySearch,
    login, // New
    getOnboardingScanners,
    getOnlineScanners,
    targetOnboardingScanner,
    registerOnboardingScanner,
    testNew,
} from "../controllers/homeControllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getScanners);
homeRouter.post("/", createScanner);
homeRouter.get("/scanners", getScanners);
homeRouter.post("/scanners", createScanner);
homeRouter.put("/scanners/:id", updateScanner);
homeRouter.get("/search/location/:location", getScannersByLocation);
homeRouter.get("/search/status/:status", getScannerByStatus);
homeRouter.get("/search/specificLocation/:specificLocation", getScannersBySpecLocation);
homeRouter.get("/search/authorization/:authorization", getScannersByAuthLevel);
homeRouter.delete("/admin/scanners/:id", deleteScanner);
homeRouter.get("/event", getEvents);
homeRouter.get("/event/search", getEventBySearch);
homeRouter.post("/event/scan", scan);
homeRouter.post("/login", login); //Updated
homeRouter.post("/user/register", addUser);// New
homeRouter.post("/user", addUser);
homeRouter.get("/user", getUsers);
homeRouter.get("/user/:rfidUid", getUserByRfid);
homeRouter.get("/online/scanners", getOnlineScanners);
// Onboarding endpoints are mounted on the existing /api home router.
homeRouter.get("/onboarding/scanners", getOnboardingScanners);
homeRouter.post("/onboarding/scanners/:scannerId/target", targetOnboardingScanner);
homeRouter.post("/onboarding/scanners/:scannerId/register", registerOnboardingScanner);
homeRouter.post("/TestNew", testNew);

export default homeRouter;
