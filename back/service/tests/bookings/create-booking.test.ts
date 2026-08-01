// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Errors
import { ConflictError, ForbiddenError, NotFoundError } from '@errors/index'

// Services
import { createBookingOccurrences } from '../../src/services/bookings/booking-occurrences'
import { createBooking } from '../../src/services/bookings/create-booking.service'

// Types
import type { CreateBookingInput } from '../../src/services/bookings/booking.types'

jest.mock('@configs/index', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    room: {
      findUnique: jest.fn(),
    },
    booking: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },

    $transaction: jest.fn(),
  },
}))

jest.mock('../../src/services/bookings/booking-occurrences', () => ({
  createBookingOccurrences: jest.fn(),
}))

const START_DATE = new Date('2026-08-03T07:00:00.000Z')
const END_DATE = new Date('2026-08-03T08:00:00.000Z')

const INPUT: CreateBookingInput = {
  userId: 7,
  roomId: 3,
  title: 'Product planning',
  startTime: START_DATE.toISOString(),
  endTime: END_DATE.toISOString(),
}

const findUserMock = jest.mocked(prisma.user.findUnique)
const findRoomMock = jest.mocked(prisma.room.findUnique)
const findConflictMock = jest.mocked(prisma.booking.findFirst)
const createMock = jest.mocked(prisma.booking.create)
const createOccurrencesMock = jest.mocked(createBookingOccurrences)

const mockValidState = (): void => {
  findUserMock.mockResolvedValue({
    emailVerifiedAt: new Date(),
  } as never)

  findRoomMock.mockResolvedValue({
    id: INPUT.roomId,
  } as never)

  findConflictMock.mockResolvedValue(null)

  createOccurrencesMock.mockReturnValue([
    {
      startDate: START_DATE,
      endDate: END_DATE,
    },
  ])
}

describe('createBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockValidState()
  })

  it.each([
    {
      name: 'missing user',
      arrange: () => findUserMock.mockResolvedValue(null),
      error: NotFoundError,
      message: 'User not found',
    },
    {
      name: 'unverified user',
      arrange: () =>
        findUserMock.mockResolvedValue({
          emailVerifiedAt: null,
        } as never),
      error: ForbiddenError,
      message: 'Email must be verified before booking',
    },
    {
      name: 'missing room',
      arrange: () => findRoomMock.mockResolvedValue(null),
      error: NotFoundError,
      message: 'Room not found',
    },
    {
      name: 'occupied slot',
      arrange: () =>
        findConflictMock.mockResolvedValue({
          id: 25,
        } as never),
      error: ConflictError,
      message: 'Room is already booked for this time',
    },
  ])('rejects $name', async ({ arrange, error, message }) => {
    arrange()

    const promise = createBooking(INPUT)

    await expect(promise).rejects.toBeInstanceOf(error)
    await expect(promise).rejects.toThrow(message)
    expect(createMock).not.toHaveBeenCalled()
  })

  it('creates a single booking', async () => {
    const booking = {
      id: 40,
      userId: INPUT.userId,
      roomId: INPUT.roomId,
      title: INPUT.title,
      startTime: START_DATE,
      endTime: END_DATE,
      seriesId: null,
    }

    createMock.mockResolvedValue(booking as never)

    await expect(createBooking(INPUT)).resolves.toEqual(booking)

    expect(createOccurrencesMock).toHaveBeenCalledWith({
      startTime: INPUT.startTime,
      endTime: INPUT.endTime,
      occurrenceCount: 1,
    })

    expect(createMock).toHaveBeenCalledWith({
      data: {
        userId: INPUT.userId,
        roomId: INPUT.roomId,
        title: INPUT.title,
        startTime: START_DATE,
        endTime: END_DATE,
      },
    })
  })
})
