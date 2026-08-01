// Modules
import { z } from 'zod'

const BOOKING_TITLE_MAX_LENGTH = 100
const MIN_RECURRENCE_COUNT = 2
const MAX_RECURRENCE_COUNT = 52

const recurrenceSchema = z.object({
  frequency: z.literal('weekly'),

  count: z
    .number({
      message: 'Recurrence count must be a number',
    })
    .int('Recurrence count must be an integer')
    .min(MIN_RECURRENCE_COUNT, `Recurrence count must be at least ${MIN_RECURRENCE_COUNT}`)
    .max(MAX_RECURRENCE_COUNT, `Recurrence count must not exceed ${MAX_RECURRENCE_COUNT}`),
})

export const createBookingSchema = z.object({
  roomId: z
    .number({
      message: 'Room id must be a number',
    })
    .int('Room id must be an integer')
    .positive('Room id must be positive'),

  title: z
    .string({
      message: 'Title is required',
    })
    .trim()
    .min(1, 'Title is required')
    .max(BOOKING_TITLE_MAX_LENGTH, `Title must not exceed ${BOOKING_TITLE_MAX_LENGTH} characters`),

  startTime: z
    .string({
      message: 'Start time is required',
    })
    .datetime({
      message: 'Invalid start time',
    }),

  endTime: z
    .string({
      message: 'End time is required',
    })
    .datetime({
      message: 'Invalid end time',
    }),

  recurrence: recurrenceSchema.optional(),
})

export type CreateBookingBody = z.infer<typeof createBookingSchema>
export type BookingRecurrence = z.infer<typeof recurrenceSchema>
