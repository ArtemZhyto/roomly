// Modules
import { Router } from 'express'

// Controllers
import { bookingsController } from '@controllers/bookings.controller'

// Middlewares
import { bookingsMiddleware } from '@middlewares/bookings.middleware'

const router = Router()

router.delete('/:bookingId', bookingsController.deleteBooking)
router.delete('/series/:seriesId', bookingsController.deleteBookingSeries)
router.get('/', bookingsController.getBookingsList)
router.post('/', bookingsMiddleware.createBooking, bookingsController.setBooking)

export default router
