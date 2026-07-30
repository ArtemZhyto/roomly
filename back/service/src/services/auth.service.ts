// Configs
import __PRISMA from '@configs/config'

// Modules
import bcrypt from 'bcrypt'

// Interfaces
import { Register, Login } from '@ts/interfaces/auth'

// Helpers
import { createTokens } from '@helpers/createTokens'

// Mails
import { createEmailVerificationCode } from '@mails/createEmailVerificationCode'
import { hashVerificationCode } from '@mails/emailVerification'

const RESEND_COOLDOWN_SECONDS = Number(process.env.EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS || 60)

export const authService = {
  register: async (data: Register) => {
    const existingUser = await __PRISMA.user.findUnique({
      where: { email: data.email },
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
      email: data.email,
    })

    return {
      accessToken,
      refreshToken,
    }
  },

  login: async (data: Login) => {
    const user = await __PRISMA.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const { accessToken, refreshToken } = await createTokens({
      id: user.id,
      email: user.email,
    })

    return { accessToken, refreshToken }
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
