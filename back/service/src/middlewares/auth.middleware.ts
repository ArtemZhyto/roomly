// Modules
import { ZodError } from 'zod'

// Types
import { Response, Request, NextFunction } from 'express'

// Helpers
import { RegisterSchema, LoginSchema } from '@helpers/authSchemas'

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
}
