// API
import apiClient from '@lib/api/api-client'

// Types
import type { RoomAvailabilityBooking } from '../types'

interface GetRoomAvailabilityParams {
  roomId: number
  from: Date
  to: Date
}

const getRoomAvailability = async ({
  roomId,
  from,
  to,
}: GetRoomAvailabilityParams): Promise<RoomAvailabilityBooking[]> => {
  const response = await apiClient.get<RoomAvailabilityBooking[]>(`/rooms/${roomId}/availability`, {
    params: {
      from: from.toISOString(),
      to: to.toISOString(),
    },
  })

  return response.data
}

export default getRoomAvailability
