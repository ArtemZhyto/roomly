export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  emailVerifiedAt: string | null
}

export interface VerifyEmailRequest {
  code: string
}
