// Services
import { roomsService } from '@services/rooms.service'

// Types
import { NextFunction, Request, Response } from 'express'

export const roomsController = {
  getRoomsList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await roomsService.getRoomsList()

      return res.status(200).json(rooms)
    } catch (err: unknown) {
      next(err)
    }
  },

  getRoomData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = Number(req.params.roomId)

      if (!Number.isInteger(roomId) || roomId <= 0) {
        return res.status(400).json({
          message: 'Invalid room id',
        })
      }

      const room = await roomsService.getRoomData(roomId)

      return res.status(200).json(room)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Room not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  getRoomAvailability: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = Number(req.params.roomId)
      const from = String(req.query.from ?? '')
      const to = String(req.query.to ?? '')

      if (!Number.isInteger(roomId) || roomId <= 0) {
        return res.status(400).json({
          message: 'Invalid room id',
        })
      }

      const fromDate = new Date(from)
      const toDate = new Date(to)

      if (
        Number.isNaN(fromDate.getTime()) ||
        Number.isNaN(toDate.getTime()) ||
        fromDate >= toDate
      ) {
        return res.status(400).json({
          message: 'Invalid date range',
        })
      }

      const bookings = await roomsService.getRoomAvailability(roomId, fromDate, toDate)

      return res.status(200).json(bookings)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Room not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      next(err)
    }
  },
}
