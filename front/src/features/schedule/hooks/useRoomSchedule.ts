'use client'

// Modules
import { useCallback, useEffect, useRef, useState } from 'react'

// Services
import { loadRoomSchedule } from '../services/room-schedule.service'

// Types
import type { ScheduleBooking, ScheduleLoadingStatus } from '../types'

interface UseRoomScheduleOptions {
  roomId: number
  userId?: number
  weekStart: Date
}

const useRoomSchedule = ({ roomId, userId, weekStart }: UseRoomScheduleOptions) => {
  const requestIdRef = useRef(0)

  const [bookings, setBookings] = useState<ScheduleBooking[]>([])

  const [status, setStatus] = useState<ScheduleLoadingStatus>('loading')

  const reloadSchedule = useCallback(async (): Promise<void> => {
    const requestId = requestIdRef.current + 1

    requestIdRef.current = requestId

    setStatus('loading')

    try {
      const loadedBookings = await loadRoomSchedule({
        roomId,
        userId,
        weekStart,
      })

      if (requestIdRef.current !== requestId) {
        return
      }

      setBookings(loadedBookings)
      setStatus('success')
    } catch {
      if (requestIdRef.current !== requestId) {
        return
      }

      setBookings([])
      setStatus('error')
    }
  }, [roomId, userId, weekStart])

  useEffect(() => {
    void reloadSchedule()

    return () => {
      requestIdRef.current += 1
    }
  }, [reloadSchedule])

  return {
    bookings,
    status,
    reloadSchedule,
  }
}

export default useRoomSchedule
