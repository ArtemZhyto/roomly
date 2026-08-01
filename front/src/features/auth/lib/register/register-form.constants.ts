// Types
import type { RegisterValues } from '../../types/register.types'

export const INITIAL_REGISTER_VALUES: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

export const DEFAULT_REGISTER_ERROR = 'We couldn’t create your account. Please try again.'
export const REGISTER_SESSION_ERROR = 'Account was created, but the session could not be restored.'
