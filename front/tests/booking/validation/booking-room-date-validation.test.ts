// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Fixtures
import { VALID_BOOKING_VALUES } from './booking-form.fixture'

describe('booking room and date validation', () => {
  it('accepts a selected room', () => {
    expect(validateBookingForm(VALID_BOOKING_VALUES).roomId).toBeUndefined()
  })

  it('rejects a missing room', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        roomId: 0,
      }).roomId,
    ).toBe('Select a meeting room.')
  })

  it('accepts a selected date', () => {
    expect(validateBookingForm(VALID_BOOKING_VALUES).date).toBeUndefined()
  })

  it('rejects a missing date', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        date: '',
      }).date,
    ).toBe('Select a meeting date.')
  })

  it('returns room and date errors together', () => {
    expect(
      validateBookingForm({
        ...VALID_BOOKING_VALUES,
        roomId: 0,
        date: '',
      }),
    ).toMatchObject({
      roomId: 'Select a meeting room.',
      date: 'Select a meeting date.',
    })
  })
})
