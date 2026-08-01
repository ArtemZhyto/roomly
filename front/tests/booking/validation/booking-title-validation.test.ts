// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Fixtures
import { VALID_BOOKING_VALUES } from './booking-form.fixture'

describe('booking title validation', () => {
  it('accepts a valid title', () => {
    expect(validateBookingForm(VALID_BOOKING_VALUES).title).toBeUndefined()
  })

  it('rejects an empty title', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        title: '',
      }).title,
    ).toBe('Enter a title for the meeting.')
  })

  it('rejects a whitespace-only title', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        title: '   ',
      }).title,
    ).toBe('Enter a title for the meeting.')
  })

  it('accepts a title containing exactly 100 characters', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        title: 'a'.repeat(100),
      }).title,
    ).toBeUndefined()
  })

  it('rejects a title longer than 100 characters', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        title: 'a'.repeat(101),
      }).title,
    ).toBe('The title cannot exceed 100 characters.')
  })

  it('checks the trimmed title length', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        title: `  ${'a'.repeat(100)}  `,
      }).title,
    ).toBeUndefined()
  })
})
