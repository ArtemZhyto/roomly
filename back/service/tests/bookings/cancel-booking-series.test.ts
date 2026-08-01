// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Errors
import { ForbiddenError, NotFoundError } from '@errors/index'

// Services
import { cancelBookingSeries } from '../../src/services/bookings/cancel-booking.service'

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

const findSeriesMock = jest.mocked(prisma.bookingSeries.findUnique)
const deleteSeriesMock = jest.mocked(prisma.bookingSeries.delete)

describe('cancelBookingSeries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws NotFoundError when the booking series does not exist', async () => {
    findSeriesMock.mockResolvedValue(null)

    const promise = cancelBookingSeries(15, 7)

    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toMatchObject({
      statusCode: 404,
      message: 'Booking series not found',
    })

    expect(findSeriesMock).toHaveBeenCalledWith({
      where: {
        id: 15,
      },
      select: {
        id: true,
        userId: true,
      },
    })

    expect(deleteSeriesMock).not.toHaveBeenCalled()
  })

  it('throws ForbiddenError when the series belongs to another user', async () => {
    findSeriesMock.mockResolvedValue({
      id: 15,
      userId: 3,
    } as never)

    const promise = cancelBookingSeries(15, 7)

    await expect(promise).rejects.toBeInstanceOf(ForbiddenError)
    await expect(promise).rejects.toMatchObject({
      statusCode: 403,
      message: 'You can only cancel your own booking series',
    })

    expect(deleteSeriesMock).not.toHaveBeenCalled()
  })

  it('deletes a booking series belonging to the current user', async () => {
    findSeriesMock.mockResolvedValue({
      id: 15,
      userId: 7,
    } as never)

    deleteSeriesMock.mockResolvedValue({
      id: 15,
    } as never)

    await expect(cancelBookingSeries(15, 7)).resolves.toBeUndefined()

    expect(deleteSeriesMock).toHaveBeenCalledTimes(1)
    expect(deleteSeriesMock).toHaveBeenCalledWith({
      where: {
        id: 15,
      },
    })
  })

  it('propagates an unexpected database error during deletion', async () => {
    const databaseError = new Error('Database connection failed')

    findSeriesMock.mockResolvedValue({
      id: 15,
      userId: 7,
    } as never)

    deleteSeriesMock.mockRejectedValue(databaseError)

    await expect(cancelBookingSeries(15, 7)).rejects.toBe(databaseError)
  })
})
