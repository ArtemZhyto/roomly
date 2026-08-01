// Types
import type { ScheduleBooking } from '../../../types'

// Constants
import { MILLISECONDS_IN_MINUTE } from '../schedule-grid.constants'

// Utils
import { getMinutesFromDayStart } from './schedule-date.utils'

export const isSlotOccupied = (
  slotStart: Date,
  slotEnd: Date,
  bookings: ScheduleBooking[],
): boolean => {
  return bookings.some((booking) => {
    const bookingStart = new Date(booking.startAt)
    const bookingEnd = new Date(booking.endAt)

    return slotStart < bookingEnd && slotEnd > bookingStart
  })
}

export const getBookingPosition = (booking: ScheduleBooking, totalMinutes: number) => {
  const startDate = new Date(booking.startAt)
  const endDate = new Date(booking.endAt)

  const startMinutes = getMinutesFromDayStart(startDate)

  const durationMinutes = (endDate.getTime() - startDate.getTime()) / MILLISECONDS_IN_MINUTE

  return {
    startDate,
    endDate,
    durationMinutes,

    top: (startMinutes / totalMinutes) * 100,

    height: (durationMinutes / totalMinutes) * 100,
  }
}
