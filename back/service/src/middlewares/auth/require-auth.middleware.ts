// Modules
import jwt from 'jsonwebtoken'

// Types
import type { NextFunction, Request, Response } from 'express'

// Configs
import { env } from '@configs/index'

// Interfaces
import type { AuthRequest, Payload } from '@services/auth'

const getAccessToken = (req: Request): string | null => {
  const accessToken = req.signedCookies.accessToken

  return typeof accessToken === 'string' ? accessToken : null
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): Response | void => {
  const accessToken = getAccessToken(req)

  if (!accessToken) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  try {
    const payload = jwt.verify(accessToken, env.accessSecret) as Payload

    ;(req as AuthRequest).user = payload

    next()
  } catch {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
