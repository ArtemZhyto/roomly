// Constants
import { MINUTES_IN_HOUR } from '../schedule-grid.constants'

interface ZonedDateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

export const getZonedDateParts = (date: Date, timeZone: string): ZonedDateParts => {
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
    parts
      .filter((part) => {
        return part.type !== 'literal'
      })
      .map((part) => {
        return [part.type, part.value]
      }),
  )

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  }
}

export const getZonedDateKey = (date: Date, timeZone: string): string => {
  const parts = getZonedDateParts(date, timeZone)

  return [
    parts.year,
    String(parts.month).padStart(2, '0'),
    String(parts.day).padStart(2, '0'),
  ].join('-')
}

export const getZonedMinutesFromMidnight = (date: Date, timeZone: string): number => {
  const parts = getZonedDateParts(date, timeZone)

  return parts.hour * MINUTES_IN_HOUR + parts.minute
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

export const formatScheduleInputDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
