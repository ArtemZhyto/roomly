// Modules
import { describe, expect, it } from '@jest/globals'

// Helpers
import { doBookingIntervalsOverlap, type BookingInterval } from '@services/bookings/booking-overlap'

const createInterval = (startTime: string, endTime: string): BookingInterval => ({
  startDate: new Date(startTime),
  endDate: new Date(endTime),
})

describe('doBookingIntervalsOverlap', () => {
  it.each([
    {
      name: 'bookings touching at the boundary',
      firstInterval: createInterval('2026-08-03T08:00:00.000Z', '2026-08-03T09:00:00.000Z'),
      secondInterval: createInterval('2026-08-03T09:00:00.000Z', '2026-08-03T10:00:00.000Z'),
      expectedResult: false,
    },
    {
      name: 'partially overlapping bookings',
      firstInterval: createInterval('2026-08-03T08:00:00.000Z', '2026-08-03T10:00:00.000Z'),
      secondInterval: createInterval('2026-08-03T09:30:00.000Z', '2026-08-03T10:30:00.000Z'),
      expectedResult: true,
    },
    {
      name: 'exactly matching bookings',
      firstInterval: createInterval('2026-08-03T08:00:00.000Z', '2026-08-03T10:00:00.000Z'),
      secondInterval: createInterval('2026-08-03T08:00:00.000Z', '2026-08-03T10:00:00.000Z'),
      expectedResult: true,
    },
    {
      name: 'bookings on adjacent days',
      firstInterval: createInterval('2026-08-03T08:00:00.000Z', '2026-08-03T09:00:00.000Z'),
      secondInterval: createInterval('2026-08-04T08:00:00.000Z', '2026-08-04T09:00:00.000Z'),
      expectedResult: false,
    },
  ])('$name: returns $expectedResult', ({ firstInterval, secondInterval, expectedResult }) => {
    expect(doBookingIntervalsOverlap(firstInterval, secondInterval)).toBe(expectedResult)
  })
})
