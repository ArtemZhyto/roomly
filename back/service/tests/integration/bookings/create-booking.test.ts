// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { createAuthenticatedAgent } from '../helpers/auth'
import { createFutureBookingTime } from '../helpers/booking-times'
import { createTestRoom } from '../helpers/fixtures'

describe('POST /bookings', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('creates a booking in PostgreSQL', async () => {
    const { agent, user } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Integration planning',
      ...time,
    })

    expect(response.status).toBe(201)

    expect(response.body).toMatchObject({
      title: 'Integration planning',
      userId: user.id,
      roomId: room.id,
      seriesId: null,
      startTime: time.startTime,
      endTime: time.endTime,
    })

    const booking = await prisma.booking.findUnique({
      where: {
        id: response.body.id as number,
      },
    })

    expect(booking).toMatchObject({
      title: 'Integration planning',
      userId: user.id,
      roomId: room.id,
      seriesId: null,
    })

    expect(booking?.startTime.toISOString()).toBe(time.startTime)
    expect(booking?.endTime.toISOString()).toBe(time.endTime)
  })

  it('rejects an unverified user', async () => {
    const { agent } = await createAuthenticatedAgent({
      email: 'unverified@roomly.dev',
      isVerified: false,
    })

    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Forbidden booking',
      ...time,
    })

    expect(response.status).toBe(403)

    expect(response.body).toEqual({
      message: 'Email must be verified before booking',
    })

    await expect(prisma.booking.count()).resolves.toBe(0)
  })

  it('rejects an overlapping booking', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    await agent
      .post('/bookings')
      .send({
        roomId: room.id,
        title: 'First booking',
        ...time,
      })
      .expect(201)

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Overlapping booking',
      ...time,
    })

    expect(response.status).toBe(409)

    expect(response.body).toEqual({
      message: 'Room is already booked for this time',
    })

    await expect(prisma.booking.count()).resolves.toBe(1)
  })

  it('allows bookings touching at their boundaries', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()

    const firstTime = createFutureBookingTime({
      startHour: 10,
      durationMinutes: 60,
    })

    const secondTime = createFutureBookingTime({
      startHour: 11,
      durationMinutes: 60,
    })

    await agent
      .post('/bookings')
      .send({
        roomId: room.id,
        title: 'First booking',
        ...firstTime,
      })
      .expect(201)

    await agent
      .post('/bookings')
      .send({
        roomId: room.id,
        title: 'Adjacent booking',
        ...secondTime,
      })
      .expect(201)

    await expect(prisma.booking.count()).resolves.toBe(2)
  })

  it('rejects a booking outside office hours', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()

    const time = createFutureBookingTime({
      startHour: 8,
      durationMinutes: 60,
    })

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Early booking',
      ...time,
    })

    expect(response.status).toBe(400)

    expect(response.body).toEqual({
      message: 'Booking must be within office hours from 09:00 to 19:00 Europe/Kyiv',
    })

    await expect(prisma.booking.count()).resolves.toBe(0)
  })
})
