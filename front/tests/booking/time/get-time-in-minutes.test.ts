// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { getTimeInMinutes } from '@features/booking/components/BookingForm/utils/booking-time.utils'

describe('getTimeInMinutes', () => {
  it('converts midnight to zero minutes', () => {
    expect(getTimeInMinutes('00:00')).toBe(0)
  })

  it('converts a morning time to minutes', () => {
    expect(getTimeInMinutes('09:30')).toBe(570)
  })

  it('converts the final minute of the day', () => {
    expect(getTimeInMinutes('23:59')).toBe(1439)
  })

  it('returns null for an empty value', () => {
    expect(getTimeInMinutes('')).toBeNull()
  })

  it('returns null for missing minutes', () => {
    expect(getTimeInMinutes('09')).toBeNull()
  })

  it('returns null for too many time parts', () => {
    expect(getTimeInMinutes('09:30:00')).toBeNull()
  })

  it('returns null for non-numeric time', () => {
    expect(getTimeInMinutes('aa:bb')).toBeNull()
  })

  it('returns null for an invalid hour', () => {
    expect(getTimeInMinutes('24:00')).toBeNull()
  })

  it('returns null for an invalid minute', () => {
    expect(getTimeInMinutes('09:60')).toBeNull()
  })

  it('returns null for negative values', () => {
    expect(getTimeInMinutes('-1:30')).toBeNull()
  })
})
