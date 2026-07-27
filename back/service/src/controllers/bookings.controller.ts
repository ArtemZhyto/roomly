// Types
import { NextFunction, Request, Response } from 'express'

// Interfaces
import { AuthRequest } from '@ts/interfaces/auth'

// Services
import { bookingsService } from '@services/bookings.service'

export const bookingsController = {
  getBookingsList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      const bookings = await bookingsService.getUserBookings(user.id)

      return res.status(200).json(bookings)
    } catch (err: unknown) {
      next(err)
    }
  },

  setBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest
      const { roomId, title, startTime, endTime } = req.body

      const booking = await bookingsService.createBooking({
        roomId,
        userId: user.id,
        title,
        startTime,
        endTime,
      })

      return res.status(201).json(booking)
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        return next(err)
      }

      if (err.message === 'Room not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      if (err.message === 'Room is already booked for this time') {
        return res.status(409).json({
          message: err.message,
        })
      }

      if (
        err.message === 'End time must be later than start time' ||
        err.message === 'Booking must be in the future' ||
        err.message === 'Booking duration must be between 30 minutes and 4 hours' ||
        err.message === 'Booking time must use 30-minute increments' ||
        err.message.startsWith('Booking must be within office hours')
      ) {
        return res.status(400).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  deleteBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = Number(req.params.bookingId)
      const { user } = req as AuthRequest

      if (!Number.isInteger(bookingId) || bookingId <= 0) {
        return res.status(400).json({
          message: 'Invalid booking id',
        })
      }

      await bookingsService.deleteBooking(bookingId, user.id)

      return res.status(204).send()
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        return next(err)
      }

      if (err.message === 'Booking not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      if (err.message === 'You can only cancel your own bookings') {
        return res.status(403).json({
          message: err.message,
        })
      }

      next(err)
    }
  },
}
