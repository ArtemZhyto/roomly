'use client'

// Modules
import { useCallback, useEffect, useState } from 'react'

// API
import { getRooms } from '../api'

// Types
import type { Room, RoomsPageStatus } from '../types'

interface UseRoomsPageResult {
  rooms: Room[]
  status: RoomsPageStatus
  minCapacity?: number
  setMinCapacity: (value?: number) => void
  reloadRooms: () => Promise<void>
}

const useRoomsPage = (): UseRoomsPageResult => {
  const [rooms, setRooms] = useState<Room[]>([])

  const [status, setStatus] = useState<RoomsPageStatus>('loading')

  const [minCapacity, setMinCapacity] = useState<number>()

  const reloadRooms = useCallback(async (): Promise<void> => {
    setStatus('loading')

    try {
      const roomData = await getRooms({
        minCapacity,
      })

      setRooms(
        roomData.map((room) => {
          return {
            ...room,
            status: 'available',
          }
        }),
      )

      setStatus('success')
    } catch {
      setRooms([])
      setStatus('error')
    }
  }, [minCapacity])

  useEffect(() => {
    void reloadRooms()
  }, [reloadRooms])

  return {
    rooms,
    status,
    minCapacity,
    setMinCapacity,
    reloadRooms,
  }
}

export default useRoomsPage
