export interface BookingInterval {
  startDate: Date
  endDate: Date
}

export const doBookingIntervalsOverlap = (
  firstInterval: BookingInterval,
  secondInterval: BookingInterval,
): boolean => {
  return (
    firstInterval.startDate < secondInterval.endDate &&
    firstInterval.endDate > secondInterval.startDate
  )
}
