// API
import apiClient from '@lib/api/api-client'

// Types
import type { RoomResponse } from '../types/room.types'

interface GetRoomsParams {
  minCapacity?: number
}

const getRooms = async ({ minCapacity }: GetRoomsParams = {}): Promise<RoomResponse[]> => {
  const response = await apiClient.get<RoomResponse[]>('/rooms', {
    params: {
      minCapacity,
    },
  })

  return response.data
}

export default getRooms
