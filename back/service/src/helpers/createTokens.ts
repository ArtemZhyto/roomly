// Modules
import jwt from 'jsonwebtoken'

// Interfaces
import { Payload } from '@ts/interfaces/auth'

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

if (!ACCESS_SECRET) {
  throw new Error('ACCESS_SECRET is not configured')
}

if (!REFRESH_SECRET) {
  throw new Error('REFRESH_SECRET is not configured')
}

const ACCESS_AGE = Math.floor(Number(process.env.ACCESS_AGE) / 1000)
const REFRESH_AGE = Math.floor(Number(process.env.REFRESH_AGE) / 1000)

export const createTokens = (payload: Payload) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_AGE })
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_AGE })

  return {
    accessToken,
    refreshToken,
  }
}
