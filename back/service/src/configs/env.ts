// Modules
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
  path: path.resolve(process.cwd(), '../.env'),
})

const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is not configured`)
  }

  return value
}

const parsePositiveNumber = (name: string, fallback?: number): number => {
  const rawValue = process.env[name] ?? fallback?.toString()

  if (!rawValue) {
    throw new Error(`${name} is not configured`)
  }

  const value = Number(rawValue)

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number`)
  }

  return value
}

const parseIntegerInRange = (name: string, minimum: number, maximum: number): number => {
  const rawValue = requireEnvironmentVariable(name)
  const value = Number(rawValue)

  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${name} must be an integer between ${minimum} and ${maximum}`)
  }

  return value
}

const officeOpenHour = parseIntegerInRange('OFFICE_OPEN_HOUR', 0, 23)
const officeCloseHour = parseIntegerInRange('OFFICE_CLOSE_HOUR', 1, 24)

if (officeOpenHour >= officeCloseHour) {
  throw new Error('Office opening hour must be earlier than closing hour')
}

export const env = {
  mode: process.env.MODE ?? 'dev',

  databaseUrl: requireEnvironmentVariable('DATABASE_URL'),
  servicePort: parsePositiveNumber('SERVICE_PORT'),

  domain: process.env.DOMAIN ?? 'roomly.ua',

  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3030',

  accessSecret: requireEnvironmentVariable('ACCESS_SECRET'),
  refreshSecret: requireEnvironmentVariable('REFRESH_SECRET'),
  cookiesSecret: requireEnvironmentVariable('COOKIES_SECRET'),

  accessTokenMaxAge: parsePositiveNumber('ACCESS_AGE'),
  refreshTokenMaxAge: parsePositiveNumber('REFRESH_AGE'),

  officeTimeZone: requireEnvironmentVariable('OFFICE_TIME_ZONE'),

  officeOpenHour,
  officeCloseHour,

  notifyBeforeMinutes: parsePositiveNumber('NOTIFY_BEFORE_MINUTES', 10),

  emailVerificationExpiresHours: parsePositiveNumber('EMAIL_VERIFICATION_EXPIRES_HOURS'),
  emailVerificationResendCooldownSeconds: parsePositiveNumber(
    'EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS',
    60,
  ),

  passwordResetTokenTtlMinutes: parsePositiveNumber('PASSWORD_RESET_TOKEN_TTL_MINUTES', 30),

  passwordResetResendCooldownSeconds: parsePositiveNumber(
    'PASSWORD_RESET_RESEND_COOLDOWN_SECONDS',
    60,
  ),
} as const

export const isProduction = env.mode === 'prod'
