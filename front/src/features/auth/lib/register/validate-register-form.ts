// Lib
import {
  validateConfirmedPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../authValidation'

// Types
import type { RegisterErrors, RegisterValues } from '../../types/register.types'

export const validateRegisterForm = (values: RegisterValues): RegisterErrors => {
  const errors: RegisterErrors = {}

  const nameError = validateName(values.name)

  if (nameError) {
    errors.name = nameError
  }

  const emailError = validateEmail(values.email)

  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validatePassword(values.password)

  if (passwordError) {
    errors.password = passwordError
  }

  const confirmPasswordError = validateConfirmedPassword(values.password, values.confirmPassword)

  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = 'You must accept the Terms and Privacy Policy.'
  }

  return errors
}
