'use client'

// Modules
import { useCallback, type Dispatch, type SetStateAction } from 'react'

// API
import { deleteAllNotifications, deleteNotification } from '../api/notifications-api'

// Types
import type { AppNotification, CreateNotificationInput } from '../types/notification.types'

// Utils
import { getNotificationErrorMessage } from '../utils/getNotificationErrorMessage'
import { restoreNotification, restoreNotifications } from '../utils/notification-list.utils'

interface UseNotificationDeleteActionsParams {
  setNotifications: Dispatch<SetStateAction<AppNotification[]>>
  notify: (input: CreateNotificationInput) => string
}

interface UseNotificationDeleteActionsResult {
  removeNotification: (id: number) => Promise<void>
  clearNotifications: () => Promise<void>
}

const useNotificationDeleteActions = ({
  setNotifications,
  notify,
}: UseNotificationDeleteActionsParams): UseNotificationDeleteActionsResult => {
  const removeNotification = useCallback(
    async (id: number): Promise<void> => {
      let removedNotification: AppNotification | undefined

      let removedIndex = -1

      setNotifications((currentNotifications) => {
        removedIndex = currentNotifications.findIndex((notification) => {
          return notification.id === id
        })

        if (removedIndex === -1) {
          return currentNotifications
        }

        removedNotification = currentNotifications[removedIndex]

        return currentNotifications.filter((notification) => {
          return notification.id !== id
        })
      })

      if (!removedNotification) {
        return
      }

      try {
        await deleteNotification(id)
      } catch (error: unknown) {
        const notificationToRestore = removedNotification

        setNotifications((currentNotifications) => {
          return restoreNotification(currentNotifications, notificationToRestore, removedIndex)
        })

        notify({
          type: 'error',
          title: 'Could not remove notification',

          message: getNotificationErrorMessage(error, 'Could not remove the notification.'),
        })
      }
    },
    [notify, setNotifications],
  )

  const clearNotifications = useCallback(async (): Promise<void> => {
    let removedNotifications: AppNotification[] = []

    setNotifications((currentNotifications) => {
      removedNotifications = currentNotifications

      return []
    })

    if (removedNotifications.length === 0) {
      return
    }

    try {
      await deleteAllNotifications()
    } catch (error: unknown) {
      setNotifications((currentNotifications) => {
        return restoreNotifications(currentNotifications, removedNotifications)
      })

      notify({
        type: 'error',
        title: 'Could not clear notifications',

        message: getNotificationErrorMessage(error, 'Could not clear notifications.'),
      })
    }
  }, [notify, setNotifications])

  return {
    removeNotification,
    clearNotifications,
  }
}

export default useNotificationDeleteActions
