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

const getFirstErrorMessage = (data: unknown): string | undefined => {
  const result = createBookingSchema.safeParse(data)

  if (result.success) {
    return undefined
  }

  return result.error.issues[0]?.message
}

describe('createBookingSchema', () => {
  it('accepts a valid booking', () => {
    const result = createBookingSchema.safeParse(VALID_BOOKING)

    expect(result.success).toBe(true)
  })

  describe('roomId', () => {
    it.each([
      {
        name: 'a string room id',
        roomId: '1',
        expectedMessage: 'Room id must be a number',
      },
      {
        name: 'a decimal room id',
        roomId: 1.5,
        expectedMessage: 'Room id must be an integer',
      },
      {
        name: 'a zero room id',
        roomId: 0,
        expectedMessage: 'Room id must be positive',
      },
      {
        name: 'a negative room id',
        roomId: -1,
        expectedMessage: 'Room id must be positive',
      },
    ])('rejects $name', ({ roomId, expectedMessage }) => {
      expect(
        getFirstErrorMessage({
          ...VALID_BOOKING,
          roomId,
        }),
      ).toBe(expectedMessage)
    })
  })

  describe('title', () => {
    it('trims surrounding whitespace', () => {
      const result = createBookingSchema.safeParse({
        ...VALID_BOOKING,
        title: '  Weekly planning  ',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.title).toBe('Weekly planning')
      }
    })

    it.each([
      {
        name: 'an empty title',
        title: '',
      },
      {
        name: 'a whitespace-only title',
        title: '   ',
      },
    ])('rejects $name', ({ title }) => {
      expect(
        getFirstErrorMessage({
          ...VALID_BOOKING,
          title,
        }),
      ).toBe('Title is required')
    })

    it('accepts a title containing exactly 100 characters', () => {
      const result = createBookingSchema.safeParse({
        ...VALID_BOOKING,
        title: 'a'.repeat(100),
      })

      expect(result.success).toBe(true)
    })

    it('rejects a title containing more than 100 characters', () => {
      expect(
        getFirstErrorMessage({
          ...VALID_BOOKING,
          title: 'a'.repeat(101),
        }),
      ).toBe('Title must not exceed 100 characters')
    })
  })

  describe('booking dates', () => {
    it.each([
      {
        name: 'a missing start time',
        booking: {
          ...VALID_BOOKING,
          startTime: undefined,
        },
        expectedMessage: 'Start time is required',
      },
      {
        name: 'an invalid start time',
        booking: {
          ...VALID_BOOKING,
          startTime: 'not-a-date',
        },
        expectedMessage: 'Invalid start time',
      },
      {
        name: 'a missing end time',
        booking: {
          ...VALID_BOOKING,
          endTime: undefined,
        },
        expectedMessage: 'End time is required',
      },
      {
        name: 'an invalid end time',
        booking: {
          ...VALID_BOOKING,
          endTime: 'not-a-date',
        },
        expectedMessage: 'Invalid end time',
      },
    ])('rejects $name', ({ booking, expectedMessage }) => {
      expect(getFirstErrorMessage(booking)).toBe(expectedMessage)
    })
  })

  it('rejects unknown recurrence frequency', () => {
    expect(
      getFirstErrorMessage({
        ...VALID_BOOKING,
        recurrence: {
          frequency: 'daily',
          count: 4,
        },
      }),
    ).toBe('Invalid input: expected "weekly"')
  })
})
