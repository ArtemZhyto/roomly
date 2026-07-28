import normalizeEmail from './normalizeEmail'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Name is required.'
  }

  return undefined
}

export const validateEmail = (email: string): string | undefined => {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    return 'Email address is required.'
  }

  if (!emailPattern.test(normalizedEmail)) {
    return 'Enter a valid email address.'
  }

  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required.'
  }

  if (password.length < 8) {
    return 'Password must contain at least 8 characters.'
  }

  if (password.length > 72) {
    return 'Password must contain no more than 72 characters.'
  }

  return undefined
}

export const validateConfirmedPassword = (
  password: string,
  confirmedPassword: string,
): string | undefined => {
  if (!confirmedPassword) {
    return 'Confirm your password.'
  }

  if (confirmedPassword !== password) {
    return 'Passwords do not match.'
  }

  return undefined
}
