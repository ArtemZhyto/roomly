// Modules
import { Router } from 'express'

// Controllers
import { authController } from '@controllers/auth.controller'

// Middlewares
import { authMiddleware } from '@middlewares/auth.middleware'

const router = Router()

router.post('/register', authMiddleware.register, authController.register)
router.post('/login', authMiddleware.login, authController.login)

router.post('/forgot-password', authMiddleware.forgotPassword, authController.forgotPassword)
router.post('/reset-password', authMiddleware.resetPassword, authController.resetPassword)

router.delete('/logout', authController.logout)
router.post('/refresh', authController.refresh)
router.get('/me', authMiddleware.requireAuth, authController.me)

router.post(
  '/verify-email',
  authMiddleware.requireAuth,
  authMiddleware.verifyEmail,
  authController.verifyEmail,
)
router.post('/resend-verification', authMiddleware.requireAuth, authController.resendVerification)

export default router
