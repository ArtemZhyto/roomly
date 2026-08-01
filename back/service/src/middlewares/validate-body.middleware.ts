// Modules
import { ZodError, type ZodType } from 'zod'

// Types
import type { NextFunction, Request, RequestHandler, Response } from 'express'

const sendValidationError = (error: ZodError, res: Response): Response => {
  return res.status(400).json({
    message: 'Validation failed',
    errors: error.flatten().fieldErrors,
  })
}

export const validateBody = (schema: ZodType): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body)

      next()
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        sendValidationError(error, res)

        return
      }

      next(error)
    }
  }
}
