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

export interface NotificationsContextValue {
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
