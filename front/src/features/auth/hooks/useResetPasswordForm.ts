'use client'

// Modules
import { useState, type FormEvent } from 'react'

import { useRouter } from 'next/navigation'

// API
import { resetPassword } from '../api'

// Hooks
import usePasswordVisibility from './usePasswordVisibility'
import useResetPasswordFormState from './useResetPasswordFormState'

// Lib
import {
  mapResetPasswordApiErrors,
  MISSING_RESET_PASSWORD_TOKEN_ERROR,
  validateResetPasswordForm,
} from '../lib/reset-password'

const useResetPasswordForm = (token?: string) => {
  const router = useRouter()

  const { values, errors, handleChange, setErrors, clearErrors } = useResetPasswordFormState()

  const { isVisible: isPasswordVisible, toggleVisibility: togglePasswordVisibility } =
    usePasswordVisibility()

  const {
    isVisible: isConfirmPasswordVisible,

    toggleVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordVisibility()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!token) {
      setErrors({
        form: MISSING_RESET_PASSWORD_TOKEN_ERROR,
      })

      return
    }

    const validationErrors = validateResetPasswordForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setIsSubmitting(true)
    clearErrors()

    try {
      await resetPassword({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })

      setIsSuccess(true)
    } catch (error: unknown) {
      setErrors(mapResetPasswordApiErrors(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToSignIn = (): void => {
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

export default useResetPasswordForm
