// Modules
import axios from 'axios'

// Types
import type { ApiErrorResponse, NormalizedApiError } from './api.types'

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again'

export const normalizeApiError = (error: unknown): NormalizedApiError => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      status: null,
      message: DEFAULT_ERROR_MESSAGE,
      fieldErrors: {},
    }
  }

  const responseData = error.response?.data

  return {
    status: error.response?.status ?? null,
    message: responseData?.message || error.message || DEFAULT_ERROR_MESSAGE,
    fieldErrors: responseData?.errors ?? {},
  }
}
