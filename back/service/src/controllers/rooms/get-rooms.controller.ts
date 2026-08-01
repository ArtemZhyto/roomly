// Types
import type { NextFunction, Request, Response } from 'express'

// Errors
import { BadRequestError } from '@errors/index'

// Services
import { getRooms } from '@services/rooms'

// Helpers
import { parseMinCapacity } from './room-controller.helpers'

export const getRoomsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const minCapacity = parseMinCapacity(req.query.minCapacity)

    if (minCapacity === null) {
      throw new BadRequestError('Invalid minimum capacity')
    }

    const rooms = await getRooms(minCapacity)

    res.status(200).json(rooms)
  } catch (error: unknown) {
    next(error)
  }
}
