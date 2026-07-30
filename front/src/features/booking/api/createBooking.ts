// API
import apiClient from '@lib/api/api-client'

// Types
import type { CreateBookingRequest, CreatedBooking } from './booking-api.types'

const createBooking = async (payload: CreateBookingRequest): Promise<CreatedBooking> => {
  const response = await apiClient.post<CreatedBooking>('/bookings', payload)

  return response.data
}

export default createBooking
