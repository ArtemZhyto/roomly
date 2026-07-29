// Constants
import { DAYS_IN_WEEK, OFFICE_START_HOUR, SLOT_DURATION_MINUTES, SLOTS_PER_DAY } from '../constants'

export interface ScheduleSlot {
  index: number
  hour: number
  minute: number
  label: string
}

export const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date)
  const day = result.getDay()

  const differenceToMonday = day === 0 ? -6 : 1 - day

  result.setDate(result.getDate() + differenceToMonday)
  result.setHours(0, 0, 0, 0)

  return result
}

export const getWeekDays = (weekStart: Date): Date[] => {
  return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
    const date = new Date(weekStart)

    date.setDate(weekStart.getDate() + index)

    return date
  })
}

export const getScheduleSlots = (): ScheduleSlot[] => {
  return Array.from({ length: SLOTS_PER_DAY }, (_, index) => {
    const totalMinutes = OFFICE_START_HOUR * 60 + index * SLOT_DURATION_MINUTES

    const hour = Math.floor(totalMinutes / 60)
    const minute = totalMinutes % 60

    return {
      index,
      hour,
      minute,
      label: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    }
  })
}

export const addWeeks = (date: Date, amount: number): Date => {
  const result = new Date(date)

  result.setDate(result.getDate() + amount * 7)

  return result
}

export const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

export const formatWeekDay = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date)
}

export const formatDayNumber = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
  }).format(date)
}

export const formatWeekRange = (weekStart: Date): string => {
  const weekDays = getWeekDays(weekStart)

  const firstDay = weekDays[0]
  const lastDay = weekDays[weekDays.length - 1]

  const firstMonth = firstDay.toLocaleDateString('en-US', {
    month: 'short',
  })

  const lastMonth = lastDay.toLocaleDateString('en-US', {
    month: 'short',
  })

  const firstYear = firstDay.getFullYear()
  const lastYear = lastDay.getFullYear()

  if (firstDay.getMonth() === lastDay.getMonth() && firstYear === lastYear) {
    return `${firstMonth} ${firstDay.getDate()}–${lastDay.getDate()}, ${firstYear}`
  }

  if (firstYear === lastYear) {
    return `${firstMonth} ${firstDay.getDate()} – ${lastMonth} ${lastDay.getDate()}, ${firstYear}`
  }

  return `${firstMonth} ${firstDay.getDate()}, ${firstYear} – ${lastMonth} ${lastDay.getDate()}, ${lastYear}`
}
