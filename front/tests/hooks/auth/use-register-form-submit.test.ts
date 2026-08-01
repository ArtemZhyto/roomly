// Modules
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { ChangeEvent, FormEvent } from 'react'

// API
import { register } from '@features/auth/api'

// Hooks
import usePasswordVisibility from '@features/auth/hooks/usePasswordVisibility'
import useRegisterForm from '@features/auth/hooks/useRegisterForm'
import useRegisterFormState from '@features/auth/hooks/useRegisterFormState'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Types
import type { AuthUser } from '@features/auth/api'
import type { RegisterErrors } from '@features/auth/types/register.types'

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
jest.mock('@features/auth/hooks/useRegisterFormState')
jest.mock('@features/auth/hooks/usePasswordVisibility')

const registerMock = jest.mocked(register)
const useAuthMock = jest.mocked(useAuth)
const useRegisterFormStateMock = jest.mocked(useRegisterFormState)
const usePasswordVisibilityMock = jest.mocked(usePasswordVisibility)

const setErrorsMock = jest.fn<(errors: RegisterErrors) => void>()
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

describe('useRegisterForm submission', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRegisterFormStateMock.mockReturnValue({
      values: {
        name: '  Test User  ',
        email: '  USER@ROOMLY.DEV  ',
        password: 'TestPassword123',
        confirmPassword: 'TestPassword123',
        acceptedTerms: true,
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

  it('normalizes registration data before sending it', async () => {
    registerMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useRegisterForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(clearErrorsMock).toHaveBeenCalledTimes(1)

    expect(registerMock).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'user@roomly.dev',
      password: 'TestPassword123',
      confirmPassword: 'TestPassword123',
    })
  })

  it('redirects to email verification after registration', async () => {
    registerMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useRegisterForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(replaceMock).toHaveBeenCalledWith('/verify-email')
    expect(refreshRouterMock).toHaveBeenCalledTimes(1)
  })

  it('shows a session error when refreshUser returns null', async () => {
    registerMock.mockResolvedValue(undefined)
    refreshUserMock.mockResolvedValue(null)

    const { result } = renderHook(() => useRegisterForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(setErrorsMock).toHaveBeenCalledWith({
      form: 'Account was created, but the session could not be restored.',
    })

    expect(replaceMock).not.toHaveBeenCalled()
  })

  it('returns submitting state to false', async () => {
    registerMock.mockResolvedValue(undefined)

    refreshUserMock.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'user@roomly.dev',
      emailVerifiedAt: null,
    })

    const { result } = renderHook(() => useRegisterForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(result.current.isSubmitting).toBe(false)
  })
})
