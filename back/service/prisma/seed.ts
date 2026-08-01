// Modules
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'node:path'

// Prisma
import { PrismaClient } from './generated/client'

// Seed
import { seedBookings } from './seed/seed-bookings'
import { seedRooms } from './seed/seed-rooms'
import { printSeedSummary } from './seed/seed-summary'
import { seedUsers } from './seed/seed-users'
import { TEST_PASSWORD } from './seed/seed.constants'

dotenv.config({
  path: path.resolve(process.cwd(), '../../.env'),
})

const DATABASE_URL = process.env.DATABASE_URL

const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured')
}

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

const PASSWORD_HASH_ROUNDS = 12

const main = async (): Promise<void> => {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, PASSWORD_HASH_ROUNDS)

  await prisma.$transaction(async (transaction) => {
    const users = await seedUsers({
      transaction,
      passwordHash,
    })

    const rooms = await seedRooms({
      transaction,
    })

    await seedBookings({
      transaction,
      users,
      rooms,
      officeTimeZone: OFFICE_TIME_ZONE,
    })
  })

  printSeedSummary()
}

main()
  .catch((error: unknown) => {
    console.error('Database seeding failed:', error)

    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
