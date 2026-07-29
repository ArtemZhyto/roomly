'use client'

// Modules
import { useMemo, useState } from 'react'
import { CalendarPlus } from 'lucide-react'

// Features
import type { Room } from '@features/rooms'
import { BookingDialog, BookingForm, type BookingFormStatus } from '@features/booking'

// Components
import ScheduleGrid from '../ScheduleGrid'
import ScheduleToolbar from '../ScheduleToolbar'

// Data
import { mockBookings } from '../../data'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../../utils'

interface WeeklyScheduleProps {
  room: Room
}

const WeeklySchedule = ({ room }: WeeklyScheduleProps) => {
  const currentWeekStart = useMemo(() => getStartOfWeek(new Date()), [])

  const [weekStart, setWeekStart] = useState(currentWeekStart)

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  const [bookingStatus, setBookingStatus] = useState<BookingFormStatus>('idle')

  const weekRange = useMemo(() => formatWeekRange(weekStart), [weekStart])

  const isCurrentWeek = isSameDay(weekStart, currentWeekStart)

  const roomBookings = useMemo(
    () => mockBookings.filter((booking) => booking.roomId === room.id),
    [room.id],
  )

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
    setBookingStatus('idle')
    setIsBookingDialogOpen(true)
  }

  const handleCloseBookingDialog = () => {
    setIsBookingDialogOpen(false)
    setBookingStatus('idle')
  }

  const handleBookingSubmit = () => {
    setBookingStatus('loading')

    window.setTimeout(() => {
      setBookingStatus('success')
    }, 900)
  }

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

        <div className='flex justify-end'>
          <button
            type='button'
            className='inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-control border border-primary bg-primary px-4 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
            onClick={handleOpenBookingDialog}
          >
            <CalendarPlus className='size-4' strokeWidth={2} aria-hidden='true' />
            Book a room
          </button>
        </div>

        <ScheduleGrid weekStart={weekStart} bookings={roomBookings} />
      </div>

      <BookingDialog isOpen={isBookingDialogOpen} onClose={handleCloseBookingDialog}>
        {bookingStatus === 'success' ? (
          <div className='flex flex-col items-center py-6 text-center'>
            <div className='grid size-14 place-items-center rounded-full bg-success-light text-success-dark'>
              <CalendarPlus className='size-6' strokeWidth={2} aria-hidden='true' />
            </div>

            <h3 className='mt-5 text-xl font-semibold text-text-primary'>Booking created</h3>

            <p className='mt-2 max-w-90 text-sm leading-6 text-text-secondary'>
              Your meeting has been added successfully. The schedule will be updated after backend
              integration.
            </p>

            <button
              type='button'
              className='mt-6 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control border border-primary bg-primary px-5 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover'
              onClick={handleCloseBookingDialog}
            >
              Done
            </button>
          </div>
        ) : (
          <BookingForm
            initialRoom={room}
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
