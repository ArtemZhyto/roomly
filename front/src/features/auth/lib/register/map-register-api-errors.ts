// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { RegisterErrors } from '../../types/register.types'

// Constants
import { DEFAULT_REGISTER_ERROR } from './register-form.constants'

export const mapRegisterApiErrors = (error: unknown): RegisterErrors => {
  const apiError = normalizeApiError(error)

  const nameError = apiError.fieldErrors.name?.[0]
  const emailError = apiError.fieldErrors.email?.[0]
  const passwordError = apiError.fieldErrors.password?.[0]
  const confirmPasswordError = apiError.fieldErrors.confirmPassword?.[0]
  const hasFieldErrors = Boolean(nameError || emailError || passwordError || confirmPasswordError)

  return {
    name: nameError,
    email: emailError ?? (apiError.status === 409 ? 'This email is already in use.' : undefined),
    password: passwordError,
    confirmPassword: confirmPasswordError,
    form: hasFieldErrors ? undefined : apiError.message || DEFAULT_REGISTER_ERROR,
  }
}
