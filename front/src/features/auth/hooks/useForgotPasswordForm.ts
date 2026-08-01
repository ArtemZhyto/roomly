'use client'

// Modules
import { useState, type FormEvent } from 'react'

// API
import { forgotPassword } from '../api'

// Hooks
import useCooldown from './useCooldown'
import useForgotPasswordFormState from './useForgotPasswordFormState'

// Lib
import normalizeEmail from '../lib/normalizeEmail'

import { mapForgotPasswordApiErrors, validateForgotPasswordForm } from '../lib/forgot-password'

const useForgotPasswordForm = () => {
  const { values, errors, isSent, handleChange, setErrors, clearErrors, markAsSent } =
    useForgotPasswordFormState()

  const { cooldown, isCoolingDown, startCooldown } = useCooldown()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isSubmitting || isCoolingDown) {
      return
    }

    const validationErrors = validateForgotPasswordForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setIsSubmitting(true)
    clearErrors()

    try {
      const response = await forgotPassword({
        email: normalizeEmail(values.email),
      })

      markAsSent()

      startCooldown(response.retryAfterSeconds)
    } catch (error: unknown) {
      setErrors(mapForgotPasswordApiErrors(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    isSent,
    cooldown,
    handleChange,
    handleSubmit,
  }
}

export default useForgotPasswordForm
