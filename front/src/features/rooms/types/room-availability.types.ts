export interface RoomAvailabilityBookingUser {
  id: number
  name: string
}

export interface RoomAvailabilityBooking {
  id: number
  title: string
  startTime: string
  endTime: string
  user: RoomAvailabilityBookingUser
}
