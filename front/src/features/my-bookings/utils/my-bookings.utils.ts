// Types
import type { MyBooking } from '../types'

const getUserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const formatBookingDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: getUserTimeZone(),
  }).format(new Date(value))
}

export const formatBookingTimeRange = (startAt: string, endAt: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: getUserTimeZone(),
  })

  return `${formatter.format(new Date(startAt))}–${formatter.format(new Date(endAt))}`
}

export const sortUpcomingBookings = (bookings: MyBooking[]): MyBooking[] => {
  return [...bookings].sort(
    (firstBooking, secondBooking) =>
      new Date(firstBooking.startAt).getTime() - new Date(secondBooking.startAt).getTime(),
  )
}

export const sortPastBookings = (bookings: MyBooking[]): MyBooking[] => {
  return [...bookings].sort(
    (firstBooking, secondBooking) =>
      new Date(secondBooking.startAt).getTime() - new Date(firstBooking.startAt).getTime(),
  )
}
