// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import { mapNotification } from '@features/notifications/utils/mapNotification'

// Types
import type { BackendNotificationResponse } from '@features/notifications/types/notification.types'

describe('mapNotification', () => {
  it('maps an unread backend notification', () => {
    const notification: BackendNotificationResponse = {
      id: 10,
      userId: 2,
      currentBookingId: 20,
      nextBookingId: 21,
      message: 'Your next booking starts in 10 minutes.',
      readAt: null,
      createdAt: '2030-06-15T09:00:00.000Z',
    }

    expect(mapNotification(notification)).toEqual({
      id: 10,
      type: 'warning',
      title: 'Booking ending soon',
      message: 'Your next booking starts in 10 minutes.',
      createdAt: '2030-06-15T09:00:00.000Z',
      isRead: false,
    })
  })

  it('maps a read backend notification', () => {
    const notification: BackendNotificationResponse = {
      id: 11,
      userId: 2,
      currentBookingId: 20,
      nextBookingId: 21,
      message: 'Another booking is starting soon.',
      readAt: '2030-06-15T09:05:00.000Z',
      createdAt: '2030-06-15T09:00:00.000Z',
    }

    expect(mapNotification(notification).isRead).toBe(true)
  })
})
