import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morganMiddleware from './Middleware/loggerMiddleware.js'
import globalErrorHandler from './Middleware/globalErrorMiddleware.js'
import userRouter from './Modules/User/user.routes.js'
import characterRouter from './Modules/Character/character.routes.js'
import messageRouter from './Modules/Message/message.routes.js'
import sessionMiddleware from './Middleware/Redis/sessionConfig.js'

dotenv.config()

const port = process.env.PORT || 8000
const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(express.json())
app.use(bodyParser.json())
app.use(globalErrorHandler)
app.use(morganMiddleware)
app.use(sessionMiddleware)
// const uri = process.env.MONGODB_API_KEY
const uri = 'mongodb://localhost:27017/rockmontry'
mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB')
})

app.use('/api/user', userRouter)
app.use('/api/character',characterRouter)
app.use('/api/message',messageRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app
