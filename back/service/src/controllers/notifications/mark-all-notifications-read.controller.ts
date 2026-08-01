// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { markAllNotificationsAsRead } from '@services/notifications'

export const markAllNotificationsReadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { user } = req as AuthRequest

    const result = await markAllNotificationsAsRead(user.id)

    return res.status(200).json(result)
  } catch (error: unknown) {
    next(error)
  }
}
