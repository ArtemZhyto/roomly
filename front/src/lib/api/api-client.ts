// Modules
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

// Types
import type { ApiErrorResponse } from './api.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured')
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10_000,
})

const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10_000,
})

const REFRESH_EXCLUDED_PATHS = ['/auth/login', '/auth/register', '/auth/refresh']

let refreshPromise: Promise<void> | null = null

const isRefreshExcluded = (url?: string): boolean => {
  if (!url) {
    return false
  }

  return REFRESH_EXCLUDED_PATHS.some((path) => url === path || url.startsWith(`${path}?`))
}

const refreshSession = async (): Promise<void> => {
  await refreshClient.post('/auth/refresh')
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined

    const isUnauthorized = error.response?.status === 401

    if (
      !originalRequest ||
      !isUnauthorized ||
      originalRequest._retry ||
      isRefreshExcluded(originalRequest.url)
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshSession().finally(() => {
          refreshPromise = null
        })
      }

      await refreshPromise

      return apiClient(originalRequest)
    } catch {
      return Promise.reject(error)
    }
  },
)

export default apiClient
