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

const replaceMock = jest.fn<(path: string) => void>()
const refreshRouterMock = jest.fn<() => void>()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
    refresh: refreshRouterMock,
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

describe('useLoginForm submission', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useLoginFormStateMock.mockReturnValue({
      values: {
        email: '  USER@ROOMLY.DEV  ',
        password: 'TestPassword123',
        remember: true,
      },
      errors: {},
      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    usePasswordVisibilityMock.mockReturnValue({
      isVisible: false,
      toggleVisibility: toggleVisibilityMock,
      hidePassword: hidePasswordMock,
    })

    useAuthMock.mockReturnValue({
      user: null,
      status: 'unauthenticated',
      isLoading: false,
      isAuthenticated: false,
      refreshUser: refreshUserMock,
      clearUser: clearUserMock,
    })
  })

  it('normalizes email and submits credentials', async () => {
    loginMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(clearErrorsMock).toHaveBeenCalledTimes(1)

    expect(loginMock).toHaveBeenCalledWith({
      email: 'user@roomly.dev',
      password: 'TestPassword123',
    })
  })

  it('redirects after successful login', async () => {
    loginMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(replaceMock).toHaveBeenCalledWith('/dashboard')
    expect(refreshRouterMock).toHaveBeenCalledTimes(1)
  })

  it('shows a session error when refreshUser returns null', async () => {
    loginMock.mockResolvedValue(undefined)
    refreshUserMock.mockResolvedValue(null)

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(setErrorsMock).toHaveBeenCalledWith({
      form: 'Session could not be restored. Please try again.',
    })

    expect(replaceMock).not.toHaveBeenCalled()
  })

  it('returns submitting state to false', async () => {
    loginMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(result.current.isSubmitting).toBe(false)
  })
})
