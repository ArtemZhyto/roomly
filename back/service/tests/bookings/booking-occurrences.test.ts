// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Services
import { createBookingOccurrences } from '@services/bookings/booking-occurrences'

const CURRENT_DATE = new Date('2026-08-01T08:00:00.000Z')

describe('createBookingOccurrences', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('creates one occurrence for a single booking', () => {
    const occurrences = createBookingOccurrences({
      startTime: '2026-08-03T07:00:00.000Z',
      endTime: '2026-08-03T08:00:00.000Z',
      occurrenceCount: 1,
    })

    expect(occurrences).toEqual([
      {
        startDate: new Date('2026-08-03T07:00:00.000Z'),
        endDate: new Date('2026-08-03T08:00:00.000Z'),
      },
    ])
  })

  it('creates the requested number of weekly occurrences', () => {
    const occurrences = createBookingOccurrences({
      startTime: '2026-08-03T07:00:00.000Z',
      endTime: '2026-08-03T08:00:00.000Z',
      occurrenceCount: 3,
    })

    expect(occurrences).toHaveLength(3)
  })

  it('places every occurrence exactly one week after the previous one', () => {
    const occurrences = createBookingOccurrences({
      startTime: '2026-08-03T07:00:00.000Z',
      endTime: '2026-08-03T08:00:00.000Z',
      occurrenceCount: 3,
    })

    expect(occurrences).toEqual([
      {
        startDate: new Date('2026-08-03T07:00:00.000Z'),
        endDate: new Date('2026-08-03T08:00:00.000Z'),
      },
      {
        startDate: new Date('2026-08-10T07:00:00.000Z'),
        endDate: new Date('2026-08-10T08:00:00.000Z'),
      },
      {
        startDate: new Date('2026-08-17T07:00:00.000Z'),
        endDate: new Date('2026-08-17T08:00:00.000Z'),
      },
    ])
  })

  it('preserves the booking duration for every occurrence', () => {
    const occurrences = createBookingOccurrences({
      startTime: '2026-08-03T07:00:00.000Z',
      endTime: '2026-08-03T08:30:00.000Z',
      occurrenceCount: 4,
    })

    const durations = occurrences.map(
      ({ startDate, endDate }) => endDate.getTime() - startDate.getTime(),
    )

    expect(durations).toEqual([90 * 60 * 1000, 90 * 60 * 1000, 90 * 60 * 1000, 90 * 60 * 1000])
  })

  it('preserves the local office time when daylight saving time changes', () => {
    const occurrences = createBookingOccurrences({
      startTime: '2026-10-19T07:00:00.000Z',
      endTime: '2026-10-19T08:00:00.000Z',
      occurrenceCount: 2,
    })

    expect(occurrences).toEqual([
      {
        startDate: new Date('2026-10-19T07:00:00.000Z'),
        endDate: new Date('2026-10-19T08:00:00.000Z'),
      },
      {
        startDate: new Date('2026-10-26T08:00:00.000Z'),
        endDate: new Date('2026-10-26T09:00:00.000Z'),
      },
    ])
  })

  it('validates every generated occurrence', () => {
    expect(() =>
      createBookingOccurrences({
        startTime: '2026-08-03T15:00:00.000Z',
        endTime: '2026-08-03T16:00:00.000Z',
        occurrenceCount: 3,
      }),
    ).not.toThrow()
  })

  it('rejects the series when a generated occurrence is invalid', () => {
    expect(() =>
      createBookingOccurrences({
        startTime: '2026-08-03T15:30:00.000Z',
        endTime: '2026-08-03T16:30:00.000Z',
        occurrenceCount: 2,
      }),
    ).toThrow('Booking must be within office hours from 09:00 to 19:00 Europe/Kyiv')
  })
})
