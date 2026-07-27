// Modules
import { Router } from 'express'

// Controllers
import { bookingsController } from '@controllers/bookings.controller'

// Middlewares
import { bookingsMiddleware } from '@middlewares/bookings.middleware'

const router = Router()

router.get('/', bookingsController.getBookingsList)
router.post('/', bookingsMiddleware.createBooking, bookingsController.setBooking)
router.delete('/:bookingId', bookingsController.deleteBooking)

export default router
