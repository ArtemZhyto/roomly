'use client'

// Modules
import { useCallback, type Dispatch, type SetStateAction } from 'react'

// API
import { markAllNotificationsAsRead, markNotificationAsRead } from '../api/notifications-api'

// Types
import type { AppNotification, CreateNotificationInput } from '../types/notification.types'

// Utils
import { getNotificationErrorMessage } from '../utils/getNotificationErrorMessage'

interface UseNotificationReadActionsParams {
  setNotifications: Dispatch<SetStateAction<AppNotification[]>>
  notify: (input: CreateNotificationInput) => string
}

interface UseNotificationReadActionsResult {
  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>
}

const useNotificationReadActions = ({
  setNotifications,
  notify,
}: UseNotificationReadActionsParams): UseNotificationReadActionsResult => {
  const markAsRead = useCallback(
    async (id: number): Promise<void> => {
      let shouldUpdate = false

      setNotifications((currentNotifications) => {
        const currentNotification = currentNotifications.find((notification) => {
          return notification.id === id
        })

        if (!currentNotification || currentNotification.isRead) {
          return currentNotifications
        }

        shouldUpdate = true

        return currentNotifications.map((notification) => {
          if (notification.id !== id) {
            return notification
          }

          return {
            ...notification,
            isRead: true,
          }
        })
      })

      if (!shouldUpdate) {
        return
      }

      try {
        await markNotificationAsRead(id)
      } catch (error: unknown) {
        setNotifications((currentNotifications) => {
          return currentNotifications.map((notification) => {
            if (notification.id !== id) {
              return notification
            }

            return {
              ...notification,
              isRead: false,
            }
          })
        })

        notify({
          type: 'error',
          title: 'Could not update notification',

          message: getNotificationErrorMessage(error, 'Could not mark the notification as read.'),
        })
      }
    },
    [notify, setNotifications],
  )

  const markAllAsRead = useCallback(async (): Promise<void> => {
    const unreadNotificationIds = new Set<number>()

    setNotifications((currentNotifications) => {
      return currentNotifications.map((notification) => {
        if (!notification.isRead) {
          unreadNotificationIds.add(notification.id)
        }

        return {
          ...notification,
          isRead: true,
        }
      })
    })

    if (unreadNotificationIds.size === 0) {
      return
    }

    try {
      await markAllNotificationsAsRead()
    } catch (error: unknown) {
      setNotifications((currentNotifications) => {
        return currentNotifications.map((notification) => {
          if (!unreadNotificationIds.has(notification.id)) {
            return notification
          }

          return {
            ...notification,
            isRead: false,
          }
        })
      })

      notify({
        type: 'error',
        title: 'Could not update notifications',

        message: getNotificationErrorMessage(error, 'Could not mark all notifications as read.'),
      })
    }
  }, [notify, setNotifications])

  return {
    markAsRead,
    markAllAsRead,
  }
}

export default useNotificationReadActions
