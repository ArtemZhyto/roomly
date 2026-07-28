'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// Lib
import { validateEmail } from '../lib/authValidation'
import normalizeEmail from '../lib/normalizeEmail'

// Types
import type { ForgotPasswordErrors, ForgotPasswordValues } from '../types/forgotPassword.types'

const initialValues: ForgotPasswordValues = {
  email: '',
}

const useForgotPasswordForm = () => {
  const router = useRouter()

  const [values, setValues] = useState<ForgotPasswordValues>(initialValues)

  const [errors, setErrors] = useState<ForgotPasswordErrors>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

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

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const email = normalizeEmail(values.email)

      // TODO: Send password reset request to the API.
      await new Promise((resolve) => setTimeout(resolve, 600))

      router.push(`/check-email?email=${encodeURIComponent(email)}`)
    } catch {
      setErrors({
        form: 'We couldn’t send the reset email. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}

export default useForgotPasswordForm
