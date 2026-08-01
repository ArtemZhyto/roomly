// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { formatTimeFromMinutes } from '@features/booking/components/BookingForm/utils/booking-time.utils'

describe('formatTimeFromMinutes', () => {
  it('formats midnight', () => {
    expect(formatTimeFromMinutes(0)).toBe('00:00')
  })

  it('pads hours and minutes', () => {
    expect(formatTimeFromMinutes(545)).toBe('09:05')
  })

  it('formats the final minute of the day', () => {
    expect(formatTimeFromMinutes(1439)).toBe('23:59')
  })

  it('wraps minutes beyond the end of the day', () => {
    expect(formatTimeFromMinutes(1470)).toBe('00:30')
  })

  it('wraps negative minutes to the previous day', () => {
    expect(formatTimeFromMinutes(-30)).toBe('23:30')
  })
})
