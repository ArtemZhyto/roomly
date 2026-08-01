export type BookingOwnership = 'own' | 'other'

export type ScheduleLoadingStatus = 'loading' | 'success' | 'error'

export interface ScheduleBooking {
  id: number
  roomId: number
  title: string
  authorName: string
  startAt: string
  endAt: string
  ownership: BookingOwnership
}
