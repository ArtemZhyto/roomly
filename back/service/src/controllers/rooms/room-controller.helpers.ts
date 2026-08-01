export interface DateRange {
  fromDate: Date
  toDate: Date
}

export const parseRoomId = (value: unknown): number | null => {
  if (typeof value !== 'string') {
    return null
  }

  const roomId = Number(value)

  if (!Number.isInteger(roomId) || roomId <= 0) {
    return null
  }

  return roomId
}

export const parseMinCapacity = (value: unknown): number | null => {
  if (value === undefined) {
    return 0
  }

  if (typeof value !== 'string') {
    return null
  }

  const minCapacity = Number(value)

  if (!Number.isInteger(minCapacity) || minCapacity < 0) {
    return null
  }

  return minCapacity
}

export const parseDateRange = (from: unknown, to: unknown): DateRange | null => {
  if (typeof from !== 'string' || typeof to !== 'string' || from.length === 0 || to.length === 0) {
    return null
  }

  const fromDate = new Date(from)
  const toDate = new Date(to)

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime()) || fromDate >= toDate) {
    return null
  }

  return {
    fromDate,
    toDate,
  }
}