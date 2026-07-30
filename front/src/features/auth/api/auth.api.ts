// Lib
import { apiClient } from '@lib/api'

// Types
import type { AuthUser, LoginRequest, RegisterRequest, VerifyEmailRequest } from './auth.types'

export const login = async (payload: LoginRequest): Promise<void> => {
  await apiClient.post('/auth/login', payload)
}

export const register = async (payload: RegisterRequest): Promise<void> => {
  await apiClient.post('/auth/register', payload)
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await apiClient.get<AuthUser>('/auth/me')

  return response.data
}

export const refreshSession = async (): Promise<void> => {
  await apiClient.post('/auth/refresh')
}

export const logout = async (): Promise<void> => {
  await apiClient.delete('/auth/logout')
}

export const verifyEmail = async (payload: VerifyEmailRequest): Promise<void> => {
  await apiClient.post('/auth/verify-email', payload)
}

export const resendVerification = async (): Promise<void> => {
  await apiClient.post('/auth/resend-verification')
}
