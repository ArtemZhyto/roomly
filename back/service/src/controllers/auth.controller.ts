// Types
import { Request, Response, NextFunction } from 'express'

// Services
import { authService } from '@services/auth.service'

// Helpers
import { createTokens } from '@helpers/createTokens'

// Interfaces
import { Register, Login, Payload, AuthRequest } from '@ts/interfaces/auth'
import __PRISMA, { __COOKIE_OPTION } from '@configs/config'
import jwt from 'jsonwebtoken'

const REFRESH_SECRET = process.env.REFRESH_SECRET

if (!REFRESH_SECRET) {
  throw new Error('REFRESH_SECRET is not configured')
}

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Register = req.body
      const { accessToken, refreshToken } = await authService.register(data)

      res.cookie('refreshToken', refreshToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.REFRESH_AGE),
      })

      res.cookie('accessToken', accessToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.ACCESS_AGE),
      })

      return res.sendStatus(201)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'User with this email already exists') {
        return res.status(409).json({
          message: err.message,
          errors: {
            email: ['This email is already in use'],
          },
        })
      }

      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Login = req.body
      const { accessToken, refreshToken } = await authService.login(data)

      res.cookie('refreshToken', refreshToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.REFRESH_AGE),
      })

      res.cookie('accessToken', accessToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.ACCESS_AGE),
      })

      return res.sendStatus(200)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Invalid email or password') {
        return res.status(401).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('refreshToken', { ...__COOKIE_OPTION })
      res.clearCookie('accessToken', { ...__COOKIE_OPTION })

      return res.sendStatus(200)
    } catch (err: unknown) {
      next(err)
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.signedCookies.refreshToken

      if (!refreshToken) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const verifyData = jwt.verify(refreshToken, REFRESH_SECRET) as Payload

      const user = await __PRISMA.user.findUnique({
        where: {
          id: verifyData.id,
        },
        select: {
          id: true,
          email: true,
        },
      })

      if (!user) {
        res.clearCookie('refreshToken', { ...__COOKIE_OPTION })
        res.clearCookie('accessToken', { ...__COOKIE_OPTION })

        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createTokens({
        id: user.id,
        email: user.email,
      })

      res.cookie('refreshToken', newRefreshToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.REFRESH_AGE),
      })

      res.cookie('accessToken', newAccessToken, {
        ...__COOKIE_OPTION,
        maxAge: Number(process.env.ACCESS_AGE),
      })

      return res.sendStatus(200)
    } catch (err: unknown) {
      if (err instanceof jwt.JsonWebTokenError) {
        res.clearCookie('refreshToken', { ...__COOKIE_OPTION })
        res.clearCookie('accessToken', { ...__COOKIE_OPTION })

        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      next(err)
    }
  },

  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      const foundUser = await __PRISMA.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerifiedAt: true,
        },
      })

      if (!foundUser) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      return res.status(200).json(foundUser)
    } catch (err: unknown) {
      next(err)
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest
      const { code } = req.body

      await authService.verifyEmail(user.id, code)

      return res.status(200).json({
        message: 'Email verified successfully',
      })
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.message === 'Verification code not found' ||
          err.message === 'Verification code has expired' ||
          err.message === 'Invalid verification code')
      ) {
        return res.status(400).json({
          message: err.message,
        })
      }

      next(err)
    }
  },

  resendVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as AuthRequest

      await authService.resendVerificationCode(user.id)

      return res.status(200).json({
        message: 'Verification code sent successfully',
      })
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Email is already verified') {
        return res.status(409).json({
          message: err.message,
        })
      }

      if (err instanceof Error && err.message === 'User not found') {
        return res.status(404).json({
          message: err.message,
        })
      }

      if (err instanceof Error && err.message.startsWith('Please wait')) {
        return res.status(429).json({
          message: err.message,
        })
      }

      next(err)
    }
  },
}
