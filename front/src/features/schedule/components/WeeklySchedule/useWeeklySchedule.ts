'use client'

// Modules
import { useEffect, useMemo, useRef, useState } from 'react'

// Features
import { getRoomAvailability, type Room } from '@features/rooms'
import type { BookingFormStatus } from '@features/booking'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../../utils'

const MOCK_SUBMIT_DELAY = 900

interface UseWeeklyScheduleOptions {
  room: Room
  initialDate?: Date
}

type ScheduleLoadingStatus = 'loading' | 'success' | 'error'

const useWeeklySchedule = ({ room, initialDate }: UseWeeklyScheduleOptions) => {
  const { user } = useAuth()

  const currentWeekStart = useMemo(() => getStartOfWeek(new Date()), [])

  const initialWeekStart = useMemo(() => {
    return getStartOfWeek(initialDate ?? new Date())
  }, [initialDate])

  const submitTimeoutRef = useRef<number | null>(null)

  const [weekStart, setWeekStart] = useState(initialWeekStart)

  const [roomBookings, setRoomBookings] = useState<ScheduleBooking[]>([])

  const [scheduleStatus, setScheduleStatus] = useState<ScheduleLoadingStatus>('loading')

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  const [bookingStatus, setBookingStatus] = useState<BookingFormStatus>('idle')

  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlotSelection | null>(null)

  useEffect(() => {
    setWeekStart(initialWeekStart)
  }, [initialWeekStart])

  useEffect(() => {
    let isCancelled = false

    const loadRoomBookings = async () => {
      setScheduleStatus('loading')

      try {
        const weekEnd = addWeeks(weekStart, 1)

        const bookings = await getRoomAvailability({
          roomId: room.id,
          from: weekStart,
          to: weekEnd,
        })

        if (isCancelled) {
          return
        }

        const mappedBookings: ScheduleBooking[] = bookings.map((booking) => ({
          id: booking.id,
          roomId: room.id,
          title: booking.title,
          authorName: booking.user.name,
          startAt: booking.startTime,
          endAt: booking.endTime,
          ownership: booking.user.id === user?.id ? 'own' : 'other',
        }))

        setRoomBookings(mappedBookings)
        setScheduleStatus('success')
      } catch {
        if (isCancelled) {
          return
        }

        setRoomBookings([])
        setScheduleStatus('error')
      }
    }

    void loadRoomBookings()

    return () => {
      isCancelled = true
    }
  }, [room.id, user?.id, weekStart])

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current)
      }
    }
  }, [])

  const weekRange = useMemo(() => formatWeekRange(weekStart), [weekStart])

  const isCurrentWeek = isSameDay(weekStart, currentWeekStart)

  const bookingFormKey = selectedSlot
    ? [selectedSlot.roomId, selectedSlot.date, selectedSlot.startTime, selectedSlot.endTime].join(
        '-',
      )
    : `manual-${room.id}`

  const handlePreviousWeek = () => {
    setWeekStart((currentWeek) => addWeeks(currentWeek, -1))
  }

  const handleCurrentWeek = () => {
    setWeekStart(currentWeekStart)
  }

  const handleNextWeek = () => {
    setWeekStart((currentWeek) => addWeeks(currentWeek, 1))
  }

  const handleOpenBookingDialog = () => {
    setSelectedSlot(null)
    setBookingStatus('idle')
    setIsBookingDialogOpen(true)
  }

  const handleSelectSlot = (selection: ScheduleSlotSelection) => {
    setSelectedSlot(selection)
    setBookingStatus('idle')
    setIsBookingDialogOpen(true)
  }

  const handleCloseBookingDialog = () => {
    if (submitTimeoutRef.current !== null) {
      window.clearTimeout(submitTimeoutRef.current)

      submitTimeoutRef.current = null
    }

    setIsBookingDialogOpen(false)
    setBookingStatus('idle')
    setSelectedSlot(null)
  }

  const handleBookingSubmit = () => {
    setBookingStatus('loading')

    submitTimeoutRef.current = window.setTimeout(() => {
      setBookingStatus('success')
      submitTimeoutRef.current = null
    }, MOCK_SUBMIT_DELAY)
  }

  return {
    weekStart,
    weekRange,
    isCurrentWeek,
    roomBookings,
    scheduleStatus,
    isBookingDialogOpen,
    bookingStatus,
    selectedSlot,
    bookingFormKey,
    handlePreviousWeek,
    handleCurrentWeek,
    handleNextWeek,
    handleOpenBookingDialog,
    handleSelectSlot,
    handleCloseBookingDialog,
    handleBookingSubmit,
  }
}

export default useWeeklySchedule
