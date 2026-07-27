// Modules
import { Request, Response, Router } from 'express'

// Routers
import authRouter from './auth.router'
import roomsRouter from './rooms.router'
import bookingsRouter from './bookings.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/rooms', roomsRouter)
router.use('/bookings', bookingsRouter)

router.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

export default router
