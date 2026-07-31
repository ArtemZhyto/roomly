// Types
import type { AppNotification, BackendNotificationResponse } from '../types/notification.types'

export const mapNotification = (notification: BackendNotificationResponse): AppNotification => {
  return {
    id: notification.id,
    type: 'warning',
    title: 'Booking ending soon',
    message: notification.message,
    createdAt: notification.createdAt,
    isRead: notification.readAt !== null,
  }
}
