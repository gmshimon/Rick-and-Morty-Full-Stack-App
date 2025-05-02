import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'  
const { combine, timestamp, printf, colorize } = winston.format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

const dailyErrorTransport = new DailyRotateFile({
  filename: 'logs/error.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
})

const dailyCombinedTransport = new DailyRotateFile({
  filename: 'logs/combine.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d' // Keep logs for 30 days
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [dailyCombinedTransport, dailyErrorTransport]
})

// If not in production, log to the console with colorized output.
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    })
  )
}

export default logger
