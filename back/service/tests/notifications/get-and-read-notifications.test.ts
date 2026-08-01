// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Services
import { getUserNotifications } from '../../src/services/notifications/get-notifications.service'
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../../src/services/notifications/mark-notifications-read.service'

jest.mock('@configs/index', () => ({
  prisma: {
    notification: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}))

const notificationMock = prisma.notification

describe('notification reading services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the latest non-deleted user notifications', async () => {
    const notifications = [{ id: 3 }, { id: 2 }]

    jest.mocked(notificationMock.findMany).mockResolvedValue(notifications as never)

    await expect(getUserNotifications(7)).resolves.toEqual(notifications)

    expect(notificationMock.findMany).toHaveBeenCalledWith({
      where: {
        userId: 7,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
  })

  it('marks an unread owned notification as read', async () => {
    const updatedNotification = {
      id: 12,
      userId: 7,
      readAt: new Date(),
    }

    jest.mocked(notificationMock.findFirst).mockResolvedValue({
      id: 12,
      userId: 7,
      readAt: null,
    } as never)

    jest.mocked(notificationMock.update).mockResolvedValue(updatedNotification as never)

    await expect(markNotificationAsRead(12, 7)).resolves.toEqual(updatedNotification)

    expect(notificationMock.update).toHaveBeenCalledWith({
      where: {
        id: 12,
      },
      data: {
        readAt: expect.any(Date),
      },
    })
  })

  it('returns an already read notification without updating it', async () => {
    const notification = {
      id: 12,
      userId: 7,
      readAt: new Date(),
    }

    jest.mocked(notificationMock.findFirst).mockResolvedValue(notification as never)
    jest.mocked(notificationMock.findUniqueOrThrow).mockResolvedValue(notification as never)

    await expect(markNotificationAsRead(12, 7)).resolves.toEqual(notification)

    expect(notificationMock.update).not.toHaveBeenCalled()
    expect(notificationMock.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: 12,
      },
    })
  })

  it.each([
    {
      name: 'missing notification',
      notification: null,
      message: 'Notification not found',
    },
    {
      name: 'notification owned by another user',
      notification: {
        id: 12,
        userId: 5,
        readAt: null,
      },
      message: 'You can only update your own notifications',
    },
  ])('rejects $name', async ({ notification, message }) => {
    jest.mocked(notificationMock.findFirst).mockResolvedValue(notification as never)

    await expect(markNotificationAsRead(12, 7)).rejects.toThrow(message)

    expect(notificationMock.update).not.toHaveBeenCalled()
  })

  it('marks all unread user notifications as read', async () => {
    jest.mocked(notificationMock.updateMany).mockResolvedValue({
      count: 3,
    })

    const result = await markAllNotificationsAsRead(7)

    expect(notificationMock.updateMany).toHaveBeenCalledWith({
      where: {
        userId: 7,
        readAt: null,
        deletedAt: null,
      },
      data: {
        readAt: expect.any(Date),
      },
    })

    expect(result.readAt).toBeInstanceOf(Date)
  })
})
