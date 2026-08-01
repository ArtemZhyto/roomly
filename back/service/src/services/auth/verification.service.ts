// Configs
import { env, prisma } from '@configs/index'

// Services
import { issueVerificationCode } from './issue-verification-code.service'

// Helpers
import { hashVerificationCode } from './verification-code'

const getRetryAfterSeconds = (createdAt: Date): number => {
  const cooldownEndsAt = createdAt.getTime() + env.emailVerificationResendCooldownSeconds * 1000

  return Math.ceil((cooldownEndsAt - Date.now()) / 1000)
}

export const verificationService = {
  verifyEmail: async (userId: number, code: string): Promise<void> => {
    const verification = await prisma.emailVerificationCode.findUnique({
      where: {
        userId,
      },

      select: {
        codeHash: true,
        expiresAt: true,
      },
    })

    if (!verification) {
      throw new Error('Verification code not found')
    }

    if (verification.expiresAt <= new Date()) {
      throw new Error('Verification code has expired')
    }

    const codeHash = hashVerificationCode(code)

    if (verification.codeHash !== codeHash) {
      throw new Error('Invalid verification code')
    }

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          emailVerifiedAt: new Date(),
        },
      }),

      prisma.emailVerificationCode.delete({
        where: {
          userId,
        },
      }),
    ])
  },

  resendVerificationCode: async (userId: number): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        email: true,
        emailVerifiedAt: true,

        verificationCode: {
          select: {
            createdAt: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (user.emailVerifiedAt) {
      throw new Error('Email is already verified')
    }

    if (user.verificationCode) {
      const retryAfterSeconds = getRetryAfterSeconds(user.verificationCode.createdAt)

      if (retryAfterSeconds > 0) {
        throw new Error(`Please wait ${retryAfterSeconds} seconds before requesting another code`)
      }
    }

    await issueVerificationCode(userId, user.email)
  },
}
