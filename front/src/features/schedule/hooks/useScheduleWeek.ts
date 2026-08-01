'use client'

// Modules
import { useCallback, useEffect, useMemo, useState } from 'react'

// Utils
import { addWeeks, formatWeekRange, getStartOfWeek, isSameDay } from '../utils'

interface UseScheduleWeekOptions {
  initialDate?: Date
}

const useScheduleWeek = ({ initialDate }: UseScheduleWeekOptions) => {
  const currentWeekStart = useMemo(() => {
    return getStartOfWeek(new Date())
  }, [])

  const initialWeekStart = useMemo(() => {
    return getStartOfWeek(initialDate ?? new Date())
  }, [initialDate])

  const [weekStart, setWeekStart] = useState(initialWeekStart)

  useEffect(() => {
    setWeekStart(initialWeekStart)
  }, [initialWeekStart])

  const weekRange = useMemo(() => {
    return formatWeekRange(weekStart)
  }, [weekStart])

  const isCurrentWeek = isSameDay(weekStart, currentWeekStart)

  const showPreviousWeek = useCallback((): void => {
    setWeekStart((currentWeek) => {
      return addWeeks(currentWeek, -1)
    })
  }, [])

  const showCurrentWeek = useCallback((): void => {
    setWeekStart(currentWeekStart)
  }, [currentWeekStart])

  const showNextWeek = useCallback((): void => {
    setWeekStart((currentWeek) => {
      return addWeeks(currentWeek, 1)
    })
  }, [])

  return {
    weekStart,
    weekRange,
    isCurrentWeek,
    showPreviousWeek,
    showCurrentWeek,
    showNextWeek,
  }
}

export default useScheduleWeek
