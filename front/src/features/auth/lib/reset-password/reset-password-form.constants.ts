// Types
import type { ResetPasswordValues } from '../../types/resetPassword.types'

export const INITIAL_RESET_PASSWORD_VALUES: ResetPasswordValues = {
  password: '',
  confirmPassword: '',
}

export const MISSING_RESET_PASSWORD_TOKEN_ERROR = 'This password reset link is missing or invalid.'
export const DEFAULT_RESET_PASSWORD_ERROR =
  'We couldn’t reset your password. Please request a new reset link.'
