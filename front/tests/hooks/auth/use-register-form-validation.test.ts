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

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    refresh: jest.fn(),
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

describe('useRegisterForm validation', () => {
  beforeEach(() => {
    registerMock.mockReset()
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

  it('returns both password visibility states', () => {
    useRegisterFormStateMock.mockReturnValue({
      values: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
      },

      errors: {},

      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    usePasswordVisibilityMock
      .mockReturnValueOnce({
        isVisible: true,
        toggleVisibility: toggleVisibilityMock,
        hidePassword: hidePasswordMock,
      })
      .mockReturnValueOnce({
        isVisible: false,
        toggleVisibility: toggleVisibilityMock,
        hidePassword: hidePasswordMock,
      })

    const { result } = renderHook(() => useRegisterForm())

    expect(result.current.isPasswordVisible).toBe(true)
    expect(result.current.isConfirmPasswordVisible).toBe(false)
  })

  it('prevents submission with invalid values', async () => {
    useRegisterFormStateMock.mockReturnValue({
      values: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
      },

      errors: {},

      handleChange: handleChangeMock,
      setErrors: setErrorsMock,
      clearErrors: clearErrorsMock,
    })

    const { result } = renderHook(() => useRegisterForm())

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent())
    })

    expect(setErrorsMock).toHaveBeenCalledWith({
      name: 'Name is required.',
      email: 'Email address is required.',
      password: 'Password is required.',
      confirmPassword: 'Confirm your password.',
      acceptedTerms: 'You must accept the Terms and Privacy Policy.',
    })

    expect(registerMock).not.toHaveBeenCalled()
  })
})
