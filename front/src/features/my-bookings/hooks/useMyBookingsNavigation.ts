'use client'

// Modules
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

// Types
import type { MyBooking } from '../types'

interface UseMyBookingsNavigationResult {
  openBooking: (booking: MyBooking) => void
}

const useMyBookingsNavigation = (): UseMyBookingsNavigationResult => {
  const router = useRouter()

  const openBooking = useCallback(
    (booking: MyBooking): void => {
      const date = new Date(booking.startAt)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      const dateParam = `${year}-${month}-${day}`

      router.push(`/schedule?room=${booking.roomId}&date=${dateParam}`)
    },
    [router],
  )

  return {
    openBooking,
  }
}

export default useMyBookingsNavigation
