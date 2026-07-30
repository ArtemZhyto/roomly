'use client'

// Modules
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CalendarRange } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'
import EmptyState from '@components-ui/EmptyState'

// Features
import { getRoomById, getRooms } from '@features/rooms'
import { ScheduleLoadingState, WeeklySchedule } from '@features/schedule'

// Types
import type { Room, RoomResponse } from '@features/rooms'

type SchedulePageStatus = 'loading' | 'success' | 'error'

const parseScheduleDate = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return undefined
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  const date = new Date(year, month - 1, day)

  const isValidDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  return isValidDate ? date : undefined
}

const SchedulePage = () => {
  const searchParams = useSearchParams()

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [rooms, setRooms] = useState<RoomResponse[]>([])
  const [status, setStatus] = useState<SchedulePageStatus>('loading')

  const roomParam = searchParams.get('room')
  const dateParam = searchParams.get('date')

  const roomId = Number(roomParam)

  const initialDate = useMemo(() => parseScheduleDate(dateParam), [dateParam])

  useEffect(() => {
    const loadScheduleData = async () => {
      setSelectedRoom(null)

      if (!Number.isInteger(roomId) || roomId <= 0) {
        setRooms([])
        setStatus('success')

        return
      }

      setStatus('loading')

      try {
        const [roomData, roomsData] = await Promise.all([getRoomById(roomId), getRooms()])

        setSelectedRoom({
          ...roomData,
          status: 'available',
        })

        setRooms(roomsData)
        setStatus('success')
      } catch {
        setRooms([])
        setStatus('error')
      }
    }

    void loadScheduleData()
  }, [roomId])

  const selectRoomAction = (
    <Link
      href='/rooms'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
    >
      Select a room
      <ArrowRight className='size-4' strokeWidth={2} aria-hidden='true' />
    </Link>
  )

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Schedule'
        description='View weekly room availability and choose a free 30-minute time slot.'
        aside={<TimezoneBadge />}
      />

      {status === 'loading' && (
        <div className='flex flex-col gap-5'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='h-6 w-40 animate-pulse rounded-full bg-border' />
              <div className='h-4 w-56 animate-pulse rounded-full bg-border' />
            </div>

            <div className='h-10 w-48 animate-pulse rounded-control bg-border' />
          </div>

          <div className='h-11 w-36 animate-pulse rounded-control bg-border' />

          <ScheduleLoadingState />
        </div>
      )}

      {status === 'error' && (
        <EmptyState
          icon={CalendarRange}
          title='Could not load room schedule'
          description='Something went wrong while loading the selected room.'
          action={selectRoomAction}
        />
      )}

      {status === 'success' && selectedRoom && (
        <WeeklySchedule room={selectedRoom} rooms={rooms} initialDate={initialDate} />
      )}

      {status === 'success' && !selectedRoom && (
        <EmptyState
          icon={CalendarRange}
          title='Choose a room to view its schedule'
          description='Select a meeting room from the catalogue to open its weekly calendar.'
          action={selectRoomAction}
        />
      )}
    </div>
  )
}

export default SchedulePage
