process.env.MODE = 'dev'

process.env.DATABASE_URL = 'postgresql://bookingUser:bookingPassword@localhost:5001/roomly_test'

process.env.SERVICE_PORT = '5000'
process.env.FRONTEND_URL = 'http://localhost:3030'

process.env.ACCESS_SECRET = 'unit-test-access-secret'
process.env.REFRESH_SECRET = 'unit-test-refresh-secret'
process.env.COOKIES_SECRET = 'unit-test-cookies-secret'

process.env.ACCESS_AGE = '900000'
process.env.REFRESH_AGE = '2592000000'

process.env.OFFICE_TIME_ZONE = 'Europe/Kyiv'
process.env.OFFICE_OPEN_HOUR = '9'
process.env.OFFICE_CLOSE_HOUR = '19'

process.env.NOTIFY_BEFORE_MINUTES = '10'

process.env.EMAIL_VERIFICATION_EXPIRES_HOURS = '24'
process.env.EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS = '60'

process.env.PASSWORD_RESET_TOKEN_TTL_MINUTES = '30'
process.env.PASSWORD_RESET_RESEND_COOLDOWN_SECONDS = '60'
