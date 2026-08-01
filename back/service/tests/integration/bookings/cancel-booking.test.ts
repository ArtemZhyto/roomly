// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { createAuthenticatedAgent } from '../helpers/auth'
import { createFutureBookingTime } from '../helpers/booking-times'
import { createTestRoom } from '../helpers/fixtures'

describe('DELETE /bookings/:bookingId', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('allows the owner to cancel their booking', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const creationResponse = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Booking to cancel',
      ...time,
    })

    expect(creationResponse.status).toBe(201)

    const bookingId = creationResponse.body.id as number

    const cancellationResponse = await agent.delete(`/bookings/${bookingId}`)

    expect(cancellationResponse.status).toBe(204)

    await expect(
      prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      }),
    ).resolves.toBeNull()
  })

  it('prevents another user from cancelling the booking', async () => {
    const owner = await createAuthenticatedAgent({
      email: 'owner@roomly.dev',
    })

    const stranger = await createAuthenticatedAgent({
      email: 'stranger@roomly.dev',
    })

    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const creationResponse = await owner.agent.post('/bookings').send({
      roomId: room.id,
      title: 'Owner booking',
      ...time,
    })

    expect(creationResponse.status).toBe(201)

    const bookingId = creationResponse.body.id as number

    const cancellationResponse = await stranger.agent.delete(`/bookings/${bookingId}`)

    expect(cancellationResponse.status).toBe(403)

    expect(cancellationResponse.body).toEqual({
      message: 'You can only cancel your own bookings',
    })

    await expect(
      prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      }),
    ).resolves.not.toBeNull()
  })

  it('returns 404 for a missing booking', async () => {
    const { agent } = await createAuthenticatedAgent()

    const response = await agent.delete('/bookings/999999')

    expect(response.status).toBe(404)

    expect(response.body).toEqual({
      message: 'Booking not found',
    })
  })

  it('rejects an invalid booking id', async () => {
    const { agent } = await createAuthenticatedAgent()

    const response = await agent.delete('/bookings/not-a-number')

    expect(response.status).toBe(400)

    expect(response.body).toEqual({
      message: 'Invalid booking id',
    })
  })
})
