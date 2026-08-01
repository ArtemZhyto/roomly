// Modules
import { describe, expect, it } from '@jest/globals'

// Lib
import { validateName } from '@features/auth/lib/authValidation'

describe('validateName', () => {
  it('accepts a valid name', () => {
    expect(validateName('Artem Zhyto')).toBeUndefined()
  })

  it('accepts a name with surrounding whitespace', () => {
    expect(validateName('  Artem Zhyto  ')).toBeUndefined()
  })

  it('rejects an empty name', () => {
    expect(validateName('')).toBe('Name is required.')
  })

  it('rejects a whitespace-only name', () => {
    expect(validateName('   ')).toBe('Name is required.')
  })
})
