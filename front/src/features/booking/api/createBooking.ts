// API
import apiClient from '@lib/api/api-client'

// Types
import type { CreateBookingRequest, CreateBookingResponse } from './booking-api.types'

const createBooking = async (payload: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await apiClient.post<CreateBookingResponse>('/bookings', payload)

  return response.data
}

export default createBooking
