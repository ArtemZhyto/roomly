'use client'

// Modules
import { useCallback, useMemo, useState } from 'react'

// Lib
import { normalizeApiError } from '@lib/api/api-error'

// Features
import {
  createBooking,
  createBookingDateTime,
  createBookingEndDateTime,
  type BookingFormStatus,
  type BookingFormValues,
} from '@features/booking'

import { useNotifications } from '@features/notifications'

// Types
import type { ScheduleSlotSelection } from '../types'

interface UseScheduleBookingDialogOptions {
  roomId: number
  reloadSchedule: () => Promise<void>
}

const useScheduleBookingDialog = ({ roomId, reloadSchedule }: UseScheduleBookingDialogOptions) => {
  const { notify } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)

  const [status, setStatus] = useState<BookingFormStatus>('idle')

  const [errorMessage, setErrorMessage] = useState<string>()

  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlotSelection | null>(null)

  const formKey = useMemo(() => {
    if (!selectedSlot) {
      return `manual-${roomId}`
    }

    return [
      selectedSlot.roomId,
      selectedSlot.date,
      selectedSlot.startTime,
      selectedSlot.endTime,
    ].join('-')
  }, [roomId, selectedSlot])

  const resetFormState = useCallback((): void => {
    setStatus('idle')
    setErrorMessage(undefined)
  }, [])

  const openDialog = useCallback((): void => {
    setSelectedSlot(null)
    resetFormState()
    setIsOpen(true)
  }, [resetFormState])

  const selectSlot = useCallback(
    (selection: ScheduleSlotSelection): void => {
      setSelectedSlot(selection)
      resetFormState()
      setIsOpen(true)
    },
    [resetFormState],
  )

  const closeDialog = useCallback((): void => {
    setIsOpen(false)
    setSelectedSlot(null)
    resetFormState()
  }, [resetFormState])

  const submitBooking = useCallback(
    async (values: BookingFormValues): Promise<void> => {
      setStatus('loading')
      setErrorMessage(undefined)

      const title = values.title.trim()

      try {
        await createBooking({
          roomId,
          title,

          startTime: createBookingDateTime(values.date, values.startTime),

          endTime: createBookingEndDateTime(values.date, values.startTime, values.endTime),

          recurrence: values.repeatWeekly
            ? {
                frequency: 'weekly',
                count: Number(values.recurrenceCount),
              }
            : undefined,
        })

        notify({
          type: 'success',

          title: values.repeatWeekly ? 'Recurring booking created' : 'Booking created',

          message: values.repeatWeekly
            ? `"${title}" was scheduled for ${Number(values.recurrenceCount)} weeks.`
            : `"${title}" was added to your schedule.`,
        })

        await reloadSchedule()
        setStatus('success')
      } catch (error: unknown) {
        const normalizedError = normalizeApiError(error)

        const isConflict = normalizedError.status === 409

        setErrorMessage(normalizedError.message)

        setStatus(isConflict ? 'conflict' : 'error')

        notify({
          type: isConflict ? 'warning' : 'error',

          title: isConflict ? 'Time slot is unavailable' : 'Could not create booking',

          message: normalizedError.message,
        })
      }
    },
    [notify, reloadSchedule, roomId],
  )

  return {
    isOpen,
    status,
    errorMessage,
    selectedSlot,
    formKey,
    openDialog,
    selectSlot,
    closeDialog,
    submitBooking,
  }
}

export default useScheduleBookingDialog
