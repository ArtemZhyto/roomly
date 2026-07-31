'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// API
import { resetPassword } from '../api'

// Lib
import { normalizeApiError } from '@lib/api'
import { validateConfirmedPassword, validatePassword } from '../lib/authValidation'

// Types
import type { ResetPasswordErrors, ResetPasswordValues } from '../types/resetPassword.types'

const initialValues: ResetPasswordValues = {
  password: '',
  confirmPassword: '',
}

const useResetPasswordForm = (token?: string) => {
  const router = useRouter()

  const [values, setValues] = useState<ResetPasswordValues>(initialValues)

  const [errors, setErrors] = useState<ResetPasswordErrors>({})

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }))
  }

  const validate = (): ResetPasswordErrors => {
    const nextErrors: ResetPasswordErrors = {}

    const passwordError = validatePassword(values.password)

    if (passwordError) {
      nextErrors.password = passwordError
    }

    const confirmPasswordError = validateConfirmedPassword(values.password, values.confirmPassword)

    if (confirmPasswordError) {
      nextErrors.confirmPassword = confirmPasswordError
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!token) {
      setErrors({
        form: 'This password reset link is missing or invalid.',
      })

      return
    }

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await resetPassword({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })

      setIsSuccess(true)
    } catch (error: unknown) {
      const normalizedError = normalizeApiError(error)

      setErrors({
        password: normalizedError.fieldErrors.password?.[0],

        confirmPassword: normalizedError.fieldErrors.confirmPassword?.[0],

        form:
          normalizedError.fieldErrors.password?.length ||
          normalizedError.fieldErrors.confirmPassword?.length
            ? undefined
            : getResetPasswordErrorMessage(normalizedError.message),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((currentValue) => !currentValue)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((currentValue) => !currentValue)
  }

  const goToSignIn = () => {
    router.push('/login')
  }

  return {
    values,
    errors,
    isPasswordVisible,
    isConfirmPasswordVisible,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    goToSignIn,
  }
}

const getResetPasswordErrorMessage = (message: string): string => {
  switch (message) {
    case 'Invalid password reset token':
      return 'This password reset link is invalid.'

    case 'Password reset token has expired':
      return 'This password reset link has expired. Please request a new one.'

    case 'Password reset token has already been used':
      return 'This password reset link has already been used. Please request a new one.'

    default:
      return 'We couldn’t reset your password. Please request a new reset link.'
  }
}

export default useResetPasswordForm
