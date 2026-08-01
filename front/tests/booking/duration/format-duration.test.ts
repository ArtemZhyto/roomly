// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { formatDuration } from '@features/booking/components/BookingForm/utils/booking-duration.utils'

describe('formatDuration', () => {
  it('formats minutes only', () => {
    expect(formatDuration(30)).toBe('30m')
  })

  it('formats hours only', () => {
    expect(formatDuration(120)).toBe('2h')
  })

  it('formats hours and minutes', () => {
    expect(formatDuration(150)).toBe('2h 30m')
  })

  it('formats one hour', () => {
    expect(formatDuration(60)).toBe('1h')
  })

  it('returns an invalid label for zero', () => {
    expect(formatDuration(0)).toBe('Invalid duration')
  })

  it('returns an invalid label for negative duration', () => {
    expect(formatDuration(-30)).toBe('Invalid duration')
  })
})
