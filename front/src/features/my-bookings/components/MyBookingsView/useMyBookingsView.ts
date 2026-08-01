'use client'

// Hooks
import useBookingCancellation from '../../hooks/useBookingCancellation'
import useMyBookingsData from '../../hooks/useMyBookingsData'
import useMyBookingsNavigation from '../../hooks/useMyBookingsNavigation'

// Types
import type {
  BookingCancellationScope,
  MyBooking,
  MyBookingPeriod,
  MyBookingsStatus,
} from '../../types'

interface UseMyBookingsViewResult {
  activePeriod: MyBookingPeriod
  bookings: MyBooking[]
  upcomingCount: number
  pastCount: number
  selectedBooking: MyBooking | null
  status: MyBookingsStatus
  errorMessage: string | null
  isCancellationDialogOpen: boolean
  isCancelling: boolean
  hasMoreBookings: boolean
  isLoadingMore: boolean

  setActivePeriod: (period: MyBookingPeriod) => void

  openBooking: (booking: MyBooking) => void

  requestCancellation: (booking: MyBooking) => void
  closeCancellationDialog: () => void
  finishCancellationDialogClose: () => void

  confirmCancellation: (scope: BookingCancellationScope) => Promise<void>

  loadMoreBookings: () => Promise<void>

  retry: () => Promise<void>
}

const useMyBookingsView = (): UseMyBookingsViewResult => {
  const {
    activePeriod,
    bookings,
    upcomingCount,
    pastCount,
    status,
    errorMessage,
    hasMoreBookings,
    isLoadingMore,
    setActivePeriod,
    loadMoreBookings,
    reloadBookings,
    setErrorMessage,
  } = useMyBookingsData()

  const {
    selectedBooking,
    isCancellationDialogOpen,
    isCancelling,
    requestCancellation,
    closeCancellationDialog,
    finishCancellationDialogClose,
    confirmCancellation,
  } = useBookingCancellation({
    reloadBookings,
    setErrorMessage,
  })

  const { openBooking } = useMyBookingsNavigation()

  return {
    activePeriod,
    bookings,
    upcomingCount,
    pastCount,
    selectedBooking,
    status,
    errorMessage,
    isCancellationDialogOpen,
    isCancelling,
    hasMoreBookings,
    isLoadingMore,
    setActivePeriod,
    openBooking,
    requestCancellation,
    closeCancellationDialog,
    finishCancellationDialogClose,
    confirmCancellation,
    loadMoreBookings,
    retry: reloadBookings,
  }
}

export default useMyBookingsView
