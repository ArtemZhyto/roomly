export interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export interface NormalizedApiError {
  status: number | null
  message: string
  fieldErrors: Record<string, string[]>
}
