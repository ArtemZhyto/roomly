'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// API
import { register } from '../api'
import { useAuth } from '@providers/AuthProvider'

// Lib
import { normalizeApiError } from '@lib/api'
import {
  validateConfirmedPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../lib/authValidation'

// Types
import type { RegisterErrors, RegisterValues } from '../types/register.types'

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

const DEFAULT_REGISTER_ERROR = 'We couldn’t create your account. Please try again.'

const useRegisterForm = () => {
  const router = useRouter()
  const { refreshUser } = useAuth()

  const [values, setValues] = useState<RegisterValues>(initialValues)
  const [errors, setErrors] = useState<RegisterErrors>({})

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
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

  const validate = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {}

    const nameError = validateName(values.name)

    if (nameError) {
      nextErrors.name = nameError
    }

    const emailError = validateEmail(values.email)

    if (emailError) {
      nextErrors.email = emailError
    }

    const passwordError = validatePassword(values.password)

    if (passwordError) {
      nextErrors.password = passwordError
    }

    const confirmPasswordError = validateConfirmedPassword(values.password, values.confirmPassword)

    if (confirmPasswordError) {
      nextErrors.confirmPassword = confirmPasswordError
    }

    if (!values.acceptedTerms) {
      nextErrors.acceptedTerms = 'You must accept the Terms and Privacy Policy.'
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
      const email = values.email.trim().toLowerCase()

      await register({
        name: values.name.trim(),
        email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })

      const currentUser = await refreshUser()

      if (!currentUser) {
        setErrors({
          form: 'Account was created, but the session could not be restored.',
        })

        return
      }

      router.replace(`/verify-email?email=${encodeURIComponent(email)}`)
      router.refresh()
    } catch (error) {
      const apiError = normalizeApiError(error)

      const nameError = apiError.fieldErrors.name?.[0]

      const emailError = apiError.fieldErrors.email?.[0]

      const passwordError = apiError.fieldErrors.password?.[0]

      const confirmPasswordError = apiError.fieldErrors.confirmPassword?.[0]

      const hasFieldErrors = Boolean(
        nameError || emailError || passwordError || confirmPasswordError,
      )

      setErrors({
        name: nameError,
        email:
          emailError ?? (apiError.status === 409 ? 'This email is already in use.' : undefined),
        password: passwordError,
        confirmPassword: confirmPasswordError,
        form: hasFieldErrors ? undefined : apiError.message || DEFAULT_REGISTER_ERROR,
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
