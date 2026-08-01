// Prisma
import type { Prisma } from '../generated/client'

// Constants
import { ROOMS } from './seed.constants'

interface SeedRoomsParams {
  transaction: Prisma.TransactionClient
}

const upsertRoom = (
  transaction: Prisma.TransactionClient,
  room: {
    name: string
    floor: number
    capacity: number
  },
) => {
  return transaction.room.upsert({
    where: {
      name: room.name,
    },

    update: {
      floor: room.floor,
      capacity: room.capacity,
    },

    create: {
      name: room.name,
      floor: room.floor,
      capacity: room.capacity,
    },
  })
}

export const seedRooms = async ({ transaction }: SeedRoomsParams) => {
  const [horizon, atlas, focus, boardroom, lighthouse, garden] = await Promise.all([
    upsertRoom(transaction, ROOMS.horizon),
    upsertRoom(transaction, ROOMS.atlas),
    upsertRoom(transaction, ROOMS.focus),
    upsertRoom(transaction, ROOMS.boardroom),
    upsertRoom(transaction, ROOMS.lighthouse),
    upsertRoom(transaction, ROOMS.garden),
  ])

  return {
    horizon,
    atlas,
    focus,
    boardroom,
    lighthouse,
    garden,
  }
}

export type SeededRooms = Awaited<ReturnType<typeof seedRooms>>
