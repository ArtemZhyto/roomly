export const parseNotificationId = (value: unknown): number | null => {
  if (typeof value !== 'string') {
    return null
  }

  const notificationId = Number(value)

  if (!Number.isInteger(notificationId) || notificationId <= 0) {
    return null
  }

  return notificationId
}