// Modules
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
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

describe('RegisterForm behaviour', () => {
  beforeEach(() => {
    handleChangeMock.mockClear()
    handleSubmitMock.mockClear()
    togglePasswordVisibilityMock.mockClear()
    toggleConfirmPasswordVisibilityMock.mockClear()

    handleSubmitMock.mockResolvedValue(undefined)

    useRegisterFormMock.mockReturnValue(createRegisterFormState())
  })

  it('passes name changes to the form hook', () => {
    render(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: {
        name: 'name',
        value: 'Alex Morgan',
      },
    })

    expect(handleChangeMock).toHaveBeenCalledTimes(1)
  })

  it('passes checkbox changes to the form hook', () => {
    render(<RegisterForm />)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(handleChangeMock).toHaveBeenCalledTimes(1)
  })

  it('submits the form through the hook', () => {
    render(<RegisterForm />)

    const submitButton = screen.getByRole('button', {
      name: 'Create account',
    })

    const form = submitButton.closest('form')

    expect(form).not.toBeNull()

    fireEvent.submit(form!)

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('toggles password visibility', () => {
    render(<RegisterForm />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show password',
      }),
    )

    expect(togglePasswordVisibilityMock).toHaveBeenCalledTimes(1)
  })

  it('toggles confirmed-password visibility', () => {
    render(<RegisterForm />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show confirmed password',
      }),
    )

    expect(toggleConfirmPasswordVisibilityMock).toHaveBeenCalledTimes(1)
  })

  it('shows registration errors', () => {
    useRegisterFormMock.mockReturnValue({
      ...createRegisterFormState(),

      errors: {
        name: 'Name is required.',
        email: 'Email address is required.',
        password: 'Password is required.',
        confirmPassword: 'Confirm your password.',
        acceptedTerms: 'You must accept the Terms and Privacy Policy.',
        form: 'Could not create your account.',
      },
    })

    render(<RegisterForm />)

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email address is required.')).toBeInTheDocument()
    expect(screen.getByText('Could not create your account.')).toBeInTheDocument()
  })

  it('disables the button while submitting', () => {
    useRegisterFormMock.mockReturnValue({
      ...createRegisterFormState(),
      isSubmitting: true,
    })

    render(<RegisterForm />)

    expect(
      screen.getByRole('button', {
        name: 'Creating account...',
      }),
    ).toBeDisabled()
  })
})
