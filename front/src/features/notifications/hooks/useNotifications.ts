'use client'

// Modules
import { useContext } from 'react'

// Context
import { NotificationsContext } from '../context/notifications.context'

// Types
import type { NotificationsContextValue } from '../types/notification.types'

const useNotifications = (): NotificationsContextValue => {
  const context = useContext(NotificationsContext)

  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }

  return context
}

export default useNotifications
