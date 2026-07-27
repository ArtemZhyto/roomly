// Types
import { Request, Response, NextFunction } from 'express'

// Services
import { authService } from '@services/auth.service'

// Interfaces
import { Register, Login } from '@ts/interfaces/auth'
import { __COOKIE_OPTION } from '@configs/config'

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
      res.clearCookie('refreshToken', __COOKIE_OPTION)
      res.clearCookie('accessToken', __COOKIE_OPTION)

      return res.sendStatus(200)
    } catch (err: any) {
      next(err)
    }
  },
}
