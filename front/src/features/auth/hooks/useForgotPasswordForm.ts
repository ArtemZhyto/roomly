'use client'

// Modules
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'

// API
import { forgotPassword } from '../api'

// Lib
import { normalizeApiError } from '@lib/api'
import { validateEmail } from '../lib/authValidation'
import normalizeEmail from '../lib/normalizeEmail'

// Types
import type { ForgotPasswordErrors, ForgotPasswordValues } from '../types/forgotPassword.types'

const initialValues: ForgotPasswordValues = {
  email: '',
}

const useForgotPasswordForm = () => {
  const [values, setValues] = useState<ForgotPasswordValues>(initialValues)

  const [errors, setErrors] = useState<ForgotPasswordErrors>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setCooldown((currentCooldown) => {
        if (currentCooldown <= 1) {
          window.clearInterval(timer)
          return 0
        }

        return currentCooldown - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [cooldown])

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

    setIsSent(false)
  }

  const validate = (): ForgotPasswordErrors => {
    const nextErrors: ForgotPasswordErrors = {}

    const emailError = validateEmail(values.email)

    if (emailError) {
      nextErrors.email = emailError
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || cooldown > 0) {
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
      const email = normalizeEmail(values.email)

      const response = await forgotPassword({
        email,
      })

      setIsSent(true)
      setCooldown(response.retryAfterSeconds)
    } catch (error: unknown) {
      const normalizedError = normalizeApiError(error)

      setErrors({
        email: normalizedError.fieldErrors.email?.[0],
        form: normalizedError.fieldErrors.email?.length
          ? undefined
          : 'We couldn’t send the reset link. Please try again.',
      })
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
