// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { deleteAllNotifications } from '@services/notifications'

export const deleteAllNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { user } = req as AuthRequest

    await deleteAllNotifications(user.id)

    return res.status(204).send()
  } catch (error: unknown) {
    next(error)
  }
}
