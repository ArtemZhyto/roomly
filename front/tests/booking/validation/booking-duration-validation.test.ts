// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Fixtures
import { VALID_BOOKING_VALUES } from './booking-form.fixture'

describe('booking duration validation', () => {
  it('accepts the minimum 30-minute duration', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '10:00',
        endTime: '10:30',
      }).endTime,
    ).toBeUndefined()
  })

  it('accepts the maximum four-hour duration', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '10:00',
        endTime: '14:00',
      }).endTime,
    ).toBeUndefined()
  })

  it('rejects equal start and end times', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '10:00',
        endTime: '10:00',
      }).endTime,
    ).toBe('The end time must be later than the start time.')
  })

  it('rejects an end time earlier than the start time', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '11:00',
        endTime: '10:00',
      }).endTime,
    ).toBe('The end time must be later than the start time.')
  })

  it('rejects a duration longer than four hours', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '10:00',
        endTime: '14:30',
      }).endTime,
    ).toBe('A booking cannot last longer than 4 hours.')
  })

  it('does not treat an earlier end time as the next day', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        startTime: '23:30',
        endTime: '00:30',
      }).endTime,
    ).toBe('The end time must be later than the start time.')
  })
})
