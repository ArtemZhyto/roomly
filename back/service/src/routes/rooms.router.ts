// Modules
import { Router } from 'express'

// Controllers
import {
  getRoomAvailabilityController,
  getRoomController,
  getRoomsController,
} from '@controllers/rooms'

const router = Router()

router.get('/', getRoomsController)
router.get('/:roomId/availability', getRoomAvailabilityController)
router.get('/:roomId', getRoomController)

export default router
