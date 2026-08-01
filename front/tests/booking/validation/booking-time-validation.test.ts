// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Validation
import { validateBookingForm } from '@features/booking/components/BookingForm/utils/booking-form-validation'

// Types
import type { BookingFormValues } from '@features/booking/components/BookingForm/booking-form.types'

const createBookingValues = (overrides: Partial<BookingFormValues> = {}): BookingFormValues => ({
  title: 'Product planning',
  roomId: 1,
  date: '2030-06-15',
  startTime: '10:00',
  endTime: '11:00',
  repeatWeekly: false,
  recurrenceCount: '2',
  ...overrides,
})

describe('booking time validation', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    jest.setSystemTime(new Date(2030, 5, 1, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('accepts valid start and end times', () => {
    const errors = validateBookingForm(createBookingValues())

    expect(errors.startTime).toBeUndefined()
    expect(errors.endTime).toBeUndefined()
  })

  it('requires a start time', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: '',
      }),
    )

    expect(errors.startTime).toBe('Select a start time.')
  })

  it('requires an end time', () => {
    const errors = validateBookingForm(
      createBookingValues({
        endTime: '',
      }),
    )

    expect(errors.endTime).toBe('Select an end time.')
  })

  it('rejects a start time outside a 30-minute interval', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: '10:15',
      }),
    )

    expect(errors.startTime).toBe('Start time must use 30-minute intervals.')
  })

  it('rejects an end time outside a 30-minute interval', () => {
    const errors = validateBookingForm(
      createBookingValues({
        endTime: '11:15',
      }),
    )

    expect(errors.endTime).toBe('End time must use 30-minute intervals.')
  })

  it('rejects an invalid start time', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: 'invalid',
      }),
    )

    expect(errors.startTime).toBe('Enter a valid start date and time.')
  })

  it('rejects an invalid end time', () => {
    const errors = validateBookingForm(
      createBookingValues({
        endTime: 'invalid',
      }),
    )

    expect(errors.endTime).toBe('Enter a valid end date and time.')
  })

  it('rejects an end time before the start time', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: '11:00',
        endTime: '10:00',
      }),
    )

    expect(errors.endTime).toBe('The end time must be later than the start time.')
  })

  it('rejects a booking longer than four hours', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: '10:00',
        endTime: '15:00',
      }),
    )

    expect(errors.endTime).toBe('A booking cannot last longer than 4 hours.')
  })

  it('returns both missing-time errors together', () => {
    const errors = validateBookingForm(
      createBookingValues({
        startTime: '',
        endTime: '',
      }),
    )

    expect(errors.startTime).toBe('Select a start time.')
    expect(errors.endTime).toBe('Select an end time.')
  })
})
