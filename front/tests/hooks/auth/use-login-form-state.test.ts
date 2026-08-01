// Modules
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals'
import type { ChangeEvent } from 'react'

// Hooks
import useLoginFormState from '@features/auth/hooks/useLoginFormState'

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

describe('useLoginFormState', () => {
  it('returns the initial login values', () => {
    const { result } = renderHook(() => useLoginFormState())

    expect(result.current.values).toEqual({
      email: '',
      password: '',
      remember: false,
    })

    expect(result.current.errors).toEqual({})
  })

  it('updates a text field', () => {
    const { result } = renderHook(() => useLoginFormState())

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'email',
          value: 'user@roomly.dev',
        }),
      )
    })

    expect(result.current.values.email).toBe('user@roomly.dev')
  })

  it('updates the remember checkbox', () => {
    const { result } = renderHook(() => useLoginFormState())

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'remember',
          type: 'checkbox',
          checked: true,
        }),
      )
    })

    expect(result.current.values.remember).toBe(true)
  })

  it('clears the changed field error', () => {
    const { result } = renderHook(() => useLoginFormState())

    act(() => {
      result.current.setErrors({
        email: 'Invalid email.',
        password: 'Invalid password.',
        form: 'Login failed.',
      })
    })

    act(() => {
      result.current.handleChange(
        createInputEvent({
          name: 'email',
          value: 'user@roomly.dev',
        }),
      )
    })

    expect(result.current.errors).toEqual({
      email: undefined,
      password: 'Invalid password.',
      form: undefined,
    })
  })

  it('clears all errors', () => {
    const { result } = renderHook(() => useLoginFormState())

    act(() => {
      result.current.setErrors({
        email: 'Invalid email.',
        form: 'Login failed.',
      })
    })

    act(() => {
      result.current.clearErrors()
    })

    expect(result.current.errors).toEqual({})
  })
})
