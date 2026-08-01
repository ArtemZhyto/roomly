// Types
import type { NextFunction, Request, Response } from 'express'

// Configs
import { prisma } from '@configs/index'

// Errors
import { UnauthorizedError } from '@errors/index'

// Helpers
import { setAuthCookies } from '@helpers/auth-cookies'

// Services
import { accountService } from '@services/auth'

// Interfaces
import type { AuthRequest } from '@services/auth'

// Validation types
import type { LoginBody, RegisterBody } from '@validation/auth'

export const accountController = {
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as RegisterBody

      const tokens = await accountService.register(data)

      setAuthCookies(res, tokens)

      res.sendStatus(201)
    } catch (error: unknown) {
      next(error)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as LoginBody

      const tokens = await accountService.login(data)

      setAuthCookies(res, tokens)

      res.sendStatus(200)
    } catch (error: unknown) {
      next(error)
    }
  },

  me: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req as AuthRequest

      const foundUser = await prisma.user.findUnique({
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
        throw new UnauthorizedError()
      }

      res.status(200).json(foundUser)
    } catch (error: unknown) {
      next(error)
    }
  },
}
