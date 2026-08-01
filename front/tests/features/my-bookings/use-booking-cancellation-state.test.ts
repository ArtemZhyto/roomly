// Modules
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// Features
import { useNotifications } from '@features/notifications'

// Hooks
import useBookingCancellation from '@features/my-bookings/hooks/useBookingCancellation'

// Types
import type {
  CreateNotificationInput,
  NotificationsContextValue,
} from '@features/notifications/types/notification.types'

// Fixtures
import { TEST_SINGLE_BOOKING } from './my-booking.fixture'

jest.mock('@features/notifications', () => ({
  useNotifications: jest.fn(),
}))

const useNotificationsMock = jest.mocked(useNotifications)

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

describe('useBookingCancellation state', () => {
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

    notifyMock.mockReturnValue('test-notification-id')

    markAsReadMock.mockResolvedValue(undefined)
    markAllAsReadMock.mockResolvedValue(undefined)

    removeNotificationMock.mockResolvedValue(undefined)
    clearNotificationsMock.mockResolvedValue(undefined)

    retryMock.mockResolvedValue(undefined)
    reloadBookingsMock.mockResolvedValue(undefined)

    useNotificationsMock.mockReturnValue(createNotificationsContext())
  })

  it('returns the initial cancellation state', () => {
    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    expect(result.current.selectedBooking).toBeNull()
    expect(result.current.isCancellationDialogOpen).toBe(false)
    expect(result.current.isCancelling).toBe(false)
  })

  it('opens the dialog for the selected booking', () => {
    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    expect(result.current.selectedBooking).toEqual(TEST_SINGLE_BOOKING)
    expect(result.current.isCancellationDialogOpen).toBe(true)

    expect(setErrorMessageMock).toHaveBeenCalledWith(null)
  })

  it('closes the cancellation dialog', () => {
    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    act(() => {
      result.current.closeCancellationDialog()
    })

    expect(result.current.isCancellationDialogOpen).toBe(false)
  })

  it('clears the selected booking after the dialog closes', () => {
    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    act(() => {
      result.current.requestCancellation(TEST_SINGLE_BOOKING)
    })

    act(() => {
      result.current.finishCancellationDialogClose()
    })

    expect(result.current.selectedBooking).toBeNull()
  })

  it('does nothing when confirmation is requested without a booking', async () => {
    const { result } = renderHook(() =>
      useBookingCancellation({
        reloadBookings: reloadBookingsMock,
        setErrorMessage: setErrorMessageMock,
      }),
    )

    await act(async () => {
      await result.current.confirmCancellation('occurrence')
    })

    expect(reloadBookingsMock).not.toHaveBeenCalled()
    expect(notifyMock).not.toHaveBeenCalled()
  })
})
