'use client'

// Modules
import { useEffect, useState } from 'react'

// Constants
import { MILLISECONDS_IN_MINUTE } from './schedule-grid.constants'

const useCurrentTime = (): Date => {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date())
    }

    const timeoutDelay = MILLISECONDS_IN_MINUTE - (Date.now() % MILLISECONDS_IN_MINUTE)

    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      updateCurrentTime()

      intervalId = window.setInterval(updateCurrentTime, MILLISECONDS_IN_MINUTE)
    }, timeoutDelay)

    return () => {
      window.clearTimeout(timeoutId)

      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  return currentTime
}

export default useCurrentTime
