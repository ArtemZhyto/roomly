// Types
import type { Response } from 'express'

// Configs
import { authCookieOptions, env } from '@configs/index'

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = (res: Response, { accessToken, refreshToken }: AuthTokens): void => {
  res.cookie('refreshToken', refreshToken, {
    ...authCookieOptions,
    maxAge: env.refreshTokenMaxAge,
  })

  res.cookie('accessToken', accessToken, {
    ...authCookieOptions,
    maxAge: env.accessTokenMaxAge,
  })
}

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie('refreshToken', authCookieOptions)
  res.clearCookie('accessToken', authCookieOptions)
}
