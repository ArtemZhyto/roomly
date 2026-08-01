const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export const formatDashboardBookingDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: USER_TIME_ZONE,
  }).format(new Date(value))
}

export const formatDashboardBookingTimeRange = (startTime: string, endTime: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: USER_TIME_ZONE,
  })

  return [formatter.format(new Date(startTime)), formatter.format(new Date(endTime))].join('–')
}

export const getDashboardBookingDateValue = (value: string): string => {
  const date = new Date(value)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
