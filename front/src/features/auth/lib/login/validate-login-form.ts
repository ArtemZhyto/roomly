// Lib
import { validateEmail } from '../authValidation'

// Types
import type { LoginErrors, LoginValues } from '../../types/login.types'

export const validateLoginForm = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {}

  const emailError = validateEmail(values.email)

  if (emailError) {
    errors.email = emailError
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  }

  return errors
}
