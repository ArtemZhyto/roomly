// Types
import type { BookingFormErrors, BookingFormValues } from '../booking-form.types'

// Constants
import {
  MAX_BOOKING_DURATION_MINUTES,
  MAX_RECURRENCE_COUNT,
  MAX_TITLE_LENGTH,
  MIN_RECURRENCE_COUNT,
  SLOT_DURATION_MINUTES,
} from '../booking-form.constants'

// Utils
import { createLocalDateTime } from './booking-date-time.utils'
import { getDurationMinutes } from './booking-duration.utils'
import { getTimeInMinutes, isTimeAlignedToSlot } from './booking-time.utils'

const validateTitle = (values: BookingFormValues, errors: BookingFormErrors): void => {
  const title = values.title.trim()

  if (!title) {
    errors.title = 'Enter a title for the meeting.'

    return
  }

  if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `The title cannot exceed ${MAX_TITLE_LENGTH} characters.`
  }
}

const validateRoom = (values: BookingFormValues, errors: BookingFormErrors): void => {
  if (!values.roomId) {
    errors.roomId = 'Select a meeting room.'
  }
}

const validateDate = (values: BookingFormValues, errors: BookingFormErrors): void => {
  if (!values.date) {
    errors.date = 'Select a meeting date.'
  }
}

const validateStartTime = (values: BookingFormValues, errors: BookingFormErrors): number | null => {
  const startMinutes = getTimeInMinutes(values.startTime)

  if (startMinutes === null) {
    errors.startTime = 'Select a start time.'

    return null
  }

  if (!isTimeAlignedToSlot(startMinutes)) {
    errors.startTime = 'Start time must use 30-minute intervals.'
  }

  return startMinutes
}

const validateEndTime = (
  values: BookingFormValues,
  errors: BookingFormErrors,
  startMinutes: number | null,
): void => {
  const endMinutes = getTimeInMinutes(values.endTime)

  if (endMinutes === null) {
    errors.endTime = 'Select an end time.'

    return
  }

  if (!isTimeAlignedToSlot(endMinutes)) {
    errors.endTime = 'End time must use 30-minute intervals.'

    return
  }

  if (startMinutes === null) {
    return
  }

  const durationMinutes = getDurationMinutes(values.startTime, values.endTime)

  if (durationMinutes <= 0) {
    errors.endTime = 'The end time must be later than the start time.'

    return
  }

  if (durationMinutes < SLOT_DURATION_MINUTES) {
    errors.endTime = 'A booking must last at least 30 minutes.'

    return
  }

  if (durationMinutes > MAX_BOOKING_DURATION_MINUTES) {
    errors.endTime = 'A booking cannot last longer than 4 hours.'
  }
}

const validateDateTimes = (values: BookingFormValues, errors: BookingFormErrors): void => {
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
}

const validateRecurrence = (values: BookingFormValues, errors: BookingFormErrors): void => {
  if (!values.repeatWeekly) {
    return
  }

  const recurrenceValue = values.recurrenceCount.trim()
  const recurrenceCount = Number(recurrenceValue)

  if (!recurrenceValue) {
    errors.recurrenceCount = 'Enter the number of occurrences.'

    return
  }

  if (!Number.isInteger(recurrenceCount)) {
    errors.recurrenceCount = 'Occurrences must be a whole number.'

    return
  }

  if (recurrenceCount < MIN_RECURRENCE_COUNT) {
    errors.recurrenceCount = `Create at least ${MIN_RECURRENCE_COUNT} occurrences.`

    return
  }

  if (recurrenceCount > MAX_RECURRENCE_COUNT) {
    errors.recurrenceCount = `Create no more than ${MAX_RECURRENCE_COUNT} occurrences.`
  }
}

export const validateBookingForm = (values: BookingFormValues): BookingFormErrors => {
  const errors: BookingFormErrors = {}

  validateTitle(values, errors)
  validateRoom(values, errors)
  validateDate(values, errors)

  const startMinutes = validateStartTime(values, errors)

  validateEndTime(values, errors, startMinutes)

  validateDateTimes(values, errors)
  validateRecurrence(values, errors)

  return errors
}
