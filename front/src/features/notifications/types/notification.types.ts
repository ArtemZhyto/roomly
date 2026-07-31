export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface BackendNotificationResponse {
  id: number
  userId: number
  currentBookingId: number
  nextBookingId: number
  message: string
  readAt: string | null
  createdAt: string
}

export interface AppNotification {
  id: number
  type: NotificationType
  title: string
  message: string
  createdAt: string
  isRead: boolean
}

export interface ToastNotification {
  id: string
  type: NotificationType
  title: string
  message?: string
  createdAt: string
  duration: number
}

export interface CreateNotificationInput {
  type: NotificationType
  title: string
  message?: string
  duration?: number
}
