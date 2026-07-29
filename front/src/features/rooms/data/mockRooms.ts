// Types
import type { Room } from '../types'

export const mockRooms: Room[] = [
  {
    id: 1,
    name: 'Horizon',
    floor: 2,
    capacity: 4,
    status: 'available',
  },
  {
    id: 2,
    name: 'Atlas',
    floor: 2,
    capacity: 6,
    status: 'busy',
    nextAvailableAt: '14:30',
  },
  {
    id: 3,
    name: 'Focus',
    floor: 3,
    capacity: 2,
    status: 'available',
  },
  {
    id: 4,
    name: 'Boardroom',
    floor: 4,
    capacity: 12,
    status: 'busy',
    nextAvailableAt: '16:00',
  },
  {
    id: 5,
    name: 'Lighthouse',
    floor: 3,
    capacity: 8,
    status: 'available',
  },
  {
    id: 6,
    name: 'Garden',
    floor: 1,
    capacity: 5,
    status: 'unavailable',
  },
]
