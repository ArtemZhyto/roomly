// Modules
import { describe, expect, it } from '@jest/globals'

// Utils
import {
  restoreNotification,
  restoreNotifications,
  sortNotificationsByCreatedAt,
} from '@features/notifications/utils/notification-list.utils'

// Types
import type { AppNotification } from '@features/notifications/types/notification.types'

const FIRST_NOTIFICATION: AppNotification = {
  id: 1,
  type: 'warning',
  title: 'First notification',
  message: 'First message',
  createdAt: '2030-06-15T09:00:00.000Z',
  isRead: false,
}

const SECOND_NOTIFICATION: AppNotification = {
  id: 2,
  type: 'warning',
  title: 'Second notification',
  message: 'Second message',
  createdAt: '2030-06-15T10:00:00.000Z',
  isRead: true,
}

const THIRD_NOTIFICATION: AppNotification = {
  id: 3,
  type: 'warning',
  title: 'Third notification',
  message: 'Third message',
  createdAt: '2030-06-15T11:00:00.000Z',
  isRead: false,
}

describe('notification list utils', () => {
  it('sorts notifications from newest to oldest', () => {
    const originalNotifications = [FIRST_NOTIFICATION, THIRD_NOTIFICATION, SECOND_NOTIFICATION]

    expect(sortNotificationsByCreatedAt(originalNotifications)).toEqual([
      THIRD_NOTIFICATION,
      SECOND_NOTIFICATION,
      FIRST_NOTIFICATION,
    ])
  })

  it('does not mutate the original notification list', () => {
    const notifications = [FIRST_NOTIFICATION, THIRD_NOTIFICATION, SECOND_NOTIFICATION]
    const originalOrder = [...notifications]

    sortNotificationsByCreatedAt(notifications)

    expect(notifications).toEqual(originalOrder)
  })

  it('restores one notification at its original index', () => {
    expect(
      restoreNotification([FIRST_NOTIFICATION, THIRD_NOTIFICATION], SECOND_NOTIFICATION, 1),
    ).toEqual([FIRST_NOTIFICATION, SECOND_NOTIFICATION, THIRD_NOTIFICATION])
  })

  it('does not restore an existing notification twice', () => {
    const notifications = [FIRST_NOTIFICATION, SECOND_NOTIFICATION]

    expect(restoreNotification(notifications, SECOND_NOTIFICATION, 1)).toBe(notifications)
  })

  it('uses the beginning of the list for a negative index', () => {
    expect(restoreNotification([SECOND_NOTIFICATION], FIRST_NOTIFICATION, -5)).toEqual([
      FIRST_NOTIFICATION,
      SECOND_NOTIFICATION,
    ])
  })

  it('restores multiple missing notifications', () => {
    expect(
      restoreNotifications([FIRST_NOTIFICATION], [SECOND_NOTIFICATION, THIRD_NOTIFICATION]),
    ).toEqual([THIRD_NOTIFICATION, SECOND_NOTIFICATION, FIRST_NOTIFICATION])
  })

  it('does not duplicate existing notifications', () => {
    expect(
      restoreNotifications(
        [FIRST_NOTIFICATION, SECOND_NOTIFICATION],
        [SECOND_NOTIFICATION, THIRD_NOTIFICATION],
      ),
    ).toEqual([THIRD_NOTIFICATION, SECOND_NOTIFICATION, FIRST_NOTIFICATION])
  })
})
