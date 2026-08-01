// Modules
import { toZonedTime } from 'date-fns-tz'

// Configs
import { env } from '@configs/env'

// Errors
import { BadRequestError } from '@errors/app-error'

const MINIMUM_BOOKING_DURATION_MINUTES = 30
const MAXIMUM_BOOKING_DURATION_MINUTES = 240
const SLOT_DURATION_MINUTES = 30
const MILLISECONDS_PER_MINUTE = 60_000

const formattedOpenHour = String(env.officeOpenHour).padStart(2, '0')
const formattedCloseHour = String(env.officeCloseHour).padStart(2, '0')

const getMinutesSinceMidnight = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes()
}

const isExactSlotBoundary = (date: Date): boolean => {
  return (
    date.getUTCMinutes() % SLOT_DURATION_MINUTES === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  )
}

export const validateBookingTime = (startDate: Date, endDate: Date): void => {
  if (startDate <= new Date()) {
    throw new BadRequestError('Booking must be in the future')
  }

  if (startDate >= endDate) {
    throw new BadRequestError('End time must be later than start time')
  }

  const durationMinutes = (endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_MINUTE

  if (
    durationMinutes < MINIMUM_BOOKING_DURATION_MINUTES ||
    durationMinutes > MAXIMUM_BOOKING_DURATION_MINUTES
  ) {
    throw new BadRequestError('Booking duration must be between 30 minutes and 4 hours')
  }

  const localStartDate = toZonedTime(startDate, env.officeTimeZone)
  const localEndDate = toZonedTime(endDate, env.officeTimeZone)

  const startMinutes = getMinutesSinceMidnight(localStartDate)
  const endMinutes = getMinutesSinceMidnight(localEndDate)

  const officeOpenMinutes = env.officeOpenHour * 60
  const officeCloseMinutes = env.officeCloseHour * 60

  const isSameOfficeDay = localStartDate.toDateString() === localEndDate.toDateString()

  if (!isSameOfficeDay || startMinutes < officeOpenMinutes || endMinutes > officeCloseMinutes) {
    throw new BadRequestError(
      `Booking must be within office hours from ` +
        `${formattedOpenHour}:00 to ${formattedCloseHour}:00 ` +
        `${env.officeTimeZone}`,
    )
  }

  if (!isExactSlotBoundary(startDate) || !isExactSlotBoundary(endDate)) {
    throw new BadRequestError('Booking time must use 30-minute increments')
  }
}
