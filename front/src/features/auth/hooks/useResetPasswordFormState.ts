'use client'

// Modules
import { useCallback, useState, type ChangeEvent } from 'react'

// Lib
import { INITIAL_RESET_PASSWORD_VALUES } from '../lib/reset-password'

// Types
import type { ResetPasswordErrors, ResetPasswordValues } from '../types/resetPassword.types'

interface UseResetPasswordFormStateResult {
  values: ResetPasswordValues
  errors: ResetPasswordErrors

  handleChange: (event: ChangeEvent<HTMLInputElement>) => void

  setErrors: (errors: ResetPasswordErrors) => void

  clearErrors: () => void
}

const useResetPasswordFormState = (): UseResetPasswordFormStateResult => {
  const [values, setValues] = useState<ResetPasswordValues>(INITIAL_RESET_PASSWORD_VALUES)

  const [errors, setErrors] = useState<ResetPasswordErrors>({})

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
  }, [])

  const clearErrors = useCallback((): void => {
    setErrors({})
  }, [])

  return {
    values,
    errors,
    handleChange,
    setErrors,
    clearErrors,
  }
}

export default useResetPasswordFormState
