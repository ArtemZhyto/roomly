// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validateRegisterForm } from '@features/auth/lib/register/validate-register-form'

// Types
import type { RegisterValues } from '@features/auth/types/register.types'

const VALID_VALUES: RegisterValues = {
  name: 'Integration User',
  email: 'integration.user@roomly.dev',
  password: 'TestPassword123',
  confirmPassword: 'TestPassword123',
  acceptedTerms: true,
}

describe('validateRegisterForm', () => {
  it('returns no errors for valid values', () => {
    expect(validateRegisterForm(VALID_VALUES)).toEqual({})
  })

  it('requires a name', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        name: '',
      }),
    ).toMatchObject({
      name: 'Name is required.',
    })
  })

  it('requires a valid email', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        email: 'invalid-email',
      }),
    ).toMatchObject({
      email: 'Enter a valid email address.',
    })
  })

  it('requires a password', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        password: '',
        confirmPassword: '',
      }),
    ).toMatchObject({
      password: 'Password is required.',
      confirmPassword: 'Confirm your password.',
    })
  })

  it('rejects a short password', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        password: '1234567',
        confirmPassword: '1234567',
      }),
    ).toMatchObject({
      password: 'Password must contain at least 8 characters.',
    })
  })

  it('rejects mismatching passwords', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        confirmPassword: 'DifferentPassword123',
      }),
    ).toMatchObject({
      confirmPassword: 'Passwords do not match.',
    })
  })

  it('requires acceptance of legal documents', () => {
    expect(
      validateRegisterForm({
        ...VALID_VALUES,
        acceptedTerms: false,
      }),
    ).toMatchObject({
      acceptedTerms: 'You must accept the Terms and Privacy Policy.',
    })
  })

  it('returns all validation errors together', () => {
    expect(
      validateRegisterForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
      }),
    ).toEqual({
      name: 'Name is required.',
      email: 'Email address is required.',
      password: 'Password is required.',
      confirmPassword: 'Confirm your password.',
      acceptedTerms: 'You must accept the Terms and Privacy Policy.',
    })
  })
})
