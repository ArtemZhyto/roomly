// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import type { ChangeEvent, FormEvent } from 'react'

// Components
import RegisterForm from '@features/auth/components/RegisterForm/RegisterForm'

// Hooks
import useRegisterForm from '@features/auth/hooks/useRegisterForm'

jest.mock('@features/auth/hooks/useRegisterForm')

const useRegisterFormMock = jest.mocked(useRegisterForm)

const handleChangeMock = jest.fn<(event: ChangeEvent<HTMLInputElement>) => void>()
const handleSubmitMock = jest.fn<(event: FormEvent<HTMLFormElement>) => Promise<void>>()
const togglePasswordVisibilityMock = jest.fn<() => void>()
const toggleConfirmPasswordVisibilityMock = jest.fn<() => void>()

const createRegisterFormState = () => ({
  values: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  },

  errors: {},

  isPasswordVisible: false,
  isConfirmPasswordVisible: false,
  isSubmitting: false,

  handleChange: handleChangeMock,
  handleSubmit: handleSubmitMock,

  togglePasswordVisibility: togglePasswordVisibilityMock,
  toggleConfirmPasswordVisibility: toggleConfirmPasswordVisibilityMock,
})

describe('RegisterForm rendering', () => {
  beforeEach(() => {
    handleChangeMock.mockClear()
    handleSubmitMock.mockClear()
    togglePasswordVisibilityMock.mockClear()
    toggleConfirmPasswordVisibilityMock.mockClear()

    handleSubmitMock.mockResolvedValue(undefined)

    useRegisterFormMock.mockReturnValue(createRegisterFormState())
  })

  it('renders the create-account heading', () => {
    render(<RegisterForm />)

    expect(
      screen.getByRole('heading', {
        name: 'Create account',
      }),
    ).toBeInTheDocument()
  })

  it('renders all registration fields', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()
  })

  it('renders the legal agreement checkbox', () => {
    render(<RegisterForm />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders Terms and Privacy links', () => {
    render(<RegisterForm />)

    expect(
      screen.getByRole('link', {
        name: 'Terms',
      }),
    ).toHaveAttribute('href', '/terms')

    expect(
      screen.getByRole('link', {
        name: 'Privacy Policy',
      }),
    ).toHaveAttribute('href', '/privacy')
  })

  it('renders the login link', () => {
    render(<RegisterForm />)

    expect(
      screen.getByRole('link', {
        name: 'Sign in',
      }),
    ).toHaveAttribute('href', '/login')
  })
})
