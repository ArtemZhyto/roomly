// Types
import type { CorsOptions } from 'cors'

// Configs
import { env } from './env'

const allowedOrigins = [
  'http://localhost:3030',
  env.frontendUrl,
  `https://${env.domain}`,
  `https://www.${env.domain}`,
]

export const corsOptions: CorsOptions = {
  origin: Array.from(new Set(allowedOrigins)),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-client-user-agent'],
  credentials: true,
}
