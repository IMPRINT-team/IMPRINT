import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const deleteData = async () => {
    await prisma.event.deleteMany({})
    await prisma.scanner.deleteMany({})
    await prisma.user.deleteMany({})
}

deleteData();