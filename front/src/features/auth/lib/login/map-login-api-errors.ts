// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { LoginErrors } from '../../types/login.types'

// Constants
import { DEFAULT_LOGIN_ERROR, INVALID_LOGIN_CREDENTIALS_ERROR } from './login-form.constants'

export const mapLoginApiErrors = (error: unknown): LoginErrors => {
  const apiError = normalizeApiError(error)

  const emailError = apiError.fieldErrors.email?.[0]
  const passwordError = apiError.fieldErrors.password?.[0]
  const hasFieldErrors = Boolean(emailError || passwordError)

  return {
    email: emailError,
    password: passwordError,

    form: hasFieldErrors
      ? undefined
      : apiError.status === 401
        ? INVALID_LOGIN_CREDENTIALS_ERROR
        : apiError.message || DEFAULT_LOGIN_ERROR,
  }
}
