// Modules
import { Router } from 'express'

// Controllers
import {
  cancelBookingController,
  cancelBookingSeriesController,
  createBookingController,
  getUserBookingsController,
} from '@controllers/bookings'

// Middlewares
import { validateBody } from '@middlewares/validate-body.middleware'

// Validation
import { createBookingSchema } from '@validation/bookings'

const router = Router()

router.get('/', getUserBookingsController)
router.post('/', validateBody(createBookingSchema), createBookingController)

router.delete('/series/:seriesId', cancelBookingSeriesController)
router.delete('/:bookingId', cancelBookingController)

export default router
