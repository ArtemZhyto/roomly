'use client'

// Modules
import { useState, type FormEvent } from 'react'

import { useRouter } from 'next/navigation'

// API
import { register } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Hooks
import usePasswordVisibility from './usePasswordVisibility'
import useRegisterFormState from './useRegisterFormState'

// Lib
import { mapRegisterApiErrors, REGISTER_SESSION_ERROR, validateRegisterForm } from '../lib/register'

// Lib
import normalizeEmail from '../lib/normalizeEmail'

const useRegisterForm = () => {
  const router = useRouter()

  const { refreshUser } = useAuth()

  const { values, errors, handleChange, setErrors, clearErrors } = useRegisterFormState()

  const { isVisible: isPasswordVisible, toggleVisibility: togglePasswordVisibility } =
    usePasswordVisibility()

  const { isVisible: isConfirmPasswordVisible, toggleVisibility: toggleConfirmPasswordVisibility } =
    usePasswordVisibility()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const validationErrors = validateRegisterForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setIsSubmitting(true)
    clearErrors()

    try {
      await register({
        name: values.name.trim(),
        email: normalizeEmail(values.email),
        password: values.password,
        confirmPassword: values.confirmPassword,
      })

      const currentUser = await refreshUser()

      if (!currentUser) {
        setErrors({
          form: REGISTER_SESSION_ERROR,
        })

        return
      }

      router.replace('/verify-email')
      router.refresh()
    } catch (error: unknown) {
      setErrors(mapRegisterApiErrors(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isPasswordVisible,
    isConfirmPasswordVisible,
    isSubmitting,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}

export default useRegisterForm
