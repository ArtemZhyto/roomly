'use client'

// Modules
import { type ChangeEvent, type FormEvent, useState } from 'react'

// API
import { resendVerification, verifyEmail } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { VerificationStatus } from '../types/verification.types'

const CODE_PATTERN = /^\d{6}$/

const useVerifyEmail = () => {
  const { refreshUser } = useAuth()

  const [code, setCode] = useState('')
  const [status, setStatus] = useState<VerificationStatus>('idle')

  const [error, setError] = useState<string>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextCode = event.target.value.replace(/\D/g, '').slice(0, 6)

    setCode(nextCode)
    setError(undefined)
    setIsResent(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!CODE_PATTERN.test(code)) {
      setError('Enter the 6-digit verification code.')

      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      await verifyEmail({ code })

      await refreshUser()

      setStatus('success')
    } catch (requestError) {
      const apiError = normalizeApiError(requestError)

      setError(apiError.message || 'We couldn’t verify your email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resendVerificationEmail = async () => {
    if (isResending) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setError(undefined)

    try {
      await resendVerification()

      setIsResent(true)
    } catch (requestError) {
      const apiError = normalizeApiError(requestError)

      setError(apiError.message || 'We couldn’t send a new verification code.')
    } finally {
      setIsResending(false)
    }
  }

  return {
    code,
    status,
    error,
    isSubmitting,
    isResending,
    isResent,
    handleCodeChange,
    handleSubmit,
    resendVerificationEmail,
  }
}

export default useVerifyEmail
