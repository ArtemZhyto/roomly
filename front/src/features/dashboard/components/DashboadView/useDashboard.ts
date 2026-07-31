'use client'

// Modules
import { useCallback, useEffect, useState } from 'react'

// Features
import { getMyBookings, type UserBooking } from '@features/booking'
import { getRooms, type RoomResponse } from '@features/rooms'

type DashboardStatus = 'loading' | 'idle' | 'error'

interface UseDashboardResult {
  status: DashboardStatus
  roomsCount: number
  upcomingBookingsCount: number
  upcomingBookings: UserBooking[]
  retry: () => Promise<void>
}

const DASHBOARD_BOOKINGS_LIMIT = 3

const useDashboard = (): UseDashboardResult => {
  const [status, setStatus] = useState<DashboardStatus>('loading')

  const [rooms, setRooms] = useState<RoomResponse[]>([])

  const [upcomingBookings, setUpcomingBookings] = useState<UserBooking[]>([])

  const [upcomingBookingsCount, setUpcomingBookingsCount] = useState(0)

  const loadDashboard = useCallback(async () => {
    setStatus('loading')

    try {
      const [roomsResponse, bookingsResponse] = await Promise.all([
        getRooms(),

        getMyBookings({
          upcomingPage: 1,
          upcomingLimit: DASHBOARD_BOOKINGS_LIMIT,
          pastPage: 1,
          pastLimit: 1,
        }),
      ])

      setRooms(roomsResponse)

      setUpcomingBookings(bookingsResponse.upcoming.items)

      setUpcomingBookingsCount(bookingsResponse.upcoming.total)

      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    void loadDashboard()
  }, [loadDashboard])

  return {
    status,
    roomsCount: rooms.length,
    upcomingBookingsCount,
    upcomingBookings,
    retry: loadDashboard,
  }
}

export default useDashboard
