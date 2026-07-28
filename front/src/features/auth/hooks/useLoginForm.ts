'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Lib
import { validateEmail } from '../lib/authValidation'
// import normalizeEmail from '../lib/normalizeEmail'

// Types
import type { LoginErrors, LoginValues } from '../types/login.types'

const initialValues: LoginValues = {
  email: '',
  password: '',
  remember: false,
}

const useLoginForm = () => {
  const [values, setValues] = useState<LoginValues>(initialValues)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }))
  }

  const validate = (): LoginErrors => {
    const nextErrors: LoginErrors = {}

    const emailError = validateEmail(values.email)

    if (emailError) {
      nextErrors.email = emailError
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
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
      // TODO: Send payload to the login API.
      await new Promise((resolve) => setTimeout(resolve, 600))
    } catch {
      setErrors({
        form: 'We couldn’t sign you in. Check your details and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((currentValue) => !currentValue)
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
