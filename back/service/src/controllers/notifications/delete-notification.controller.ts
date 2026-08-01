// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { deleteNotification } from '@services/notifications'

// Helpers
import { parseNotificationId } from './notification-controller.helpers'

export const deleteNotificationController = async (
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

    await deleteNotification(notificationId, user.id)

    return res.status(204).send()
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return next(error)
    }

    if (error.message === 'Notification not found') {
      return res.status(404).json({
        message: error.message,
      })
    }

    if (error.message === 'You can only delete your own notifications') {
      return res.status(403).json({
        message: error.message,
      })
    }

    next(error)
  }
}
