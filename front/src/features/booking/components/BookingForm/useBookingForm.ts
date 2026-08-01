'use client'

// Modules
import { useMemo, useState, type FormEvent } from 'react'

// Features
import type { Room } from '@features/rooms'

// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Constants
import {
  DEFAULT_END_TIME,
  DEFAULT_RECURRENCE_COUNT,
  DEFAULT_START_TIME,
} from './booking-form.constants'

// Utils
import { formatDuration, getDurationMinutes, validateBookingForm } from './utils'

interface UseBookingFormOptions {
  room: Room
  initialDate?: string
  initialStartTime?: string
  initialEndTime?: string

  onSubmit?: (values: BookingFormValues) => void
}

interface UseBookingFormResult {
  values: BookingFormValues
  errors: BookingFormErrors
  durationLabel: string
  updateField: UpdateBookingField

  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const useBookingForm = ({
  room,
  initialDate = '',
  initialStartTime = DEFAULT_START_TIME,
  initialEndTime = DEFAULT_END_TIME,
  onSubmit,
}: UseBookingFormOptions): UseBookingFormResult => {
  const [values, setValues] = useState<BookingFormValues>({
    title: '',
    roomId: room.id,
    date: initialDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    repeatWeekly: false,
    recurrenceCount: DEFAULT_RECURRENCE_COUNT,
  })

  const [errors, setErrors] = useState<BookingFormErrors>({})

  const durationMinutes = useMemo(() => {
    return getDurationMinutes(values.startTime, values.endTime)
  }, [values.endTime, values.startTime])

  const durationLabel = useMemo(() => {
    return formatDuration(durationMinutes)
  }, [durationMinutes])

  const updateField: UpdateBookingField = (field, value) => {
    setValues((currentValues) => {
      return {
        ...currentValues,
        [field]: value,
      }
    })

    setErrors((currentErrors) => {
      return {
        ...currentErrors,
        [field]: undefined,
        form: undefined,
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const nextErrors = validateBookingForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)

      return
    }

    setErrors({})

    onSubmit?.({
      ...values,
      roomId: room.id,
      title: values.title.trim(),
    })
  }

  return {
    values,
    errors,
    durationLabel,
    updateField,
    handleSubmit,
  }
}

export default useBookingForm
