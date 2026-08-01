// Lib
import { validateConfirmedPassword, validatePassword } from '../authValidation'

// Types
import type { ResetPasswordErrors, ResetPasswordValues } from '../../types/resetPassword.types'

export const validateResetPasswordForm = (values: ResetPasswordValues): ResetPasswordErrors => {
  const errors: ResetPasswordErrors = {}

  const passwordError = validatePassword(values.password)

  if (passwordError) {
    errors.password = passwordError
  }

  const confirmPasswordError = validateConfirmedPassword(values.password, values.confirmPassword)

  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError
  }

  return errors
}
