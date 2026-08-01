// Types
import type { Request } from 'express'

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface Payload {
  id: number
  email: string
}

export interface AuthRequest extends Request {
  user: Payload
}
