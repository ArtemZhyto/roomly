// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { createAuthenticatedAgent } from '../helpers/auth'
import { createFutureBookingTime } from '../helpers/booking-times'
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { createTestRoom } from '../helpers/fixtures'

describe('POST /bookings recurring series', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('creates a weekly booking series', async () => {
    const { agent, user } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Weekly planning',
      ...time,
      recurrence: {
        frequency: 'weekly',
        count: 3,
      },
    })

    expect(response.status).toBe(201)

    expect(response.body.series).toMatchObject({
      userId: user.id,
      totalOccurrences: 3,
    })

    expect(response.body.bookings).toHaveLength(3)

    const seriesId = response.body.series.id as number

    const bookings = await prisma.booking.findMany({
      where: {
        seriesId,
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    expect(bookings).toHaveLength(3)

    expect(bookings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          roomId: room.id,
          userId: user.id,
          title: 'Weekly planning',
          seriesId,
        }),
      ]),
    )
  })

  it('places each occurrence one week after the previous one', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Weekly sync',
      ...time,
      recurrence: {
        frequency: 'weekly',
        count: 3,
      },
    })

    expect(response.status).toBe(201)

    const bookings = response.body.bookings as Array<{
      startTime: string
      endTime: string
    }>

    const oneWeek = 7 * 24 * 60 * 60 * 1000

    expect(
      new Date(bookings[1]!.startTime).getTime() - new Date(bookings[0]!.startTime).getTime(),
    ).toBe(oneWeek)

    expect(
      new Date(bookings[2]!.startTime).getTime() - new Date(bookings[1]!.startTime).getTime(),
    ).toBe(oneWeek)
  })

  it('rejects the whole series when one occurrence conflicts', async () => {
    const { agent } = await createAuthenticatedAgent()
    const room = await createTestRoom()
    const time = createFutureBookingTime()

    await agent
      .post('/bookings')
      .send({
        roomId: room.id,
        title: 'Existing booking',
        ...time,
      })
      .expect(201)

    const response = await agent.post('/bookings').send({
      roomId: room.id,
      title: 'Conflicting series',
      ...time,
      recurrence: {
        frequency: 'weekly',
        count: 3,
      },
    })

    expect(response.status).toBe(409)

    expect(response.body).toEqual({
      message: 'Room is already booked for this time',
    })

    await expect(prisma.bookingSeries.count()).resolves.toBe(0)
    await expect(prisma.booking.count()).resolves.toBe(1)
  })
})
