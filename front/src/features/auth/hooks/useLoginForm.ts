'use client'

// Modules
import { useState, type FormEvent } from 'react'

import { useRouter } from 'next/navigation'

// API
import { login } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Hooks
import useLoginFormState from './useLoginFormState'
import usePasswordVisibility from './usePasswordVisibility'

// Lib
import normalizeEmail from '../lib/normalizeEmail'

import { LOGIN_SESSION_ERROR, mapLoginApiErrors, validateLoginForm } from '../lib/login'

const useLoginForm = () => {
  const router = useRouter()

  const { refreshUser } = useAuth()

  const { values, errors, handleChange, setErrors, clearErrors } = useLoginFormState()

  const { isVisible: isPasswordVisible, toggleVisibility: togglePasswordVisibility } =
    usePasswordVisibility()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const validationErrors = validateLoginForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setIsSubmitting(true)
    clearErrors()

    try {
      await login({
        email: normalizeEmail(values.email),

        password: values.password,
      })

      const currentUser = await refreshUser()

      if (!currentUser) {
        setErrors({
          form: LOGIN_SESSION_ERROR,
        })

        return
      }

      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      setErrors(mapLoginApiErrors(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isPasswordVisible,
    isSubmitting,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  }
}

export default useLoginForm
