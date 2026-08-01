// Modules
import { describe, expect, it } from '@jest/globals'

// Validation
import { createBookingSchema } from '@validation/bookings/booking.schemas'

const VALID_BOOKING = {
  roomId: 1,
  title: 'Weekly planning',
  startTime: '2026-08-03T07:00:00.000Z',
  endTime: '2026-08-03T08:00:00.000Z',
}

const createBookingWithRecurrence = (count: unknown) => ({
  ...VALID_BOOKING,

  recurrence: {
    frequency: 'weekly',
    count,
  },
})

const getFirstErrorMessage = (data: unknown): string | undefined => {
  const result = createBookingSchema.safeParse(data)

  if (result.success) {
    return undefined
  }

  return result.error.issues[0]?.message
}

describe('createBookingSchema recurrence', () => {
  it('accepts a booking without recurrence', () => {
    const result = createBookingSchema.safeParse(VALID_BOOKING)

    expect(result.success).toBe(true)
  })

  it('accepts the minimum recurrence count', () => {
    const result = createBookingSchema.safeParse(createBookingWithRecurrence(2))

    expect(result.success).toBe(true)
  })

  it('accepts the maximum recurrence count', () => {
    const result = createBookingSchema.safeParse(createBookingWithRecurrence(52))

    expect(result.success).toBe(true)
  })

  it('rejects a recurrence count below the minimum', () => {
    expect(getFirstErrorMessage(createBookingWithRecurrence(1))).toBe(
      'Recurrence count must be at least 2',
    )
  })

  it('rejects a recurrence count above the maximum', () => {
    expect(getFirstErrorMessage(createBookingWithRecurrence(53))).toBe(
      'Recurrence count must not exceed 52',
    )
  })

  it('rejects a decimal recurrence count', () => {
    expect(getFirstErrorMessage(createBookingWithRecurrence(2.5))).toBe(
      'Recurrence count must be an integer',
    )
  })

  it('rejects a string recurrence count', () => {
    expect(getFirstErrorMessage(createBookingWithRecurrence('8'))).toBe(
      'Recurrence count must be a number',
    )
  })

  it('rejects recurrence without a count', () => {
    expect(
      getFirstErrorMessage({
        ...VALID_BOOKING,

        recurrence: {
          frequency: 'weekly',
        },
      }),
    ).toBe('Recurrence count must be a number')
  })
})
