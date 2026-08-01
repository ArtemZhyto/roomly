// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validateEmail } from '@features/auth/lib/authValidation'

describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('user@roomly.dev')).toBeUndefined()
  })

  it('accepts surrounding whitespace', () => {
    expect(validateEmail('  user@roomly.dev  ')).toBeUndefined()
  })

  it('accepts uppercase characters', () => {
    expect(validateEmail('USER@ROOMLY.DEV')).toBeUndefined()
  })

  it('rejects an empty email', () => {
    expect(validateEmail('')).toBe('Email address is required.')
  })

  it('rejects a whitespace-only email', () => {
    expect(validateEmail('   ')).toBe('Email address is required.')
  })

  it('rejects an email without an at sign', () => {
    expect(validateEmail('userroomly.dev')).toBe('Enter a valid email address.')
  })

  it('rejects an email without a domain', () => {
    expect(validateEmail('user@')).toBe('Enter a valid email address.')
  })

  it('rejects an email without a domain suffix', () => {
    expect(validateEmail('user@roomly')).toBe('Enter a valid email address.')
  })

  it('rejects internal whitespace', () => {
    expect(validateEmail('user name@roomly.dev')).toBe('Enter a valid email address.')
  })
})
