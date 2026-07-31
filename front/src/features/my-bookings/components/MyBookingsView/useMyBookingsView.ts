'use client'

// Modules
import { useCallback, useEffect, useMemo, useState } from 'react'

// Features
import { deleteBooking, deleteBookingSeries, getMyBookings } from '@features/booking'

import { useNotifications } from '@features/notifications'

// Types
import type { BookingCancellationScope, MyBooking, MyBookingPeriod } from '../../types'

// Utils
import { mapUserBookings, sortPastBookings, sortUpcomingBookings } from '../../utils'

const BOOKINGS_PAGE_SIZE = 10

type MyBookingsStatus = 'loading' | 'idle' | 'error'

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

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string
          }
        }
      }
    ).response

    if (response?.data?.message) {
      return response.data.message
    }
  }

  return 'Something went wrong while loading your bookings.'
}

const useMyBookingsView = (): UseMyBookingsViewResult => {
  const { notify } = useNotifications()

  const [activePeriod, setActivePeriod] = useState<MyBookingPeriod>('upcoming')

  const [upcomingBookings, setUpcomingBookings] = useState<MyBooking[]>([])

  const [pastBookings, setPastBookings] = useState<MyBooking[]>([])

  const [upcomingPage, setUpcomingPage] = useState(1)

  const [upcomingTotal, setUpcomingTotal] = useState(0)

  const [upcomingTotalPages, setUpcomingTotalPages] = useState(0)

  const [pastPage, setPastPage] = useState(1)

  const [pastTotal, setPastTotal] = useState(0)

  const [pastTotalPages, setPastTotalPages] = useState(0)

  const [status, setStatus] = useState<MyBookingsStatus>('loading')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null)

  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false)

  const [isCancelling, setIsCancelling] = useState(false)

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const loadInitialBookings = useCallback(async () => {
    setStatus('loading')
    setErrorMessage(null)

    try {
      const response = await getMyBookings({
        upcomingPage: 1,
        upcomingLimit: BOOKINGS_PAGE_SIZE,
        pastPage: 1,
        pastLimit: BOOKINGS_PAGE_SIZE,
      })

      setUpcomingBookings(
        sortUpcomingBookings(mapUserBookings(response.upcoming.items, 'upcoming')),
      )

      setPastBookings(sortPastBookings(mapUserBookings(response.past.items, 'past')))

      setUpcomingPage(response.upcoming.page)

      setUpcomingTotal(response.upcoming.total)

      setUpcomingTotalPages(response.upcoming.totalPages)

      setPastPage(response.past.page)

      setPastTotal(response.past.total)

      setPastTotalPages(response.past.totalPages)

      setStatus('idle')
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error))

      setStatus('error')
    }
  }, [])

  useEffect(() => {
    void loadInitialBookings()
  }, [loadInitialBookings])

  const bookings = useMemo(() => {
    return activePeriod === 'upcoming' ? upcomingBookings : pastBookings
  }, [activePeriod, upcomingBookings, pastBookings])

  const hasMoreBookings =
    activePeriod === 'upcoming' ? upcomingPage < upcomingTotalPages : pastPage < pastTotalPages

  const openBooking = (booking: MyBooking) => {
    const localDate = new Date(booking.startAt)

    const year = localDate.getFullYear()

    const month = String(localDate.getMonth() + 1).padStart(2, '0')

    const day = String(localDate.getDate()).padStart(2, '0')

    const bookingDate = `${year}-${month}-${day}`

    window.location.href = `/schedule?room=${booking.roomId}` + `&date=${bookingDate}`
  }

  const requestCancellation = (booking: MyBooking) => {
    setSelectedBooking(booking)
    setErrorMessage(null)

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

  const confirmCancellation = async (scope: BookingCancellationScope) => {
    if (!selectedBooking || isCancelling) {
      return
    }

    setIsCancelling(true)
    setErrorMessage(null)

    try {
      if (scope === 'series' && selectedBooking.seriesId !== null) {
        await deleteBookingSeries(selectedBooking.seriesId)

        notify({
          type: 'success',
          title: 'Booking series cancelled',
          message: `"${selectedBooking.title}" ` + 'and its remaining occurrences were cancelled.',
        })
      } else {
        await deleteBooking(selectedBooking.id)

        notify({
          type: 'success',
          title: selectedBooking.seriesId !== null ? 'Occurrence cancelled' : 'Booking cancelled',
          message: `"${selectedBooking.title}" ` + 'was cancelled successfully.',
        })
      }

      setIsCancellationDialogOpen(false)

      await loadInitialBookings()
    } catch (error: unknown) {
      const message = getErrorMessage(error)

      setErrorMessage(message)

      notify({
        type: 'error',
        title: 'Could not cancel booking',
        message,
      })
    } finally {
      setIsCancelling(false)
    }
  }

  const loadMoreBookings = async () => {
    if (isLoadingMore || !hasMoreBookings) {
      return
    }

    setIsLoadingMore(true)
    setErrorMessage(null)

    try {
      if (activePeriod === 'upcoming') {
        const nextPage = upcomingPage + 1

        const response = await getMyBookings({
          upcomingPage: nextPage,
          upcomingLimit: BOOKINGS_PAGE_SIZE,
          pastPage: 1,
          pastLimit: BOOKINGS_PAGE_SIZE,
        })

        const nextBookings = mapUserBookings(response.upcoming.items, 'upcoming')

        setUpcomingBookings((currentBookings) => {
          const existingIds = new Set(currentBookings.map((booking) => booking.id))

          return sortUpcomingBookings([
            ...currentBookings,
            ...nextBookings.filter((booking) => !existingIds.has(booking.id)),
          ])
        })

        setUpcomingPage(response.upcoming.page)

        setUpcomingTotal(response.upcoming.total)

        setUpcomingTotalPages(response.upcoming.totalPages)

        return
      }

      const nextPage = pastPage + 1

      const response = await getMyBookings({
        upcomingPage: 1,
        upcomingLimit: BOOKINGS_PAGE_SIZE,
        pastPage: nextPage,
        pastLimit: BOOKINGS_PAGE_SIZE,
      })

      const nextBookings = mapUserBookings(response.past.items, 'past')

      setPastBookings((currentBookings) => {
        const existingIds = new Set(currentBookings.map((booking) => booking.id))

        return sortPastBookings([
          ...currentBookings,
          ...nextBookings.filter((booking) => !existingIds.has(booking.id)),
        ])
      })

      setPastPage(response.past.page)

      setPastTotal(response.past.total)

      setPastTotalPages(response.past.totalPages)
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsLoadingMore(false)
    }
  }

  return {
    activePeriod,
    bookings,
    upcomingCount: upcomingTotal,
    pastCount: pastTotal,
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
    retry: loadInitialBookings,
  }
}

export default useMyBookingsView
