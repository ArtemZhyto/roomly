'use client'

// Modules
import { useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'

// API
import { getRoomById } from '@features/rooms'

// Types
import type { Room } from '@features/rooms'

import type { SchedulePageStatus } from '../types'

// Utils
import { parseScheduleDate, parseScheduleRoomId } from '../utils'

interface UseSchedulePageResult {
  selectedRoom: Room | null
  initialDate?: Date
  status: SchedulePageStatus
}

const useSchedulePage = (): UseSchedulePageResult => {
  const searchParams = useSearchParams()

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const [status, setStatus] = useState<SchedulePageStatus>('loading')

  const roomParam = searchParams.get('room')
  const dateParam = searchParams.get('date')

  const roomId = useMemo(() => {
    return parseScheduleRoomId(roomParam)
  }, [roomParam])

  const initialDate = useMemo(() => {
    return parseScheduleDate(dateParam)
  }, [dateParam])

  useEffect(() => {
    let isActive = true

    const loadRoom = async (): Promise<void> => {
      setSelectedRoom(null)

      if (roomId === null) {
        setStatus('success')

        return
      }

      setStatus('loading')

      try {
        const roomData = await getRoomById(roomId)

        if (!isActive) {
          return
        }

        setSelectedRoom({
          ...roomData,
          status: 'available',
        })

        setStatus('success')
      } catch {
        if (!isActive) {
          return
        }

        setSelectedRoom(null)
        setStatus('error')
      }
    }

    void loadRoom()

    return () => {
      isActive = false
    }
  }, [roomId])

  return {
    selectedRoom,
    initialDate,
    status,
  }
}

export default useSchedulePage
