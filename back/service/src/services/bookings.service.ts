// Configs
import PRISMA from '@configs/config'

// Modules
import { Prisma } from '../../prisma/generated/client'
import { toZonedTime } from 'date-fns-tz'

// Interfaces
import { CreateBooking } from '@ts/interfaces/bookings'

const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE
const OFFICE_OPEN_HOUR = Number(process.env.OFFICE_OPEN_HOUR)
const OFFICE_CLOSE_HOUR = Number(process.env.OFFICE_CLOSE_HOUR)

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

if (!Number.isInteger(OFFICE_OPEN_HOUR) || OFFICE_OPEN_HOUR < 0 || OFFICE_OPEN_HOUR > 23) {
  throw new Error('OFFICE_OPEN_HOUR is not configured correctly')
}

if (!Number.isInteger(OFFICE_CLOSE_HOUR) || OFFICE_CLOSE_HOUR < 1 || OFFICE_CLOSE_HOUR > 24) {
  throw new Error('OFFICE_CLOSE_HOUR is not configured correctly')
}

if (OFFICE_OPEN_HOUR >= OFFICE_CLOSE_HOUR) {
  throw new Error('Office opening hour must be earlier than closing hour')
}

const formattedOpenHour = String(OFFICE_OPEN_HOUR).padStart(2, '0')
const formattedCloseHour = String(OFFICE_CLOSE_HOUR).padStart(2, '0')

export const bookingsService = {
  getUserBookings: async (userId: number, pastPage: number, pastLimit: number) => {
    const now = new Date()
    const skip = (pastPage - 1) * pastLimit

    const [upcoming, pastItems, pastTotal] = await Promise.all([
      PRISMA.booking.findMany({
        where: {
          userId,
          endTime: {
            gt: now,
          },
        },
        include: {
          room: {
            select: {
              id: true,
              name: true,
              floor: true,
              capacity: true,
            },
          },
        },
        orderBy: {
          startTime: 'asc',
        },
      }),

      PRISMA.booking.findMany({
        where: {
          userId,
          endTime: {
            lte: now,
          },
        },
        include: {
          room: {
            select: {
              id: true,
              name: true,
              floor: true,
              capacity: true,
            },
          },
        },
        orderBy: {
          startTime: 'desc',
        },
        skip,
        take: pastLimit,
      }),

      PRISMA.booking.count({
        where: {
          userId,
          endTime: {
            lte: now,
          },
        },
      }),
    ])

    return {
      upcoming,
      past: {
        items: pastItems,
        page: pastPage,
        limit: pastLimit,
        total: pastTotal,
        totalPages: Math.ceil(pastTotal / pastLimit),
      },
    }
  },

  createBooking: async (data: CreateBooking) => {
    const user = await PRISMA.user.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        emailVerifiedAt: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.emailVerifiedAt) {
      throw new Error('Email must be verified before booking')
    }

    const startDate = new Date(data.startTime)
    const endDate = new Date(data.endTime)

    const room = await PRISMA.room.findUnique({
      where: { id: data.roomId },
      select: { id: true },
    })

    if (!room) {
      throw new Error('Room not found')
    }

    if (startDate <= new Date()) {
      throw new Error('Booking must be in the future')
    }

    if (startDate >= endDate) {
      throw new Error('End time must be later than start time')
    }

    const durationMinutes = (endDate.getTime() - startDate.getTime()) / 60_000

    if (durationMinutes < 30 || durationMinutes > 240) {
      throw new Error('Booking duration must be between 30 minutes and 4 hours')
    }

    const localStartDate = toZonedTime(startDate, OFFICE_TIME_ZONE)
    const localEndDate = toZonedTime(endDate, OFFICE_TIME_ZONE)

    const startMinutes = localStartDate.getHours() * 60 + localStartDate.getMinutes()
    const endMinutes = localEndDate.getHours() * 60 + localEndDate.getMinutes()

    if (
      localStartDate.toDateString() !== localEndDate.toDateString() ||
      startMinutes < OFFICE_OPEN_HOUR * 60 ||
      endMinutes > OFFICE_CLOSE_HOUR * 60
    ) {
      throw new Error(
        `Booking must be within office hours from ${formattedOpenHour}:00 to ${formattedCloseHour}:00 ${OFFICE_TIME_ZONE}`,
      )
    }

    if (
      startDate.getUTCMinutes() % 30 !== 0 ||
      endDate.getUTCMinutes() % 30 !== 0 ||
      startDate.getUTCSeconds() !== 0 ||
      endDate.getUTCSeconds() !== 0 ||
      startDate.getUTCMilliseconds() !== 0 ||
      endDate.getUTCMilliseconds() !== 0
    ) {
      throw new Error('Booking time must use 30-minute increments')
    }

    const overlappingBooking = await PRISMA.booking.findFirst({
      where: {
        roomId: data.roomId,
        startTime: {
          lt: endDate,
        },
        endTime: {
          gt: startDate,
        },
      },
      select: {
        id: true,
      },
    })

    if (overlappingBooking) {
      throw new Error('Room is already booked for this time')
    }

    try {
      return await PRISMA.booking.create({
        data: {
          roomId: data.roomId,
          userId: data.userId,
          title: data.title,
          startTime: startDate,
          endTime: endDate,
        },
      })
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2004') {
        throw new Error('Room is already booked for this time')
      }

      throw err
    }
  },

  deleteBooking: async (bookingId: number, userId: number) => {
    const booking = await PRISMA.booking.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        id: true,
        userId: true,
      },
    })

    if (!booking) {
      throw new Error('Booking not found')
    }

    if (booking.userId !== userId) {
      throw new Error('You can only cancel your own bookings')
    }

    await PRISMA.booking.delete({
      where: {
        id: bookingId,
      },
    })
  },
}
