// Modules
import jwt from 'jsonwebtoken'

// Helpers
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '@helpers/authSchemas'

// Types
import { Response, Request, NextFunction } from 'express'
import { ZodError } from 'zod'

// Interfaces
import { AuthRequest, Payload } from '@ts/interfaces/auth'

const handleValidationError = (error: unknown, res: Response): boolean => {
  if (!(error instanceof ZodError)) {
    return false
  }

  res.status(400).json({
    message: 'Validation failed',
    errors: error.flatten().fieldErrors,
  })

  return true
}

export const authMiddleware = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await registerSchema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (handleValidationError(error, res)) {
        return
      }

      next(error)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await loginSchema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (handleValidationError(error, res)) {
        return
      }

      next(error)
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await forgotPasswordSchema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (handleValidationError(error, res)) {
        return
      }

      next(error)
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await resetPasswordSchema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (handleValidationError(error, res)) {
        return
      }

      next(error)
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

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await verifyEmailSchema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (handleValidationError(error, res)) {
        return
      }

      next(error)
    }
  },
}
