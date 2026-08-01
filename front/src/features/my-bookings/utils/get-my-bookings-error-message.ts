// Modules
import axios from 'axios'

interface ErrorResponse {
  message?: string
}

export const getMyBookingsErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong while loading your bookings.',
): string => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}
