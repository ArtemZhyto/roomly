// Types
import type { ScheduleGridSlot } from '../schedule-grid.types'

// Constants
import { OFFICE_TIMEZONE, SLOT_DURATION_MINUTES } from '../../../constants'

import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  OFFICE_END_MINUTES,
  OFFICE_START_MINUTES,
} from '../schedule-grid.constants'

// Utils
import { getZonedDateKey, getZonedMinutesFromMidnight } from './schedule-date.utils'

export const getScheduleGridSlots = (): ScheduleGridSlot[] => {
  const slotCount = (HOURS_IN_DAY * MINUTES_IN_HOUR) / SLOT_DURATION_MINUTES

  return Array.from(
    {
      length: slotCount,
    },

    (_, index) => {
      const minutesFromMidnight = index * SLOT_DURATION_MINUTES

      const hour = Math.floor(minutesFromMidnight / MINUTES_IN_HOUR)
      const minute = minutesFromMidnight % MINUTES_IN_HOUR

      return {
        index,
        label: [String(hour).padStart(2, '0'), String(minute).padStart(2, '0')].join(':'),
        minute,
      }
    },
  )
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
  const startDateKey = getZonedDateKey(slotStart, OFFICE_TIMEZONE)
  const endDateKey = getZonedDateKey(slotEnd, OFFICE_TIMEZONE)

  if (startDateKey !== endDateKey) {
    return false
  }

  const startMinutes = getZonedMinutesFromMidnight(slotStart, OFFICE_TIMEZONE)
  const endMinutes = getZonedMinutesFromMidnight(slotEnd, OFFICE_TIMEZONE)

  return (
    startMinutes >= OFFICE_START_MINUTES &&
    endMinutes <= OFFICE_END_MINUTES &&
    endMinutes > startMinutes
  )
}
