// Modules
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals'
import type { ChangeEvent } from 'react'

// Hooks
import useRegisterFormState from '@features/auth/hooks/useRegisterFormState'

const createInputEvent = ({
  name,
  value = '',
  type = 'text',
  checked = false,
}: {
  name: string
  value?: string
  type?: string
  checked?: boolean
}): ChangeEvent<HTMLInputElement> => {
  return {
    target: {
      name,
      value,
      type,
      checked,
    },
  } as ChangeEvent<HTMLInputElement>
}

describe('useRegisterFormState', () => {
  it('returns the initial registration values', () => {
    const { result } = renderHook(() => useRegisterFormState())

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    })

    expect(result.current.errors).toEqual({})
  })

  it('updates a text field', () => {
    const { result } = renderHook(() => useRegisterFormState())

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'name',
          value: 'Alex Morgan',
        }),
      )
    })

    expect(result.current.values.name).toBe('Alex Morgan')
  })

  it('updates the legal agreement checkbox', () => {
    const { result } = renderHook(() => useRegisterFormState())

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'acceptedTerms',
          type: 'checkbox',
          checked: true,
        }),
      )
    })

    expect(result.current.values.acceptedTerms).toBe(true)
  })

  it('clears the changed field and form errors', () => {
    const { result } = renderHook(() => useRegisterFormState())

    act(() => {
      result.current.setErrors({
        name: 'Name is required.',
        email: 'Email is required.',
        form: 'Registration failed.',
      })
    })

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'name',
          value: 'Alex Morgan',
        }),
      )
    })

    expect(result.current.errors).toEqual({
      name: undefined,
      email: 'Email is required.',
      form: undefined,
    })
  })

  it('clears all errors', () => {
    const { result } = renderHook(() => useRegisterFormState())

    act(() => {
      result.current.setErrors({
        email: 'Email is required.',
        form: 'Registration failed.',
      })
    })

    act(() => {
      result.current.clearErrors()
    })

    expect(result.current.errors).toEqual({})
  })
})
