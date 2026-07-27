// Configs
import { __PORT, __CORS_OPTIONS, __HELMET_OPTIONS } from '@configs/config'

// Modules
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Router
import router from '@routes/router'

const app = express()

const COOKIES_SECRET = process.env.COOKIES_SECRET

if (!COOKIES_SECRET) {
  throw new Error('COOKIES_SECRET is not configured')
}

app.set('trust proxy', 1)
app.use(cors(__CORS_OPTIONS))
app.use(cookieParser(COOKIES_SECRET))
app.use(helmet(__HELMET_OPTIONS))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use('/', router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error', error: err.message })
})

app.listen(__PORT, () => {
  console.log(`Server started on :${__PORT}`)
})
