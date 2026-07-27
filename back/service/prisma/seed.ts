// Configs
import { PrismaClient } from './generated/client'

// Modules
import { PrismaPg } from '@prisma/adapter-pg'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import path from 'path'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured')
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const PRISMA = new PrismaClient({
  adapter: adapter,
})

const TEST_PASSWORD = 'Roomly123!'
const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

const createFutureDate = (daysFromNow: number, hour: number, minute = 0): Date => {
  const nowInOfficeTimeZone = toZonedTime(new Date(), OFFICE_TIME_ZONE)

  const localDate = new Date(
    nowInOfficeTimeZone.getFullYear(),
    nowInOfficeTimeZone.getMonth(),
    nowInOfficeTimeZone.getDate() + daysFromNow,
    hour,
    minute,
    0,
    0,
  )

  return fromZonedTime(localDate, OFFICE_TIME_ZONE)
}

const main = async (): Promise<void> => {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 12)

  await PRISMA.$transaction(async (tx) => {
    const olena = await tx.user.upsert({
      where: {
        email: 'olena.koval@roomly.dev',
      },
      update: {
        name: 'Olena Koval',
        passwordHash,
      },
      create: {
        name: 'Olena Koval',
        email: 'olena.koval@roomly.dev',
        passwordHash,
      },
    })

    const maksym = await tx.user.upsert({
      where: {
        email: 'maksym.bondar@roomly.dev',
      },
      update: {
        name: 'Maksym Bondar',
        passwordHash,
      },
      create: {
        name: 'Maksym Bondar',
        email: 'maksym.bondar@roomly.dev',
        passwordHash,
      },
    })

    const sofia = await tx.user.upsert({
      where: {
        email: 'sofia.melnyk@roomly.dev',
      },
      update: {
        name: 'Sofia Melnyk',
        passwordHash,
      },
      create: {
        name: 'Sofia Melnyk',
        email: 'sofia.melnyk@roomly.dev',
        passwordHash,
      },
    })

    const horizon = await tx.room.upsert({
      where: {
        name: 'Horizon',
      },
      update: {
        floor: 2,
        capacity: 6,
      },
      create: {
        name: 'Horizon',
        floor: 2,
        capacity: 6,
      },
    })

    const atlas = await tx.room.upsert({
      where: {
        name: 'Atlas',
      },
      update: {
        floor: 3,
        capacity: 10,
      },
      create: {
        name: 'Atlas',
        floor: 3,
        capacity: 10,
      },
    })

    const focus = await tx.room.upsert({
      where: {
        name: 'Focus',
      },
      update: {
        floor: 2,
        capacity: 4,
      },
      create: {
        name: 'Focus',
        floor: 2,
        capacity: 4,
      },
    })

    const boardroom = await tx.room.upsert({
      where: {
        name: 'Boardroom',
      },
      update: {
        floor: 4,
        capacity: 16,
      },
      create: {
        name: 'Boardroom',
        floor: 4,
        capacity: 16,
      },
    })

    const lighthouse = await tx.room.upsert({
      where: {
        name: 'Lighthouse',
      },
      update: {
        floor: 1,
        capacity: 8,
      },
      create: {
        name: 'Lighthouse',
        floor: 1,
        capacity: 8,
      },
    })

    const garden = await tx.room.upsert({
      where: {
        name: 'Garden',
      },
      update: {
        floor: 3,
        capacity: 5,
      },
      create: {
        name: 'Garden',
        floor: 3,
        capacity: 5,
      },
    })

    await tx.booking.deleteMany({
      where: {
        userId: {
          in: [olena.id, maksym.id, sofia.id],
        },
      },
    })

    await tx.booking.createMany({
      data: [
        {
          title: 'Weekly Product Sync',
          startTime: createFutureDate(1, 9),
          endTime: createFutureDate(1, 10),
          userId: olena.id,
          roomId: horizon.id,
        },
        {
          title: 'Frontend Architecture Review',
          startTime: createFutureDate(1, 10, 30),
          endTime: createFutureDate(1, 12),
          userId: maksym.id,
          roomId: atlas.id,
        },
        {
          title: 'Candidate Interview',
          startTime: createFutureDate(1, 13),
          endTime: createFutureDate(1, 14),
          userId: sofia.id,
          roomId: focus.id,
        },
        {
          title: 'Quarterly Planning',
          startTime: createFutureDate(2, 9),
          endTime: createFutureDate(2, 11),
          userId: olena.id,
          roomId: boardroom.id,
        },
        {
          title: 'Design System Workshop',
          startTime: createFutureDate(2, 11),
          endTime: createFutureDate(2, 12, 30),
          userId: sofia.id,
          roomId: lighthouse.id,
        },
        {
          title: 'Backend Sprint Retrospective',
          startTime: createFutureDate(3, 9),
          endTime: createFutureDate(3, 10),
          userId: maksym.id,
          roomId: garden.id,
        },
      ],
    })
  })

  console.log('Database seeded successfully.')
  console.log('Created 3 users, 6 rooms, and 6 bookings.')
  console.log('')
  console.log('Test accounts:')
  console.log(`- olena.koval@roomly.dev / ${TEST_PASSWORD}`)
  console.log(`- maksym.bondar@roomly.dev / ${TEST_PASSWORD}`)
  console.log(`- sofia.melnyk@roomly.dev / ${TEST_PASSWORD}`)
}

main()
  .catch((error: unknown) => {
    console.error('Database seeding failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await PRISMA.$disconnect()
  })
