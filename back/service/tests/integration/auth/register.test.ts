// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'
import request from 'supertest'

// App
import app from '../../../src/app'

// Configs
import { prisma } from '@configs/index'

// Helpers
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'

const REGISTER_BODY = {
  name: 'Integration User',
  email: 'integration.user@roomly.dev',
  password: 'TestPassword123',
  confirmPassword: 'TestPassword123',
}

describe('POST /auth/register', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('creates a user and normalizes their data', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        ...REGISTER_BODY,
        name: '  Integration User  ',
        email: '  Integration.User@Roomly.Dev  ',
      })

    expect(response.status).toBe(201)

    const user = await prisma.user.findUnique({
      where: {
        email: REGISTER_BODY.email,
      },
    })

    expect(user).toMatchObject({
      name: REGISTER_BODY.name,
      email: REGISTER_BODY.email,
      emailVerifiedAt: null,
    })

    expect(user?.passwordHash).not.toBe(REGISTER_BODY.password)

    const verificationCode = await prisma.emailVerificationCode.findUnique({
      where: {
        userId: user?.id,
      },
    })

    expect(verificationCode).not.toBeNull()
  })

  it('sets authentication cookies after registration', async () => {
    const response = await request(app).post('/auth/register').send(REGISTER_BODY)

    expect(response.status).toBe(201)

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken='),
      ]),
    )
  })

  it('rejects the same email with different casing and whitespace', async () => {
    await request(app).post('/auth/register').send(REGISTER_BODY).expect(201)

    const response = await request(app)
      .post('/auth/register')
      .send({
        ...REGISTER_BODY,
        email: '  INTEGRATION.USER@ROOMLY.DEV  ',
      })

    expect(response.status).toBe(409)

    expect(response.body).toEqual({
      message: 'User with this email already exists',
      details: {
        email: ['This email is already in use'],
      },
    })

    await expect(prisma.user.count()).resolves.toBe(1)
  })

  it('rejects mismatching passwords', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        ...REGISTER_BODY,
        confirmPassword: 'DifferentPassword123',
      })

    expect(response.status).toBe(400)

    expect(response.body).toMatchObject({
      message: expect.any(String),
    })

    await expect(prisma.user.count()).resolves.toBe(0)
  })
})
