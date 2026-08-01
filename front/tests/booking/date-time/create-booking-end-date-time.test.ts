// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { createBookingEndDateTime } from '@features/booking/components/BookingForm/utils/booking-date-time.utils'

describe('createBookingEndDateTime', () => {
  it('returns the end time as an ISO string', () => {
    const result = createBookingEndDateTime('2030-06-15', '10:00', '11:30')

    expect(result).toBe(new Date(2030, 5, 15, 11, 30, 0, 0).toISOString())
  })

  it('accepts a 30-minute duration', () => {
    const result = createBookingEndDateTime('2030-06-15', '10:00', '10:30')

    expect(result).toBe(new Date(2030, 5, 15, 10, 30, 0, 0).toISOString())
  })

  it('throws for an invalid start time', () => {
    expect(() => {
      createBookingEndDateTime('2030-06-15', 'invalid', '11:30')
    }).toThrow('Invalid booking date or time')
  })

  it('throws for an invalid end time', () => {
    expect(() => {
      createBookingEndDateTime('2030-06-15', '10:00', 'invalid')
    }).toThrow('Invalid booking date or time')
  })

  it('throws for an invalid date', () => {
    expect(() => {
      createBookingEndDateTime('invalid-date', '10:00', '11:00')
    }).toThrow('Invalid booking date or time')
  })

  it('throws when start and end times are equal', () => {
    expect(() => {
      createBookingEndDateTime('2030-06-15', '10:00', '10:00')
    }).toThrow('Booking end time must be later than start time')
  })

  it('throws when the end time is earlier', () => {
    expect(() => {
      createBookingEndDateTime('2030-06-15', '11:00', '10:00')
    }).toThrow('Booking end time must be later than start time')
  })

  it('does not treat the end time as the following day', () => {
    expect(() => {
      createBookingEndDateTime('2030-06-15', '23:30', '00:30')
    }).toThrow('Booking end time must be later than start time')
  })
})
