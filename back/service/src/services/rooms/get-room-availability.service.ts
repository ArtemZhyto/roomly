// Configs
import { prisma } from '@configs/index'

// Errors
import { NotFoundError } from '@errors/index'

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

export const getRoomAvailability = async (roomId: number, fromDate: Date, toDate: Date) => {
  await ensureRoomExists(roomId)

  return prisma.booking.findMany({
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
      seriesId: true,

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
}
