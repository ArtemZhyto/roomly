export type MyBookingPeriod = 'upcoming' | 'past'

export interface MyBooking {
  id: number
  roomId: number
  roomName: string
  roomFloor: number
  title: string
  startAt: string
  endAt: string
  period: MyBookingPeriod
}
