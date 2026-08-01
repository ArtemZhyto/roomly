// Modules
import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'
import request from 'supertest'

// App
import app from '../../../src/app'

// Helpers
import { clearTestDatabase, disconnectTestDatabase } from '../helpers/database'
import { TEST_PASSWORD, createTestUser } from '../helpers/fixtures'

describe('POST /auth/login', () => {
  beforeEach(async () => {
    await clearTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  it('logs in and grants access to the current user endpoint', async () => {
    const user = await createTestUser({
      name: 'Integration User',
      email: 'integration.user@roomly.dev',
    })

    const agent = request.agent(app)

    const loginResponse = await agent.post('/auth/login').send({
      email: user.email,
      password: TEST_PASSWORD,
    })

    expect(loginResponse.status).toBe(200)

    const cookies = loginResponse.headers['set-cookie']

    expect(cookies).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken='),
      ]),
    )

    const meResponse = await agent.get('/auth/me')

    expect(meResponse.status).toBe(200)

    expect(meResponse.body).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerifiedAt: user.emailVerifiedAt?.toISOString(),
    })
  })

  it('rejects an invalid password', async () => {
    const user = await createTestUser()

    const response = await request(app).post('/auth/login').send({
      email: user.email,
      password: 'WrongPassword123',
    })

    expect(response.status).toBe(401)

    expect(response.body).toEqual({
      message: 'Invalid email or password',
    })
  })

  it('rejects an unknown email', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'missing.user@roomly.dev',
      password: TEST_PASSWORD,
    })

    expect(response.status).toBe(401)

    expect(response.body).toEqual({
      message: 'Invalid email or password',
    })
  })
})
