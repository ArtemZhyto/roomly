// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { ForgotPasswordErrors } from '../../types/forgotPassword.types'

// Constants
import { DEFAULT_FORGOT_PASSWORD_ERROR } from './forgot-password-form.constants'

export const mapForgotPasswordApiErrors = (error: unknown): ForgotPasswordErrors => {
  const normalizedError = normalizeApiError(error)

  const emailError = normalizedError.fieldErrors.email?.[0]

  return {
    email: emailError,

    form: emailError ? undefined : normalizedError.message || DEFAULT_FORGOT_PASSWORD_ERROR,
  }
}
