'use client'

// Modules
import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from 'react'

// Services
import { loadMyBookingsPage } from '../services/load-my-bookings.service'

// Types
import type { BookingPeriodState, MyBookingPeriod } from '../types'

// Utils
import { getMyBookingsErrorMessage } from '../utils/get-my-bookings-error-message'
import { mergeBookingPage } from '../utils/my-bookings-list.utils'

interface UseMyBookingsPaginationParams {
  activePeriod: MyBookingPeriod

  upcomingState: BookingPeriodState
  pastState: BookingPeriodState

  setUpcomingState: Dispatch<SetStateAction<BookingPeriodState>>
  setPastState: Dispatch<SetStateAction<BookingPeriodState>>

  setErrorMessage: (message: string | null) => void
}

interface UseMyBookingsPaginationResult {
  hasMoreBookings: boolean
  isLoadingMore: boolean
  loadMoreBookings: () => Promise<void>
}

const useMyBookingsPagination = ({
  activePeriod,
  upcomingState,
  pastState,
  setUpcomingState,
  setPastState,
  setErrorMessage,
}: UseMyBookingsPaginationParams): UseMyBookingsPaginationResult => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const activeState = useMemo(() => {
    return activePeriod === 'upcoming' ? upcomingState : pastState
  }, [activePeriod, pastState, upcomingState])

  const hasMoreBookings = activeState.page < activeState.totalPages

  const loadMoreBookings = useCallback(async (): Promise<void> => {
    if (isLoadingMore || !hasMoreBookings) {
      return
    }

    setIsLoadingMore(true)
    setErrorMessage(null)

    try {
      const nextPage = activeState.page + 1

      const nextState = await loadMyBookingsPage(activePeriod, nextPage)

      if (activePeriod === 'upcoming') {
        setUpcomingState((currentState) => {
          return {
            ...nextState,

            bookings: mergeBookingPage(currentState.bookings, nextState.bookings, 'upcoming'),
          }
        })

        return
      }

      setPastState((currentState) => {
        return {
          ...nextState,

          bookings: mergeBookingPage(currentState.bookings, nextState.bookings, 'past'),
        }
      })
    } catch (error: unknown) {
      setErrorMessage(getMyBookingsErrorMessage(error, 'Could not load more bookings.'))
    } finally {
      setIsLoadingMore(false)
    }
  }, [
    activePeriod,
    activeState.page,
    hasMoreBookings,
    isLoadingMore,
    setErrorMessage,
    setPastState,
    setUpcomingState,
  ])

  return {
    hasMoreBookings,
    isLoadingMore,
    loadMoreBookings,
  }
}

export default useMyBookingsPagination
