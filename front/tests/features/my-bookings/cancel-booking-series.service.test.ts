// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Features
import { deleteBooking, deleteBookingSeries } from '@features/booking'

// Services
import { cancelMyBooking } from '@features/my-bookings/services/cancel-my-booking.service'

// Fixtures
import { TEST_RECURRING_BOOKING } from './my-booking.fixture'

jest.mock('@features/booking', () => ({
  deleteBooking: jest.fn(),
  deleteBookingSeries: jest.fn(),
}))

const deleteBookingMock = jest.mocked(deleteBooking)
const deleteBookingSeriesMock = jest.mocked(deleteBookingSeries)

describe('cancelMyBooking series cancellation', () => {
  beforeEach(() => {
    deleteBookingMock.mockReset()
    deleteBookingSeriesMock.mockReset()

    deleteBookingMock.mockResolvedValue(undefined)
    deleteBookingSeriesMock.mockResolvedValue(undefined)
  })

  it('deletes the complete booking series', async () => {
    const seriesId = TEST_RECURRING_BOOKING.seriesId

    expect(seriesId).not.toBeNull()

    const result = await cancelMyBooking(TEST_RECURRING_BOOKING, 'series')

    expect(deleteBookingSeriesMock).toHaveBeenCalledWith(seriesId as number)
    expect(deleteBookingMock).not.toHaveBeenCalled()

    expect(result).toEqual({
      title: 'Booking series cancelled',
      message: '"Weekly planning" and its remaining occurrences were cancelled.',
    })
  })

  it('propagates a series deletion error', async () => {
    const error = new Error('Series deletion failed')

    deleteBookingSeriesMock.mockRejectedValue(error)

    await expect(cancelMyBooking(TEST_RECURRING_BOOKING, 'series')).rejects.toBe(error)
  })
})
