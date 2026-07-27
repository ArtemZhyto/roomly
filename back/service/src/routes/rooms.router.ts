// Modules
import { Router } from 'express'

// Controllers
import { roomsController } from '@controllers/rooms.controller'

const router = Router()

router.get('/', roomsController.getRoomsList)
router.get('/:roomId', roomsController.getRoomData)

export default router
