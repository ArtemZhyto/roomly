export const parseScheduleRoomId = (value: string | null): number | null => {
  if (!value) {
    return null
  }

  const roomId = Number(value)

  if (!Number.isInteger(roomId) || roomId <= 0) {
    return null
  }

  return roomId
}

export const parseScheduleDate = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return undefined
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  const date = new Date(year, month - 1, day)

  const isValidDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  return isValidDate ? date : undefined
}
