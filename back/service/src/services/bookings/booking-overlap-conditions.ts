// Types
import type { BookingOccurrence } from './booking.types'

export interface BookingOverlapCondition {
  startTime: {
    lt: Date
  }

  endTime: {
    gt: Date
  }
}

export const createBookingOverlapConditions = (
  occurrences: BookingOccurrence[],
): BookingOverlapCondition[] => {
  return occurrences.map(({ startDate, endDate }) => ({
    startTime: {
      lt: endDate,
    },

    endTime: {
      gt: startDate,
    },
  }))
}
