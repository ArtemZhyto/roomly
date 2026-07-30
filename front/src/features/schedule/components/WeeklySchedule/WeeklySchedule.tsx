'use client'

// Features
import type { Room } from '@features/rooms'
import { BookingDialog, BookingForm } from '@features/booking'

// Components
import ScheduleGrid from '../ScheduleGrid'
import ScheduleToolbar from '../ScheduleToolbar'
import BookingSuccessState from './BookingSuccessState'
import WeeklyScheduleActions from './WeeklyScheduleActions'
import ScheduleLoadingState from '../ScheduleLoadingState'

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
          <div
            className='flex min-h-72 flex-col items-center justify-center gap-3 rounded-card border border-border bg-surface px-6 text-center'
            role='alert'
          >
            <p className='m-0 text-lg font-semibold text-text-primary'>
              Could not load the schedule
            </p>

            <p className='m-0 max-w-md text-sm leading-6 text-text-secondary'>
              Something went wrong while loading bookings for this week.
            </p>
          </div>
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
