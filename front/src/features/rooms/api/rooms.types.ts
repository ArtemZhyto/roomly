export type RoomAvailabilityStatus = 'available' | 'busy' | 'unavailable'

export interface RoomApiResponse {
  id: number
  name: string
  floor: number
  capacity: number
}

export interface Room extends RoomApiResponse {
  status: RoomAvailabilityStatus
  nextAvailableAt?: string
}
