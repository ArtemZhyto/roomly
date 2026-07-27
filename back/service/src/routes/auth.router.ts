// Modules
import { Router } from 'express'

// Controllers
import { authController } from '@controllers/auth.controller'

// Middlewares
import { authMiddleware } from '@middlewares/auth.middleware'

const router = Router()

router.post('/register', authMiddleware.register, authController.register)
router.post('/login', authMiddleware.login, authController.login)
router.delete('/logout', authController.logout)

export default router
