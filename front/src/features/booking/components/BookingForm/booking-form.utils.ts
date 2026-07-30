// Types
import type { BookingFormErrors, BookingFormValues } from './booking-form.types'

// Constants
import {
  MAX_BOOKING_DURATION_MINUTES,
  MAX_TITLE_LENGTH,
  MINUTES_IN_HOUR,
  OFFICE_END_MINUTES,
  OFFICE_START_MINUTES,
  SLOT_DURATION_MINUTES,
} from './booking-form.constants'

export const getTimeInMinutes = (value: string): number | null => {
  if (!value) {
    return null
  }

  const [hours, minutes] = value.split(':').map(Number)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null
  }

  return hours * MINUTES_IN_HOUR + minutes
}

export const formatTimeFromMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR)

  const minutes = totalMinutes % MINUTES_IN_HOUR

  return [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0')].join(':')
}

export const getDefaultEndTime = (startTime: string): string => {
  const startMinutes = getTimeInMinutes(startTime)

  if (startMinutes === null) {
    return '09:30'
  }

  const endMinutes = startMinutes + SLOT_DURATION_MINUTES

  if (endMinutes > OFFICE_END_MINUTES) {
    return formatTimeFromMinutes(OFFICE_END_MINUTES)
  }

  return formatTimeFromMinutes(endMinutes)
}

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

const isAlignedToSlot = (minutes: number): boolean => {
  return minutes % SLOT_DURATION_MINUTES === 0
}

const createLocalDateTime = (date: string, time: string): Date | null => {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time)

  if (!dateMatch || !timeMatch) {
    return null
  }

  const year = Number(dateMatch[1])
  const month = Number(dateMatch[2])
  const day = Number(dateMatch[3])
  const hours = Number(timeMatch[1])
  const minutes = Number(timeMatch[2])

  const result = new Date(year, month - 1, day, hours, minutes, 0, 0)

  const isValid =
    result.getFullYear() === year &&
    result.getMonth() === month - 1 &&
    result.getDate() === day &&
    result.getHours() === hours &&
    result.getMinutes() === minutes

  return isValid ? result : null
}

export const validateBookingForm = (values: BookingFormValues): BookingFormErrors => {
  const errors: BookingFormErrors = {}

  const title = values.title.trim()

  const startMinutes = getTimeInMinutes(values.startTime)
  const endMinutes = getTimeInMinutes(values.endTime)

  const durationMinutes = getDurationMinutes(values.startTime, values.endTime)

  if (!title) {
    errors.title = 'Enter a title for the meeting.'
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `The title cannot exceed ${MAX_TITLE_LENGTH} characters.`
  }

  if (!values.roomId) {
    errors.roomId = 'Select a meeting room.'
  }

  if (!values.date) {
    errors.date = 'Select a meeting date.'
  }

  if (startMinutes === null) {
    errors.startTime = 'Select a start time.'
  } else if (!isAlignedToSlot(startMinutes)) {
    errors.startTime = 'Start time must use 30-minute intervals.'
  } else if (startMinutes < OFFICE_START_MINUTES || startMinutes >= OFFICE_END_MINUTES) {
    errors.startTime = 'Start time must be within office hours, 09:00–19:00.'
  }

  if (endMinutes === null) {
    errors.endTime = 'Select an end time.'
  } else if (!isAlignedToSlot(endMinutes)) {
    errors.endTime = 'End time must use 30-minute intervals.'
  } else if (endMinutes <= OFFICE_START_MINUTES || endMinutes > OFFICE_END_MINUTES) {
    errors.endTime = 'End time must be within office hours, 09:00–19:00.'
  } else if (startMinutes !== null && durationMinutes <= 0) {
    errors.endTime = 'The end time must be later than the start time.'
  } else if (startMinutes !== null && durationMinutes < SLOT_DURATION_MINUTES) {
    errors.endTime = 'A booking must last at least 30 minutes.'
  } else if (startMinutes !== null && durationMinutes > MAX_BOOKING_DURATION_MINUTES) {
    errors.endTime = 'A booking cannot last longer than 4 hours.'
  }

  const startDateTime = createLocalDateTime(values.date, values.startTime)
  const endDateTime = createLocalDateTime(values.date, values.endTime)

  if (values.date && values.startTime && !startDateTime) {
    errors.startTime = 'Enter a valid start date and time.'
  }

  if (values.date && values.endTime && !endDateTime) {
    errors.endTime = 'Enter a valid end date and time.'
  }

  if (startDateTime && startDateTime.getTime() <= Date.now()) {
    errors.date = 'Booking must start in the future.'
    errors.startTime = 'Select a time that has not passed yet.'
  }

  return errors
}

export const formatDateInputValue = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const createBookingDateTime = (date: string, time: string): string => {
  const value = new Date(`${date}T${time}:00`)

  if (Number.isNaN(value.getTime())) {
    throw new Error('Invalid booking date or time')
  }

  return value.toISOString()
}
