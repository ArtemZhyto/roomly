// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { getDurationMinutes } from '@features/booking/components/BookingForm/utils/booking-duration.utils'

describe('getDurationMinutes', () => {
  it('calculates a 30-minute duration', () => {
    expect(getDurationMinutes('09:00', '09:30')).toBe(30)
  })

  it('calculates a multi-hour duration', () => {
    expect(getDurationMinutes('09:00', '13:00')).toBe(240)
  })

  it('returns zero for an invalid start time', () => {
    expect(getDurationMinutes('invalid', '10:00')).toBe(0)
  })

  it('returns zero for an invalid end time', () => {
    expect(getDurationMinutes('09:00', 'invalid')).toBe(0)
  })

  it('returns a negative duration when the end is earlier', () => {
    expect(getDurationMinutes('10:00', '09:00')).toBe(-60)
  })

  it('returns zero for equal times', () => {
    expect(getDurationMinutes('10:00', '10:00')).toBe(0)
  })
})
