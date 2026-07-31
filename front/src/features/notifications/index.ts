export { default as NotificationsProvider } from './context/NotificationsProvider'

export { default as useNotifications } from './hooks/useNotifications'

export { default as NotificationsView } from './components/NotificationsView'

export {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} from './api/notifications-api'

export type {
  AppNotification,
  BackendNotificationResponse,
  CreateNotificationInput,
  NotificationType,
  ToastNotification,
} from './types/notification.types'
