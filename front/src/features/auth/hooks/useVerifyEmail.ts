'use client'

// Modules
import { useState, type FormEvent } from 'react'

// API
import { verifyEmail } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Hooks
import useVerificationCode from './useVerificationCode'
import useVerificationResend from './useVerificationResend'

// Lib
import { normalizeApiError } from '@lib/api'

import {
  DEFAULT_VERIFICATION_ERROR,
  INVALID_VERIFICATION_CODE_ERROR,
  VERIFICATION_CODE_PATTERN,
} from '../lib/verification'

// Types
import type { VerificationStatus } from '../types/verification.types'

const useVerifyEmail = () => {
  const { refreshUser } = useAuth()

  const { code, error, handleCodeChange, setError } = useVerificationCode()

  const { isResending, isResent, cooldown, resendVerificationEmail } = useVerificationResend({
    setError,
  })

  const [status, setStatus] = useState<VerificationStatus>('idle')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!VERIFICATION_CODE_PATTERN.test(code)) {
      setError(INVALID_VERIFICATION_CODE_ERROR)

      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      await verifyEmail({
        code,
      })

      await refreshUser()

      setStatus('success')
    } catch (requestError: unknown) {
      const apiError = normalizeApiError(requestError)

      setError(apiError.message || DEFAULT_VERIFICATION_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    code,
    status,
    error,
    isSubmitting,
    isResending,
    isResent,
    cooldown,
    handleCodeChange,
    handleSubmit,
    resendVerificationEmail,
  }
}

export default useVerifyEmail
