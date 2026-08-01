// Constants
import { MINUTES_IN_HOUR } from '../booking-form.constants'

// Utils
import { getTimeInMinutes } from './booking-time.utils'

export const getDurationMinutes = (startTime: string, endTime: string): number => {
  const startMinutes = getTimeInMinutes(startTime)
  const endMinutes = getTimeInMinutes(endTime)

  if (startMinutes === null || endMinutes === null) {
    return 0
  }

  return endMinutes - startMinutes
}

export const formatDuration = (durationMinutes: number): string => {
  if (durationMinutes <= 0) {
    return 'Invalid duration'
  }

  const hours = Math.floor(durationMinutes / MINUTES_IN_HOUR)
  const minutes = durationMinutes % MINUTES_IN_HOUR

  return [hours > 0 ? `${hours}h` : '', minutes > 0 ? `${minutes}m` : ''].filter(Boolean).join(' ')
}
