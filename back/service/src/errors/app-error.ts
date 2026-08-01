export interface AppErrorOptions {
  statusCode: number
  message: string
  details?: unknown
}

export class AppError extends Error {
  readonly statusCode: number
  readonly details?: unknown

  constructor({ statusCode, message, details }: AppErrorOptions) {
    super(message)

    this.name = new.target.name
    this.statusCode = statusCode
    this.details = details

    Error.captureStackTrace(this, new.target)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: unknown) {
    super({
      statusCode: 400,
      message,
      details,
    })
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super({
      statusCode: 401,
      message,
    })
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super({
      statusCode: 403,
      message,
    })
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super({
      statusCode: 404,
      message,
    })
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super({
      statusCode: 409,
      message,
      details,
    })
  }
}

export class TooManyRequestsError extends AppError {
  readonly retryAfterSeconds?: number

  constructor(message: string, retryAfterSeconds?: number) {
    super({
      statusCode: 429,
      message,
    })

    this.retryAfterSeconds = retryAfterSeconds
  }
}
