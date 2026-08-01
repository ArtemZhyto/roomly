// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { createAuthenticatedAgent } from '../helpers/auth'
import { createFutureBookingTime } from '../helpers/booking-times'
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { createTestRoom } from '../helpers/fixtures'

const createSeries = async () => {
  const owner = await createAuthenticatedAgent({
    email: 'series.owner@roomly.dev',
  })

  const room = await createTestRoom()
  const time = createFutureBookingTime()

  const response = await owner.agent.post('/bookings').send({
    roomId: room.id,
    title: 'Recurring meeting',
    ...time,

    recurrence: {
      frequency: 'weekly',
      count: 3,
    },
  })

  if (response.status !== 201) {
    throw new Error(`Series creation failed with status ${response.status}`)
  }

  return {
    owner,
    seriesId: response.body.series.id as number,
    bookings: response.body.bookings as Array<{
      id: number
    }>,
  }
}

describe('booking series cancellation', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('allows cancelling one occurrence without deleting the series', async () => {
    const { owner, seriesId, bookings } = await createSeries()

    const response = await owner.agent.delete(`/bookings/${bookings[0]!.id}`)

    expect(response.status).toBe(204)

    await expect(
      prisma.booking.findUnique({
        where: {
          id: bookings[0]!.id,
        },
      }),
    ).resolves.toBeNull()

    await expect(
      prisma.bookingSeries.findUnique({
        where: {
          id: seriesId,
        },
      }),
    ).resolves.not.toBeNull()

    await expect(
      prisma.booking.count({
        where: {
          seriesId,
        },
      }),
    ).resolves.toBe(2)
  })

  it('deletes every occurrence when the owner cancels the series', async () => {
    const { owner, seriesId } = await createSeries()

    const response = await owner.agent.delete(`/bookings/series/${seriesId}`)

    expect(response.status).toBe(204)

    await expect(
      prisma.bookingSeries.findUnique({
        where: {
          id: seriesId,
        },
      }),
    ).resolves.toBeNull()

    await expect(
      prisma.booking.count({
        where: {
          seriesId,
        },
      }),
    ).resolves.toBe(0)
  })

  it('prevents another user from cancelling the series', async () => {
    const { seriesId } = await createSeries()

    const stranger = await createAuthenticatedAgent({
      email: 'series.stranger@roomly.dev',
    })

    const response = await stranger.agent.delete(`/bookings/series/${seriesId}`)

    expect(response.status).toBe(403)

    expect(response.body).toEqual({
      message: 'You can only cancel your own booking series',
    })

    await expect(
      prisma.bookingSeries.findUnique({
        where: {
          id: seriesId,
        },
      }),
    ).resolves.not.toBeNull()
  })

  it('returns 404 for a missing series', async () => {
    const { agent } = await createAuthenticatedAgent()

    const response = await agent.delete('/bookings/series/999999')

    expect(response.status).toBe(404)

    expect(response.body).toEqual({
      message: 'Booking series not found',
    })
  })
})
