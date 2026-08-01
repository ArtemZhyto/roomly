// Types
import type { NextFunction, Request, Response } from 'express'

// Helpers
import { clearAuthCookies } from '@helpers/auth-cookies'

// Services
import { passwordService } from '@services/auth'

// Validation types
import type { ForgotPasswordBody, ResetPasswordBody } from '@validation/auth'

const PASSWORD_RESET_ERRORS = new Set([
  'Invalid password reset token',
  'Password reset token has already been used',
  'Password reset token has expired',
])

export const passwordController = {
  forgotPassword: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email } = req.body as ForgotPasswordBody

      await passwordService.forgotPassword({
        email,
      })

      return res.status(200).json({
        message: 'If an account with that email exists, a password reset link has been generated.',

        retryAfterSeconds: 60,
      })
    } catch (error: unknown) {
      next(error)
    }
  },

  resetPassword: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { token, password } = req.body as ResetPasswordBody

      await passwordService.resetPassword({
        token,
        password,
      })

      clearAuthCookies(res)

      return res.status(200).json({
        message: 'Password reset successfully',
      })
    } catch (error: unknown) {
      if (error instanceof Error && PASSWORD_RESET_ERRORS.has(error.message)) {
        return res.status(400).json({
          message: error.message,
        })
      }

      next(error)
    }
  },
}
