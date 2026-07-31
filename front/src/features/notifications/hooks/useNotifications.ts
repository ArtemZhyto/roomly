'use client'

// Modules
import { useContext } from 'react'

// Context
import { NotificationsContext } from '../context/NotificationsProvider'

const useNotifications = () => {
  const context = useContext(NotificationsContext)

  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }

  return context
}

export default useNotifications
