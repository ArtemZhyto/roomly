// Modules
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Features
import { useNotifications } from '@features/notifications'

// Hooks
import useBookingCancellation from '@features/my-bookings/hooks/useBookingCancellation'

// Services
import { cancelMyBooking } from '@features/my-bookings/services/cancel-my-booking.service'

// Types
import type {
  CreateNotificationInput,
  NotificationsContextValue,
} from '@features/notifications/types/notification.types'

// Fixtures
import { TEST_RECURRING_BOOKING, TEST_SINGLE_BOOKING } from './my-booking.fixture'

jest.mock('@features/notifications', () => ({
  useNotifications: jest.fn(),
}))

jest.mock('@features/my-bookings/services/cancel-my-booking.service', () => ({
  cancelMyBooking: jest.fn(),
}))

const useNotificationsMock = jest.mocked(useNotifications)

const cancelMyBookingMock = jest.mocked(cancelMyBooking)

const notifyMock = jest.fn<(input: CreateNotificationInput) => string>()
const dismissToastMock = jest.fn<(id: string) => void>()

const markAsReadMock = jest.fn<(id: number) => Promise<void>>()
const markAllAsReadMock = jest.fn<() => Promise<void>>()

const removeNotificationMock = jest.fn<(id: number) => Promise<void>>()
const clearNotificationsMock = jest.fn<() => Promise<void>>()

const retryMock = jest.fn<() => Promise<void>>()

const reloadBookingsMock = jest.fn<() => Promise<void>>()

const setErrorMessageMock = jest.fn<(message: string | null) => void>()

const createNotificationsContext = (): NotificationsContextValue => ({
  notifications: [],
  toasts: [],
  unreadCount: 0,
  isLoading: false,
  errorMessage: null,

  notify: notifyMock,
  dismissToast: dismissToastMock,

  markAsRead: markAsReadMock,
  markAllAsRead: markAllAsReadMock,

  removeNotification: removeNotificationMock,
  clearNotifications: clearNotificationsMock,

  retry: retryMock,
})

describe('useBookingCancellation success', () => {
  beforeEach(() => {
    notifyMock.mockReset()
    dismissToastMock.mockReset()

    markAsReadMock.mockReset()
    markAllAsReadMock.mockReset()

    removeNotificationMock.mockReset()
    clearNotificationsMock.mockReset()

    retryMock.mockReset()
    reloadBookingsMock.mockReset()
    setErrorMessageMock.mockReset()
    cancelMyBookingMock.mockReset()

    notifyMock.mockReturnValue('test-notification-id')

    markAsReadMock.mockResolvedValue(undefined)
    markAllAsReadMock.mockResolvedValue(undefined)

    removeNotificationMock.mockResolvedValue(undefined)
    clearNotificationsMock.mockResolvedValue(undefined)

    retryMock.mockResolvedValue(undefined)
    reloadBookingsMock.mockResolvedValue(undefined)

    useNotificationsMock.mockReturnValue(createNotificationsContext())
  })

  it('cancels one booking occurrence', async () => {
    cancelMyBookingMock.mockResolvedValue({
      title: 'Booking cancelled',
      message: '"Product planning" was cancelled successfully.',
    })

    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    await act(async () => {
      await result.current.confirmCancellation('occurrence')
    })

    expect(cancelMyBookingMock).toHaveBeenCalledWith(TEST_SINGLE_BOOKING, 'occurrence')
  })

  it('cancels a complete series', async () => {
    cancelMyBookingMock.mockResolvedValue({
      title: 'Booking series cancelled',
      message: '"Weekly planning" and its remaining occurrences were cancelled.',
    })

    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_RECURRING_BOOKING)
    })

    await act(async () => {
      await result.current.confirmCancellation('series')
    })

    expect(cancelMyBookingMock).toHaveBeenCalledWith(TEST_RECURRING_BOOKING, 'series')
  })

  it('shows a success notification', async () => {
    cancelMyBookingMock.mockResolvedValue({
      title: 'Booking cancelled',
      message: '"Product planning" was cancelled successfully.',
    })

    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    await act(async () => {
      await result.current.confirmCancellation('occurrence')
    })

    expect(notifyMock).toHaveBeenCalledWith({
      type: 'success',
      title: 'Booking cancelled',
      message: '"Product planning" was cancelled successfully.',
    })
  })

  it('closes the dialog and reloads bookings', async () => {
    cancelMyBookingMock.mockResolvedValue({
      title: 'Booking cancelled',
      message: '"Product planning" was cancelled successfully.',
    })

    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    await act(async () => {
      await result.current.confirmCancellation('occurrence')
    })

    expect(reloadBookingsMock).toHaveBeenCalledTimes(1)

    expect(result.current.isCancellationDialogOpen).toBe(false)

    await waitFor(() => {
      expect(result.current.isCancelling).toBe(false)
    })
  })
})
