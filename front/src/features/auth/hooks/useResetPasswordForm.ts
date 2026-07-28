'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// Lib
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
      // TODO: Send the new password to the auth API.
      await new Promise((resolve) => setTimeout(resolve, 600))

      setIsSuccess(true)
    } catch {
      setErrors({
        form: 'We couldn’t reset your password. Please request a new reset link.',
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

export default useResetPasswordForm
