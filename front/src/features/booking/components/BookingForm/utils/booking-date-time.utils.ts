export const createLocalDateTime = (date: string, time: string): Date | null => {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time)

  if (!dateMatch || !timeMatch) {
    return null
  }

  const year = Number(dateMatch[1])
  const month = Number(dateMatch[2])
  const day = Number(dateMatch[3])

  const hours = Number(timeMatch[1])
  const minutes = Number(timeMatch[2])

  const result = new Date(year, month - 1, day, hours, minutes, 0, 0)

  const isValid =
    result.getFullYear() === year &&
    result.getMonth() === month - 1 &&
    result.getDate() === day &&
    result.getHours() === hours &&
    result.getMinutes() === minutes

  return isValid ? result : null
}

export const formatDateInputValue = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const createBookingDateTime = (date: string, time: string): string => {
  const value = createLocalDateTime(date, time)

  if (!value) {
    throw new Error('Invalid booking date or time')
  }

  return value.toISOString()
}

export const createBookingEndDateTime = (
  date: string,
  startTime: string,
  endTime: string,
): string => {
  const startDate = createLocalDateTime(date, startTime)

  const endDate = createLocalDateTime(date, endTime)

  if (!startDate || !endDate) {
    throw new Error('Invalid booking date or time')
  }

  if (endDate.getTime() <= startDate.getTime()) {
    throw new Error('Booking end time must be later than start time')
  }

  return endDate.toISOString()
}
