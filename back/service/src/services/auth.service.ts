// Configs
import __PRISMA from '@configs/config'

// Modules
import bcrypt from 'bcrypt'

// Interfaces
import { Register, Login } from '@ts/interfaces/auth'

// Helpers
import { createTokens } from '@helpers/createTokens'
import { createPasswordResetToken, hashPasswordResetToken } from '@helpers/passwordReset'

// Mails
import { createEmailVerificationCode } from '@mails/createEmailVerificationCode'
import { hashVerificationCode } from '@mails/emailVerification'

const RESEND_COOLDOWN_SECONDS = Number(process.env.EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS || 60)
const PASSWORD_RESET_RESEND_COOLDOWN_SECONDS = Number(
  process.env.PASSWORD_RESET_RESEND_COOLDOWN_SECONDS || 60,
)

const PASSWORD_RESET_TOKEN_TTL_MINUTES = Number(process.env.PASSWORD_RESET_TOKEN_TTL_MINUTES || 30)

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3030'

interface ForgotPasswordData {
  email: string
}

interface ResetPasswordData {
  token: string
  password: string
}

export const authService = {
  register: async (data: Register) => {
    const existingUser = await __PRISMA.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const passwordHash = await bcrypt.hash(data.password, 11)

    const user = await __PRISMA.user.create({
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

    await createEmailVerificationCode(user.id, user.email)

    const { accessToken, refreshToken } = createTokens({
      id: user.id,
      email: user.email,
    })

    return {
      accessToken,
      refreshToken,
    }
  },

  login: async (data: Login) => {
    const user = await __PRISMA.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const { accessToken, refreshToken } = createTokens({
      id: user.id,
      email: user.email,
    })

    return {
      accessToken,
      refreshToken,
    }
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<void> => {
    const user = await __PRISMA.user.findUnique({
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

    if (latestToken) {
      const cooldownEndsAt =
        latestToken.createdAt.getTime() + PASSWORD_RESET_RESEND_COOLDOWN_SECONDS * 1000

      if (Date.now() < cooldownEndsAt) {
        return
      }
    }

    const token = createPasswordResetToken()
    const tokenHash = hashPasswordResetToken(token)

    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MINUTES * 60 * 1000)

    await __PRISMA.$transaction([
      __PRISMA.passwordResetToken.deleteMany({
        where: {
          userId: user.id,
          usedAt: null,
        },
      }),

      __PRISMA.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      }),
    ])

    const resetUrl = `${FRONTEND_URL}/reset-password?token=` + encodeURIComponent(token)

    if (process.env.MODE === 'dev') {
      console.log(`[Password reset] ${user.email}: ${resetUrl}`)
    }
  },

  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    const tokenHash = hashPasswordResetToken(data.token)

    const resetToken = await __PRISMA.passwordResetToken.findUnique({
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

    const passwordHash = await bcrypt.hash(data.password, 11)
    const usedAt = new Date()

    await __PRISMA.$transaction([
      __PRISMA.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          passwordHash,
        },
      }),

      __PRISMA.passwordResetToken.update({
        where: {
          id: resetToken.id,
        },
        data: {
          usedAt,
        },
      }),

      __PRISMA.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,
          id: {
            not: resetToken.id,
          },
        },
      }),
    ])
  },

  verifyEmail: async (userId: number, code: string) => {
    const verification = await __PRISMA.emailVerificationCode.findUnique({
      where: {
        userId,
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

    await __PRISMA.$transaction([
      __PRISMA.user.update({
        where: {
          id: userId,
        },
        data: {
          emailVerifiedAt: new Date(),
        },
      }),

      __PRISMA.emailVerificationCode.delete({
        where: {
          userId,
        },
      }),
    ])
  },

  resendVerificationCode: async (userId: number) => {
    const user = await __PRISMA.user.findUnique({
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
      const cooldownEndsAt =
        user.verificationCode.createdAt.getTime() + RESEND_COOLDOWN_SECONDS * 1000

      if (Date.now() < cooldownEndsAt) {
        const retryAfter = Math.ceil((cooldownEndsAt - Date.now()) / 1000)

        throw new Error(`Please wait ${retryAfter} seconds before requesting another code`)
      }
    }

    await createEmailVerificationCode(userId, user.email)
  },
}
