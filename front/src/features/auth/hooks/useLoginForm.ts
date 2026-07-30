'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// API
import { login } from '../api'
import { useAuth } from '@providers/AuthProvider'

// Lib
import { normalizeApiError } from '@lib/api'
import { validateEmail } from '../lib/authValidation'

// Types
import type { LoginErrors, LoginValues } from '../types/login.types'

const initialValues: LoginValues = {
  email: '',
  password: '',
  remember: false,
}

const DEFAULT_LOGIN_ERROR = 'We couldn’t sign you in. Check your details and try again.'

const useLoginForm = () => {
  const router = useRouter()
  const { refreshUser } = useAuth()

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

    if (isSubmitting) {
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
      await login({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })

      const currentUser = await refreshUser()

      if (!currentUser) {
        setErrors({
          form: 'Session could not be restored. Please try again.',
        })

        return
      }

      router.replace('/dashboard')
      router.refresh()
    } catch (error) {
      const apiError = normalizeApiError(error)

      const emailError = apiError.fieldErrors.email?.[0]
      const passwordError = apiError.fieldErrors.password?.[0]

      setErrors({
        email: emailError,
        password: passwordError,
        form:
          emailError || passwordError
            ? undefined
            : apiError.status === 401
              ? 'Invalid email or password.'
              : apiError.message || DEFAULT_LOGIN_ERROR,
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
