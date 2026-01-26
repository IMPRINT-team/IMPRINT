import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDB () {
    await prisma.scanner.createMany({
        data: [
            {
                deviceName: "North Gate",
                location: "Building A"
            },
            {
                deviceName: "Lab Door",
                location: "Room 302"
            },
            {
                deviceName: "Agile Lab",
                location: "Room 255"
            }
        ]
    })
    console.log("Database seeded successfully!")
}

seedDB();