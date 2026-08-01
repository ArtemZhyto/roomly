// Modules
import jwt from 'jsonwebtoken'

// Types
import type { NextFunction, Request, Response } from 'express'

// Configs
import { env, prisma } from '@configs/index'

// Helpers
import { clearAuthCookies, setAuthCookies } from '@helpers/auth-cookies'

import { createTokens } from '@helpers/createTokens'

// Interfaces
import type { Payload } from '@services/auth'

export const sessionController = {
  logout: async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      clearAuthCookies(res)

      return res.sendStatus(200)
    } catch (error: unknown) {
      next(error)
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const refreshToken = req.signedCookies.refreshToken as string | undefined

      if (!refreshToken) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(refreshToken, env.refreshSecret) as Payload

      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },

        select: {
          id: true,
          email: true,
        },
      })

      if (!user) {
        clearAuthCookies(res)

        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const tokens = createTokens({
        id: user.id,
        email: user.email,
      })

      setAuthCookies(res, tokens)

      return res.sendStatus(200)
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError) {
        clearAuthCookies(res)

        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      next(error)
    }
  },
}
