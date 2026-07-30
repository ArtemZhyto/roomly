// API
import apiClient from '@lib/api/api-client'

// Types
import type { RoomResponse } from '../types/room.types'

const getRooms = async (): Promise<RoomResponse[]> => {
  const response = await apiClient.get<RoomResponse[]>('/rooms')

  return response.data
}

export default getRooms
