// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Helpers
import { validateBookingTime } from '@helpers/validateBookingTime'

const CURRENT_DATE = new Date('2026-08-03T06:00:00.000Z')

const createDate = (value: string): Date => {
  return new Date(value)
}

describe('validateBookingTime duration rules', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('accepts the minimum duration of 30 minutes', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T07:30:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })

  it('accepts the maximum duration of 4 hours', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T11:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })

  it('rejects a duration shorter than 30 minutes', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T07:29:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking duration must be between 30 minutes and 4 hours',
    )
  })

  it('rejects a duration longer than 4 hours', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T11:30:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking duration must be between 30 minutes and 4 hours',
    )
  })

  it('rejects a start time outside a 30-minute boundary', () => {
    const startDate = createDate('2026-08-03T07:15:00.000Z')
    const endDate = createDate('2026-08-03T08:15:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking time must use 30-minute increments',
    )
  })

  it('rejects an end time outside a 30-minute boundary', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T08:15:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking time must use 30-minute increments',
    )
  })

  it('rejects non-zero seconds', () => {
    const startDate = createDate('2026-08-03T07:00:01.000Z')
    const endDate = createDate('2026-08-03T08:00:01.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking time must use 30-minute increments',
    )
  })

  it('rejects non-zero milliseconds', () => {
    const startDate = createDate('2026-08-03T07:00:00.001Z')
    const endDate = createDate('2026-08-03T08:00:00.001Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'Booking time must use 30-minute increments',
    )
  })
})
