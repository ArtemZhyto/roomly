// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Errors
import { ForbiddenError, NotFoundError } from '@errors/index'

// Services
import { cancelBooking } from '../../src/services/bookings/cancel-booking.service'

jest.mock('@configs/index', () => ({
  prisma: {
    booking: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    bookingSeries: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

const findBookingMock = jest.mocked(prisma.booking.findUnique)
const deleteBookingMock = jest.mocked(prisma.booking.delete)

describe('cancelBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws NotFoundError when the booking does not exist', async () => {
    findBookingMock.mockResolvedValue(null)

    const promise = cancelBooking(10, 7)

    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toMatchObject({
      statusCode: 404,
      message: 'Booking not found',
    })

    expect(findBookingMock).toHaveBeenCalledWith({
      where: {
        id: 10,
      },
      select: {
        id: true,
        userId: true,
      },
    })

    expect(deleteBookingMock).not.toHaveBeenCalled()
  })

  it('throws ForbiddenError when the booking belongs to another user', async () => {
    findBookingMock.mockResolvedValue({
      id: 10,
      userId: 3,
    } as never)

    const promise = cancelBooking(10, 7)

    await expect(promise).rejects.toBeInstanceOf(ForbiddenError)
    await expect(promise).rejects.toMatchObject({
      statusCode: 403,
      message: 'You can only cancel your own bookings',
    })

    expect(deleteBookingMock).not.toHaveBeenCalled()
  })

  it('deletes a booking belonging to the current user', async () => {
    findBookingMock.mockResolvedValue({
      id: 10,
      userId: 7,
    } as never)

    deleteBookingMock.mockResolvedValue({
      id: 10,
    } as never)

    await expect(cancelBooking(10, 7)).resolves.toBeUndefined()

    expect(deleteBookingMock).toHaveBeenCalledTimes(1)
    expect(deleteBookingMock).toHaveBeenCalledWith({
      where: {
        id: 10,
      },
    })
  })

  it('propagates an unexpected database error during deletion', async () => {
    const databaseError = new Error('Database connection failed')

    findBookingMock.mockResolvedValue({
      id: 10,
      userId: 7,
    } as never)

    deleteBookingMock.mockRejectedValue(databaseError)

    await expect(cancelBooking(10, 7)).rejects.toBe(databaseError)
  })
})
