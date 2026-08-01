// Features
import { getRoomAvailability, type RoomAvailabilityBooking } from '@features/rooms'

// Types
import type { ScheduleBooking } from '../types'

// Utils
import { addWeeks } from '../utils'

interface LoadRoomScheduleParams {
  roomId: number
  userId?: number
  weekStart: Date
}

const mapRoomBooking = (
  booking: RoomAvailabilityBooking,
  roomId: number,
  userId?: number,
): ScheduleBooking => {
  return {
    id: booking.id,
    roomId,
    title: booking.title,
    authorName: booking.user.name,
    startAt: booking.startTime,
    endAt: booking.endTime,
    ownership: booking.user.id === userId ? 'own' : 'other',
  }
}

export const loadRoomSchedule = async ({
  roomId,
  userId,
  weekStart,
}: LoadRoomScheduleParams): Promise<ScheduleBooking[]> => {
  const weekEnd = addWeeks(weekStart, 1)

  const bookings = await getRoomAvailability({
    roomId,
    from: weekStart,
    to: weekEnd,
  })

  return bookings.map((booking) => {
    return mapRoomBooking(booking, roomId, userId)
  })
}
