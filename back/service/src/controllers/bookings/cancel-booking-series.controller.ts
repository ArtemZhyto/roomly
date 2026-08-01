// Types
import type { NextFunction, Request, Response } from 'express'

// Errors
import { BadRequestError } from '@errors/index'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { cancelBookingSeries } from '@services/bookings'

// Helpers
import { parsePositiveInteger } from './booking-controller.helpers'

export const cancelBookingSeriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const seriesId = parsePositiveInteger(req.params.seriesId)

    if (seriesId === null) {
      throw new BadRequestError('Invalid booking series id')
    }

    const { user } = req as AuthRequest

    await cancelBookingSeries(seriesId, user.id)

    res.status(204).send()
  } catch (error: unknown) {
    next(error)
  }
}
