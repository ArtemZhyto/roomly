// Helpers
import { createBookingSchema } from '@helpers/bookingsSchema'

// Types
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const bookingsMiddleware = {
  createBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await createBookingSchema.parseAsync(req.body)

      next()
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.flatten().fieldErrors,
        })
      }

      next(err)
    }
  },
}
