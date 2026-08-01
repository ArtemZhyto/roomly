// Modules
import { type Request, type Response, Router } from 'express'

// Routers
import authRouter from './auth.router'
import bookingsRouter from './bookings.router'
import notificationsRouter from './notifications.router'
import roomsRouter from './rooms.router'

// Middlewares
import { requireAuth } from '@middlewares/auth'

const router = Router()

router.use('/auth', authRouter)

router.use('/rooms', requireAuth, roomsRouter)

router.use('/bookings', requireAuth, bookingsRouter)

router.use('/notifications', requireAuth, notificationsRouter)

router.use((_req: Request, res: Response) => {
  return res.status(404).json({
    message: 'Route not found',
  })
})

export default router
