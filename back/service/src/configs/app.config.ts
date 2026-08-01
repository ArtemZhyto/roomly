// Configs
import { env } from './env'

export const appConfig = {
  port: env.servicePort,
} as const