// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
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

describe('LoginForm rendering', () => {
  beforeEach(() => {
    handleChangeMock.mockClear()
    handleSubmitMock.mockClear()
    togglePasswordVisibilityMock.mockClear()

    handleSubmitMock.mockResolvedValue(undefined)

    useLoginFormMock.mockReturnValue(createLoginFormState())
  })

  it('renders the sign-in heading', () => {
    render(<LoginForm />)

    expect(
      screen.getByRole('heading', {
        name: 'Sign in',
      }),
    ).toBeInTheDocument()
  })

  it('renders email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<LoginForm />)

    expect(
      screen.getByRole('button', {
        name: 'Sign in',
      }),
    ).toBeEnabled()
  })

  it('renders the forgot-password link', () => {
    render(<LoginForm />)

    expect(
      screen.getByRole('link', {
        name: 'Forgot password?',
      }),
    ).toHaveAttribute('href', '/forgot-password')
  })

  it('renders the registration link', () => {
    render(<LoginForm />)

    expect(
      screen.getByRole('link', {
        name: 'Create account',
      }),
    ).toHaveAttribute('href', '/register')
  })
})
