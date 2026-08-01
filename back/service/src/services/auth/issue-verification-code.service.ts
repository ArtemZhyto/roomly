// Configs
import { env, isProduction, prisma } from '@configs/index'

// Helpers
import { generateVerificationCode, hashVerificationCode } from './verification-code'

const HOURS_TO_MILLISECONDS = 60 * 60 * 1000

const getVerificationExpirationDate = (): Date => {
  return new Date(Date.now() + env.emailVerificationExpiresHours * HOURS_TO_MILLISECONDS)
}

const logVerificationCode = (email: string, verificationCode: string): void => {
  if (isProduction) {
    return
  }

  console.log(`[Email verification] ${email}: ${verificationCode}`)
}

export const issueVerificationCode = async (userId: number, email: string): Promise<void> => {
  const verificationCode = generateVerificationCode()
  const codeHash = hashVerificationCode(verificationCode)
  const expiresAt = getVerificationExpirationDate()

  await prisma.emailVerificationCode.upsert({
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

  logVerificationCode(email, verificationCode)
}
