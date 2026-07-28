'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Lib
import {
  validateConfirmedPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../lib/authValidation'
// import normalizeEmail from '../lib/normalizeEmail'

// Types
import type { RegisterErrors, RegisterValues } from '../types/register.types'

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

const useRegisterForm = () => {
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

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // TODO: Send payload to the registration API.
      await new Promise((resolve) => setTimeout(resolve, 600))
    } catch {
      setErrors({
        form: 'We couldn’t create your account. Please try again.',
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
