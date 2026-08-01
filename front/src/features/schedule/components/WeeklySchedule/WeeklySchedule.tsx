'use client'

// Features
import { BookingDialog, BookingForm } from '@features/booking'

import type { Room } from '@features/rooms'

// Components
import ScheduleGrid from '../ScheduleGrid'
import ScheduleLoadingState from '../ScheduleLoadingState'
import ScheduleToolbar from '../ScheduleToolbar'

import BookingSuccessState from './BookingSuccessState'
import ScheduleErrorState from './ScheduleErrorState'
import WeeklyScheduleActions from './WeeklyScheduleActions'

// Hooks
import useWeeklySchedule from './useWeeklySchedule'

interface WeeklyScheduleProps {
  room: Room
  initialDate?: Date
}

const WeeklySchedule = ({ room, initialDate }: WeeklyScheduleProps) => {
  const {
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
    reloadSchedule,
    handlePreviousWeek,
    handleCurrentWeek,
    handleNextWeek,
    handleOpenBookingDialog,
    handleSelectSlot,
    handleCloseBookingDialog,
    handleBookingSubmit,
  } = useWeeklySchedule({
    room,
    initialDate,
  })

  return (
    <>
      <div className='flex flex-col gap-5'>
        <ScheduleToolbar
          room={room}
          weekRange={weekRange}
          isCurrentWeek={isCurrentWeek}
          onPreviousWeek={handlePreviousWeek}
          onCurrentWeek={handleCurrentWeek}
          onNextWeek={handleNextWeek}
        />

        <WeeklyScheduleActions onBookRoom={handleOpenBookingDialog} />

        {scheduleStatus === 'loading' && <ScheduleLoadingState />}

        {scheduleStatus === 'error' && (
          <ScheduleErrorState
            onRetry={() => {
              void reloadSchedule()
            }}
          />
        )}

        {scheduleStatus === 'success' && (
          <ScheduleGrid
            weekStart={weekStart}
            bookings={roomBookings}
            roomId={room.id}
            onSelectSlot={handleSelectSlot}
          />
        )}
      </div>

      <BookingDialog isOpen={isBookingDialogOpen} onClose={handleCloseBookingDialog}>
        {bookingStatus === 'success' ? (
          <BookingSuccessState onClose={handleCloseBookingDialog} />
        ) : (
          <BookingForm
            key={bookingFormKey}
            room={room}
            initialDate={selectedSlot?.date}
            initialStartTime={selectedSlot?.startTime}
            initialEndTime={selectedSlot?.endTime}
            status={bookingStatus}
            serverError={bookingError}
            onCancel={handleCloseBookingDialog}
            onSubmit={handleBookingSubmit}
          />
        )}
      </BookingDialog>
    </>
  )
}

export default WeeklySchedule
