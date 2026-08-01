// Modules
import { resolve } from 'node:path'
import { config } from 'dotenv'

config({
  path: resolve(process.cwd(), '../.env'),
})

process.env.DATABASE_URL = 'postgresql://bookingUser:bookingPassword@localhost:5001/roomly_test'
