// Types
import type { NextFunction, Request, Response } from 'express'

// Errors
import { BadRequestError } from '@errors/index'

// Services
import { getRoom } from '@services/rooms'

// Helpers
import { parseRoomId } from './room-controller.helpers'

export const getRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const roomId = parseRoomId(req.params.roomId)

    if (roomId === null) {
      throw new BadRequestError('Invalid room id')
    }

    const room = await getRoom(roomId)

    res.status(200).json(room)
  } catch (error: unknown) {
    next(error)
  }
}