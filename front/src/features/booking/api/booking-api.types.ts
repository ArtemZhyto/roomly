export interface BookingRecurrenceRequest {
  frequency: 'weekly'
  count: number
}

export interface CreateBookingRequest {
  roomId: number
  title: string
  startTime: string
  endTime: string
  recurrence?: BookingRecurrenceRequest
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

export interface CreatedBookingSeries {
  id: number
  userId: number
  totalOccurrences: number
}

export interface CreatedRecurringBooking {
  series: CreatedBookingSeries
  bookings: CreatedBooking[]
}

export type CreateBookingResponse = CreatedBooking | CreatedRecurringBooking
