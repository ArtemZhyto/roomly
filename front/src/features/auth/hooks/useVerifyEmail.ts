'use client'

// Modules
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'

// API
import { resendVerification, verifyEmail } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Lib
import { normalizeApiError } from '@lib/api'

// Types
import type { VerificationStatus } from '../types/verification.types'

const CODE_PATTERN = /^\d{6}$/
const DEFAULT_RESEND_COOLDOWN_SECONDS = 60
const COOLDOWN_MESSAGE_PATTERN = /please wait (\d+) seconds?/i

const getCooldownFromMessage = (message: string): number | null => {
  const match = message.match(COOLDOWN_MESSAGE_PATTERN)

  if (!match) {
    return null
  }

  const seconds = Number(match[1])

  return Number.isFinite(seconds) && seconds > 0 ? seconds : null
}

const useVerifyEmail = () => {
  const { refreshUser } = useAuth()

  const [code, setCode] = useState('')
  const [status, setStatus] = useState<VerificationStatus>('idle')

  const [error, setError] = useState<string>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)

  const [cooldown, setCooldown] = useState(DEFAULT_RESEND_COOLDOWN_SECONDS)

  useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setCooldown((currentCooldown) => {
        if (currentCooldown <= 1) {
          window.clearInterval(timer)

          return 0
        }

        return currentCooldown - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [cooldown])

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextCode = event.target.value.replace(/\D/g, '').slice(0, 6)

    setCode(nextCode)
    setError(undefined)
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
      await verifyEmail({
        code,
      })

      await refreshUser()

      setStatus('success')
    } catch (requestError: unknown) {
      const apiError = normalizeApiError(requestError)

      setError(apiError.message || 'We couldn’t verify your email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resendVerificationEmail = async () => {
    if (isResending || cooldown > 0) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setError(undefined)

    try {
      await resendVerification()

      setIsResent(true)
      setCooldown(DEFAULT_RESEND_COOLDOWN_SECONDS)
    } catch (requestError: unknown) {
      const apiError = normalizeApiError(requestError)

      const serverCooldown = getCooldownFromMessage(apiError.message)

      if (serverCooldown !== null) {
        setCooldown(serverCooldown)
        return
      }

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
    cooldown,
    handleCodeChange,
    handleSubmit,
    resendVerificationEmail,
  }
}

export default useVerifyEmail
