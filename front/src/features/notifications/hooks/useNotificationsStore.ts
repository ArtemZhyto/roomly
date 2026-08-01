'use client'

// Modules
import { useCallback, useEffect, useMemo, useState } from 'react'

// API
import { getNotifications } from '../api/notifications-api'

// Hooks
import useNotificationDeleteActions from './useNotificationDeleteActions'
import useNotificationReadActions from './useNotificationReadActions'

// Types
import type { AppNotification, CreateNotificationInput } from '../types/notification.types'

// Utils
import { getNotificationErrorMessage } from '../utils/getNotificationErrorMessage'
import { mapNotification } from '../utils/mapNotification'

interface UseNotificationsStoreParams {
  notify: (input: CreateNotificationInput) => string
}

interface UseNotificationsStoreResult {
  notifications: AppNotification[]
  unreadCount: number
  isLoading: boolean
  errorMessage: string | null

  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>

  addNotification: (notification: AppNotification) => void
  removeNotification: (id: number) => Promise<void>
  clearNotifications: () => Promise<void>

  retry: () => Promise<void>
}

const MAX_STORED_NOTIFICATIONS = 50

const useNotificationsStore = ({
  notify,
}: UseNotificationsStoreParams): UseNotificationsStoreResult => {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadNotifications = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await getNotifications()

      setNotifications(response.map(mapNotification))
    } catch (error: unknown) {
      setErrorMessage(getNotificationErrorMessage(error, 'Could not load notifications.'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadNotifications()
  }, [loadNotifications])

  const addNotification = useCallback((notification: AppNotification): void => {
    setNotifications((currentNotifications) => {
      const alreadyExists = currentNotifications.some((currentNotification) => {
        return currentNotification.id === notification.id
      })

      if (alreadyExists) {
        return currentNotifications
      }

      return [notification, ...currentNotifications].slice(0, MAX_STORED_NOTIFICATIONS)
    })
  }, [])

  const { markAsRead, markAllAsRead } = useNotificationReadActions({
    setNotifications,
    notify,
  })

  const { removeNotification, clearNotifications } = useNotificationDeleteActions({
    setNotifications,
    notify,
  })

  const unreadCount = useMemo(() => {
    return notifications.reduce((count, notification) => {
      return notification.isRead ? count : count + 1
    }, 0)
  }, [notifications])

  return {
    notifications,
    unreadCount,
    isLoading,
    errorMessage,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    retry: loadNotifications,
  }
}

export default useNotificationsStore
