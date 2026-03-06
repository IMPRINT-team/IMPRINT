import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const rfidUid = '999-999'

  const user = await prisma.user.upsert({
    where: { rfidUid },
    update: {
      name: 'Admin User',
      accessLevel: 'ADMIN',
      isRegistered: true,
    },
    create: {
      rfidUid,
      name: 'Admin User',
      accessLevel: 'ADMIN',
      isRegistered: true,
    },
  })

  console.log(`Admin user created/updated: ${user.rfidUid}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error seeding admin:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
