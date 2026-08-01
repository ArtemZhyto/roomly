// Validation types
import type { CreateBookingBody } from '@validation/bookings'

export interface CreateBookingInput extends CreateBookingBody {
  userId: number
}

export interface BookingOccurrence {
  startDate: Date
  endDate: Date
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface GetUserBookingsParams {
  userId: number
  upcoming: PaginationParams
  past: PaginationParams
}
