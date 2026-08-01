// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Errors
import { NotFoundError } from '@errors/index'

// Services
import { getRoomAvailability } from '@services/rooms/get-room-availability.service'

jest.mock('@configs/index', () => ({
  prisma: {
    room: {
      findUnique: jest.fn(),
    },
    booking: {
      findMany: jest.fn(),
    },
  },
}))

const ROOM_ID = 3
const FROM_DATE = new Date('2026-08-03T06:00:00.000Z')
const TO_DATE = new Date('2026-08-10T06:00:00.000Z')

const findRoomMock = jest.mocked(prisma.room.findUnique)
const findBookingsMock = jest.mocked(prisma.booking.findMany)

describe('getRoomAvailability', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws NotFoundError when the room does not exist', async () => {
    findRoomMock.mockResolvedValue(null)

    const promise = getRoomAvailability(ROOM_ID, FROM_DATE, TO_DATE)

    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toMatchObject({
      statusCode: 404,
      message: 'Room not found',
    })

    expect(findBookingsMock).not.toHaveBeenCalled()
  })

  it('requests bookings intersecting the selected period', async () => {
    findRoomMock.mockResolvedValue({
      id: ROOM_ID,
    } as never)

    findBookingsMock.mockResolvedValue([])

    await getRoomAvailability(ROOM_ID, FROM_DATE, TO_DATE)

    expect(findRoomMock).toHaveBeenCalledWith({
      where: {
        id: ROOM_ID,
      },
      select: {
        id: true,
      },
    })

    expect(findBookingsMock).toHaveBeenCalledWith({
      where: {
        roomId: ROOM_ID,
        startTime: {
          lt: TO_DATE,
        },
        endTime: {
          gt: FROM_DATE,
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
  })

  it('returns bookings received from the database', async () => {
    const bookings = [
      {
        id: 12,
        title: 'Product planning',
        startTime: new Date('2026-08-03T07:00:00.000Z'),
        endTime: new Date('2026-08-03T08:00:00.000Z'),
        seriesId: null,
        user: {
          id: 7,
          name: 'Olena Koval',
        },
      },
      {
        id: 15,
        title: 'Weekly sync',
        startTime: new Date('2026-08-04T09:00:00.000Z'),
        endTime: new Date('2026-08-04T09:30:00.000Z'),
        seriesId: 4,
        user: {
          id: 9,
          name: 'Maksym Bondar',
        },
      },
    ]

    findRoomMock.mockResolvedValue({
      id: ROOM_ID,
    } as never)

    findBookingsMock.mockResolvedValue(bookings as never)

    await expect(getRoomAvailability(ROOM_ID, FROM_DATE, TO_DATE)).resolves.toEqual(bookings)
  })

  it('propagates an unexpected database error', async () => {
    const databaseError = new Error('Database connection failed')

    findRoomMock.mockResolvedValue({
      id: ROOM_ID,
    } as never)

    findBookingsMock.mockRejectedValue(databaseError)

    await expect(getRoomAvailability(ROOM_ID, FROM_DATE, TO_DATE)).rejects.toBe(databaseError)
  })
})
