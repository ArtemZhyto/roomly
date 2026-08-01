// Modules
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals'

// Hooks
import usePasswordVisibility from '@features/auth/hooks/usePasswordVisibility'

describe('usePasswordVisibility', () => {
  it('hides the password initially', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    expect(result.current.isVisible).toBe(false)
  })

  it('shows the password after toggling', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    act(() => {
      result.current.toggleVisibility()
    })

    expect(result.current.isVisible).toBe(true)
  })

  it('hides the password after toggling twice', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    act(() => {
      result.current.toggleVisibility()
      result.current.toggleVisibility()
    })

    expect(result.current.isVisible).toBe(false)
  })
})
