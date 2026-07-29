'use client'

// Modules
import { useMemo, useState, type FormEvent } from 'react'

// Features
import { mockRooms, type Room } from '@features/rooms'

// Types
import type { BookingFormErrors, BookingFormValues } from '../../types'
import type { UpdateBookingField } from './booking-form.types'

// Constants
import { DEFAULT_START_TIME } from './booking-form.constants'

// Utils
import {
  formatDuration,
  getDefaultEndTime,
  getDurationMinutes,
  validateBookingForm,
} from './booking-form.utils'

interface UseBookingFormOptions {
  initialRoom?: Room
  initialDate?: string
  initialStartTime?: string
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
  initialRoom,
  initialDate = '',
  initialStartTime = DEFAULT_START_TIME,
  onSubmit,
}: UseBookingFormOptions): UseBookingFormResult => {
  const [values, setValues] = useState<BookingFormValues>(() => ({
    title: '',
    roomId: initialRoom?.id ?? mockRooms[0]?.id ?? 0,
    date: initialDate,
    startTime: initialStartTime,
    endTime: getDefaultEndTime(initialStartTime),
  }))

  const [errors, setErrors] = useState<BookingFormErrors>({})

  const durationMinutes = useMemo(
    () => getDurationMinutes(values.startTime, values.endTime),
    [values.startTime, values.endTime],
  )

  const durationLabel = useMemo(() => formatDuration(durationMinutes), [durationMinutes])

  const updateField: UpdateBookingField = (field, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      form: undefined,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateBookingForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)

      return
    }

    setErrors({})

    onSubmit?.({
      ...values,
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
