'use client'

// Modules
import { useCallback, useState } from 'react'

// Types
import type { CreateNotificationInput, ToastNotification } from '../types/notification.types'

// Utils
import { createToastId } from '../utils/createToastId'

const DEFAULT_TOAST_DURATION = 4500

interface UseNotificationToastsResult {
  toasts: ToastNotification[]

  notify: (input: CreateNotificationInput) => string

  dismissToast: (id: string) => void
}

const useNotificationToasts = (): UseNotificationToastsResult => {
  const [toasts, setToasts] = useState<ToastNotification[]>([])

  const dismissToast = useCallback((id: string): void => {
    setToasts((currentToasts) => {
      return currentToasts.filter((toast) => toast.id !== id)
    })
  }, [])

  const notify = useCallback(
    ({
      type,
      title,
      message,
      duration = DEFAULT_TOAST_DURATION,
    }: CreateNotificationInput): string => {
      const id = createToastId()

      const toast: ToastNotification = {
        id,
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
        duration,
      }

      setToasts((currentToasts) => [...currentToasts, toast])

      return id
    },
    [],
  )

  return {
    toasts,
    notify,
    dismissToast,
  }
}

export default useNotificationToasts
