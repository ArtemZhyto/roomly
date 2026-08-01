// Types
import type { MyBooking } from './my-booking.types'

export interface BookingPeriodState {
  bookings: MyBooking[]
  page: number
  total: number
  totalPages: number
}

export const createInitialBookingPeriodState = (): BookingPeriodState => {
  return {
    bookings: [],
    page: 1,
    total: 0,
    totalPages: 0,
  }
}
