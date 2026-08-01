'use client'

// Modules
import { useCallback, useState } from 'react'

// Features
import { useNotifications } from '@features/notifications'

// Services
import { cancelMyBooking } from '../services/cancel-my-booking.service'

// Types
import type { BookingCancellationScope, MyBooking } from '../types'

// Utils
import { getMyBookingsErrorMessage } from '../utils/get-my-bookings-error-message'

interface UseBookingCancellationParams {
  reloadBookings: () => Promise<void>

  setErrorMessage: (message: string | null) => void
}

interface UseBookingCancellationResult {
  selectedBooking: MyBooking | null
  isCancellationDialogOpen: boolean
  isCancelling: boolean

  requestCancellation: (booking: MyBooking) => void
  closeCancellationDialog: () => void
  finishCancellationDialogClose: () => void
  confirmCancellation: (scope: BookingCancellationScope) => Promise<void>
}

const useBookingCancellation = ({
  reloadBookings,
  setErrorMessage,
}: UseBookingCancellationParams): UseBookingCancellationResult => {
  const { notify } = useNotifications()

  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null)

  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const requestCancellation = useCallback(
    (booking: MyBooking): void => {
      setSelectedBooking(booking)
      setErrorMessage(null)

      setIsCancellationDialogOpen(true)
    },
    [setErrorMessage],
  )

  const closeCancellationDialog = useCallback((): void => {
    if (isCancelling) {
      return
    }

    setIsCancellationDialogOpen(false)
  }, [isCancelling])

  const finishCancellationDialogClose = useCallback((): void => {
    setSelectedBooking(null)
  }, [])

  const confirmCancellation = useCallback(
    async (scope: BookingCancellationScope): Promise<void> => {
      if (selectedBooking === null || isCancelling) {
        return
      }

      setIsCancelling(true)
      setErrorMessage(null)

      try {
        const successMessage = await cancelMyBooking(selectedBooking, scope)

        notify({
          type: 'success',
          title: successMessage.title,
          message: successMessage.message,
        })

        setIsCancellationDialogOpen(false)

        await reloadBookings()
      } catch (error: unknown) {
        const message = getMyBookingsErrorMessage(error, 'Could not cancel booking.')

        setErrorMessage(message)

        notify({
          type: 'error',
          title: 'Could not cancel booking',
          message,
        })
      } finally {
        setIsCancelling(false)
      }
    },
    [isCancelling, notify, reloadBookings, selectedBooking, setErrorMessage],
  )

  return {
    selectedBooking,
    isCancellationDialogOpen,
    isCancelling,
    requestCancellation,
    closeCancellationDialog,
    finishCancellationDialogClose,
    confirmCancellation,
  }
}

export default useBookingCancellation
