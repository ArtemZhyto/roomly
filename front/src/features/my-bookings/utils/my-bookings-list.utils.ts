// Features
import type { UserBooking } from '@features/booking'

// Types
import type { MyBooking, MyBookingPeriod } from '../types'

// Utils
import { mapUserBookings, sortPastBookings, sortUpcomingBookings } from './my-bookings.utils'

export const mapAndSortBookings = (
  bookings: UserBooking[],
  period: MyBookingPeriod,
): MyBooking[] => {
  const mappedBookings = mapUserBookings(bookings, period)

  return period === 'upcoming'
    ? sortUpcomingBookings(mappedBookings)
    : sortPastBookings(mappedBookings)
}

export const mergeBookingPage = (
  currentBookings: MyBooking[],
  nextBookings: MyBooking[],
  period: MyBookingPeriod,
): MyBooking[] => {
  const existingBookingIds = new Set(currentBookings.map((booking) => booking.id))

  const uniqueNextBookings = nextBookings.filter((booking) => {
    return !existingBookingIds.has(booking.id)
  })

  const mergedBookings = [...currentBookings, ...uniqueNextBookings]

  return period === 'upcoming'
    ? sortUpcomingBookings(mergedBookings)
    : sortPastBookings(mergedBookings)
}
