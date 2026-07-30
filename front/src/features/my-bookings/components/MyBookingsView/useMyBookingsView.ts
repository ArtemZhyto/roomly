'use client'

// Modules
import { useEffect, useMemo, useRef, useState } from 'react'

// Data
import { mockMyBookings } from '../../data'

// Types
import type { MyBooking, MyBookingPeriod } from '../../types'

// Utils
import { sortPastBookings, sortUpcomingBookings } from '../../utils'

const MOCK_CANCEL_DELAY = 900
const INITIAL_PAST_BOOKINGS_COUNT = 3
const PAST_BOOKINGS_PAGE_SIZE = 3

interface UseMyBookingsViewResult {
  activePeriod: MyBookingPeriod
  bookings: MyBooking[]
  upcomingCount: number
  pastCount: number
  selectedBooking: MyBooking | null
  isCancellationDialogOpen: boolean
  isCancelling: boolean
  setActivePeriod: (period: MyBookingPeriod) => void
  openBooking: (booking: MyBooking) => void
  requestCancellation: (booking: MyBooking) => void
  closeCancellationDialog: () => void
  finishCancellationDialogClose: () => void
  confirmCancellation: () => void
  hasMorePastBookings: boolean
  loadMorePastBookings: () => void
}

const useMyBookingsView = (): UseMyBookingsViewResult => {
  const [activePeriod, setActivePeriod] = useState<MyBookingPeriod>('upcoming')

  const [allBookings, setAllBookings] = useState<MyBooking[]>(mockMyBookings)

  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null)

  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false)

  const [isCancelling, setIsCancelling] = useState(false)

  const [visiblePastBookingsCount, setVisiblePastBookingsCount] = useState(
    INITIAL_PAST_BOOKINGS_COUNT,
  )

  const cancelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (cancelTimeoutRef.current) {
        clearTimeout(cancelTimeoutRef.current)
      }
    }
  }, [])

  const upcomingBookings = useMemo(() => {
    return sortUpcomingBookings(allBookings.filter((booking) => booking.period === 'upcoming'))
  }, [allBookings])

  const pastBookings = useMemo(() => {
    return sortPastBookings(allBookings.filter((booking) => booking.period === 'past'))
  }, [allBookings])

  const visiblePastBookings = pastBookings.slice(0, visiblePastBookingsCount)
  const hasMorePastBookings = visiblePastBookingsCount < pastBookings.length

  const bookings = activePeriod === 'upcoming' ? upcomingBookings : visiblePastBookings

  const openBooking = (booking: MyBooking) => {
    const bookingDate = booking.startAt.slice(0, 10)

    window.location.href = `/schedule?room=${booking.roomId}` + `&date=${bookingDate}`
  }

  const requestCancellation = (booking: MyBooking) => {
    setSelectedBooking(booking)
    setIsCancellationDialogOpen(true)
  }

  const closeCancellationDialog = () => {
    if (isCancelling) {
      return
    }

    setIsCancellationDialogOpen(false)
  }

  const finishCancellationDialogClose = () => {
    setSelectedBooking(null)
  }

  const confirmCancellation = () => {
    if (!selectedBooking || isCancelling) {
      return
    }

    setIsCancelling(true)

    const bookingId = selectedBooking.id

    cancelTimeoutRef.current = setTimeout(() => {
      setAllBookings((currentBookings) =>
        currentBookings.filter((booking) => booking.id !== bookingId),
      )

      setIsCancelling(false)
      setIsCancellationDialogOpen(false)
      cancelTimeoutRef.current = null
    }, MOCK_CANCEL_DELAY)
  }

  const loadMorePastBookings = () => {
    setVisiblePastBookingsCount((currentCount) => currentCount + PAST_BOOKINGS_PAGE_SIZE)
  }

  return {
    activePeriod,
    bookings,
    upcomingCount: upcomingBookings.length,
    pastCount: pastBookings.length,
    selectedBooking,
    isCancellationDialogOpen,
    isCancelling,
    hasMorePastBookings,
    setActivePeriod,
    openBooking,
    requestCancellation,
    closeCancellationDialog,
    finishCancellationDialogClose,
    confirmCancellation,
    loadMorePastBookings,
  }
}

export default useMyBookingsView
