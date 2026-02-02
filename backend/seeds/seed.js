// run with node backend/seeds/seed.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDB () {
    await prisma.scanner.createMany({
        data: [
            {
                location: "North Gate",
                specificLocation: "Building A",
                status: "OFFLINE"
            },
            {
                location: "Lab Door",
                specificLocation: "Room 302",
                status: "DEGRADED"
            },
            {
                location: "Agile Lab",
                specificLocation: "Room 255"
            }
        ]
    })
    console.log("Database seeded successfully!")
}

// TO SEED SCANNER DATABASE WITH NEW INFO WHILE RUNNING
// Also always change this! Scanner names must be unique

// async function whileActiveSeed() {
//     await prisma.scanner.create({
//         data: {
//                 deviceName: "Foundation Hall",
//                 location: "Room 237",
//                 authorization: "ELITE"
//         }
//     })
// }

// whileActiveSeed();

// commment out if running whileActiveSeed()
seedDB();
