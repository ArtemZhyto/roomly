// Modules
import { Prisma } from '../../../prisma/generated/client'

// Configs
import { prisma } from '@configs/index'

// Errors
import { ConflictError, ForbiddenError, NotFoundError } from '@errors/index'

// Local helpers
import { createBookingOccurrences } from './booking-occurrences'

// Types
import type { BookingOccurrence, CreateBookingInput } from './booking.types'

const ensureUserCanBook = async (userId: number): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      emailVerifiedAt: true,
    },
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (!user.emailVerifiedAt) {
    throw new ForbiddenError('Email must be verified before booking')
  }
}

const ensureRoomExists = async (roomId: number): Promise<void> => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },

    select: {
      id: true,
    },
  })

  if (!room) {
    throw new NotFoundError('Room not found')
  }
}

const ensureOccurrencesAreAvailable = async (
  roomId: number,
  occurrences: BookingOccurrence[],
): Promise<void> => {
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      roomId,

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
    throw new ConflictError('Room is already booked for this time')
  }
}

const createSingleBooking = async (data: CreateBookingInput, occurrence: BookingOccurrence) => {
  return prisma.booking.create({
    data: {
      roomId: data.roomId,
      userId: data.userId,
      title: data.title,
      startTime: occurrence.startDate,
      endTime: occurrence.endDate,
    },
  })
}

const createRecurringBooking = async (
  data: CreateBookingInput,
  occurrences: BookingOccurrence[],
) => {
  return prisma.$transaction(async (transaction) => {
    const series = await transaction.bookingSeries.create({
      data: {
        userId: data.userId,
        totalOccurrences: occurrences.length,
      },
    })

    await transaction.booking.createMany({
      data: occurrences.map(({ startDate, endDate }) => ({
        roomId: data.roomId,
        userId: data.userId,
        title: data.title,
        startTime: startDate,
        endTime: endDate,
        seriesId: series.id,
      })),
    })

    const bookings = await transaction.booking.findMany({
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
}

const isBookingConflictError = (error: unknown): boolean => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2004'
}

export const createBooking = async (data: CreateBookingInput) => {
  await Promise.all([ensureUserCanBook(data.userId), ensureRoomExists(data.roomId)])

  const occurrenceCount = data.recurrence?.count ?? 1

  const occurrences = createBookingOccurrences({
    startTime: data.startTime,
    endTime: data.endTime,
    occurrenceCount,
  })

  await ensureOccurrencesAreAvailable(data.roomId, occurrences)

  const firstOccurrence = occurrences[0]

  if (!firstOccurrence) {
    throw new Error('Booking occurrence was not generated')
  }

  try {
    if (!data.recurrence) {
      return await createSingleBooking(data, firstOccurrence)
    }

    return await createRecurringBooking(data, occurrences)
  } catch (error: unknown) {
    if (isBookingConflictError(error)) {
      throw new ConflictError('Room is already booked for this time')
    }

    throw error
  }
}
