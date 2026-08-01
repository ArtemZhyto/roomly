// Types
import type { NextFunction, Request, Response } from 'express'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Services
import { getUserBookings } from '@services/bookings'

// Helpers
import { isValidPaginationLimit, parsePositiveInteger } from './booking-controller.helpers'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export const getUserBookingsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { user } = req as AuthRequest

    const upcomingPage = parsePositiveInteger(req.query.upcomingPage, DEFAULT_PAGE)
    const upcomingLimit = parsePositiveInteger(req.query.upcomingLimit, DEFAULT_LIMIT)

    const pastPage = parsePositiveInteger(req.query.pastPage, DEFAULT_PAGE)
    const pastLimit = parsePositiveInteger(req.query.pastLimit, DEFAULT_LIMIT)

    if (upcomingPage === null) {
      return res.status(400).json({
        message: 'Invalid upcoming page',
      })
    }

    if (upcomingLimit === null || !isValidPaginationLimit(upcomingLimit)) {
      return res.status(400).json({
        message: 'Invalid upcoming limit',
      })
    }

    if (pastPage === null) {
      return res.status(400).json({
        message: 'Invalid past page',
      })
    }

    if (pastLimit === null || !isValidPaginationLimit(pastLimit)) {
      return res.status(400).json({
        message: 'Invalid past limit',
      })
    }

    const bookings = await getUserBookings({
      userId: user.id,

      upcoming: {
        page: upcomingPage,
        limit: upcomingLimit,
      },

      past: {
        page: pastPage,
        limit: pastLimit,
      },
    })

    return res.status(200).json(bookings)
  } catch (error: unknown) {
    next(error)
  }
}
