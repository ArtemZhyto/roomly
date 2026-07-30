// Types
import type { ScheduleBooking } from '../../types'

// Constants
import { OFFICE_START_HOUR, SLOT_DURATION_MINUTES } from '../../constants'
import { MILLISECONDS_IN_MINUTE, MINUTES_IN_HOUR } from './schedule-grid.constants'

export const getMinutesFromOfficeStart = (date: Date): number => {
  return (date.getHours() - OFFICE_START_HOUR) * MINUTES_IN_HOUR + date.getMinutes()
}

export const formatScheduleTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear()

  const month = String(date.getMonth() + 1).padStart(2, '0')

  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const createSlotStart = (day: Date, slotIndex: number): Date => {
  const slotStart = new Date(day)

  const minutesFromMidnight =
    OFFICE_START_HOUR * MINUTES_IN_HOUR + slotIndex * SLOT_DURATION_MINUTES

  const hour = Math.floor(minutesFromMidnight / MINUTES_IN_HOUR)

  const minute = minutesFromMidnight % MINUTES_IN_HOUR

  slotStart.setHours(hour, minute, 0, 0)

  return slotStart
}

export const createSlotEnd = (slotStart: Date): Date => {
  return new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * MILLISECONDS_IN_MINUTE)
}

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

  const startMinutes = getMinutesFromOfficeStart(startDate)

  const durationMinutes = (endDate.getTime() - startDate.getTime()) / MILLISECONDS_IN_MINUTE

  return {
    startDate,
    endDate,
    durationMinutes,
    top: (startMinutes / totalMinutes) * 100,
    height: (durationMinutes / totalMinutes) * 100,
  }
}
