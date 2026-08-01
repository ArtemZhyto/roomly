'use client'

// Modules
import { useCallback, useEffect, useState } from 'react'

interface UseCooldownResult {
  cooldown: number
  isCoolingDown: boolean
  startCooldown: (seconds: number) => void
  resetCooldown: () => void
}

const normalizeCooldown = (seconds: number): number => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return 0
  }

  return Math.ceil(seconds)
}

const useCooldown = (initialSeconds = 0): UseCooldownResult => {
  const [cooldown, setCooldown] = useState(() => {
    return normalizeCooldown(initialSeconds)
  })

  useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setCooldown((currentCooldown) => {
        return Math.max(0, currentCooldown - 1)
      })
    }, 1000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [cooldown])

  const startCooldown = useCallback((seconds: number): void => {
    setCooldown(normalizeCooldown(seconds))
  }, [])

  const resetCooldown = useCallback((): void => {
    setCooldown(0)
  }, [])

  return {
    cooldown,
    isCoolingDown: cooldown > 0,
    startCooldown,
    resetCooldown,
  }
}

export default useCooldown
