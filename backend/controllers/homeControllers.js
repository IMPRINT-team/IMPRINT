import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set for backend runtime");
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

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

export const getScannersByLocation = async (req, res) => {
    try {
        const name = req.params.location;
        const scanners = await prisma.scanner.findMany({
            where: {
                location: {
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

export const getScannersByAuthLevel = async (req, res) => {
    try {
        const authLevel = req.params.authorization;
        const scanners = await prisma.scanner.findMany({
            where: {
                authorization: {
                    contains: authLevel,
                    mode: "insensitive"
                }
            }
        });
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
}

export const getScannerByStatus = async (req, res) => {
    try {
        const deviceStatus = req.params.status;
        const scanners = await prisma.scanner.findMany({
            where: {
                status: {
                    contains: deviceStatus,
                    mode: "insensitive"
                }
            }
        });
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
}

export const getScannersBySpecLocation = async (req, res) => {
    try {
        const scannerLocation = req.params.specificLocation;
        const scanners = await prisma.scanner.findMany({
            where: {
                specificLocation: {
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

export const createScanner = async (req, res) => {
    try {
        const { location, specificLocation, status, authorization } = req.body
        await prisma.scanner.create({
            data: {location, specificLocation, status, authorization}
        })
        res.status(200)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const deleteScanner = async (req, res) => {
    try {
        const scannerId = req.params.id;
        await prisma.event.deleteMany({
            where: {
                deviceId: scannerId
            }
        })
        await prisma.scanner.deleteMany({
            where: {
                deviceId: scannerId
            }
        })
        res.status(200).json({success: true})
    } catch (err) {
        res.status(500).json({error: err})
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

export const addUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: "Missing fields!"});
    }

    const existing = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existing?.isRegistered) {
        return res.status(400).json({success: false, error: "User already registered!"})
    }

    const passwordHash = await hashPassword(password);

    try {
        const user = await prisma.user.create({
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
