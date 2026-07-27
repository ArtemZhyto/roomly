// Configs
import __PRISMA from '@configs/config'

// Types
import { NextFunction, Request, Response } from 'express'

export const roomsController = {
  getRoomsList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await __PRISMA.room.findMany({
        orderBy: {
          id: 'asc',
        },
      })

      return res.status(200).json(rooms)
    } catch (err: unknown) {
      next(err)
    }
  },

  getRoomData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.roomId)

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: 'Invalid room id',
        })
      }

      const room = await __PRISMA.room.findUnique({
        where: { id },
      })

      if (!room) {
        return res.status(404).json({
          message: 'Room not found',
        })
      }

      return res.status(200).json(room)
    } catch (err: unknown) {
      next(err)
    }
  },
}
