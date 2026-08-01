// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validateLoginForm } from '@features/auth/lib/login/validate-login-form'

// Types
import type { LoginValues } from '@features/auth/types/login.types'

const VALID_VALUES: LoginValues = {
  email: 'user@roomly.dev',
  password: 'TestPassword123',
  remember: false,
}

describe('validateLoginForm', () => {
  it('returns no errors for valid values', () => {
    expect(validateLoginForm(VALID_VALUES)).toEqual({})
  })

  it('requires an email address', () => {
    expect(
      validateLoginForm({
        ...VALID_VALUES,
        email: '',
      }),
    ).toEqual({
      email: 'Email address is required.',
    })
  })

  it('rejects an invalid email address', () => {
    expect(
      validateLoginForm({
        ...VALID_VALUES,
        email: 'invalid-email',
      }),
    ).toEqual({
      email: 'Enter a valid email address.',
    })
  })

  it('requires a password', () => {
    expect(
      validateLoginForm({
        ...VALID_VALUES,
        password: '',
      }),
    ).toEqual({
      password: 'Password is required.',
    })
  })

  it('returns email and password errors together', () => {
    expect(
      validateLoginForm({
        email: '',
        password: '',
        remember: true,
      }),
    ).toEqual({
      email: 'Email address is required.',
      password: 'Password is required.',
    })
  })

  it('does not validate the remember value', () => {
    expect(
      validateLoginForm({
        ...VALID_VALUES,
        remember: true,
      }),
    ).toEqual({})
  })
})
