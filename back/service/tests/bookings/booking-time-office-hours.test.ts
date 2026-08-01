// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Helpers
import { validateBookingTime } from '@helpers/validateBookingTime'

const CURRENT_DATE = new Date('2026-08-03T04:00:00.000Z')
const OFFICE_HOURS_ERROR = 'Booking must be within office hours from 09:00 to 19:00 Europe/Kyiv'

const createDate = (value: string): Date => {
  return new Date(value)
}

describe('validateBookingTime office-hour rules', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('accepts a booking starting exactly when the office opens', () => {
    const startDate = createDate('2026-08-03T06:00:00.000Z')
    const endDate = createDate('2026-08-03T06:30:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })

  it('accepts a booking ending exactly when the office closes', () => {
    const startDate = createDate('2026-08-03T15:00:00.000Z')
    const endDate = createDate('2026-08-03T16:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })

  it('rejects a booking starting before the office opens', () => {
    const startDate = createDate('2026-08-03T05:30:00.000Z')
    const endDate = createDate('2026-08-03T06:30:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(OFFICE_HOURS_ERROR)
  })

  it('rejects a booking ending after the office closes', () => {
    const startDate = createDate('2026-08-03T15:30:00.000Z')
    const endDate = createDate('2026-08-03T16:30:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(OFFICE_HOURS_ERROR)
  })

  it('rejects a booking crossing into the next office day', () => {
    const startDate = createDate('2026-08-03T15:30:00.000Z')
    const endDate = createDate('2026-08-04T06:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking duration must be between 30 minutes and 4 hours',
    )
  })

  it('uses Europe/Kyiv office time instead of UTC time', () => {
    const startDate = createDate('2026-08-03T06:00:00.000Z')
    const endDate = createDate('2026-08-03T07:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })
})
