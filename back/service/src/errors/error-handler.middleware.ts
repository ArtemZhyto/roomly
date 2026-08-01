// Types
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

// Configs
import { isProduction } from '@configs/index'

// Errors
import { AppError, TooManyRequestsError } from './app-error'

interface ErrorResponse {
  message: string
  details?: unknown
  retryAfterSeconds?: number
  error?: string
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      message: error.message,
    }

    if (error.details !== undefined) {
      response.details = error.details
    }

    if (error instanceof TooManyRequestsError && error.retryAfterSeconds !== undefined) {
      response.retryAfterSeconds = error.retryAfterSeconds
    }

    res.status(error.statusCode).json(response)

    return
  }

  console.error(error)

  const response: ErrorResponse = {
    message: 'Internal Server Error',
  }

  if (!isProduction && error instanceof Error) {
    response.error = error.message
  }

  res.status(500).json(response)
}
