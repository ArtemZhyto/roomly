export const VERIFICATION_CODE_LENGTH = 6

export const VERIFICATION_CODE_PATTERN = /^\d{6}$/

export const DEFAULT_RESEND_COOLDOWN_SECONDS = 60

export const INVALID_VERIFICATION_CODE_ERROR = 'Enter the 6-digit verification code.'
export const DEFAULT_VERIFICATION_ERROR = 'We couldn’t verify your email. Please try again.'
export const DEFAULT_RESEND_VERIFICATION_ERROR = 'We couldn’t send a new verification code.'
export const RESEND_COOLDOWN_MESSAGE_PATTERN = /please wait (\d+) seconds?/i
