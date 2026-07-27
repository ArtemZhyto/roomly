// Modules
import { z } from 'zod'

const recurrenceSchema = z.object({
  frequency: z.literal('weekly'),
  count: z
    .number()
    .int('Recurrence count must be an integer')
    .min(2, 'Recurrence count must be at least 2')
    .max(52, 'Recurrence count must not exceed 52'),
})

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
  recurrence: recurrenceSchema.optional(),
})
