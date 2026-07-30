export interface CreateBookingRequest {
  roomId: number
  title: string
  startTime: string
  endTime: string
}

export interface CreatedBooking {
  id: number
  roomId: number
  userId: number
  title: string
  startTime: string
  endTime: string
  seriesId: number | null
  createdAt: string
  updatedAt: string
}
