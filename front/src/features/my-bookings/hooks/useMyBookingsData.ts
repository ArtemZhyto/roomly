'use client'

// Modules
import { useCallback, useEffect, useMemo, useState } from 'react'

// Hooks
import useMyBookingsPagination from './useMyBookingsPagination'

// Services
import { loadInitialMyBookings } from '../services/load-my-bookings.service'

// Types
import {
  createInitialBookingPeriodState,
  type BookingPeriodState,
  type MyBooking,
  type MyBookingPeriod,
  type MyBookingsStatus,
} from '../types'

// Utils
import { getMyBookingsErrorMessage } from '../utils/get-my-bookings-error-message'

interface UseMyBookingsDataResult {
  activePeriod: MyBookingPeriod
  bookings: MyBooking[]
  upcomingCount: number
  pastCount: number
  status: MyBookingsStatus
  errorMessage: string | null
  hasMoreBookings: boolean
  isLoadingMore: boolean

  setActivePeriod: (period: MyBookingPeriod) => void

  loadMoreBookings: () => Promise<void>
  reloadBookings: () => Promise<void>

  setErrorMessage: (message: string | null) => void
}

const useMyBookingsData = (): UseMyBookingsDataResult => {
  const [activePeriod, setActivePeriod] = useState<MyBookingPeriod>('upcoming')

  const [upcomingState, setUpcomingState] = useState<BookingPeriodState>(
    createInitialBookingPeriodState,
  )

  const [pastState, setPastState] = useState<BookingPeriodState>(createInitialBookingPeriodState)

  const [status, setStatus] = useState<MyBookingsStatus>('loading')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadBookings = useCallback(async (): Promise<void> => {
    setStatus('loading')
    setErrorMessage(null)

    try {
      const result = await loadInitialMyBookings()

      setUpcomingState(result.upcoming)

      setPastState(result.past)
      setStatus('idle')
    } catch (error: unknown) {
      setErrorMessage(getMyBookingsErrorMessage(error))

      setStatus('error')
    }
  }, [])

  useEffect(() => {
    void loadBookings()
  }, [loadBookings])

  const bookings = useMemo(() => {
    return activePeriod === 'upcoming' ? upcomingState.bookings : pastState.bookings
  }, [activePeriod, pastState.bookings, upcomingState.bookings])

  const { hasMoreBookings, isLoadingMore, loadMoreBookings } = useMyBookingsPagination({
    activePeriod,
    upcomingState,
    pastState,
    setUpcomingState,
    setPastState,
    setErrorMessage,
  })

  return {
    activePeriod,
    bookings,
    upcomingCount: upcomingState.total,
    pastCount: pastState.total,
    status,
    errorMessage,
    hasMoreBookings,
    isLoadingMore,
    setActivePeriod,
    loadMoreBookings,
    reloadBookings: loadBookings,
    setErrorMessage,
  }
}

export default useMyBookingsData
