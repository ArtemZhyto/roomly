// Modules
import { Request, Response, Router } from 'express'

// Routers
import authRouter from './auth.router'
import roomsRouter from './rooms.router'
import bookingsRouter from './bookings.router'
import notificationsRouter from './notifications.router'

// Middleware
import { authMiddleware } from '@middlewares/auth.middleware'

const router = Router()

router.use('/auth', authRouter)
router.use('/rooms', authMiddleware.requireAuth, roomsRouter)
router.use('/bookings', authMiddleware.requireAuth, bookingsRouter)
router.use('/notifications', authMiddleware.requireAuth, notificationsRouter)

router.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

export default router
