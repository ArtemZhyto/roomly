'use client'

// Modules
import { useEffect, useMemo, useRef, useState } from 'react'

// Features
import type { Room } from '@features/rooms'
import type { BookingFormStatus } from '@features/booking'

// Types
import type { ScheduleSlotSelection } from '../../types'

// Data
import { mockBookings } from '../../data'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../../utils'

const MOCK_SUBMIT_DELAY = 900

interface UseWeeklyScheduleOptions {
  room: Room
}

const useWeeklySchedule = ({ room }: UseWeeklyScheduleOptions) => {
  const currentWeekStart = useMemo(() => getStartOfWeek(new Date()), [])
  const submitTimeoutRef = useRef<number | null>(null)

  const [weekStart, setWeekStart] = useState(currentWeekStart)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<BookingFormStatus>('idle')
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlotSelection | null>(null)

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current)
      }
    }
  }, [])

  const weekRange = useMemo(() => formatWeekRange(weekStart), [weekStart])
  const isCurrentWeek = isSameDay(weekStart, currentWeekStart)

  const roomBookings = useMemo(
    () => mockBookings.filter((booking) => booking.roomId === room.id),
    [room.id],
  )

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
