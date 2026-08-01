// Modules
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

// Hooks
import useCooldown from '@features/auth/hooks/useCooldown'

describe('useCooldown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('starts without an active cooldown', () => {
    const { result } = renderHook(() => useCooldown())

    expect(result.current.cooldown).toBe(0)
    expect(result.current.isCoolingDown).toBe(false)
  })

  it('starts a cooldown', () => {
    const { result } = renderHook(() => useCooldown())

    act(() => {
      result.current.startCooldown(3)
    })

    expect(result.current.cooldown).toBe(3)
    expect(result.current.isCoolingDown).toBe(true)
  })

  it('decreases the cooldown every second', () => {
    const { result } = renderHook(() => useCooldown())

    act(() => {
      result.current.startCooldown(3)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.cooldown).toBe(2)
  })

  it('stops at zero', () => {
    const { result } = renderHook(() => useCooldown())

    act(() => {
      result.current.startCooldown(2)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.cooldown).toBe(1)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.cooldown).toBe(0)
    expect(result.current.isCoolingDown).toBe(false)
  })

  it('resets the cooldown immediately', () => {
    const { result } = renderHook(() => useCooldown())

    act(() => {
      result.current.startCooldown(10)
    })

    act(() => {
      result.current.resetCooldown()
    })

    expect(result.current.cooldown).toBe(0)
    expect(result.current.isCoolingDown).toBe(false)
  })
})
