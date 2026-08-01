// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Features
import { deleteBooking, deleteBookingSeries } from '@features/booking'

// Services
import { cancelMyBooking } from '@features/my-bookings/services/cancel-my-booking.service'

// Fixtures
import { TEST_RECURRING_BOOKING, TEST_SINGLE_BOOKING } from './my-booking.fixture'

jest.mock('@features/booking', () => ({
  deleteBooking: jest.fn(),
  deleteBookingSeries: jest.fn(),
}))

const deleteBookingMock = jest.mocked(deleteBooking)
const deleteBookingSeriesMock = jest.mocked(deleteBookingSeries)

describe('cancelMyBooking single cancellation', () => {
  beforeEach(() => {
    deleteBookingMock.mockReset()
    deleteBookingSeriesMock.mockReset()

    deleteBookingMock.mockResolvedValue(undefined)
    deleteBookingSeriesMock.mockResolvedValue(undefined)
  })

  it('deletes a standalone booking', async () => {
    const result = await cancelMyBooking(TEST_SINGLE_BOOKING, 'occurrence')

    expect(deleteBookingMock).toHaveBeenCalledWith(TEST_SINGLE_BOOKING.id)
    expect(deleteBookingSeriesMock).not.toHaveBeenCalled()

    expect(result).toEqual({
      title: 'Booking cancelled',
      message: '"Product planning" was cancelled successfully.',
    })
  })

  it('deletes one occurrence from a recurring series', async () => {
    const result = await cancelMyBooking(TEST_RECURRING_BOOKING, 'occurrence')

    expect(deleteBookingMock).toHaveBeenCalledWith(TEST_RECURRING_BOOKING.id)
    expect(deleteBookingSeriesMock).not.toHaveBeenCalled()

    expect(result).toEqual({
      title: 'Occurrence cancelled',
      message: '"Weekly planning" was cancelled successfully.',
    })
  })

  it('uses occurrence cancellation when a standalone booking receives series scope', async () => {
    const result = await cancelMyBooking(TEST_SINGLE_BOOKING, 'series')

    expect(deleteBookingMock).toHaveBeenCalledWith(TEST_SINGLE_BOOKING.id)
    expect(deleteBookingSeriesMock).not.toHaveBeenCalled()

    expect(result.title).toBe('Booking cancelled')
  })
})
