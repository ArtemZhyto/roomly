// Configs
import { prisma } from '@configs/index'

const findOwnedNotification = async (notificationId: number, userId: number) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      deletedAt: null,
    },

    select: {
      id: true,
      userId: true,
      readAt: true,
    },
  })

  if (!notification) {
    throw new Error('Notification not found')
  }

  if (notification.userId !== userId) {
    throw new Error('You can only update your own notifications')
  }

  return notification
}

export const markNotificationAsRead = async (notificationId: number, userId: number) => {
  const notification = await findOwnedNotification(notificationId, userId)

  if (notification.readAt) {
    return prisma.notification.findUniqueOrThrow({
      where: {
        id: notification.id,
      },
    })
  }

  return prisma.notification.update({
    where: {
      id: notification.id,
    },

    data: {
      readAt: new Date(),
    },
  })
}

export const markAllNotificationsAsRead = async (userId: number) => {
  const readAt = new Date()

  await prisma.notification.updateMany({
    where: {
      userId,
      readAt: null,
      deletedAt: null,
    },

    data: {
      readAt,
    },
  })

  return {
    readAt,
  }
}
