// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Services
import {
  deleteAllNotifications,
  deleteNotification,
} from '../../src/services/notifications/delete-notifications.service'

jest.mock('@configs/index', () => ({
  prisma: {
    notification: {
      findFirst: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}))

const notificationMock = prisma.notification

describe('notification deletion services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('soft-deletes an owned notification', async () => {
    jest.mocked(notificationMock.findFirst).mockResolvedValue({
      userId: 7,
    } as never)

    jest.mocked(notificationMock.update).mockResolvedValue({
      id: 12,
    } as never)

    await expect(deleteNotification(12, 7)).resolves.toBeUndefined()

    expect(notificationMock.update).toHaveBeenCalledWith({
      where: {
        id: 12,
      },
      data: {
        deletedAt: expect.any(Date),
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
        userId: 5,
      },
      message: 'You can only delete your own notifications',
    },
  ])('rejects $name', async ({ notification, message }) => {
    jest.mocked(notificationMock.findFirst).mockResolvedValue(notification as never)

    await expect(deleteNotification(12, 7)).rejects.toThrow(message)

    expect(notificationMock.update).not.toHaveBeenCalled()
  })

  it('soft-deletes all non-deleted user notifications', async () => {
    jest.mocked(notificationMock.updateMany).mockResolvedValue({
      count: 4,
    })

    await expect(deleteAllNotifications(7)).resolves.toBeUndefined()

    expect(notificationMock.updateMany).toHaveBeenCalledWith({
      where: {
        userId: 7,
        deletedAt: null,
      },

      data: {
        deletedAt: expect.any(Date),
      },
    })
  })
})
