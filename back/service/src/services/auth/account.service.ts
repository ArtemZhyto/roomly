// Modules
import bcrypt from 'bcrypt'
import { Prisma } from '../../../prisma/generated/client'

// Configs
import { prisma } from '@configs/index'

// Errors
import { ConflictError, UnauthorizedError } from '@errors/index'

// Helpers
import { createTokens } from '@helpers/createTokens'

// Services
import { issueVerificationCode } from './issue-verification-code.service'

// Validation types
import type { LoginBody, RegisterBody } from '@validation/auth'

// Types
import type { AuthTokens } from './auth.types'

const PASSWORD_HASH_ROUNDS = 11

interface TokenUser {
  id: number
  email: string
}

const createAuthTokens = (user: TokenUser): AuthTokens => {
  return createTokens({
    id: user.id,
    email: user.email,
  })
}

const isDuplicateEmailError = (error: unknown): boolean => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

const createEmailConflictError = (): ConflictError => {
  return new ConflictError('User with this email already exists', {
    email: ['This email is already in use'],
  })
}

export const accountService = {
  register: async (data: RegisterBody): Promise<AuthTokens> => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },

      select: {
        id: true,
      },
    })

    if (existingUser) {
      throw createEmailConflictError()
    }

    const passwordHash = await bcrypt.hash(data.password, PASSWORD_HASH_ROUNDS)

    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
        },

        select: {
          id: true,
          email: true,
        },
      })

      await issueVerificationCode(user.id, user.email)

      return createAuthTokens(user)
    } catch (error: unknown) {
      if (isDuplicateEmailError(error)) {
        throw createEmailConflictError()
      }

      throw error
    }
  },

  login: async (data: LoginBody): Promise<AuthTokens> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },

      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    })

    if (!user) {
      throw new UnauthorizedError('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password')
    }

    return createAuthTokens(user)
  },
}
