// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validatePassword } from '@features/auth/lib/authValidation'

describe('validatePassword', () => {
  it('accepts a password containing exactly 8 characters', () => {
    expect(validatePassword('12345678')).toBeUndefined()
  })

  it('accepts a password containing exactly 72 characters', () => {
    expect(validatePassword('a'.repeat(72))).toBeUndefined()
  })

  it('rejects an empty password', () => {
    expect(validatePassword('')).toBe('Password is required.')
  })

  it('rejects a password shorter than 8 characters', () => {
    expect(validatePassword('1234567')).toBe('Password must contain at least 8 characters.')
  })

  it('rejects a password longer than 72 characters', () => {
    expect(validatePassword('a'.repeat(73))).toBe(
      'Password must contain no more than 72 characters.',
    )
  })
})
