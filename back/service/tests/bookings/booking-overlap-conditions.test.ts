// Modules
import { describe, expect, it } from '@jest/globals'

// Helpers
import { createBookingOverlapConditions } from '@services/bookings/booking-overlap-conditions'

// Types
import type { BookingOccurrence } from '@services/bookings/booking.types'

const createOccurrence = (startTime: string, endTime: string): BookingOccurrence => ({
  startDate: new Date(startTime),
  endDate: new Date(endTime),
})

describe('createBookingOverlapConditions', () => {
  it('creates an overlap condition for each occurrence', () => {
    const firstOccurrence = createOccurrence('2026-08-03T08:00:00.000Z', '2026-08-03T09:00:00.000Z')

    const secondOccurrence = createOccurrence(
      '2026-08-10T08:00:00.000Z',
      '2026-08-10T09:00:00.000Z',
    )

    expect(createBookingOverlapConditions([firstOccurrence, secondOccurrence])).toEqual([
      {
        startTime: {
          lt: firstOccurrence.endDate,
        },
        endTime: {
          gt: firstOccurrence.startDate,
        },
      },

      {
        startTime: {
          lt: secondOccurrence.endDate,
        },
        endTime: {
          gt: secondOccurrence.startDate,
        },
      },
    ])
  })

  it('returns an empty array for an empty occurrence list', () => {
    expect(createBookingOverlapConditions([])).toEqual([])
  })
})
