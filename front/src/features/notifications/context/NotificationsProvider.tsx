'use client'

// Modules
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

// Components
import ToastViewport from '../components/ToastViewport'

// API
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../api/notifications-api'

// Lib
import { getSocketClient } from '@lib/socket/socket-client'

// Types
import type {
  AppNotification,
  BackendNotificationResponse,
  CreateNotificationInput,
  ToastNotification,
} from '../types/notification.types'

// Utils
import { mapNotification } from '../utils/mapNotification'

const DEFAULT_TOAST_DURATION = 4500

interface NotificationsContextValue {
  notifications: AppNotification[]
  toasts: ToastNotification[]
  unreadCount: number
  isLoading: boolean
  errorMessage: string | null
  notify: (input: CreateNotificationInput) => string
  dismissToast: (id: string) => void
  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>
  removeNotification: (id: number) => Promise<void>
  clearNotifications: () => Promise<void>
  retry: () => Promise<void>
}

export const NotificationsContext = createContext<NotificationsContextValue | null>(null)

interface NotificationsProviderProps {
  children: React.ReactNode
}

const createToastId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string
          }
        }
      }
    ).response

    if (response?.data?.message) {
      return response.data.message
    }
  }

  return 'Could not load notifications.'
}

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  const [toasts, setToasts] = useState<ToastNotification[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
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

  const loadNotifications = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await getNotifications()

      setNotifications(response.map(mapNotification))
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadNotifications()
  }, [loadNotifications])

  useEffect(() => {
    const socket = getSocketClient()

    const handleNewNotification = (response: BackendNotificationResponse) => {
      const notification = mapNotification(response)

      setNotifications((currentNotifications) => {
        const alreadyExists = currentNotifications.some(
          (currentNotification) => currentNotification.id === notification.id,
        )

        if (alreadyExists) {
          return currentNotifications
        }

        return [notification, ...currentNotifications].slice(0, 50)
      })

      notify({
        type: notification.type,
        title: notification.title,
        message: notification.message,
      })
    }

    socket.on('notification:new', handleNewNotification)

    socket.connect()

    return () => {
      socket.off('notification:new', handleNewNotification)

      socket.disconnect()
    }
  }, [notify])

  const markAsRead = useCallback(
    async (id: number) => {
      const currentNotification = notifications.find((notification) => notification.id === id)

      if (!currentNotification || currentNotification.isRead) {
        return
      }

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      )

      try {
        await markNotificationAsRead(id)
      } catch (error: unknown) {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  isRead: false,
                }
              : notification,
          ),
        )

        notify({
          type: 'error',
          title: 'Could not update notification',
          message: getErrorMessage(error),
        })
      }
    },
    [notifications, notify],
  )

  const markAllAsRead = useCallback(async () => {
    const previousNotifications = notifications

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )

    try {
      await markAllNotificationsAsRead()
    } catch (error: unknown) {
      setNotifications(previousNotifications)

      notify({
        type: 'error',
        title: 'Could not update notifications',
        message: getErrorMessage(error),
      })
    }
  }, [notifications, notify])

  const removeNotification = useCallback(
    async (id: number) => {
      const previousNotifications = notifications

      setNotifications((currentNotifications) =>
        currentNotifications.filter((notification) => notification.id !== id),
      )

      try {
        await deleteNotification(id)
      } catch (error: unknown) {
        setNotifications(previousNotifications)

        notify({
          type: 'error',
          title: 'Could not remove notification',
          message: getErrorMessage(error),
        })
      }
    },
    [notifications, notify],
  )

  const clearNotifications = useCallback(async () => {
    const previousNotifications = notifications

    setNotifications([])

    try {
      await deleteAllNotifications()
    } catch (error: unknown) {
      setNotifications(previousNotifications)

      notify({
        type: 'error',
        title: 'Could not clear notifications',
        message: getErrorMessage(error),
      })
    }
  }, [notifications, notify])

  const unreadCount = useMemo(() => {
    return notifications.filter((notification) => !notification.isRead).length
  }, [notifications])

  const contextValue = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      toasts,
      unreadCount,
      isLoading,
      errorMessage,
      notify,
      dismissToast,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearNotifications,
      retry: loadNotifications,
    }),
    [
      notifications,
      toasts,
      unreadCount,
      isLoading,
      errorMessage,
      notify,
      dismissToast,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearNotifications,
      loadNotifications,
    ],
  )

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}

      <ToastViewport />
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider