// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Fixtures
import { VALID_BOOKING_VALUES } from './booking-form.fixture'

describe('booking recurrence validation', () => {
  it('does not require a count when recurrence is disabled', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: false,
        recurrenceCount: '',
      }).recurrenceCount,
    ).toBeUndefined()
  })

  it('requires a count when recurrence is enabled', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '',
      }).recurrenceCount,
    ).toBe('Enter the number of occurrences.')
  })

  it('rejects a decimal count', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '2.5',
      }).recurrenceCount,
    ).toBe('Occurrences must be a whole number.')
  })

  it('rejects a non-numeric count', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: 'abc',
      }).recurrenceCount,
    ).toBe('Occurrences must be a whole number.')
  })

  it('rejects fewer than two occurrences', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '1',
      }).recurrenceCount,
    ).toBe('Create at least 2 occurrences.')
  })

  it('accepts exactly two occurrences', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '2',
      }).recurrenceCount,
    ).toBeUndefined()
  })

  it('accepts exactly 52 occurrences', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '52',
      }).recurrenceCount,
    ).toBeUndefined()
  })

  it('rejects more than 52 occurrences', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: '53',
      }).recurrenceCount,
    ).toBe('Create no more than 52 occurrences.')
  })

  it('trims surrounding whitespace from the count', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        repeatWeekly: true,
        recurrenceCount: ' 2 ',
      }).recurrenceCount,
    ).toBeUndefined()
  })
})
