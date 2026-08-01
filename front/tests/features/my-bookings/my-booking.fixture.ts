// Types
import type { MyBooking } from '@features/my-bookings/types'

export const TEST_SINGLE_BOOKING: MyBooking = {
  id: 10,
  roomId: 2,
  roomName: 'Atlas',
  roomFloor: 3,
  roomCapacity: 10,
  title: 'Product planning',
  startAt: '2030-06-15T10:00:00.000Z',
  endAt: '2030-06-15T11:00:00.000Z',
  seriesId: null,
  period: 'upcoming',
}

export const TEST_RECURRING_BOOKING: MyBooking = {
  ...TEST_SINGLE_BOOKING,
  id: 11,
  title: 'Weekly planning',
  seriesId: 7,
}
