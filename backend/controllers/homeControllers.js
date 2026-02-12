import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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