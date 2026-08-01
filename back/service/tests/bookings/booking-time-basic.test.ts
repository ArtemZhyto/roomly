// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Helpers
import { validateBookingTime } from '@helpers/validateBookingTime'

const CURRENT_DATE = new Date('2026-08-03T06:00:00.000Z')

const createDate = (value: string): Date => {
  return new Date(value)
}

describe('validateBookingTime basic rules', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('accepts a valid future booking', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T08:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).not.toThrow()
  })

  it('rejects a booking in the past', () => {
    const startDate = createDate('2026-08-03T05:00:00.000Z')
    const endDate = createDate('2026-08-03T06:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow('Booking must be in the future')
  })

  it('rejects a booking starting at the current time', () => {
    const startDate = createDate('2026-08-03T06:00:00.000Z')
    const endDate = createDate('2026-08-03T07:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow('Booking must be in the future')
  })

  it('rejects equal start and end times', () => {
    const startDate = createDate('2026-08-03T07:00:00.000Z')
    const endDate = createDate('2026-08-03T07:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'End time must be later than start time',
    )
  })

  it('rejects an end time earlier than the start time', () => {
    const startDate = createDate('2026-08-03T08:00:00.000Z')
    const endDate = createDate('2026-08-03T07:00:00.000Z')

    expect(() => validateBookingTime(startDate, endDate)).toThrow(
      'End time must be later than start time',
    )
  })
})
