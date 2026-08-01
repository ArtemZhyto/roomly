// Configs
import { prisma } from '@configs/index'

// Selects
import { ROOM_SELECT } from './room-select'

export const getRooms = async (minCapacity: number) => {
  return prisma.room.findMany({
    where: {
      capacity: {
        gte: minCapacity,
      },
    },

    select: ROOM_SELECT,

    orderBy: {
      id: 'asc',
    },
  })
}
