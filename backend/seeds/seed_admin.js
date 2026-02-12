// 1. Use the named import
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// 2. Instantiate the client directly here
const prisma = new PrismaClient()

async function main() {
  const email = 'admin@imprint.com'
  const password = 'admin'

  console.log(`Hashing password for ${email}...`)
  
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  console.log('Upserting user...')
  
  // 3. Run the upsert
  const user = await prisma.user.upsert({
    where: { email: email },
    update: { passwordHash, accessLevel: 'ADMIN' },
    create: {
      email,
      passwordHash,
      rfidUid: '999-999', // Unique placeholder
      accessLevel: 'ADMIN',
      isRegistered: true
    },
  })

  console.log(`Admin user created/updated: ${user.email}`)
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