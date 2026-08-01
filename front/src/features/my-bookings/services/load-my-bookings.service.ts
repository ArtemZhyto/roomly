// Features
import { getMyBookings, type BookingsPage } from '@features/booking'

// Types
import type { BookingPeriodState, MyBookingPeriod } from '../types'

// Utils
import { mapAndSortBookings } from '../utils/my-bookings-list.utils'

export const BOOKINGS_PAGE_SIZE = 10

const mapBookingPage = (page: BookingsPage, period: MyBookingPeriod): BookingPeriodState => {
  return {
    bookings: mapAndSortBookings(page.items, period),
    page: page.page,
    total: page.total,
    totalPages: page.totalPages,
  }
}

interface InitialMyBookingsResult {
  upcoming: BookingPeriodState
  past: BookingPeriodState
}

export const loadInitialMyBookings = async (): Promise<InitialMyBookingsResult> => {
  const response = await getMyBookings({
    upcomingPage: 1,
    upcomingLimit: BOOKINGS_PAGE_SIZE,
    pastPage: 1,
    pastLimit: BOOKINGS_PAGE_SIZE,
  })

  return {
    upcoming: mapBookingPage(response.upcoming, 'upcoming'),

    past: mapBookingPage(response.past, 'past'),
  }
}

export const loadMyBookingsPage = async (
  period: MyBookingPeriod,
  page: number,
): Promise<BookingPeriodState> => {
  const response = await getMyBookings({
    upcomingPage: period === 'upcoming' ? page : 1,

    upcomingLimit: BOOKINGS_PAGE_SIZE,

    pastPage: period === 'past' ? page : 1,

    pastLimit: BOOKINGS_PAGE_SIZE,
  })

  return period === 'upcoming'
    ? mapBookingPage(response.upcoming, 'upcoming')
    : mapBookingPage(response.past, 'past')
}
