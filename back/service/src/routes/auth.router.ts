// Modules
import { Router } from 'express'

// Controllers
import {
  accountController,
  passwordController,
  sessionController,
  verificationController,
} from '@controllers/auth'

// Middlewares
import { requireAuth } from '@middlewares/auth'
import { validateBody } from '@middlewares/validate-body.middleware'

// Validation
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '@validation/auth'

const router = Router()

router.post('/register', validateBody(registerSchema), accountController.register)
router.post('/login', validateBody(loginSchema), accountController.login)
router.delete('/logout', sessionController.logout)

router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema),
  passwordController.forgotPassword,
)
router.post('/reset-password', validateBody(resetPasswordSchema), passwordController.resetPassword)

router.post('/refresh', sessionController.refresh)

router.get('/me', requireAuth, accountController.me)

router.post(
  '/verify-email',
  requireAuth,
  validateBody(verifyEmailSchema),
  verificationController.verifyEmail,
)
router.post('/resend-verification', requireAuth, verificationController.resendVerification)

export default router
