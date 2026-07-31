// API
import apiClient from '@lib/api/api-client'

// Types
import type { GetMyBookingsParams, MyBookingsResponse } from './booking-api.types'

const getMyBookings = async ({
  upcomingPage = 1,
  upcomingLimit = 10,
  pastPage = 1,
  pastLimit = 10,
}: GetMyBookingsParams = {}): Promise<MyBookingsResponse> => {
  const response = await apiClient.get<MyBookingsResponse>('/bookings', {
    params: {
      upcomingPage,
      upcomingLimit,
      pastPage,
      pastLimit,
    },
  })

  return response.data
}

export default getMyBookings
