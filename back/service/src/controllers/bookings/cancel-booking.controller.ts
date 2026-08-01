// Types
import type { NextFunction, Request, Response } from 'express'

// Errors
import { BadRequestError } from '@errors/index'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { cancelBooking } from '@services/bookings'

// Helpers
import { parsePositiveInteger } from './booking-controller.helpers'

export const cancelBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bookingId = parsePositiveInteger(req.params.bookingId)

    if (bookingId === null) {
      throw new BadRequestError('Invalid booking id')
    }

    const { user } = req as AuthRequest

    await cancelBooking(bookingId, user.id)

    res.status(204).send()
  } catch (error: unknown) {
    next(error)
  }
}
