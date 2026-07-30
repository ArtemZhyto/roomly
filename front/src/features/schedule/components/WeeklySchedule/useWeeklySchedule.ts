'use client'

// Modules
import { useEffect, useMemo, useState } from 'react'

// Lib
import { normalizeApiError } from '@lib/api/api-error'

// Features
import { getRoomAvailability, type Room } from '@features/rooms'
import {
  createBooking,
  createBookingDateTime,
  type BookingFormStatus,
  type BookingFormValues,
} from '@features/booking'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../../utils'

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

  const [weekStart, setWeekStart] = useState(initialWeekStart)

  const [roomBookings, setRoomBookings] = useState<ScheduleBooking[]>([])

  const [scheduleStatus, setScheduleStatus] = useState<ScheduleLoadingStatus>('loading')

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  const [bookingStatus, setBookingStatus] = useState<BookingFormStatus>('idle')

  const [bookingError, setBookingError] = useState<string>()

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
    setBookingError(undefined)
    setIsBookingDialogOpen(true)
  }

  const handleSelectSlot = (selection: ScheduleSlotSelection) => {
    setSelectedSlot(selection)
    setBookingStatus('idle')
    setBookingError(undefined)
    setIsBookingDialogOpen(true)
  }

  const handleCloseBookingDialog = () => {
    setIsBookingDialogOpen(false)
    setBookingStatus('idle')
    setBookingError(undefined)
    setSelectedSlot(null)
  }

  const handleBookingSubmit = async (values: BookingFormValues) => {
    setBookingStatus('loading')
    setBookingError(undefined)

    try {
      await createBooking({
        roomId: room.id,
        title: values.title.trim(),
        startTime: createBookingDateTime(values.date, values.startTime),
        endTime: createBookingDateTime(values.date, values.endTime),
      })

      const weekEnd = addWeeks(weekStart, 1)

      const bookings = await getRoomAvailability({
        roomId: room.id,
        from: weekStart,
        to: weekEnd,
      })

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
      setBookingStatus('success')
    } catch (error) {
      const normalizedError = normalizeApiError(error)

      setBookingError(normalizedError.message)

      setBookingStatus(normalizedError.status === 409 ? 'conflict' : 'error')
    }
  }

  return {
    weekStart,
    weekRange,
    isCurrentWeek,
    roomBookings,
    scheduleStatus,
    isBookingDialogOpen,
    bookingStatus,
    bookingError,
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
