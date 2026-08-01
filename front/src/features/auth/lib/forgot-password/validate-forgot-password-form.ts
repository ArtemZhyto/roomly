// Lib
import { validateEmail } from '../authValidation'

// Types
import type { ForgotPasswordErrors, ForgotPasswordValues } from '../../types/forgotPassword.types'

export const validateForgotPasswordForm = (values: ForgotPasswordValues): ForgotPasswordErrors => {
  const errors: ForgotPasswordErrors = {}

  const emailError = validateEmail(values.email)

  if (emailError) {
    errors.email = emailError
  }

  return errors
}
