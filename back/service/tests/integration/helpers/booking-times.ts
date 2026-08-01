// Modules
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

const OFFICE_TIME_ZONE = 'Europe/Kyiv'
const DAYS_IN_FUTURE = 7

interface CreateBookingTimeOptions {
  startHour?: number
  startMinute?: number
  durationMinutes?: number
  daysInFuture?: number
}

export const createFutureBookingTime = ({
  startHour = 10,
  startMinute = 0,
  durationMinutes = 60,
  daysInFuture = DAYS_IN_FUTURE,
}: CreateBookingTimeOptions = {}) => {
  const localDate = toZonedTime(new Date(), OFFICE_TIME_ZONE)

  localDate.setDate(localDate.getDate() + daysInFuture)
  localDate.setHours(startHour, startMinute, 0, 0)

  const localEndDate = new Date(localDate.getTime() + durationMinutes * 60_000)

  return {
    startTime: fromZonedTime(localDate, OFFICE_TIME_ZONE).toISOString(),
    endTime: fromZonedTime(localEndDate, OFFICE_TIME_ZONE).toISOString(),
  }
}
