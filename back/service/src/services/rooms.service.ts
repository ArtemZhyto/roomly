// Configs
import __PRISMA from '@configs/config'

export const roomsService = {
  getRoomsList: async (minCapacity: number) => {
    return __PRISMA.room.findMany({
      where: {
        capacity: {
          gte: minCapacity,
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
  },

  getRoomData: async (roomId: number) => {
    const room = await __PRISMA.room.findUnique({
      where: {
        id: roomId,
      },
    })

    if (!room) {
      throw new Error('Room not found')
    }

    return room
  },

  getRoomAvailability: async (roomId: number, fromDate: Date, toDate: Date) => {
    const room = await __PRISMA.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    })

    if (!room) {
      throw new Error('Room not found')
    }

    return __PRISMA.booking.findMany({
      where: {
        roomId,
        startTime: {
          lt: toDate,
        },
        endTime: {
          gt: fromDate,
        },
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })
  },
}
