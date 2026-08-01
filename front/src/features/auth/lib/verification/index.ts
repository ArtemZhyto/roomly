export {
  DEFAULT_RESEND_COOLDOWN_SECONDS,
  DEFAULT_RESEND_VERIFICATION_ERROR,
  DEFAULT_VERIFICATION_ERROR,
  INVALID_VERIFICATION_CODE_ERROR,
  VERIFICATION_CODE_LENGTH,
  VERIFICATION_CODE_PATTERN,
} from './verification.constants'

export { getVerificationCooldown, normalizeVerificationCode } from './verification.utils'