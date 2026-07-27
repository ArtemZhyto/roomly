// Configs
import PRISMA from '@configs/config'

// Modules
import { Prisma } from '../../prisma/generated/client'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

// Interfaces
import { CreateBooking } from '@ts/interfaces/bookings'

// Helpers
import { validateBookingTime } from '@helpers/validateBookingTime'

const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

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

    const room = await PRISMA.room.findUnique({
      where: {
        id: data.roomId,
      },
      select: {
        id: true,
      },
    })

    if (!room) {
      throw new Error('Room not found')
    }

    const initialStartDate = new Date(data.startTime)
    const initialEndDate = new Date(data.endTime)

    const initialLocalStartDate = toZonedTime(initialStartDate, OFFICE_TIME_ZONE)
    const initialLocalEndDate = toZonedTime(initialEndDate, OFFICE_TIME_ZONE)

    const occurrenceCount = data.recurrence?.count ?? 1

    const occurrences = Array.from({ length: occurrenceCount }, (_, index) => {
      const localStartDate = new Date(initialLocalStartDate)
      const localEndDate = new Date(initialLocalEndDate)

      localStartDate.setDate(localStartDate.getDate() + index * 7)
      localEndDate.setDate(localEndDate.getDate() + index * 7)

      const startDate = fromZonedTime(localStartDate, OFFICE_TIME_ZONE)
      const endDate = fromZonedTime(localEndDate, OFFICE_TIME_ZONE)

      validateBookingTime(startDate, endDate)

      return {
        startDate,
        endDate,
      }
    })

    const overlappingBooking = await PRISMA.booking.findFirst({
      where: {
        roomId: data.roomId,
        OR: occurrences.map(({ startDate, endDate }) => ({
          startTime: {
            lt: endDate,
          },
          endTime: {
            gt: startDate,
          },
        })),
      },
      select: {
        id: true,
      },
    })

    if (overlappingBooking) {
      throw new Error('Room is already booked for this time')
    }

    try {
      if (!data.recurrence) {
        const occurrence = occurrences[0]!

        return await PRISMA.booking.create({
          data: {
            roomId: data.roomId,
            userId: data.userId,
            title: data.title,
            startTime: occurrence.startDate,
            endTime: occurrence.endDate,
          },
        })
      }

      return await PRISMA.$transaction(async (tx) => {
        const series = await tx.bookingSeries.create({
          data: {
            userId: data.userId,
            totalOccurrences: occurrenceCount,
          },
        })

        await tx.booking.createMany({
          data: occurrences.map(({ startDate, endDate }) => ({
            roomId: data.roomId,
            userId: data.userId,
            title: data.title,
            startTime: startDate,
            endTime: endDate,
            seriesId: series.id,
          })),
        })

        const bookings = await tx.booking.findMany({
          where: {
            seriesId: series.id,
          },
          orderBy: {
            startTime: 'asc',
          },
        })

        return {
          series,
          bookings,
        }
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

  deleteBookingSeries: async (seriesId: number, userId: number) => {
    const series = await PRISMA.bookingSeries.findUnique({
      where: {
        id: seriesId,
      },
      select: {
        id: true,
        userId: true,
      },
    })

    if (!series) {
      throw new Error('Booking series not found')
    }

    if (series.userId !== userId) {
      throw new Error('You can only cancel your own booking series')
    }

    await PRISMA.bookingSeries.delete({
      where: {
        id: seriesId,
      },
    })
  },
}
