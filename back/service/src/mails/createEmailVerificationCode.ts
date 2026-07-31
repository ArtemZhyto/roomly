// Configs
import __PRISMA from '@configs/config'

// Helpers
import { generateVerificationCode, hashVerificationCode } from '@mails/emailVerification'

const EMAIL_VERIFICATION_EXPIRES_HOURS = Number(process.env.EMAIL_VERIFICATION_EXPIRES_HOURS)
const FRONTEND_URL = process.env.FRONTEND_URL

if (!Number.isInteger(EMAIL_VERIFICATION_EXPIRES_HOURS) || EMAIL_VERIFICATION_EXPIRES_HOURS < 1) {
  throw new Error('EMAIL_VERIFICATION_EXPIRES_HOURS is not configured correctly')
}

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not configured')
}

export const createEmailVerificationCode = async (userId: number, email: string) => {
  const verificationCode = generateVerificationCode()
  const codeHash = hashVerificationCode(verificationCode)

  const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRES_HOURS * 60 * 60 * 1000)

  await __PRISMA.emailVerificationCode.upsert({
    where: {
      userId,
    },
    update: {
      codeHash,
      expiresAt,
      createdAt: new Date(),
    },
    create: {
      userId,
      codeHash,
      expiresAt,
    },
  })

  console.log(`[Email verification] ${email}: ${verificationCode}`)
}
