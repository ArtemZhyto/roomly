// Modules
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

// Helpers
import { validateBookingTime } from '@helpers/validateBookingTime'

// Types
import type { BookingOccurrence, CreateBookingInput } from './booking.types'

const OFFICE_TIME_ZONE = process.env.OFFICE_TIME_ZONE

if (!OFFICE_TIME_ZONE) {
  throw new Error('OFFICE_TIME_ZONE is not configured')
}

const addWeeks = (date: Date, weekCount: number): Date => {
  const result = new Date(date)

  result.setDate(result.getDate() + weekCount * 7)

  return result
}

type CreateBookingOccurrencesParams = Pick<CreateBookingInput, 'startTime' | 'endTime'> & {
  occurrenceCount: number
}

export const createBookingOccurrences = ({
  startTime,
  endTime,
  occurrenceCount,
}: CreateBookingOccurrencesParams): BookingOccurrence[] => {
  const initialStartDate = new Date(startTime)
  const initialEndDate = new Date(endTime)

  const localInitialStartDate = toZonedTime(initialStartDate, OFFICE_TIME_ZONE)
  const localInitialEndDate = toZonedTime(initialEndDate, OFFICE_TIME_ZONE)

  return Array.from(
    {
      length: occurrenceCount,
    },
    (_, index) => {
      const localStartDate = addWeeks(localInitialStartDate, index)
      const localEndDate = addWeeks(localInitialEndDate, index)

      const startDate = fromZonedTime(localStartDate, OFFICE_TIME_ZONE)
      const endDate = fromZonedTime(localEndDate, OFFICE_TIME_ZONE)

      validateBookingTime(startDate, endDate)

      return {
        startDate,
        endDate,
      }
    },
  )
}
