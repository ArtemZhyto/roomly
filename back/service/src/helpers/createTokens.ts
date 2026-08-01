// Modules
import jwt from 'jsonwebtoken'

// Configs
import { env } from '@configs/index'

// Interfaces
import type { Payload } from '@services/auth'

interface Tokens {
  accessToken: string
  refreshToken: string
}

export const createTokens = (payload: Payload): Tokens => {
  const accessToken = jwt.sign(payload, env.accessSecret, {
    expiresIn: '15m',
  })

  const refreshToken = jwt.sign(payload, env.refreshSecret, {
    expiresIn: '30d',
  })

  return {
    accessToken,
    refreshToken,
  }
}