'use client'

// Features
import type { Room } from '@features/rooms'
import { BookingDialog, BookingForm } from '@features/booking'

// Components
import ScheduleGrid from '../ScheduleGrid'
import ScheduleToolbar from '../ScheduleToolbar'
import BookingSuccessState from './BookingSuccessState'
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

        <ScheduleGrid
          weekStart={weekStart}
          bookings={roomBookings}
          roomId={room.id}
          onSelectSlot={handleSelectSlot}
        />
      </div>

      <BookingDialog isOpen={isBookingDialogOpen} onClose={handleCloseBookingDialog}>
        {bookingStatus === 'success' ? (
          <BookingSuccessState onClose={handleCloseBookingDialog} />
        ) : (
          <BookingForm
            key={bookingFormKey}
            initialRoom={room}
            initialDate={selectedSlot?.date}
            initialStartTime={selectedSlot?.startTime}
            initialEndTime={selectedSlot?.endTime}
            status={bookingStatus}
            onCancel={handleCloseBookingDialog}
            onSubmit={handleBookingSubmit}
          />
        )}
      </BookingDialog>
    </>
  )
}

export default WeeklySchedule
