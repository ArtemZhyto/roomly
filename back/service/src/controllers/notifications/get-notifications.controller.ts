// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { getUserNotifications } from '@services/notifications'

export const getNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { user } = req as AuthRequest

    const notifications = await getUserNotifications(user.id)

    return res.status(200).json(notifications)
  } catch (error: unknown) {
    next(error)
  }
}
