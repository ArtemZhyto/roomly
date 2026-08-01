// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { formatDateInputValue } from '@features/booking/components/BookingForm/utils/booking-date-time.utils'

describe('formatDateInputValue', () => {
  it('formats a date as YYYY-MM-DD', () => {
    const date = new Date(2030, 5, 15)

    expect(formatDateInputValue(date)).toBe('2030-06-15')
  })

  it('pads a single-digit month', () => {
    const date = new Date(2030, 0, 15)

    expect(formatDateInputValue(date)).toBe('2030-01-15')
  })

  it('pads a single-digit day', () => {
    const date = new Date(2030, 5, 5)

    expect(formatDateInputValue(date)).toBe('2030-06-05')
  })

  it('pads both month and day', () => {
    const date = new Date(2030, 0, 5)

    expect(formatDateInputValue(date)).toBe('2030-01-05')
  })

  it('formats the final day of the year', () => {
    const date = new Date(2030, 11, 31)

    expect(formatDateInputValue(date)).toBe('2030-12-31')
  })
})
