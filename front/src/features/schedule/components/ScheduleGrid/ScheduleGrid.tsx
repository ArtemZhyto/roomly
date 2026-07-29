'use client'

// Modules
import { useEffect, useMemo, useState } from 'react'

// Types
import type { ScheduleBooking } from '../../types'

// Constants
import { OFFICE_END_HOUR, OFFICE_START_HOUR, SLOT_DURATION_MINUTES } from '../../constants'

// Utils
import {
  formatDayNumber,
  formatWeekDay,
  getScheduleSlots,
  getWeekDays,
  isSameDay,
} from '../../utils'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleGridProps {
  weekStart: Date
  bookings: ScheduleBooking[]
}

const MINUTES_IN_HOUR = 60
const MILLISECONDS_IN_MINUTE = 60_000

const getMinutesFromOfficeStart = (date: Date): number => {
  return (date.getHours() - OFFICE_START_HOUR) * MINUTES_IN_HOUR + date.getMinutes()
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const ScheduleGrid = ({ weekStart, bookings }: ScheduleGridProps) => {
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

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart])
  const slots = useMemo(() => getScheduleSlots(), [])

  const totalMinutes = (OFFICE_END_HOUR - OFFICE_START_HOUR) * MINUTES_IN_HOUR

  const currentTimeMinutes = getMinutesFromOfficeStart(currentTime)

  const isCurrentTimeVisible = currentTimeMinutes >= 0 && currentTimeMinutes <= totalMinutes

  const currentTimePosition = (currentTimeMinutes / totalMinutes) * 100

  return (
    <section className={styles.wrapper} aria-label='Weekly room schedule'>
      <div className={styles.currentTimeStatus}>
        <span className={styles.currentTimeStatusDot} aria-hidden='true' />

        <span>Current time: {formatTime(currentTime)}</span>

        {!isCurrentTimeVisible && (
          <span className={styles.currentTimeStatusNote}>Outside office hours</span>
        )}
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.calendar}>
          <div className={styles.headerCorner}>Time</div>

          {weekDays.map((day) => {
            const isToday = isSameDay(day, currentTime)

            return (
              <div
                key={day.toISOString()}
                className={[styles.dayHeader, isToday ? styles.dayHeaderToday : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={styles.dayName}>{formatWeekDay(day)}</span>

                <span className={styles.dayNumber}>{formatDayNumber(day)}</span>
              </div>
            )
          })}

          <div className={styles.timeColumn}>
            {slots.map((slot) => (
              <div key={slot.index} className={styles.timeSlot}>
                <span className={slot.minute === 30 ? styles.halfHourLabel : undefined}>
                  {slot.label}
                </span>
              </div>
            ))}
          </div>

          {weekDays.map((day) => {
            const dayBookings = bookings.filter((booking) =>
              isSameDay(new Date(booking.startAt), day),
            )

            const isToday = isSameDay(day, currentTime)

            return (
              <div
                key={day.toISOString()}
                className={[styles.dayColumn, isToday ? styles.dayColumnToday : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {slots.map((slot) => (
                  <div key={slot.index} className={styles.gridSlot} />
                ))}

                {isToday && isCurrentTimeVisible && (
                  <div
                    className={styles.currentTimeLine}
                    style={{
                      top: `${currentTimePosition}%`,
                    }}
                    aria-label={`Current time: ${formatTime(currentTime)}`}
                  >
                    <span className={styles.currentTimeDot} aria-hidden='true' />
                  </div>
                )}

                {dayBookings.map((booking) => {
                  const startDate = new Date(booking.startAt)

                  const endDate = new Date(booking.endAt)

                  const startMinutes = getMinutesFromOfficeStart(startDate)

                  const durationMinutes =
                    (endDate.getTime() - startDate.getTime()) / MILLISECONDS_IN_MINUTE

                  const top = (startMinutes / totalMinutes) * 100

                  const height = (durationMinutes / totalMinutes) * 100

                  const isCompact = durationMinutes <= SLOT_DURATION_MINUTES

                  const bookingClassName = [
                    styles.booking,
                    booking.ownership === 'own' ? styles.bookingOwn : styles.bookingOther,
                    isCompact ? styles.bookingCompact : '',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  return (
                    <article
                      key={booking.id}
                      className={bookingClassName}
                      style={{
                        top: `${top}%`,
                        height: `${height}%`,
                      }}
                      title={[
                        booking.title,
                        booking.authorName,
                        `${formatTime(startDate)} – ${formatTime(endDate)}`,
                      ].join(' · ')}
                    >
                      <strong className={styles.bookingTitle}>{booking.title}</strong>

                      {!isCompact && (
                        <>
                          <span className={styles.bookingAuthor}>{booking.authorName}</span>

                          <span className={styles.bookingTime}>
                            {formatTime(startDate)}
                            {' – '}
                            {formatTime(endDate)}
                          </span>
                        </>
                      )}
                    </article>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ScheduleGrid
