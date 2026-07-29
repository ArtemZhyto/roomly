export type RoomAvailabilityStatus = 'available' | 'busy' | 'unavailable'

export interface Room {
  id: number
  name: string
  floor: number
  capacity: number
  status: RoomAvailabilityStatus
  nextAvailableAt?: string
}
