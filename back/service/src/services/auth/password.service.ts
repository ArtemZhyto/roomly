// Modules
import bcrypt from 'bcrypt'

// Configs
import { env, isProduction, prisma } from '@configs/index'

// Helpers
import { generatePasswordResetToken, hashPasswordResetToken } from '@helpers/password-reset'

// Types
import type { ForgotPasswordData, ResetPasswordData } from './auth.types'

const PASSWORD_HASH_ROUNDS = 11
const MINUTE_IN_MILLISECONDS = 60_000
const SECOND_IN_MILLISECONDS = 1_000

const getPasswordResetExpirationDate = (): Date => {
  return new Date(Date.now() + env.passwordResetTokenTtlMinutes * MINUTE_IN_MILLISECONDS)
}

const isResetRequestOnCooldown = (createdAt: Date): boolean => {
  const cooldownEndsAt =
    createdAt.getTime() + env.passwordResetResendCooldownSeconds * SECOND_IN_MILLISECONDS

  return Date.now() < cooldownEndsAt
}

const createPasswordResetUrl = (token: string): string => {
  const resetUrl = new URL('/reset-password', env.frontendUrl)

  resetUrl.searchParams.set('token', token)

  return resetUrl.toString()
}

const logPasswordResetUrl = (email: string, resetUrl: string): void => {
  if (isProduction) {
    return
  }

  console.log(`[Password reset] ${email}: ${resetUrl}`)
}

export const passwordService = {
  forgotPassword: async (data: ForgotPasswordData): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },

      select: {
        id: true,
        email: true,

        passwordResetTokens: {
          where: {
            usedAt: null,
          },

          orderBy: {
            createdAt: 'desc',
          },

          take: 1,

          select: {
            createdAt: true,
          },
        },
      },
    })

    if (!user) {
      return
    }

    const latestToken = user.passwordResetTokens[0]

    if (latestToken && isResetRequestOnCooldown(latestToken.createdAt)) {
      return
    }

    const token = generatePasswordResetToken()
    const tokenHash = hashPasswordResetToken(token)

    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({
        where: {
          userId: user.id,
          usedAt: null,
        },
      }),

      prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,

          expiresAt: getPasswordResetExpirationDate(),
        },
      }),
    ])

    const resetUrl = createPasswordResetUrl(token)

    logPasswordResetUrl(user.email, resetUrl)
  },

  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    const tokenHash = hashPasswordResetToken(data.token)

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },

      select: {
        id: true,
        userId: true,
        expiresAt: true,
        usedAt: true,
      },
    })

    if (!resetToken) {
      throw new Error('Invalid password reset token')
    }

    if (resetToken.usedAt) {
      throw new Error('Password reset token has already been used')
    }

    if (resetToken.expiresAt <= new Date()) {
      throw new Error('Password reset token has expired')
    }

    const passwordHash = await bcrypt.hash(data.password, PASSWORD_HASH_ROUNDS)

    const usedAt = new Date()

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: resetToken.userId,
        },

        data: {
          passwordHash,
        },
      }),

      prisma.passwordResetToken.update({
        where: {
          id: resetToken.id,
        },

        data: {
          usedAt,
        },
      }),

      prisma.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,

          id: {
            not: resetToken.id,
          },
        },
      }),
    ])
  },
}
