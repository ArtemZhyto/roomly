// Types
import type { NextFunction, Request, Response } from 'express'

// Services
import { verificationService } from '@services/auth'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Validation types
import type { VerifyEmailBody } from '@validation/auth'

const VERIFICATION_ERRORS = new Set([
  'Verification code not found',
  'Verification code has expired',
  'Invalid verification code',
])

export const verificationController = {
  verifyEmail: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { user } = req as AuthRequest

      const { code } = req.body as VerifyEmailBody

      await verificationService.verifyEmail(user.id, code)

      return res.status(200).json({
        message: 'Email verified successfully',
      })
    } catch (error: unknown) {
      if (error instanceof Error && VERIFICATION_ERRORS.has(error.message)) {
        return res.status(400).json({
          message: error.message,
        })
      }

      next(error)
    }
  },

  resendVerification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { user } = req as AuthRequest

      await verificationService.resendVerificationCode(user.id)

      return res.status(200).json({
        message: 'Verification code sent successfully',
      })
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        return next(error)
      }

      if (error.message === 'Email is already verified') {
        return res.status(409).json({
          message: error.message,
        })
      }

      if (error.message === 'User not found') {
        return res.status(404).json({
          message: error.message,
        })
      }

      if (error.message.startsWith('Please wait')) {
        return res.status(429).json({
          message: error.message,
        })
      }

      next(error)
    }
  },
}
