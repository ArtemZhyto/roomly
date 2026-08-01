// Modules
import request from 'supertest'

// App
import app from '../../../src/app'

// Helpers
import { TEST_PASSWORD, createTestUser } from './fixtures'

interface CreateAuthenticatedAgentOptions {
  name?: string
  email?: string
  password?: string
  isVerified?: boolean
}

export const createAuthenticatedAgent = async ({
  name,
  email,
  password = TEST_PASSWORD,
  isVerified = true,
}: CreateAuthenticatedAgentOptions = {}) => {
  const user = await createTestUser({
    name,
    email,
    password,
    isVerified,
  })

  const agent = request.agent(app)

  const response = await agent.post('/auth/login').send({
    email: user.email,
    password,
  })

  if (response.status !== 200) {
    throw new Error(`Test user login failed with status ${response.status}`)
  }

  return {
    agent,
    user,
  }
}
