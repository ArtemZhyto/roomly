// Configs
import { prisma } from '@configs/index'

// Types
import type { GetUserBookingsParams, PaginationParams } from './booking.types'

const ROOM_SELECT = {
  id: true,
  name: true,
  floor: true,
  capacity: true,
} as const

const getPaginationSkip = ({ page, limit }: PaginationParams): number => {
  return (page - 1) * limit
}

const getTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit)
}

export const getUserBookings = async ({ userId, upcoming, past }: GetUserBookingsParams) => {
  const now = new Date()

  const [upcomingItems, upcomingTotal, pastItems, pastTotal] = await Promise.all([
    prisma.booking.findMany({
      where: {
        userId,
        endTime: {
          gt: now,
        },
      },

      include: {
        room: {
          select: ROOM_SELECT,
        },
      },

      orderBy: {
        startTime: 'asc',
      },

      skip: getPaginationSkip(upcoming),
      take: upcoming.limit,
    }),

    prisma.booking.count({
      where: {
        userId,
        endTime: {
          gt: now,
        },
      },
    }),

    prisma.booking.findMany({
      where: {
        userId,
        endTime: {
          lte: now,
        },
      },

      include: {
        room: {
          select: ROOM_SELECT,
        },
      },

      orderBy: {
        startTime: 'desc',
      },

      skip: getPaginationSkip(past),
      take: past.limit,
    }),

    prisma.booking.count({
      where: {
        userId,
        endTime: {
          lte: now,
        },
      },
    }),
  ])

  return {
    upcoming: {
      items: upcomingItems,
      page: upcoming.page,
      limit: upcoming.limit,
      total: upcomingTotal,
      totalPages: getTotalPages(upcomingTotal, upcoming.limit),
    },

    past: {
      items: pastItems,
      page: past.page,
      limit: past.limit,
      total: pastTotal,
      totalPages: getTotalPages(pastTotal, past.limit),
    },
  }
}
