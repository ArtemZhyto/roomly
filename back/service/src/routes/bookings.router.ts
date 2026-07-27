// Modules
import { Router } from 'express'

// Controllers
import { bookingsController } from '@controllers/bookings.controller'

const router = Router()

router.get('/', bookingsController.getBookingsList)
router.post('/', bookingsController.setBooking)
router.delete('/:bookingID', (req, res) => bookingsController.deleteBooking(req.params.bookingID))

export default router
