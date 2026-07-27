export interface CreateBooking {
  roomId: number
  userId: number
  title: string
  startTime: string
  endTime: string
  recurrence?: {
    frequency: 'weekly'
    count: number
  }
}
