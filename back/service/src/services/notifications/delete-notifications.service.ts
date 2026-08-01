// Configs
import { prisma } from '@configs/index'

const ensureNotificationOwnership = async (
  notificationId: number,
  userId: number,
): Promise<void> => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      deletedAt: null,
    },

    select: {
      userId: true,
    },
  })

  if (!notification) {
    throw new Error('Notification not found')
  }

  if (notification.userId !== userId) {
    throw new Error('You can only delete your own notifications')
  }
}

export const deleteNotification = async (notificationId: number, userId: number): Promise<void> => {
  await ensureNotificationOwnership(notificationId, userId)

  await prisma.notification.update({
    where: {
      id: notificationId,
    },

    data: {
      deletedAt: new Date(),
    },
  })
}

export const deleteAllNotifications = async (userId: number): Promise<void> => {
  await prisma.notification.updateMany({
    where: {
      userId,
      deletedAt: null,
    },

    data: {
      deletedAt: new Date(),
    },
  })
}
