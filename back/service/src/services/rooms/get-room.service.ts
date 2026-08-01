// Configs
import { prisma } from '@configs/index'

// Errors
import { NotFoundError } from '@errors/index'

// Selects
import { ROOM_SELECT } from './room-select'

export const getRoom = async (roomId: number) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },

    select: ROOM_SELECT,
  })

  if (!room) {
    throw new NotFoundError('Room not found')
  }

  return room
}
