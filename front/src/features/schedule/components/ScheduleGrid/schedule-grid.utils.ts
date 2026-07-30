// Types
import type { ScheduleBooking } from '../../types'
import type { ScheduleGridSlot } from './schedule-grid.types'

// Constants
import { SLOT_DURATION_MINUTES } from '../../constants'
import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  OFFICE_END_MINUTES,
  OFFICE_START_MINUTES,
  OFFICE_TIME_ZONE,
} from './schedule-grid.constants'

interface ZonedDateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

const getZonedDateParts = (date: Date, timeZone: string): ZonedDateParts => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  )

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  }
}

const getZonedDateKey = (date: Date, timeZone: string): string => {
  const parts = getZonedDateParts(date, timeZone)

  return [
    parts.year,
    String(parts.month).padStart(2, '0'),
    String(parts.day).padStart(2, '0'),
  ].join('-')
}

const getZonedMinutesFromMidnight = (date: Date, timeZone: string): number => {
  const parts = getZonedDateParts(date, timeZone)

  return parts.hour * MINUTES_IN_HOUR + parts.minute
}

export const getScheduleSlots = (): ScheduleGridSlot[] => {
  const slotCount = (HOURS_IN_DAY * MINUTES_IN_HOUR) / SLOT_DURATION_MINUTES

  return Array.from({ length: slotCount }, (_, index) => {
    const minutesFromMidnight = index * SLOT_DURATION_MINUTES

    const hour = Math.floor(minutesFromMidnight / MINUTES_IN_HOUR)

    const minute = minutesFromMidnight % MINUTES_IN_HOUR

    return {
      index,
      label: [String(hour).padStart(2, '0'), String(minute).padStart(2, '0')].join(':'),
      minute,
    }
  })
}

export const getMinutesFromDayStart = (date: Date): number => {
  return date.getHours() * MINUTES_IN_HOUR + date.getMinutes()
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

  const minutesFromMidnight = slotIndex * SLOT_DURATION_MINUTES

  const hour = Math.floor(minutesFromMidnight / MINUTES_IN_HOUR)

  const minute = minutesFromMidnight % MINUTES_IN_HOUR

  slotStart.setHours(hour, minute, 0, 0)

  return slotStart
}

export const createSlotEnd = (slotStart: Date): Date => {
  return new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * MILLISECONDS_IN_MINUTE)
}

export const isWithinOfficeHours = (slotStart: Date, slotEnd: Date): boolean => {
  const officeStartDateKey = getZonedDateKey(slotStart, OFFICE_TIME_ZONE)

  const officeEndDateKey = getZonedDateKey(slotEnd, OFFICE_TIME_ZONE)

  if (officeStartDateKey !== officeEndDateKey) {
    return false
  }

  const officeStartMinutes = getZonedMinutesFromMidnight(slotStart, OFFICE_TIME_ZONE)

  const officeEndMinutes = getZonedMinutesFromMidnight(slotEnd, OFFICE_TIME_ZONE)

  return (
    officeStartMinutes >= OFFICE_START_MINUTES &&
    officeEndMinutes <= OFFICE_END_MINUTES &&
    officeEndMinutes > officeStartMinutes
  )
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
