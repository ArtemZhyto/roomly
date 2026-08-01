// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { createAuthenticatedAgent } from '../helpers/auth'
import { createFutureBookingTime } from '../helpers/booking-times'
import { createTestRoom } from '../helpers/fixtures'

describe('booking concurrency protection', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('stores exactly one booking for two simultaneous requests', async () => {
    const firstUser = await createAuthenticatedAgent({
      email: 'first.user@roomly.dev',
    })

    const secondUser = await createAuthenticatedAgent({
      email: 'second.user@roomly.dev',
    })

    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const bookingBody = {
      roomId: room.id,
      title: 'Concurrent booking',
      ...time,
    }

    const responses = await Promise.all([
      firstUser.agent.post('/bookings').send(bookingBody),
      secondUser.agent.post('/bookings').send(bookingBody),
    ])

    const statuses = responses.map(({ status }) => status).sort((first, second) => first - second)

    expect(statuses).toEqual([201, 409])

    const bookings = await prisma.booking.findMany({
      where: {
        roomId: room.id,
      },
    })

    expect(bookings).toHaveLength(1)

    expect([firstUser.user.id, secondUser.user.id]).toContain(bookings[0]?.userId)

    const conflictResponse = responses.find(({ status }) => status === 409)

    expect(conflictResponse?.body).toEqual({
      message: 'Room is already booked for this time',
    })
  })
})
