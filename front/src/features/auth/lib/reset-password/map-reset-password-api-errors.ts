// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { ResetPasswordErrors } from '../../types/resetPassword.types'

// Constants
import { DEFAULT_RESET_PASSWORD_ERROR } from './reset-password-form.constants'

const getResetPasswordErrorMessage = (message: string): string => {
  switch (message) {
    case 'Invalid password reset token':
      return 'This password reset link is invalid.'

    case 'Password reset token has expired':
      return 'This password reset link has expired. Please request a new one.'

    case 'Password reset token has already been used':
      return 'This password reset link has already been used. Please request a new one.'

    default:
      return DEFAULT_RESET_PASSWORD_ERROR
  }
}

export const mapResetPasswordApiErrors = (error: unknown): ResetPasswordErrors => {
  const normalizedError = normalizeApiError(error)

  const passwordError = normalizedError.fieldErrors.password?.[0]
  const confirmPasswordError = normalizedError.fieldErrors.confirmPassword?.[0]
  const hasFieldErrors = Boolean(passwordError || confirmPasswordError)

  return {
    password: passwordError,
    confirmPassword: confirmPasswordError,

    form: hasFieldErrors ? undefined : getResetPasswordErrorMessage(normalizedError.message),
  }
}
