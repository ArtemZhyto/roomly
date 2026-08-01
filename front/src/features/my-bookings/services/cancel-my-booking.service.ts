// Features
import { deleteBooking, deleteBookingSeries } from '@features/booking'

// Types
import type { BookingCancellationScope, MyBooking } from '../types'

interface CancellationSuccessMessage {
  title: string
  message: string
}

export const cancelMyBooking = async (
  booking: MyBooking,
  scope: BookingCancellationScope,
): Promise<CancellationSuccessMessage> => {
  const { id, title, seriesId } = booking

  if (scope === 'series' && seriesId !== null) {
    await deleteBookingSeries(seriesId)

    return {
      title: 'Booking series cancelled',

      message: `"${title}" and its remaining ` + 'occurrences were cancelled.',
    }
  }

  await deleteBooking(id)

  return {
    title: seriesId !== null ? 'Occurrence cancelled' : 'Booking cancelled',

    message: `"${title}" was cancelled successfully.`,
  }
}
