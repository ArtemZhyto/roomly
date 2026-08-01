interface PrismaErrorLike {
  code?: unknown
  meta?: {
    code?: unknown
    driverAdapterError?: {
      cause?: {
        code?: unknown
        originalCode?: unknown
      }
    }
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

export const isPrismaErrorWithCode = (error: unknown, code: string): boolean => {
  if (!isObject(error)) {
    return false
  }

  return error.code === code
}

export const isPostgresErrorWithCode = (error: unknown, code: string): boolean => {
  if (!isObject(error)) {
    return false
  }

  const prismaError = error as PrismaErrorLike

  const cause = prismaError.meta?.driverAdapterError?.cause

  return prismaError.meta?.code === code || cause?.code === code || cause?.originalCode === code
}
