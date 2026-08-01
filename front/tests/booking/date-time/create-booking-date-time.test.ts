// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { createBookingDateTime } from '@features/booking/components/BookingForm/utils/booking-date-time.utils'

describe('createBookingDateTime', () => {
  it('returns an ISO string for valid input', () => {
    const result = createBookingDateTime('2030-06-15', '10:30')

    expect(result).toBe(new Date(2030, 5, 15, 10, 30, 0, 0).toISOString())
  })

  it('returns an ISO string for midnight', () => {
    const result = createBookingDateTime('2030-06-15', '00:00')

    expect(result).toBe(new Date(2030, 5, 15, 0, 0, 0, 0).toISOString())
  })

  it('throws for an invalid date', () => {
    expect(() => {
      createBookingDateTime('invalid-date', '10:30')
    }).toThrow('Invalid booking date or time')
  })

  it('throws for a non-existent calendar date', () => {
    expect(() => {
      createBookingDateTime('2030-02-30', '10:30')
    }).toThrow('Invalid booking date or time')
  })

  it('throws for an invalid time', () => {
    expect(() => {
      createBookingDateTime('2030-06-15', '25:00')
    }).toThrow('Invalid booking date or time')
  })

  it('throws for empty values', () => {
    expect(() => {
      createBookingDateTime('', '')
    }).toThrow('Invalid booking date or time')
  })
})
