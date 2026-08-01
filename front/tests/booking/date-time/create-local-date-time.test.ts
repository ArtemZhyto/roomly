// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { createLocalDateTime } from '@features/booking/components/BookingForm/utils/booking-date-time.utils'

describe('createLocalDateTime', () => {
  it('creates a local date from valid values', () => {
    const result = createLocalDateTime('2030-06-15', '10:30')

    expect(result).not.toBeNull()
    expect(result?.getFullYear()).toBe(2030)
    expect(result?.getMonth()).toBe(5)
    expect(result?.getDate()).toBe(15)
    expect(result?.getHours()).toBe(10)
    expect(result?.getMinutes()).toBe(30)
    expect(result?.getSeconds()).toBe(0)
    expect(result?.getMilliseconds()).toBe(0)
  })

  it('accepts midnight', () => {
    const result = createLocalDateTime('2030-06-15', '00:00')

    expect(result?.getHours()).toBe(0)
    expect(result?.getMinutes()).toBe(0)
  })

  it('returns null for an invalid date format', () => {
    expect(createLocalDateTime('15-06-2030', '10:30')).toBeNull()
  })

  it('returns null for an invalid time format', () => {
    expect(createLocalDateTime('2030-06-15', '10.30')).toBeNull()
  })

  it('returns null for a non-existent calendar date', () => {
    expect(createLocalDateTime('2030-02-30', '10:30')).toBeNull()
  })

  it('returns null for an invalid month', () => {
    expect(createLocalDateTime('2030-13-15', '10:30')).toBeNull()
  })

  it('returns null for an invalid hour', () => {
    expect(createLocalDateTime('2030-06-15', '24:00')).toBeNull()
  })

  it('returns null for an invalid minute', () => {
    expect(createLocalDateTime('2030-06-15', '10:60')).toBeNull()
  })

  it('returns null for empty values', () => {
    expect(createLocalDateTime('', '')).toBeNull()
  })
})
