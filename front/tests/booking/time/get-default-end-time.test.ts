// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { getDefaultEndTime } from '@features/booking/components/BookingForm/utils/booking-time.utils'

describe('getDefaultEndTime', () => {
  it('adds one 30-minute slot', () => {
    expect(getDefaultEndTime('09:00')).toBe('09:30')
  })

  it('handles crossing an hour boundary', () => {
    expect(getDefaultEndTime('09:45')).toBe('10:15')
  })

  it('wraps past midnight', () => {
    expect(getDefaultEndTime('23:45')).toBe('00:15')
  })

  it('returns the default time for invalid input', () => {
    expect(getDefaultEndTime('invalid')).toBe('09:30')
  })

  it('returns the default time for empty input', () => {
    expect(getDefaultEndTime('')).toBe('09:30')
  })
})
