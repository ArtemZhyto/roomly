// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validateConfirmedPassword } from '@features/auth/lib/authValidation'

describe('validateConfirmedPassword', () => {
  it('accepts matching passwords', () => {
    expect(validateConfirmedPassword('TestPassword123', 'TestPassword123')).toBeUndefined()
  })

  it('rejects an empty confirmation', () => {
    expect(validateConfirmedPassword('TestPassword123', '')).toBe('Confirm your password.')
  })

  it('rejects mismatching passwords', () => {
    expect(validateConfirmedPassword('TestPassword123', 'DifferentPassword123')).toBe(
      'Passwords do not match.',
    )
  })

  it('compares passwords with exact casing', () => {
    expect(validateConfirmedPassword('TestPassword123', 'testpassword123')).toBe(
      'Passwords do not match.',
    )
  })
})
