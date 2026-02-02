import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:8080"

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export const getScanners = async (req, res) => {
    try {
        const scanners = await prisma.scanner.findMany();
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const getScannersByName = async (req, res) => {
    try {
        const name = req.params.name;
        const scanners = await prisma.scanner.findMany({
            where: {
                deviceName: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        });
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
}

export const getScannerById = async (req, res) => {
    try {
        const deviceId = req.params.id;
        const scanners = await prisma.scanner.findUnique({
            where: {
                id: deviceId
            }
        });
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
}

export const getScannersByLocation = async (req, res) => {
    try {
        const scannerLocation = req.params.location;
        const scanners = await prisma.scanner.findMany({
            where: {
                location: {
                    contains: scannerLocation,
                    mode: "insensitive"
                }
            }
        });
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
}

export const scan = async (req, res) => {
    const { rfidUid, scannerId, result } = req.body;

    if(!rfidUid || !scannerId || !result) {
        return res.status(400).json({success:false, error: "rfidUid and scannerId is required!"})
    }
    
    try {
        let event = await prisma.event.create({
            data: {
                uid: rfidUid,
                deviceId: scannerId,
                result: result,
            }
        })
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

<<<<<<< HEAD
export const setUpUser = async (req, res) => {
    const {rfidUid, email, password} = req.body;

    if(!rfidUid || !email || !password) {
=======
export const addUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
>>>>>>> b76e79db546e653973b22d520a6e828a7f2e05a0
        return res.status(400).json({error: "Missing fields!"});
    }

    const existing = await prisma.user.findUnique({
<<<<<<< HEAD
        where: rfidUid
=======
        where: {
            email: email
        }
>>>>>>> b76e79db546e653973b22d520a6e828a7f2e05a0
    });

    if (existing?.isRegistered) {
        return res.status(400).json({success: false, error: "User already registered!"})
    }

    const passwordHash = await hashPassword(password);

    try {
<<<<<<< HEAD
        const user = await prisma.user.update({
            where: {rfidUid},
=======
        const user = await prisma.user.create({
>>>>>>> b76e79db546e653973b22d520a6e828a7f2e05a0
            data: {email, passwordHash, isRegistered: true}
        });
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: [{occurredAt: 'desc'}, {id: 'asc'}]
        });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
<<<<<<< HEAD
}
=======
}

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}


export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        // 1. Find the user
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 2. Check Password
        // Handle cases where passwordHash might be null (seeded users)
        const isMatch = user.passwordHash 
            ? await bcrypt.compare(password, user.passwordHash) 
            : false;

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 3. Return Success
        const { passwordHash, ...userData } = user;
        void passwordHash;
        res.status(200).json({ 
            success: true, 
            user: userData,
            token: "mock-jwt-token-" + user.id 
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
>>>>>>> b76e79db546e653973b22d520a6e828a7f2e05a0
