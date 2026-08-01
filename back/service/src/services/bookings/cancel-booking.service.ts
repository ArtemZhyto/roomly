// Configs
import { prisma } from '@configs/index'

// Errors
import { ForbiddenError, NotFoundError } from '@errors/index'

export const cancelBooking = async (bookingId: number, userId: number): Promise<void> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },

    select: {
      id: true,
      userId: true,
    },
  })

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  if (booking.userId !== userId) {
    throw new ForbiddenError('You can only cancel your own bookings')
  }

  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  })
}

export const cancelBookingSeries = async (seriesId: number, userId: number): Promise<void> => {
  const series = await prisma.bookingSeries.findUnique({
    where: {
      id: seriesId,
    },

    select: {
      id: true,
      userId: true,
    },
  })

  if (!series) {
    throw new NotFoundError('Booking series not found')
  }

  if (series.userId !== userId) {
    throw new ForbiddenError('You can only cancel your own booking series')
  }

  await prisma.bookingSeries.delete({
    where: {
      id: seriesId,
    },
  })
}
