'use client'

// Modules
import { useEffect } from 'react'

// Lib
import { getSocketClient } from '@lib/socket/socket-client'

// Types
import type {
  AppNotification,
  BackendNotificationResponse,
  CreateNotificationInput,
} from '../types/notification.types'

// Utils
import { mapNotification } from '../utils/mapNotification'

interface UseNotificationSocketParams {
  addNotification: (notification: AppNotification) => void

  notify: (input: CreateNotificationInput) => string
}

const useNotificationSocket = ({ addNotification, notify }: UseNotificationSocketParams): void => {
  useEffect(() => {
    const socket = getSocketClient()

    const handleNewNotification = (response: BackendNotificationResponse): void => {
      const notification = mapNotification(response)

      addNotification(notification)

      notify({
        type: notification.type,
        title: notification.title,
        message: notification.message,
      })
    }

    socket.on('notification:new', handleNewNotification)

    socket.connect()

    return () => {
      socket.off('notification:new', handleNewNotification)

      socket.disconnect()
    }
  }, [addNotification, notify])
}

export default useNotificationSocket
