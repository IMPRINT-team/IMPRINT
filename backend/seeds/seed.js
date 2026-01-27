import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDB () {
    await prisma.scanner.createMany({
        data: [
            {
                deviceName: "North Gate",
                location: "Building A",
                status: "OFFLINE"
            },
            {
                deviceName: "Lab Door",
                location: "Room 302",
                status: "DEGRADED"
            },
            {
                deviceName: "Agile Lab",
                location: "Room 255"
            }
        ]
    })
    console.log("Database seeded successfully!")
}

// TO SEED SCANNER DATABASE WITH NEW INFO WHILE RUNNING

// async function whileActiveSeed() {
//     await prisma.scanner.create({
//         data: {
//                 deviceName: "Bruner Lecture Hall",
//                 location: "Bruner 119",
//                 authorization: "ADVANCED"
//         }
//     })
// }

// whileActiveSeed();

// commment out if running whileActiveSeed()
seedDB();
