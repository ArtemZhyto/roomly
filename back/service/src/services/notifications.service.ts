// Configs
import __PRISMA from '@configs/config'

// Modules
import { Prisma } from '../../prisma/generated/client'

// Sockets
import { getSocketServer } from '@sockets/socket'

const notifyBeforeMinutes = Number(process.env.NOTIFY_BEFORE_MINUTES ?? 10)

if (!Number.isInteger(notifyBeforeMinutes) || notifyBeforeMinutes < 1) {
  throw new Error('NOTIFY_BEFORE_MINUTES is not configured correctly')
}

export const notificationsService = {
  processDueNotifications: async (): Promise<void> => {
    const now = new Date()

    const notificationThreshold = new Date(now.getTime() + notifyBeforeMinutes * 60_000)

    const currentBookings = await __PRISMA.booking.findMany({
      where: {
        endTime: {
          gt: now,
          lte: notificationThreshold,
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

    for (const currentBooking of currentBookings) {
      const nextBooking = await __PRISMA.booking.findFirst({
        where: {
          roomId: currentBooking.roomId,
          startTime: currentBooking.endTime,
          userId: {
            not: currentBooking.userId,
          },
        },
        select: {
          id: true,
          title: true,
          userId: true,
        },
      })

      if (!nextBooking) {
        continue
      }

      try {
        const notification = await __PRISMA.notification.create({
          data: {
            userId: currentBooking.userId,
            currentBookingId: currentBooking.id,
            nextBookingId: nextBooking.id,
            message:
              `Your booking "${currentBooking.title}" in ` +
              `${currentBooking.room.name} ends in ${notifyBeforeMinutes} minutes. ` +
              'The room is booked immediately afterwards.',
          },
        })

        getSocketServer().to(`user:${currentBooking.userId}`).emit('notification:new', notification)
      } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          continue
        }

        throw err
      }
    }
  },

  getUserNotifications: async (userId: number) => {
    return __PRISMA.notification.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
  },

  markNotificationAsRead: async (notificationId: number, userId: number) => {
    const notification = await __PRISMA.notification.findFirst({
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

    if (notification.readAt) {
      return __PRISMA.notification.findUniqueOrThrow({
        where: {
          id: notificationId,
        },
      })
    }

    return __PRISMA.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        readAt: new Date(),
      },
    })
  },

  markAllNotificationsAsRead: async (userId: number) => {
    const readAt = new Date()

    await __PRISMA.notification.updateMany({
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
  },

  deleteNotification: async (notificationId: number, userId: number): Promise<void> => {
    const notification = await __PRISMA.notification.findFirst({
      where: {
        id: notificationId,
        deletedAt: null,
      },
      select: {
        id: true,
        userId: true,
      },
    })

    if (!notification) {
      throw new Error('Notification not found')
    }

    if (notification.userId !== userId) {
      throw new Error('You can only delete your own notifications')
    }

    await __PRISMA.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  },

  deleteAllNotifications: async (userId: number): Promise<void> => {
    await __PRISMA.notification.updateMany({
      where: {
        userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  },
}
