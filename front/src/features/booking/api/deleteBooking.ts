// API
import apiClient from '@lib/api/api-client'

const deleteBooking = async (bookingId: number): Promise<void> => {
  await apiClient.delete(`/bookings/${bookingId}`)
}

export default deleteBooking
