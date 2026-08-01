// Types
import type { NextFunction, Request, Response } from 'express'

// Errors
import { BadRequestError } from '@errors/index'

// Services
import { getRoomAvailability } from '@services/rooms'

// Helpers
import { parseDateRange, parseRoomId } from './room-controller.helpers'

export const getRoomAvailabilityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const roomId = parseRoomId(req.params.roomId)

    if (roomId === null) {
      throw new BadRequestError('Invalid room id')
    }

    const dateRange = parseDateRange(req.query.from, req.query.to)

    if (!dateRange) {
      throw new BadRequestError('Invalid date range')
    }

    const bookings = await getRoomAvailability(roomId, dateRange.fromDate, dateRange.toDate)

    res.status(200).json(bookings)
  } catch (error: unknown) {
    next(error)
  }
}
