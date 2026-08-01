'use client'

// Modules
import { useCallback, useState, type ChangeEvent } from 'react'

// Lib
import { INITIAL_LOGIN_VALUES } from '../lib/login'

// Types
import type { LoginErrors, LoginValues } from '../types/login.types'

interface UseLoginFormStateResult {
  values: LoginValues
  errors: LoginErrors

  handleChange: (event: ChangeEvent<HTMLInputElement>) => void

  setErrors: (errors: LoginErrors) => void
  clearErrors: () => void
}

const useLoginFormState = (): UseLoginFormStateResult => {
  const [values, setValues] = useState<LoginValues>(INITIAL_LOGIN_VALUES)

  const [errors, setErrors] = useState<LoginErrors>({})

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    setValues((currentValues) => {
      return {
        ...currentValues,

        [name]: type === 'checkbox' ? checked : value,
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

export default useLoginFormState
