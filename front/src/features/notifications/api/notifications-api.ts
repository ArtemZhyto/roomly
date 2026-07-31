// Lib
import apiClient from '@lib/api/api-client'

// Types
import type { BackendNotificationResponse } from '../types/notification.types'

export const getNotifications = async (): Promise<BackendNotificationResponse[]> => {
  const response = await apiClient.get<BackendNotificationResponse[]>('/notifications')

  return response.data
}

export const markNotificationAsRead = async (
  notificationId: number,
): Promise<BackendNotificationResponse> => {
  const response = await apiClient.patch<BackendNotificationResponse>(
    `/notifications/${notificationId}/read`,
  )

  return response.data
}

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await apiClient.patch('/notifications/read-all')
}

export const deleteNotification = async (notificationId: number): Promise<void> => {
  await apiClient.delete(`/notifications/${notificationId}`)
}

export const deleteAllNotifications = async (): Promise<void> => {
  await apiClient.delete('/notifications')
}
