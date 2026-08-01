// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { createBooking } from '@services/bookings'

// Validation types
import type { CreateBookingBody } from '@validation/bookings'

export const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req as AuthRequest

    const data = req.body as CreateBookingBody

    const booking = await createBooking({
      ...data,
      userId: user.id,
    })

    res.status(201).json(booking)
  } catch (error: unknown) {
    next(error)
  }
}
