// Types
import type { CookieOptions } from 'express'

// Configs
import { env, isProduction } from './env'

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  signed: true,
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',

  ...(isProduction && {
    domain: env.domain,
  }),
}