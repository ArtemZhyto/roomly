// Constants
import { MINUTES_IN_DAY, MINUTES_IN_HOUR, SLOT_DURATION_MINUTES } from '../booking-form.constants'

export const getTimeInMinutes = (value: string): number | null => {
  if (!value) {
    return null
  }

  const timeParts = value.split(':').map(Number)

  if (timeParts.length !== 2) {
    return null
  }

  const [hours, minutes] = timeParts

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }

  return hours * MINUTES_IN_HOUR + minutes
}

export const formatTimeFromMinutes = (totalMinutes: number): string => {
  const normalizedMinutes = ((totalMinutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY

  const hours = Math.floor(normalizedMinutes / MINUTES_IN_HOUR)
  const minutes = normalizedMinutes % MINUTES_IN_HOUR

  return [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0')].join(':')
}

export const getDefaultEndTime = (startTime: string): string => {
  const startMinutes = getTimeInMinutes(startTime)

  if (startMinutes === null) {
    return '09:30'
  }

  return formatTimeFromMinutes(startMinutes + SLOT_DURATION_MINUTES)
}

export const isTimeAlignedToSlot = (minutes: number): boolean => {
  return minutes % SLOT_DURATION_MINUTES === 0
}
