// Modules
import axios from 'axios'

interface ErrorResponse {
  message?: string
}

export const getNotificationErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}
