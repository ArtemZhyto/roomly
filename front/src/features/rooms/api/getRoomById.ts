// API
import apiClient from '@lib/api/api-client'

// Types
import type { RoomResponse } from '../types'

const getRoomById = async (roomId: number): Promise<RoomResponse> => {
  const response = await apiClient.get<RoomResponse>(`/rooms/${roomId}`)

  return response.data
}

export default getRoomById
