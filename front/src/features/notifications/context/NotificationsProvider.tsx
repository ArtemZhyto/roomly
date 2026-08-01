'use client'

// Modules
import { useMemo, type ReactNode } from 'react'

// Components
import ToastViewport from '../components/ToastViewport'

// Context
import { NotificationsContext } from './notifications.context'

// Hooks
import useNotificationSocket from '../hooks/useNotificationSocket'
import useNotificationToasts from '../hooks/useNotificationToasts'
import useNotificationsStore from '../hooks/useNotificationsStore'

// Types
import type { NotificationsContextValue } from '../types/notification.types'

interface NotificationsProviderProps {
  children: ReactNode
}

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const { toasts, notify, dismissToast } = useNotificationToasts()

  const {
    notifications,
    unreadCount,
    isLoading,
    errorMessage,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    retry,
  } = useNotificationsStore({
    notify,
  })

  useNotificationSocket({
    addNotification,
    notify,
  })

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
      retry,
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
      retry,
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
