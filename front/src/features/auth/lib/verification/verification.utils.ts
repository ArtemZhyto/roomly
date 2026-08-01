// Constants
import { RESEND_COOLDOWN_MESSAGE_PATTERN, VERIFICATION_CODE_LENGTH } from './verification.constants'

export const normalizeVerificationCode = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, VERIFICATION_CODE_LENGTH)
}

export const getVerificationCooldown = (message: string): number | null => {
  const match = message.match(RESEND_COOLDOWN_MESSAGE_PATTERN)

  if (!match) {
    return null
  }

  const seconds = Number(match[1])

  if (!Number.isFinite(seconds) || seconds <= 0) {
    return null
  }

  return Math.ceil(seconds)
}
