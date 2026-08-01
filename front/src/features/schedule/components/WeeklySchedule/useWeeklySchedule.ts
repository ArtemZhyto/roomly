'use client'

// Features
import type { Room } from '@features/rooms'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Hooks
import useRoomSchedule from '../../hooks/useRoomSchedule'
import useScheduleBookingDialog from '../../hooks/useScheduleBookingDialog'
import useScheduleWeek from '../../hooks/useScheduleWeek'

interface UseWeeklyScheduleOptions {
  room: Room
  initialDate?: Date
}

const useWeeklySchedule = ({ room, initialDate }: UseWeeklyScheduleOptions) => {
  const { user } = useAuth()

  const { weekStart, weekRange, isCurrentWeek, showPreviousWeek, showCurrentWeek, showNextWeek } =
    useScheduleWeek({
      initialDate,
    })

  const {
    bookings,
    status: scheduleStatus,
    reloadSchedule,
  } = useRoomSchedule({
    roomId: room.id,
    userId: user?.id,
    weekStart,
  })

  const {
    isOpen: isBookingDialogOpen,
    status: bookingStatus,
    errorMessage: bookingError,
    selectedSlot,
    formKey: bookingFormKey,
    openDialog: handleOpenBookingDialog,
    selectSlot: handleSelectSlot,
    closeDialog: handleCloseBookingDialog,
    submitBooking: handleBookingSubmit,
  } = useScheduleBookingDialog({
    roomId: room.id,
    reloadSchedule,
  })

  return {
    weekStart,
    weekRange,
    isCurrentWeek,
    roomBookings: bookings,
    scheduleStatus,
    isBookingDialogOpen,
    bookingStatus,
    bookingError,
    selectedSlot,
    bookingFormKey,
    reloadSchedule,

    handlePreviousWeek: showPreviousWeek,

    handleCurrentWeek: showCurrentWeek,

    handleNextWeek: showNextWeek,

    handleOpenBookingDialog,
    handleSelectSlot,
    handleCloseBookingDialog,
    handleBookingSubmit,
  }
}

export default useWeeklySchedule
