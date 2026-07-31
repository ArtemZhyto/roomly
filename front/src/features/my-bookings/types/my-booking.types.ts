export type MyBookingPeriod = 'upcoming' | 'past'
export type BookingCancellationScope = 'occurrence' | 'series'

export interface MyBooking {
  id: number
  roomId: number
  roomName: string
  roomFloor: number
  roomCapacity: number
  title: string
  startAt: string
  endAt: string
  seriesId: number | null
  period: MyBookingPeriod
}
