import { PrismaClient } from "@prisma/client";
import { listActiveUnregistered, setTargeted, consume, upsertSeen } from "../services/unregisteredScannerPresence.js";
import { runTestNewEmulation } from "../seeds/testNewEmulation.js";

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
        const scanner = await prisma.scanner.create({
            data: {location, specificLocation, status, authorization}
        })
        res.status(200).json(scanner)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const updateScanner = async (req, res) => {
    const scannerId = req.params.id;
    const { location, specificLocation, status, authorization } = req.body;

    const updateData = {
        ...(location !== undefined ? { location } : {}),
        ...(specificLocation !== undefined ? { specificLocation } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(authorization !== undefined ? { authorization } : {}),
    };

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, error: "No scanner fields provided for update." });
    }

    try {
        const updatedScanner = await prisma.scanner.update({
            where: {
                deviceId: scannerId,
            },
            data: updateData,
        });

        res.status(200).json(updatedScanner);
    } catch (err) {
        if (err?.code === "P2025") {
            return res.status(404).json({ success: false, error: "Scanner not found." });
        }

        res.status(500).json({ success: false, error: err });
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
                userRfid: rfidUid,
                deviceId: scannerId,
                result: result,
            },
            include: {
                scanner: true,
                user: true,
            },
        })
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const addUser = async (req, res) => {
    const { rfidUid, name, accessLevel } = req.body;

    if (!rfidUid) {
        return res.status(400).json({ error: "rfidUid is required!" });
    }

    try {
        const user = await prisma.user.upsert({
            where: { rfidUid },
            update: {
                ...(name !== undefined ? { name } : {}),
                ...(accessLevel !== undefined ? { accessLevel: accessLevel.toUpperCase() } : {}),
                isRegistered: true,
            },
            create: {
                rfidUid,
                ...(name !== undefined ? { name } : {}),
                ...(accessLevel !== undefined ? { accessLevel: accessLevel.toUpperCase() } : {}),
                isRegistered: true,
            },
        });
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                scanner: true,
                user: true,
            },
            orderBy: [{occurredAt: 'desc'}, {id: 'asc'}]
        });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const getEventBySearch = async (req, res) => {
  try {
    const value = req.query.value?.trim() || "";
    const date = req.query.date || "";

    const andFilters = [];

    if (value !== "") {
      const textOrFilters = [
        { userRfid: { contains: value, mode: "insensitive" } },
        { result: { contains: value, mode: "insensitive" } },
        { scanner: { location: { contains: value, mode: "insensitive" } } },
        { scanner: { specificLocation: { contains: value, mode: "insensitive" } } },
        { user: { name: { contains: value, mode: "insensitive" } } },
      ];

      if (value.length === 36) {
        textOrFilters.push({ id: value });
        textOrFilters.push({ deviceId: value });
      }

      andFilters.push({ OR: textOrFilters });
    }
// TODO: Fix timezone mismatch.
    if (date) {
        let utcStart = new Date(date + "T00:00:00");
        let utcEnd = new Date(date + "T23:59:59.999");

        const localStart = utcStart.toISOString()
        const localEnd = utcEnd.toISOString()
            
        andFilters.push({
          occurredAt: {
            gte: localStart,
            lte: localEnd,
          },
        });
}

    const events = await prisma.event.findMany({
      where: andFilters.length > 0 ? { AND: andFilters } : {},
      include: {
        scanner: true,
        user: true,
      },
      orderBy: {
        occurredAt: "desc",
      },
    });

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}


export const getUserByRfid = async (req, res) => {
    try {
        const rfidUid = req.params.rfidUid;
        const user = await prisma.user.findUnique({
            where: {
                rfidUid,
            }
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

export const login = async (req, res) => {
    const { rfidUid } = req.body;

    if (!rfidUid) {
        return res.status(400).json({ error: "rfidUid required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { rfidUid }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ 
            success: true, 
            user,
            token: "mock-jwt-token-" + user.id 
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


// List active unregistered scanners for the dashboard Listening modal.
export const getOnboardingScanners = async (req, res) => {
    try {
        const scanners = listActiveUnregistered()
            .sort((a, b) => b.lastSeenAt - a.lastSeenAt)
            .map(({ scannerId, lastSeenAt, targeted }) => ({
                scannerId,
                lastSeenAt,
                targeted,
            }));
        res.status(200).json(scanners);
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

// Set targeted state for a discovered unregistered scanner.
export const targetOnboardingScanner = async (req, res) => {
    try {
        const scannerId = req.params.scannerId;
                // Default targeting on when body.targeted is omitted.
        const targeted = req.body?.targeted ?? true;
        const scanner = setTargeted(scannerId, targeted);

        if (!scanner) {
            return res.status(404).json({ success: false, error: "Scanner not found." });
        }

        res.status(200).json({
            scannerId: scanner.scannerId,
            lastSeenAt: scanner.lastSeenAt,
            targeted: scanner.targeted,
        });
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }
}

// Idempotently register scanner by deviceId and clear onboarding presence state.
export const registerOnboardingScanner = async (req, res) => {
    try {
        const scannerId = req.params.scannerId;
        const existingScanner = await prisma.scanner.findUnique({
            where: {
                deviceId: scannerId,
            }
        });

        if (existingScanner) {
            consume(scannerId);
            return res.status(200).json(existingScanner);
        }

        // Upsert protects against race conditions from concurrent registrations.
        const scanner = await prisma.scanner.upsert({
            where: {
                deviceId: scannerId,
            },
            update: {},
            create: {
                deviceId: scannerId,
                // Safe placeholders until admin updates details in ScannerModal.
                location: "UNASSIGNED",
                specificLocation: `UNASSIGNED-${scannerId}`,
                status: "ONLINE",
                authorization: "BASIC",
            },
        });

        consume(scannerId);
        res.status(201).json(scanner)
    } catch (err) {
        if (err?.code === "P2002") {
            const scanner = await prisma.scanner.findUnique({
                where: {
                    deviceId: req.params.scannerId,
                }
            });

            if (scanner) {
                consume(req.params.scannerId);
                return res.status(200).json(scanner);
            }
        }

        res.status(500).json({success: false, error: err})
    }
}

// Test helper route that emulates seeded scanner events and unregistered scanner health checks.
export const testNew = async (req, res) => {
    try {
        const result = await runTestNewEmulation(prisma, req.body, upsertSeen);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
}
