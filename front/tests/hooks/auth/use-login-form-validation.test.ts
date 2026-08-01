// Modules
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { ChangeEvent, FormEvent } from 'react'

// API
import { login } from '@features/auth/api'

// Hooks
import useLoginForm from '@features/auth/hooks/useLoginForm'
import useLoginFormState from '@features/auth/hooks/useLoginFormState'
import usePasswordVisibility from '@features/auth/hooks/usePasswordVisibility'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Types
import type { AuthUser } from '@features/auth/api'
import type { LoginErrors } from '@features/auth/types/login.types'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}))

jest.mock('@features/auth/api')
jest.mock('@providers/AuthProvider')
jest.mock('@features/auth/hooks/useLoginFormState')
jest.mock('@features/auth/hooks/usePasswordVisibility')

const loginMock = jest.mocked(login)
const useAuthMock = jest.mocked(useAuth)

const useLoginFormStateMock = jest.mocked(useLoginFormState)
const usePasswordVisibilityMock = jest.mocked(usePasswordVisibility)

const setErrorsMock = jest.fn<(errors: LoginErrors) => void>()
const clearErrorsMock = jest.fn<() => void>()
const handleChangeMock = jest.fn<(event: ChangeEvent<HTMLInputElement>) => void>()

const toggleVisibilityMock = jest.fn<() => void>()
const hidePasswordMock = jest.fn<() => void>()

const refreshUserMock = jest.fn<() => Promise<AuthUser | null>>()
const clearUserMock = jest.fn<() => void>()

const createSubmitEvent = (): FormEvent<HTMLFormElement> => {
  return {
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>
}

describe('useLoginForm validation', () => {
  beforeEach(() => {
    loginMock.mockReset()
    setErrorsMock.mockReset()
    clearErrorsMock.mockReset()
    handleChangeMock.mockReset()
    toggleVisibilityMock.mockReset()
    hidePasswordMock.mockReset()
    refreshUserMock.mockReset()
    clearUserMock.mockReset()

    useAuthMock.mockReturnValue({
      user: null,
      status: 'unauthenticated',
      isLoading: false,
      isAuthenticated: false,
      refreshUser: refreshUserMock,
      clearUser: clearUserMock,
    })

    usePasswordVisibilityMock.mockReturnValue({
      isVisible: false,
      toggleVisibility: toggleVisibilityMock,
      hidePassword: hidePasswordMock,
    })
  })

  it('returns state from related hooks', () => {
    useLoginFormStateMock.mockReturnValue({
      values: {
        email: '',
        password: '',
        remember: false,
      },

      errors: {},

      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    const { result } = renderHook(() => useLoginForm())

    expect(result.current.values).toEqual({
      email: '',
      password: '',
      remember: false,
    })

    expect(result.current.errors).toEqual({})
    expect(result.current.isPasswordVisible).toBe(false)
    expect(result.current.handleChange).toBe(handleChangeMock)
    expect(result.current.togglePasswordVisibility).toBe(toggleVisibilityMock)
  })

  it('prevents submission with invalid values', async () => {
    useLoginFormStateMock.mockReturnValue({
      values: {
        email: '',
        password: '',
        remember: false,
      },

      errors: {},

      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(setErrorsMock).toHaveBeenCalledWith({
      email: 'Email address is required.',
      password: 'Password is required.',
    })

    expect(clearErrorsMock).not.toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()
  })

  it('prevents default form submission', async () => {
    useLoginFormStateMock.mockReturnValue({
      values: {
        email: '',
        password: '',
        remember: false,
      },

      errors: {},

      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    const event = createSubmitEvent()

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(event)
    })

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
