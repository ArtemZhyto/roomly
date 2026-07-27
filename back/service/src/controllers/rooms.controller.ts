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

      const room = await __PRISMA.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
        },
      })

      if (!room) {
        return res.status(404).json({
          message: 'Room not found',
        })
      }

      const bookings = await __PRISMA.booking.findMany({
        where: {
          roomId,
          startTime: {
            lt: toDate,
          },
          endTime: {
            gt: fromDate,
          },
        },
        select: {
          id: true,
          title: true,
          startTime: true,
          endTime: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          startTime: 'asc',
        },
      })

      return res.status(200).json(bookings)
    } catch (err: unknown) {
      next(err)
    }
  },
}
