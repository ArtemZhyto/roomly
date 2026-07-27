// Types
import { NextFunction, Request, Response } from 'express'

// Interfaces
import { AuthRequest } from '@ts/interfaces/auth'

// Services
import { notificationsService } from '@services/notifications.service'

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
      const notificationId = Number(req.params.notificationId)
      const { user } = req as AuthRequest

      if (!Number.isInteger(notificationId) || notificationId <= 0) {
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
}
