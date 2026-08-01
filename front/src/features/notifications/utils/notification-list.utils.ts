// Types
import type { AppNotification } from '../types/notification.types'

export const sortNotificationsByCreatedAt = (
  notifications: AppNotification[],
): AppNotification[] => {
  return [...notifications].sort((firstNotification, secondNotification) => {
    return (
      new Date(secondNotification.createdAt).getTime() -
      new Date(firstNotification.createdAt).getTime()
    )
  })
}

export const restoreNotification = (
  notifications: AppNotification[],
  notificationToRestore: AppNotification,
  index: number,
): AppNotification[] => {
  const alreadyExists = notifications.some((notification) => {
    return notification.id === notificationToRestore.id
  })

  if (alreadyExists) {
    return notifications
  }

  const restoredNotifications = [...notifications]

  restoredNotifications.splice(Math.max(0, index), 0, notificationToRestore)

  return restoredNotifications
}

export const restoreNotifications = (
  notifications: AppNotification[],
  notificationsToRestore: AppNotification[],
): AppNotification[] => {
  const currentNotificationIds = new Set(notifications.map((notification) => notification.id))

  const missingNotifications = notificationsToRestore.filter((notification) => {
    return !currentNotificationIds.has(notification.id)
  })

  return sortNotificationsByCreatedAt([...notifications, ...missingNotifications])
}
