// Modules
import { z } from 'zod'

export const createBookingSchema = z.object({
  roomId: z.number({ message: 'Room id must be a number' }).int().positive(),
  title: z
    .string({ message: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters'),
  startTime: z
    .string({ message: 'Start time is required' })
    .datetime({ message: 'Invalid start time' }),
  endTime: z.string({ message: 'End time is required' }).datetime({ message: 'Invalid end time' }),
})
