// Configs
import { PrismaClient } from '../../prisma/generated/client'

// Modules
import { PrismaPg } from '@prisma/adapter-pg'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '../../../.env') })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured')
}

const isProd = process.env.MODE === 'prod'

export const __PORT = process.env.SERVICE_PORT

if (!__PORT) {
  throw new Error('SERVICE_PORT is not configured')
}

export const __COOKIE_OPTION = {
  httpOnly: true,
  sameSite: (isProd ? 'strict' : 'lax') as 'strict' | 'lax',
  secure: isProd,
  ...(isProd && { domain: process.env.DOMAIN || 'roomly.ua' }),
  signed: true,
}

const originConfig = ['http://localhost:3030', `https://roomly.ua`, `https://www.roomly.ua`]

export const __CORS_OPTIONS = {
  origin: originConfig,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-client-user-agent'],
  credentials: true,
}

export const __HELMET_OPTIONS = {
  crossOriginResourcePolicy: {
    policy: 'cross-origin' as const,
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
    },
  },
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const __PRISMA = new PrismaClient({
  adapter: adapter,
})

export default __PRISMA
