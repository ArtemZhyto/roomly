// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { isTimeAlignedToSlot } from '@features/booking/components/BookingForm/utils/booking-time.utils'

describe('isTimeAlignedToSlot', () => {
  it('accepts a full-hour boundary', () => {
    expect(isTimeAlignedToSlot(540)).toBe(true)
  })

  it('accepts a half-hour boundary', () => {
    expect(isTimeAlignedToSlot(570)).toBe(true)
  })

  it('rejects a quarter-hour boundary', () => {
    expect(isTimeAlignedToSlot(555)).toBe(false)
  })

  it('accepts midnight', () => {
    expect(isTimeAlignedToSlot(0)).toBe(true)
  })
})
