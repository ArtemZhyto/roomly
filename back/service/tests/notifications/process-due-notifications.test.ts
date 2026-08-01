// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Services
import { processDueNotifications } from '../../src/services/notifications/process-due-notifications.service'

// Sockets
import { getSocketServer, getUserRoomName } from '@sockets/socket'

jest.mock('@configs/index', () => ({
  env: {
    notifyBeforeMinutes: 10,
  },
  prisma: {
    booking: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@sockets/socket', () => ({
  getSocketServer: jest.fn(),
  getUserRoomName: jest.fn((userId: number) => `user:${userId}`),
}))

const CURRENT_DATE = new Date('2026-08-03T09:00:00.000Z')

const CURRENT_BOOKING = {
  id: 15,
  title: 'Product planning',
  roomId: 3,
  userId: 7,
  endTime: new Date('2026-08-03T09:10:00.000Z'),
  room: {
    name: 'Atlas',
  },
}

const findDueBookingsMock = jest.mocked(prisma.booking.findMany)
const findNextBookingMock = jest.mocked(prisma.booking.findFirst)
const createNotificationMock = jest.mocked(prisma.notification.create)
const getSocketServerMock = jest.mocked(getSocketServer)
const getUserRoomNameMock = jest.mocked(getUserRoomName)

const emitMock = jest.fn()
const toMock = jest.fn((_roomName: string) => ({
  emit: emitMock,
}))

describe('processDueNotifications', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
    jest.clearAllMocks()

    getSocketServerMock.mockReturnValue({
      to: toMock,
    } as never)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('requests bookings ending within the notification window', async () => {
    findDueBookingsMock.mockResolvedValue([])

    await processDueNotifications()

    expect(findDueBookingsMock).toHaveBeenCalledWith({
      where: {
        endTime: {
          gt: CURRENT_DATE,
          lte: new Date('2026-08-03T09:10:00.000Z'),
        },
        currentBookingNotifications: {
          none: {},
        },
      },
      select: {
        id: true,
        title: true,
        roomId: true,
        userId: true,
        endTime: true,
        room: {
          select: {
            name: true,
          },
        },
      },
    })
  })

  it('does nothing when no booking follows immediately afterwards', async () => {
    findDueBookingsMock.mockResolvedValue([CURRENT_BOOKING] as never)
    findNextBookingMock.mockResolvedValue(null)

    await processDueNotifications()

    expect(findNextBookingMock).toHaveBeenCalledWith({
      where: {
        roomId: CURRENT_BOOKING.roomId,
        startTime: CURRENT_BOOKING.endTime,
      },
      select: {
        id: true,
      },
    })

    expect(createNotificationMock).not.toHaveBeenCalled()
    expect(emitMock).not.toHaveBeenCalled()
  })

  it('creates and emits a notification when another booking follows immediately', async () => {
    const notification = {
      id: 20,
      userId: CURRENT_BOOKING.userId,
      currentBookingId: CURRENT_BOOKING.id,
      nextBookingId: 16,
      message:
        'Your booking "Product planning" in Atlas ends in 10 minutes. ' +
        'The room is booked immediately afterwards.',
    }

    findDueBookingsMock.mockResolvedValue([CURRENT_BOOKING] as never)

    findNextBookingMock.mockResolvedValue({
      id: 16,
    } as never)

    createNotificationMock.mockResolvedValue(notification as never)

    await processDueNotifications()

    expect(createNotificationMock).toHaveBeenCalledWith({
      data: {
        userId: CURRENT_BOOKING.userId,
        currentBookingId: CURRENT_BOOKING.id,
        nextBookingId: 16,
        message: notification.message,
      },
    })

    expect(getUserRoomNameMock).toHaveBeenCalledWith(CURRENT_BOOKING.userId)
    expect(toMock).toHaveBeenCalledWith('user:7')
    expect(emitMock).toHaveBeenCalledWith('notification:new', notification)
  })

  it('processes every booking that is ending soon', async () => {
    const secondBooking = {
      ...CURRENT_BOOKING,
      id: 25,
      userId: 9,
      roomId: 4,
      room: {
        name: 'Horizon',
      },
    }

    findDueBookingsMock.mockResolvedValue([CURRENT_BOOKING, secondBooking] as never)
    findNextBookingMock.mockResolvedValueOnce(null).mockResolvedValueOnce(null)

    await processDueNotifications()

    expect(findNextBookingMock).toHaveBeenCalledTimes(2)
  })
})
