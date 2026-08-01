// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Services
import { getUserBookings } from '@services/bookings/get-user-bookings.service'

jest.mock('@configs/index', () => ({
  prisma: {
    booking: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

const CURRENT_DATE = new Date('2026-08-03T09:00:00.000Z')

const DEFAULT_INPUT = {
  userId: 7,
  upcoming: {
    page: 1,
    limit: 5,
  },
  past: {
    page: 1,
    limit: 10,
  },
}

const findManyMock = jest.mocked(prisma.booking.findMany)
const countMock = jest.mocked(prisma.booking.count)

const mockResults = ({
  upcoming = [],
  upcomingTotal = 0,
  past = [],
  pastTotal = 0,
}: {
  upcoming?: unknown[]
  upcomingTotal?: number
  past?: unknown[]
  pastTotal?: number
} = {}): void => {
  findManyMock.mockResolvedValueOnce(upcoming as never).mockResolvedValueOnce(past as never)
  countMock.mockResolvedValueOnce(upcomingTotal).mockResolvedValueOnce(pastTotal)
}

describe('getUserBookings', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(CURRENT_DATE)
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it.each([
    {
      name: 'upcoming bookings',
      callIndex: 1,
      timeFilter: {
        gt: CURRENT_DATE,
      },
      order: 'asc',
      page: 3,
      limit: 5,
      expectedSkip: 10,
    },
    {
      name: 'past bookings',
      callIndex: 2,
      timeFilter: {
        lte: CURRENT_DATE,
      },
      order: 'desc',
      page: 3,
      limit: 10,
      expectedSkip: 20,
    },
  ])(
    'queries $name with correct filters and pagination',
    async ({ callIndex, timeFilter, order, page, limit, expectedSkip }) => {
      mockResults()

      await getUserBookings({
        ...DEFAULT_INPUT,
        upcoming: {
          page: callIndex === 1 ? page : 1,
          limit: callIndex === 1 ? limit : 5,
        },
        past: {
          page: callIndex === 2 ? page : 1,
          limit: callIndex === 2 ? limit : 10,
        },
      })

      expect(findManyMock).toHaveBeenNthCalledWith(
        callIndex,
        expect.objectContaining({
          where: {
            userId: 7,
            endTime: timeFilter,
          },
          orderBy: {
            startTime: order,
          },
          skip: expectedSkip,
          take: limit,
        }),
      )
    },
  )

  it('returns independently paginated upcoming and past bookings', async () => {
    const upcoming = [{ id: 11, title: 'Planning' }]
    const past = [{ id: 5, title: 'Retrospective' }]

    mockResults({
      upcoming,
      upcomingTotal: 6,
      past,
      pastTotal: 21,
    })

    const result = await getUserBookings(DEFAULT_INPUT)

    expect(result).toEqual({
      upcoming: {
        items: upcoming,
        page: 1,
        limit: 5,
        total: 6,
        totalPages: 2,
      },
      past: {
        items: past,
        page: 1,
        limit: 10,
        total: 21,
        totalPages: 3,
      },
    })
  })

  it('returns empty sections with zero pages', async () => {
    mockResults()

    await expect(getUserBookings(DEFAULT_INPUT)).resolves.toEqual({
      upcoming: {
        items: [],
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0,
      },
      past: {
        items: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    })
  })

  it('propagates database errors', async () => {
    const databaseError = new Error('Database connection failed')

    findManyMock.mockRejectedValueOnce(databaseError)

    await expect(getUserBookings(DEFAULT_INPUT)).rejects.toBe(databaseError)
  })
})
