// Types
import type { LoginValues } from '../../types/login.types'

export const INITIAL_LOGIN_VALUES: LoginValues = {
  email: '',
  password: '',
  remember: false,
}

export const DEFAULT_LOGIN_ERROR = 'We couldn’t sign you in. Check your details and try again.'
export const INVALID_LOGIN_CREDENTIALS_ERROR = 'Invalid email or password.'
export const LOGIN_SESSION_ERROR = 'Session could not be restored. Please try again.'
