// Modules
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

// Prisma
import type { Prisma } from '../generated/client'

// Types
import type { SeededRooms } from './seed-rooms'
import type { SeededUsers } from './seed-users'

interface SeedBookingsParams {
  transaction: Prisma.TransactionClient
  users: SeededUsers
  rooms: SeededRooms
  officeTimeZone: string
}

interface FutureDateParams {
  daysFromNow: number
  hour: number
  minute?: number
  officeTimeZone: string
}

const createFutureDate = ({
  daysFromNow,
  hour,
  minute = 0,
  officeTimeZone,
}: FutureDateParams): Date => {
  const nowInOfficeTimeZone = toZonedTime(new Date(), officeTimeZone)

  const localDate = new Date(
    nowInOfficeTimeZone.getFullYear(),
    nowInOfficeTimeZone.getMonth(),
    nowInOfficeTimeZone.getDate() + daysFromNow,
    hour,
    minute,
    0,
    0,
  )

  return fromZonedTime(localDate, officeTimeZone)
}

export const seedBookings = async ({
  transaction,
  users,
  rooms,
  officeTimeZone,
}: SeedBookingsParams): Promise<void> => {
  const testUserIds = [users.olena.id, users.maksym.id, users.sofia.id]

  await transaction.booking.deleteMany({
    where: {
      userId: {
        in: testUserIds,
      },
    },
  })

  await transaction.booking.createMany({
    data: [
      {
        title: 'Weekly Product Sync',
        startTime: createFutureDate({
          daysFromNow: 1,
          hour: 9,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 1,
          hour: 10,
          officeTimeZone,
        }),
        userId: users.olena.id,
        roomId: rooms.horizon.id,
      },

      {
        title: 'Frontend Architecture Review',
        startTime: createFutureDate({
          daysFromNow: 1,
          hour: 10,
          minute: 30,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 1,
          hour: 12,
          officeTimeZone,
        }),
        userId: users.maksym.id,
        roomId: rooms.atlas.id,
      },

      {
        title: 'Candidate Interview',
        startTime: createFutureDate({
          daysFromNow: 1,
          hour: 13,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 1,
          hour: 14,
          officeTimeZone,
        }),
        userId: users.sofia.id,
        roomId: rooms.focus.id,
      },

      {
        title: 'Quarterly Planning',
        startTime: createFutureDate({
          daysFromNow: 2,
          hour: 9,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 2,
          hour: 11,
          officeTimeZone,
        }),
        userId: users.olena.id,
        roomId: rooms.boardroom.id,
      },

      {
        title: 'Design System Workshop',
        startTime: createFutureDate({
          daysFromNow: 2,
          hour: 11,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 2,
          hour: 12,
          minute: 30,
          officeTimeZone,
        }),
        userId: users.sofia.id,
        roomId: rooms.lighthouse.id,
      },

      {
        title: 'Backend Sprint Retrospective',
        startTime: createFutureDate({
          daysFromNow: 3,
          hour: 9,
          officeTimeZone,
        }),
        endTime: createFutureDate({
          daysFromNow: 3,
          hour: 10,
          officeTimeZone,
        }),
        userId: users.maksym.id,
        roomId: rooms.garden.id,
      },
    ],
  })
}
