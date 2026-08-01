// Types
import type { BookingFormValues } from '@features/booking/components/BookingForm/booking-form.types'

export const VALID_BOOKING_VALUES: BookingFormValues = {
  title: 'Weekly planning',
  roomId: 1,
  date: '2030-06-15',
  startTime: '10:00',
  endTime: '11:00',
  repeatWeekly: false,
  recurrenceCount: '2',
}
