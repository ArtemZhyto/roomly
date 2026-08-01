// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Utils
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Fixtures
import { VALID_BOOKING_VALUES } from './booking-form.fixture'

describe('booking future validation', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    jest.setSystemTime(new Date(2030, 5, 1, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('accepts a booking starting in the future', () => {
    const errors = validateBookingForm({
      ...VALID_BOOKING_VALUES,
      date: '2030-06-01',
      startTime: '12:30',
      endTime: '13:00',
    })

    expect(errors.date).toBeUndefined()
    expect(errors.startTime).toBeUndefined()
  })

  it('rejects a booking in the past', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        date: '2030-05-31',
      }),
    ).toMatchObject({
      date: 'Booking must start in the future.',
      startTime: 'Select a time that has not passed yet.',
    })
  })

  it('rejects a booking starting at the current time', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        date: '2030-06-01',
        startTime: '12:00',
        endTime: '12:30',
      }),
    ).toMatchObject({
      date: 'Booking must start in the future.',
      startTime: 'Select a time that has not passed yet.',
    })
  })

  it('accepts a booking later on the current day', () => {
    const errors = validateBookingForm({
      ...VALID_BOOKING_VALUES,
      date: '2030-06-01',
      startTime: '12:30',
      endTime: '13:00',
    })

    expect(errors.date).toBeUndefined()
    expect(errors.startTime).toBeUndefined()
  })

  it('reports an invalid start date and time', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        date: '2030-02-30',
        startTime: '10:00',
      }).startTime,
    ).toBe('Enter a valid start date and time.')
  })

  it('reports an invalid end date and time', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        date: '2030-02-30',
        endTime: '11:00',
      }).endTime,
    ).toBe('Enter a valid end date and time.')
  })
})
