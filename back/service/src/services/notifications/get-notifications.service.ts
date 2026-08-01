// Configs
import { prisma } from '@configs/index'

const NOTIFICATIONS_LIMIT = 50

export const getUserNotifications = async (userId: number) => {
  return prisma.notification.findMany({
    where: {
      userId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: 'desc',
    },

    take: NOTIFICATIONS_LIMIT,
  })
}
