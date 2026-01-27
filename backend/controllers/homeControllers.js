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

export const firstTimeScan = async (req, res) => {
    const { rfidUid } = req.body;

    if(!rfidUid) {
        return res.status(400).json({success:false, error: "rfidUid is required!"})
    }
    
    try {
        let user = await prisma.user.findUnique({
            where: { rfidUid},
        });

        if (!user) {
            user = await prisma.user.create({
                data: {rfidUid},
            });
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const setUpUser = async (req, res) => {
    const {rfidUid, email, password} = req.body;

    if(!rfidUid || !email || !password) {
        return res.status(400).json({error: "Missing fields!"});
    }

    const existing = await prisma.user.findUnique({
        where: rfidUid
    });

    if (existing?.isRegistered) {
        return res.status(400).json({success: false, error: "User already registered!"})
    }

    const passwordHash = await hashPassword(password);

    try {
        const user = await prisma.user.update({
            where: {rfidUid},
            data: {email, passwordHash, isRegistered: true}
        });
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}