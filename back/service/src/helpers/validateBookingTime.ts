// Modules
import { toZonedTime } from 'date-fns-tz'

const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE
const OFFICE_OPEN_HOUR = Number(process.env.OFFICE_OPEN_HOUR)
const OFFICE_CLOSE_HOUR = Number(process.env.OFFICE_CLOSE_HOUR)

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

if (!Number.isInteger(OFFICE_OPEN_HOUR) || OFFICE_OPEN_HOUR < 0 || OFFICE_OPEN_HOUR > 23) {
  throw new Error('OFFICE_OPEN_HOUR is not configured correctly')
}

if (!Number.isInteger(OFFICE_CLOSE_HOUR) || OFFICE_CLOSE_HOUR < 1 || OFFICE_CLOSE_HOUR > 24) {
  throw new Error('OFFICE_CLOSE_HOUR is not configured correctly')
}

if (OFFICE_OPEN_HOUR >= OFFICE_CLOSE_HOUR) {
  throw new Error('Office opening hour must be earlier than closing hour')
}

const formattedOpenHour = String(OFFICE_OPEN_HOUR).padStart(2, '0')
const formattedCloseHour = String(OFFICE_CLOSE_HOUR).padStart(2, '0')

export const validateBookingTime = (startDate: Date, endDate: Date): void => {
  if (startDate <= new Date()) {
    throw new Error('Booking must be in the future')
  }

  if (startDate >= endDate) {
    throw new Error('End time must be later than start time')
  }

  const durationMinutes = (endDate.getTime() - startDate.getTime()) / 60_000

  if (durationMinutes < 30 || durationMinutes > 240) {
    throw new Error('Booking duration must be between 30 minutes and 4 hours')
  }

  const localStartDate = toZonedTime(startDate, OFFICE_TIME_ZONE)
  const localEndDate = toZonedTime(endDate, OFFICE_TIME_ZONE)

  const startMinutes = localStartDate.getHours() * 60 + localStartDate.getMinutes()
  const endMinutes = localEndDate.getHours() * 60 + localEndDate.getMinutes()

  if (
    localStartDate.toDateString() !== localEndDate.toDateString() ||
    startMinutes < OFFICE_OPEN_HOUR * 60 ||
    endMinutes > OFFICE_CLOSE_HOUR * 60
  ) {
    throw new Error(
      `Booking must be within office hours from ${formattedOpenHour}:00 to ${formattedCloseHour}:00 ${OFFICE_TIME_ZONE}`,
    )
  }

  if (
    startDate.getUTCMinutes() % 30 !== 0 ||
    endDate.getUTCMinutes() % 30 !== 0 ||
    startDate.getUTCSeconds() !== 0 ||
    endDate.getUTCSeconds() !== 0 ||
    startDate.getUTCMilliseconds() !== 0 ||
    endDate.getUTCMilliseconds() !== 0
  ) {
    throw new Error('Booking time must use 30-minute increments')
  }
}
