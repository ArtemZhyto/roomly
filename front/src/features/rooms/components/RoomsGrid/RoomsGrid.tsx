// Components
import RoomCard from '../RoomCard'

// Types
import type { Room } from '../../types'

interface RoomsGridProps {
  rooms: Room[]
}

const RoomsGrid = ({ rooms }: RoomsGridProps) => {
  return (
    <section aria-labelledby='rooms-list-title'>
      <h2 id='rooms-list-title' className='sr-only'>
        Available meeting rooms
      </h2>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />
        })}
      </div>
    </section>
  )
}

export default RoomsGrid
