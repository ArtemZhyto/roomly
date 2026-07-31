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

export interface BookingRoomSummary {
  id: number
  name: string
  floor: number
  capacity: number
}

export interface UserBooking {
  id: number
  roomId: number
  userId: number
  title: string
  startTime: string
  endTime: string
  seriesId: number | null
  createdAt: string
  updatedAt: string
  room: BookingRoomSummary
}

export interface BookingsPage {
  items: UserBooking[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface MyBookingsResponse {
  upcoming: BookingsPage
  past: BookingsPage
}

export interface GetMyBookingsParams {
  upcomingPage?: number
  upcomingLimit?: number
  pastPage?: number
  pastLimit?: number
}
