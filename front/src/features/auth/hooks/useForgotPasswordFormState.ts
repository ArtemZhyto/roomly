'use client'

// Modules
import { useCallback, useState, type ChangeEvent } from 'react'

// Lib
import { INITIAL_FORGOT_PASSWORD_VALUES } from '../lib/forgot-password'

// Types
import type { ForgotPasswordErrors, ForgotPasswordValues } from '../types/forgotPassword.types'

interface UseForgotPasswordFormStateResult {
  values: ForgotPasswordValues
  errors: ForgotPasswordErrors
  isSent: boolean

  handleChange: (event: ChangeEvent<HTMLInputElement>) => void

  setErrors: (errors: ForgotPasswordErrors) => void
  clearErrors: () => void

  markAsSent: () => void
}

const useForgotPasswordFormState = (): UseForgotPasswordFormStateResult => {
  const [values, setValues] = useState<ForgotPasswordValues>(INITIAL_FORGOT_PASSWORD_VALUES)
  const [errors, setErrors] = useState<ForgotPasswordErrors>({})

  const [isSent, setIsSent] = useState(false)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      }
    })

    setErrors((currentErrors) => {
      return {
        ...currentErrors,
        [name]: undefined,
        form: undefined,
      }
    })

    setIsSent(false)
  }, [])

  const clearErrors = useCallback((): void => {
    setErrors({})
  }, [])

  const markAsSent = useCallback((): void => {
    setIsSent(true)
  }, [])

  return {
    values,
    errors,
    isSent,
    handleChange,
    setErrors,
    clearErrors,
    markAsSent,
  }
}

export default useForgotPasswordFormState
