// Modules
import jwt from 'jsonwebtoken'

// Helpers
import { RegisterSchema, LoginSchema } from '@helpers/authSchemas'

// Types
import { Response, Request, NextFunction } from 'express'
import { ZodError } from 'zod'

// Interfaces
import { AuthRequest, Payload } from '@ts/interfaces/auth'

export const authMiddleware = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await RegisterSchema.parseAsync(req.body)

      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.flatten().fieldErrors,
        })
      }

      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await LoginSchema.parseAsync(req.body)

      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.flatten().fieldErrors,
        })
      }

      next(err)
    }
  },

  requireAuth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ACCESS_SECRET = process.env.ACCESS_SECRET

      if (!ACCESS_SECRET) {
        throw new Error('ACCESS_SECRET is not configured')
      }

      const accessToken = req.signedCookies.accessToken

      if (!accessToken) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(accessToken, ACCESS_SECRET) as Payload

      ;(req as AuthRequest).user = payload

      next()
    } catch {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
  },
}
