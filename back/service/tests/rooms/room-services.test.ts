// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Errors
import { NotFoundError } from '@errors/index'

// Services
import { getRoom } from '../../src/services/rooms/get-room.service'
import { getRooms } from '../../src/services/rooms/get-rooms.service'

// Selects
import { ROOM_SELECT } from '../../src/services/rooms/room-select'

jest.mock('@configs/index', () => ({
  prisma: {
    room: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}))

const findRoomsMock = jest.mocked(prisma.room.findMany)
const findRoomMock = jest.mocked(prisma.room.findUnique)

describe('room services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getRooms', () => {
    it('filters rooms by minimum capacity', async () => {
      findRoomsMock.mockResolvedValue([])

      await getRooms(8)

      expect(findRoomsMock).toHaveBeenCalledWith({
        where: {
          capacity: {
            gte: 8,
          },
        },
        select: ROOM_SELECT,
        orderBy: {
          id: 'asc',
        },
      })
    })

    it('returns rooms from the database', async () => {
      const rooms = [
        {
          id: 1,
          name: 'Horizon',
          floor: 2,
          capacity: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      findRoomsMock.mockResolvedValue(rooms)

      await expect(getRooms(4)).resolves.toEqual(rooms)
    })
  })

  describe('getRoom', () => {
    it('returns the requested room', async () => {
      const room = {
        id: 3,
        name: 'Atlas',
        floor: 3,
        capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      findRoomMock.mockResolvedValue(room)

      await expect(getRoom(3)).resolves.toEqual(room)

      expect(findRoomMock).toHaveBeenCalledWith({
        where: {
          id: 3,
        },
        select: ROOM_SELECT,
      })
    })

    it('throws NotFoundError when the room does not exist', async () => {
      findRoomMock.mockResolvedValue(null)

      const promise = getRoom(999)

      await expect(promise).rejects.toBeInstanceOf(NotFoundError)
      await expect(promise).rejects.toThrow('Room not found')
    })
  })
})
