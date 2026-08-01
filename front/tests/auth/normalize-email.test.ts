// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import normalizeEmail from '@features/auth/lib/normalizeEmail'

describe('normalizeEmail', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeEmail('  user@roomly.dev  ')).toBe('user@roomly.dev')
  })

  it('converts the email to lowercase', () => {
    expect(normalizeEmail('User@Roomly.Dev')).toBe('user@roomly.dev')
  })

  it('normalizes casing and whitespace together', () => {
    expect(normalizeEmail('  USER@ROOMLY.DEV  ')).toBe('user@roomly.dev')
  })

  it('returns an empty string for whitespace-only input', () => {
    expect(normalizeEmail('   ')).toBe('')
  })
})
