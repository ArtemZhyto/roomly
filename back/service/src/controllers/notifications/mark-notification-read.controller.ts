// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { markNotificationAsRead } from '@services/notifications'

// Helpers
import { parseNotificationId } from './notification-controller.helpers'

export const markNotificationReadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const notificationId = parseNotificationId(req.params.notificationId)

    if (notificationId === null) {
      return res.status(400).json({
        message: 'Invalid notification id',
      })
    }

    const { user } = req as AuthRequest

    const notification = await markNotificationAsRead(notificationId, user.id)

    return res.status(200).json(notification)
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return next(error)
    }

    if (error.message === 'Notification not found') {
      return res.status(404).json({
        message: error.message,
      })
    }

    if (error.message === 'You can only update your own notifications') {
      return res.status(403).json({
        message: error.message,
      })
    }

    next(error)
  }
}
