// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ChangeEvent, FormEvent } from 'react'

// Components
import LoginForm from '@features/auth/components/LoginForm/LoginForm'

// Hooks
import useLoginForm from '@features/auth/hooks/useLoginForm'

jest.mock('@features/auth/hooks/useLoginForm')

const useLoginFormMock = jest.mocked(useLoginForm)

const handleChangeMock = jest.fn<(event: ChangeEvent<HTMLInputElement>) => void>()
const handleSubmitMock = jest.fn<(event: FormEvent<HTMLFormElement>) => Promise<void>>()
const togglePasswordVisibilityMock = jest.fn<() => void>()

const createLoginFormState = () => ({
  values: {
    email: '',
    password: '',
    remember: false,
  },

  errors: {},

  isPasswordVisible: false,
  isSubmitting: false,

  handleChange: handleChangeMock,
  handleSubmit: handleSubmitMock,

  togglePasswordVisibility: togglePasswordVisibilityMock,
})

describe('LoginForm behaviour', () => {
  beforeEach(() => {
    handleChangeMock.mockClear()
    handleSubmitMock.mockClear()
    togglePasswordVisibilityMock.mockClear()

    handleSubmitMock.mockResolvedValue(undefined)

    useLoginFormMock.mockReturnValue(createLoginFormState())
  })

  it('passes email changes to the form hook', () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: {
        name: 'email',
        value: 'user@roomly.dev',
      },
    })

    expect(handleChangeMock).toHaveBeenCalledTimes(1)
  })

  it('passes password changes to the form hook', () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText('Password'), {
      target: {
        name: 'password',
        value: 'TestPassword123',
      },
    })

    expect(handleChangeMock).toHaveBeenCalledTimes(1)
  })

  it('submits the form through the hook', () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', {
      name: 'Sign in',
    })

    const form = submitButton.closest('form')

    expect(form).not.toBeNull()

    fireEvent.submit(form!)

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('toggles password visibility', () => {
    render(<LoginForm />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show password',
      }),
    )

    expect(togglePasswordVisibilityMock).toHaveBeenCalledTimes(1)
  })

  it('shows field and form errors', () => {
    useLoginFormMock.mockReturnValue({
      ...createLoginFormState(),

      errors: {
        email: 'Enter a valid email address.',
        password: 'Password is required.',
        form: 'Invalid email or password.',
      },
    })

    render(<LoginForm />)

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument()
  })

  it('disables the button while submitting', () => {
    useLoginFormMock.mockReturnValue({
      ...createLoginFormState(),
      isSubmitting: true,
    })

    render(<LoginForm />)

    expect(
      screen.getByRole('button', {
        name: 'Signing in...',
      }),
    ).toBeDisabled()
  })
})
