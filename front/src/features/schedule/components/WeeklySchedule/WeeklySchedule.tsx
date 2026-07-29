'use client'

// Modules
import { useMemo, useState } from 'react'

// Features
import type { Room } from '@features/rooms'

// Components
import ScheduleToolbar from '../ScheduleToolbar'
import ScheduleGrid from '../ScheduleGrid'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../../utils'
import { mockBookings } from '../../data'

interface WeeklyScheduleProps {
  room: Room
}

const WeeklySchedule = ({ room }: WeeklyScheduleProps) => {
  const currentWeekStart = useMemo(() => getStartOfWeek(new Date()), [])

  const [weekStart, setWeekStart] = useState(currentWeekStart)

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

  return (
    <div className='flex flex-col gap-5'>
      <ScheduleToolbar
        room={room}
        weekRange={weekRange}
        isCurrentWeek={isCurrentWeek}
        onPreviousWeek={handlePreviousWeek}
        onCurrentWeek={handleCurrentWeek}
        onNextWeek={handleNextWeek}
      />

      <ScheduleGrid weekStart={weekStart} bookings={roomBookings} />
    </div>
  )
}

export default WeeklySchedule
