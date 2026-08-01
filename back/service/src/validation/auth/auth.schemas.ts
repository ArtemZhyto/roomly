// Modules
import { z } from 'zod'

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 72
const VERIFICATION_CODE_LENGTH = 6

const emailSchema = z.string().trim().toLowerCase().email('Invalid email format')

const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Password must contain at most ${PASSWORD_MAX_LENGTH} characters`)

const passwordConfirmationSchema = z.string().min(1, 'Password confirmation is required')

const matchingPasswordsSchema = {
  password: passwordSchema,
  confirmPassword: passwordConfirmationSchema,
}

const passwordsMatch = (data: { password: string; confirmPassword: string }): boolean => {
  return data.password === data.confirmPassword
}

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),

    email: emailSchema,

    ...matchingPasswordsSchema,
  })
  .refine(passwordsMatch, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: emailSchema,

  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, 'Password reset token is required'),

    ...matchingPasswordsSchema,
  })
  .refine(passwordsMatch, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .regex(
      new RegExp(`^\\d{${VERIFICATION_CODE_LENGTH}}$`),
      `Verification code must contain ${VERIFICATION_CODE_LENGTH} digits`,
    ),
})

export type RegisterBody = z.infer<typeof registerSchema>
export type LoginBody = z.infer<typeof loginSchema>
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>
export type VerifyEmailBody = z.infer<typeof verifyEmailSchema>
