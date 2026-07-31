// Types
import { NextFunction, Request, Response } from 'express'

// Interfaces
import { AuthRequest } from '@ts/interfaces/auth'

// Services
import { notificationsService } from '@services/notifications.service'

const parseNotificationId = (value: string | string[] | undefined): number | null => {
  if (typeof value !== 'string') {
    return null
  }

  const notificationId = Number(value)

  if (!Number.isInteger(notificationId) || notificationId <= 0) {
    return null
  }

  return notificationId
}

export const notificationsController = {
  getNotifications: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      const notifications = await notificationsService.getUserNotifications(user.id)

      return res.status(200).json(notifications)
    } catch (err: unknown) {
      next(err)
    }
  },

  markAsRead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = parseNotificationId(req.params.notificationId)

      const { user } = req as AuthRequest

      if (!notificationId) {
        return res.status(400).json({
          message: 'Invalid notification id',
        })
      }

      const notification = await notificationsService.markNotificationAsRead(
        notificationId,
        user.id,
      )

      return res.status(200).json(notification)
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        return next(err)
      }

      if (err.message === 'Notification not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      if (err.message === 'You can only update your own notifications') {
        return res.status(403).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  markAllAsRead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      const result = await notificationsService.markAllNotificationsAsRead(user.id)

      return res.status(200).json(result)
    } catch (err: unknown) {
      next(err)
    }
  },

  deleteNotification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = parseNotificationId(req.params.notificationId)

      const { user } = req as AuthRequest

      if (!notificationId) {
        return res.status(400).json({
          message: 'Invalid notification id',
        })
      }

      await notificationsService.deleteNotification(notificationId, user.id)

      return res.status(204).send()
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        return next(err)
      }

      if (err.message === 'Notification not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      if (err.message === 'You can only delete your own notifications') {
        return res.status(403).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  deleteAllNotifications: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      await notificationsService.deleteAllNotifications(user.id)

      return res.status(204).send()
    } catch (err: unknown) {
      next(err)
    }
  },
}
