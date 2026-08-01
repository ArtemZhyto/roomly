// Modules
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Hooks
import useScheduleWeek from '@features/schedule/hooks/useScheduleWeek'

describe('useScheduleWeek', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2030, 5, 12, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('uses the week containing the initial date', () => {
    const { result } = renderHook(() =>
      useScheduleWeek({
        initialDate: new Date(2030, 5, 19, 14, 0, 0),
      }),
    )

    expect(result.current.weekStart).toEqual(new Date(2030, 5, 17))
  })

  it('uses the current week without an initial date', () => {
    const { result } = renderHook(() => useScheduleWeek({}))

    expect(result.current.weekStart).toEqual(new Date(2030, 5, 10))
    expect(result.current.isCurrentWeek).toBe(true)
  })

  it('shows the previous week', () => {
    const { result } = renderHook(() =>
      useScheduleWeek({
        initialDate: new Date(2030, 5, 19),
      }),
    )

    act(() => {
      result.current.showPreviousWeek()
    })

    expect(result.current.weekStart).toEqual(new Date(2030, 5, 10))
  })

  it('shows the next week', () => {
    const { result } = renderHook(() =>
      useScheduleWeek({
        initialDate: new Date(2030, 5, 19),
      }),
    )

    act(() => {
      result.current.showNextWeek()
    })

    expect(result.current.weekStart).toEqual(new Date(2030, 5, 24))
  })

  it('returns to the current week', () => {
    const { result } = renderHook(() =>
      useScheduleWeek({
        initialDate: new Date(2030, 6, 10),
      }),
    )

    expect(result.current.isCurrentWeek).toBe(false)

    act(() => {
      result.current.showCurrentWeek()
    })

    expect(result.current.weekStart).toEqual(new Date(2030, 5, 10))
    expect(result.current.isCurrentWeek).toBe(true)
  })

  it('updates when the initial date changes', () => {
    const { result, rerender } = renderHook(
      ({ initialDate }) =>
        useScheduleWeek({
          initialDate,
        }),
      {
        initialProps: {
          initialDate: new Date(2030, 5, 12),
        },
      },
    )

    rerender({
      initialDate: new Date(2030, 6, 3),
    })

    expect(result.current.weekStart).toEqual(new Date(2030, 6, 1))
  })
})
